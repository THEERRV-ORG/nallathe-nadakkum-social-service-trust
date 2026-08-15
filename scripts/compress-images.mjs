/**
 * One-shot image optimiser for public/ assets.
 *
 * These images are served by URL from /public (the bundler does not touch them),
 * so they are optimised in place here. Each image is downscaled to a sensible
 * maximum dimension and re-encoded at high quality. Filenames and formats are
 * preserved so no references break. Originals are backed up to
 * public-original-backup/ on first run; a file is only overwritten when the
 * optimised version is at least 5% smaller.
 *
 * Run:  node scripts/compress-images.mjs
 */
import { readdir, stat, mkdir, copyFile, readFile, writeFile, access } from 'node:fs/promises';
import { join, extname, relative, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SRC = join(ROOT, 'public');
const BACKUP = join(ROOT, 'public-original-backup');

const MAX_EDGE = 1600;      // photos are shown far smaller than this
const JPEG_QUALITY = 80;
const PNG_COMPRESSION = 9;
const MIN_SAVING = 0.05;    // only rewrite if >=5% smaller

const exts = new Set(['.jpg', '.jpeg', '.png']);

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(full)));
    else if (exts.has(extname(entry.name).toLowerCase())) out.push(full);
  }
  return out;
}

async function exists(p) {
  try { await access(p); return true; } catch { return false; }
}

async function optimise(file) {
  const ext = extname(file).toLowerCase();
  const input = await readFile(file);
  const before = input.length;

  let pipeline = sharp(input, { failOn: 'none' })
    .rotate() // respect EXIF orientation
    .resize({ width: MAX_EDGE, height: MAX_EDGE, fit: 'inside', withoutEnlargement: true });

  if (ext === '.png') {
    pipeline = pipeline.png({ compressionLevel: PNG_COMPRESSION, palette: true });
  } else {
    pipeline = pipeline.jpeg({ quality: JPEG_QUALITY, mozjpeg: true });
  }

  const output = await pipeline.toBuffer();
  const after = output.length;
  const saving = (before - after) / before;

  if (saving < MIN_SAVING) {
    return { file, before, after, kept: true };
  }

  // Back up the original once, preserving folder structure.
  const rel = relative(SRC, file);
  const backupPath = join(BACKUP, rel);
  if (!(await exists(backupPath))) {
    await mkdir(dirname(backupPath), { recursive: true });
    await copyFile(file, backupPath);
  }

  await writeFile(file, output);
  return { file, before, after, kept: false };
}

const files = await walk(SRC);
let totalBefore = 0;
let totalAfter = 0;
let changed = 0;

for (const f of files) {
  try {
    const r = await optimise(f);
    totalBefore += r.before;
    totalAfter += r.after;
    if (!r.kept) changed += 1;
    const pct = (((r.before - r.after) / r.before) * 100).toFixed(0);
    console.log(
      `${r.kept ? 'skip' : ' opt'}  ${relative(ROOT, f).padEnd(52)} ` +
      `${(r.before / 1024).toFixed(0).padStart(5)}KB -> ${(r.after / 1024).toFixed(0).padStart(5)}KB  (${pct}%)`,
    );
  } catch (err) {
    console.warn(`FAIL  ${relative(ROOT, f)} — ${err.message}`);
  }
}

const mb = (b) => (b / 1048576).toFixed(2);
console.log('\n────────────────────────────────────────');
console.log(`Files processed : ${files.length}`);
console.log(`Files rewritten : ${changed}`);
console.log(`Total before    : ${mb(totalBefore)} MB`);
console.log(`Total after     : ${mb(totalAfter)} MB`);
console.log(`Saved           : ${mb(totalBefore - totalAfter)} MB (${(((totalBefore - totalAfter) / totalBefore) * 100).toFixed(0)}%)`);
console.log(`Originals backed up to: ${relative(ROOT, BACKUP)}/`);

import { FaRegImage } from 'react-icons/fa6';

interface PhotoPlaceholderProps {
  /** Short description of the photo that will replace this placeholder. */
  label?: string;
  /** CSS aspect-ratio value, e.g. "4 / 3" or "4 / 5". */
  aspectRatio?: string;
  /** Extra classes — pass the final image's border-radius here so swaps are 1:1. */
  className?: string;
  lang?: 'en' | 'ta';
}

/**
 * Polished, clearly-temporary photo placeholder. Uses the brand's neutral/green
 * palette and preserves the final image's aspect ratio and radius so a real
 * photograph can drop in later without layout changes.
 */
export default function PhotoPlaceholder({
  label,
  aspectRatio = '4 / 3',
  className = '',
  lang = 'en',
}: PhotoPlaceholderProps) {
  return (
    <div
      style={{ aspectRatio }}
      className={`relative flex w-full flex-col items-center justify-center gap-3 overflow-hidden rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50/70 via-white to-emerald-50/40 px-6 text-center ${className}`}
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100/70 text-emerald-700">
        <FaRegImage className="h-6 w-6" />
      </div>
      <div className="space-y-1">
        <p className="font-display text-xs font-bold uppercase tracking-widest text-emerald-800/80">
          {lang === 'en' ? 'Photo Placeholder' : 'புகைப்படம் விரைவில்'}
        </p>
        {label && (
          <p className="text-xs font-medium text-emerald-800/70">{label}</p>
        )}
        <p className="text-[11px] text-emerald-700/60">
          {lang === 'en' ? 'Official NGO photograph pending' : 'அறக்கட்டளையின் புகைப்படம் விரைவில் இணைக்கப்படும்'}
        </p>
      </div>
    </div>
  );
}

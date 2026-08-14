import { ReactNode } from 'react';
import { motion } from 'motion/react';

/*
  Reusable section archetypes. These exist so narrative / one-off sections can
  break away from the repeated white-card look and the site can hold an
  intentional variety of layouts (editorial split, full-width band, typographic
  statement) instead of stacking identical boxes.
*/

const reveal = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.4 },
};

interface EditorialSplitProps {
  media: ReactNode;
  children: ReactNode;
  /** Put the media on the left instead of the right (desktop). */
  mediaLeft?: boolean;
  className?: string;
}

/** Text on one side, media on the other. No card chrome. */
export function EditorialSplit({ media, children, mediaLeft = false, className = '' }: EditorialSplitProps) {
  return (
    <section className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>
      <div className={`flex flex-col gap-8 lg:gap-12 items-center ${mediaLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
        <div className="w-full lg:flex-1 min-w-0">{children}</div>
        <div className="w-full lg:w-5/12 shrink-0">{media}</div>
      </div>
    </section>
  );
}

interface FullWidthBandProps {
  children: ReactNode;
  /** Visual tone of the band. */
  tone?: 'emerald' | 'gold';
  className?: string;
}

/** A bold full-width brand band for emotional / CTA moments. */
export function FullWidthBand({ children, tone = 'emerald', className = '' }: FullWidthBandProps) {
  const bg =
    tone === 'gold'
      ? 'bg-gradient-to-br from-brand-gold-700 to-brand-gold'
      : 'bg-gradient-to-br from-emerald-800 via-emerald-900 to-emerald-950';
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <motion.div
        {...reveal}
        className={`relative overflow-hidden rounded-3xl border-l-4 border-brand-gold p-8 sm:p-12 lg:p-14 shadow-[0_30px_80px_-30px_rgba(15,61,38,0.75)] ${bg} ${className}`}
      >
        <div className="pointer-events-none absolute -right-16 -bottom-16 h-64 w-64 rounded-full bg-brand-gold/10 blur-3xl" />
        <div className="relative">{children}</div>
      </motion.div>
    </section>
  );
}

interface TypographicStatementProps {
  eyebrow?: string;
  heading: ReactNode;
  children?: ReactNode;
  className?: string;
}

/** Big heading-led statement with no box — pure typography. */
export function TypographicStatement({ eyebrow, heading, children, className = '' }: TypographicStatementProps) {
  return (
    <section className={`mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center space-y-4 ${className}`}>
      {eyebrow && <p className="section-eyebrow text-emerald-700">{eyebrow}</p>}
      <h2 className="h2-section">{heading}</h2>
      {children && <div className="text-base sm:text-lg text-gray-900 leading-relaxed">{children}</div>}
    </section>
  );
}

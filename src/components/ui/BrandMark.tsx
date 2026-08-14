/*
  Unified logo component. One place controls how the trust mark is rendered so
  its size and treatment stay consistent everywhere (nav, hero, footer,
  inline). The logo is a full lockup, so the default treatment is `contain`
  (never cropped); `round` is opt-in for small avatar-style placements.
*/

interface BrandMarkProps {
  /** Preset sizes map to the places the mark appears. */
  size?: 'nav' | 'inline' | 'hero' | 'footer';
  /** Circle-crop (avatar style) vs contained full lockup. */
  variant?: 'round' | 'contain';
  className?: string;
  alt?: string;
}

const SIZE: Record<NonNullable<BrandMarkProps['size']>, string> = {
  nav: 'h-10 w-10',
  inline: 'h-16 w-16',
  hero: 'h-52 w-52 sm:h-64 sm:w-64',
  footer: 'h-24 w-24 sm:h-28 sm:w-28',
};

export default function BrandMark({
  size = 'inline',
  variant = 'contain',
  className = '',
  alt = 'Nallathae Nadakkum Social Service Trust logo',
}: BrandMarkProps) {
  const shape = variant === 'round' ? 'rounded-full object-cover' : 'rounded-2xl object-contain';
  return (
    <img
      src="/logo.png"
      alt={alt}
      className={`${SIZE[size]} ${shape} ${className}`}
    />
  );
}

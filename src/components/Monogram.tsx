interface MonogramProps {
  label: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  tone?: 'emerald' | 'amber' | 'red' | 'inverted';
  className?: string;
}

const sizeClasses: Record<string, string> = {
  xs: 'h-4 w-4 text-[8px]',
  sm: 'h-5 w-5 text-[9px]',
  md: 'h-8 w-8 text-xs',
  lg: 'h-12 w-12 text-lg',
};

const toneClasses: Record<string, string> = {
  emerald: 'bg-emerald-100 text-emerald-700',
  amber: 'bg-amber-100 text-amber-700',
  red: 'bg-red-100 text-red-700',
  inverted: 'bg-white/15 text-white',
};

/**
 * Small letter-badge used in place of decorative emoji across the site.
 * Keeps visual accents consistent with the brand's monogram-style
 * treatment (e.g. the founder photo placeholder, the logo mark).
 */
export default function Monogram({ label, size = 'sm', tone = 'emerald', className = '' }: MonogramProps) {
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-full font-bold leading-none ${sizeClasses[size]} ${toneClasses[tone]} ${className}`}
    >
      {label}
    </span>
  );
}

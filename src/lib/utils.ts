/**
 * Minimal className combiner (join truthy values). Kept dependency-free — this
 * project doesn't ship clsx/tailwind-merge, and additive class joining is all
 * the local UI components need.
 */
export function cn(...classes: Array<string | number | null | false | undefined>): string {
  return classes.filter(Boolean).join(' ');
}

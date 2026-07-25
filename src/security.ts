/**
 * Centralized public contact details used by the frontend handoff flows.
 * Keeping them in one module prevents drift across the donation, help, and
 * volunteer screens.
 */
export const OFFICIAL_CONTACT = {
  email: 'nallathanadakum@gmail.com',
  emergencyPhone: '+919876543210',
  whatsappPhone: '+919443567890',
  // Dedicated number that receives all website form submissions on WhatsApp.
  formsPhone: '+917540017625',
};

/**
 * Centralized official social-media handles. Kept alongside the other public
 * contact details so links stay consistent wherever they are surfaced.
 * NOTE: `facebook` is still a placeholder pending the trust's real page URL.
 */
export const OFFICIAL_SOCIAL = {
  instagram: 'https://www.instagram.com/nn_socialservice_trust',
  facebook: 'https://facebook.com',
  youtube: 'https://www.youtube.com/@nallathenadakumsocialtrust',
};

/**
 * Sample-only acknowledgement entries displayed in the public UI.
 * These records are intentionally static so the site never implies that
 * donor data is being persisted securely on the client.
 */
export const SAMPLE_SPONSORS = [
  {
    name: 'Local family sponsor',
    type: 'Sponsorship',
    item: 'Annadhanam (1 Day)',
    msg: 'Shared in support of daily meals.',
    date: '20.07.2026',
  },
  {
    name: 'Community rice donor',
    type: 'Material',
    item: '2 Rice bags (25kg)',
    msg: 'For the daily kitchen pantry.',
    date: '18.07.2026',
  },
  {
    name: 'Student welfare sponsor',
    type: 'Sponsorship',
    item: 'Student Fees Support',
    msg: 'Helping a student stay in school.',
    date: '15.07.2026',
  },
] as const;

const SINGLE_LINE_CONTROL_CHARS = /[\u0000-\u001F\u007F]+/g;
const MULTI_LINE_CONTROL_CHARS = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]+/g;

/**
 * Normalizes compact input fields such as names and short labels.
 */
export function sanitizeSingleLine(value: string, maxLength = 120) {
  return value
    .replace(SINGLE_LINE_CONTROL_CHARS, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, maxLength);
}

/**
 * Normalizes textarea content while preserving intentional line breaks.
 */
export function sanitizeMultiLine(value: string, maxLength = 600) {
  return value
    .replace(/\r\n?/g, '\n')
    .replace(MULTI_LINE_CONTROL_CHARS, ' ')
    .replace(/[ \t]+/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
    .slice(0, maxLength);
}

/**
 * Accepts common Indian phone formats and converts them to a comparable
 * 10-digit mobile number where possible.
 */
export function normalizeIndianPhone(value: string) {
  const digits = value.replace(/\D/g, '');
  return digits.length > 10 ? digits.slice(-10) : digits;
}

/**
 * Restricts person-name fields to human-readable characters and a safe length.
 */
export function isValidPersonName(value: string) {
  const normalized = sanitizeSingleLine(value, 80);
  return normalized.length >= 2 && normalized.length <= 80 && /^[\p{L} .'-]+$/u.test(normalized);
}

export function isValidIndianPhone(value: string) {
  return /^[6-9]\d{9}$/.test(normalizeIndianPhone(value));
}

/**
 * Donation drafts should stay within a sensible operational range and be
 * represented as whole rupee values.
 */
export function isValidDonationAmount(value: string) {
  const amount = Number(value);
  return Number.isInteger(amount) && amount >= 10 && amount <= 1000000;
}

/**
 * Ensures free-text input has enough content to be actionable after
 * normalization.
 */
export function hasMeaningfulText(value: string, minLength = 5, maxLength = 600) {
  const normalized = sanitizeMultiLine(value, maxLength);
  return normalized.length >= minLength && normalized.length <= maxLength;
}

/**
 * Builds a safe mailto URL from already-normalized lines.
 */
export function buildMailtoUrl(to: string, subject: string, lines: string[]) {
  const encodedSubject = encodeURIComponent(sanitizeSingleLine(subject, 120));
  const body = encodeURIComponent(lines.filter(Boolean).join('\n'));
  return `mailto:${to}?subject=${encodedSubject}&body=${body}`;
}

/**
 * Builds a safe WhatsApp handoff URL without exposing formatting quirks to
 * component-level code.
 */
export function buildWhatsAppUrl(phone: string, lines: string[]) {
  const normalizedPhone = phone.replace(/\D/g, '');
  const text = encodeURIComponent(lines.filter(Boolean).join('\n'));
  return `https://wa.me/${normalizedPhone}?text=${text}`;
}

/**
 * Generates lightweight user-facing references for handoff tracking.
 * This is not a security token and should not be treated as one.
 */
export function createReference(prefix: string) {
  const datePart = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const randomPart = Math.floor(1000 + Math.random() * 9000);
  return `${prefix}-${datePart}-${randomPart}`;
}


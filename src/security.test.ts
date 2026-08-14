import test from 'node:test';
import assert from 'node:assert/strict';

import {
  buildWhatsAppUrl,
  hasMeaningfulText,
  isValidDonationAmount,
  isValidIndianPhone,
  isValidPersonName,
  normalizeIndianPhone,
  sanitizeMultiLine,
  sanitizeSingleLine,
} from './security';

test('sanitizeSingleLine strips control characters and compresses whitespace', () => {
  assert.equal(sanitizeSingleLine('  Ravi\u0000   Kumar  '), 'Ravi Kumar');
});

test('sanitizeMultiLine preserves line breaks while removing unsafe control characters', () => {
  assert.equal(sanitizeMultiLine('Line 1\r\n\u0007Line 2'), 'Line 1\n Line 2');
});

test('normalizeIndianPhone keeps the last 10 digits', () => {
  assert.equal(normalizeIndianPhone('+91 75400 17625'), '7540017625');
});

test('isValidIndianPhone accepts mobile numbers and rejects malformed input', () => {
  assert.equal(isValidIndianPhone('7540017625'), true);
  assert.equal(isValidIndianPhone('1234567890'), false);
});

test('isValidPersonName rejects obviously unsafe values', () => {
  assert.equal(isValidPersonName('Mohan Raj'), true);
  assert.equal(isValidPersonName('<script>alert(1)</script>'), false);
});

test('isValidDonationAmount enforces expected bounds', () => {
  assert.equal(isValidDonationAmount('10'), true);
  assert.equal(isValidDonationAmount('0'), false);
  assert.equal(isValidDonationAmount('1000001'), false);
});

test('hasMeaningfulText enforces minimum content length', () => {
  assert.equal(hasMeaningfulText('Need ambulance support urgently', 10, 120), true);
  assert.equal(hasMeaningfulText('short', 10, 120), false);
});

test('buildWhatsAppUrl encodes the message body', () => {
  const url = buildWhatsAppUrl('+91 75400 17625', ['Reference: NN-REQ-20260721-1234', 'Need: Ambulance']);
  assert.match(url, /^https:\/\/wa\.me\/917540017625\?text=Reference%3A%20NN-REQ-20260721-1234%0ANeed%3A%20Ambulance$/);
});

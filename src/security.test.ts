import test from 'node:test';
import assert from 'node:assert/strict';

import {
  buildMailtoUrl,
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
  assert.equal(normalizeIndianPhone('+91 98765-43210'), '9876543210');
});

test('isValidIndianPhone accepts mobile numbers and rejects malformed input', () => {
  assert.equal(isValidIndianPhone('9876543210'), true);
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

test('buildMailtoUrl encodes the subject and body', () => {
  const url = buildMailtoUrl('team@example.org', 'Volunteer registration', ['Name: Ravi', 'Phone: 9876543210']);
  assert.match(url, /^mailto:team@example.org\?subject=Volunteer%20registration&body=Name%3A%20Ravi%0APhone%3A%209876543210$/);
});

test('buildWhatsAppUrl encodes the message body', () => {
  const url = buildWhatsAppUrl('+91 98765 43210', ['Reference: NN-REQ-20260721-1234', 'Need: Ambulance']);
  assert.match(url, /^https:\/\/wa\.me\/919876543210\?text=Reference%3A%20NN-REQ-20260721-1234%0ANeed%3A%20Ambulance$/);
});

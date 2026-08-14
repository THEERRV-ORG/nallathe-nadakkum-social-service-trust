# Security Test Plan

Audit date baseline: July 21, 2026
Target: `nallathe-nadakkum-social-service-trust`

## Scope Notes

This repository is a frontend-only React application. The current automated tests and code changes verify client-side validation and safe contact handoff behavior. They do not constitute an authorized external penetration test, a payment-gateway assessment, or a backend/API assessment because no such components are present in this repo.

## Automated Tests

### Run locally

1. `npm run lint`
2. `npm test`
3. `npm run build`
4. `npm audit --audit-level=moderate`

### Current automated coverage

- Control-character stripping from single-line inputs
- Safe multi-line normalization
- Indian phone normalization and validation
- Person-name validation
- Donation amount bounds checks
- Minimum content-length validation
- Safe `mailto:` URL construction
- Safe WhatsApp handoff URL construction

## Manual Security Testing

### Public forms

1. Try invalid names such as `<script>alert(1)</script>` and confirm validation rejects them.
2. Try malformed phone numbers such as `12345`, `0000000000`, and alphanumeric strings.
3. Try oversized free-text messages and confirm truncation/validation behavior remains controlled.
4. Confirm distress, volunteer, and donor workflows no longer persist data to `localStorage`.
5. Confirm only language preference remains in `localStorage`.
6. Confirm the UI now opens a `mailto:` or WhatsApp draft instead of claiming server-side storage.

### Browser privacy and headers

1. Open built `dist/index.html` in a browser and inspect the effective CSP.
2. Confirm inline scripts are not required beyond the Vite bundle.
3. Confirm `Referrer-Policy`, `X-Content-Type-Options`, and `Permissions-Policy` meta headers are present.
4. Confirm the app cannot be framed where hosting headers also enforce `frame-ancestors`.

### Third-party embeds

1. Confirm YouTube embeds load from `youtube-nocookie.com`.
2. Confirm iframes include `sandbox`, `loading`, and `referrerPolicy` attributes.
3. Confirm Google Maps and remote images still render under the CSP.

### Regression testing

1. Navigate every tab in English and Tamil.
2. Submit each public form with valid data.
3. Confirm navigation, gallery, and video content still work.
4. Confirm build output renders without runtime console errors.

## Recommended Future Automated Security Tests

Add these once a backend exists:

- Authentication bypass tests
- Authorization and IDOR tests
- CSRF tests for cookie-authenticated endpoints
- Invalid payment signature tests
- Invalid webhook signature and replay tests
- Duplicate callback/idempotency tests
- Refund authorization tests
- Rate-limit and account lockout tests
- Sensitive-data logging tests
- Security-header integration tests at the hosting tier
- Secret scanning in CI
- SAST, SBOM generation, and dependency scanning in CI

## Recommended Backend/Production Validation Before Go-Live

1. Perform a full threat-model review of the new backend and payment provider integration.
2. Run authenticated API security testing.
3. Validate audit logging, retention, and alerting.
4. Verify secrets come from managed secret storage.
5. Verify TLS, CDN, WAF, and server security headers in the deployed environment.
6. Validate bot-abuse controls on public donation and contact workflows.
7. Run a dedicated full Git-history secret scan before any production rollout.

## Evidence Collected In This Review

- TypeScript compile check passed on July 21, 2026
- Security unit tests passed on July 21, 2026
- Production build passed on July 21, 2026
- `npm audit --audit-level=moderate` reported `0 vulnerabilities` on July 21, 2026

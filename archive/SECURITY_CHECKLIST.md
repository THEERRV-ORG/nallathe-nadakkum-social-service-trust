> **STALE — SUPERSEDED.** This document (21 July 2026) audited the pre-Firebase version of this site, which stored form submissions in browser localStorage with no backend. That architecture no longer exists. See `Production_Readiness_Audit.docx` (9 August 2026) for the current, accurate audit of the Firebase-backed app.

# Security Checklist

Use this checklist before any production deployment of this site or its future backend.

## Authentication

- [ ] Real server-side authentication exists for staff and trustee access.
- [ ] MFA is required for administrators, finance staff, and trustees.
- [ ] Password reset, session expiry, lockout, and token revocation are implemented server-side.
- [ ] No privileged workflow depends on client-side-only checks.

## Authorization

- [ ] Every protected API endpoint enforces server-side authorization.
- [ ] Role-based access control is documented and tested.
- [ ] Object-level authorization prevents access to other donors', volunteers', or beneficiaries' records.
- [ ] Refunds, exports, reconciliation, and configuration changes require strong authorization.

## Payment Security

- [ ] Hosted checkout or tokenized payment flow is used.
- [ ] Order creation happens server-side.
- [ ] Payment amount, currency, donor identity, and order ID are verified server-side.
- [ ] Success is never trusted from frontend query parameters.
- [ ] Duplicate payment callbacks are handled idempotently.
- [ ] Receipt generation occurs only after trusted server-side confirmation.

## Webhook Security

- [ ] Webhook signatures are verified.
- [ ] Webhook timestamps are checked when supported.
- [ ] Replay attacks are detected and blocked.
- [ ] Failed webhook processing is safely retryable.
- [ ] Webhook events are logged with correlation IDs.

## Database Security

- [ ] A real database exists only on protected infrastructure.
- [ ] Application credentials use least privilege.
- [ ] Parameterized queries or ORM-safe access methods are enforced.
- [ ] Sensitive fields have defined retention and protection rules.
- [ ] Backups are encrypted and access-controlled.

## API Security

- [ ] Validation, request-size limits, timeouts, and generic errors are enforced.
- [ ] Rate limiting is active on login, contact, donation, and verification endpoints.
- [ ] Pagination and field minimization are used for list endpoints.
- [ ] Correlation IDs are returned and logged for supportable failure analysis.

## Frontend Security

- [ ] CSP and other security headers are enforced by the hosting tier.
- [ ] No sensitive data is stored in `localStorage`, `sessionStorage`, or query strings.
- [ ] Third-party embeds use privacy-hardened domains and restricted attributes.
- [ ] Client-side validation does not replace server-side validation.

## File Uploads

- [ ] Uploads are allow-listed by extension and MIME type.
- [ ] File-size limits and malware scanning are enforced.
- [ ] Uploaded files use random names and non-executable storage.
- [ ] Private files require signed or short-lived access URLs.

## Secrets

- [ ] No secrets exist in source control, frontend bundles, or source maps.
- [ ] Secrets are stored in a managed secret store or deployment secret manager.
- [ ] Secret rotation procedures exist for payment, email, and messaging providers.
- [ ] Full Git-history secret scanning has been completed.

## Logging

- [ ] Structured logs exist for auth failures, invalid signatures, and admin actions.
- [ ] Logs exclude secrets, tokens, full payment payloads, and unnecessary PII.
- [ ] Audit logs are tamper-resistant and retention-controlled.

## Monitoring

- [ ] Alerts exist for failed logins, privilege changes, invalid webhooks, and payment failures.
- [ ] Availability and exception monitoring are enabled.
- [ ] Suspicious-rate and abuse thresholds trigger notifications.

## Infrastructure

- [ ] HTTPS is enforced everywhere.
- [ ] Production does not expose debug mode or stack traces.
- [ ] CDN, reverse proxy, and WAF rules are defined.
- [ ] CI/CD secrets are protected and access is least-privileged.
- [ ] Dependency scanning and build integrity checks run in CI.

## Backups

- [ ] Restore testing is documented and periodically exercised.
- [ ] Backup access is limited and audited.
- [ ] Sensitive data in backups is encrypted.

## Privacy

- [ ] Data minimization is documented for donors, volunteers, and beneficiaries.
- [ ] Consent language matches actual collection and retention practices.
- [ ] Export, deletion, and retention procedures are defined.
- [ ] Sensitive personal data is masked in staff views and exports.

## Incident Response

- [ ] Security contacts and escalation paths are documented.
- [ ] Payment-provider and messaging-provider breach playbooks exist.
- [ ] Secret rotation and takedown procedures are rehearsed.
- [ ] Log preservation and forensics procedures are documented.

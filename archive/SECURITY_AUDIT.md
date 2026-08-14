# Security Audit

Audit date: July 21, 2026
Repository: `nallathe-nadakkum-social-service-trust`
Assessor scope: source-code review, local configuration review, build/test verification, dependency audit, and limited Git-history pattern search.

## Executive Summary

This repository is a Vite + React single-page application. No production backend, database layer, authentication service, payment gateway SDK, webhook processor, or server-side admin API exists in the code that was reviewed.

The largest security issue was architectural: the site presented itself like an operational NGO workflow system while storing help requests, volunteer registrations, and donor acknowledgements in browser `localStorage`, and exposing an unauthenticated client-side "admin" view. That created privacy risk, false assurance, and an easy path for tampering on shared devices.

The codebase has now been hardened so sensitive submissions are no longer stored in the browser, the public donor wall is sample-only, the client-side admin path is retired, browser security headers are added, and validation plus automated tests are in place. Even after these fixes, the application is not production-ready for real online donations or privileged operations until a real backend is implemented.

## Architecture Summary

### Detected stack

- Frontend: React 19, React DOM 19, TypeScript, Vite 6
- Styling: Tailwind CSS 4
- Animation/UI: `motion`, `react-icons`, `lucide-react`
- Runtime in repo: `express` and `dotenv` are declared, but no active server-side application code was found in this repository
- Hosting style implied by repo: static frontend build via Vite

### Application architecture

- Single-page client-rendered website
- All meaningful data handling originally occurred inside React components in the browser
- No API client layer, no fetch-based backend integration, no ORM/database access, no authentication middleware, no payment SDK integration, and no webhook receiver found in the reviewed source

### Authentication and authorization flow

- No real authentication flow exists in this repository
- No server-side authorization exists in this repository
- Previous "admin dashboard" behavior was client-only and unauthenticated

### Roles observed

- Public user content only in active code
- No enforceable donor, volunteer, employee, trustee, or admin roles exist server-side
- Any role distinction in previous UI was presentation only

### Payment gateway integration flow

- No payment gateway integration was found
- No server-side order creation, signature verification, reconciliation, receipt issuance, or refund flow exists in this repository
- Donation page currently provides direct bank/UPI instructions and now prepares contact drafts instead of simulating persistence

### Webhook processing flow

- No webhook endpoint or verifier found

### Database access patterns

- No database code found
- Original data persistence was browser `localStorage` only
- Current hardened build keeps only language preference in `localStorage`

### File-upload functionality

- No file-upload workflow found

### Email and WhatsApp integrations

- No backend integration found
- Current hardened flow prepares `mailto:` and WhatsApp handoff links from validated user input
- This is safer than browser persistence, but it is not a substitute for a secured backend workflow

### External APIs and third-party SDKs

- Google Fonts
- Unsplash-hosted image
- YouTube thumbnails and embedded YouTube player
- Google Maps embed
- No payment SDKs found
- No WhatsApp Business API or email-provider SDK found

### Secret and configuration management

- `.env.example` contains only `APP_URL`
- No confirmed secrets found in the working tree
- Limited history pattern search did not confirm an exposed credential, although one historical content match requires manual human review if full repository assurance is needed

### Logging and monitoring approach

- No structured logging or monitoring pipeline found
- No server-side logs, audit trails, or alerting mechanisms found in this repository

### Deployment and infrastructure configuration

- No Dockerfile, CI/CD workflow, reverse-proxy config, IaC, cloud config, or server config found in the reviewed repository root
- Application appears intended for static hosting

## Threat Model

### Sensitive assets

- Distress/help request data
- Volunteer applicant contact details
- Donor identity and donation acknowledgement data
- Public trust reputation and donation integrity
- Future admin or trustee workflows

### Entry points

- Public website routes and forms
- Donation acknowledgement form
- Contact form
- Embedded third-party content
- Future deployment configuration and environment variables

### Trust boundaries

- Browser to external mail client or WhatsApp handoff
- Browser to third-party embeds
- Future boundary between frontend and not-yet-implemented backend/payment systems

### Privileged operations

- Managing beneficiary requests
- Publishing donor acknowledgements
- Any future trustee review, approval, refund, export, or reconciliation action

### External dependencies

- npm packages in `package.json`
- Google Fonts
- YouTube
- Google Maps
- Unsplash image hosting

### Potential attackers

- Opportunistic web visitors manipulating client-side state
- Users on shared devices reading prior browser-stored data
- Social-engineering actors spoofing donation acknowledgements
- Future insiders if admin functionality is reintroduced without real auth

### High-risk data flows

- Distress request intake
- Volunteer onboarding
- Donor acknowledgement requests
- Future payment confirmation, receipts, refunds, and reconciliation

## Findings

### High Risk

1. Browser-stored sensitive submissions in `localStorage`
- Impact: Anyone with access to the same browser profile could read or tamper with distress requests, volunteer applications, and donor entries.
- Affected code: previous logic in `src/components/FormsView.tsx`, `src/components/DonateView.tsx`, `src/components/HomeView.tsx`, and dead code in `src/components/AdminPanel.tsx`
- Fix: Removed browser persistence for sensitive submissions. Replaced it with validated handoff through `mailto:` and WhatsApp draft URLs. Home and donation displays now use sample-only acknowledgement content.
- Status: Fixed in code.

2. Unauthenticated client-side admin dashboard
- Impact: The previous dashboard had no real authentication or authorization and allowed local manipulation of NGO workflow records.
- Affected code: previous `src/components/AdminPanel.tsx`, `src/App.tsx`, `src/components/Navbar.tsx`
- Fix: Removed public UI entry points and replaced the dashboard component with a decommissioned security notice.
- Status: Fixed in code.

3. Donation acknowledgement flow trusted arbitrary client-side publication
- Impact: A visitor could publish fabricated donor names/messages locally and mistake them for real acknowledgements, undermining trust and privacy.
- Affected code: previous `src/components/DonateView.tsx`, `src/components/HomeView.tsx`
- Fix: Replaced with sample board plus validated email draft preparation.
- Status: Fixed in code.

4. No trusted backend for payment verification or privileged workflows
- Impact: If this frontend were deployed as a real donation application, it would still lack the mandatory server-side controls for payment verification, webhook handling, receipts, refunds, admin auth, and audit trails.
- Affected area: entire architecture
- Fix: Not fixable inside this frontend-only repo alone.
- Status: Open. Requires new backend and deployment work.

### Medium Risk

5. Missing security headers and CSP
- Impact: Weaker defense against framing, injection, mixed-content downgrade, and privacy leakage.
- Affected file: `index.html`
- Fix: Added CSP, referrer policy, nosniff, and permissions policy meta headers suitable for this static build and its third-party embeds.
- Status: Fixed in code.

6. Weak input validation and missing bounds checking
- Impact: Allowed junk input, misleading records, and poor resilience against client-side abuse.
- Affected files: `src/components/FormsView.tsx`, `src/components/DonateView.tsx`
- Fix: Added normalization, length limits, phone validation, donation amount bounds, and safe encoding helpers via `src/security.ts`.
- Status: Fixed in code.

7. Misleading success messages implied trusted storage or processing that did not exist
- Impact: Operators and donors could incorrectly believe the system had securely accepted and stored sensitive workflows.
- Affected files: `src/components/FormsView.tsx`, `src/components/DonateView.tsx`
- Fix: Updated copy to explain that drafts are handed off instead of stored.
- Status: Fixed in code.

8. Third-party embeds lacked privacy hardening
- Impact: Reduced privacy and weaker embed restrictions.
- Affected file: `src/components/DonateView.tsx`
- Fix: Switched YouTube embed to `youtube-nocookie.com` and added `loading`, `referrerPolicy`, and `sandbox` attributes.
- Status: Fixed in code.

### Low Risk

9. No automated security tests
- Impact: Harder to prevent regressions in validation and secure handoff behavior.
- Affected area: project tooling
- Fix: Added `src/security.test.ts` and `npm test` script.
- Status: Fixed in code.

10. Limited repository assurance for historical secret exposure
- Impact: Current tree appears clean, but a lightweight history pattern search is not a complete historical secret audit.
- Affected area: Git history review depth
- Fix: None in code. Use dedicated secret-history scanning before production.
- Status: Open.

## Positive Security Controls Present After Hardening

- No confirmed secrets in the current working tree
- Lockfile present
- TypeScript type-checking in CI-friendly script form
- Validated and normalized user input before contact handoff
- Donor/help/volunteer data no longer stored in browser local storage
- Public donor board converted to sample content only
- Decommissioned client-only admin behavior
- Added CSP and browser hardening headers
- Added targeted automated security tests
- `npm audit` reported `0 vulnerabilities` at audit time on July 21, 2026

## Files Modified

- `index.html`
- `package.json`
- `src/App.tsx`
- `src/components/AdminPanel.tsx`
- `src/components/DonateView.tsx`
- `src/components/FormsView.tsx`
- `src/components/HomeView.tsx`
- `src/components/Navbar.tsx`
- `src/security.ts`
- `src/security.test.ts`

## Tests Added

- Input normalization and control-character stripping
- Indian phone normalization and validation
- Person-name validation
- Donation amount bounds validation
- Minimum-text validation
- Safe `mailto:` URL generation
- Safe WhatsApp URL generation

## Secrets Requiring Rotation

- No confirmed active secrets were found in the current working tree
- No rotation action is triggered by the reviewed files alone
- Before production, run a full secret-history scan against the full Git history and any deployment platform secrets

## Deployment Configuration Changes Needed

1. Add a real backend before enabling real donations, receipts, or staff workflows.
2. Introduce server-side authentication with MFA for trustees/admins.
3. Add server-side validation, rate limiting, CAPTCHA/anti-bot controls, and audit logging.
4. Implement payment-gateway server-side verification, webhook signature validation, idempotency, and reconciliation.
5. Serve equivalent CSP and security headers at the web server/CDN layer, not only via HTML meta tags.
6. Add CI security steps: secret scanning, `npm audit`, SAST, and dependency review.

## Remaining Risks

- No backend, database, or authentication layer exists in the repo
- No true payment gateway integration exists in the repo
- No webhook processing exists in the repo
- No audit logging, monitoring, or alerting exists in the repo
- No bot mitigation or rate limiting exists because submissions are currently handed off client-side
- Meta-tag CSP helps, but production servers should enforce headers directly
- Full Git-history secret assurance was not completed with a dedicated secret-scanning tool

## Recommended Future Improvements

1. Build a backend API with role-based access control and MFA-backed trustee/admin auth.
2. Move all distress, volunteer, donor, and contact workflows to server-side storage with retention rules.
3. Add structured audit logging for privileged operations.
4. Implement proper payment order creation, callback verification, webhook verification, and reconciliation.
5. Add anti-automation controls for public forms.
6. Add CI security automation: secret scan, SBOM, dependency scan, SAST, and DAST.
7. Review privacy notice, consent wording, and retention/deletion procedures before collecting real data.


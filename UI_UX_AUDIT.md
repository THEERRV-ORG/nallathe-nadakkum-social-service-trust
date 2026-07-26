# UI/UX Audit — Nallathe Nadakkum Social Service Trust

**Auditor:** Senior UI/UX Designer & Design Auditor
**Scope:** Full site — Home, About, Services, Gallery, Donate, Transparency, Speaker, and the three Forms views (Help, Volunteer, Contact), plus Navbar, Footer, shared components.
**Method:** Direct source inspection of every component + live browser inspection at desktop (1280) and mobile (375) in both English and Tamil.
**Nature:** Report only. No code changed.

> **Important correction to the brief:** The audit request asks whether *Space Grotesk* should remain. Space Grotesk is **no longer in the codebase.** The current stack (verified in `src/index.css`) is **Cabinet Grotesk** (display/headings), **Manrope** (body/UI), and **Source Serif 4** (editorial/quotes). Recommendations below are written against what is actually shipping.

---

## 1. VISUAL HIERARCHY

### 1.1 — Card-on-card-on-card repetition is the site's dominant visual problem
- **Location:** Home (`HomeView.tsx`: "Contribution/Photo/Video" 3-card row → Mission/Vision 2-card → "What Can You Donate" 6-card), Transparency (`TransparencyView.tsx`: 3 legal cards → 2 table cards), Donate (warnings 2-card → banking card → pledge card → gratitude 3-card → video card).
- **Current problem:** The overwhelming majority of sections are the same object — a white `rounded-2xl` box with `border-gray-100` and the shared `shadow-[0_10px_30px_-12px_...]`. Six or seven consecutive sections read as visually identical rectangles.
- **Why it hurts:** With no variation in container shape, the eye cannot tell a *primary* section (donate) from a *supporting* one (video library). Everything competes at the same volume, so nothing wins. It also makes the site feel like a dashboard, not a mission-driven trust.
- **Severity:** High
- **Recommended improvement:** Keep cards for genuinely enumerable, comparable items (donate options, services index, gallery, FAQ). Convert narrative/one-off sections (Who We Are, Founder message, Mission/Vision, the three "Contribution/Photo/Video" reassurances) to card-less editorial or split layouts. Establish a rule: *a section is a card only if it contains a repeating set of sibling items.*

### 1.2 — The three "Contribution / Photo / Video Updates" cards are low-value and high-prominence
- **Location:** `HomeView.tsx` lines ~253–319.
- **Current problem:** Three equal cards restating "we acknowledge donations / we post photos / we post videos" — generic reassurance copy with icon tiles, given the same weight as real programs.
- **Why it hurts:** They sit immediately above the key conversion section and dilute it. They say nothing a donor can act on.
- **Severity:** Medium
- **Recommended improvement:** Compress into a single thin trust-strip (icon + one line each, horizontal), or fold into the transparency messaging. Reclaim the vertical space for the donate spotlight.

### 1.3 — Heading hierarchy is mostly sound but size-inconsistent across pages
- **Location:** Services H1 is `text-4xl sm:text-5xl` (`ServicesView.tsx:189`); Home/About/Donate/Transparency H1 are `text-3xl sm:text-4xl`. Section H2s hover around `text-2xl sm:text-3xl` but the donate spotlight H2 jumps to `text-4xl sm:text-5xl` (`HomeView.tsx:335`).
- **Current problem:** No fixed type scale — page titles disagree on size between pages.
- **Why it hurts:** Undermines a predictable rhythm; the Services page title feels "bigger deal" than the Donate page title, which is backwards for conversion priority.
- **Severity:** Medium
- **Recommended improvement:** Lock a scale (see §E). One H1 size for all page heroes; one H2 size for section titles; allow *one* deliberate oversized display size reserved for the single most important conversion block.

### 1.4 — Visual rhythm is now uniform after the recent spacing pass
- Section gaps were standardized to `space-y-12` (48px) across pages — this is working. The remaining rhythm problem is *sameness of blocks*, not gap size (see 1.1).
- **Severity:** Low

---

## 2. TYPOGRAPHY

### 2.1 — Current fonts render correctly and the pairing is good
- **Verified rendering:** Headings → `Cabinet Grotesk`; body/nav/forms/footer → `Manrope`; quotes/taglines/"Good things will happen." → `Source Serif 4` italic.
- **Assessment:** This is a strong, modern non-profit pairing. Cabinet Grotesk gives confident headlines; Manrope is highly legible for bilingual UI; Source Serif 4 adds warmth exactly where emotion belongs. **Keep this system.** Do not reintroduce Space Grotesk.
- **Severity:** Low (this is a strength)

### 2.2 — Global justified body text with `hyphens: none` risks rivers in narrow columns
- **Location:** `index.css` — `:where(.site-shell p, li, blockquote){ text-align: justify; hyphens: none; }`
- **Current problem:** Justify + no hyphenation in narrow cards (e.g. the 3-column donate desc, mobile) forces large inter-word gaps ("rivers").
- **Why it hurts:** Reduces readability, the opposite of the intent; especially visible in Tamil where words are long.
- **Severity:** Medium
- **Recommended improvement:** Justify only wide single-column prose (≥ ~60ch). Left-align text inside cards and any column narrower than ~48ch.

### 2.3 — Uppercase micro-labels are overused as a texture
- **Location:** `text-[10px] font-bold uppercase tracking-wider/widest` appears dozens of times — donate `dt` labels, form labels, kickers, status chips, footer headers.
- **Current problem:** Tiny all-caps is the default for nearly every label. At 10px with wide tracking it's both low-contrast in *rhythm* and slightly hard to read.
- **Why it hurts:** Over-reliance flattens hierarchy — a field label and a section eyebrow look the same. All-caps also harms Tamil, which has no case.
- **Severity:** Medium
- **Recommended improvement:** Reserve uppercase for true eyebrows/kickers only. Use sentence-case `text-xs font-semibold` for form labels; never uppercase Tamil labels.

### 2.4 — Body copy weight/size is consistent; Tamil handling is thoughtful
- Tamil keeps the same size as English with relaxed `line-height: 1.85` (`index.css`) — correct decision, respects the primary language. Keep.
- **Severity:** Low (strength)

---

## 3. SPACING & LAYOUT

### 3.1 — The Services scroll-pinned index consumes ~2.1 viewports before real content
- **Location:** `ServicesView.tsx:203` — pinned wrapper `height: calc(100vh + 110vh)`.
- **Current problem:** The interactive index eats ~210vh of scroll to step through 6 items before any chapter appears.
- **Why it hurts:** On a content page, that is a very long "empty" scroll investment for a preview the user will scroll past again in the chapters. High effort, low payoff; risks feeling broken to users who don't realize scroll is being intercepted.
- **Severity:** High
- **Recommended improvement:** Reduce the pinned range (e.g. `+60vh`) or make the index a compact sticky rail beside the chapters rather than a full pre-scroll. Verify it degrades gracefully (reduced-motion path already does).

### 3.2 — Container widths are inconsistent between sibling sections
- **Location:** Services hero `max-w-4xl`, chapters `max-w-7xl`; Speaker page mixes `max-w-4xl` (quote+form) with `max-w-7xl` shell; Donate mixes `max-w-3xl` header, `max-w-4xl` pledge, `max-w-7xl` shell.
- **Current problem:** Content edges shift left/right between stacked sections on the same page.
- **Why it hurts:** Breaks the vertical alignment spine; feels slightly unsettled.
- **Severity:** Medium
- **Recommended improvement:** One page shell width (`max-w-7xl`) + a single inner "prose" width (`max-w-3xl`) for centered intros. Avoid a third width unless intentional.

### 3.3 — Footer uses a different horizontal padding scale than the rest of the site
- **Location:** `App.tsx:82` footer uses `px-6 sm:px-10 lg:px-16`; every page uses `px-4 sm:px-6 lg:px-8`.
- **Current problem:** Footer content is inset further than page content above it.
- **Why it hurts:** The left edge of the footer doesn't line up with the page's content column.
- **Severity:** Low
- **Recommended improvement:** Align footer to `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8` like the rest.

### 3.4 — Donate page is very tall and front-loads warnings
- **Location:** `DonateView.tsx` — order: title → **Safety warning + Tax warning** → Banking → Pledge → Gratitude → Video.
- **Current problem:** The first thing a ready-to-give donor sees is two alarm-colored warning boxes (red + amber) before the account details.
- **Why it hurts:** Necessary disclosures, but leading with red/amber alarms slightly depresses conversion intent before the ask.
- **Severity:** Medium
- **Recommended improvement:** Lead with the banking/UPI block (the action), then place the safety + tax notices directly beneath it as supporting context. Keep them visible, just not first.

---

## 4. REPETITIVE DESIGN

### 4.1 — Where cards ARE appropriate (keep)
- Donate options grid ("What Can You Donate") — comparable, enumerable. ✔
- Services index tiles + gallery grid + FAQ accordion. ✔
- Sample Gratitude Board, video library list. ✔

### 4.2 — Where cards are UNNECESSARY (convert)
- **Who We Are** (already card-less-ish but still boxed) and **Mission/Vision** — narrative; better as an editorial two-column or a full-bleed statement.
- **Contribution/Photo/Video** trio — reassurance, not data (see 1.2).
- **Transparency 3 legal cards** — these are three paragraphs of prose forced into equal boxes; a numbered/iconed editorial list would read better and feel more authoritative.
- **Home Founder message** — an emotional quote trapped in a bordered card; deserves a full-width, image-led or typographic treatment (the Speaker page's dark-quote treatment is a good reference, now that it's tuned).

### 4.3 — Sections that visually repeat each other
- Home "Contribution/Photo/Video" and Donate "After Making Your Donation" + video card cover overlapping trust/impact messaging in near-identical card form.
- Transparency legal cards and Donate warning cards share the icon-tile + heading + paragraph pattern.
- **Recommendation:** Introduce **2–3 alternative section archetypes** and rotate them: (a) editorial split (text | image), (b) full-width band (dark or brand-tinted) for emotional/CTA moments, (c) typographic statement (oversized heading, no box). The Journey timeline and the donate spotlight already prove the site can hold non-card layouts — extend that variety.
- **Severity:** High

---

## 5. NAVBAR

### 5.1 — Tamil "Activities & Gallery" wraps to two lines, breaking baseline alignment
- **Location:** `Navbar.tsx:64–67` deliberately allows `செயல்பாடுகள் & புகைப்படங்கள்` to wrap (`max-w-[8.5rem]`, 2 lines / 42px) while all sibling items are single-line (~27px).
- **Current problem (verified live):** In Tamil, one nav item is visibly taller than the rest inside the 64px bar.
- **Why it hurts:** The nav row looks uneven; the wrapped item draws unintended attention.
- **Severity:** Medium
- **Recommended improvement:** Shorten the Tamil label (e.g. `புகைப்படங்கள்` / "Gallery") so all items stay single-line, or move Gallery into the Community/Support-style grouping. Keep every top-level item on one line.

### 5.2 — Dropdown is hover-only intent with focus-within fallback — acceptable, but no click toggle on desktop
- **Location:** `Navbar.tsx:79–111` — `group-hover`/`group-focus-within`.
- **Current problem:** Desktop "Community & Support" opens on hover; there's no explicit click/tap-to-open for touch-on-desktop or precision users.
- **Why it hurts:** Hover menus are fragile for touchscreens in desktop layouts and for users who click expecting a panel.
- **Severity:** Low–Medium
- **Recommended improvement:** Add click-to-toggle with `aria-expanded` state in addition to hover; keep hover as an enhancement.

### 5.3 — Donate CTA and active states are well handled (keep)
- The green pill Donate CTA is distinct from text links; active tab uses `bg-emerald-50 text-emerald-700`; mobile menu has a left-border active indicator. All good.
- Language toggle is clear (`தமிழ் / English` with globe). Keep.
- **Severity:** Low (strength)

---

## 6. COLOR SYSTEM

### 6.1 — Emerald is a disciplined, on-brand primary (keep)
- The emerald ramp is derived from the real logo greens (`index.css` comments) and used consistently for primary actions, links, and success. This is the site's strongest system-level decision.

### 6.2 — Accent colors (blue/orange/gold/violet) are applied semi-arbitrarily
- **Location:** `brand-blue` (medical/ambulance) — consistent; `brand-orange` (food) — consistent; `brand-gold` (education/highlights) — mostly; `brand-violet` used for "last rites/dignity" **and** the Contact page eyebrow **and** "Our Name" labels **and** Leadership uses `brand-blue`.
- **Current problem:** The four accents started semantic (per service) but leak into unrelated UI (eyebrows, section labels) where they carry no meaning.
- **Why it hurts:** Color stops *meaning* anything; a violet label on Contact implies a relationship to last-rites that doesn't exist.
- **Severity:** Medium
- **Recommended improvement:** Formalize a semantic map (see §E): each accent = one program domain, used **only** on that program's surfaces. All generic labels/eyebrows use neutral or emerald. Never use a program accent decoratively.

### 6.3 — Warning palette is fine; red FCRA/amber pending are used correctly
- Red = "do not send to individuals" / FCRA-blocked; amber = 80G pending. Semantically correct. Keep, but see 3.4 for placement.

---

## 7. IMAGES & BRANDING

### 7.1 — Watermark is a single faint centered logo — NOT distracting (keep, minor)
- **Location:** `App.tsx:46–53` — one fixed grayscale logo at `opacity-[0.05]`.
- **Assessment:** Contrary to the brief's assumption, there is no *repeated* watermark tiling — it's one subtle mark. It's fine. Only caution: at `38rem` on large screens it can sit behind text with low-contrast imagery; verify it never reduces text legibility on the dark hero (it's below `-z-10`, so safe).
- **Severity:** Low

### 7.2 — Logo appears at many sizes with no size system
- **Location:** Navbar `h-10`, About Why-section `clamp(220px,26vh,290px)`, Home Who-We-Are `h-72`, Footer `h-32`, watermark `38rem`.
- **Current problem:** Five very different logo renderings; the round-cropped versions (navbar/footer/home) vs contained version (About) show the mark differently.
- **Why it hurts:** Inconsistent brand presentation; round-crop can clip a logo designed as a full lockup.
- **Severity:** Low–Medium
- **Recommended improvement:** Decide one treatment (contained, not círculo-cropped, if the logo is a full lockup) and a small size set (nav / inline / hero / footer).

### 7.3 — Heavy reliance on placeholders in high-trust areas
- **Location:** Awards ("Photo coming soon"), Services "Our Teams" (member photo placeholders), Speaker "Past Talks" placeholders, Donate QR ("Coming Soon"), Bank/UPI real but QR pending.
- **Current problem:** Several credibility-building sections are visibly empty scaffolding.
- **Why it hurts:** Empty placeholders in Awards/Teams/QR can *reduce* trust more than omitting the section would.
- **Severity:** Medium
- **Recommended improvement:** Hide placeholder sections until real content exists, or replace with a single honest line ("Awards & recognitions will be published here"). Prioritize the **UPI QR** — it's the highest-conversion missing asset.

### 7.4 — Gallery imagery uses real external thumbnails (good) with `referrerPolicy` set
- Program/gallery images are real and lazy-loaded; object-cover crops are consistent. Keep.

---

## 8. IMPORTANT SECTIONS (targeted)

- **Homepage hero** — Strong: 5-image auto-slideshow, clear title, serif slogan, two CTAs, dot indicators moved to bottom-right (no overlap), award line tuned to 2 lines. **Keep.** Minor: auto-advance at 5s with no pause-on-hover/focus (see §11).
- **Founder message (Home)** — Emotionally important but boxed like everything else (see 4.2). **Upgrade to a distinctive layout.**
- **Direct Support Programs / Services** — Rich and detailed; the full-width detail boxes below the picture (recent fix) improved symmetry. Main issue is the pinned-index scroll cost (3.1).
- **What Can You Donate** — Correctly the boldest block (emerald spotlight, gold accent). Prominence matches importance. **Keep** — this is the model the rest of the site should aspire to for hierarchy.
- **About / Why Nallathe Nadakkum / Where It Began** — The editorial Why-section (heading left, logo right, two columns) is the best non-card layout on the site. **Keep and replicate this pattern elsewhere.**
- **Journey** — Scroll-pinned horizontal timeline with now-uniform cards. Distinctive and good; just heavy on scroll. **Keep**, monitor length.
- **Donation / Banking / UPI** — Banking credentials block is clear, symmetric, copy-buttons are a nice touch. **Highest priority fix: the missing UPI QR** and warning placement (3.4).
- **Gallery** — Clean, functional search + filter + modal. **Keep.**
- **Contact + FAQ** — FAQ is buried at the bottom of the Contact page only. Legitimacy/where-does-money-go questions belong closer to Donate. **Surface key FAQs on the Donate page too.**
- **Footer** — Dense but useful (programs, office, disclosures). Padding misaligned (3.3). Disclosures block (80G pending / FCRA no) is honest and good.

---

## 9. UX & CONVERSION

### 9.1 — Donate journey is strong; help/volunteer/speaker are clear
- Nav Donate pill → Donate page with presets from Home cards (preset carry + auto-scroll to form) is a well-built flow. ✔
- Request Help / Volunteer / Speaker are grouped logically under "Community & Support." ✔

### 9.2 — "Where do donations go?" is answered but scattered
- **Current problem:** 0%-admin claims (Home spotlight), transparency (separate page), impact video (Donate), audit ledger (Transparency) — the proof is spread across 3 pages.
- **Why it hurts:** A skeptical donor must hunt across pages to assemble trust before giving.
- **Severity:** Medium
- **Recommended improvement:** On the Donate page, add a compact "Your money → this outcome" strip and 3 key FAQs, linking out to full Transparency. Keep the ask and the proof on one screen.

### 9.3 — All conversions end in a WhatsApp handoff — good for this context, but set expectations
- Forms open WhatsApp with prefilled text. This is appropriate for the audience, but the success screens should make clear "this opened WhatsApp — tap send" (they now do). Keep. Consider a fallback for desktop users without WhatsApp.
- **Severity:** Low

---

## 10. RESPONSIVENESS

### 10.1 — No horizontal overflow on mobile (verified)
- At 375px, `scrollWidth === clientWidth`, zero elements exceed viewport. The `overflow-x: clip` safety net + responsive grids are working. **Keep.**

### 10.2 — Tamil navbar wrapping (see 5.1) is the main responsive-copy issue.

### 10.3 — Services pinned index on desktop only; mobile falls back to static — correct
- The reduced-motion / mobile path renders a normal index. Good defensive design.

### 10.4 — Very tall pages on mobile
- Home is ~8500px tall on mobile; Donate and Services are longer. Driven by the card-per-section stacking (§1) and pinned index (§3.1). Reducing block repetition will shorten scroll substantially.
- **Severity:** Medium

---

## 11. MICRO-INTERACTIONS

### 11.1 — Hover feedback is consistent and tasteful (keep)
- Cards lift (`hover:-translate-y-1`), buttons scale, social icons adopt brand colors, links underline. Motion is purposeful, not decorative.

### 11.2 — Hero slideshow has no pause on hover/focus
- **Location:** `HomeView.tsx:37–42` — fixed 5s interval.
- **Current problem:** Auto-advancing carousel can swap the image while a user is reading the caption/looking; no control to pause.
- **Why it hurts:** Minor accessibility/comfort issue (WCAG 2.2.2 for moving content).
- **Severity:** Low–Medium
- **Recommended improvement:** Pause on hover/focus and respect `prefers-reduced-motion` (stop auto-advance).

### 11.3 — A few decorative `animate-pulse` uses
- **Location:** Donate YouTube heading icon `animate-pulse`, active video play icon.
- **Current problem:** Pulsing a section-heading icon is decoration, not feedback.
- **Severity:** Low
- **Recommended improvement:** Remove pulse from static headings; keep it only where it signals live/active state.

---

## 12. ACCESSIBILITY

### 12.1 — Text contrast is now strong (recent black/white pass)
- Body text standardized to near-black `gray-900`; white on dark panels. Good. Verify the emerald-on-emerald donate spotlight subtext (`text-emerald-50/90`) still meets AA on the mid-emerald gradient — likely borderline.
- **Severity:** Low–Medium — verify the one gradient case.

### 12.2 — Focus states are inconsistent
- **Location:** Footer social links and SocialConnect have explicit `focus-visible:ring-2`. Most nav buttons, form inputs, and card buttons rely on default focus or `focus:outline-hidden` on inputs (which *removes* the outline in favor of a ring on inputs, but many buttons have no visible focus ring).
- **Current problem:** Keyboard focus is not consistently visible across interactive elements.
- **Why it hurts:** Keyboard users lose their place; fails WCAG 2.4.7.
- **Severity:** High
- **Recommended improvement:** Add a global `:focus-visible` ring for all buttons/links/controls (one token, applied via a shared class or base layer).

### 12.3 — Tiny click targets
- **Location:** copy buttons (`text-[11px]`, `px-2 py-1`), FAQ chevrons, `9px`/`10px` metadata.
- **Current problem:** Several tap targets are below the 44×44 recommendation.
- **Severity:** Medium
- **Recommended improvement:** Pad small icon buttons to ≥40px hit area (padding or `::before` expander), even if the visual stays small.

### 12.4 — Semantic heading order occasionally skips
- Some sections use `<h2>` then jump to `<h4>` (e.g. Donate warnings use `h4`, gratitude uses `h2`/`h4`). Assistive-tech users get an inconsistent outline.
- **Severity:** Low–Medium
- **Recommended improvement:** Keep heading levels sequential within each page.

### 12.5 — Reduced motion is respected in the big interactions (keep)
- Journey and Services index check `useReducedMotion`. Good — extend the same to the hero autoplay (11.2).

---

## 13. DESIGN CONSISTENCY

### 13.1 — Border radius is a free-for-all
- In use: `rounded-md`, `rounded-lg`, `rounded-xl`, `rounded-2xl`, `rounded-3xl`, `rounded-full`. Cards mix `rounded-2xl` and `rounded-3xl`; inner elements mix `lg`/`xl`.
- **Severity:** Medium — **standardize to a 3-step scale** (see §E).

### 13.2 — Shadows are inconsistent
- The elevated `shadow-[0_10px_30px_-12px_...]` is the intended standard, but `shadow-xs`, `shadow-sm`, `shadow-md`, `shadow-lg`, `shadow-2xl` all still appear — e.g. **`TransparencyView.tsx` still uses `shadow-xs`/`shadow-sm`** on its cards while Home/About/Donate use the elevated token.
- **Severity:** Medium — pick 2 elevation levels (resting + raised) and apply everywhere.

### 13.3 — Buttons have multiple shapes
- Pills (`rounded-full`) for nav Donate and service CTAs; `rounded-lg` for form submits; `rounded-xl` for some links. Same action (submit vs CTA) uses different shapes across pages.
- **Severity:** Medium — define primary/secondary/tertiary button styles once (see §E).

### 13.4 — Icon sizes vary by context without rule
- `h-3` to `h-7` icons; tiles `h-8`–`h-14`. Mostly fine, but the icon-tile sizes for section headers differ between Home (`h-12 w-12`) and Transparency (`p-3` wrap).
- **Severity:** Low.

---

# A. TOP 10 HIGHEST-PRIORITY IMPROVEMENTS

1. **Break card monotony** — introduce 2–3 non-card section archetypes and convert narrative sections (Founder message, Mission/Vision, Contribution/Photo/Video, Transparency legal trio) away from identical boxes. *(High, structural)*
2. **Add the UPI QR code** on the Donate page — highest-value missing conversion asset. *(High)*
3. **Global visible `:focus-visible` state** for all interactive elements. *(High, accessibility)*
4. **Cut the Services pinned-index scroll cost** (`+110vh` → smaller, or convert to a sticky rail). *(High)*
5. **Reorder the Donate page** — banking/UPI first, then safety + tax notices beneath. *(Medium→High conversion)*
6. **Standardize radius + shadow + button systems** (kill `shadow-xs`/stray radii; 3 button types). *(Medium, consistency)*
7. **Fix Tamil navbar wrapping** — shorten the Gallery label so all items stay single-line. *(Medium)*
8. **Formalize the accent-color semantic map** — program accents only on program surfaces; neutral/emerald for generic labels. *(Medium)*
9. **Reduce justify usage** — only wide prose; left-align inside cards/narrow columns (helps Tamil). *(Medium)*
10. **Hide/soften empty placeholders** (Awards, Teams, Past Talks) until real content exists. *(Medium, trust)*

---

# B. QUICK WINS (minimal code, high visual return)

- Replace `shadow-xs`/`shadow-sm` in `TransparencyView.tsx` with the standard elevated shadow token used elsewhere.
- Align footer padding to `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`.
- Shorten Tamil "Activities & Gallery" nav label to a single-line word.
- Add `onMouseEnter`/`focus` pause to the hero slideshow interval; stop autoplay under reduced-motion.
- Remove decorative `animate-pulse` from static section-heading icons (Donate video header).
- Collapse the three "Contribution/Photo/Video" cards into one horizontal trust strip.
- Left-align justified text inside all cards/columns (scope the `justify` rule to wide prose only).
- Add a shared `focus-visible:ring-2 ring-emerald-500 ring-offset-2` to buttons/links via a base layer.
- Verify/boost contrast of `text-emerald-50/90` subtext on the donate spotlight gradient.

---

# C. STRUCTURAL IMPROVEMENTS (layout/component work)

- **Section archetype library:** build reusable `EditorialSplit`, `FullWidthBand`, and `TypographicStatement` layouts; migrate 4–5 narrative sections off cards.
- **Donate page re-architecture:** action-first order; add a compact "money → outcome" proof strip + 3 key FAQs pulled onto the page.
- **Services index:** convert the 210vh pinned pre-scroll into a compact sticky side-rail synced to the chapters (keeps the interaction, removes the empty scroll).
- **Founder message redesign:** full-width, image-led or serif-typographic treatment (reuse the tuned Speaker dark-quote pattern) instead of a bordered card.
- **Unified logo component:** one `<BrandMark size=… variant=…>` to end the five ad-hoc renderings.
- **Design tokens:** centralize radius/shadow/button/color-role tokens (Tailwind `@theme` + a few component classes) so consistency is enforced, not hand-applied.

---

# D. KEEP AS-IS (already working — do not redesign)

- **Typography system** (Cabinet Grotesk / Manrope / Source Serif 4) — strong, keep. Do **not** revert to Space Grotesk.
- **Emerald primary palette** derived from the logo — disciplined and on-brand.
- **"What Can You Donate" spotlight** — correct hierarchy; the reference standard for the site.
- **About "Why Nallathe Nadakkum" editorial layout** — best non-card composition; replicate it.
- **Journey timeline** (now uniform cards) — distinctive, keep.
- **Gallery** search/filter/modal — clean and functional.
- **Banking credentials block** with copy buttons — clear and trustworthy.
- **Bilingual model** — Tamil at full size with 1.85 line-height; language toggle; persisted preference.
- **Mobile has zero horizontal overflow** — keep the `overflow-x: clip` safety net.
- **Hover micro-interactions** — purposeful, not decorative.
- **Footer disclosures** (80G pending / FCRA no) — honest and credibility-building.

---

# E. DESIGN SYSTEM RECOMMENDATION

**Typography (keep families; lock the scale)**
- Display/H1 (page hero): Cabinet Grotesk, `text-4xl sm:text-5xl`, extrabold — one size for *all* page titles.
- H2 (section): Cabinet Grotesk, `text-2xl sm:text-3xl`, bold.
- H3 (card/subsection): Cabinet Grotesk, `text-lg sm:text-xl`, bold.
- Body: Manrope, `text-base` (16px), `leading-relaxed`; Tamil `line-height: 1.85`.
- Small/meta: Manrope, `text-sm` min (retire routine `text-[9px]/[10px]` for readable content; keep 10–11px only for true chips).
- Editorial/quotes: Source Serif 4 italic.
- **One** reserved oversized display size (`text-4xl/5xl` H2) — used only on the single top conversion block.

**Spacing scale** — 4px base: `4, 8, 12, 16, 24, 32, 48, 64`. Section gap = **48** (current `space-y-12`, keep). Inner card padding = **24–32**.

**Container widths** — page shell `max-w-7xl`; centered prose `max-w-3xl`. No third width unless deliberate (retire stray `max-w-4xl`/`max-w-2xl` mixing).

**Border radius (3 steps)** — `rounded-lg` (inputs/small controls), `rounded-2xl` (cards/panels), `rounded-full` (pills/avatars/chips). Retire `md`, `xl`, `3xl` from general use.

**Shadows (2 levels)** — resting: `shadow-[0_10px_30px_-12px_rgba(16,24,40,0.15)] ring-1 ring-gray-900/[0.04]`; raised (hover/emphasis): a single stronger token. Retire `shadow-xs/sm/md/lg/2xl` scattering.

**Color roles**
- Primary/action/link/success → **emerald** (existing ramp).
- Program accents (surfaces of that program *only*): Food → **orange**, Medical/Ambulance → **blue**, Education → **gold**, Last Rites/Dignity → **violet**.
- Warning/critical → red; pending/caution → amber.
- Neutral text → `gray-900` (near-black); surfaces → white / `gray-50`. Generic labels/eyebrows → neutral or emerald, **never** a program accent.

**Buttons (3 types)**
- Primary: emerald fill, white text, `rounded-lg` (forms) or `rounded-full` (marketing CTA) — pick one shape per context and keep it.
- Secondary: white/`gray-50` fill, `border-gray-200`, emerald hover.
- Tertiary/link: text + underline on hover.
- All: shared `focus-visible` ring; min 40px tap height.

**Cards** — white, `rounded-2xl`, `border-gray-100`, resting shadow token; hover lifts to raised shadow. Use **only** for repeating sibling sets.

**Section spacing** — `space-y-12` (48px) between sections (already applied); `space-y-6/8` within a section.

---

# F. PAGE-BY-PAGE SCORE (/10)

| Page | Visual Design | Hierarchy | Consistency | Usability | Responsiveness | **Overall** |
|---|---|---|---|---|---|---|
| **Home** | 7 | 6 | 6 | 8 | 8 | **7.0** |
| **About** | 8 | 8 | 7 | 8 | 8 | **7.8** |
| **Services** | 7 | 7 | 7 | 6 | 7 | **6.8** |
| **Gallery** | 8 | 8 | 8 | 8 | 8 | **8.0** |
| **Donate** | 6 | 6 | 6 | 7 | 8 | **6.6** |
| **Transparency** | 6 | 7 | 5 | 7 | 8 | **6.6** |
| **Speaker** | 7 | 7 | 7 | 8 | 8 | **7.4** |
| **Forms (Help/Volunteer/Contact)** | 7 | 7 | 7 | 8 | 8 | **7.4** |
| **Navbar** | 7 | — | 7 | 7 | 6 | **6.8** |
| **Footer** | 7 | 7 | 6 | 8 | 8 | **7.2** |

**Site average: ~7.1 / 10** — a solid, trustworthy, well-built bilingual site. The ceiling on the score is set almost entirely by **(1) card/box monotony**, **(2) consistency drift** (radius/shadow/button/accents), and **(3) two specific structural costs** (Services pinned scroll, Donate ordering). None require a rebuild — they are variety, tokenization, and reordering.

---

### Highest-leverage single move
If only one thing is done: **establish 2–3 non-card section archetypes and apply them to the narrative sections.** It addresses the site's dominant weakness (everything looks the same) and instantly lifts Visual Design + Hierarchy across every page.

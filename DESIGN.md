---
name: "Paul Tobiloba — Security Portfolio"
description: "A restrained cyber portfolio grounded in engineering evidence."
colors:
  background: "#090E0C"
  surface: "#111A15"
  raised: "#18251D"
  text: "#EDF4EE"
  secondary: "#A7B8AD"
  muted: "#7C9383"
  accent: "#A5F3B8"
  ink: "#0C2414"
  border: "#2B3C30"
  grid: "#263D2E"
  amber: "#E5C486"
typography:
  hero:
    fontFamily: "Manrope"
    fontSize: "64px"
    fontWeight: 500
    lineHeight: "72px"
    letterSpacing: "-3%"
  hero-mobile:
    fontFamily: "Manrope"
    fontSize: "32px"
    fontWeight: 500
    lineHeight: "40px"
    letterSpacing: "-3%"
  display:
    fontFamily: "Manrope"
    fontSize: "56px"
    fontWeight: 500
    lineHeight: "64px"
  title:
    fontFamily: "Manrope"
    fontSize: "36px"
    fontWeight: 500
    lineHeight: "44px"
  heading:
    fontFamily: "Manrope"
    fontSize: "26px"
    fontWeight: 500
    lineHeight: "34px"
  subheading:
    fontFamily: "Manrope"
    fontSize: "20px"
    fontWeight: 600
    lineHeight: "28px"
  body:
    fontFamily: "Manrope"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: "26px"
  small:
    fontFamily: "Manrope"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: "22px"
  caption:
    fontFamily: "Manrope"
    fontSize: "12px"
    fontWeight: 500
    lineHeight: "18px"
  button:
    fontFamily: "Manrope"
    fontSize: "14px"
    fontWeight: 600
    lineHeight: "22px"
  mono:
    fontFamily: "IBM Plex Mono"
    fontSize: "12px"
    fontWeight: 400
    lineHeight: "20px"
  portrait:
    fontFamily: "IBM Plex Mono"
    fontSize: "6px"
    fontWeight: 400
    lineHeight: "3.65px"
rounded:
  r8: "8px"
  r12: "12px"
  r16: "16px"
  r32: "32px"
spacing:
  s4: "4px"
  s8: "8px"
  s12: "12px"
  s16: "16px"
  s20: "20px"
  s24: "24px"
  s32: "32px"
  s40: "40px"
  s48: "48px"
  s64: "64px"
  s80: "80px"
components:
  brand-identity:
    textColor: '{colors.accent}'
    width: '238px'
    height: '44px'
  brand-wordmark:
    textColor: '{colors.accent}'
    width: '238px'
    height: '32px'
  brand-icon:
    textColor: '{colors.accent}'
    width: '56px'
    height: '32px'
  capsule-header:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    rounded: "{rounded.r32}"
    height: "64px"
  navigation-action:
    backgroundColor: "{colors.raised}"
    textColor: "{colors.text}"
    size: "44px"
  contact-input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    typography: "{typography.small}"
    rounded: "{rounded.r8}"
    padding: "12px"
    height: "46px"
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.r8}"
    padding: "12px 20px"
    height: "46px"
  button-primary-hover:
    backgroundColor: "{colors.text}"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.r8}"
    padding: "12px 20px"
    height: "46px"
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    typography: "{typography.button}"
    rounded: "{rounded.r8}"
    padding: "12px 20px"
    height: "46px"
  button-secondary-hover:
    backgroundColor: "{colors.raised}"
    textColor: "{colors.text}"
    typography: "{typography.button}"
    rounded: "{rounded.r8}"
    padding: "12px 20px"
    height: "46px"
  tab:
    backgroundColor: "{colors.background}"
    textColor: "{colors.secondary}"
    typography: "{typography.small}"
    rounded: "{rounded.r8}"
    padding: "12px"
  tab-active:
    backgroundColor: "{colors.raised}"
    textColor: "{colors.accent}"
    typography: "{typography.small}"
    rounded: "{rounded.r8}"
    padding: "12px"
  scenario:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    rounded: "{rounded.r12}"
    padding: "24px"
  event-data:
    backgroundColor: "{colors.background}"
    textColor: "{colors.secondary}"
    typography: "{typography.mono}"
    rounded: "{rounded.r8}"
---

# Design System: Paul Tobiloba — Security Portfolio

**Current verification boundary:** the restored site and new console/explorer have source, build, parser, content-parity, and generated-HTML evidence. Final visual, browser, and runtime QA is incomplete. Automatic approval review denied localhost access because of the account usage limit; no retry or alternate access method was used. There are no current screenshots or whole-UI SHIP verdict. Historical browser checks and SHIP decisions apply only to the earlier, narrower implementation.

## Overview

**Creative North Star: "The Security Workbench"**

A calm, technical portfolio with a recognisable human presence. Dark green graphite, faint dots, a pale green accent, and clear typography frame engineering evidence and a careful exploration of security.

The binary portrait is the signature. Its source is Paul's user-selected hoodie photograph (Photo 3); a local circular window reveals the aligned real photograph within six layers of binary text. The floating capsule header keeps identity and actions accessible while the page scrolls. Interaction supports reading and investigation, with complete reading and action paths when motion is reduced.

**Key Characteristics:**

- Restrained green over a dark dotted ground.
- Human identity expressed through binary text and a local photo reveal.
- Legible engineering evidence with explicit attribution.
- Purposeful interaction with a complete still alternative.

This document records the established shared system across the restored homepage, project/work archives, eight case studies, blog, and three full articles. Figma remains the visual authority for the capsule/hoodie world; restored layouts, the simulated console, and the project explorer extend it in code only. Frontmatter primitives are preserved unchanged. styles/SecurityPortfolio.module.css supplies scoped rules. Sidecar specimens and tonal ramps remain documentation aids, not complete current-header previews. Native frame dimensions are reference-only.

## Colors

A single pale green accent sits over layered green graphite; amber identifies sample and event context.

### Primary

- **Pale Signal Green — accent:** primary actions, email circle, active controls, selected state, and sparing emphasis.
- **Deep Green Ink — ink:** dark text on pale primary actions.

**The Restrained Signal Rule.** Reserve accent for actions, active states, and deliberate emphasis; keep the baseline dotted ground faint.

### Context

- **Sample Amber — amber:** synthetic-scenario labels, failed-event status, and form errors. Preserve written status alongside color.

### Neutral

- **Graphite Ground — background:** page ground and recessed event area.
- **Workbench Surface — surface:** header, menu, scenario, form inputs, and project/context surfaces.
- **Raised Green — raised:** active tabs, outlined circular controls, and secondary-action hover.
- **Reading White — text:** primary copy and primary-action hover fill.
- **Soft Sage — secondary:** body support copy.
- **Muted Sage — muted:** metadata and explanatory labels.
- **Quiet Border — border:** fine boundaries and dividers.
- **Dot Green — grid:** subdued background texture baked into the approved SVG assets.

The earlier native review measured reading colors above 4.5:1 on documented dark surfaces, including muted on surface near 5.38:1. Those historical measurements are not a full runtime accessibility audit.

## Typography

**Display and body font:** self-hosted Manrope, with sans-serif fallback. Medium headings and regular prose retain an open reading voice. Local files cover weights 400, 500, 600, and 700.

**Data and portrait font:** self-hosted IBM Plex Mono Regular, with monospace fallback. Use mono for event rows and binary artwork; ordinary prose remains Manrope. Sources and OFL licenses are in public/assets/security/.

### Hierarchy

- **hero / hero-mobile:** the approved desktop 64/72 and mobile 32/40 styles with tight tracking.
- **Identity artwork:** approved direction C is font-free canonical SVG geometry; it does not change Manrope or IBM Plex Mono text roles.
- **display:** large case-study titles.
- **title:** prominent section statements.
- **heading / subheading:** section and project headings; scenario titles and workflow stages.
- **body / small / caption / button:** explanatory prose, support copy, metadata, and action labels.
- **mono:** event data.
- **portrait:** six overlaid preformatted text maps, 90 columns × 102 rows; asset-specific 6px/3.65px typography.

Frontmatter defines shared reference roles. Responsive CSS intentionally adapts hero type to clamp(40px, 4.45vw, 64px) below 1250px, 38/46 at ≤900px, 32/40 at ≤650px, and 29/37 at ≤370px. Case titles step through 56/64, 48/56, 44/52, and 36/44; editorial headings use 36/44, 32/40, and 26/34. These are deliberate responsive text treatments. Identity artwork uses shared SVG paths rather than a type token. Hidden desktop breaks retain literal spaces so adjacent words stay separated.

**The Reading First Rule.** Confine character disturbance to the portrait; links, labels, headings, and prose stay stable and readable.

## Layout

The page scrolls under a fixed inset capsule. At desktop reference width, the header is 1312 × 64 with 64px horizontal insets and 24px top offset. Main content uses 136px top padding and a 1440px maximum width. The hero has a 520px minimum height, a left copy column up to 720px, and a 439.2px right portrait. Editorial sections below use 360px headings and a flexible content column up to 800px.

At ≤1250px, horizontal insets become 40px and columns tighten. At ≤900px, editorial sections and cases stack, inline navigation hides, and the hero remains a two-column composition. At ≤650px, header insets are 16px with 12px top offset; body insets are 24px, hero copy/actions precede the portrait, and a touch hint explains reveal. The narrowest ≤370px layout uses 20px body insets. Actual text flow determines page height; native full-frame heights are reference-only.

The source constrains menu/dialog height to the viewport and permits internal scrolling. Project and article editorial layouts stack at existing responsive widths; restored services, skills, testimonials, and archive grids reuse the established rhythm. The approved SVG identity reserves 238 × 44px on desktop and 56px width at ≤650px, beside unchanged 44px circular actions. Menu identity flexes to the available width. Earlier 390/900/1440 overflow checks covered the narrow implementation; the current restored layout and new dialogs have no final rendered verification.

## Elevation & Depth

Depth comes from tonal layering, the native dotted SVG field, and fine borders. No shadow system is established. The menu backdrop uses a dark translucent ground to isolate the modal. Keep content surfaces quiet so portrait, reading hierarchy, and selected states carry the emphasis.

The pointer-local dotted illumination uses the approved native SVG, requestAnimationFrame, CSS variables, and offsets snapped to its 24px grid. Opacity returns over 350ms. Hoverless and reduced-motion modes hide the moving illumination. This ground effect is separate from the portrait's circular photo window.

## Shapes

Standard actions use r8; contained surfaces use r12, with r16 retained in the shared foundation. The floating header and menu use r32. Résumé, email, menu, and close controls are 44px circles. Thin borders articulate boundaries. Preserve the portrait silhouette; its local reveal uses a 160px circular window in the 360 × 390 source canvas, scaled with the portrait.

## Components

### Buttons and fields

Primary actions use accent/ink and switch to text/ink on hover. Secondary actions use surface/text with a fine border and raised hover fill. Both have a 46px minimum height, r8, 20px horizontal and 12px vertical padding, with 150ms state transitions. The browser focus treatment is a 2px accent outline with 5px offset; pending disabled actions use 0.6 opacity.

Contact is a quiet details disclosure. Labelled required name, email, subject, and message inputs retain the existing /api/contact contract. Inputs use surface/text, r8, 12px padding, and a 46px minimum height; the textarea resizes vertically. Pending state disables submit; polite live status reports success or errors. Blank submission blocking was exercised only in the earlier narrow implementation; final restored-site form behavior and email delivery remain unverified.

### Scenario tabs and event panel

Events, Context, and Decision are three explicit investigation states. Inactive tabs use background/secondary; the active tab uses raised/accent with an accent border. Tabs use r8 and 12px padding. The semantic tablist implements ArrowLeft/ArrowRight, Home, and End navigation with roving focus. The action advances and replays the same states. Mono event data includes written status and a clear synthetic label; the sample is illustrative, not a live security feed.

### Navigation and work

The capsule combines the approved SVG P+T identity, desktop section navigation, and four 44px circular actions: Console, Résumé, Email, and Menu. Direction C expansion and loading are specified below; current rendered header behavior remains unverified.

Expanded navigation retains the native dialog contract and links every restored section. The homepage, /works, /works-list, all eight case details, /blog, and all three articles use the shared shell. Original database/fallback access in src/lib/projects.js is unchanged; explicit LagosNet and reconciliation routes now use getProjectBySlug. Full genuine descriptions, conclusions, galleries, video controls, article bodies, and direct links remain. Archive result titles use h2; compact lists nested below homepage h2 sections use h3, including empty project results.

Project content uses 37 genuine published local rasters through projectAssets.json and provenance sidecars. The reconciliation workflow remains explicitly reconstructed, separate from genuine screenshots. Preserve all eight published projects, seven testimonials, three original full article bodies, and existing professional attribution. Six services and 32 unique skills retain all original content plus confirmed cyber entries; the six-role résumé preserves 27 original bullets. Programming Buddies is September 2026–present without invented duties; Union Bank ends August 2026.

### Simulated console and project explorer

The optional console uses IBM Plex Mono for commands/output inside the existing graphite native-dialog language. A header control, Ctrl/Cmd+K, or backtick opens it. It is explicitly simulated and client-only: a fixed whitelist and known-slug lookup support portfolio discovery, with no eval or shell execution. Quick buttons, bounded up/down history, unknown-command recovery, a labelled input, focusable output region, and polite status support discoverability. Preserve the direct reading routes as an alternative.

Project-card image buttons open Overview, Stack, and Outcomes from supplied project content and genuine mapped images. A full case-study action remains available. usePortfolioDialog implements native modal entry, Tab wrapping, Escape/backdrop close, scroll lock, and focus restoration; the explorer detail region is focusable and labelled. These contracts are verified in source, not final browser behavior. No new design primitives are introduced by this documentation.

The console/explorer pattern was inspired by uibeawuchi.com; no other person's claims or project evidence were borrowed. Current source/build/content checks and the explicit verification boundary are recorded in IMPLEMENTATION.md.

### Direction C SVG identity and loading

The user selected direction C from the right column of the second concept board. The open P, shaped T, and rounded geometric lettering are a font-free vector interpretation of that approved imagegen concept, not a bitmap crop or exact-tracing claim. src/data/brandGeometry.json is canonical: BrandLogo, wordmark, P+T icon, favicons, and loading mark reuse the same paths. No body font or palette changes accompany the identity.

Desktop reserves 238 × 44px for the home link and renders the canonical SVG at 238 × 32px (viewBox 0 0 681 90). P stays fixed; T moves from 76 to 236 SVG units over 420ms using cubic-bezier(.16,1,.3,1). Remaining letters use 200ms opacity and 420ms translation with 80ms entrance delay. Hover and keyboard focus reveal the full name. The finite contour intro is 700ms with T delayed 90ms. The logo is artwork, not a font role.

At ≤650px, identity is 56px wide with compact P+T; a 252px below-header full-name panel appears on hover/focus. Expanded menus show the full wordmark, flex to available width, and constrain artwork to at most 238 × 32px. Touch visitors can always find the full name in the menu. Action circles remain 44px.

### Full-screen Matrix loading

The approved full-screen graphite loader replaces the rejected header badge. Canonical direction-C SVG glyphs resolve from binary/mixed letters left-to-right into Paul Tobiloba, capped at 520px (76vw compact). The exact label is “Loading,” with 11px labels, 12px subtext, and “Hacking in progress…” then “Access granted.” The latter is presentation copy, not authentication. Progress is timed presentation, not bytes: it caps at 95% during actual route/font pending work and reaches 100% only when ready.

Startup uses 4200ms resolve + 220ms hold + 220ms fade. Subsequent pending navigation is delayed 120ms and resolves over 1800ms; fast/shallow transitions avoid a flash. Skip/Escape and a 10s fail-safe release the page, even if work is still pending. Reduced motion uses a full static name and immediate ready exit. Hidden-tab RAF pauses and resumes against wall time. New pending work revokes completion during hold/fade.

Default CSS hides and disables pointer handling for the SSR overlay. Only the client data-loader-ready effect reveals it and applies inert/aria-hidden/page-scroll management to the content wrapper; SSR content is not inert, so failed hydration leaves the page accessible. Noscript fallback and cleanup restore content/focus/scroll. The modal/progress/Skip contracts are source-inspected; their actual browser behavior remains unverified. Header identity paths/hover, brand exports, palette, and body typography are unchanged.

The meter is min(240px,72vw), or min(220px,70vw) at ≤650px; the name is about 24% smaller than the approved preview’s 681px composition. Its SVG identity remains font-free. The earlier header loading badge and looping ink/sweep specimen are retired; the separate finite header contour intro is unchanged.

Static artwork proof confirms the vector interpretation only. Rendered header layout, hover/focus/touch behavior, loading timing, navigation interruption, screen-reader delivery, and reduced-motion/hidden-tab execution remain browser-unverified. See IMPLEMENTATION.md and public/assets/brand/SOURCE.md for assets/provenance.

### Binary portrait and dotted ground

Six preformatted layers render the exact approved 0/1 maps from Photo 3, with an aligned local photo inside a circular SVG mask. Pointer coordinates are clamped to portrait-local bounds and written through CSS variables in requestAnimationFrame. Click/tap pins at the current position; another activation resets. The semantic button supports Enter/Space activation and Escape reset; aria-pressed communicates pin state. The reveal fades over 160ms; reduced-motion CSS removes the transition and pointer-following logic is skipped. Touch uses tap toggle. Source crop, local assets, and provenance are recorded in IMPLEMENTATION.md and public/assets/security/SOURCE.md.

Pointer movement, pin/reset, menu focus wrap/Escape, and scenario interactions have historical bounded runtime evidence for the earlier narrow version only. They do not verify the restoration, expanded header, console, or explorer. Reduced motion is source-inspected; final visual/browser/runtime QA, OS emulation, and comprehensive accessibility remain incomplete.

**The Still Access Rule.** Reduced-motion and touch presentation preserve the portrait, all content, and every action without dependence on animation.

## Do's and Don'ts

### Do

- **Do** keep role positioning and résumé access immediately legible.
- **Do** preserve the source-photo binary portrait and aligned local reveal.
- **Do** keep synthetic events and reconstructed project visuals explicitly labelled.
- **Do** retain complete reading and action paths in still and reduced-motion states.
- **Do** use shared tokens, local fonts, and scoped security styles consistently.

### Don't

- **Don't** invent internship duties, certifications, labs, or security engagements beyond the supplied role and content.
- **Don't** spread the character effect into links or reading text.
- **Don't** treat finite Figma states as proof of browser behavior; use runtime evidence.
- **Don't** turn the subdued dotted field into a competing foreground effect.

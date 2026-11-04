# Security portfolio implementation

**Current verification boundary:** the restored site, project explorer, PowerShell playground, local Signal map, and Role explorer have source/build/unit-test evidence, with earlier content-parity and generated-HTML checks for the restoration. Final visual, browser, and runtime QA is incomplete. Automatic approval review denied localhost access for account usage/origin-authority reasons; no retry or alternate access method was used. There are no current screenshots or whole-UI SHIP verdict. Historical browser checks and SHIP decisions apply only to the earlier, narrower implementation.

Earlier implementation snapshots were committed and published on [codex/security-portfolio](https://github.com/Paul-Tobiloba/Paul-Portfolio/tree/codex/security-portfolio). The Signal map skills extension, Role explorer, and existing internship wording edits were developed locally for the authorized GitHub update. The user’s latest instruction explicitly authorizes pushing the completed work to GitHub, superseding the earlier local-only publication restriction. The publication target is codex/security-portfolio. Earlier publication records below refer only to their historical snapshots. Production deployment remains unverified. No dependencies were added. The [Figma design](https://www.figma.com/design/XcYJ00CBa60q4GyCns4RW8) remains visual authority for the established capsule/hoodie world; restored content layouts and console/explorer extensions are code-only.

## Current project and loader update

The public project and approved walkthrough registries in `src/lib/projectAvailability.mjs` determine available actions. The three public destinations returned HTTP 200 during the check. Noirak returned HTTP 500 and Lagos EPPPS could not be resolved during the check, so both retain their galleries without a public-site CTA. The old data-driven video/preview fields are not selected or serialized. No recording was approved; none is exposed. The AI Accountant outcomes use the revised qualitative copy for both database and fallback records. No database records were modified.

The existing synthetic sign-in scenario also appears at `/works/sign-in-triage-lab`, with a methodology and decision rationale. This is an authored training exercise, not production incident evidence. The matrix intro now stays hidden unless real work is still pending after 220 ms. If shown, it uses a 350 ms animation, a 70 ms hold and a 140 ms fade, with an 1,100 ms cap from its start and reduced-motion suppression at entry. Earlier startup timing notes are historical. The homepage hero uses the revised automation and cybersecurity positioning.

On 2026-11-04, Vercel reported the public alias on the ready `main` deployment for `d773b416`. Five sampled public responses across the homepage and two case studies shared one build ID and still served the old case-study CTA. The new update has local build, unit and generated-HTML coverage. Browser/mobile, assistive technology, and measured page performance remain unverified.

## Signal map tool marks

Each of the 32 existing entries has a decorative mark beside its button label and a larger mark in the selected details. The 29 branded entries use 28 local files, documented in `public/assets/skill-marks/SOURCES.md`. SQL, networking and tcpdump use neutral Lucide symbols. Brand marks are muted by default, with original colors shown on hover, focus and selection. The selected detail always shows the original colors. Sizes adapt within the existing responsive layout and transitions honor reduced motion. No new package or third-party image request is needed.

## Run on Windows

Use npm.cmd in PowerShell to avoid the npm.ps1 execution-policy issue. NEXT_DIST_DIR keeps output separate from the existing tracked .next directory.

```powershell
npm.cmd ci

$env:NEXT_DIST_DIR = ".next-security-dev"
npm.cmd run dev

# In a separate terminal, or after stopping the development server:
$env:NEXT_DIST_DIR = ".next-security-matrix"
npm.cmd run build
npm.cmd run start
```

Use the same NEXT_DIST_DIR value when starting a production build. These are run instructions, not authorization to retry the blocked browser origin.

## Approved direction C identity and loading

The user selected direction C from the right column of the second concept board. The open P, shaped T, and rounded geometric lettering are a font-free vector interpretation of that approved imagegen concept, not a bitmap crop or exact-tracing claim. src/data/brandGeometry.json is canonical: BrandLogo, wordmark, P+T icon, favicons, and loading mark reuse the same paths. No body font or palette changes accompany the identity.

BrandLogo.jsx renders the unchanged header geometry. BrandLoading.jsx now renders the approved full-screen Matrix introduction; MatrixWordmark.jsx and matrixLoading.mjs supply glyph resolution and controller state. SecurityApp.jsx owns font/navigation pending state and the progressive-enhancement content wrapper/ref; routeLoading.mjs retains router ownership. Identity in PortfolioShell and the securityPortfolio branch of pages/_app.js use this system.

Desktop identity reserves 238 × 44px, with a 238 × 32px SVG using viewBox 0 0 681 90. P stays anchored; hover and keyboard focus move T from 76 to 236 SVG units over 420ms with cubic-bezier(.16,1,.3,1). Remaining letters enter with 200ms opacity and 420ms translation, delayed 80ms. The old text PT 23px and generic 180ms name reveal are retired.

At ≤650px, the header reserves 56px for compact P+T. Hover/focus shows the full wordmark in a 252px below-header panel; touch visitors have the full name in the expanded menu. Menu identity flexes to available width, with full SVG at most 238 × 32px. Existing circular actions remain 44px. The home link retains “Paul Tobiloba, home”; SVG artwork is decorative to assistive technology.

The header contour entrance remains finite at 700ms with a 90ms T delay. Its former small loading badge/ink/sweep loops are retired by the approved Matrix replacement specified below.

The router helper still ignores shallow filters and protects active-URL ownership against older completion/errors. Frame/font callbacks, timers, and visibility/motion listeners are cleanup guarded. The Matrix controller adds pending-renewal and progressive-enhancement guards detailed below; these are source facts.

Assets under public/assets/brand/: wordmark.svg, wordmark-ink.svg, monogram.svg, icon.svg, favicon-32.png, apple-touch-icon.png (180px), and icon-512.png. Root public/favicon.ico is the fallback. PNGs are native SVG exports through installed Sharp, with source JSON sidecars and SOURCE.md ledger. No imagegen call was made for this implementation; it vectors the prior approved concept.

Reference: C:/Users/USER/OneDrive/My Documents/ChatGPT/KooduLabs/output/paul-tobiloba-logo/paul-tobiloba-concepts-v2.png. Artwork evidence: C:/Users/USER/OneDrive/My Documents/ChatGPT/KooduLabs/.build/security-portfolio/brand/brand-artwork-proof.png. This proof shows static SVG artwork only; it is not a rendered header screenshot or motion evidence.

Current brand checks: five route lifecycle Node tests pass via npm.cmd run test:brand. The final isolated .next-security-brand build passed all 17 static pages and API routes; git diff --check passed. Targeted lint reports zero errors and 13 warnings: 11 unchanged legacy _app font/manual-style warnings and two native SVG-image warnings. Asset validation passed for four font-free SVG masters without external references, PNG dimensions 32/180/512, and an ICO container matching PNG32. The brand provenance scan reports three rasters and zero missing origins/prompts; PNGs retain JSON sidecars and embedded native-SVG origins. ICO was refreshed from the annotated32px PNG without pixel/code changes after the final build. The download pack is C:/Users/USER/OneDrive/My Documents/ChatGPT/KooduLabs/output/paul-tobiloba-logo/paul-tobiloba-direction-c-v1.zip. The source/artwork review found no material implementation/asset defect; it is not whole-UI SHIP.

The implementation lives on codex/security-portfolio; the earlier portfolio snapshot was pushed at 92da56d. The user authorized publication of this identity extension. Production deployment and rendered verification remain unverified.

### Approved full-screen Matrix loader

The user rejected the small header badge and approved the inline preview at C:/Users/USER/.codex/visualizations/2026/11/02/01a19ccf-95bd-7952-bfb3-75d469c00c2b/matrix-loader-preview.html, then requested a smaller name and the exact label “Loading.” BrandLoading.jsx now renders that full-screen graphite introduction. MatrixWordmark.jsx uses canonical direction-C font-free geometry plus deterministic binary/mixed SVG glyphs resolving left-to-right into Paul Tobiloba. Header P+T expansion, brand exports, body fonts, palette, and portfolio content remain unchanged.

The name is capped at 520px (about 24% narrower than the preview’s 681px), with width min(76vw,520px); compact layout uses 76vw. Meter width is min(240px,72vw), or min(220px,70vw) at ≤650px. Labels are 11px IBM Plex Mono; subtext is 12px. Caption changes from “Hacking in progress…” to “Access granted.” It is presentation copy, not an authentication/device-access claim.

matrixLoading.mjs controls timed presentation progress, not downloaded bytes. Startup resolves over 4200ms, then holds 220ms and fades 220ms after actual route/font work is ready. While actual work is pending, progress stays at or below 95%; 100%/Access granted occurs only when ready. Renewed pending work clears readyAt during either hold or fade, revoking completion and preventing a close/reopen race.

Subsequent pending navigation waits 120ms before starting an 1800ms resolve; fast cached navigation and shallow filters avoid a flash. The sequence has a 10-second fail-safe, Skip loading screen, and Escape release. Skip may reveal the page while actual work is still pending without claiming completed byte transfer. Reduced motion displays the full static name and exits immediately when ready. Hidden-tab RAF work pauses; resume uses elapsed wall time instead of replaying background time.

The client effect sets data-loader-ready before enabling the overlay and making the underlying content inert/aria-hidden with page scrolling locked. Default CSS keeps the SSR overlay hidden, invisible, and pointer-inactive; SSR page content is not inert. If hydration never reaches the effect, content remains accessible. SecurityApp supplies the content wrapper/ref and a noscript hidden-loader fallback. Cleanup restores prior inert/aria-hidden/overflow state and focus to a connected previous element or destination main. The labelled modal/progress semantics and single Skip-control keyboard loop are source facts, not browser accessibility verification.

SecurityApp, routeLoading.mjs, RAF/visibility/motion listeners, font callbacks, and timers retain cleanup/ownership guards. No fake bytes, minimum network wait, new raster, dependency, or actual authentication is introduced. The old near-header status, 1.6s loading-ink loop, and 1.4s sweep are retired; the separate finite header contour intro is unchanged.

Current source checks: all 15 loading tests pass through npm.cmd run test:brand (five route lifecycle and ten Matrix controller cases). Targeted lint has zero errors/warnings. The final after-fix .next-security-matrix production build passed all 17 static pages and API routes; git diff --check passed. Source review marks both hydration-trap and renewed-pending P2s resolved. Static generated-output checks in C:/Users/USER/OneDrive/My Documents/ChatGPT/KooduLabs/.build/security-portfolio/matrix-review/built-output.json confirm exact Loading text, no SSR client-ready marker, SSR page not inert, noscript fallback, and compiled overlay hidden until the client marker. This is static output evidence only. These checks establish source/controller behavior only; rendered timing, focus/scroll, announcements, hydration-failure UI, touch, reduced motion, and hidden-tab execution remain unverified.

The implementation lives on codex/security-portfolio; the prior identity snapshot was pushed at 6cc5ac4. Publication is user-authorized. Production deployment and rendered/runtime verification remain unverified.

## Sources and route coverage

- pages/index.jsx composes the existing hero/portrait and synthetic investigation with six services, 32 unique skills, eight projects, six roles/27 original bullets, seven testimonials, writing, about, and contact.
- src/data/portfolioContent.json preserves original content and confirmed additions. Programming Buddies is September 2026–present with five role-level bullets based on supplied activities (32 total résumé bullets, retaining all 27 originals); Union Bank is 2025–August 2026.
- pages/works.jsx and pages/works-list.jsx share the project archive. ProjectCollection provides category/search/reset states, native image-button previews, direct title/case links, and context-aware h2 archive/h3 compact headings.
- All eight published case studies use ProjectDetail. Dynamic details and explicit pages/works/lagosnet.jsx and reconciliation-rpa.jsx load through getProjectBySlug. Original src/lib/projects.js database queries, normalization, and fallback behavior are unchanged; the two explicit routes are no longer independent of that loader.
- ProjectDetail retains full descriptions/conclusions, genuine image galleries, a native full-image dialog, video controls and original video destinations, live links, and next-project links.
- pages/blog.jsx and pages/blog/[slug].jsx share the shell. WritingList uses h2 archive/h3 compact headings; ArticleBody retains all three full original article bodies, not shortened substitutes.
- PortfolioShell supplies the capsule with canonical SVG identity, expanded section menu, console trigger, common ground/footer, and route metadata. The securityPortfolio flag in pages/_app.js uses SecurityApp for route/font-pending loading and bypasses legacy loader/stylesheet links.
- styles/SecurityPortfolio.module.css remains the scoped visual system, including local fonts, responsive layout, focus, dialog, and reduced-motion rules.

## Approved Signal map skills extension

The user selected the Signal map variant in C:/Users/USER/.codex/visualizations/2026/11/02/01a19ccf-95bd-7952-bfb3-75d469c00c2b/skills-design-alternatives.html. This is an Experience-mode extension of the existing visual world, confined to #skills-section. pages/index.jsx keeps the existing section anchor and uses Section’s wide option for the user-preferred full-width layout; RestoredSections.jsx re-exports ProfessionalSkills from SkillSignalMap.jsx. styles/SkillSignalMap.module.css is local to this pattern. Header, portrait, loader, global tokens, routes, other sections and interactions are unchanged by this extension.

src/components/security/skillSignalMap.mjs derives four groups from portfolioContent.json, deduplicates names in discipline order, and exposes only name/description to the UI. The counts are Cybersecurity 9, Automation 11, Frontend 9, Tools & data 3: 32 unique skills, retaining all 24 originals. SQL appears once in Cybersecurity. Source numeric proficiency fields are retained only for content preservation; the new skills UI shows no percentage, rating meter or stage badge. Existing five internship bullets remain verbatim; the résumé has 32 total bullets, including all 27 original bullets.

SkillSignalMap.jsx defaults to Cybersecurity with Microsoft Sentinel selected. Native aria-pressed discipline/tool buttons control a selected-description polite status region. Hover/focus highlights a path without replacing or announcing the description; click/Enter/Space selects and sends one 800ms pulse. Actual hub/button rectangles drive cubic curves. ResizeObserver, window resize and font readiness schedule measurement; RAF, observer and listener cleanup are guarded. Natural controls render before measurement, with all skills/descriptions also present in noscript. Reduced motion removes pulse/transition behavior. The skill-signal inline-size container switches to the compact hub above two tool columns at its own width of ≤650px, with decorative connections hidden and --map-connected:0. The existing viewport fallback remains. No dependency, request, persistence or global pointer loop was added. These interaction and accessibility contracts are source facts, not browser or assistive-technology verification.

The source reviewer found one P2: the inherited shell button reset overrode tool typography. The fix consistently scopes base, state and responsive tool selectors as .signalMap .tool. The reviewer marked that finding resolved; its SHIP disposition is bounded solely to this source fix, not the rendered section or whole UI.

The final after-fix isolated .next-security-signal production build passed all 17 static pages and API routes. Four data/geometry tests passed on final source; targeted ESLint and git diff --check exited 0 without warnings/errors. Generated-output inspection confirms #skills-section, all 32 unique names including noscript, 13 initial native buttons (four disciplines/nine tools), two pressed states, resolving aria-controls, no skills meters/percentages/stage badges, and all 32 résumé bullets. Report: C:/Users/USER/OneDrive/My Documents/ChatGPT/KooduLabs/.build/security-portfolio/signal-map/built-output.json. HTML inspection proves content/markup presence, not rendering or interaction.

The Signal map source-only detector reported zero primary findings and five typography advisories. The new CSS was aligned to existing type steps afterward; the detector was not rerun. This scoped result does not replace the earlier truncated detector record. No current screenshot, browser/runtime, desktop/mobile, reduced-motion emulation or assistive-technology proof exists. Earlier automatic approval review rejected localhost access for account usage/origin-authority reasons and explicitly prohibited retry or alternative workarounds; none was attempted.

The Signal map skills extension, Role explorer, and existing internship wording edits were developed locally for the authorized GitHub update. The user’s latest instruction explicitly authorizes pushing the completed work to GitHub, superseding the earlier local-only publication restriction. The publication target is codex/security-portfolio. Earlier publication records below refer only to their historical snapshots. Production deployment remains unverified.

## Approved Role explorer experience extension

The user explicitly approved “Implement the Role explorer” from C:/Users/USER/.codex/visualizations/2026/11/02/01a19ccf-95bd-7952-bfb3-75d469c00c2b/experience-design-alternatives.html, Role explorer variant only. Their newest instruction restores the full available width for Skills and Experience, superseding the earlier screenshot-based layout constraint. pages/index.jsx applies Section’s optional wide prop only to those two sections; styles.fullWidthSection sets a single-column full-span composition with headings above the content, at 44/52 on desktop and 32/40 at ≤650px. Other sections retain the existing editorial layout and ≤900px stacking; #resume-section and #experience remain. RestoredSections.jsx re-exports FullResume from RoleExplorer.jsx; roleExperience.mjs supplies stable company labels, supplied-date formatting and descending-start-year ordering. styles/RoleExplorer.module.css scopes the inner presentation; new button type selectors outrank the inherited shell reset.

Programming Buddies is selected initially. Six company/date native buttons use aria-pressed and resolving aria-controls; all six complete mounted articles have labelled titles, full company attribution, exact dates and all 32 verbatim responsibilities (27 original plus five internship bullets). Programming Buddies stays September 2026–present; Union Bank ends August 2026. Current internship/Ongoing labels derive from the supplied endYear flags, without assigning a new employment type. The /resume.pdf destination remains.

Selecting a different role updates concise polite status without focus or scroll movement. Only a role change runs a finite 200ms Web Animations entrance from 0.75 opacity/translateY(5px) to opacity 1/translateY(0), using cubic-bezier(.16,1,.3,1). Animation replacement/unmount and reduced-motion preference listeners cancel and clean up. The client-only data-enhanced marker reveals selectors and hides inactive articles; default source HTML contains all six readable articles, with no hidden/aria-hidden articles or SSR client marker. Print rules restore every article. The role-explorer inline-size container uses a 190px rail/28px gap and 26px title at ≤800px, then two selector columns above details at ≤600px; the viewport ≤650px fallback remains. A final print reset follows the container queries to hide the rail regardless of query width. No dependency, request, persistence or raster was added; source content is unchanged.

The earlier isolated .next-security-roles build for the now-superseded editorial-layout correction passed 17 static pages and API routes. Three data/order/date tests passed; targeted ESLint reported zero warnings/errors and git diff --check passed. Generated-output report C:/Users/USER/OneDrive/My Documents/ChatGPT/KooduLabs/.build/security-portfolio/role-explorer/built-output.json confirms six exact complete articles, 32 verbatim responsibilities, six native buttons/one pressed state, resolving controls, preserved anchors/dates/PDF destination and readable SSR fallback. The historical C:/Users/USER/OneDrive/My Documents/ChatGPT/KooduLabs/.build/security-portfolio/role-explorer/editorial-output.json report confirmed the then-current identical outer section classes for skills/experience/portfolio and absence of a full-width override, the skill-signal ≤650px and role-explorer ≤800/600px container rules, and the unchanged outer ≤900px stacking breakpoint. These checks establish source/static-output facts, not browser behavior.

The historical source review of the superseded editorial-layout correction found no material findings and returned SHIP solely within its source scope. It confirmed the then-current wrappers, unchanged outer stacking, container rules after viewport rules, final print override, connection-mode consistency and cleanup; this is not a rendered-UI or whole-UI verdict. The Role explorer detector reported zero primary findings and one advisory for the 4px current-status badge, matching the approved preview and accepted as local geometry; shared radius foundations remain unchanged. Current desktop/mobile rendering, actual selection/announcement delivery, motion, assistive-technology and print output remain unverified. The prior automatic localhost approval rejection for account usage/origin authority explicitly prohibits browser/capture retries or alternate workarounds; none was attempted. The extension is included in the GitHub update explicitly authorized by the user’s latest instruction. Production deployment remains unverified.

The latest full-width restoration changes only the outer wrappers for Skills and Experience. The bounded source reviewer found no material findings and returned SHIP within source scope only; component interactions, container queries, data, anchors, PDF destination and other sections are unchanged. Current desktop/mobile rendering, browser/runtime, assistive-technology and print verification remain incomplete. Publication to codex/security-portfolio is authorized by the latest user instruction.

## Console and project explorer

### PowerShell playground commands and data boundary

PortfolioTerminal.jsx coordinates the simulated shell, TerminalOutput.jsx renders results, portfolioCommands.mjs resolves a fixed allowlist, terminalGames.mjs owns synthetic game state, browserDiagnostics.mjs collects browser-exposed reports, useBrowserSession.js keeps ephemeral counters, and pages/api/browser-network.js supplies own-site network observations. Appended CSS reuses the established world; no design tokens or dependencies were added.

The title is “Paul’s PowerShell playground” and the prompt is PS C:\Visitor>. It is not the visitor’s real PowerShell, OS account, or device shell. Existing help, whoami, projects, skills, experience, resume, contact, clear, and open <known-project-slug> remain. Known-slug navigation is the only project-open path; input is never evaluated. Existing PowerShell-style portfolio aliases remain case-insensitive.

| Command or alias | Scope |
|---|---|
| browserinfo; Get-WhatYourBrowserKnows; getuserinfo; Get-UserInfo; Get-BrowserInfo | Browser/device, session, font/canvas, and own-site network report |
| ipconfig; Get-NetIPConfiguration | Browser connection hints and this site’s observed IP/approximate region; no LAN IP, gateway, DNS, or MAC enumeration |
| location; Get-Location | Explicit browser geolocation request; requires browser support and a secure context, handles denial/unavailability/timeouts |
| ping; pingip; Test-Connection | Three fixed same-site HTTP response timings; self, this-site, or the site’s own host is accepted |
| hostname | Explains that a website cannot read the computer’s hostname |
| date; Get-Date | Local browser clock |
| games; Get-Games | Select a local educational game or training email |
| Send-PhishingEmail; Send-Phishing-Email | Start a cancellable local three-email campaign; no recipient arguments |
| email click; email report; email delete; email undo; email next; email retry; email pause; email resume | Local campaign decisions/progression; report required before next, same-round retry retains mistakes, undo only after deletion |
| play phishing; Start-PhishingQuiz | Synthetic phishing-message quiz |
| play soc; Start-SOCShift | Synthetic alert-triage quiz |
| play ports; Start-PortQuiz | Conventional port-number quiz |
| answer <choice> or displayed choice button | Submit the current game answer |
| exit; Stop-Game | End the active quiz or training-email scenario |
| clear; cls; Clear-Host | Clear displayed results and cancel the current task/quiz/email; command history remains bounded in memory |

Device facts are only what APIs expose: platform/user agent, logical processor count, architecture/bitness hints where supported, approximate rounded/capped memory, WebGL renderer, screen/pixel ratio, and battery state where available. Exact CPU model, OS username/device name, installed applications/extensions/files, and browsing history are unavailable. Local clock, languages, and timezone are device/browser settings, not location proof.

Session counters cover the current mounted page: clicks/taps, mouse-pointer distance in CSS pixels, hidden-tab count, elapsed time, and referrer origin only. They do not retain pointer paths, full referrer URLs/query strings, typed content, or browsing history. Reload resets counters. Limited canvas font comparison can be wrong and does not prove an application is installed. The canvas hash is a local non-cryptographic, nonunique demonstration, not a stable identity.

Browserinfo and ipconfig request only /api/browser-network. It is GET-only, validates the observed IP, uses private/no-store and CDN no-store headers, and ignores forwarded/IP-region headers outside Vercel. Local development reports the local connection/loopback, not the visitor’s public internet address. On Vercel it uses platform-supplied headers for observed public IP and approximate region, which may reflect a VPN, proxy, or network exit. The endpoint has no custom storage; ordinary hosting request logs may exist. No third-party IP service is called.

HTTP ping uses only fixed /api/browser-network?ping=1 request paths, with same-origin mode, omitted credentials, redirect rejection, no-store caching, and five-second request limits. Arbitrary IPs/hosts return an explanation without a fetch. Results include server/application work; they are not ICMP, pure network latency, or throughput tests.

Get-Location is separate from browserinfo and requests permission explicitly. Coordinates/accuracy are displayed locally, not persisted or uploaded by this feature; the browser/OS provider may use its own location service. Browser reports and canvas values likewise have no custom storage/upload. Requests for own-site network observations naturally expose normal HTTP request metadata to the host.

Starting another command, closing, or clearing aborts pending diagnostic work. Controller/job identity checks prevent stale results; cancelled geolocation callbacks are ignored. Output and command history are limited to 50 entries each in transient memory. New/finished results now scroll from the start of the newest command, resolving the source reviewer’s P2 finding; actual scrolling is not browser-verified.

Games are untimed and local, with randomized synthetic questions, scores, and explanatory feedback. Invalid answers preserve the current round; another game replaces the active one. Exit/clear stop it, and old question buttons are disabled. No account, real target, persistent score, or server game state is used.


### Three-email phishing campaign

Send-PhishingEmail (also Send-Phishing-Email) starts one transient three-round campaign entry, discoverable in quick actions, welcome/help, and games. It accepts no recipient or other arguments. PhishingEmail.jsx renders the training mail/attack/debrief views; phishingEmail.mjs owns local scenario and progression state.

The initial “Sending email…” beat remains a cancellable 900ms local timer, or 0ms under reduced motion. A new command, close, or clear cancels pending delivery, and job identity/abort guards reject stale completion. No real message is sent.

The realistic light email card remains a scoped content exception inside the established green console: sender/address, recipient/time, subject/body, blue CTA, native destination/attachment inspection, Report phishing, and Delete. The three fictional messages distinguish:
- Credential lure: workplace.example versus workplace-access.example, followed after a risky click by a mock account takeover.
- Macro invoice: ledgerworks.example versus ledgerworks-payments.example and a fictional .xlsm attachment. The consequence shows only invented workspace filenames gaining .locked suffixes.
- OAuth consent lure: projectspace.example versus projectspace-notices.example, with a mock request for mailbox, cloud-file, and ongoing access. Its consequence is fictional app/data access, not device infection.

Prominent labels state that this is simulated and the actual device is untouched. CTAs invoke local state only. No real email/network request, credential entry/capture, navigation, file/OS operation, OAuth grant/export, download, fullscreen, sound, or flashing effect occurs. Existing real contact-email behavior remains separate.

Report phishing gives correct-answer feedback and advances after 2500ms; reporting the third email advances to completion. Manual email next skips only this post-report wait, never an unreported round. The next email retains the previous correct feedback, and completion has native details for all three reports with description, red flags/signals, and lesson, including the final OAuth feedback. The summary shows three reported threats and the risky-click total. Restart resets the campaign/counters.

A risky CTA click increments mistakes and begins four local attack steps at 750ms each. Reduced motion completes the staged attack in one state update. “Contain & retry”/email retry restores the same round with mistakes retained; reporting is still required to advance. Delete is coaching plus Undo, never a false infection trigger. Undo restores an active deleted email without advancing.

Typed email click/report/delete/undo/next/retry/pause/resume mirror the corresponding controls. Pause/resume applies to running report/attack progression. Another portfolio command pauses a running campaign so it cannot steal attention. Closing the console suspends timers; reopening resumes only when the state was not explicitly/task-switch paused. Exit/Stop-Game and clear end it. A quiz replaces a campaign and a fresh campaign replaces a quiz.

Old decision controls, including inactive attack-card Exit, are disabled. The existing 50-entry ID ownership guard invalidates active campaign/quiz state on eviction. Updates keep the same campaign entry; scrolling occurs only for a requested entry, console opening, or phase change, not every intermediate attack tick. Announcements, focus, scrolling, reduced-motion execution, and actual rendered states still require browser verification.

The header button, Ctrl/Cmd+K, and backtick open the console. Source includes composition/repeat/open-dialog guards, backtick avoidance in editable fields, a labelled input and Run button, quick commands, up/down history, a labelled focusable output region, polite result status, and 50-entry limits for history/output.

ProjectExplorer opens from project-card image buttons. Overview, Stack, and Outcomes use the actual supplied description, technologies, and conclusion data. Direct full case-study links remain available. The explorer's scrollable detail region is focusable and labelled. usePortfolioDialog uses native showModal, initial focus, explicit Tab wrapping, Escape/backdrop closing, body scroll lock, and prior-focus restoration. These are source facts; final modal behavior has not been exercised in a browser.

The console/explorer pattern was inspired by uibeawuchi.com. No other person's experience, claims, or project content was imported.

## Assets and provenance

src/data/projectAssets.json maps 37 genuine published project rasters to public/assets/projects/ files with provenance sidecars. Original project data is preserved. The generated-HTML check resolved 51 referenced local image files; that count includes images outside the 37 project rasters and does not prove visual loading.

The user-selected Photo 3 hoodie source, approved derivative, native binary maps, SVG ground/masks/icons, locally hosted fonts, licenses, and origin/prompt records remain under public/assets/security/. See [SOURCE.md](public/assets/security/SOURCE.md). src/data/securityPortrait.json retains six layers, 90 columns × 102 rows, source crop [170,80,1080,1180]. The sign-in sample and workflow reconstruction keep their explicit disclosures.

## Current verification evidence

The final after-fix isolated .next-security-campaign build passed all 17 static pages and API routes. Final targeted ESLint including tests exited 0 with no warnings or errors. npm.cmd run test:terminal passed all 28 Node tests in tests/terminal-playground.test.mjs; git diff --check passed. The campaign source review marks both retained-feedback and stale-Exit P2s resolved in source. These are source/unit/build facts, not rendered or browser measurements.

The 28 tests cover prior browser/quiz/allowlist/network and local-email behavior plus three-round progression/totals, distinct staged consequences, containment with mistakes retained, pause/resume, no skipped/duplicate rounds, prior/all correct-feedback retention including final OAuth, safe deletion, and reduced-motion single-step completion. Earlier .next-security-mail/21-test and .next-security-playground/15-test results remain historical evidence.

The tests cover aliases/allowlist, game completion/invalid answers, API method/cache/header trust, limited browser APIs and origin-only referrer handling, cancellation, location denial/success, and refusal of arbitrary ping targets/fixed-site timings. Run npm.cmd run test:terminal to repeat them. The bounded source review marks the newest-result scroll P2 resolved in source. Desktop/mobile scroll behavior, actual permission prompts, and deployed Vercel-header behavior remain unverified.

The earlier .next-security-console build, 27 resolver cases, generated-HTML checks, and full-content parity remain historical evidence for the restoration. Content is unchanged by this extension: five original roles/27 bullets, 24 original skills, seven testimonials, eight projects, and three complete original article bodies remain, plus confirmed additions.

The generated-HTML report checks 15 content routes: home, /works, /works-list, /blog, eight cases, and three articles. It confirms all eight restored homepage section anchors/links and resolves 51 referenced local image files. HTML inspection proves output/content availability, not rendering, loading, interaction, or accessibility.

The source-only reviewers identified and the implementation resolved three code issues: archive h2 versus compact h3 hierarchy; a late mobile identity-width override conflicting with the compact capsule; and the explorer details' keyboard focus entry point. The console review reports no further material code correction in its bounded source scope, while leaving rendered/runtime verification owed. Its disposition is not whole-UI SHIP.

Evidence reviewed for this documentation:
- C:/Users/USER/OneDrive/My Documents/ChatGPT/KooduLabs/.build/security-portfolio/matrix-review/source-review.md
- BrandLoading.jsx, MatrixWordmark.jsx, matrixLoading.mjs, SecurityApp/CSS integration, test:brand script and Matrix tests; final check results supplied by the implementation handoff.
- C:/Users/USER/OneDrive/My Documents/ChatGPT/KooduLabs/.build/security-portfolio/brand-review/source-review.md
- Brand geometry/components, route lifecycle helper, shell/app/CSS integration, asset ledger, and implementation handoff check results. Artwork proof is static logo artwork, not UI capture.
- C:/Users/USER/OneDrive/My Documents/ChatGPT/KooduLabs/.build/security-portfolio/campaign-review/source-review.md
- Current campaign state/GUI, terminal timers/ownership/scroll integration, typed actions/output, appended CSS, and campaign tests; latest check results supplied by the implementation handoff.
- C:/Users/USER/OneDrive/My Documents/ChatGPT/KooduLabs/.build/security-portfolio/email-review/source-review.md
- Current PhishingEmail.jsx, phishingEmail.mjs, parser/output/terminal integration, mail-specific CSS, and added terminal tests; latest build/check results supplied by the implementation handoff.
- C:/Users/USER/OneDrive/My Documents/ChatGPT/KooduLabs/.build/security-portfolio/playground-review/source-review.md
- Current playground sources, own-site API handler, package test script, and tests/terminal-playground.test.mjs; final build/test/lint results supplied by the implementation handoff.
- C:/Users/USER/OneDrive/My Documents/ChatGPT/KooduLabs/.build/security-portfolio/completion-review/content-parity.json
- C:/Users/USER/OneDrive/My Documents/ChatGPT/KooduLabs/.build/security-portfolio/completion-review/built-pages.json
- C:/Users/USER/OneDrive/My Documents/ChatGPT/KooduLabs/.build/security-portfolio/completion-review/source-review.md
- C:/Users/USER/OneDrive/My Documents/ChatGPT/KooduLabs/.build/security-portfolio/completion-review/console-source-review.md

## Remaining verification and historical limits

Automatic approval review denied localhost-origin browser access because of the account usage limit. No retry, alternate browser surface, or workaround was attempted. Final desktop/mobile screenshots, current expanded-header layout, short-height/virtual-keyboard dialog behavior, focus restoration, keyboard scrolling/history, preview switching, image loading, route changes, gallery/video behavior, testimonial scrolling, and full accessibility/browser compatibility still need permitted runtime checks.

Actual browser API/permission behavior, game/campaign keyboard execution, staged consequences and automatic progression, delivery/debrief/completion-details/eviction UI states, focus/scroll positioning, report-start scrolling, deployed IP-region observations, OS reduced-motion execution, and contact email delivery remain unverified. Send-PhishingEmail itself never performs actual delivery. The one detector run had truncated output; do not call it clean. Older browser checks and bounded SHIP decisions covered the earlier homepage/two-case implementation and a responsive whitespace correction. They do not verify this restoration or the new features.

See [PRODUCT.md](PRODUCT.md), [DESIGN.md](DESIGN.md), and the [surface brief](.impeccable/surfaces/security-portfolio.md).

Latest full-width restoration: the .next-security-roles build passed all 17 static pages and API routes. Static generated-output check fullwidth-output.json confirms that only Skills and Experience carry the fullWidthSection class; other sections retain their editorial layouts. Source review found no material issues in this scoped restoration. Browser/rendered verification remains unavailable. The user has explicitly requested pushing the completed changes to GitHub.

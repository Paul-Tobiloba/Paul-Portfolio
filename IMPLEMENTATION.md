# Security portfolio implementation

**Current verification boundary:** the restored site, project explorer, and PowerShell playground have source/build/unit-test evidence, with earlier content-parity and generated-HTML checks for the restoration. Final visual, browser, and runtime QA is incomplete. Automatic approval review denied localhost access because of the account usage limit; no retry or alternate access method was used. There are no current screenshots or whole-UI SHIP verdict. Historical browser checks and SHIP decisions apply only to the earlier, narrower implementation.

The local branch is codex/security-portfolio. The working changes are uncommitted, not pushed, and not deployed. No dependencies were added. The [Figma design](https://www.figma.com/design/XcYJ00CBa60q4GyCns4RW8) remains visual authority for the established capsule/hoodie world; restored content layouts and console/explorer extensions are code-only.

## Run on Windows

Use npm.cmd in PowerShell to avoid the npm.ps1 execution-policy issue. NEXT_DIST_DIR keeps output separate from the existing tracked .next directory.

```powershell
npm.cmd ci

$env:NEXT_DIST_DIR = ".next-security-dev"
npm.cmd run dev

# In a separate terminal, or after stopping the development server:
$env:NEXT_DIST_DIR = ".next-security-campaign"
npm.cmd run build
npm.cmd run start
```

Use the same NEXT_DIST_DIR value when starting a production build. These are run instructions, not authorization to retry the blocked browser origin.

## Sources and route coverage

- pages/index.jsx composes the existing hero/portrait and synthetic investigation with six services, 32 unique skills, eight projects, six roles/27 original bullets, seven testimonials, writing, about, and contact.
- src/data/portfolioContent.json preserves original content and confirmed additions. Programming Buddies is September 2026–present with no invented duties; Union Bank is 2025–August 2026.
- pages/works.jsx and pages/works-list.jsx share the project archive. ProjectCollection provides category/search/reset states, native image-button previews, direct title/case links, and context-aware h2 archive/h3 compact headings.
- All eight published case studies use ProjectDetail. Dynamic details and explicit pages/works/lagosnet.jsx and reconciliation-rpa.jsx load through getProjectBySlug. Original src/lib/projects.js database queries, normalization, and fallback behavior are unchanged; the two explicit routes are no longer independent of that loader.
- ProjectDetail retains full descriptions/conclusions, genuine image galleries, a native full-image dialog, video controls and original video destinations, live links, and next-project links.
- pages/blog.jsx and pages/blog/[slug].jsx share the shell. WritingList uses h2 archive/h3 compact headings; ArticleBody retains all three full original article bodies, not shortened substitutes.
- PortfolioShell supplies the capsule, PT name reveal, expanded section menu, console trigger, common ground/footer, and route metadata. The securityPortfolio flag in pages/_app.js bypasses legacy loader/stylesheet links for these routes.
- styles/SecurityPortfolio.module.css remains the scoped visual system, including local fonts, responsive layout, focus, dialog, and reduced-motion rules.

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

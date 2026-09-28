# Home polish — verification record

Date: 2026-09-27  
Source: `C:\Users\User\Downloads\claude\Portfolio`  
Status: **In progress — live carousel reduced-motion recheck, reverse scrub, closing sections, and final review remain pending.**

## Implemented scope

- GSAP + ScrollTrigger desktop hero with PORTFOLIO visible on load, scroll-linked letter erasure, profile fade-in, and one pinned stage.
- Equal 50/50 profile columns; the portrait stays fixed while four CV groups slide upward on the right.
- CV order: Summary + Education → Pengalaman Kerja → Organisasi → Skill & Software.
- Reading holds between slides, a final hold before natural unpin, four chapter controls, and a horizontal progress rail.
- Natural document-flow fallback for narrow or short windows, reduced motion, and content that does not fit the fixed panel height.
- Home typography, spacing, navigation states, capability carousel controls, and evidence-based project image mappings.

## Confirmed checks

The command results below were supplied by the `final_source_checks` task. Browser observations were supplied by the parent task from its Chrome inspection. This record does not treat a source review as proof of visual behavior. The latest completed lint and build passed after the carousel's reactive reduced-motion fix. A subsequent Next.js 16 HTML attribute adjustment, based on the installed official documentation, is being processed by another final build; that build result is not yet recorded here.

| Check | Result | Evidence / scope |
| --- | --- | --- |
| `npm run lint` | Pass | Latest completed source check passed after the carousel reduced-motion fix. |
| `npm run build` | Pass | Latest completed production build passed after the carousel reduced-motion fix; the subsequent Next.js HTML attribute adjustment has a build in progress. |
| Initial desktop hero | Pass | Chrome at actual 1440 × 900: PORTFOLIO was fully visible on load. |
| Letter erasure | Pass | Desktop scroll inspection observed the erase phase. |
| Four CV panels | Pass | All four requested groups were observed in the specified order. |
| Static portrait | Pass | The portrait retained the same bounding rectangle across inspected chapters. |
| Chapter controls | Pass | Manual navigation reached the requested CV panels. |
| Hero exit | Pass | The pinned hero released into the next section. |
| Carousel pause | Pass | Manual pause control was exercised in Chrome. |
| Carousel next | Pass | Next navigation changed the active capability. |
| Carousel keyboard | Pass | The End key selected the final capability. |
| Desktop viewport fit | Pass | Actual 1440 × 900, 1366 × 768, and 1025 × 768 viewports: cinematic mode remained enabled, no horizontal overflow was found, and every panel's content scroll height was less than its available panel height. |
| Short-window fallback | Pass | At 1280 × 600, cinematic mode was disabled, no pin spacer remained, all four CV panels had `aria-hidden` removed, and no horizontal overflow was found. |
| Narrow-screen fallback | Pass | At 390 × 844, cinematic mode and the carousel arc were disabled, no pin spacer remained, all four CV panels had `aria-hidden` removed, and no horizontal overflow was found. This was a basic fallback check, not a mobile redesign. |
| Hero reduced motion | Pass | The hero returned to its readable fallback when reduced motion was enabled. |
| Carousel reduced-motion fix | Source checks pass; live recheck pending | Initial browser inspection found that the carousel arc stayed enabled after the preference changed. A reactive `matchMedia` listener was added, followed by passing lint and build checks; the updated behavior still needs a browser recheck. |
| Avian project link | Pass | Manual navigation opened the correct Avian detail page and showed the explicit artwork-unavailable note. |

Fresh screenshot evidence is stored in `.impeccable/review/home-polish-20260927/`. Earlier screenshot directories are not evidence for this final Home implementation.

Console status is not recorded as fully clean: an unexplained raw error object appeared during the initial runtime inspection. A later fresh reload showed no runtime exceptions, then exposed a Next.js warning that is being addressed by the HTML attribute adjustment noted above.

## Pending verification

- Recheck the carousel in Chrome while changing the reduced-motion preference live.
- Verify the reverse scrub when scrolling upward through the hero.
- Inspect the closing Home sections.
- Complete the final visual review and the parent task's completion decision.

## Content and asset limitations

- Avian editorial work is supported by the supplied CV, but its project artwork is not present in the supplied portfolio PDF. The project is displayed as a text-only entry with the explicit status “Dokumentasi visual proyek ini belum tersedia.”
- Capability carousel images are existing Unsplash illustrations. The section explicitly labels them “Ilustrasi bidang keahlian”; they are not presented as original client work.
- No external deployment or publication is included in this verification record.

# Home code review — 2026-09-28

Workspace: `C:\Users\User\Downloads\claude\Portfolio`.

Scope: source inspection and static checks only, as requested. No Chrome or screenshot verification was performed during this review.

## Checks completed

- `node node_modules/typescript/bin/tsc --noEmit`: exit 0.
- `node node_modules/eslint/bin/eslint.js src next.config.ts eslint.config.mjs`: exit 0, no errors or warnings.
- The portrait and all three carousel image files exist and contain data.
- Carousel project links match the `blue-ocean-heart` and `delapan-ayam` slugs in the project data; the web story links to About.

## Source findings

- The hero uses a single scrubbed timeline: character erase 0–20, profile fade 20–25, CV transitions 37–47, 59–69, and 81–90, then a complete final panel through 100 before release.
- CV order is Summary + Education, Work, Organization, then Skills & Software.
- Snap only applies inside panel transition ranges, preserving reading holds.
- The portrait is not translated by the CV timeline. Only the right panel children move vertically.
- The carousel drives its elliptical positions from an animated progress object, so numeric scrub smooths the actual movement. Its last story has a reading hold before release.
- Scramble cancels on scrolling or reduced motion and restores literal characters. Its animation frame and event listeners are cleaned up.
- Inactive CV panels and carousel copy are marked inert and hidden from assistive reading. Cleanup restores the normal reading order.

## Corrections made during this review

- Added compact CV spacing and role sizes for desktop viewport heights of 620–760px, preserving 15px body notes.
- Added a carousel content-fit check that includes child margins. When copy exceeds its available space, the four complete stories use the normal reading layout.
- Recalculate carousel fit after fonts load and after a debounced resize.
- Register initial card styles in the GSAP context so quickSetter changes also revert during cleanup.
- Remove carousel resize listeners, pending timers, and animations on cleanup; guard late font callbacks after disposal.
- Guard carousel navigation against invalid indices.
- Updated DESIGN.md to describe the content-fit behavior and compact desktop CV layout.

## Verification limits

Static checks confirm type correctness and lint rules. They do not establish visual alignment, actual content dimensions, scroll smoothness, snap feel, or frame rate. Browser validation remains outside this review's scope. The earlier production build passed before these latest sizing and cleanup corrections; it was not rerun for this code-only check.

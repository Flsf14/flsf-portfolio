# ARD — Home motion architecture

Status: accepted for implementation, 2026-09-28. Product authority: home-prd.md and the owner's final shelter annotation.

## Component boundaries

HomePage remains a Server Component composing Hero, CapabilityCarousel, the proof strip, SelectedWorkCarousel, ShelterLogos and the closing CTA. Hero is the existing client island for ScrollTrigger. CapabilityCarousel and SelectedWorkCarousel prepare serializable slide data for the shared LoopCarousel client island. ShelterLogos remains server-rendered; its two-row marquee uses CSS animation and needs no client state.

## Decision: one gallery controller, two projections

LoopCarousel owns a continuous position in item units. GSAP ticker advances it without React updates per frame; GSAP quick setters write transform, opacity and stacking order. React updates only when the nearest item changes or the visitor toggles pause. Normalizing by modulo prevents unbounded position growth.

Orbit now uses the supplied circular-split-roll.tsx geometry in circular-split-roll-geometry.ts: x = sin(angle) * radius, y = cos(angle) * radius, left-side focus derived from negative horizontalDepth. Preserve reference focus .45/3.2, scale .58–1, opacity .14–1 and stacking 1–40. The 500px wheel center sits beyond the right boundary, exposing the front arc. Card size is 205px and scales below 1200px. First-item phase aligns to the focus arc. A time-driven GSAP controller advances progress instead of ScrollTrigger.

The four existing media cards repeat into eight decorative slots. The lower density gives each card more separation while preserving a full wheel. Full-turn modulo uses eight slots; accessible selection uses four unique entries. Repeated figures are inert and hidden from assistive technology during enhancement; duplicate slots are display:none in the non-JavaScript fallback. No project data is fabricated. Coverflow keeps signed wrapped X/Z positions and Y-axis rotation, with zero opacity at its seam; horizontal pitch is 1.08 card widths.

Both projections omit visible instructions, controls, index, pause and active caption below the frame. The active Selected Work card is the accessible case-study link; inactive spatial cards are inert. All loop cards use one soft cool shadow as their separation treatment; they do not combine a border and shadow. Both projections advance at 7.5 seconds per item and use the same 550ms manual settle.

Sharing the lifecycle avoids two implementations of pause, resize, drag, reduced motion and cleanup. The tradeoff is a small mode branch in the geometry renderer; semantic content and visual parameters stay outside that renderer.

## Playback state

Autoplay requires: more than one slide, visible gallery, visible tab, reduced motion off, persistent pause off, no hover, no keyboard focus, no drag and no active settle tween. Register the ticker only while that predicate is true; remove it otherwise. A new user input kills an old settle before replacing it. Complete settling normalizes position and reevaluates playback.

A gallery is observed at the actual frame rather than the whole section, so surrounding copy does not keep an offscreen gallery running. Pointer hover never affects playback. Keyboard focus and arrow-key settling suspend playback temporarily; pointer drag and wheel-driven carousel movement are not registered.

## Input and accessibility

- Focusable frame with a descriptive accessible label and arrow-key navigation.
- In Selected Work, only the centered card is focusable and exposed to assistive technology; that card links directly to its case study. Orbit cards remain decorative.
- Before enhancement figures render as a linked CSS grid; controls and duplicate active caption remain hidden.
- The component does not register pointer-drag or wheel handlers. Trackpad and mouse-wheel input remain entirely available to the document.
- Reduced motion paints only the selected card at the center without animated interpolation.

## Layout, media and fonts

Import latin-500-italic.css from @fontsource/playfair-display on Home. Restrict that face to the Portfolio title; existing serif headings and Manrope body retain their assigned roles. Hero letter spans preserve the scramble and erase ref contract with sufficient italic line-height and overflow clearance.

Copy `assets/source/portraits/my.webp` to `public/my.webp` without altering the image. Use Next Image fill/contain, bottom alignment and corrected alt text for the PENS jacket. Remove the old portrait-field DOM and associated texture rules.

Gallery cards use Next Image with responsive sizes and explicit aspect ratios. Current artwork is sourced from existing portfolio previews. The image-less editorial case remains a text plate, not invented project artwork. Gallery spacing and transforms are scoped in loop-carousel.css; delete obsolete pinned capability styling to avoid competing implementations.

## Shelter data contract

src/lib/shelters.ts owns stable id, display name and optional local logo path. All twelve entries initially omit logo. When the owner supplies one, copy it into public/brands and populate that entry's logo. Existing name remains visible; adjacent image uses empty alt to avoid duplicate announcements. Use object-fit: contain so logo proportions are preserved.

ShelterLogos splits the twelve real records into two groups of six. Each visual row repeats its group once so a linear CSS translation can cross the seam continuously; the repeated group is hidden from assistive technology. Rows travel in opposite directions at slightly different durations, matching the supplied video's ambient rhythm. Reduced motion removes animation and hides the repeated group. The optional logo field replaces a tile's text presentation only after the owner supplies an asset; no filler media is fabricated.

## Cleanup and edge cases

Kill the settle tween, remove the ticker, disconnect IntersectionObserver and ResizeObserver, unregister media, visibility and keyboard listeners, revert GSAP context and restore figure semantics on teardown. Zero slides returns null; one slide has no autoplay. Count or projection changes reconstruct the scoped lifecycle.

## Verification

TypeScript, targeted ESLint and CSS parser checks; exact copied asset hash and local font file checks. No browser launched per owner instruction. Visual feel, rendering across devices and actual performance remain unverified until the owner reviews the page.

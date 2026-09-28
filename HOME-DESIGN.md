# Home — MiMo Editorial Hybrid

Approved on 2026-09-28. This Home-specific direction supersedes the condensed typography and square media rules in DESIGN.md for the Home route only.

- Portfolio: title case, locally hosted Playfair Display 500 Italic. Other headings and subheadings: Georgia, Times New Roman, serif; regular weight. Body: Manrope. Record metadata: JetBrains Mono.
- Off-white #faf9f6, ink #20211f, muted #62635e, existing cobalt #1055f5. Cobalt also replaces the orange focus/navigation accent on Home.
- Centered section introductions, generous section spacing, 22px media corners, pill CTA, open achievement figures.
- Portrait uses the owner's `assets/source/portraits/my.webp`, copied unchanged to `public/my.webp`. Its background matches the page without halftone or a contrasting panel.
- Capability has one static message followed by a slow circular loop. Selected Work uses a horizontal looping coverflow whose active card links directly to the case study. Both share a 7.5-second item rhythm, ignore pointer hover, omit manual pointer/trackpad movement and retain keyboard and reduced-motion behavior. Closing section has one primary contact CTA.
- Existing scramble/erase, pinned four-chapter CV, reduced-motion reading order and content-fit guards remain. The former capability pin is replaced by autonomous playback.
- Shelter presents the twelve owner-specified names in two continuously looping horizontal rows moving in opposite directions, following the supplied video reference. Logo paths remain optional until original logo files are supplied; no thumbnail substitutes. Reduced motion uses two static rows.
- CSS implementation: `src/app/home-editorial.css`, loaded after the existing Home styles. Home components live under `src/components/home`; supporting routes retain their existing display font.

Validation: code-only review requested by the user. Browser appearance and motion have not been visually verified for this revision. System serif rendering can vary across platforms.

Capability correction: section introduction above a desktop 50/50 composition, with one static summary on the left and a vertical circular carousel on the right. Geometry follows the supplied circular-split-roll.tsx: 500px circular radius, 205px square cards, 18px corners, left focus arc, focus start .45/power 3.2, scale .58–1, opacity .14–1 and stacking 1–40. Dimensions scale below 1200px. Existing artwork repeats around the decorative wheel to maintain card density; captions count only unique projects. Autoplay replaces the reference's scroll progress. Mobile stacks these columns. Selected Work remains horizontal coverflow.

Capability chrome is intentionally absent: no visible instructions, arrows, count, pause control, active title or project link below the wheel. The focusable wheel still supports drag and keyboard arrows. Eight wheel slots provide more separation than the earlier twelve. Cards use a 1px neutral outline and a soft cool shadow.

Detailed product and architecture decisions: docs/home-prd.md and docs/home-ard.md.

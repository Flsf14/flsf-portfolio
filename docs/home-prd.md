# PRD — Home editorial & continuous galleries

Status: implementation authorized 2026-09-28. This document incorporates the owner's final shelter annotation.

## Outcome and audience

Recruiters, creative leads and potential clients should understand Afsun's professional background, see representative work, and reach a real case study or the contact page. The Home route uses editorial typography and controlled motion without requiring visitors to complete a long carousel scroll sequence.

## Scope and hierarchy

1. Hero: title-case Portfolio in locally hosted Playfair Display 500 Italic. Initial scramble resolves into the real word; scrolling erases it. Alphabet-only scramble.
2. Hero profile: supplied my.webp on the same paper background. Preserve the four CV chapters: summary + education, work experience, organization, skills + software. Existing desktop pin, content-fit fallback and reduced-motion reading order remain.
3. Capability: section introduction above a desktop 50/50 row. One static headline and paragraph occupy the left; a vertical circular visual gallery occupies the right. Front cards travel upwards, rear cards return downwards and reenter from below. A fluid 64–128px desktop gap separates introduction and row; compact screens use 48px and stack the columns.
4. Existing achievement figures.
5. Selected Work: horizontal coverflow of all featured projects with continuous wrapping. The cards themselves link to their case studies; no separate arrows, counter, pause button or metadata block appears below the track. A project without an image uses an explicitly typographic project card.
6. Shelter: two continuous horizontal rows containing PENS, ENT, CV Berlian, Kovari, Great Crystal School, Vivo, Avian, Glamoire, Gycora, Waroeng Depe, Malaijia and Kecilung. The rows move in opposite directions, following the supplied video reference. Tiles use text until owner-supplied logos are configured. No stock logos, unrelated thumbnails, invented relationships or dates.
7. Contact invitation with one primary CTA.

## Interaction requirements

- Capability autoplay: one item interval approximately 7.5 seconds; four items complete a revolution in 30 seconds. Circular geometry remains continuous across the last-to-first boundary.
- Both carousel projections use one item interval of approximately 7.5 seconds. Ring seams remain invisible before an item changes sides.
- Neither gallery exposes arrows, an index, a pause button or a separate active caption. Pointer drag, touch swipe and horizontal wheel navigation are removed; their focusable frames retain arrow-key navigation.
- Pointer hover never pauses either carousel. Keyboard focus continues to pause the focused projection so its active link does not move while being operated.
- Autoplay runs only when at least 35% of its gallery surface is in view, the browser tab is visible, and the user allows motion.
- Reduced motion disables autoplay and spatial settling; controls switch the visible item directly. No continuously announced live region.
- Failed or disabled JavaScript leaves a readable list of linked project figures.
- Shelter runs as two seamless marquee rows in opposite directions. Reduced motion presents two static rows without duplicated content.

## Acceptance criteria

- Given Home opens, Portfolio appears in title case and italic; its readable accessibility label remains Portfolio.
- Given the user scrolls through the hero, existing portrait/CV transitions and navigation remain available; content that cannot fit falls back to natural flow.
- Given the photo loads, it uses the exact supplied file, with no halftone or contrasting background added.
- Given autoplay is permitted and a gallery is visible, its index wraps through all entries without an end stop.
- Given keyboard focus, reduced motion, or a hidden tab, autoplay stops under that condition.
- Given a user presses next/previous at either endpoint, the gallery wraps to the opposite endpoint.
- Given a user uses a mouse wheel or trackpad over either gallery, the page scrolls normally and the carousel position is not changed manually.
- Given a featured project has no image, its name, metadata and working link remain available with an editorial text plate.
- Given shelter renders today, all twelve supplied names are readable and no image requests are made for missing logos.
- Given a logo is later configured, it uses contain sizing and keeps its visible name.

## Non-goals and constraints

No redesign of supporting routes, CMS, fabricated artwork, Tailwind/shadcn migration, Three.js, Lottie, or new mobile cinematic story. Only the Playfair font package is added. Preserve the original `my.webp` under `assets/source/portraits` and copy it into `public` for serving.

## Verification and limits

Owner requests code-only verification without Chrome. Use TypeScript, focused lint and CSS parsing. These checks do not establish rendered spacing, actual frame rate, gesture feel or pixel fidelity. Record results in the implementation handoff rather than inventing engagement metrics or visual approval.

---
name: Afsun Filosof Portfolio
description: A creative portfolio with a serif MiMo-inspired editorial Home and a condensed production dossier on supporting routes.
colors:
  paper: "#f4f1e8"
  paper-strong: "#fffdf7"
  ink: "#11110f"
  muted: "#5e5b53"
  cobalt: "#1055f5"
  cobalt-dark: "#073ab4"
  active-orange: "#f05a24"
  rule: "rgba(17, 17, 15, 0.3)"
typography:
  display:
    fontFamily: '"Barlow Condensed", "Arial Narrow", sans-serif'
    fontSize: "clamp(5rem, 13vw, 12rem)"
    fontWeight: 800
    lineHeight: 0.82
    letterSpacing: "-0.025em"
  headline:
    fontFamily: '"Barlow Condensed", "Arial Narrow", sans-serif'
    fontSize: "clamp(2.8rem, 5vw, 5rem)"
    fontWeight: 700
    lineHeight: 0.9
  title:
    fontFamily: '"Barlow Condensed", "Arial Narrow", sans-serif'
    fontSize: "clamp(1.6rem, 2.5vw, 2.8rem)"
    fontWeight: 700
    lineHeight: 0.95
  body:
    fontFamily: '"Manrope", sans-serif'
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: '"JetBrains Mono", monospace'
    fontSize: "0.68rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "0.08em"
rounded:
  square: "0"
spacing:
  compact: "1rem"
  block: "1.5rem"
  section: "clamp(6rem, 12vw, 12rem)"
  gutter: "clamp(1rem, 3.6vw, 4.5rem)"
components:
  button-primary:
    backgroundColor: "{colors.cobalt}"
    textColor: "#ffffff"
    rounded: "{rounded.square}"
    padding: "0.85rem 1.25rem"
    height: "50px"
  button-primary-hover:
    backgroundColor: "{colors.cobalt-dark}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.square}"
    padding: "0.85rem 1.25rem"
    height: "50px"
  button-secondary-hover:
    backgroundColor: "{colors.ink}"
    textColor: "#ffffff"
  input-line:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.square}"
    padding: "0.85rem 0"
  input-area:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.square}"
    padding: "1rem"
  filter-default:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.square}"
    padding: "0.55rem 0.75rem"
  filter-active:
    backgroundColor: "transparent"
    textColor: "{colors.cobalt-dark}"
---

# Design System: Afsun Filosof Portfolio

## Overview

**Creative North Star: "The Creative Production Dossier"**

The portfolio behaves like an authored production archive rather than a decorative showcase. Warm paper is the working surface; cobalt is the production ink; carbon text, strict rules, measured labels, and oversized condensed type turn professional evidence into the visual material.

The system is direct, editorial, and deliberately flat. It moves between monumental statements and dense factual records without losing the same production-floor grammar. Imagery is allowed to lead, but it remains framed by literal metadata, proof, and visible structure.

**Key Characteristics:**

- Warm paper ground with saturated cobalt used for statements and proof.
- Oversized condensed headlines paired with readable body copy and mono production labels.
- Square geometry, thin rules, and layout divisions instead of decorative containers.
- Responsive editorial grids that collapse into a complete natural reading sequence.
- Motion that reveals progression and always yields to a readable reduced-motion form.

## Colors

The palette reads as cobalt production ink on warm stock, supported by carbon text, graphite annotations, a cleaner proof surface, and one orange interaction signal.

### Primary

- **Production Cobalt:** Carries dominant display words, performance figures, active story markers, and full-bleed discipline fields.
- **Deep Cobalt:** Strengthens interactive text and primary action hover states without introducing a second brand hue.

### Secondary

- **Active Orange:** Reserved for focus outlines and active navigation underlines, where a state change must be unmistakable.

### Neutral

- **Warm Paper:** The default page and scrollbar ground.
- **Clean Proof:** A slightly lighter portrait and image-support surface.
- **Carbon Ink:** Primary text, strong dividers, and structural borders.
- **Graphite Note:** Secondary status and supporting metadata.
- **Audit Rule:** Low-emphasis dividers inside records, stories, and tables.

**The Cobalt Proof Rule.** Use cobalt for authored statements, evidence, and active selection; do not distribute it as ambient decoration.

**The Orange State Rule.** Orange means active focus or navigation state. Its rarity is part of the hierarchy.

## Typography

**Display Font:** Barlow Condensed (with Arial Narrow and sans-serif fallbacks)  
**Body Font:** Manrope (with a sans-serif fallback)  
**Label/Mono Font:** JetBrains Mono (with a monospace fallback)

**Character:** The condensed face supplies the dossier's loud editorial voice, Manrope keeps long Indonesian copy calm and legible, and JetBrains Mono makes metadata feel measured and literal.

### Hierarchy

- **Display:** Heavy, tightly set condensed type for page names, section statements, and large evidence-led headings.
- **Headline:** Condensed headings for case-study sections, story panels, and medium-scale section titles.
- **Title:** Compact condensed titles for record rows, project names, and repeated content units.
- **Body:** Manrope for explanations and narrative copy, normally constrained between 38ch and 65ch.
- **Label:** Small mono text with loose tracking, usually uppercase, for counts, dates, disciplines, status, and production metadata.

**The Three-Voice Rule.** Condensed type speaks, Manrope explains, and mono type measures; do not exchange their roles casually.

**The Monument-and-Record Rule.** Pair oversized type with restrained factual text so scale always carries meaning rather than spectacle alone.

## Layout

The system uses full-width editorial fields with a fluid page gutter. Desktop layouts favor asymmetric two-column grids, alternating project compositions, ruled record rows, and edge-aligned metadata. Vertical sections use a large fluid interval while internal records return to compact 1rem–2rem steps.

At 900px, multi-column stories, project cards, records, case studies, About, Contact, and navigation collapse into a one-column reading sequence. The Home profile uses an equal 50/50 split within the pinned desktop hero: a static portrait on the left and four CV panels on the right. Its natural reading layout places the portrait before all four panels. At 560px, proof metrics and form rows become single-column. The 76px fixed header remains the shared top datum across viewports.

**The Complete Collapse Rule.** Responsive reduction must preserve every fact and panel in document order; mobile is not an abbreviated version of the portfolio.

**The Edge Datum Rule.** Align headings, metadata, rules, and content boundaries to the shared fluid gutter before introducing local offsets.

## Elevation & Depth

The system is flat by design and defines depth through sticky layering, scale, tonal contrast, image planes, and one-pixel rules. It does not use box shadows. The fixed header gains separation through a translucent warm-paper fill and 14px backdrop blur; media hover uses a restrained scale change instead of simulated elevation.

**The Structural Depth Rule.** Create hierarchy with position, crop, rule, and tonal field; do not add shadow to make an undecided surface feel important.

## Shapes

Corners remain square across buttons, fields, media frames, status boxes, and structural panels. Thin one-pixel borders and underlines divide the page into records. The recurring expressive geometry is a clipped 4:3 media plane and the angled cobalt stripe behind the portrait, not rounded containers.

**The Square Record Rule.** Interactive and informational surfaces retain square corners; curvature would weaken the production-document character.

## Components

### Buttons

- **Shape:** Square, bordered, and at least 50px high, with compact horizontal padding.
- **Primary:** Cobalt field with white text; hover deepens to dark cobalt. Disabled state keeps the form but reduces opacity.
- **Secondary:** Transparent warm-paper field with carbon border and text; hover inverts to carbon with white text.
- **Focus:** The global 3px orange outline sits 4px outside the component.

### Chips

- **Style:** Filters are text-first tabs on a transparent field, with a two-pixel bottom indicator rather than a pill container.
- **State:** Active and hover states shift the label to deep cobalt and expose the cobalt underline.

### Cards / Containers

- **Corner Style:** Square with no card shell.
- **Background:** Project entries remain on the page ground; only the 4:3 media plane carries its own placeholder surface.
- **Shadow Strategy:** None; spacing, alternating columns, type scale, and media define each entry.
- **Internal Padding:** Information sits beside or below media without an enclosing padded panel.

### Inputs / Fields

- **Style:** Text inputs use only a carbon bottom rule; textareas use a complete one-pixel carbon frame. Both remain transparent and square.
- **Focus:** The shared orange focus outline supplies the visible keyboard state.
- **Status:** Submission feedback uses a square ruled notice; success and error colors are semantic exceptions, not brand accents.

### Navigation

The fixed 76px header combines a stacked condensed wordmark, a mono role label, and uppercase condensed links. Desktop active and hover states grow a four-pixel orange underline from the edge. At 900px, the role label disappears and the navigation becomes a full-width ruled menu with 48px-minimum targets.

### Sticky Profile Story

The Home hero uses one GSAP + ScrollTrigger timeline and one pinned stage. PORTFOLIO runs an 800ms character scramble on arrival, then settles to the literal title. Each character reserves its final width. Scrolling cancels the scramble before the letters erase from left to right over timeline units 0–20. Profile entrance spans 20–30: the section fades in over 20–22, the portrait rises 36px from scale 0.97 to 1 over 20–28, and the four summary elements rise 22px and fade in sequentially over 22–30. Reduced-motion users receive the literal title and the normal reading layout. The profile sits below the 76px header in equal-width columns. After entrance, the transparent portrait remains stationary while independent right-hand panels slide upward inside an overflow-hidden viewport; its cobalt diagonal is static throughout.

The four CV panels appear in this order: Summary + Education, Pengalaman Kerja, Organisasi, and Skill & Software. The three slide windows are 38–48, 59–69, and 81–90. Panels travel one panel height with complementary power2 easing; incoming content adds an 18px rise. Snap settles incomplete transitions to their nearest boundary without moving any reading hold. The intervals between transitions hold complete panels; 90–100 holds the last panel before the pin releases. A horizontal cobalt progress rail follows the timeline, and chapter buttons navigate to complete panels at 34, 53, 75, and 95. Scrolling upward reverses the same sequence.

The pinned mode applies only above 900px wide and at least 620px high, with no reduced-motion preference. The component also measures whether every panel fits its available height; if content exceeds that space, it returns the full CV to normal document flow. Narrow, short-window, and reduced-motion layouts retain the portrait and all four panels in reading order. This fallback preserves access to the content; the current polish focuses on desktop motion.

### Proof Strip

Home uses three factual records with their employer context: 1.7M+ views in 77 days, 180+ cross-format assets, and eight managed sub-brands. Figures use cobalt condensed type; their descriptions use readable body type. Internship evaluation remains within the CV. The records collapse to one column on small screens.

### Home capability orbit

Four benefit-led stories connect identity, content, web exploration, and video. A pinned desktop orbit uses a GSAP-animated progress object, with scrub smoothing applied to the animation itself. Cards remain upright as they follow an elliptical path; the active card leads through scale and opacity. Transitions occur at timeline units 14–26, 42–54, and 70–82, with reading holds between them and a final hold before release. Navigation buttons select each story. The orbit consumes 2.8 viewport heights of additional scroll.

Carousel imagery uses the existing portfolio-document excerpts. Web exploration uses an authored typographic composition because no verified web-project image is available. The source imagery remains identified as portfolio excerpts. Narrow, short-window, and reduced-motion layouts expose all four stories in natural document order. Desktop copy height, including child margins, is measured before pinning and after fonts or viewport dimensions change; overflowing copy also returns to the complete reading layout. Card styles, resize listeners, and pending measurement timers revert on cleanup.

For desktop viewport heights of 620–760px, CV panel spacing and role headings use a more compact layout while retaining 15px body notes. The existing content-fit guard still returns all CV groups to document flow when browser zoom or larger text exceeds the available panel height.

### Editorial Studio refinement

The Home narrative is hero/CV, capability stories, concise proof, selected work, professional affiliations, and contact. Duplicate discipline and career lists are removed from Home; complete career content remains in the hero and About. PORTFOLIO retains monumental scale. Capability and work headings are secondary; affiliations use a quieter heading and open ruled rows. The cobalt closing section contains a concrete project contact action. Shared routes, fonts, palette, square geometry, and factual CV content remain intact.

## Do's and Don'ts

### Do:

- **Do** let verified work, outcomes, and production metadata drive the visual hierarchy.
- **Do** combine monumental condensed headings with short, readable Manrope explanations.
- **Do** use thin rules and square geometry to organize dense information.
- **Do** preserve the full narrative in mobile and reduced-motion layouts.
- **Do** reserve orange for unmistakable interaction state and cobalt for authored emphasis.

### Don't:

- **Don't** wrap ordinary content in rounded or nested cards.
- **Don't** add ornamental shadows, soft floating panels, or ambient gradients.
- **Don't** use mono type for paragraphs or Manrope for dominant display statements.
- **Don't** introduce additional accent hues for decoration.
- **Don't** make scroll-linked motion the only way to access content.

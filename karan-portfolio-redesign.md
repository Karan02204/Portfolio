# Karan Attri — Portfolio Redesign Specification
> Full Stack Web Developer · Color Palette: `#FFFFFF` · `#f48b34` · `#5086d0`

---

## 01. Design Philosophy

Your existing site (`karanattri.vercel.app`) already establishes a strong cinematic identity — dark, dramatic, high-contrast scrollytelling with a loading sequence and bold typography. The next chapter of your portfolio should **evolve** that identity, not restart it. The goal is to move from *cinematic intro* → *interactive story*, keeping the same premium, dark-yet-warm energy while making each section feel like its own designed moment.

**Core aesthetic direction:** Editorial meets brutalist tech. Clean white space moments punctuated by bold orange (`#f48b34`) energy bursts and cool blue (`#5086d0`) structural depth. Not a typical dark portfolio — a **warm-dark** one. Think: a high-end magazine printed on matte black paper.

---

## 02. Site Architecture

```
[Existing Scrollytelling Intro — your cinematic frames]
        ↓
[Transition: Camera pulls back → reveals the full page]
        ↓
┌──────────────────────────────────┐
│  02 · About Me                   │
│  03 · Skills                     │
│  04 · Projects                   │
│  05 · Certifications             │
│  06 · Contact                    │
└──────────────────────────────────┘
```

---

## 03. Global Elements

### Navigation
**Component:** Floating island navbar — not a full-width bar. A pill-shaped nav that floats at the top center of the screen, inspired by the dock-style navbars trending in 2025.

- Background: `rgba(255,255,255,0.05)` with `backdrop-filter: blur(20px)`
- Border: `1px solid rgba(244,139,52,0.2)` — subtle orange trace
- Active link indicator: an underline that slides using `#f48b34`
- On scroll past hero: nav shrinks slightly and gains a stronger blur
- Links: `About · Skills · Projects · Certs · Contact`
- Right side: a pulsing green dot + `"Available for work"` text

**Reference:** 21st.dev `/s/navbar-navigation` — specifically the floating pill pattern

---

### Custom Cursor
A custom cursor that replaces the default browser cursor. Two elements:
- **Outer ring:** 32px circle, `border: 1px solid #f48b34`, follows cursor with a 100ms lag (smooth magnetic feel)
- **Inner dot:** 6px filled dot, `background: #5086d0`, snaps to cursor position instantly
- On hover over interactive elements: outer ring scales up to 48px and fills with `rgba(244,139,52,0.1)`
- On hover over project cards: cursor transforms into a `"VIEW →"` text cursor

**Implementation:** Vanilla JS mousemove listener — no library needed. 15 lines of code.

---

### Page Transition
Between your scrollytelling intro and the main portfolio content, add a **whiteout flash transition** — the screen flashes to pure white for 80ms then fades into the new section. This mimics a camera shutter and directly ties to your cinematic intro aesthetic.

---

## 04. Section 02 — About Me

### Concept: The Split Dossier
Inspired by intelligence/dossier aesthetics — like a classified file being opened. Two columns that slide in from opposite sides on scroll enter.

### Layout
```
LEFT COLUMN (40%)          RIGHT COLUMN (60%)
─────────────────          ──────────────────
[Your Photo]               KARAN ATTRI
Stamp: "FULL STACK"        Full Stack Web Developer
                           ───────────────────────
                           3+ years building digital
                           experiences that live at the
                           intersection of design &
                           engineering.

                           📍 India · Open to Remote
                           ✦ Available for Freelance

                           [Download CV →]  [Let's Talk →]
```

### Photo Treatment
- Photo in a slightly tilted frame (3deg rotation) — gives it personality
- Frame border: `2px solid #f48b34`
- A "classified" style stamp overlaid in `#5086d0` — text: `"FULL STACK DEV"`
- On hover: photo de-tilts to 0deg with a smooth transition

### Text Animation
Use **SplitText** from ReactBits — each word of your bio reveals character by character on scroll entry. The name `KARAN ATTRI` uses a **Blur Text** entrance animation (also ReactBits).

### Stat Bar
Below the bio, three stats in a horizontal row:
```
3+              15+             100%
Years Exp       Projects        Client Satisfaction
```
Each number counts up from 0 when scrolled into view using a counter animation.

**Component Source:** ReactBits `CountUp` / `NumberTicker`

---

## 05. Section 03 — Skills

### Concept: The Circuit Board
Skills aren't a flat list or a boring tag cloud. They're organized like a **circuit board** — interconnected nodes on a dark surface, grouped by category, with animated connection lines between related skills.

### Layout
Full-width dark section (`background: #0a0a0a`). A canvas-drawn circuit board in the background (subtle, low opacity). Skills float as chips/nodes on top.

### Skill Categories & Visual Treatment

**Category 1 — Frontend** · Color accent: `#f48b34`
```
React · Next.js · TypeScript · Tailwind CSS · GSAP · Three.js · Framer Motion
```
Displayed as pill tags with orange left-border accent. On hover: the pill glows with an orange box-shadow.

**Category 2 — Backend** · Color accent: `#5086d0`
```
Node.js · Express · Python · FastAPI · REST APIs · GraphQL · Socket.io
```
Blue accent pills. Hover glow in blue.

**Category 3 — Database** · Color accent: `#f48b34` (warm)
```
MongoDB · PostgreSQL · Redis · Prisma · Firebase
```

**Category 4 — DevOps & Tools** · Color accent: `#5086d0` (cool)
```
Docker · AWS · Git · CI/CD · Linux · Vercel · Nginx
```

### Skill Level Bars
For 5–6 key skills, show animated proficiency bars that fill on scroll entry:
```
React          ████████████████████  95%
Node.js        ██████████████████    88%
TypeScript     ████████████████      80%
MongoDB        ███████████████       75%
AWS            ████████████          60%
```
Bar color: gradient from `#5086d0` → `#f48b34`

### Marquee Ticker
At the bottom of the skills section, a horizontally scrolling ticker (auto-scroll, infinite loop) showing all tech logos + names. Fast enough to feel alive, slow enough to be readable.

**Component Source:** ReactBits `InfiniteScroll` or 21st.dev marquee components

---

## 06. Section 04 — Projects

### Concept: The Case File Stack
Projects are presented as **stacked cards** that fan out on hover — like a physical deck of case files. This is the most interactive section of the site.

### Primary Layout
A 3-column grid on desktop, each card being a project. On hover, the card lifts (`translateY(-12px)`) and reveals a "View Project" CTA that was hidden underneath.

### Project Card Anatomy
```
┌─────────────────────────────────┐
│ [Project Screenshot / Mockup]   │  ← 60% of card height
│                                 │
├─────────────────────────────────┤
│ E-Commerce Platform        2024 │  ← Title + Year
│ Next.js · Stripe · MongoDB      │  ← Tech stack tags
│                                 │
│ Full-featured store with real-  │  ← 2-line description
│ time inventory and payments.    │
│                                 │
│ [GitHub ↗]     [Live Demo ↗]   │  ← Action links
└─────────────────────────────────┘
```

### Card Styling
- Background: `#111111`
- Border: `1px solid rgba(255,255,255,0.08)`
- On hover border: `1px solid #f48b34`
- Tech stack tags: small pills in `#5086d0` with white text
- Top-left corner accent: a small `#f48b34` square (4×4px) — like a file tab marker
- Image area: a subtle gradient overlay at the bottom fading to card background

### Featured Project
The first/flagship project gets a **full-width hero card** above the grid — spanning the whole container width with a large screenshot on the left and expanded details on the right.

### Project Filter
Above the grid, 4 filter buttons:
```
[All]  [Frontend]  [Full Stack]  [API/Backend]
```
Clicking a filter animates cards out/in using a fade+scale transition. Active filter button fills with `#f48b34`.

**Component Reference:** ReactBits `MagneticButton` for the filter pills, 21st.dev card hover patterns

---

## 07. Section 05 — Certifications

### Concept: The Trophy Wall
Not a flat list. Certifications are displayed as **glowing badge cards** arranged in a masonry-style wall, each with a subtle shimmer/shine animation — like physical awards under a spotlight.

### Layout
A 2×2 grid (expandable to show more). Each cert card is slightly different in height based on content — masonry layout gives it an organic, collected feel.

### Cert Card Anatomy
```
┌────────────────────────────────────┐
│  ☁  [Issuer Logo Area]             │
│                                    │
│  AWS Certified Developer           │  ← Cert name (bold)
│  Associate                         │
│                                    │
│  Amazon Web Services               │  ← Issuer
│  Issued: March 2024                │  ← Date
│                                    │
│  ░░░░░░░░░░░░░░░░░░░░░░░           │  ← Decorative line
│  [Verify Credential →]             │  ← Link
└────────────────────────────────────┘
```

### Visual Treatment
- Card background: dark (`#0f0f0f`) with a very subtle grain texture overlay
- Top-left: a large icon/emoji for the cert issuer (☁ for AWS, ◈ for Meta, etc.)
- Icon color: `#f48b34`
- Card border: `1px solid rgba(80,134,208,0.3)` — blue trace
- On hover: a shimmer/glare effect sweeps across the card (CSS `@keyframes` gradient sweep)
- Verify link: `#5086d0` colored text

### Shine Animation
```css
/* Sweep a bright highlight across the card on hover */
@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
```
This makes it feel like a physical metallic certificate catching light.

---

## 08. Section 06 — Contact

### Concept: The Direct Line
Clean, minimal, and confident. No cluttered form — just a bold CTA, an email address that copies on click, and social links. The philosophy: *if someone has scrolled this far, don't make them fill out a form.*

### Layout
```
                    LET'S BUILD
                  SOMETHING GREAT
                  
            Available for freelance & full-time
            
         [  karan@email.com  ]  ← click to copy
         
    ──────────────────────────────────────
    
    GitHub    LinkedIn    Twitter    Dribbble
    
    ──────────────────────────────────────
    
    Currently open to · Remote · Hybrid · India
```

### The Email Block
The email address sits in a bordered box:
- Border: `1px solid rgba(244,139,52,0.3)`
- On hover: border becomes solid `#f48b34`, background gets a soft orange tint
- On click: text changes to `"Copied! ✓"` for 2 seconds then reverts
- Font: monospace, large (24px), white

### Heading Animation
`"LET'S BUILD SOMETHING GREAT"` — each word is a different weight:
- `LET'S` — light weight, `#5086d0`
- `BUILD` — heavy weight, white  
- `SOMETHING` — light weight, `#5086d0`
- `GREAT` — heavy weight, `#f48b34`

This typographic contrast creates a visual rhythm without needing images.

### Social Icons
Large (44×44px) icon buttons. No labels — icons only.
- Resting state: white icon, no background
- Hover: icon color → `#f48b34`, background circle appears with a scale-in animation

---

## 09. Footer

Minimal one-liner:
```
Designed & Built by Karan Attri · 2025 · Made with ♥ in India
```
- Font: small, monospace, `rgba(255,255,255,0.3)`
- The `♥` is `#f48b34`
- A single horizontal rule above it in `rgba(244,139,52,0.15)`

---

## 10. Micro-Interactions & Animation System

### Scroll Reveal
Every section entry uses one of these two patterns — pick one and stick to it for consistency:
- **Fade + Rise:** `opacity: 0 → 1` + `translateY(30px → 0)` over 600ms, easing: `cubic-bezier(0.16, 1, 0.3, 1)`
- **Fade + Scale:** `opacity: 0 → 1` + `scale(0.96 → 1)` over 500ms — feels more modern

Use `IntersectionObserver` (no library needed) with a `0.15` threshold.

### Hover States
- All clickable elements: `cursor: pointer` + the custom cursor outer ring scales up
- Links: underline draws from left to right on hover (CSS `width: 0 → 100%`)
- Buttons: slight upward shift (`translateY(-2px)`) + shadow deepens

### Page-Level Parallax
Section backgrounds scroll at 0.6× the page scroll speed — creates depth without being distracting. Apply to the circuit board background in Skills and the grain texture in Certifications.

### Loading / Entry
Since you already have a loading sequence in your scrollytelling intro, the main portfolio content should appear with a **staggered reveal** — sections don't all appear at once, each one loads as you reach it.

---

## 11. Recommended Component Sources

| Component | Source | Section Used |
|---|---|---|
| Floating pill navbar | 21st.dev `/s/navbar-navigation` | Global |
| Blur Text / SplitText animation | ReactBits `TextAnimations` | About, Hero |
| Number counter | ReactBits `CountUp` | About stats |
| Infinite scroll marquee | ReactBits `InfiniteScroll` | Skills ticker |
| Magnetic button | ReactBits `MagneticButton` | Project filters, CTAs |
| Card hover lift effects | 21st.dev `/s/card` | Projects |
| Shimmer/glare card effect | ReactBits `GlareCard` | Certifications |
| Spotlight effect | ReactBits `Spotlight` | Contact section BG |
| Scroll progress bar | 21st.dev `/s/scroll-area` | Global top bar |
| Staggered list reveal | ReactBits `BlurIn` / `FadeIn` | All sections |

---

## 12. Typography System

| Role | Font | Weight | Size |
|---|---|---|---|
| Display / Hero | `Syne` or `Cabinet Grotesk` | 800 | 72–96px |
| Section Headings | `Syne` | 700 | 48–64px |
| Body Copy | `DM Sans` | 400 | 16–18px |
| Captions / Labels | `JetBrains Mono` | 400 | 12–13px |
| UI Elements | `DM Sans` | 500 | 14px |

**Why these fonts:**
- `Syne` — geometric, editorial, uncommon enough to feel designed
- `DM Sans` — warm, readable, pairs beautifully with Syne
- `JetBrains Mono` — developer-appropriate for code-like labels, cert dates, etc.

**Google Fonts import:**
```html
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500&family=JetBrains+Mono&display=swap');
```

---

## 13. Color Usage Guide

| Color | Hex | Use For |
|---|---|---|
| Warm Orange | `#f48b34` | CTAs, active states, accents, key highlights |
| Cool Blue | `#5086d0` | Secondary accents, skill tags, links, structural borders |
| Pure White | `#FFFFFF` | Primary text, card backgrounds in light moments |
| Near Black | `#0a0a0a` | Section backgrounds |
| Dark Card | `#111111` | Card backgrounds |
| Subtle Border | `rgba(255,255,255,0.08)` | Card borders, dividers |
| Orange Glow | `rgba(244,139,52,0.15)` | Hover backgrounds, section tints |
| Blue Glow | `rgba(80,134,208,0.15)` | Alternate hover backgrounds |

**The rule:** Orange = action/energy. Blue = structure/trust. White = clarity. Never use all three at equal weight in one component — always let one dominate.

---

## 14. Responsive Breakpoints

```
Mobile  (< 640px):   Single column, reduced font sizes, no custom cursor
Tablet  (640–1024px): 2-column grid for projects, condensed nav
Desktop (> 1024px):   Full 3-column grid, all effects enabled
```

On mobile: disable the custom cursor entirely, simplify the parallax, and stack the About Me columns vertically with the photo at the top.

---

## 15. Tech Stack Recommendation

Since your site is already on Vercel and appears to be React-based:

```
Framework:     Next.js 14 (App Router)
Styling:       Tailwind CSS + CSS Modules for complex animations
Animation:     GSAP ScrollTrigger (for scroll-driven effects)
               Framer Motion (for component enter/exit transitions)
Components:    ReactBits (copy-paste into your project)
               shadcn/ui (for accessible base components)
Fonts:         next/font with Google Fonts
Deployment:    Vercel (already set up ✓)
```

---

## 16. Implementation Order

Build in this sequence to always have a shippable version:

1. **Global:** Set up fonts, color variables, custom cursor, navbar
2. **About Me:** Layout + photo treatment + stat counters
3. **Skills:** Tag grid + marquee ticker (skip circuit board initially)
4. **Projects:** Card grid + hover effects + filter buttons
5. **Certifications:** Badge cards + shimmer effect
6. **Contact:** Email copy button + social links
7. **Polish:** Add parallax, refine animations, circuit board BG, scroll progress bar
8. **Connect:** Wire up to your existing scrollytelling intro as the entry point

---

*This document is a living spec — designed to be handed to a developer (or yourself) and built section by section. Every component recommendation has a direct source you can reference and adapt to your color palette.*

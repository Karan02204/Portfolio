# Portfolio Audit — improvement backlog

Ordered by impact.

**Status:** §1 Correctness, §4 SEO, §7 lint/CI are DONE. §2 Accessibility, §3
Performance, §5 Functionality and §6 Layout are largely done — remaining items
are listed under "Still open" at the bottom.

---

## 1. Correctness bugs (ship these first)

### 1.1 `FocusRail` breaks the Rules of Hooks — real crash risk
`components/focusRail.tsx:52` has an early return **before** the hooks:

```tsx
if (!items || items.length === 0) return null;   // line 52
const [active, setActive] = React.useState(initialIndex);  // line 56
```

If `items` is ever empty, React's hook order changes between renders and the
component throws. ESLint flags this 6 times. Fix: move the guard below all hooks.

### 1.2 `useTransform` called inside `.map()` — Overlay + ScrollyExperience
`Overlay.tsx:43-44` and `ScrollyExperience.tsx:42-43` call `useTransform` inside a
`map` callback. It works today only because the array length is constant. Change
the text and the hook count changes mid-render → crash. Fix: extract the
per-character span into its own `<AnimatedChar />` component so each hook call
lives in its own component.

### 1.3 Projects section clips its own content
`FocusRail` root is `h-[1000px]`, dropped inside a `h-screen ... overflow-hidden`
section. On any laptop under 1000px tall (most 13"/14" screens at ~800–900px
usable) the nav arrows, counter and "Visit" button are **cut off entirely** —
the primary CTA of the projects section is unreachable. Fix: `h-full` with
`min-h-0`, or size the rail from viewport units.

### 1.4 Card spacing is absolute, layout is relative
Cards are `w-[80vw]` but offset by a hardcoded `xOffset = offset * 320`px. On a
390px-wide phone the cards are ~312px wide and 320px apart — they nearly stack
on top of each other. Make the offset a percentage of card width.

---

## 2. Accessibility (currently the weakest area)

- **No keyboard access to project cards.** Side cards are clickable `<div>`s with
  `onClick` and no `role`/`tabIndex`/`onKeyDown`. Keyboard and screen-reader users
  cannot change projects. The arrow buttons have no `aria-label` either.
- **`prefers-reduced-motion` is ignored.** Lenis respects it, but the 240-frame
  canvas scrub, the infinite marquees and every Framer transition do not. This is
  a genuine vestibular-trigger risk. Add a `useReducedMotion()` guard that pins
  the canvas to a single frame and pauses the marquees.
- **Form has no live feedback.** Status changes from "SEND MESSAGE" → "SENDING…" →
  "MESSAGE SENT" are invisible to screen readers. Needs `aria-live="polite"`.
  Inputs also rely on `placeholder` alone as their label — add `<label className="sr-only">`.
- **Decorative images lack `alt=""`** and the background `<img>` in `page.tsx` has
  no `alt` attribute at all.
- **Contrast.** `text-white/30` on `#131313` for the social links is roughly 2.2:1,
  well under the 4.5:1 WCAG AA minimum. `text-white/20` placeholders are worse.
- **No skip link** past the 1200vh hero, and no `:focus-visible` styles anywhere.

---

## 3. Performance

- **7.5 MB of fonts committed, ~600 KB actually used.** `public/fonts/abc-gravity-font-family/`
  holds 28 OTF/TTF files; the app loads exactly two (`ABCGravity-Normal-Trial.otf`,
  `ABCGravity-NormalItalic-Trial.otf`). Delete the other 26 and convert the
  survivors to `.woff2` (typically 60–70% smaller).
- **`public/sequence/` — 192 WebP frames, 6.2 MB, referenced nowhere.** The canvas
  streams from Cloudinary instead. Dead weight in the repo.
- **Unused local images**: `aita_ghar_01.jpg`, `karan-01/02/03.jpeg` — the
  components point at Cloudinary URLs that merely share the filenames.
  Removing §3 items shaves ~14 MB from the repo.
- **The frame sequence requests PNG.** `getFramePath` asks for `.png` with
  `f_auto,q_auto`; Cloudinary will negotiate WebP/AVIF, but generating the
  sequence as WebP up front is smaller still. Also consider dropping 240 → 120
  frames; at scroll speed the difference is imperceptible and it halves transfer.
- **Loading gate is misleading.** It blocks on 40 frames but the progress bar is
  the only thing on screen for the entire wait, and frames 41–240 stream in
  afterwards with no feedback — scroll fast early and you hit blank frames.
  Prefetch a spread across the whole timeline rather than the first 40 in order.
- **`background.png` is 832 KB** and sits behind everything at full opacity.
  Should be WebP, and served through `next/image`.
- **`<img>` everywhere instead of `next/image`** — no responsive `srcset`, no
  lazy loading, no automatic AVIF/WebP. ESLint warns on this twice.
- **Canvas ignores devicePixelRatio** — it renders at CSS pixel size, so the hero
  looks soft on every retina/high-DPI display. Multiply by `window.devicePixelRatio`.
- **Resize handler isn't debounced** and re-renders the frame on every event.

---

## 4. SEO & metadata

Almost entirely missing, which matters a lot for a portfolio people Google:

- Title is the generic `"Creative Developer Portfolio"` — should be
  `"Karan Attri — Full Stack Developer"`.
- **No Open Graph or Twitter card tags.** Every share on LinkedIn/X/WhatsApp
  renders as a bare grey link. Highest-leverage fix in this whole section.
- No `metadataBase`, no canonical URL, no `robots.txt`, no `sitemap.xml`
  (Next 16 generates both from `app/robots.ts` and `app/sitemap.ts`).
- No `viewport` export → no `themeColor`.
- No JSON-LD `Person` schema.
- Sections are `<section>` without headings in a logical `h1→h2→h3` order;
  the visible `h1`s are decorative words like "ABOUT", "LET'S", "WORK.".
- Favicon is the stock Next.js one.

---

## 5. Functionality gaps

- **Contact form has no spam protection.** The Web3Forms key is hardcoded at
  `Contact.tsx:39`. It's a public-by-design key so this isn't a credential leak,
  but it should move to `NEXT_PUBLIC_WEB3FORMS_KEY`, and the form needs
  Web3Forms' `botcheck` honeypot field or you will get scraped and spammed.
- **No client-side validation feedback** beyond the browser default, and no
  retry affordance once `status === "error"` resets after 3s.
- **External links don't open in a new tab** and lack `rel="noopener noreferrer"`
  — the "Visit" project button, all three social links, and the resume link.
  Sending someone away from your portfolio permanently is the wrong default.
- **Certificates are inert.** Four cards with no link to the actual credential.
  Either link them or add "credential ID" text — unverifiable certs read as filler.
- **No active-section indicator** in the sidebar; nothing tells you where you are.
- **No scroll-progress indicator** on a 1200vh hero, and no "scroll down" hint on
  first load — users genuinely may not realise the page responds to scroll.
- **`autoPlay` is disabled** on the project rail, so nothing signals that there
  are 4 projects rather than 1 until you notice the small counter.
- **Resume points at a Google Drive `/view` link** — gated behind Drive's UI.
  Host the PDF in `public/` for a direct download.
- **404 page** is the Next.js default; no `app/not-found.tsx`. No `error.tsx`
  boundary either, so a canvas failure white-screens the whole site.

---

## 6. Layout & responsive

- **Hero type is `text-[22vw]` with `scale-y-170`** — at 320px wide, "KARAN"
  overflows horizontally. `body` has `overflow-x: hidden` masking it rather than
  fixing it.
- **Skills marquee is `w-[180vw]` rotated -3°** — guaranteed horizontal overflow,
  again hidden rather than solved.
- **`Overlay` uses `position: fixed` sections.** These sit above *everything* for
  the whole page, not just the hero. They're `pointer-events-none` so they don't
  block clicks, but the fade-out relies purely on scroll progress hitting 1.0.
  `sticky` inside the hero container is the correct primitive.
- **`Overlay` section 3 is `w-[40%] ml-auto`** with no mobile breakpoint — on a
  phone that's a ~150px column of 5xl text, about two characters per line.
- **The nested snap container is a UX trap.** Scrolling into it hands control to a
  `snap-mandatory` child; getting *back* to the hero requires scrolling to the
  container's exact top edge. Worth reconsidering whether the nesting earns its
  complexity versus one flat scroll.
- **About section is `h-screen` with fixed type sizes** — on a 667px-tall phone
  the heading, paragraph and image stack will collide.
- Apostrophes are literal `'` in JSX (`LET'S`, ESLint error) — should be `&apos;`
  or a typographic `’`.

---

## 7. Code quality

- **14 ESLint errors, 14 warnings.** `npm run lint` does not pass. Worth wiring
  into CI so the PR checks catch regressions.
- **Dead code**: `TextPressure.tsx` (238 lines), `ScrambledText.tsx` (90),
  `ScrollFloat.tsx` (129), `ScrollReveal.tsx` (119) are all imported nowhere —
  ~575 lines. Note this means my Lenis↔ScrollTrigger sync currently guards
  components that aren't mounted; the sync is still correct and worth keeping if
  you plan to use them, otherwise GSAP itself can be dropped as a dependency.
- Unused vars: `footerVariants`, `BASE_SPRING`, `TAP_SPRING`, `lastWheelTime`,
  `motion` in ScrollyCanvas, `useRef` in Overlay, `err` in Contact.
- `ScrollMotionText` is duplicated verbatim in `Overlay.tsx` and
  `ScrollyExperience.tsx`.
- Magic numbers throughout — `0.48`, `0.54`, `0.68`, `0.74` scroll ranges, `320`
  card offset, `#ff5b22` hardcoded ~30 times instead of a CSS variable.
- `focusRail.tsx` is lowercase while every other component is PascalCase.
- No tests, no CI workflow.
- `package.json` is still named `"temp_app"`.

---

## Suggested order

1. §1 hooks bugs + clipped projects section (correctness)
2. §4 OG tags + real title (cheapest visible win)
3. §5 external links, honeypot, resume
4. §2 reduced-motion, keyboard, labels
5. §3 delete dead assets, woff2, DPR-aware canvas
6. §6 responsive passes
7. §7 lint clean + CI


---

# Still open

These were identified but deliberately left, mostly because they need your
input or are larger refactors:

## Needs your decision
- ~~**Dead components**~~ — DONE in PR #2: `TextPressure.tsx`, `ScrambledText.tsx`,
  `ScrollFloat.tsx` and `ScrollReveal.tsx` are deleted. Remaining follow-up:
  `gsap` could now be dropped as a dependency and `SmoothScroll.tsx` simplified
  to `autoRaf: true`.
- **Certificate credential URLs** — the component now renders a real link
  whenever a `url` is present, but all four entries still lack one. You need to
  paste the verification links.
- **The nested snap container** — still a UX trap (scrolling in hands control to
  a `snap-mandatory` child). Unchanged because flattening it is a design call.
- **Resume** is still a Google Drive `/view` link. Hosting the PDF in `public/`
  would give a direct download.
- **`SITE_URL`** in `app/layout.tsx` and `app/sitemap.ts` is hardcoded to
  `https://karanattri.vercel.app`. Change it if you use a custom domain.

## Remaining smaller items
- Four `<img>` elements still bypass `next/image` (`next.config.ts` is now
  configured for Cloudinary, so switching them over is straightforward).
  Note the hero canvas legitimately needs raw `Image()` objects.
- 240 frames could drop to ~120 with no perceptible difference, halving transfer.
- Hero `text-[22vw]` with `scale-y-170` still overflows at very narrow widths;
  `body { overflow-x: hidden }` masks it.
- Skills marquee is `w-[180vw]` — intentional overflow, but worth revisiting.
- `Overlay` uses `position: fixed` sections; `sticky` inside the hero would be
  the more correct primitive.
- Magic numbers remain (scroll ranges `0.48/0.54/...`, `#ff5b22` repeated ~30x
  instead of a CSS custom property).
- `focusRail.tsx` is lowercase while every other component is PascalCase.
- No tests.

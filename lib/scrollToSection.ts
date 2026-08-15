import type Lenis from "lenis";

/**
 * Finds the nearest scrollable ancestor of `el` (excluding the document itself).
 * The page has a nested `overflow-y-auto snap-mandatory` container holding the
 * About → Contact sections, so anchor links need two hops:
 *   1. Lenis scrolls the window until that container fills the viewport.
 *   2. The container scrolls natively to the target section.
 */
function getScrollParent(el: HTMLElement): HTMLElement | null {
  let parent = el.parentElement;
  while (parent && parent !== document.body && parent !== document.documentElement) {
    const { overflowY } = getComputedStyle(parent);
    const scrollable = overflowY === "auto" || overflowY === "scroll";
    if (scrollable && parent.scrollHeight > parent.clientHeight + 1) return parent;
    parent = parent.parentElement;
  }
  return null;
}

export function scrollToSection(lenis: Lenis | undefined, id: string) {
  const target = document.getElementById(id);
  if (!target) return;

  const scroller = getScrollParent(target);

  if (!scroller) {
    // top-level section — Lenis handles it directly
    if (lenis) lenis.scrollTo(target, { duration: 1.6 });
    else target.scrollIntoView({ behavior: "smooth" });
    return;
  }

  const scrollNested = () =>
    scroller.scrollTo({ top: target.offsetTop - scroller.offsetTop, behavior: "smooth" });

  if (lenis) {
    lenis.scrollTo(scroller, {
      duration: 1.6,
      onComplete: scrollNested,
    });
  } else {
    scroller.scrollIntoView({ behavior: "smooth" });
    window.setTimeout(scrollNested, 600);
  }
}

import { useEffect } from "react";

const REVEAL_SELECTOR = ".sr-hidden, .sr-left, .sr-right, .sr-scale";
const REVEAL_CLASSES = [
  "sr-hidden",
  "sr-left",
  "sr-right",
  "sr-scale",
  "sr-visible",
  "sr-d1",
  "sr-d2",
  "sr-d3",
  "sr-d4",
  "sr-d5",
  "sr-d6",
];

/**
 * Reveals elements as they scroll into view.
 * - triggers slightly before an element is fully on screen
 * - reveals once, then stops observing (no re-trigger on scroll up)
 * - after the entrance finishes, strips the reveal classes so normal
 *   hover / transform behaviour (e.g. card lift) works again
 */
export function useScrollReveal() {
  useEffect(() => {
    const nodes = Array.from(
      document.querySelectorAll(REVEAL_SELECTOR),
    ).filter((el) => !el.classList.contains("sr-visible"));
    if (!nodes.length) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    // No IntersectionObserver support or reduced motion → just show everything.
    if (reduceMotion || typeof IntersectionObserver === "undefined") {
      nodes.forEach((el) => el.classList.remove(...REVEAL_CLASSES));
      return;
    }

    const timers = new Set();

    const reveal = (el) => {
      el.classList.add("sr-visible");
      const t = window.setTimeout(() => {
        el.classList.remove(...REVEAL_CLASSES);
        el.style.willChange = "auto";
        timers.delete(t);
      }, 1400); // longest stagger (0.46s) + transition (0.85s) + buffer
      timers.add(t);
    };

    // Force content visible with no animation (used only if the observer
    // never reports — e.g. IO unavailable / page never painting).
    const forceShow = (el) => {
      el.classList.remove(...REVEAL_CLASSES);
      el.style.willChange = "auto";
    };

    let ioReported = false;
    const observer = new IntersectionObserver(
      (entries, obs) => {
        ioReported = true; // IO delivers an initial report for every target
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            reveal(entry.target);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );

    nodes.forEach((el) => observer.observe(el));

    // Safety net: a healthy IntersectionObserver fires an initial callback for
    // every observed element within a frame, so `ioReported` flips true almost
    // immediately and this does nothing (the scroll effect is preserved). It
    // only kicks in if IO never reports at all, guaranteeing no section can
    // ever stay permanently hidden.
    const safety = window.setTimeout(() => {
      if (!ioReported) {
        observer.disconnect();
        nodes.forEach((el) => {
          if (!el.classList.contains("sr-visible")) forceShow(el);
        });
      }
    }, 2500);
    timers.add(safety);

    return () => {
      observer.disconnect();
      timers.forEach((t) => window.clearTimeout(t));
    };
  }, []);
}

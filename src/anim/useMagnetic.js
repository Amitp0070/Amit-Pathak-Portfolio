import { useEffect } from "react";

/**
 * Subtle magnetic hover: matching elements drift toward the cursor.
 * Attaches to elements present at mount. Skipped on touch / reduced motion.
 */
export function useMagnetic(selector = ".magnetic", strength = 0.28) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(hover: none)").matches) return;

    const els = Array.from(document.querySelectorAll(selector));
    const cleanups = [];

    els.forEach((el) => {
      const move = (e) => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - (r.left + r.width / 2)) * strength;
        const y = (e.clientY - (r.top + r.height / 2)) * strength;
        el.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)`;
      };
      const leave = () => {
        el.style.transform = "";
      };
      el.addEventListener("mousemove", move);
      el.addEventListener("mouseleave", leave);
      cleanups.push(() => {
        el.removeEventListener("mousemove", move);
        el.removeEventListener("mouseleave", leave);
        el.style.transform = "";
      });
    });

    return () => cleanups.forEach((fn) => fn());
  }, [selector, strength]);
}

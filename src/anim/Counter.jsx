import { useEffect, useRef, useState } from "react";

/**
 * Counts up to `to` when scrolled into view. Falls back to the final value
 * if IntersectionObserver / rAF never fire, so a number is never stuck at 0.
 */
export default function Counter({
  to,
  duration = 1600,
  prefix = "",
  suffix = "",
  className = "",
}) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf;
    let safety;
    let t0;

    const run = () => {
      if (started.current) return;
      started.current = true;
      if (reduce) {
        setVal(to);
        return;
      }
      const ease = (t) => 1 - Math.pow(2, -10 * t);
      const tick = (ts) => {
        if (t0 === undefined) t0 = ts;
        const p = Math.min((ts - t0) / duration, 1);
        setVal(to * ease(p));
        if (p < 1) raf = requestAnimationFrame(tick);
        else setVal(to);
      };
      raf = requestAnimationFrame(tick);
      safety = window.setTimeout(() => setVal(to), duration + 400);
    };

    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            run();
            obs.disconnect();
          }
        });
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    const failSafe = window.setTimeout(run, 2500); // if IO never reports

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      clearTimeout(safety);
      clearTimeout(failSafe);
    };
  }, [to, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {Math.round(val)}
      {suffix}
    </span>
  );
}

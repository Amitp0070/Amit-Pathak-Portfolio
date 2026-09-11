import { useEffect, useRef, useState } from "react";
import { ChevronRight, ChevronLeft, ChevronDown } from "lucide-react";

/**
 * Snake-flow diagram: a left-to-right pipeline that turns and reverses at the
 * end of each row instead of breaking, so the connectors always point at the
 * next step. Pictograph card per step, animated connectors, sequential reveal.
 * - responsive column count (3 / 2 / 1) via ResizeObserver
 * - grid placement in snake order, so partial rows stay column-aligned
 * - never stays hidden: reduced-motion and a failsafe timer force it visible
 *
 * steps: array of strings or { label, sub, terminal }
 * tone:  "muted" renders the anti-pattern / struck-through variant
 */
export default function Pipeline({ label, steps, tone }) {
  const ref = useRef(null);
  const [cols, setCols] = useState(3);

  // reveal on scroll
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("in");
      return;
    }
    let failSafe;
    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            el.classList.add("in");
            obs.disconnect();
            clearTimeout(failSafe);
          }
        });
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    failSafe = window.setTimeout(() => el.classList.add("in"), 1600);
    return () => {
      io.disconnect();
      clearTimeout(failSafe);
    };
  }, []);

  // responsive columns
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const calc = () => {
      const w = el.clientWidth;
      setCols(w < 460 ? 1 : w < 720 ? 2 : 3);
    };
    calc();
    let ro;
    if (window.ResizeObserver) {
      ro = new ResizeObserver(calc);
      ro.observe(el);
    }
    window.addEventListener("resize", calc);
    return () => {
      if (ro) ro.disconnect();
      window.removeEventListener("resize", calc);
    };
  }, []);

  const items = steps.map((s) => (typeof s === "string" ? { label: s } : s));

  // direction of the connector leaving step i: right / left along a row, or
  // down at a row turn (physical, so it survives the reversed rows)
  const arrowFor = (i) => {
    if (i === items.length - 1) return null;
    const pos = i % cols;
    const row = Math.floor(i / cols);
    if (pos === cols - 1) return "d";
    return row % 2 === 0 ? "r" : "l";
  };
  const ArrowIcon = { r: ChevronRight, l: ChevronLeft, d: ChevronDown };

  return (
    <div
      className={`flow flow--snake${tone === "muted" ? " flow--muted" : ""}`}
      ref={ref}
      style={{ "--cols": cols }}
    >
      {label && <span className="flow-label">{label}</span>}
      <ol className="flow-steps">
        {items.map((s, i) => {
          const row = Math.floor(i / cols);
          const pos = i % cols;
          const gcol = row % 2 === 0 ? pos + 1 : cols - pos; // snake order
          const dir = arrowFor(i);
          const Arrow = dir && ArrowIcon[dir];
          return (
            <li
              className={`flow-step${s.terminal ? " is-terminal" : ""}`}
              style={{ "--i": i, gridColumn: gcol, gridRow: row + 1 }}
              key={i}
            >
              <div className="sn-txt">
                <span className="sn-lbl">{s.label}</span>
                {s.sub && <span className="sn-sub">{s.sub}</span>}
              </div>
              <span className="sn-n">{String(i + 1).padStart(2, "0")}</span>
              {Arrow && (
                <span className={`sn-arr sn-arr--${dir}`} aria-hidden="true">
                  <Arrow size={13} strokeWidth={3} />
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}

import { useEffect, useRef } from "react";

const INTERACTIVE =
  'a, button, .hex, .theme-toggle, input, textarea, select, [role="button"], .st-node';

/**
 * Custom pointer: a small blend-mode dot that tracks instantly + a larger
 * ring that trails and grows over interactive elements (à la zainabkabira.com).
 * Disabled on touch / coarse pointers.
 */
export default function DotCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(hover: none), (pointer: coarse)").matches) return;
    const root = document.documentElement;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let raf;

    const move = (e) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
      root.classList.remove("cursor-hidden");
    };
    const loop = () => {
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const over = (e) => {
      if (e.target.closest && e.target.closest(INTERACTIVE))
        root.classList.add("cursor-hover");
    };
    const out = (e) => {
      if (e.target.closest && e.target.closest(INTERACTIVE))
        root.classList.remove("cursor-hover");
    };
    const leave = () => root.classList.add("cursor-hidden");

    window.addEventListener("mousemove", move, { passive: true });
    document.addEventListener("mouseover", over);
    document.addEventListener("mouseout", out);
    document.addEventListener("mouseleave", leave);
    root.classList.add("dot-cursor-on");

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", over);
      document.removeEventListener("mouseout", out);
      document.removeEventListener("mouseleave", leave);
      root.classList.remove("dot-cursor-on", "cursor-hover", "cursor-hidden");
    };
  }, []);

  return (
    <>
      <div className="dot-cursor" ref={dotRef} aria-hidden="true" />
      <div className="dot-cursor-ring" ref={ringRef} aria-hidden="true" />
    </>
  );
}

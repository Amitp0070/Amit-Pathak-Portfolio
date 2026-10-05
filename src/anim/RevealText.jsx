import { useEffect, useRef } from "react";

/**
 * Word-by-word masked reveal (headings slide up from behind a clip edge),
 * the signature editorial reveal. Safe: if the observer never fires the text
 * is force-revealed after a short delay, never left hidden.
 */
export default function RevealText({
  as: Tag = "span",
  text,
  className = "",
  delay = 0,
  stagger = 55,
}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      el.classList.add("rt-in");
      return;
    }
    let failSafe;
    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            el.classList.add("rt-in");
            obs.disconnect();
            clearTimeout(failSafe);
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    failSafe = window.setTimeout(() => {
      el.classList.add("rt-in");
      io.disconnect();
    }, 2500);

    return () => {
      io.disconnect();
      clearTimeout(failSafe);
    };
  }, [text]);

  const words = String(text).split(" ");

  return (
    <Tag ref={ref} className={`rt ${className}`}>
      {words.map((w, i) => (
        <span className="rt-word" key={i}>
          <span
            className="rt-inner"
            style={{ transitionDelay: `${delay + i * stagger}ms` }}
          >
            {w}
          </span>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </Tag>
  );
}

import { useEffect, useRef, useState } from "react";
import { Award, ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";

/* NOTE: placeholder data — replace title / issuer / year / link (credential URL)
   with your real certificates. Add `image` (a path under /public or an imported
   asset) to use a real certificate image as the full-bleed background. */
const CERTS = [
  {
    title: "Backend Development with Python",
    issuer: "Coursera",
    year: "2024",
    color: "#2563eb",
    link: "#",
    image: "",
    blurb:
      "Server-side development in Python — structuring web backends, handling requests and building deployable APIs.",
    skills: ["Python", "REST APIs", "HTTP", "Deployment"],
    path: "From Python fundamentals through routing, request handling and API design to a deployed backend project.",
  },
  {
    title: "AI & Machine Learning Fundamentals",
    issuer: "Udemy",
    year: "2024",
    color: "#0d9488",
    link: "#",
    image: "",
    blurb:
      "Core machine-learning concepts — how models are trained and evaluated, and where AI fits into real products.",
    skills: ["ML basics", "Model training", "Data prep", "Evaluation"],
    path: "Covered supervised learning, model evaluation and practical ML workflows through hands-on notebooks.",
  },
  {
    title: "REST API Design & Development",
    issuer: "freeCodeCamp",
    year: "2023",
    color: "#8b5cf6",
    link: "#",
    image: "",
    blurb:
      "Designing and building RESTful APIs — modelling resources, HTTP methods, status codes and clean endpoints.",
    skills: ["REST", "JSON", "Auth", "Endpoint design"],
    path: "Built APIs end to end — modelling resources, handling verbs and errors, and securing endpoints.",
  },
  {
    title: "Full-Stack Web Development (Django)",
    issuer: "Digipodium",
    year: "2024",
    color: "#0d9488",
    link: "#",
    image: "",
    blurb:
      "End-to-end web apps with Django — models, views, templates and a connected frontend.",
    skills: ["Django", "MVT", "ORM", "Frontend"],
    path: "Progressed from Django models and the ORM to full request–response flows and a deployed full-stack app.",
  },
  {
    title: "Database Design & SQL",
    issuer: "HackerRank",
    year: "2023",
    color: "#2563eb",
    link: "#",
    image: "",
    blurb:
      "Relational data modelling and SQL — schemas, relationships, joins and query optimisation.",
    skills: ["SQL", "Schema design", "Joins", "Indexing"],
    path: "Solved graded SQL challenges across joins, aggregation and normalization to validate query skills.",
  },
  {
    title: "Git & GitHub Essentials",
    issuer: "Coursera",
    year: "2023",
    color: "#8b5cf6",
    link: "#",
    image: "",
    blurb:
      "Version control with Git and collaboration on GitHub — branching, merging and pull-request workflows.",
    skills: ["Git", "Branching", "Pull requests", "Collaboration"],
    path: "Practiced real branching, merging and pull-request workflows used in team development.",
  },
];

const pad = (n) => String(n).padStart(2, "0");
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

const Certifications = () => {
  const N = CERTS.length;
  const trackRef = useRef(null);
  const [active, setActive] = useState(0);
  const [reduced] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const c = CERTS[active];
  const live = c.link && c.link.startsWith("http");

  // scroll position within the tall track → active certificate (pinned mode)
  useEffect(() => {
    if (reduced) return;
    const track = trackRef.current;
    if (!track) return;
    const onScroll = () => {
      const rect = track.getBoundingClientRect();
      const dist = rect.height - window.innerHeight;
      const p = dist > 0 ? clamp(-rect.top / dist, 0, 1) : 0;
      const idx = Math.round(p * (N - 1));
      setActive((prev) => (prev === idx ? prev : idx));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    // Also hook Lenis' own scroll emitter (fires reliably each frame). __lenis is
    // created by a parent effect that may run after this one, so retry briefly.
    let lenis = null;
    let tries = 0;
    let timer = 0;
    const hook = () => {
      if (lenis) return;
      if (window.__lenis && window.__lenis.on) {
        lenis = window.__lenis;
        lenis.on("scroll", onScroll);
      } else if (tries++ < 20) {
        timer = window.setTimeout(hook, 60);
      }
    };
    timer = window.setTimeout(hook, 0);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.clearTimeout(timer);
      if (lenis && lenis.off) lenis.off("scroll", onScroll);
    };
  }, [reduced, N]);

  // navigate: in scroll mode we move the scroll position (which drives active);
  // in reduced mode we just set the index (with wrap-around).
  const goTo = (i) => {
    if (reduced) {
      setActive(((i % N) + N) % N);
      return;
    }
    const track = trackRef.current;
    if (!track) return;
    const idx = clamp(i, 0, N - 1);
    const rect = track.getBoundingClientRect();
    const dist = rect.height - window.innerHeight;
    const top = window.scrollY + rect.top + (idx / (N - 1)) * dist;
    if (window.__lenis) window.__lenis.scrollTo(top);
    else window.scrollTo({ top, behavior: "smooth" });
  };

  // keyboard arrows while the section is centered in view
  useEffect(() => {
    const onKey = (e) => {
      const sec = document.getElementById("certifications");
      if (!sec) return;
      const r = sec.getBoundingClientRect();
      const inView =
        r.top < window.innerHeight * 0.5 && r.bottom > window.innerHeight * 0.5;
      if (!inView) return;
      if (e.key === "ArrowRight") goTo(active + 1);
      if (e.key === "ArrowLeft") goTo(active - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, reduced]); // eslint-disable-line react-hooks/exhaustive-deps

  const trackStyle = reduced
    ? { background: "#0a0b11" }
    : { height: `${100 + (N - 1) * 55}vh` };

  return (
    <section
      id="certifications"
      ref={trackRef}
      className="certfx-track"
      style={trackStyle}
      aria-roledescription="carousel"
      aria-label="Certifications"
    >
      <div className={`certfx${reduced ? "" : " certfx--pin"}`} style={{ "--pc": c.color }}>
        {/* full-bleed background — real image if provided, else designed backdrop */}
        <div
          key={`bg-${active}`}
          className={`certfx-bg${c.image ? " has-img" : ""}`}
          style={c.image ? { backgroundImage: `url(${c.image})` } : undefined}
        >
          {!c.image && (
            <span className="certfx-emblem" aria-hidden="true">
              <Award size={340} strokeWidth={1} />
            </span>
          )}
        </div>

        <div className="certfx-inner">
          <div className="certfx-top">
            <span className="certfx-eyebrow">/ Certifications</span>
            <div className="certfx-counter" aria-hidden="true">
              <div className="certfx-bars">
                {CERTS.map((_, i) => (
                  <span
                    key={i}
                    className={`certfx-bar${i === active ? " on" : ""}`}
                  />
                ))}
              </div>
              <span className="certfx-count">
                {pad(active + 1)} / {pad(N)}
              </span>
            </div>
          </div>

          <div key={`main-${active}`} className="certfx-main">
            <span className="certfx-ghost" aria-hidden="true">
              {pad(active + 1)}
            </span>

            <div className="certfx-role">
              <span className="certfx-role-no">{pad(active + 1)}</span>
              <span className="certfx-role-line" />
              Certification · {c.issuer} · {c.year}
            </div>

            <h2 className="certfx-title">{c.title}</h2>
            <p className="certfx-lead">{c.blurb}</p>
            <p className="certfx-desc">{c.path}</p>

            <div className="certfx-tags">
              {c.skills.map((s, j) => (
                <span className="certfx-tag" key={j}>
                  {s}
                </span>
              ))}
            </div>

            {live ? (
              <a
                href={c.link}
                target="_blank"
                rel="noopener noreferrer"
                className="certfx-cta"
              >
                <span>View Credential</span>
                <span className="certfx-cta-ic">
                  <ArrowUpRight size={18} />
                </span>
              </a>
            ) : (
              <span className="certfx-cta certfx-cta--pending">
                <span>Credential pending</span>
                <span className="certfx-cta-ic">
                  <Award size={16} />
                </span>
              </span>
            )}
          </div>

          <div className="certfx-controls">
            <button
              type="button"
              className="certfx-arrow"
              onClick={() => goTo(active - 1)}
              aria-label="Previous certificate"
            >
              <ChevronLeft size={20} />
            </button>
            <div className="certfx-dots" role="tablist">
              {CERTS.map((cert, i) => (
                <button
                  key={i}
                  type="button"
                  className={`certfx-dot${i === active ? " on" : ""}`}
                  style={{ "--pc": cert.color }}
                  onClick={() => goTo(i)}
                  aria-label={`Certificate ${i + 1}: ${cert.title}`}
                  aria-selected={i === active}
                />
              ))}
            </div>
            <button
              type="button"
              className="certfx-arrow"
              onClick={() => goTo(active + 1)}
              aria-label="Next certificate"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {!reduced && (
            <span className="certfx-hint" aria-hidden="true">
              Scroll to explore
            </span>
          )}
        </div>
      </div>
    </section>
  );
};

export default Certifications;

import { useEffect, useRef, useState } from "react";
import { Sparkles, ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";

// A — what I build (capabilities)  ·  B — how I work (principles)
const ITEMS = [
  {
    role: "What I build",
    title: "Backend Systems & APIs",
    color: "#7c3aed",
    lead: "The engine room — reliable systems that carry real traffic.",
    desc: "I design and build the backends that do the quiet, critical work: clean REST APIs, well-modelled databases, authentication and access control, and the background jobs that keep everything moving. I’ve shipped these in FastAPI, Django and Laravel across enterprise ERP and AI products — and I care as much about the code the next developer reads as the feature it ships.",
    tags: ["FastAPI", "Django", "Laravel", "REST APIs"],
  },
  {
    role: "What I build",
    title: "AI & LLM Integration",
    color: "#0d9488",
    lead: "AI that ships — governed, grounded and swappable.",
    desc: "I build AI into real products, not proofs of concept: retrieval-augmented generation, AI agents, vector search and embeddings, all behind a provider-swappable layer so the model can change without rewriting the app. I’ve done this end to end — from a personal digital twin to call-analysis to social automation — and I keep the framing honest about what’s rule-based versus model-driven.",
    tags: ["RAG", "AI Agents", "Gemini / OpenAI", "pgvector"],
  },
  {
    role: "What I build",
    title: "Full-Stack Web Apps",
    color: "#db2777",
    lead: "One person, both ends — from schema to screen.",
    desc: "I build complete products: a responsive React / TypeScript frontend that feels good to use, wired to a backend I designed myself. Because I own both sides, the API fits the UI and the UI respects the data — no seams, no hand-offs, no “that’s a backend problem.”",
    tags: ["React", "TypeScript", "Vite", "Tailwind"],
  },
  {
    role: "What I build",
    title: "Integrations & Automation",
    color: "#2563eb",
    lead: "Wiring the messy real world together — reliably.",
    desc: "Real products live and die on integrations. I connect third-party APIs — Meta, LinkedIn, SAP, OAuth — handle webhooks and their retries, and run background workers that keep automations flowing even when a provider misbehaves. Fault isolation is the default, so one failing service never takes the whole pipeline down.",
    tags: ["OAuth", "Webhooks", "Meta / LinkedIn", "Workers"],
  },
  {
    role: "What I build",
    title: "Databases & Real-time",
    color: "#16a34a",
    lead: "Data modelled to last, delivered as it happens.",
    desc: "I design relational schemas that stay sane as they grow, tune the queries that slow things down, and store vector embeddings alongside relational data in a single Postgres store. When users need it live, I stream updates over WebSockets — inboxes, feeds and dashboards that move in real time.",
    tags: ["PostgreSQL", "pgvector", "Redis", "WebSockets"],
  },
  {
    role: "How I work",
    title: "Production-first",
    color: "#7c3aed",
    lead: "If it can’t run in production, it isn’t done.",
    desc: "I build for the real world from the first commit — tested, secured, and handling the edge cases and failures that demos skip. A feature that looks great and falls over under load isn’t finished; reliability is part of the spec, not a follow-up ticket.",
    tags: [],
  },
  {
    role: "How I work",
    title: "Clean architecture",
    color: "#0d9488",
    lead: "Code is read far more often than it’s written.",
    desc: "I keep systems layered and legible — routes, services, integrations, models — so the next engineer (often future me) can find their way without a map. Clear boundaries make features faster to add and bugs faster to kill.",
    tags: [],
  },
  {
    role: "How I work",
    title: "Ship & own it",
    color: "#db2777",
    lead: "From first commit to deployed — and everything after.",
    desc: "I take a problem from idea to live, and I stay accountable for how it behaves in the wild. Ownership means I don’t stop at “it works on my machine” — I care that it works for the person relying on it, and I fix it when it doesn’t.",
    tags: [],
  },
  {
    role: "How I work",
    title: "Always learning",
    color: "#2563eb",
    lead: "The stack keeps moving; so do I.",
    desc: "I’m never finished. What started as backend fundamentals grew into full-stack, then into AI — RAG, agents, vector search, LLM systems — because I chase the hard, interesting problems. Whatever the next thing is, I want to be building with it early.",
    tags: [],
  },
];

const pad = (n) => String(n).padStart(2, "0");
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

const Certifications = () => {
  const N = ITEMS.length;
  const trackRef = useRef(null);
  const [active, setActive] = useState(0);
  const [reduced] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const c = ITEMS[active];

  // scroll position within the tall track → active slide (pinned mode)
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
    : { height: `${100 + (N - 1) * 45}vh` };

  return (
    <section
      id="certifications"
      ref={trackRef}
      className="certfx-track"
      style={trackStyle}
      aria-roledescription="carousel"
      aria-label="What I build and how I work"
    >
      <div className={`certfx${reduced ? "" : " certfx--pin"}`} style={{ "--pc": c.color }}>
        <div key={`bg-${active}`} className="certfx-bg">
          <span className="certfx-emblem" aria-hidden="true">
            <Sparkles size={340} strokeWidth={1} />
          </span>
        </div>

        <div className="certfx-inner">
          <div className="certfx-top">
            <span className="certfx-eyebrow">/ Expertise</span>
            <div className="certfx-counter" aria-hidden="true">
              <div className="certfx-bars">
                {ITEMS.map((_, i) => (
                  <span key={i} className={`certfx-bar${i === active ? " on" : ""}`} />
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
              {c.role}
            </div>

            <h2 className="certfx-title">{c.title}</h2>
            <p className="certfx-lead">{c.lead}</p>
            {c.desc && <p className="certfx-desc">{c.desc}</p>}

            {c.tags.length > 0 && (
              <div className="certfx-tags">
                {c.tags.map((t, j) => (
                  <span className="certfx-tag" key={j}>
                    {t}
                  </span>
                ))}
              </div>
            )}

            <a href="#contact" className="certfx-cta">
              <span>Get in touch</span>
              <span className="certfx-cta-ic">
                <ArrowUpRight size={18} />
              </span>
            </a>
          </div>

          <div className="certfx-controls">
            <button
              type="button"
              className="certfx-arrow"
              onClick={() => goTo(active - 1)}
              aria-label="Previous"
            >
              <ChevronLeft size={20} />
            </button>
            <div className="certfx-dots" role="tablist">
              {ITEMS.map((it, i) => (
                <button
                  key={i}
                  type="button"
                  className={`certfx-dot${i === active ? " on" : ""}`}
                  style={{ "--pc": it.color }}
                  onClick={() => goTo(i)}
                  aria-label={`${it.role}: ${it.title}`}
                  aria-selected={i === active}
                />
              ))}
            </div>
            <button
              type="button"
              className="certfx-arrow"
              onClick={() => goTo(active + 1)}
              aria-label="Next"
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

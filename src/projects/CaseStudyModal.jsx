import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import {
  X,
  Check,
  Github,
  ArrowUpRight,
  Ban,
  BrainCircuit,
  Server,
  LayoutDashboard,
  Database,
  Radio,
  Boxes,
  Cable,
  ShieldCheck,
  Wrench,
} from "lucide-react";
import Pipeline from "./Pipeline";

// per-technology brand colour for the chip dots (keyword-matched, so it
// works across "Python" / "Python 3.12", "React" / "React 18", etc.)
const TECH_COLORS = [
  [/claude/, "#d97757"],
  [/openai/, "#10a37f"],
  [/gemini/, "#4285f4"],
  [/nvidia|flux|nim/, "#76b900"],
  [/whisper/, "#5a67d8"],
  [/elevenlabs/, "#6d5cff"],
  [/\brag\b/, "#8b5cf6"],
  [/embedding/, "#9333ea"],
  [/fastapi/, "#009688"],
  [/uvicorn/, "#4b8bbe"],
  [/python/, "#3776ab"],
  [/sqlalchemy/, "#d71f00"],
  [/alembic/, "#6ba81e"],
  [/pydantic/, "#e92063"],
  [/structlog/, "#f59e0b"],
  [/asyncpg/, "#2f6792"],
  [/typescript/, "#3178c6"],
  [/react router/, "#ca4245"],
  [/react/, "#61dafb"],
  [/vite/, "#646cff"],
  [/tailwind/, "#06b6d4"],
  [/tanstack/, "#ff4154"],
  [/zustand/, "#8a6d3b"],
  [/axios/, "#5a29e4"],
  [/postgres/, "#336791"],
  [/pgvector/, "#4479a1"],
  [/sqlite/, "#0a7ea4"],
  [/redis|arq/, "#dc382d"],
  [/celery/, "#37814a"],
  [/docker/, "#2496ed"],
  [/beautifulsoup/, "#4b8bbe"],
  [/feedparser/, "#f59e0b"],
  [/ruff/, "#9333ea"],
  [/pytest/, "#0a9edc"],
  [/websocket|sse|stream/, "#0ea5e9"],
  [/meta|graph/, "#0866ff"],
  [/linkedin/, "#0a66c2"],
  [/cloudinary/, "#3448c5"],
  [/jwt|oauth/, "#eb5424"],
  [/bcrypt|passlib/, "#6d28d9"],
  [/fernet/, "#0891b2"],
  [/rbac/, "#dc2626"],
  [/hmac|webhook/, "#0d9488"],
  [/reuse/, "#9333ea"],
];
const techColor = (name) => {
  const n = name.toLowerCase();
  for (const [re, c] of TECH_COLORS) if (re.test(n)) return c;
  return "#8b8ba0";
};

// category → icon for the tech-stack cards
const stackIcon = (group) => {
  const g = group.toLowerCase();
  if (g.includes("ai") || g.includes("llm")) return <BrainCircuit size={15} />;
  if (g.includes("front")) return <LayoutDashboard size={15} />;
  if (g.includes("back")) return <Server size={15} />;
  if (g.includes("data")) return <Database size={15} />;
  if (g.includes("realtime") || g.includes("stream"))
    return <Radio size={15} />;
  if (g.includes("infra")) return <Boxes size={15} />;
  if (g.includes("integration")) return <Cable size={15} />;
  if (g.includes("secur")) return <ShieldCheck size={15} />;
  return <Wrench size={15} />;
};

// pick an abstract wireframe skeleton for an interface preview from its name
const mockKind = (view) => {
  const v = view.toLowerCase();
  if (v.includes("chat")) return "chat";
  if (v.includes("approval") || v.includes("card")) return "card";
  if (
    v.includes("trace") ||
    v.includes("activity") ||
    v.includes("run") ||
    v.includes("behavioral")
  )
    return "trace";
  if (v.includes("upload")) return "upload";
  if (v.includes("calendar") || v.includes("schedul")) return "calendar";
  if (v.includes("studio") || v.includes("create")) return "studio";
  if (
    v.includes("leaderboard") ||
    v.includes("trending") ||
    v.includes("topic") ||
    v.includes("comparison")
  )
    return "ranklist";
  if (
    v.includes("score") ||
    v.includes("result") ||
    v.includes("analysis") ||
    v.includes("trend") ||
    v.includes("dashboard")
  )
    return "chart";
  if (
    v.includes("memory") ||
    v.includes("explorer") ||
    v.includes("channel") ||
    v.includes("connected")
  )
    return "list";
  return "panel";
};

// abstract, clearly-non-photographic UI mockup (wireframe skeleton)
function UiMock({ view }) {
  const kind = mockKind(view);
  if (kind === "chat")
    return (
      <div className="ui ui-chat">
        <span className="ui-bub" style={{ width: "62%" }} />
        <span className="ui-bub out" style={{ width: "48%" }} />
        <span className="ui-bub" style={{ width: "40%" }} />
        <span className="ui-bub out sm" style={{ width: "30%" }} />
      </div>
    );
  if (kind === "card")
    return (
      <div className="ui ui-card">
        <span className="ui-h" />
        <span className="ui-l" style={{ width: "85%" }} />
        <span className="ui-l" style={{ width: "70%" }} />
        <span className="ui-l" style={{ width: "78%" }} />
        <div className="ui-btns">
          <span className="ui-btn" />
          <span className="ui-btn acc" />
        </div>
      </div>
    );
  if (kind === "trace")
    return (
      <div className="ui ui-trace">
        {[0, 1, 2, 3].map((i) => (
          <span className="ui-step" key={i}>
            <i className={`ui-dot${i === 3 ? " acc" : ""}`} />
            <span className="ui-l" style={{ width: `${70 - i * 8}%` }} />
          </span>
        ))}
      </div>
    );
  if (kind === "chart")
    return (
      <div className="ui ui-chart">
        {[55, 80, 42, 92, 64, 74].map((h, i) => (
          <span className="ui-bar" key={i} style={{ height: `${h}%` }} />
        ))}
      </div>
    );
  if (kind === "ranklist")
    return (
      <div className="ui ui-rank">
        {[92, 70, 54, 38].map((w, i) => (
          <span className="ui-rrow" key={i}>
            <i className="ui-num" />
            <span
              className={`ui-rbar${i === 0 ? " acc" : ""}`}
              style={{ width: `${w}%` }}
            />
          </span>
        ))}
      </div>
    );
  if (kind === "calendar")
    return (
      <div className="ui ui-cal">
        {Array.from({ length: 21 }).map((_, i) => (
          <span className={`ui-cell${[4, 9, 15].includes(i) ? " acc" : ""}`} key={i} />
        ))}
      </div>
    );
  if (kind === "upload")
    return (
      <div className="ui ui-upload">
        <span className="ui-drop">
          <i className="ui-up" />
          <span className="ui-l" style={{ width: "50%" }} />
        </span>
      </div>
    );
  if (kind === "studio")
    return (
      <div className="ui ui-studio">
        <div className="ui-col">
          <span className="ui-l" style={{ width: "80%" }} />
          <span className="ui-l" style={{ width: "62%" }} />
          <span className="ui-l" style={{ width: "72%" }} />
          <span className="ui-btn acc" />
        </div>
        <div className="ui-col prev">
          <span className="ui-block" />
        </div>
      </div>
    );
  if (kind === "list")
    return (
      <div className="ui ui-list">
        {[0, 1, 2].map((i) => (
          <span className="ui-row" key={i}>
            <i className={`ui-sq${i === 0 ? " acc" : ""}`} />
            <span className="ui-rl">
              <span className="ui-l" style={{ width: `${64 - i * 6}%` }} />
              <span className="ui-l sm" style={{ width: `${40 - i * 4}%` }} />
            </span>
          </span>
        ))}
      </div>
    );
  return (
    <div className="ui ui-generic">
      <span className="ui-l" style={{ width: "55%" }} />
      <div className="ui-grid">
        <span className="acc" />
        <span />
        <span />
        <span />
      </div>
    </div>
  );
}

/**
 * Full case-study overlay for a flagship project. Rendered into <body> via a
 * portal. Locks background scroll, closes on Esc / backdrop, keeps focus in the
 * dialog, and tells Lenis to leave the panel's native scroll alone.
 */
export default function CaseStudyModal({ project, onClose }) {
  const closeRef = useRef(null);

  useEffect(() => {
    if (!project) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const t = window.setTimeout(() => closeRef.current?.focus(), 50);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
      window.clearTimeout(t);
    };
  }, [project, onClose]);

  if (!project) return null;
  const p = project;
  const a = p.architecture;

  return createPortal(
    <div
      className="cs-overlay"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="cs-panel"
        role="dialog"
        aria-modal="true"
        aria-label={`${p.name} case study`}
        data-lenis-prevent
        style={{ "--pc": p.color }}
      >
        <button
          className="cs-close"
          ref={closeRef}
          onClick={onClose}
          aria-label="Close case study"
        >
          <X size={18} />
        </button>

        {/* Hero */}
        <header className="cs-hero">
          <div className="cs-eyebrow">
            <span className="cs-no">Project {p.no}</span>
            <span className="cs-rule" />
            <span className="cs-domain">{p.domain}</span>
          </div>
          <h2 className="cs-name">{p.name}</h2>
          <p className="cs-sub">{p.subtitle}</p>
          <p className="cs-tagline">{p.tagline}</p>
          <p className="cs-oneliner">{p.oneLiner}</p>

          {p.metrics && (
            <div className="cs-metrics">
              {p.metrics.map((m, i) => (
                <div className="cs-metric" key={i}>
                  <span className="cs-metric-v">{m.value}</span>
                  <span className="cs-metric-l">{m.label}</span>
                </div>
              ))}
            </div>
          )}
        </header>

        {/* Thesis */}
        {p.thesis && (
          <div className="cs-thesis">
            <span className="cs-thesis-mark">“</span>
            {p.thesis}
          </div>
        )}

        <div className="cs-body">
          {/* Problem */}
          <section className="cs-sec">
            <h3 className="cs-h">Problem</h3>
            <p className="cs-p">{p.problem}</p>
          </section>

          {/* Approach */}
          <section className="cs-sec">
            <h3 className="cs-h">What I built</h3>
            <p className="cs-p">{p.summary}</p>
            <p className="cs-p">{p.approach}</p>
          </section>

          {/* Architecture — the signature visual */}
          {a && (
            <section className="cs-sec">
              <h3 className="cs-h">How it works</h3>
              <p className="cs-arch-title">{a.title}</p>
              <Pipeline steps={a.steps} />
              {a.caption && <p className="cs-arch-cap">{a.caption}</p>}

              {a.contrast && (
                <div className="cs-anti">
                  <span className="cs-anti-lbl">
                    <Ban size={13} /> {a.contrast.label}
                  </span>
                  <Pipeline steps={a.contrast.steps} tone="muted" />
                </div>
              )}

              {p.pipelines &&
                p.pipelines.map((pl, i) => (
                  <Pipeline key={i} label={pl.label} steps={pl.steps} />
                ))}

              {p.scoring && (
                <div className="cs-scoring">
                  <span className="cs-scoring-lbl">{p.scoring.label}</span>
                  <div className="cs-signals">
                    {p.scoring.signals.map((s, i) => (
                      <span className="cs-signal" key={i}>
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </section>
          )}

          {/* Engineering highlights */}
          {p.highlights && (
            <section className="cs-sec">
              <h3 className="cs-h">Engineering highlights</h3>
              <ul className="cs-hl">
                {p.highlights.map((h, i) => (
                  <li key={i}>
                    <Check size={15} /> {h}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Key features (grouped) */}
          {p.features && (
            <section className="cs-sec">
              <h3 className="cs-h">Key capabilities</h3>
              <div className="cs-featgrid">
                {p.features.map((f, i) => (
                  <div className="cs-featcol" key={i}>
                    <span className="cs-featgrp">{f.group}</span>
                    <ul>
                      {f.items.map((it, j) => (
                        <li key={j}>{it}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Challenges */}
          {p.challenges && (
            <section className="cs-sec">
              <h3 className="cs-h">Challenges solved</h3>
              <div className="cs-chal">
                {p.challenges.map((c, i) => (
                  <div className="cs-chal-card" key={i}>
                    <h4>{c.title}</h4>
                    <p>{c.body}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Tech stack (grouped) */}
          {p.stack && (
            <section className="cs-sec">
              <h3 className="cs-h">Tech stack</h3>
              <div className="cs-stack">
                {p.stack.map((g, i) => (
                  <div className="cs-stack-grp" key={i}>
                    <div className="cs-stack-head">
                      <span className="cs-stack-ic">{stackIcon(g.group)}</span>
                      <span className="cs-stack-lbl">{g.group}</span>
                      <span className="cs-stack-count">{g.items.length}</span>
                    </div>
                    <div className="cs-stack-tags">
                      {g.items.map((t, j) => (
                        <span className="cs-badge" key={j}>
                          <span
                            className="cs-badge-dot"
                            style={{ background: techColor(t) }}
                          />
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Interfaces — honest placeholders, not fabricated screenshots */}
          {p.interfaces && (
            <section className="cs-sec">
              <h3 className="cs-h">Interface</h3>
              <p className="cs-note">
                Interface previews — the product’s key views. Live screenshots
                available on request.
              </p>
              <div className="cs-shots">
                {p.interfaces.map((s, i) => (
                  <figure className="cs-shot" key={i}>
                    <div className="cs-shot-frame">
                      <span className="cs-shot-dots">
                        <i />
                        <i />
                        <i />
                      </span>
                      <UiMock view={s.view} />
                    </div>
                    <figcaption>
                      <strong>{s.view}</strong>
                      <span>{s.note}</span>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </section>
          )}

          {/* Links */}
          <section className="cs-sec cs-links-sec">
            {p.links && (p.links.github || p.links.demo) ? (
              <div className="cs-links">
                {p.links.demo && (
                  <a
                    href={p.links.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary px-5 py-2.5 text-sm"
                    style={{ borderRadius: "6px" }}
                  >
                    <ArrowUpRight size={15} /> Live Demo
                  </a>
                )}
                {p.links.github && (
                  <a
                    href={p.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline px-5 py-2.5 text-sm"
                    style={{ borderRadius: "6px" }}
                  >
                    <Github size={15} /> Source
                  </a>
                )}
              </div>
            ) : (
              <p className="cs-note">
                Private codebase — architecture walk-through available on
                request.
              </p>
            )}
          </section>
        </div>
      </div>
    </div>,
    document.body,
  );
}

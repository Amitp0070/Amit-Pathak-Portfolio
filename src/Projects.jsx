import { useState } from "react";
import { useScrollReveal } from "./useScrollReveal";
import RevealText from "./anim/RevealText";
import {
  BrainCircuit,
  AudioLines,
  Megaphone,
  MessagesSquare,
  Layers,
  Code2,
  MonitorSmartphone,
  Building2,
  Github,
  ExternalLink,
  ArrowUpRight,
  ChevronRight,
  Check,
} from "lucide-react";
import { FLAGSHIPS, MORE } from "./projectsData";
import CaseStudyModal from "./projects/CaseStudyModal";

const flagshipIcon = (id, size = 30) => {
  if (id === "twin-os") return <BrainCircuit size={size} />;
  if (id === "voice-call-analysis") return <AudioLines size={size} />;
  if (id === "whatsapp-inbox") return <MessagesSquare size={size} />;
  return <Megaphone size={size} />;
};

// compact-grid icon by project type
const typeIcon = (type, size = 22) => {
  const t = type.toLowerCase();
  if (t.includes("erp")) return <Building2 size={size} />;
  if (t.includes("frontend")) return <MonitorSmartphone size={size} />;
  if (t.includes("full stack")) return <Layers size={size} />;
  return <Code2 size={size} />;
};

// a few representative technologies for the concise card
const cardTags = (stack) => {
  const flat = stack.flatMap((g) => g.items);
  const picks = [];
  for (const t of flat) {
    if (picks.length >= 6) break;
    if (!picks.includes(t)) picks.push(t);
  }
  return picks;
};

const num = (i) => String(i + 1).padStart(2, "0");

function MoreLinks({ p }) {
  return (
    <>
      {p.github && (
        <a
          href={p.github}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-outline px-4 py-2 text-xs"
          style={{ borderRadius: "4px" }}
        >
          <Github size={14} /> Code
        </a>
      )}
      {p.demo && (
        <a
          href={p.demo}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary px-4 py-2 text-xs"
          style={{ borderRadius: "4px" }}
        >
          <ExternalLink size={14} /> Live Demo
        </a>
      )}
    </>
  );
}

const Projects = () => {
  useScrollReveal();
  const [active, setActive] = useState(null);

  return (
    <section
      id="projects"
      className="py-10 relative"
      style={{ background: "var(--bg-2)" }}
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="sr-hidden sr-d1 mb-2">
          <span className="section-label" style={{ borderRadius: "4px" }}>
            Selected Work
          </span>
        </div>
        <div className="sr-hidden sr-d2 mb-4">
          <div className="accent-stripe" style={{ borderRadius: "4px" }} />
          <h2
            className="font-display text-4xl sm:text-5xl"
            style={{ letterSpacing: "-0.02em", color: "var(--text-primary)" }}
          >
            <RevealText as="span" className="block" text="Flagship" />
            <span className="grad-text font-display italic">Case Studies</span>
          </h2>
        </div>
        <p
          className="sr-hidden sr-d3 max-w-4xl text-base leading-8 mb-12"
          style={{ color: "var(--text-secondary)" }}
        >
          Production-shaped AI systems — not demos. Each is a full-stack build
          spanning{" "}
          <strong style={{ color: "var(--text-primary)" }}>
            agents, RAG, real-time streaming, background pipelines
          </strong>
          , external integrations and security. Open any case study for the
          architecture and engineering decisions behind it.
        </p>

        {/* Flagship case studies */}
        <div className="fcase-list">
          {FLAGSHIPS.map((p, i) => (
            <article
              key={p.id}
              className={`fcase sr-hidden ${i % 2 === 1 ? "fcase--flip" : ""}`}
              style={{ "--pc": p.color }}
            >
              <div className="fcase-stage">
                <span className="fcase-ghost" aria-hidden="true">
                  {p.no}
                </span>
                <span className="fcase-medal">{flagshipIcon(p.id)}</span>
                {p.architecture && (
                  <div className="fteaser" aria-hidden="true">
                    {p.architecture.steps.slice(0, 4).map((s, j, arr) => (
                      <span className="fteaser-item" key={j}>
                        <span className="fteaser-chip">
                          {typeof s === "string" ? s : s.label}
                        </span>
                        {j < arr.length - 1 && <ChevronRight size={13} />}
                      </span>
                    ))}
                    <span className="fteaser-more">→ …</span>
                  </div>
                )}
              </div>

              <div className="fcase-body">
                <div className="fcase-eyebrow">
                  <span className="fcase-no">Project {p.no}</span>
                  <span className="fcase-rule" />
                  <span className="fcase-role">{p.domain}</span>
                </div>
                <h3 className="fcase-title">{p.name}</h3>
                <p className="fcase-subname">{p.subtitle}</p>
                <p className="fcase-tagline">{p.tagline}</p>
                <p className="fcase-desc">{p.summary}</p>
                <div className="fcase-tags">
                  {cardTags(p.stack).map((t, j) => (
                    <span className="tag" key={j} style={{ borderRadius: "4px" }}>
                      {t}
                    </span>
                  ))}
                </div>
                <div className="fcase-actions">
                  <button
                    type="button"
                    className="cs-open"
                    onClick={() => setActive(p)}
                  >
                    <span>View Case Study</span>
                    <span className="cs-open-arrow">
                      <ArrowUpRight size={16} />
                    </span>
                  </button>
                  {p.links && p.links.github && (
                    <a
                      href={p.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="case-link case-link--ghost"
                    >
                      <span>Source</span>
                      <span className="case-arrow">
                        <Github size={15} />
                      </span>
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* More builds */}
        <div className="sr-hidden mb-6 mt-2">
          <span className="section-label" style={{ borderRadius: "4px" }}>
            More Builds
          </span>
        </div>

        <div className="pgrid">
          {MORE.map((p, idx) => (
            <article
              key={idx}
              className={`pmini sr-hidden sr-d${(idx % 3) + 1}`}
              style={{ "--pc": p.color }}
            >
              <div className="pmini-top">
                <span className="pmini-ic">{typeIcon(p.type, 22)}</span>
                <span className="pmini-no">{p.type}</span>
              </div>
              <h4 className="pmini-title">{p.title}</h4>
              <p className="pmini-sub">{p.subtitle}</p>
              <ul className="pmini-hl">
                {p.highlights.slice(0, 3).map((h, j) => (
                  <li key={j}>
                    <Check size={14} /> {h}
                  </li>
                ))}
              </ul>
              <div className="pmini-tags">
                {p.tags.slice(0, 5).map((t, j) => (
                  <span className="tag" key={j} style={{ borderRadius: "4px" }}>
                    {t}
                  </span>
                ))}
              </div>
              <div className="pmini-links">
                <MoreLinks p={p} />
              </div>
            </article>
          ))}
        </div>
      </div>

      <CaseStudyModal project={active} onClose={() => setActive(null)} />
    </section>
  );
};

export default Projects;

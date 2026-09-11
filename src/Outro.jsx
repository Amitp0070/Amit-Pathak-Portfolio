import { useScrollReveal } from "./useScrollReveal";
import RevealText from "./anim/RevealText";
import { Mail } from "lucide-react";

const STATS = [
  { value: "3", label: "Companies · 3 roles" },
  { value: "1+ yr", label: "Production experience" },
  { value: "9", label: "Projects shipped" },
  { value: "Backend + AI", label: "Where I focus" },
];

const Outro = () => {
  useScrollReveal();

  return (
    <section id="closing" className="py-14 relative" style={{ background: "var(--bg)" }}>
      <div className="outro">
        <span className="outro-eyebrow sr-hidden sr-d1">The short version</span>

        <p className="outro-recap-lead sr-hidden sr-d2">
          A backend &amp; AI engineer who ships production-shaped systems — from
          secure enterprise APIs and ERP platforms to RAG agents and AI products.
          I care about clean architecture, real reliability, and building things
          that last.
        </p>

        <div className="outro-stats">
          {STATS.map((s, i) => (
            <div className={`outro-stat sr-hidden sr-d${i + 1}`} key={i}>
              <b className="font-display">{s.value}</b>
              <span>{s.label}</span>
            </div>
          ))}
        </div>

        <h2 className="outro-title sr-hidden sr-d2 font-display">
          <RevealText as="span" className="block" text="Let’s build the" />
          <span className="grad-text font-display italic">next one.</span>
        </h2>

        <div className="outro-cta sr-hidden sr-d3">
          <span className="outro-status">
            <span className="outro-dot" aria-hidden="true" />
            Available for full-time roles &amp; freelance
          </span>
          <a
            href="mailto:amitpathak00700@gmail.com"
            className="btn-primary magnetic px-6 py-3 text-sm"
            style={{ borderRadius: "4px" }}
          >
            <Mail size={16} /> Hire Me
          </a>
          <a
            href="#contact"
            className="btn-outline px-6 py-3 text-sm"
            style={{ borderRadius: "4px" }}
          >
            Send a message
          </a>
        </div>

        <p className="outro-sign sr-hidden">
          Thanks for reading this far.<span>— Amit Pathak</span>
        </p>
      </div>
    </section>
  );
};

export default Outro;

import { useScrollReveal } from "./useScrollReveal";
import RevealText from "./anim/RevealText";
import { Server, ShieldCheck, Database, Rocket } from "lucide-react";

const SKILLS = [
  { name: "Python", color: "#3776AB" },
  { name: "FastAPI", color: "#009688" },
  { name: "Laravel", color: "#FF2D20" },
  { name: "PHP", color: "#777BB3" },
  { name: "Django", color: "#0C4B33" },
  { name: "React", color: "#61DAFB" },
  { name: "TypeScript", color: "#3178C6" },
  { name: "JavaScript", color: "#F7DF1E" },
  { name: "REST APIs", color: "#16A34A" },
  { name: "PostgreSQL", color: "#336791" },
  { name: "MySQL", color: "#2563EB" },
  { name: "SQLAlchemy", color: "#D71F00" },
  { name: "Redis", color: "#DC382D" },
  { name: "Docker", color: "#2496ED" },
  { name: "Git", color: "#F05032" },
  { name: "GitHub", color: "#181717" },
  { name: "Tailwind CSS", color: "#06B6D4" },
  { name: "RAG", color: "#8B5CF6" },
  { name: "Vector Database", color: "#7C3AED" },
  { name: "Embeddings", color: "#9333EA" },
  { name: "AI Agents", color: "#F97316" },
  { name: "Google Gemini", color: "#4285F4" },
  { name: "OpenAI", color: "#10A37F" },
  { name: "OAuth 2.0", color: "#DC2626" },
  { name: "WebSockets", color: "#0EA5E9" },
];

const TICKER_SKILLS = [...SKILLS, ...SKILLS];

const TRAITS = [
  {
    icon: <Server size={20} />,
    title: "Backend Development",
    desc: "Experienced in building scalable backend systems, enterprise applications, and RESTful APIs using FastAPI, Laravel, Django, PostgreSQL, MySQL, and clean architecture principles.",
  },
  {
    icon: <ShieldCheck size={20} />,
    title: "Authentication & Security",
    desc: "Implemented secure authentication and authorization using Laravel Passport, Sanctum, OAuth 2.0, middleware, role-based access control (RBAC), and API security best practices.",
  },
  {
    icon: <Database size={20} />,
    title: "Database Optimization",
    desc: "Worked with PostgreSQL, MySQL, SQLAlchemy, Eloquent ORM, Vector Databases, query optimization, indexing, relational models, and high-performance data management.",
  },
  {
    icon: <Rocket size={20} />,
    title: "Problem Solving",
    desc: "Built AI-powered applications using RAG, AI Agents, Embeddings, Google Gemini, OpenAI, WebSockets, and enterprise integrations while following clean code and scalable development practices.",
  },
];

const About = () => {
  useScrollReveal();

  return (
    <section
      id="about"
      className="py-10 relative"
      style={{ background: "var(--bg-2)" }}
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="sr-hidden sr-d1 mb-2">
          <span
            className="section-label"
            style={{
              borderRadius: "4px",
            }}
          >
            About Me
          </span>
        </div>

        <div className="sr-hidden sr-d2 mb-12">
          <div
            className="accent-stripe"
            style={{
              borderRadius: "4px",
            }}
          />

          <h2
            className="font-display text-4xl sm:text-5xl"
            style={{
              color: "var(--text-primary)",
              letterSpacing: "-0.02em",
            }}
          >
            <RevealText as="span" className="block" text="The developer behind" />
            <span className="grad-text font-display italic">
              backend and AI systems
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Bio Card */}
          <div
            className="sr-left card p-8"
            style={{
              borderRadius: "4px",
            }}
          >
            <div className="flex items-start gap-4 mb-6">
              <div
                className="w-16 h-16 flex-shrink-0 flex items-center justify-center font-display font-bold text-2xl text-white"
                style={{
                  background: "var(--accent)",
                  border: "var(--border)",
                  boxShadow: "var(--shadow-md)",
                  borderRadius: "4px",
                }}
              >
                AP
              </div>

              <div>
                <h3
                  className="font-bold text-xl"
                  style={{ color: "var(--text-primary)" }}
                >
                  Amit Pathak
                </h3>

                <p
                  className="font-mono-custom text-xs mt-1"
                  style={{ color: "var(--text-muted)" }}
                >
                  Backend Developer
                </p>

                <p
                  className="font-mono-custom text-xs mt-0.5"
                  style={{ color: "var(--text-muted)" }}
                >
                  Jaunpur, Uttar Pradesh, India
                </p>
              </div>
            </div>
            <p
              className="text-sm leading-relaxed mb-4"
              style={{ color: "var(--text-secondary)" }}
            >
              Backend Developer with 1+ years of experience building enterprise
              ERP systems, scalable backend APIs, and AI-powered products.
              Currently working at{" "}
              <strong style={{ color: "var(--text-primary)" }}>
                Sevitsil Solutions in Silicone
              </strong>
              , after previously working at{" "}
              <strong style={{ color: "var(--text-primary)" }}>
                TechnoBren Infotech Pvt. Ltd.
              </strong>
              . I work across Laravel, FastAPI, Django, PostgreSQL, MySQL,
              SQLAlchemy, REST APIs, and technical support with a focus on clean
              architecture and scalable backend systems.
            </p>

            <p
              className="text-sm leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              My recent work includes AI Agents, RAG (Retrieval-Augmented
              Generation), Vector Databases, Embeddings, LLM integration, Google
              Gemini, OpenAI, AI Chatbots, Digital Twin systems, AI Automation,
              WebSockets, OAuth, and multi-provider AI integrations for modern
              Generative AI products.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="https://github.com/Amitp0070"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline px-4 py-2 text-xs"
                style={{
                  borderRadius: "4px",
                }}
              >
                GitHub ↗
              </a>

              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline px-4 py-2 text-xs"
                style={{
                  borderRadius: "4px",
                }}
              >
                LinkedIn ↗
              </a>

              <a
                href="mailto:amitpathak00700@gmail.com"
                className="btn-primary px-4 py-2 text-xs"
                style={{
                  borderRadius: "4px",
                }}
              >
                Email Me
              </a>
            </div>
          </div>

          {/* Trait Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {TRAITS.map((t, i) => (
              <div
                key={i}
                className={`sr-hidden sr-d${i + 2} card-white p-5`}
                style={{
                  borderRadius: "4px",
                }}
              >
                <div
                  className="w-10 h-10 flex items-center justify-center text-xl mb-3"
                  style={{
                    background: "var(--bg-2)",
                    color: "var(--accent)",
                    border: "var(--border)",
                    boxShadow: "var(--shadow-sm)",
                    borderRadius: "4px",
                  }}
                >
                  {t.icon}
                </div>

                <h4
                  className="font-bold text-sm mb-1.5"
                  style={{ color: "var(--text-primary)" }}
                >
                  {t.title}
                </h4>

                <p
                  className="text-xs leading-relaxed"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {t.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Skills Ticker */}
        <div className="sr-hidden sr-d2">
          <p
            className="font-mono-custom text-xs tracking-widest uppercase mb-4 text-black text-center"
            style={{ color: "var(--text-muted)" }}
          >
            Tech Stack
          </p>

          <div
            className="relative overflow-hidden py-4"
            style={{
              borderTop: "var(--border)",
              borderBottom: "var(--border)",
              background: "var(--bg-white)",
              borderRadius: "4px",
            }}
          >
            <div className="ticker-track flex gap-4 w-max">
              {TICKER_SKILLS.map((s, i) => (
                <span
                  key={i}
                  className="tag flex items-center gap-2"
                  style={{
                    borderRadius: "4px",
                  }}
                >
                  <span
                    className="w-2 h-2 rounded-full inline-block text-black"
                    style={{ background: s.color }}
                  />{" "}
                  {s.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

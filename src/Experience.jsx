import { useScrollReveal } from "./useScrollReveal";
import RevealText from "./anim/RevealText";
import {
  Bot,
  Building2,
  GraduationCap,
  MapPin,
  Calendar,
  ArrowRight,
} from "lucide-react";

const EXPERIENCES = [
  {
    no: "01",
    company: "Sevitsil Solutions",
    role: "Backend Developer",
    period: "Jun 2026 — Present",
    location: "India",
    type: "Full-time",
    focus: "AI Products & Backend Engineering",
    icon: <Bot size={20} />,
    highlights: [
      "Built AI Digital Twin & AI Social-Media Automation platforms end to end.",
      "Engineered RAG agents with vector search, embeddings and multi-provider LLMs.",
      "Shipped scalable FastAPI + PostgreSQL services with real-time WebSockets.",
      "Added OAuth integrations, prompt-engineering pipelines and ERP enhancements.",
    ],
    skills: [
      "FastAPI",
      "Python",
      "LangChain",
      "RAG",
      "Vector DB",
      "Embeddings",
      "Gemini",
      "OpenAI",
      "PostgreSQL",
      "SQLAlchemy",
      "WebSockets",
      "OAuth",
      "React",
      "Docker",
    ],
  },
  {
    no: "02",
    company: "TechnoBren Infotech",
    role: "Software Developer",
    period: "Mar 2025 — Jun 2026",
    location: "Jaunpur, UP",
    type: "Full-time",
    focus: "Enterprise ERP Systems",
    icon: <Building2 size={20} />,
    highlights: [
      "Developed enterprise ERP modules in Laravel with clean MVC architecture.",
      "Designed secure REST APIs with validation, middleware and exception handling.",
      "Integrated SAP & EFRIS for inventory, invoicing, taxation and automation.",
      "Implemented role-based access via Passport, Sanctum and Spatie permissions.",
    ],
    skills: [
      "Laravel",
      "PHP",
      "REST APIs",
      "PostgreSQL",
      "MySQL",
      "Eloquent ORM",
      "SAP",
      "EFRIS",
      "Passport",
      "Sanctum",
      "Spatie",
    ],
  },
  {
    no: "03",
    company: "Digipodium",
    role: "Software Developer Intern",
    period: "Jun 2024 — Sep 2024",
    location: "Lucknow, UP",
    type: "Internship",
    focus: "Full-stack Foundations",
    icon: <GraduationCap size={20} />,
    highlights: [
      "Built CookingStories — a full-stack recipe platform in Django (MVC).",
      "Implemented auth, recipe management, category filtering and CRUD flows.",
      "Crafted responsive interfaces with HTML, CSS, Bootstrap and JavaScript.",
      "Tuned performance and UX collaborating with mentors and the team.",
    ],
    skills: [
      "Python",
      "Django",
      "SQLite",
      "HTML",
      "CSS",
      "JavaScript",
      "Bootstrap",
      "Git",
    ],
  },
];

function ExpFull({ exp }) {
  return (
    <div className="excar-card">
      <div>
        <div className="excar-head">
          <span className="excar-no">{exp.no}</span>
          <span className="excar-ic">{exp.icon}</span>
        </div>
        <h3 className="excar-co">{exp.company}</h3>
        <p className="excar-role">
          {exp.role} · {exp.type}
        </p>
        <div className="excar-meta">
          <Calendar size={13} /> {exp.period}
        </div>
        <div className="excar-meta">
          <MapPin size={13} /> {exp.location}
        </div>
        <p className="excar-focus">{exp.focus}</p>
      </div>
      <div>
        <ul className="excar-hl">
          {exp.highlights.map((h, i) => (
            <li key={i}>
              <ArrowRight size={15} /> {h}
            </li>
          ))}
        </ul>
        <div className="excar-tags">
          {exp.skills.map((s, i) => (
            <span className="tag" key={i} style={{ borderRadius: "4px" }}>
              {s}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

const Experience = () => {
  useScrollReveal();

  return (
    <section id="experience" className="py-10" style={{ background: "var(--bg)" }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="sr-hidden sr-d1 mb-2">
          <span className="section-label" style={{ borderRadius: "4px" }}>
            Work Experience
          </span>
        </div>
        <div className="sr-hidden sr-d2 mb-10">
          <div className="accent-stripe" style={{ borderRadius: "4px" }} />
          <h2
            className="font-display text-4xl sm:text-5xl"
            style={{ letterSpacing: "-0.02em", color: "var(--text-primary)" }}
          >
            <RevealText as="span" className="block" text="My Professional" />
            <span className="grad-text font-display italic">Journey</span>
          </h2>
          <p
            className="mt-5 max-w-4xl text-base leading-8"
            style={{ color: "var(--text-secondary)" }}
          >
            From full-stack foundations to enterprise ERP systems and modern
            AI-powered products — three roles that shaped my expertise in
            scalable backend engineering, secure APIs, and real-world product
            delivery.
          </p>
        </div>

        {/* each role slides in (alternating sides) as it scrolls into view */}
        <div className="exp-stack">
          {EXPERIENCES.map((exp, i) => (
            <div key={i} className={i % 2 === 0 ? "sr-left" : "sr-right"}>
              <ExpFull exp={exp} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;

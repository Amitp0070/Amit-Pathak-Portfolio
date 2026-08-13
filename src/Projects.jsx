import { useScrollReveal } from "./useScrollReveal";
import RevealText from "./anim/RevealText";
import {
  Bot,
  Building2,
  Layers,
  Code2,
  MonitorSmartphone,
  Github,
  ExternalLink,
  ArrowUpRight,
} from "lucide-react";

const PROJECTS = [
  {
    title: "AI Social Media Automation",
    subtitle: "AI SaaS Platform",
    type: "AI SaaS",
    color: "#2563eb",
    desc: "An AI-powered SaaS platform that generates, schedules, and publishes social-media content across multiple platforms using LLMs and workflow automation.",
    tags: ["FastAPI", "React", "Gemini", "Whisper", "OAuth", "PostgreSQL"],
    highlights: [
      "Voice-to-Post AI pipeline",
      "Multi-platform publishing",
      "Approval & scheduling workflow",
      "Trend-based AI content generation",
    ],
  },
  {
    title: "AI Digital Twin",
    subtitle: "Personal AI Assistant",
    type: "AI Product",
    color: "#0d9488",
    desc: "An AI Digital Twin that learns from personal knowledge, documents, and conversations to provide intelligent, contextual responses.",
    tags: ["FastAPI", "RAG", "Vector DB", "Embeddings", "Gemini", "OpenAI"],
    highlights: [
      "Personal AI chatbot",
      "RAG knowledge retrieval",
      "Vector search & embeddings",
      "Multi-provider LLM integration",
    ],
  },
  {
    title: "Hariss International ERP",
    subtitle: "Laravel Backend Management System",
    type: "ERP SaaS",
    color: "#2563eb",
    desc: "A Laravel-based enterprise backend following MVC architecture — authentication systems, RESTful APIs, request validation, role-based access, and Eloquent ORM optimization.",
    tags: [
      "PHP",
      "Laravel",
      "REST APIs",
      "MySQL",
      "PostgreSQL",
      "Passport",
      "Sanctum",
      "Spatie",
      "Eloquent ORM",
    ],
    highlights: [
      "Secure RESTful APIs with centralized exception handling",
      "Auth with Laravel Passport & Sanctum",
      "Optimized queries with Eloquent ORM & indexing",
    ],
    github: "https://github.com/Amitp0070",
  },
  {
    title: "CookingStories",
    subtitle: "Recipe Sharing Platform",
    type: "Full Stack",
    color: "#0d9488",
    desc: "A recipe-sharing platform built with Django — responsive frontend, backend content management, and a clean, user-friendly interface.",
    tags: ["Python", "Django", "SQLite", "HTML", "CSS", "Bootstrap", "Tailwind CSS"],
    highlights: [
      "Recipe management and CRUD operations",
      "Responsive UI with Bootstrap & Tailwind CSS",
      "Django backend & database management",
    ],
    github: "https://github.com/Amitp0070",
    demo: "https://youtu.be/B5EJnMGmEx0",
  },
  {
    title: "Online Resume Builder",
    subtitle: "Full-stack Resume Builder",
    type: "Full Stack",
    color: "#2563eb",
    desc: "A full-stack resume builder in Django & SQLite that lets users create, manage, and generate professional resumes with dynamic forms and responsive design.",
    tags: ["Python", "Django", "SQLite", "HTML", "CSS", "JavaScript", "Bootstrap"],
    highlights: [
      "Dynamic resume creation & management",
      "Responsive interfaces with Bootstrap",
      "Django backend, DB & form handling",
    ],
    github: "https://github.com/Amitp0070/Online_Resume_Builder-main",
    demo: "https://www.youtube.com/",
  },
  {
    title: "Bakery Management System",
    subtitle: "Django Bakery Web App",
    type: "Personal",
    color: "#0d9488",
    desc: "A bakery management web app in Django & SQLite — manages products, categories, and customer interactions through a clean, responsive interface.",
    tags: ["Python", "Django", "SQLite", "HTML", "CSS", "JavaScript", "Bootstrap"],
    highlights: [
      "Product management & CRUD functionality",
      "Responsive pages with Bootstrap & CSS",
      "Django + SQLite backend logic",
    ],
    github: "https://github.com/Amitp0070/BakeryProject-main",
    demo: "https://youtu.be/N0gyAlpiF_8",
  },
  {
    title: "Car Marketplace",
    subtitle: "React Frontend Marketplace",
    type: "Frontend",
    color: "#2563eb",
    desc: "A modern, responsive car marketplace frontend in React.js — car listings with clean UI components, responsive layouts, and a smooth browsing experience.",
    tags: ["React.js", "JavaScript", "HTML", "CSS", "Responsive Design"],
    highlights: [
      "Responsive car-listing interface in React",
      "Reusable UI components and layouts",
      "Modern responsive design across devices",
    ],
    github: "https://github.com/Amitp0070/car-marketplace",
    demo: "https://youtu.be/7WKX1LNfKHg",
  },
  {
    title: "Finance Tracker",
    subtitle: "Full-stack Finance Manager",
    type: "Full Stack",
    color: "#0d9488",
    desc: "A full-stack finance tracker in Django & HTMX to monitor income, expenses, and overall financial health with dynamic, real-time interactions.",
    tags: ["Python", "Django", "HTMX", "SQLite", "HTML", "CSS", "Bootstrap"],
    highlights: [
      "Income & expense tracking",
      "Real-time UI interactions with HTMX",
      "Django + SQLite backend & data",
    ],
    github: "https://github.com/Amitp0070/Django---HTMX-App",
    demo: "https://youtu.be/nJYE9YM-UmU",
  },
];

const typeIcon = (type) => {
  const t = type.toLowerCase();
  if (t.includes("ai")) return <Bot size={20} />;
  if (t.includes("erp")) return <Building2 size={20} />;
  if (t.includes("frontend")) return <MonitorSmartphone size={20} />;
  if (t.includes("full stack")) return <Layers size={20} />;
  return <Code2 size={20} />;
};

const Projects = () => {
  useScrollReveal();

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
            Projects
          </span>
        </div>

        <div className="sr-hidden sr-d2 mb-4">
          <div className="accent-stripe" style={{ borderRadius: "4px" }} />
          <h2
            className="font-display text-4xl sm:text-5xl"
            style={{ letterSpacing: "-0.02em", color: "var(--text-primary)" }}
          >
            <RevealText as="span" className="block" text="Featured" />
            <span className="grad-text font-display italic">Projects</span>
          </h2>
        </div>

        <p
          className="sr-hidden sr-d3 max-w-4xl text-base leading-8 mb-10"
          style={{ color: "var(--text-secondary)" }}
        >
          A mix of{" "}
          <strong style={{ color: "var(--text-primary)" }}>
            professional company work
          </strong>{" "}
          and{" "}
          <strong style={{ color: "var(--text-primary)" }}>
            personal builds
          </strong>{" "}
          — from AI-powered SaaS platforms and an AI Digital Twin to enterprise
          ERP systems and full-stack web applications spanning FastAPI, Laravel,
          Django, and React.
        </p>

        {/* Grid */}
        <div className="proj-grid">
          {PROJECTS.map((p, i) => (
            <article
              key={i}
              className={`proj-card sr-hidden sr-d${(i % 3) + 1}`}
              style={{ "--pc": p.color }}
            >
              <div className="proj-bar" />
              <div className="proj-body">
                <div className="proj-top">
                  <span className="proj-ic">{typeIcon(p.type)}</span>
                  <span className="proj-type">{p.type}</span>
                </div>

                <div>
                  <h3 className="proj-title">{p.title}</h3>
                  <p className="proj-sub">{p.subtitle}</p>
                </div>

                <p className="proj-desc">{p.desc}</p>

                <ul className="proj-hl">
                  {p.highlights.map((h, j) => (
                    <li key={j}>
                      <ArrowUpRight size={14} /> {h}
                    </li>
                  ))}
                </ul>

                <div className="proj-tags">
                  {p.tags.map((t, j) => (
                    <span className="tag" key={j} style={{ borderRadius: "4px" }}>
                      {t}
                    </span>
                  ))}
                </div>

                <div className="proj-links">
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
                  {!p.github && !p.demo && (
                    <span
                      className="font-mono-custom text-xs"
                      style={{ color: "var(--text-muted)" }}
                    >
                      Company project · under NDA
                    </span>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;

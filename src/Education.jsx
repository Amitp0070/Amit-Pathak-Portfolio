import { useScrollReveal } from "./useScrollReveal";
import RevealText from "./anim/RevealText";
import { GraduationCap, Code2, Check } from "lucide-react";

/* NOTE: 10th & 12th carry placeholder school names ("U.P. Board · School name").
   Replace `org` with your real school + board when you have them. */
const EDUCATION = [
  {
    kind: "Degree · Conferred",
    title: "Bachelor of Computer Applications",
    org: "Veer Bahadur Singh Purvanchal University, Jaunpur",
    year: "2021 – 2024",
    color: "#7c3aed",
    icon: <GraduationCap size={26} />,
    learned:
      "Built my computer-science foundation and learned to think in systems, not scripts — data structures, databases, OOP and networks became the grounding for every backend I ship today.",
    focus: [
      "Data structures",
      "DBMS & SQL",
      "OOP",
      "Computer networks",
      "Operating systems",
      "Software engineering",
    ],
  },
  // {
  //   kind: "Professional Training",
  //   title: "Django & Frontend Development",
  //   org: "Digipodium — IT Training & Technology Research Center",
  //   year: "Jun – Sep 2024",
  //   color: "#0d9488",
  //   icon: <Code2 size={26} />,
  //   learned:
  //     "Turned coursework into shipping ability — built full-stack applications end to end, from Django models and the ORM through to a connected React frontend, and learned how production projects are structured, versioned and deployed.",
  //   focus: [
  //     "Python",
  //     "Django (MVT)",
  //     "ORM",
  //     "REST APIs",
  //     "React.js",
  //     "JavaScript",
  //     "Git workflow",
  //   ],
  // },
  {
    kind: "Board Certificate",
    title: "Senior Secondary — 12th (PCB)",
    org: "U.P. Board · Janta Inter College Thekma Bijauli Azamgarh",
    year: "2021",
    color: "#2563eb",
    icon: <GraduationCap size={26} />,
    learned:
      "The science stream — physics, chemistry and biology — that built the analytical discipline I later pointed at programming and problem-solving.",
    focus: ["Physics", "Chemistry", "Biology"],
  },
  {
    kind: "Board Certificate",
    title: "Secondary — 10th",
    org: "U.P. Board · Vishal Gyan Deep Inter College Azamgarh",
    year: "2019",
    color: "#2563eb",
    icon: <GraduationCap size={26} />,
    learned: "Where the self-driven learning habit started.",
    focus: [],
  },
];

const PRODUCED = [
  "1+ year across three roles — a full-stack internship, enterprise ERP engineering, and AI product development.",
  "Sevitsil Solutions — built an AI Digital Twin and social-automation platform end to end: RAG agents, vector search, embeddings and multi-provider LLMs on FastAPI + PostgreSQL with real-time WebSockets.",
  "TechnoBren Infotech — shipped enterprise ERP modules in Laravel: secure REST APIs, role-based access (Passport, Sanctum, Spatie) and SAP/EFRIS integrations for inventory, invoicing and taxation.",
  "Digipodium (internship) — delivered a full-stack Django platform end to end, my first hands-on production workflow.",
];

const Education = () => {
  useScrollReveal();

  return (
    <section id="education" className="py-10" style={{ background: "var(--bg)" }}>
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="sr-hidden sr-d1 mb-2">
          <span className="section-label" style={{ borderRadius: "4px" }}>
            Education & Growth
          </span>
        </div>
        <div className="sr-hidden sr-d2 mb-6">
          <div className="accent-stripe" style={{ borderRadius: "4px" }} />
          <h2
            className="font-display text-4xl sm:text-5xl"
            style={{ letterSpacing: "-0.02em", color: "var(--text-primary)" }}
          >
            <RevealText as="span" className="block" text="Education &" />
            <span className="grad-text font-display italic">
              Professional Growth
            </span>
          </h2>
        </div>
        <p
          className="sr-hidden sr-d3 max-w-4xl text-base leading-8 mb-10"
          style={{ color: "var(--text-secondary)" }}
        >
          A Computer Applications degree gave me the groundwork; hands-on
          training and daily backend work turned it into shipping ability — and
          I&apos;ve kept learning since. Here&apos;s the journey, and what each
          stage taught me.
        </p>

        {/* Landscape certificates */}
        <div className="lcert-list">
          {EDUCATION.map((e, i) => (
            <article
              key={i}
              className={`lcert sr-hidden sr-d${(i % 3) + 1}`}
              style={{ "--pc": e.color }}
            >
              <span className="lcert-seal">{e.icon}</span>

              <div className="lcert-body">
                <span className="lcert-kind">{e.kind}</span>
                <h3 className="lcert-title font-display">{e.title}</h3>
                <p className="lcert-org">{e.org}</p>
                <p className="lcert-learned">{e.learned}</p>
                {e.focus.length > 0 && (
                  <div className="lcert-focus">
                    <span className="lcert-focus-lbl">What I learned</span>
                    {e.focus.map((f, j) => (
                      <span className="tag" key={j} style={{ borderRadius: "4px" }}>
                        {f}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <span className="lcert-year">{e.year}</span>
            </article>
          ))}
        </div>

        {/* Professional highlights — what the foundation produced */}
        <div className="sr-hidden sr-d1 produced-panel">
          <span className="produced-lbl">What this foundation produced</span>
          <div className="produced-grid">
            {PRODUCED.map((p, i) => (
              <div className="produced-item" key={i}>
                <Check size={16} />
                <span>{p}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;

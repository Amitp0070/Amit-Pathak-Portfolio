import { useScrollReveal } from "./useScrollReveal";

const SKILLS = [
  { name: "PHP", color: "#777bb3" },
  { name: "Laravel", color: "#ff2d20" },
  { name: "Django", color: "#0c4b33" },
  { name: "REST APIs", color: "#16a34a" },
  { name: "MySQL", color: "#2563eb" },
  { name: "PostgreSQL", color: "#336791" },
  { name: "Laravel Passport", color: "#f59e0b" },
  { name: "Laravel Sanctum", color: "#7c3aed" },
  { name: "Eloquent ORM", color: "#f97316" },
  { name: "Authentication", color: "#10b981" },
  { name: "Role-Based Access", color: "#dc2626" },
  { name: "Postman", color: "#ff6c37" },
  { name: "HTML", color: "#e34f26" },
  { name: "CSS", color: "#1572b6" },
  { name: "JavaScript", color: "#f7df1e" },
  { name: "React.js", color: "#06b6d4" },
  { name: "Bootstrap", color: "#7952b3" },
  { name: "Tailwind CSS", color: "#06b6d4" },
];

const TICKER_SKILLS = [...SKILLS, ...SKILLS];

const TRAITS = [
  {
    icon: "⚡",
    title: "Backend Development",
    desc: "Experienced in building scalable backend systems using PHP Laravel, Django, RESTful APIs, and MVC architecture.",
  },
  {
    icon: "🔐",
    title: "Authentication & Security",
    desc: "Implemented secure authentication systems using Laravel Passport, Sanctum, middleware, and role-based access control.",
  },
  {
    icon: "🗄",
    title: "Database Optimization",
    desc: "Worked with MySQL and PostgreSQL databases using Eloquent ORM, query optimization, indexing, and relational models.",
  },
  {
    icon: "🚀",
    title: "Problem Solving",
    desc: "Strong understanding of clean code practices, debugging, API testing with Postman, and collaborative development workflows.",
  },
];

const About = () => {
  useScrollReveal();

  return (
    <section
      id="about"
      className="py-24 relative"
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
            The developer behind
            <br />
            <span className="grad-text font-display italic">
              the backend systems
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
              Backend Developer with 1+ year of hands-on experience building
              secure and scalable web applications using PHP Laravel, Django,
              RESTful APIs, MySQL, and PostgreSQL. Currently working at{" "}
              <strong style={{ color: "var(--text-primary)" }}>
                TechnoBren Infotech Pvt. Ltd.
              </strong>{" "}
              focusing on backend development and API architecture.
            </p>

            <p
              className="text-sm leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              Experienced in authentication systems, CRUD operations, database
              optimization, Eloquent ORM, middleware, request validation, and
              role-based access control. Passionate about writing clean,
              maintainable code and building reliable backend systems.
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

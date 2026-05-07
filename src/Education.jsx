import { useScrollReveal } from "./useScrollReveal";

const ACHIEVEMENTS = [
  {
    icon: "💼",
    text: "1+ year of hands-on experience in backend development using PHP Laravel and Django",
  },

  {
    icon: "🚀",
    text: "Developed secure RESTful APIs, authentication systems, and scalable backend applications",
  },

  {
    icon: "🗄",
    text: "Worked with MySQL, PostgreSQL, Eloquent ORM, query optimization, and relational database management",
  },

  {
    icon: "🎓",
    text: "Bachelor of Computer Applications (BCA) — Veer Bahadur Singh Purvanchal University",
  },
];

const COURSES = [
  "Database Management Systems",
  "Object-Oriented Programming",
  "Web Development",
  "Computer Networks",
  "Operating Systems",
  "Software Engineering",
];

const Education = () => {
  useScrollReveal();

  return (
    <section
      id="education"
      className="py-24"
      style={{ background: "var(--bg)" }}
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="sr-hidden sr-d1 mb-2">
          <span
            className="section-label"
            style={{
              borderRadius: "999px",
            }}
          >
            Education & Achievements
          </span>
        </div>

        <div className="sr-hidden sr-d2 mb-12">
          <div
            className="accent-stripe"
            style={{
              borderRadius: "999px",
            }}
          />

          <h2
            className="font-display text-4xl sm:text-5xl"
            style={{
              letterSpacing: "-0.02em",
              color: "var(--text-primary)",
            }}
          >
            Education &
            <br />
            <span className="grad-text font-display italic">Experience</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Education Card */}
          <div className="sr-left">
            <div
              className="card p-0 overflow-hidden"
              style={{
                borderRadius: "22px",
              }}
            >
              {/* Top Header */}
              <div
                className="p-5"
                style={{
                  background: "var(--accent)",
                  borderBottom: "var(--border)",
                  borderTopLeftRadius: "22px",
                  borderTopRightRadius: "22px",
                }}
              >
                <p className="font-mono-custom text-xs text-white opacity-70 mb-1">
                  2021 – 2024
                </p>

                <h3 className="font-bold text-xl text-white">
                  Bachelor of Computer Applications
                </h3>

                <p className="font-mono-custom text-xs text-white opacity-80 mt-1">
                  Veer Bahadur Singh Purvanchal University, Jaunpur
                </p>
              </div>

              {/* Content */}
              <div
                className="p-6"
                style={{
                  background: "var(--bg-card)",
                  borderBottomLeftRadius: "22px",
                  borderBottomRightRadius: "22px",
                }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="px-4 py-2 font-bold text-2xl font-display"
                    style={{
                      background: "var(--bg-white)",
                      border: "var(--border)",
                      boxShadow: "var(--shadow-sm)",
                      borderRadius: "14px",
                    }}
                  >
                    BCA
                  </div>

                  <div>
                    <p
                      className="font-bold text-sm"
                      style={{ color: "var(--text-primary)" }}
                    >
                      Computer Applications
                    </p>

                    <p
                      className="font-mono-custom text-xs"
                      style={{ color: "var(--text-muted)" }}
                    >
                      Graduation Degree
                    </p>
                  </div>
                </div>

                {/* Courses */}
                <p
                  className="font-mono-custom text-xs uppercase tracking-widest mb-3"
                  style={{ color: "var(--text-muted)" }}
                >
                  Relevant Coursework
                </p>

                <div className="flex flex-wrap gap-2">
                  {COURSES.map((c, i) => (
                    <span
                      key={i}
                      className="tag"
                      style={{
                        borderRadius: "999px",
                      }}
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Achievements */}
          <div className="flex flex-col gap-4">
            <p
              className="font-mono-custom text-xs uppercase tracking-widest"
              style={{ color: "var(--text-muted)" }}
            >
              Achievements
            </p>

            {ACHIEVEMENTS.map((a, i) => (
              <div
                key={i}
                className={`sr-hidden sr-d${
                  i + 1
                } card-white p-4 flex items-start gap-4`}
                style={{
                  borderRadius: "18px",
                }}
              >
                <div
                  className="w-10 h-10 flex items-center justify-center text-xl flex-shrink-0"
                  style={{
                    background: "var(--bg-2)",
                    border: "var(--border)",
                    boxShadow: "var(--shadow-sm)",
                    borderRadius: "10px",
                  }}
                >
                  {a.icon}
                </div>

                <p
                  className="text-sm leading-relaxed pt-1"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {a.text}
                </p>
              </div>
            ))}

            {/* Profiles */}
            <div
              className="card-white p-4"
              style={{
                borderRadius: "18px",
              }}
            >
              <p
                className="font-mono-custom text-xs uppercase tracking-widest mb-3"
                style={{ color: "var(--text-muted)" }}
              >
                Professional Profiles
              </p>

              <div className="flex flex-wrap gap-2">
                {[
                  {
                    name: "GitHub",
                    url: "https://github.com/Amitp0070",
                    color: "#000000",
                  },

                  {
                    name: "LinkedIn",
                    url: "https://www.linkedin.com/",
                    color: "#2563eb",
                  },

                  {
                    name: "Portfolio",
                    url: "#projects",
                    color: "#16a34a",
                  },
                ].map((p, i) => (
                  <a
                    key={i}
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="tag"
                    style={{
                      color: p.color,
                      borderRadius: "999px",
                    }}
                  >
                    {p.name} ↗
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;

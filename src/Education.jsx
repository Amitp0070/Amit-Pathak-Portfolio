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
              borderRadius: "4px",
            }}
          >
            Education & Achievements
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
              letterSpacing: "-0.02em",
              color: "var(--text-primary)",
            }}
          >
            Education &
            <br />
            <span className="grad-text font-display italic">Experience</span>
          </h2>
        </div>

        {/* Education Cards Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Education Card */}
          <div
            className="card p-0 overflow-hidden"
            style={{
              borderRadius: "4px",
            }}
          >
            {/* Top Header */}
            <div
              className="p-5"
              style={{
                background: "var(--accent-3)",
                borderBottom: "var(--border)",
                borderTopLeftRadius: "4px",
                borderTopRightRadius: "4px",
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
                borderBottomLeftRadius: "4px",
                borderBottomRightRadius: "4px",
              }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="px-4 py-2 font-bold text-2xl font-display"
                  style={{
                    background: "var(--bg-white)",
                    border: "var(--border)",
                    boxShadow: "var(--shadow-sm)",
                    borderRadius: "4px",
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
                      borderRadius: "4px",
                    }}
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Training Card */}
          <div
            className="card p-0 overflow-hidden"
            style={{
              borderRadius: "4px",
            }}
          >
            {/* Top Header */}
            <div
              className="p-5"
              style={{
                background: "#2563eb",
                borderBottom: "var(--border)",
                borderTopLeftRadius: "4px",
                borderTopRightRadius: "4px",
              }}
            >
              <p className="font-mono-custom text-xs text-white opacity-70 mb-1">
                June 2024 – September 2024
              </p>

              <h3 className="font-bold text-xl text-white">
                Django & Frontend Development Training
              </h3>

              <p className="font-mono-custom text-xs text-white opacity-80 mt-1">
                Digipodium — IT Training & Technology Research Center
              </p>
            </div>

            {/* Content */}
            <div
              className="p-6"
              style={{
                background: "var(--bg-card)",
                borderBottomLeftRadius: "4px",
                borderBottomRightRadius: "4px",
              }}
            >
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="px-4 py-2 font-bold text-2xl font-display"
                  style={{
                    background: "var(--bg-white)",
                    border: "var(--border)",
                    boxShadow: "var(--shadow-sm)",
                    borderRadius: "4px",
                  }}
                >
                  DJ
                </div>

                <div>
                  <p
                    className="font-bold text-sm"
                    style={{ color: "var(--text-primary)" }}
                  >
                    Python Django Training
                  </p>

                  <p
                    className="font-mono-custom text-xs"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Full Stack Web Development
                  </p>
                </div>
              </div>

              <p
                className="text-sm leading-relaxed mb-4"
                style={{ color: "var(--text-secondary)" }}
              >
                Learned and applied Django, Python, HTML, CSS, JavaScript,
                Bootstrap, and React.js to build responsive and dynamic web
                applications with backend integration and database management.
              </p>

              <div className="flex flex-wrap gap-2">
                {[
                  "Python",
                  "Django",
                  "React.js",
                  "HTML",
                  "CSS",
                  "JavaScript",
                  "Bootstrap",
                  "SQLite",
                ].map((tech, i) => (
                  <span
                    key={i}
                    className="tag"
                    style={{
                      borderRadius: "4px",
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className="mt-10">
          <p
            className="font-mono-custom text-xs uppercase tracking-widest mb-4"
            style={{ color: "var(--text-muted)" }}
          >
            Achievements
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ACHIEVEMENTS.map((a, i) => (
              <div
                key={i}
                className={`sr-hidden sr-d${
                  i + 1
                } card-white p-4 flex items-start gap-4`}
                style={{
                  borderRadius: "4px",
                }}
              >
                <div
                  className="w-10 h-10 flex items-center justify-center text-xl flex-shrink-0"
                  style={{
                    background: "var(--bg-2)",
                    border: "var(--border)",
                    boxShadow: "var(--shadow-sm)",
                    borderRadius: "4px",
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;

import { useScrollReveal } from "./useScrollReveal";

const EXPERIENCES = [
  {
    company: "TechnoBren Infotech Pvt. Ltd.",
    role: "Software Developer",
    period: "March 2025 – Present",
    location: "Jaunpur, India",
    type: "Full-time",
    color: "#ff2d20",

    projects: [
      {
        name: "Hariss International — Laravel Backend System",

        tags: [
          "PHP",
          "Laravel",
          "REST APIs",
          "MySQL",
          "PostgreSQL",
          "Laravel Passport",
          "Sanctum",
          "Spatie",
          "Postman",
        ],

        bullets: [
          "Contributed to the development of a Laravel-based backend application following MVC architecture and clean coding practices.",
          "Developed and maintained RESTful APIs with proper request validation, structured response handling, and centralized exception management.",
          "Implemented secure authentication and authorization using Laravel Passport, Sanctum, middleware, and role-based access control.",
          "Worked with Eloquent ORM for relational database design, query optimization, indexing, and efficient data filtering.",
          "Performed API testing and debugging using Postman while collaborating with cross-functional teams on production updates.",
        ],
      },
    ],
  },

  {
    company: "Digipodium — IT Training & Technology Research Center",

    role: "Software Developer Intern",

    period: "June 2024 – September 2024",

    location: "Lucknow, India",

    type: "Internship",

    color: "#2563eb",

    projects: [
      {
        name: "CookingStories — Recipe Sharing Platform",

        tags: [
          "Django",
          "Python",
          "SQLite",
          "HTML",
          "CSS",
          "JavaScript",
          "Bootstrap",
          "Tailwind CSS",
        ],

        bullets: [
          "Built a recipe-sharing web platform using Django following MVC architecture and responsive frontend development practices.",
          "Implemented authentication, recipe management, category-based filtering, and CRUD functionalities for content management.",
          "Designed responsive user interfaces using HTML, CSS, Bootstrap, and Tailwind CSS for improved user experience.",
          "Worked on backend logic, database management using SQLite, and frontend integration for dynamic content rendering.",
          "Collaborated with team members on debugging, UI improvements, and performance optimization for web applications.",
        ],
      },
    ],
  },
];

const Experience = () => {
  useScrollReveal();

  return (
    <section
      id="experience"
      className="py-24 relative"
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
            Work Experience
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
            Where I've
            <br />
            <span className="grad-text font-display italic">Contributed</span>
          </h2>
        </div>

        {/* Experience Cards */}
        <div className="flex flex-col gap-8">
          {EXPERIENCES.map((exp, ei) => (
            <div
              key={ei}
              className={`sr-hidden sr-d${ei + 1}`}
              style={{
                borderRadius: "20px",
                overflow: "hidden",
              }}
            >
              {/* Company Header */}
              <div
                className="flex flex-col sm:flex-row sm:items-center justify-between p-5 mb-0"
                style={{
                  background: exp.color,
                  border: "var(--border)",
                  boxShadow: "var(--shadow-md)",
                  borderBottom: "none",
                  borderTopLeftRadius: "20px",
                  borderTopRightRadius: "20px",
                }}
              >
                <div>
                  <h3 className="font-bold text-xl text-white">
                    {exp.company}
                  </h3>

                  <p className="font-mono-custom text-xs mt-1 text-white opacity-80">
                    {exp.role}
                  </p>
                </div>

                <div className="flex flex-col sm:items-end gap-1 mt-2 sm:mt-0">
                  <span className="font-mono-custom text-xs text-white opacity-80">
                    {exp.period}
                  </span>

                  <span
                    className="font-mono-custom text-xs px-3 py-1 w-fit"
                    style={{
                      background: "rgba(255,255,255,0.2)",
                      border: "1px solid rgba(255,255,255,0.4)",
                      borderRadius: "999px",
                    }}
                  >
                    {exp.type} · {exp.location}
                  </span>
                </div>
              </div>

              {/* Project Section */}
              <div
                style={{
                  border: "var(--border)",
                  borderTop: "none",
                  boxShadow: "var(--shadow-md)",
                  borderBottomLeftRadius: "20px",
                  borderBottomRightRadius: "20px",
                  overflow: "hidden",
                }}
              >
                {exp.projects.map((proj, pi) => (
                  <div
                    key={pi}
                    className="p-6"
                    style={{
                      borderBottom:
                        pi < exp.projects.length - 1 ? "var(--border)" : "none",

                      background: "var(--bg-card)",
                    }}
                  >
                    {/* Project Name */}
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <h4
                        className="font-bold text-sm"
                        style={{
                          color: "var(--text-primary)",
                        }}
                      >
                        {proj.name}
                      </h4>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {proj.tags.map((t, ti) => (
                        <span
                          key={ti}
                          className="tag"
                          style={{
                            borderRadius: "999px",
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Bullet Points */}
                    <ul className="flex flex-col gap-3">
                      {proj.bullets.map((b, bi) => (
                        <li
                          key={bi}
                          className="flex items-start gap-3 text-sm"
                          style={{
                            color: "var(--text-secondary)",
                          }}
                        >
                          <span
                            className="mt-1.5 w-2 h-2 rounded-full flex-shrink-0"
                            style={{
                              background: exp.color,
                            }}
                          />

                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;

import { useEffect, useState } from "react";
import { useScrollReveal } from "./useScrollReveal";
import { useMediaQuery } from "@mui/material";

const PROJECTS = [
  {
    title: "Hariss International",
    subtitle: "Laravel Backend Management System",

    type: "Professional Project",

    typeColor: "#ff2d20",

    desc: "Contributed to the development of a Laravel-based backend system following MVC architecture and clean coding practices. Worked on authentication systems, RESTful APIs, request validation, role-based access control, and relational database optimization using Eloquent ORM.",

    image: null,

    tags: [
      "PHP",
      "Laravel",
      "REST APIs",
      "MySQL",
      "PostgreSQL",
      "Laravel Passport",
      "Laravel Sanctum",
      "Spatie",
      "Eloquent ORM",
      "Postman",
    ],

    highlights: [
      "Developed secure RESTful APIs with validation and centralized exception handling",
      "Implemented authentication using Laravel Passport & Sanctum",
      "Optimized relational database queries using Eloquent ORM and indexing",
    ],

    gradient: "#ff2d20",

    github: "https://github.com/Amitp0070/CookingStories",

    demo: "https://www.youtube.com/",
  },

  {
    title: "CookingStories",
    subtitle: "Recipe Sharing Platform",

    type: "Personal Project",

    typeColor: "#2563eb",

    desc: "Built a recipe-sharing platform using Django with responsive frontend design and backend content management. Users can explore recipes, manage content, and interact through a clean and user-friendly interface.",

    image: null,

    tags: [
      "Python",
      "Django",
      "SQLite",
      "HTML",
      "CSS",
      "JavaScript",
      "Bootstrap",
      "Tailwind CSS",
    ],

    highlights: [
      "Implemented recipe management and CRUD operations",
      "Designed responsive frontend interfaces using Bootstrap and Tailwind CSS",
      "Integrated backend logic and database management using Django",
    ],

    gradient: "#2563eb",

    github: "https://github.com/Amitp0070",

    demo: "https://www.youtube.com/",
  },
  {
    title: "Online Resume Builder",

    subtitle: "Full Stack Resume Builder Application",

    type: "Full Stack Project",

    typeColor: "#16a34a",

    desc: "Developed a full stack online resume builder application using Django and SQLite that allows users to create, manage, and generate professional resumes through a user-friendly interface with dynamic form handling and responsive design.",

    image: null,

    tags: [
      "Python",
      "Django",
      "SQLite",
      "HTML",
      "CSS",
      "JavaScript",
      "Bootstrap",
      "Full Stack Development",
    ],

    highlights: [
      "Implemented dynamic resume creation and management features",
      "Built responsive frontend interfaces using Bootstrap and CSS",
      "Integrated backend logic, database management, and form handling using Django",
    ],

    gradient: "#16a34a",

    github: "https://github.com/Amitp0070/Online_Resume_Builder-main",

    demo: "https://www.youtube.com/",
  },
  // {
  //   title: "Weather Now",
  //   subtitle: "React Weather Application",

  //   type: "Frontend Project",

  //   typeColor: "#16a34a",

  //   desc: "Developed a responsive weather application using React and Vite that allows users to check weather conditions for any city in real-time using weather APIs.",

  //   image: null,

  //   tags: [
  //     "React.js",
  //     "Vite",
  //     "JavaScript",
  //     "CSS",
  //     "REST API",
  //     "Responsive Design",
  //   ],

  //   highlights: [
  //     "Real-time weather data integration using APIs",
  //     "Responsive card-based UI design",
  //     "Search functionality for different cities",
  //   ],

  //   gradient: "#16a34a",

  //   github: "https://github.com/Amitp0070",

  //   demo: "https://www.youtube.com/",
  // },
  {
    title: "Bakery Management System",

    subtitle: "Django Bakery Web Application",

    type: "Personal Project",

    typeColor: "#7c3aed",

    desc: "Developed a bakery management web application using Django and SQLite with responsive frontend design and backend management features. The platform helps manage bakery products, categories, and customer interactions through a clean user interface.",

    image: null,

    tags: [
      "Python",
      "Django",
      "SQLite",
      "HTML",
      "CSS",
      "JavaScript",
      "Bootstrap",
    ],

    highlights: [
      "Implemented product management and CRUD functionalities",
      "Built responsive frontend pages using Bootstrap and CSS",
      "Integrated backend logic and database management using Django and SQLite",
    ],

    gradient: "#7c3aed",

    github: "https://github.com/Amitp0070/BakeryProject-main",

    demo: "https://www.youtube.com/",
  },

  {
    title: "Car Marketplace",

    subtitle: "React Frontend Marketplace Application",

    type: "Frontend Project",

    typeColor: "#06b6d4",

    desc: "Developed a modern and responsive car marketplace frontend application using React.js. The platform showcases car listings with clean UI components, responsive layouts, and smooth user experience for browsing vehicles.",

    image: null,

    tags: [
      "React.js",
      "JavaScript",
      "HTML",
      "CSS",
      "Responsive Design",
      "Frontend Development",
    ],

    highlights: [
      "Built responsive car listing interface using React.js",
      "Created reusable frontend UI components and layouts",
      "Implemented modern responsive design for multiple screen sizes",
    ],

    gradient: "#06b6d4",

    github: "https://github.com/Amitp0070/car-marketplace",

    demo: "https://www.youtube.com/",
  },
  {
    title: "Finance Tracker",

    subtitle: "Full Stack Finance Management Application",

    type: "Full Stack Project",

    typeColor: "#f59e0b",

    desc: "Developed a full stack finance tracking application using Django and HTMX that allows users to monitor income, expenses, and overall financial stability through dynamic and interactive user interfaces with real-time updates.",

    image: null,

    tags: [
      "Python",
      "Django",
      "HTMX",
      "SQLite",
      "HTML",
      "CSS",
      "JavaScript",
      "Bootstrap",
      "Full Stack Development",
    ],

    highlights: [
      "Implemented income and expense tracking functionalities",
      "Built dynamic real-time UI interactions using HTMX",
      "Integrated backend logic and database management using Django and SQLite",
    ],

    gradient: "#f59e0b",

    github: "https://github.com/Amitp0070/Django---HTMX-App",

    demo: "https://www.youtube.com/",
  },
];

const Projects = () => {
  const isMobile = useMediaQuery("(max-width:578px)");

  const [flowOpen, setFlowOpen] = useState(false);

  useScrollReveal();

  useEffect(() => {
    if (!flowOpen) return;

    const onKey = (e) => {
      if (e.key === "Escape") setFlowOpen(false);
    };

    document.addEventListener("keydown", onKey);

    const prevOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [flowOpen]);

  return (
    <section
      id="projects"
      className="py-24 relative"
      style={{ background: "var(--bg-2)" }}
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
            Projects
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
            Featured
            <br />
            <span className="grad-text font-display italic">Projects</span>
          </h2>

          <p
            className="text-base mt-4 max-w-xl"
            style={{ color: "var(--text-secondary)" }}
          >
            Backend systems, APIs, and responsive web applications built using
            Laravel, Django, React.js, and modern development practices.
          </p>
        </div>

        {/* Modal */}
        {flowOpen && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Project Architecture Flow"
            onClick={() => setFlowOpen(false)}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(15,15,15,0.65)",
              backdropFilter: "blur(4px)",
              WebkitBackdropFilter: "blur(4px)",
              zIndex: 100,
              overflowY: "auto",
              padding: isMobile ? "16px 8px" : "32px 24px",
              animation: "reveal-fade 0.25s ease forwards",
            }}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                position: "relative",
                maxWidth: "1280px",
                margin: "0 auto",
                background: "var(--bg-2)",
                border: "var(--border)",
                boxShadow: "var(--shadow-xl)",
                borderRadius: "22px",
                overflow: "hidden",
              }}
            >
              <GymProjectFlow />
            </div>
          </div>
        )}

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {PROJECTS.map((p, i) => (
            <div
              key={i}
              className={`sr-hidden sr-d${
                (i % 2) + 1
              } card overflow-hidden flex flex-col`}
              style={{
                borderRadius: "20px",
              }}
            >
              {/* Top Bar */}
              <div
                className="h-10 flex-shrink-0"
                style={{
                  background: p.gradient,
                }}
              />

              <div className="p-6 flex flex-col flex-1">
                {/* Title */}
                <div
                  className={`flex ${
                    isMobile ? "flex-col" : "flex-row"
                  } items-start justify-between gap-3 mb-1`}
                >
                  <h3
                    className="font-bold text-xl"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {p.title}
                  </h3>

                  <span
                    className="font-mono-custom text-xs px-3 py-2 flex-shrink-0 mt-0.5"
                    style={{
                      background: p.typeColor,
                      color: "#fff",
                      border: "var(--border)",
                      boxShadow: "2px 2px 0px #1a1a1a",
                      borderRadius: "999px",
                    }}
                  >
                    {p.type}
                  </span>
                </div>

                {/* Subtitle */}
                <p
                  className={`font-mono-custom text-xs ${
                    isMobile && "mt-2"
                  } mb-4`}
                  style={{ color: "var(--text-muted)" }}
                >
                  {p.subtitle}
                </p>

                {/* Description */}
                <p
                  className="text-sm leading-relaxed mb-4 flex-1"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {p.desc}
                </p>

                {/* Highlights */}
                <div className="mb-4">
                  {p.highlights.map((h, j) => (
                    <div
                      key={j}
                      className="flex items-start gap-2 text-xs mb-2"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      <span
                        className="flex-shrink-0 font-bold"
                        style={{ color: p.gradient }}
                      >
                        →
                      </span>

                      {h}
                    </div>
                  ))}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {p.tags.map((t, j) => (
                    <span
                      key={j}
                      className="font-mono-custom text-xs px-3 py-2"
                      style={{
                        background: "var(--bg-white)",
                        border: "var(--border)",
                        boxShadow: "2px 2px 0px rgba(26,26,26,0.3)",
                        color: "var(--text-secondary)",
                        fontWeight: 600,
                        borderRadius: "999px",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Buttons */}
                <div className="flex flex-wrap gap-3 mt-auto">
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline px-4 py-2 text-xs"
                    style={{
                      borderRadius: "12px",
                    }}
                  >
                    GitHub ↗
                  </a>

                  <a
                    href={p.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary px-4 py-2 text-xs"
                    style={{
                      borderRadius: "12px",
                    }}
                  >
                    Live Demo ↗
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;

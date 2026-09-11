import { useEffect, useRef } from "react";
import { useScrollReveal } from "./useScrollReveal";
import RevealText from "./anim/RevealText";
import { Webhook, Sparkles, Binary, Bot, KeyRound, Cable, Database } from "lucide-react";
import {
  SiPython,
  SiFastapi,
  SiLaravel,
  SiPhp,
  SiDjango,
  SiReact,
  SiTypescript,
  SiJavascript,
  SiPostgresql,
  SiMysql,
  SiSqlalchemy,
  SiRedis,
  SiDocker,
  SiGit,
  SiGithub,
  SiTailwindcss,
  SiOpenai,
  SiGooglegemini,
} from "react-icons/si";

const iconColor = (hex) => {
  const c = hex.replace("#", "");
  const r = parseInt(c.slice(0, 2), 16);
  const g = parseInt(c.slice(2, 4), 16);
  const b = parseInt(c.slice(4, 6), 16);
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.6 ? "#111" : "#fff";
};

// three branches off "My Skills", two categories each
const BRANCHES = [
  [
    {
      label: "Languages",
      items: [
        { name: "Python", color: "#3776AB", icon: <SiPython /> },
        { name: "JavaScript", color: "#F7DF1E", icon: <SiJavascript /> },
        { name: "TypeScript", color: "#3178C6", icon: <SiTypescript /> },
        { name: "PHP", color: "#777BB3", icon: <SiPhp /> },
      ],
    },
    {
      label: "Frontend",
      items: [
        { name: "React", color: "#61DAFB", icon: <SiReact /> },
        { name: "Tailwind", color: "#06B6D4", icon: <SiTailwindcss /> },
      ],
    },
  ],
  [
    {
      label: "Backend & APIs",
      items: [
        { name: "FastAPI", color: "#009688", icon: <SiFastapi /> },
        { name: "Laravel", color: "#FF2D20", icon: <SiLaravel /> },
        { name: "Django", color: "#0C4B33", icon: <SiDjango /> },
        { name: "REST APIs", color: "#16A34A", icon: <Webhook /> },
        { name: "OAuth 2.0", color: "#DC2626", icon: <KeyRound /> },
        { name: "WebSockets", color: "#0EA5E9", icon: <Cable /> },
      ],
    },
    {
      label: "Databases",
      items: [
        { name: "PostgreSQL", color: "#336791", icon: <SiPostgresql /> },
        { name: "MySQL", color: "#4479A1", icon: <SiMysql /> },
        { name: "SQLAlchemy", color: "#D71F00", icon: <SiSqlalchemy /> },
        { name: "Redis", color: "#DC382D", icon: <SiRedis /> },
        { name: "Vector DB", color: "#7C3AED", icon: <Database /> },
      ],
    },
  ],
  [
    {
      label: "AI / ML",
      items: [
        { name: "RAG", color: "#8B5CF6", icon: <Sparkles /> },
        { name: "Embeddings", color: "#9333EA", icon: <Binary /> },
        { name: "AI Agents", color: "#F97316", icon: <Bot /> },
        { name: "Gemini", color: "#4285F4", icon: <SiGooglegemini /> },
        { name: "OpenAI", color: "#10A37F", icon: <SiOpenai /> },
      ],
    },
    {
      label: "Tools & DevOps",
      items: [
        { name: "Docker", color: "#2496ED", icon: <SiDocker /> },
        { name: "Git", color: "#F05032", icon: <SiGit /> },
        { name: "GitHub", color: "#24292F", icon: <SiGithub /> },
      ],
    },
  ],
];

const Skills = () => {
  useScrollReveal();
  const treeRef = useRef(null);
  const svgRef = useRef(null);

  // draw the connector lines (node → bus → each branch) precisely with SVG
  useEffect(() => {
    const tree = treeRef.current;
    const svg = svgRef.current;
    if (!tree || !svg) return;
    const path = svg.querySelector("path");
    const draw = () => {
      const node = tree.querySelector(".st-node");
      const branches = Array.from(tree.querySelectorAll(".st-branch"));
      if (!node || !branches.length) return;
      const tr = tree.getBoundingClientRect();
      if (tr.width === 0) return;
      const nr = node.getBoundingClientRect();
      const nx = nr.left + nr.width / 2 - tr.left;
      const ny = nr.bottom - tr.top;
      const pts = branches.map((b) => {
        const r = b.getBoundingClientRect();
        return { x: r.left + r.width / 2 - tr.left, y: r.top - tr.top };
      });
      const busY = ny + Math.max(14, (pts[0].y - ny) * 0.5);
      const minX = Math.min(...pts.map((p) => p.x));
      const maxX = Math.max(...pts.map((p) => p.x));
      let d = `M${nx.toFixed(1)} ${ny.toFixed(1)}L${nx.toFixed(1)} ${busY.toFixed(1)}`;
      d += `M${minX.toFixed(1)} ${busY.toFixed(1)}L${maxX.toFixed(1)} ${busY.toFixed(1)}`;
      pts.forEach((p) => {
        d += `M${p.x.toFixed(1)} ${busY.toFixed(1)}L${p.x.toFixed(1)} ${p.y.toFixed(1)}`;
      });
      svg.setAttribute("viewBox", `0 0 ${tr.width} ${tr.height}`);
      path.setAttribute("d", d);
    };
    draw();
    const raf = requestAnimationFrame(draw);
    const t = window.setTimeout(draw, 400);
    window.addEventListener("resize", draw);
    let ro;
    if (window.ResizeObserver) {
      ro = new ResizeObserver(draw);
      ro.observe(tree);
    }
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(draw);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t);
      window.removeEventListener("resize", draw);
      if (ro) ro.disconnect();
    };
  }, []);

  // pop the hexagons in (staggered) when the tree scrolls into view
  useEffect(() => {
    const el = treeRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("in");
      return;
    }
    let failSafe;
    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            el.classList.add("in");
            obs.disconnect();
            clearTimeout(failSafe);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -6% 0px" },
    );
    io.observe(el);
    failSafe = window.setTimeout(() => el.classList.add("in"), 2500);
    return () => {
      io.disconnect();
      clearTimeout(failSafe);
    };
  }, []);

  let g = 0; // running index for stagger

  return (
    <section id="skills" className="py-10" style={{ background: "var(--bg-2)" }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="sr-hidden sr-d1 mb-2">
          <span className="section-label" style={{ borderRadius: "4px" }}>
            Tech Stack
          </span>
        </div>
        <div className="sr-hidden sr-d2 mb-10">
          <div className="accent-stripe" style={{ borderRadius: "4px" }} />
          <h2
            className="font-display text-4xl sm:text-5xl"
            style={{ letterSpacing: "-0.02em", color: "var(--text-primary)" }}
          >
            <RevealText as="span" className="block" text="Skills &" />
            <span className="grad-text font-display italic">Technologies</span>
          </h2>
          <p
            className="mt-5 max-w-4xl text-base leading-8"
            style={{ color: "var(--text-secondary)" }}
          >
            The languages, frameworks, databases and AI tooling I use to build
            scalable backend systems and modern AI-powered products.
          </p>
        </div>

        <div className="skilltree" ref={treeRef}>
          <svg className="st-svg" ref={svgRef} aria-hidden="true">
            <path d="" />
          </svg>
          <div className="st-node-wrap">
            <span className="st-node">My Skills</span>
          </div>

          <div className="st-branches">
            {BRANCHES.map((branch, bi) => (
              <div className="st-branch" key={bi}>
                {branch.map((cat) => (
                  <div className="st-cat" key={cat.label}>
                    <div className="st-lbl">{cat.label}</div>
                    <div className="st-hexes">
                      {cat.items.map((s) => {
                        const d = g++;
                        return (
                          <div className="hex" style={{ "--d": d }} key={s.name}>
                            <div className="hex-face">
                              <span
                                className="hex-tile"
                                style={{
                                  background: s.color,
                                  color: iconColor(s.color),
                                }}
                              >
                                {s.icon}
                              </span>
                              <span className="hex-name">{s.name}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;

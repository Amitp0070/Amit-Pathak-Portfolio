const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer
      className="py-10"
      style={{
        background: "#0f0f0f",
        borderTop: "3px solid #1a1a1a",
      }}
    >
      <div
        className="max-w-6xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-5"
        style={{
          background: "rgba(255,255,255,0.01)",
          border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: "4px",
          backdropFilter: "blur(10px)",
        }}
      >
        {/* Left */}
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 flex items-center justify-center font-bold text-sm"
            style={{
              background: "var(--accent)",
              border: "1.5px solid #fff",
              color: "#fff",
              borderRadius: "4px",
              boxShadow: "2px 2px 0px rgba(255,255,255,0.15)",
            }}
          >
            AP
          </div>

          <div>
            <p className="font-bold text-white text-sm">Amit Pathak</p>

            <p
              className="font-mono-custom text-xs"
              style={{
                color: "#8a8a8a",
              }}
            >
              Backend Developer
            </p>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex items-center flex-wrap justify-center gap-3">
          {[
            {
              label: "GitHub",

              href: "https://github.com/Amitp0070",
            },

            {
              label: "LinkedIn",

              href: "https://www.linkedin.com/",
            },

            {
              label: "Email",

              href: "mailto:amitpathak00700@gmail.com",
            },
          ].map((s, i) => (
            <a
              key={i}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono-custom text-xs transition-all duration-300 px-4 py-2"
              style={{
                color: "#9a9a9a",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "4px",
                background: "rgba(255,255,255,0.03)",
              }}
              onMouseEnter={(e) => {
                e.target.style.color = "#fff";
                e.target.style.background = "rgba(255,255,255,0.08)";
              }}
              onMouseLeave={(e) => {
                e.target.style.color = "#9a9a9a";
                e.target.style.background = "rgba(255,255,255,0.03)";
              }}
            >
              {s.label} ↗
            </a>
          ))}
        </div>

        {/* Copyright */}
        <p
          className="font-mono-custom text-xs"
          style={{
            color: "#5a5a5a",
          }}
        >
          © {year} Amit Pathak
        </p>
      </div>
    </footer>
  );
};

export default Footer;

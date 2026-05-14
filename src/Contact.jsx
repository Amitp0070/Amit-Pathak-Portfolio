import { useState } from "react";
import emailjs from "@emailjs/browser";
import { useScrollReveal } from "./useScrollReveal";

const Contact = () => {
  useScrollReveal();

  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const [status, setStatus] = useState(null);

  const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  const send = async (e) => {
    e.preventDefault();

    setLoading(true);

    setStatus(null);

    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: form.name,
          from_email: form.email,

          message: `Position/Role: ${form.role}\n\n${form.message}`,
        },

        PUBLIC_KEY,
      );

      setStatus("success");

      setForm({
        name: "",
        email: "",
        role: "",
        message: "",
      });

      setTimeout(() => setStatus(null), 6000);
    } catch {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  const CONTACTS = [
    {
      label: "Email",

      value: "amitpathak00700@gmail.com",

      href: "mailto:amitpathak00700@gmail.com",
    },

    {
      label: "GitHub",

      value: "Amitp0070",

      href: "https://github.com/Amitp0070",
    },

    {
      label: "LinkedIn",

      value: "linkedin.com/in/amit-pathak",

      href: "https://www.linkedin.com/",
    },

    {
      label: "Location",

      value: "Jaunpur, Uttar Pradesh, India",

      href: null,
    },

    {
      label: "Phone",

      value: "+91 6393588327",

      href: "tel:+916393588327",
    },
  ];

  return (
    <section
      id="contact"
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
            Get In Touch
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
            Let's Build
            <br />
            <span className="grad-text font-display italic">
              Something Great
            </span>
          </h2>

          <p
            className="text-base mt-4 max-w-lg"
            style={{ color: "var(--text-secondary)" }}
          >
            Open to backend development roles, opportunities, Laravel projects,
            and collaborative web development work. I usually respond within 24
            hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Contact Info */}
          <div className="lg:col-span-2 sr-left flex flex-col gap-4">
            {CONTACTS.map((c, i) => (
              <div
                key={i}
                className="card-white p-4 flex items-center justify-between"
                style={{
                  borderRadius: "4px",
                }}
              >
                <span
                  className="font-mono-custom text-xs uppercase tracking-widest"
                  style={{ color: "var(--text-muted)" }}
                >
                  {c.label}
                </span>

                {c.href ? (
                  <a
                    href={c.href}
                    target={c.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="text-sm font-semibold transition-colors break-all text-right"
                    style={{
                      color: "var(--accent)",
                    }}
                    onMouseEnter={(e) =>
                      (e.target.style.color = "var(--accent-2)")
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.color = "var(--accent)")
                    }
                  >
                    {c.value} ↗
                  </a>
                ) : (
                  <span
                    className="text-sm text-right"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {c.value}
                  </span>
                )}
              </div>
            ))}

            {/* Availability Card */}
            <div
              className="p-4 mt-2"
              style={{
                background: "var(--accent)",
                border: "var(--border)",
                boxShadow: "var(--shadow-md)",
                borderRadius: "4px",
              }}
            >
              <p className="font-mono-custom text-xs text-white opacity-80 mb-1">
                Status
              </p>

              <p className="font-bold text-white">
                ✅ Available for opportunities
              </p>

              <p className="text-xs text-white opacity-70 mt-1">
                Full-time · Remote
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div
            className="lg:col-span-3 card p-8"
            style={{
              borderRadius: "4px",
            }}
          >
            <form onSubmit={send} className="flex flex-col gap-5">
              {/* Name + Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {[
                  {
                    id: "name",

                    label: "Your Name",

                    type: "text",

                    placeholder: "John Doe",
                  },

                  {
                    id: "email",

                    label: "Your Email",

                    type: "email",

                    placeholder: "john@company.com",
                  },
                ].map((f) => (
                  <div key={f.id} className="flex flex-col gap-2">
                    <label
                      htmlFor={f.id}
                      className="font-mono-custom text-xs uppercase tracking-widest"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {f.label}
                    </label>

                    <input
                      type={f.type}
                      id={f.id}
                      name={f.id}
                      value={form[f.id]}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          [f.id]: e.target.value,
                        })
                      }
                      placeholder={f.placeholder}
                      required
                      className="form-input"
                      style={{
                        borderRadius: "4px",
                      }}
                    />
                  </div>
                ))}
              </div>

              {/* Role */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="role"
                  className="font-mono-custom text-xs uppercase tracking-widest"
                  style={{ color: "var(--text-muted)" }}
                >
                  Position / Opportunity
                </label>

                <input
                  type="text"
                  id="role"
                  name="role"
                  value={form.role}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      role: e.target.value,
                    })
                  }
                  placeholder="e.g. Laravel Backend Developer"
                  className="form-input"
                  style={{
                    borderRadius: "4px",
                  }}
                />
              </div>

              {/* Message */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="message"
                  className="font-mono-custom text-xs uppercase tracking-widest"
                  style={{ color: "var(--text-muted)" }}
                >
                  Message
                </label>

                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={form.message}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      message: e.target.value,
                    })
                  }
                  placeholder="Tell me about the project, role, or opportunity..."
                  required
                  className="form-input"
                  style={{
                    resize: "none",
                    borderRadius: "4px",
                  }}
                />
              </div>

              {/* Button */}
              <button
                type="submit"
                disabled={loading}
                className={`btn-primary py-4 text-base flex items-center justify-center gap-2 ${
                  loading ? "opacity-60 cursor-not-allowed" : ""
                }`}
                style={{
                  borderRadius: "4px",
                }}
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        className="opacity-25"
                      />

                      <path
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        className="opacity-75"
                      />
                    </svg>
                    Sending...
                  </>
                ) : (
                  "Send Message →"
                )}
              </button>

              {/* Success */}
              {status === "success" && (
                <p
                  className="text-green-700 text-center text-sm font-semibold"
                  style={{
                    border: "1px solid #16a34a",
                    padding: "12px",
                    background: "#f0fdf4",
                    borderRadius: "4px",
                  }}
                >
                  ✓ Your message has been delivered successfully.
                </p>
              )}

              {/* Error */}
              {status === "error" && (
                <p
                  className="text-red-600 text-center text-sm"
                  style={{
                    border: "1px solid #e85d3a",
                    padding: "12px",
                    background: "#fff5f5",
                    borderRadius: "4px",
                  }}
                >
                  ✗ Oops! Something went wrong while sending the message.
                  amitpathak00700@gmail.com
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

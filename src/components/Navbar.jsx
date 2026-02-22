import { useState } from "react";
import { useI18n } from "../i18n";
import { useTheme } from "../context/ThemeContext";

const NAV_SECTIONS = ["about", "skills", "projects", "certifications", "contact"];

export function Navbar() {
  const { t, lang, setLang } = useI18n();
  const { dark, toggle }     = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 200,
          height: "64px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 clamp(16px, 5vw, 56px)",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
          background: "var(--nav-bg)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        {/* Logo */}
        <button
          onClick={() => scrollTo("hero")}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontFamily: "var(--font-mono)",
            fontWeight: 800,
            fontSize: "18px",
            color: "var(--text)",
          }}
        >
          <span style={{ color: "var(--accent)" }}>M</span>
          <span>OHAMMED</span>
        </button>

        {/* Desktop links */}
        <div className="hide-mobile" style={{ display: "flex", gap: "28px" }}>
          {NAV_SECTIONS.map((key) => (
            <button key={key} className="nav-link" onClick={() => scrollTo(key)}>
              {t(`nav.${key}`)}
            </button>
          ))}
        </div>

        {/* Controls */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          {/* Language toggle */}
          <button
            onClick={() => setLang(lang === "fr" ? "en" : "fr")}
            style={{
              background: "var(--card)",
              border: "1.5px solid var(--border)",
              borderRadius: "6px",
              padding: "5px 12px",
              color: "var(--text)",
              cursor: "pointer",
              fontFamily: "var(--font-mono)",
              fontWeight: 700,
              fontSize: "12px",
              letterSpacing: "0.05em",
              transition: "border-color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
          >
            {lang === "fr" ? "EN" : "FR"}
          </button>

          {/* Dark mode toggle */}
          <button
            onClick={toggle}
            title={dark ? "Light mode" : "Dark mode"}
            style={{
              background: "var(--card)",
              border: "1.5px solid var(--border)",
              borderRadius: "6px",
              width: "36px",
              height: "36px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              fontSize: "16px",
              transition: "border-color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
          >
            {dark ? <i class="fa-solid fa-sun" style={{color: "orange"}}></i> : <i class="fa-solid fa-moon"></i>}
          </button>

          {/* Hamburger (mobile) */}
          <button
            className="hide-desktop"
            onClick={() => setMobileOpen((o) => !o)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: "22px",
              color: "var(--text)",
              lineHeight: 1,
            }}
          >
            {mobileOpen ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div
          style={{
            position: "fixed",
            top: "64px",
            left: 0,
            right: 0,
            zIndex: 199,
            background: "var(--bg2)",
            borderBottom: "1px solid var(--border)",
            padding: "20px 24px",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          {NAV_SECTIONS.map((key) => (
            <button
              key={key}
              className="nav-link"
              style={{ fontSize: "16px", textAlign: "left" }}
              onClick={() => scrollTo(key)}
            >
              {t(`nav.${key}`)}
            </button>
          ))}
        </div>
      )}
    </>
  );
}

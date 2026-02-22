import { useI18n } from "../i18n";
import { TypewriterText } from "../components/ui/TypewriterText";

export function Hero() {
  const { t,lang } = useI18n();

  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });


  return (
    <section
      id="hero"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        padding: "80px clamp(16px, 6vw, 80px) 40px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Atmospheric orbs */}
      <div
        className="orb"
        style={{ width: 420, height: 420, background: "rgba(0,212,255,0.07)", top: -80, right: -80 }}
      />
      <div
        className="orb"
        style={{ width: 320, height: 320, background: "rgba(124,58,237,0.07)", bottom: -40, left: -60 }}
      />

      {/* Content */}
      <div
        style={{
          maxWidth: "920px",
          margin: "0 auto",
          width: "100%",
          position: "relative",
          zIndex: 1,
          animation: "fadeSlideUp 0.8s ease both",
        }}
      >
        {/* Available badge */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "28px" }}>
          <span className="glow-dot" />
          <span
            style={{
              color: "var(--accent)",
              fontFamily: "var(--font-mono)",
              fontSize: "13px",
              fontWeight: 700,
              letterSpacing: "0.05em",
            }}
          >
            {t("hero.available")}
          </span>
        </div>

        {/* Greeting */}
        <p style={{ color: "var(--text2)", fontSize: "18px", fontWeight: 600, marginBottom: "8px" }}>
          {t("hero.greeting")}
        </p>

        {/* Name */}
        <h1
          style={{
            fontSize: "clamp(38px, 7vw, 82px)",
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: "-0.025em",
            marginBottom: "16px",
          }}
        >
          Mohammed
          <br />
          <span
            style={{
              background: "linear-gradient(135deg, var(--accent), var(--accent2))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            El-Manssouri
          </span>
        </h1>

        {/* Animated role */}
        <h2
          style={{
            fontSize: "clamp(20px, 3vw, 34px)",
            fontWeight: 700,
            color: "var(--text2)",
            marginBottom: "24px",
            minHeight: "44px",
          }}
        >
          <TypewriterText texts={t("hero.roles")} />
        </h2>

        {/* Subtitle */}
        <p
          style={{
            fontSize: "17px",
            lineHeight: 1.8,
            color: "var(--text2)",
            maxWidth: "540px",
            marginBottom: "44px",
          }}
        >
          {t("hero.subtitle")}
        </p>

        {/* CTAs */}
        <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
          <button className="btn btn--primary" onClick={() => scrollTo("projects")}>
            🚀 {t("hero.cta_projects")}
          </button>
          <button className="btn btn--outline" onClick={() => scrollTo("contact")}>
            ✉️ {t("hero.cta_contact")}
          </button>
          <a
            href={`/cv-mohammed-elmanssouri-${lang}.pdf`}
            download
            className="btn btn--outline"
          >
            📄 {t("hero.cta_download")}
          </a>
        </div>

        {/* Stats row */}
        <div style={{ display: "flex", gap: "48px", marginTop: "60px", flexWrap: "wrap" }}>
          {[
            ["1+", t("hero.stats.study")],
            ["10+", t("hero.stats.tech")],
            ["2",   t("hero.stats.project")],
          ].map(([num, label]) => (
            <div key={label}>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "36px",
                  fontWeight: 700,
                  color: "var(--accent)",
                  lineHeight: 1,
                  marginBottom: "6px",
                }}
              >
                {num}
              </div>
              <div
                style={{
                  fontSize: "12px",
                  color: "var(--text2)",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}
              >
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

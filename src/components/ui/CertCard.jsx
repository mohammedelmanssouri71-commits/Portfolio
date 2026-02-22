import { useI18n } from "../../i18n";

export function CertCard({ cert, index }) {
  const { t, lang } = useI18n();
  const title = lang === "fr" ? cert.title : cert.title_en;

  return (
    <div
      className={`card fade-in delay-${Math.min(index, 3)}`}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "20px",
      }}
    >
      <div style={{ fontSize: "38px", flexShrink: 0 }}>{cert.icon}</div>

      <div style={{ flex: 1 }}>
        <h3 style={{ fontWeight: 800, fontSize: "16px", marginBottom: "4px" }}>{title}</h3>
        <p style={{ color: "var(--text2)", fontSize: "13px" }}>{cert.issuer}</p>
      </div>

      <div style={{ textAlign: "right", flexShrink: 0 }}>
        <span className="chip">{cert.date}</span>
        {cert.link && (
          <div style={{ marginTop: "8px" }}>
            <a
              href={cert.link}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "var(--accent)",
                fontSize: "12px",
                textDecoration: "none",
                fontWeight: 700,
                fontFamily: "var(--font-mono)",
              }}
            >
              {t("certifications.view")} →
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

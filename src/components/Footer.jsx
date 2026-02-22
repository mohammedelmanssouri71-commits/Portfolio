import { useI18n } from "../i18n";

const SOCIAL_LINKS = [
  { icon: <i class="fa-brands fa-github"></i>, label: "GitHub",   href: "https://github.com/mohammedelmanssouri71-commits/" },
  { icon: <i class="fa-brands fa-linkedin"></i>, label: "LinkedIn", href: "https://linkedin.com" },
  { icon: <i class="fa-regular fa-envelope"></i>, label: "Email",    href: "mailto:mohammedelmanssouri71@gmail.com" },
];

export function Footer() {
  const { t } = useI18n();

  return (
    <footer
      style={{
        background: "var(--bg2)",
        borderTop: "1px solid var(--border)",
        padding: "40px clamp(16px, 6vw, 80px)",
      }}
    >
      <div
        style={{
          maxWidth: "920px",
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "28px",
        }}
      >
        {/* Left */}
        <div>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontWeight: 800,
              fontSize: "20px",
              marginBottom: "8px",
            }}
          >
            <span style={{ color: "var(--accent)" }}>M</span>OHAMMED
          </div>
          <p style={{ color: "var(--text2)", fontSize: "13px", lineHeight: 1.8 }}>
            © {new Date().getFullYear()} Mohammed El-Manssouri.{" "}
            {t("footer.rights")}
          </p>
          <p style={{ color: "var(--text2)", fontSize: "13px" }}>
            {t("footer.made_with")} ❤️
          </p>
        </div>

        {/* Social icons */}
        <div style={{ display: "flex", gap: "8px" }}>
          {SOCIAL_LINKS.map(({ icon, label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              title={label}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "4px",
                color: "var(--text2)",
                textDecoration: "none",
                fontSize: "12px",
                fontWeight: 600,
                padding: "10px 14px",
                borderRadius: "var(--radius-sm)",
                border: "1px solid var(--border)",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--accent)";
                e.currentTarget.style.borderColor = "var(--accent)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--text2)";
                e.currentTarget.style.borderColor = "var(--border)";
              }}
            >
              <span style={{ fontSize: "20px" }}>{icon}</span>
              {label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

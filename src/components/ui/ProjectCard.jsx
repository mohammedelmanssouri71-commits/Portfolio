import { useI18n } from "../../i18n";

export function ProjectCard({ project }) {
  const { t, lang } = useI18n();

  const title       = lang === "fr" ? project.title       : project.title_en;
  const description = lang === "fr" ? project.description : project.description_en;

  return (
    <div
      className="card"
      style={{ overflow: "hidden", padding: 0, borderRadius: "var(--radius-lg)" }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = project.accentColor;
        e.currentTarget.style.boxShadow = `0 16px 48px ${project.accentColor}22`;
        e.currentTarget.style.transform = "translateY(-6px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--border)";
        e.currentTarget.style.boxShadow = "none";
        e.currentTarget.style.transform = "none";
      }}
    >
      {/* Color strip */}
      <div
        style={{
          height: "4px",
          background: `linear-gradient(90deg, ${project.accentColor}, var(--accent2))`,
        }}
      />

      <div style={{ padding: "28px" }}>
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: "12px",
            marginBottom: "14px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{ fontSize: "28px" }}>{project.icon}</span>
            <h3 style={{ fontWeight: 800, fontSize: "17px", lineHeight: 1.3 }}>{title}</h3>
          </div>
          {project.inProgress && (
            <span className="chip" style={{ flexShrink: 0 }}>
              {t("projects.in_progress")}
            </span>
          )}
        </div>

        {/* Description */}
        <p
          style={{
            color: "var(--text2)",
            lineHeight: 1.75,
            fontSize: "14px",
            marginBottom: "20px",
          }}
        >
          {description}
        </p>

        {/* Tech chips */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "24px" }}>
          {project.tech.map((tech) => (
            <span key={tech} className="chip chip--purple">
              {tech}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--outline btn--sm"
            >
              <i class="fa-brands fa-github"></i> {t("projects.github")}
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--primary btn--sm"
            >
              🔗 {t("projects.demo")}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

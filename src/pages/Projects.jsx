import { useRef } from "react";
import { useI18n } from "../i18n";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import { ProjectCard } from "../components/ui/ProjectCard";
import { projectsData } from "../data/projects";

export function Projects() {
  const { t } = useI18n();
  const ref     = useRef(null);
  const visible = useIntersectionObserver(ref);

  return (
    <section id="projects" className="section-wrapper">
      <div ref={ref} className="container">
        <div className={`fade-in ${visible ? "visible" : ""}`}>
          <p className="section-index">{t("projects.section_index")}</p>
          <h2 className="section-title">{t("projects.title")}</h2>
          <p className="section-subtitle">{t("projects.subtitle")}</p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px" }}>
            {projectsData.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}

            {/* GitHub CTA card */}
            <div
              className="card"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "16px",
                minHeight: "220px",
                textAlign: "center",
              }}
            >
              <span style={{ fontSize: "48px", animation: "float 3s ease-in-out infinite" }}><i class="fa-brands fa-github"></i></span>
              <h3 style={{ fontWeight: 800, fontSize: "18px" }}>{t("projects.github_cta_title")}</h3>
              <p style={{ color: "var(--text2)", fontSize: "14px" }}>{t("projects.github_cta_sub")}</p>
              <a
                href="https://github.com/mohammedelmanssouri71-commits/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--primary btn--sm"
              >
                {t("projects.github_cta_btn")}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

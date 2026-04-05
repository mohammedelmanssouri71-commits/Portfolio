import { useI18n } from "../i18n";
import { AnimatedSection } from "../components/animations/AnimatedSection";
import { RevealText } from "../components/animations/RevealText";
import { TiltCard } from "../components/animations/TiltCard";
import { MagneticButton } from "../components/animations/MagneticButton";
import { projectsData } from "../data/projects";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { Github } from "../components/ui/BrandIcons";

/* ══════════════════════════════════════════════════════════════════
   PROJECTS — Immersive 3D Tilt Cards
   - TiltCard wrapping each project (3D rotateX/Y ±15deg)
   - Glowing rotating conic-gradient border on hover
   - Inner parallax on card elements
   - GitHub CTA card
   ══════════════════════════════════════════════════════════════════ */

const cardEntranceVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
      delay: i * 0.15,
    },
  }),
};

function ProjectCard({ project, index }) {
  const { t, lang } = useI18n();

  const title = lang === "fr" ? project.title : project.title_en;
  const description =
    lang === "fr" ? project.description : project.description_en;

  return (
    <motion.div
      variants={cardEntranceVariants}
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <TiltCard>
        {/* Color strip */}
        <div
          style={{
            height: "3px",
            background: `linear-gradient(90deg, ${project.accentColor}, var(--accent))`,
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
              marginBottom: "16px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <span style={{ fontSize: "28px" }}>{project.icon}</span>
              <h3
                style={{
                  fontWeight: 800,
                  fontSize: "17px",
                  lineHeight: 1.3,
                  fontFamily: "var(--font-display)",
                }}
              >
                {title}
              </h3>
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
              fontFamily: "var(--font-body)",
            }}
          >
            {description}
          </p>

          {/* Tech chips */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "8px",
              marginBottom: "24px",
            }}
          >
            {project.tech.map((tech) => (
              <span key={tech} className="chip chip--purple">
                {tech}
              </span>
            ))}
          </div>

          {/* Actions */}
          <div
            style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}
          >
            {project.github && (
              <MagneticButton
                as="a"
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--outline btn--sm"
              >
                <Github size={14} /> {t("projects.github")}
              </MagneticButton>
            )}
            {project.demo && (
              <MagneticButton
                as="a"
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--primary btn--sm"
              >
                <ExternalLink size={14} /> {t("projects.demo")}
              </MagneticButton>
            )}
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
}

export function Projects() {
  const { t } = useI18n();

  return (
    <section id="projects" className="section-wrapper">
      <div className="container">
        <AnimatedSection>
          <p className="section-index">{t("projects.section_index")}</p>
          <RevealText as="h2" className="section-title">
            {t("projects.title")}
          </RevealText>
          <RevealText
            as="p"
            className="section-subtitle"
            wordByWord
            delay={0.2}
          >
            {t("projects.subtitle")}
          </RevealText>
        </AnimatedSection>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "24px",
          }}
        >
          {projectsData.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}

          {/* GitHub CTA card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              delay: projectsData.length * 0.15,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            <TiltCard>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "16px",
                  minHeight: "220px",
                  textAlign: "center",
                  padding: "28px",
                }}
              >
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Github size={48} color="var(--text2)" />
                </motion.div>
                <h3
                  style={{
                    fontWeight: 800,
                    fontSize: "18px",
                    fontFamily: "var(--font-display)",
                  }}
                >
                  {t("projects.github_cta_title")}
                </h3>
                <p
                  style={{
                    color: "var(--text2)",
                    fontSize: "14px",
                  }}
                >
                  {t("projects.github_cta_sub")}
                </p>
                <MagneticButton
                  as="a"
                  href="https://github.com/mohammedelmanssouri71-commits/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--primary btn--sm"
                >
                  <Github size={14} /> {t("projects.github_cta_btn")}
                </MagneticButton>
              </div>
            </TiltCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

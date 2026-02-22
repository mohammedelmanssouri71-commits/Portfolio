import { useRef, useState } from "react";
import { useI18n } from "../i18n";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import { SkillBar } from "../components/ui/SkillBar";
import { skillsData } from "../data/skills";

export function Skills() {
  const { t } = useI18n();
  const ref     = useRef(null);
  const visible = useIntersectionObserver(ref);
  const [activeCategory, setActiveCategory] = useState("languages");

  const currentCat = skillsData.find((c) => c.category === activeCategory);
  const allSkills  = skillsData.flatMap((c) => c.skills);

  return (
    <section id="skills" className="section-wrapper section-wrapper--alt">
      <div ref={ref} className="container">
        <div className={`fade-in ${visible ? "visible" : ""}`}>
          <p className="section-index">{t("skills.section_index")}</p>
          <h2 className="section-title">{t("skills.title")}</h2>
          <p className="section-subtitle">{t("skills.subtitle")}</p>

          {/* Category tabs */}
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "32px" }}>
            {skillsData.map((cat) => (
              <button
                key={cat.category}
                className={`cat-btn ${activeCategory === cat.category ? "active" : ""}`}
                onClick={() => setActiveCategory(cat.category)}
              >
                {t(`skills.categories.${cat.category}`)}
              </button>
            ))}
          </div>

          {/* Skill bars */}
          <div className="card" style={{ marginBottom: "28px" }}>
            {currentCat?.skills.map((skill, i) => (
              <SkillBar
                key={skill.name}
                skill={skill}
                isVisible={visible}
                delay={i * 90}
              />
            ))}
          </div>

          {/* All tech chips */}
          <div>
            <p
              style={{
                color: "var(--text2)",
                fontSize: "11px",
                fontWeight: 700,
                fontFamily: "var(--font-mono)",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                marginBottom: "14px",
              }}
            >
              {t("skills.all_label")}
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {allSkills.map((skill) => (
                <span key={skill.name} className="chip">
                  <img src={skill.icon} alt={skill.name}/>
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

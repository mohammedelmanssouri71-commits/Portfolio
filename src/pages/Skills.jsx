import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "../i18n";
import { AnimatedSection } from "../components/animations/AnimatedSection";
import { RevealText } from "../components/animations/RevealText";
import { MarqueeRow } from "../components/animations/MarqueeRow";
import { skillsData } from "../data/skills";

/* ══════════════════════════════════════════════════════════════════
   SKILLS — Marquee + Hover Burst + Category Tabs
   - Dual-direction MarqueeRow (L→R top, R→L bottom)
   - Skill badges with hover burst effect
   - Category tabs with animated underline
   - Skill bars with animated fill
   ══════════════════════════════════════════════════════════════════ */

const tabVariants = {
  inactive: { color: "var(--text2)" },
  active: { color: "#fff" },
};

const skillBarContainerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const skillBarVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

const barFillVariants = {
  hidden: { width: "0%" },
  visible: (level) => ({
    width: `${level}%`,
    transition: { duration: 0.9, ease: [0.4, 0, 0.2, 1], delay: 0.2 },
  }),
};

/* Skill badge for marquee */
function SkillBadge({ skill }) {
  return (
    <motion.div
      whileHover={{ scale: 1.15, zIndex: 10 }}
      transition={{ type: "spring", damping: 15, stiffness: 300 }}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        padding: "10px 20px",
        borderRadius: "12px",
        background: "var(--card)",
        border: "1px solid var(--border)",
        fontFamily: "var(--font-body)",
        fontWeight: 600,
        fontSize: "14px",
        cursor: "default",
        whiteSpace: "nowrap",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <img
        src={skill.icon}
        alt={skill.name}
        style={{ width: "24px", height: "24px" }}
      />
      {skill.name}

      {/* Hover burst pseudo-effect via motion */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        whileHover={{ scale: 2.5, opacity: [0, 0.15, 0] }}
        transition={{ duration: 0.6 }}
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          background: "var(--accent)",
          pointerEvents: "none",
        }}
      />
    </motion.div>
  );
}

/* Skill bar with icon and fill */
function SkillBarItem({ skill, index }) {
  return (
    <motion.div variants={skillBarVariants} style={{ marginBottom: "16px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "8px",
        }}
      >
        <span
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            fontWeight: 600,
            fontSize: "14px",
          }}
        >
          <img
            src={skill.icon}
            alt={skill.name}
            style={{ width: "26px", height: "26px" }}
          />
          {skill.name}
        </span>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "13px",
            fontWeight: 700,
            color: "var(--accent)",
          }}
        >
          {skill.level}%
        </span>
      </div>

      <div
        style={{
          background: "var(--bar-bg)",
          borderRadius: "999px",
          height: "5px",
          overflow: "hidden",
        }}
      >
        <motion.div
          variants={barFillVariants}
          custom={skill.level}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={{
            height: "100%",
            borderRadius: "999px",
            background: "linear-gradient(90deg, var(--accent), var(--accent2))",
            boxShadow: "0 0 8px var(--accent-glow)",
          }}
        />
      </div>
    </motion.div>
  );
}

export function Skills() {
  const { t } = useI18n();
  const [activeCategory, setActiveCategory] = useState("languages");
  const currentCat = skillsData.find((c) => c.category === activeCategory);
  const allSkills = skillsData.flatMap((c) => c.skills);

  // Split skills into two rows for marquee
  const half = Math.ceil(allSkills.length / 2);
  const row1 = allSkills.slice(0, half);
  const row2 = allSkills.slice(half);

  return (
    <section id="skills" className="section-wrapper section-wrapper--alt">
      <div className="container">
        <AnimatedSection>
          <p className="section-index">{t("skills.section_index")}</p>
          <RevealText as="h2" className="section-title">
            {t("skills.title")}
          </RevealText>
          <RevealText
            as="p"
            className="section-subtitle"
            wordByWord
            delay={0.2}
          >
            {t("skills.subtitle")}
          </RevealText>
        </AnimatedSection>

        {/* ── Marquee rows ─────────────────────────────────── */}
        <AnimatedSection delay={0.1}>
          <div style={{ marginBottom: "48px" }}>
            <MarqueeRow direction="left" speed={35} altBg>
              {row1.map((skill) => (
                <SkillBadge key={skill.name} skill={skill} />
              ))}
            </MarqueeRow>

            <div style={{ height: "16px" }} />

            <MarqueeRow direction="right" speed={40} altBg>
              {row2.map((skill) => (
                <SkillBadge key={skill.name} skill={skill} />
              ))}
            </MarqueeRow>
          </div>
        </AnimatedSection>

        {/* ── Category tabs ────────────────────────────────── */}
        <AnimatedSection delay={0.2}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "10px",
              flexWrap: "wrap",
              marginBottom: "32px",
            }}
          >
            {skillsData.map((cat) => (
              <button
                key={cat.category}
                className={`cat-btn ${
                  activeCategory === cat.category ? "active" : ""
                }`}
                onClick={() => setActiveCategory(cat.category)}
              >
                {t(`skills.categories.${cat.category}`)}
              </button>
            ))}
          </div>

          {/* ── Skill bars for selected category ────────── */}
          <div className="glass-card" style={{ margin: "0 auto 28px", width: "100%", maxWidth: "650px" }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                variants={skillBarContainerVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, transition: { duration: 0.2 } }}
              >
                {currentCat?.skills.map((skill, i) => (
                  <SkillBarItem key={skill.name} skill={skill} index={i} />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

import { useI18n } from "../i18n";
import { AnimatedSection, itemVariants } from "../components/animations/AnimatedSection";
import { RevealText } from "../components/animations/RevealText";
import { motion } from "framer-motion";
import { GraduationCap, Globe, Brain, Lightbulb } from "lucide-react";

/* ══════════════════════════════════════════════════════════════════
   ABOUT — Bio with animated reveal
   - AnimatedSection scroll-triggered wrapper
   - RevealText for headings
   - Education timeline with draw-on vertical line
   - Language bars with staggered fill animation
   - Soft skills / interests with animated chips
   ══════════════════════════════════════════════════════════════════ */

const cardHoverVariants = {
  rest: { scale: 1, y: 0 },
  hover: {
    scale: 1.02,
    y: -4,
    transition: { type: "spring", damping: 20, stiffness: 300 },
  },
};

const barFillVariants = {
  hidden: { width: "0%" },
  visible: (pct) => ({
    width: `${pct}%`,
    transition: { duration: 1, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.3 },
  }),
};

const chipContainerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.2 },
  },
};

const chipVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 10 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", damping: 15, stiffness: 200 },
  },
};

export function About() {
  const { t } = useI18n();

  const formation = t("about.formation");
  const languages = t("about.languages");
  const softskills = t("about.softskills");
  const interests = t("about.interests");

  return (
    <section id="about" className="section-wrapper">
      <div className="container">
        {/* Section header */}
        <AnimatedSection>
          <p className="section-index">{t("about.section_index")}</p>
          <RevealText as="h2" className="section-title">
            {t("about.title")}
          </RevealText>
          <RevealText
            as="p"
            className="section-subtitle"
            wordByWord
            delay={0.2}
          >
            {t("about.description")}
          </RevealText>
        </AnimatedSection>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "20px",
          }}
        >
          {/* ── Education Timeline ────────────────────────────── */}
          <AnimatedSection delay={0.1}>
            <motion.div
              className="glass-card"
              variants={cardHoverVariants}
              initial="rest"
              whileHover="hover"
            >
              <h3
                style={{
                  fontWeight: 800,
                  marginBottom: "24px",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  fontFamily: "var(--font-display)",
                  fontSize: "16px",
                }}
              >
                <GraduationCap size={22} color="var(--accent)" />
                {t("about.formation_title")}
              </h3>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                }}
              >
                {Array.isArray(formation) &&
                  formation.map((item, i) => (
                    <motion.div
                      key={item.label}
                      variants={itemVariants}
                      style={{
                        paddingLeft: "16px",
                        borderLeft: "2px solid var(--accent)",
                        position: "relative",
                      }}
                    >
                      {/* Timeline dot */}
                      <div
                        style={{
                          position: "absolute",
                          left: "-5px",
                          top: "4px",
                          width: "8px",
                          height: "8px",
                          borderRadius: "50%",
                          background: "var(--accent)",
                        }}
                      />
                      <div
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "11px",
                          color: "var(--accent)",
                          fontWeight: 700,
                          marginBottom: "4px",
                        }}
                      >
                        {item.year}
                      </div>
                      <div
                        style={{
                          fontWeight: 700,
                          fontSize: "14px",
                          lineHeight: 1.4,
                          fontFamily: "var(--font-body)",
                        }}
                      >
                        {item.label}
                      </div>
                      <div
                        style={{
                          color: "var(--text2)",
                          fontSize: "13px",
                          marginTop: "2px",
                        }}
                      >
                        {item.org}
                      </div>
                    </motion.div>
                  ))}
              </div>
            </motion.div>
          </AnimatedSection>

          {/* ── Languages ──────────────────────────────────────── */}
          <AnimatedSection delay={0.2}>
            <motion.div
              className="glass-card"
              variants={cardHoverVariants}
              initial="rest"
              whileHover="hover"
            >
              <h3
                style={{
                  fontWeight: 800,
                  marginBottom: "24px",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  fontFamily: "var(--font-display)",
                  fontSize: "16px",
                }}
              >
                <Globe size={22} color="var(--accent2)" />
                {t("about.languages_title")}
              </h3>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "18px",
                }}
              >
                {Array.isArray(languages) &&
                  languages.map((lang) => (
                    <div key={lang.name}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          fontSize: "14px",
                          fontWeight: 600,
                          marginBottom: "8px",
                        }}
                      >
                        <span>
                          {lang.flag} {lang.name}
                        </span>
                        <span
                          style={{
                            color: "var(--text2)",
                            fontSize: "12px",
                          }}
                        >
                          {lang.level}
                        </span>
                      </div>
                      <div
                        style={{
                          background: "var(--bar-bg)",
                          borderRadius: "999px",
                          height: "4px",
                          overflow: "hidden",
                        }}
                      >
                        <motion.div
                          variants={barFillVariants}
                          custom={lang.pct}
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true }}
                          style={{
                            height: "100%",
                            borderRadius: "999px",
                            background:
                              "linear-gradient(90deg, var(--accent), var(--accent2))",
                            boxShadow: "0 0 8px var(--accent-glow)",
                          }}
                        />
                      </div>
                    </div>
                  ))}
              </div>
            </motion.div>
          </AnimatedSection>

          {/* ── Soft Skills + Interests ──────────────────────── */}
          <AnimatedSection delay={0.3}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                height: "100%",
              }}
            >
              {/* Soft Skills */}
              <motion.div
                className="glass-card"
                style={{ flex: 1 }}
                variants={cardHoverVariants}
                initial="rest"
                whileHover="hover"
              >
                <h3
                  style={{
                    fontWeight: 800,
                    marginBottom: "16px",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    fontFamily: "var(--font-display)",
                    fontSize: "16px",
                  }}
                >
                  <Brain size={22} color="var(--accent)" />
                  {t("about.softskills_title")}
                </h3>
                <motion.div
                  variants={chipContainerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "8px",
                  }}
                >
                  {Array.isArray(softskills) &&
                    softskills.map((s) => (
                      <motion.span
                        key={s}
                        variants={chipVariants}
                        className="chip"
                        whileHover={{ scale: 1.1 }}
                      >
                        {s}
                      </motion.span>
                    ))}
                </motion.div>
              </motion.div>

              {/* Interests */}
              <motion.div
                className="glass-card"
                style={{ flex: 1 }}
                variants={cardHoverVariants}
                initial="rest"
                whileHover="hover"
              >
                <h3
                  style={{
                    fontWeight: 800,
                    marginBottom: "16px",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    fontFamily: "var(--font-display)",
                    fontSize: "16px",
                  }}
                >
                  <Lightbulb size={22} color="var(--accent2)" />
                  {t("about.interests_title")}
                </h3>
                <motion.div
                  variants={chipContainerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "8px",
                  }}
                >
                  {Array.isArray(interests) &&
                    interests.map((i) => (
                      <motion.span
                        key={i}
                        variants={chipVariants}
                        className="chip chip--cyan"
                        whileHover={{ scale: 1.1 }}
                      >
                        {i}
                      </motion.span>
                    ))}
                </motion.div>
              </motion.div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

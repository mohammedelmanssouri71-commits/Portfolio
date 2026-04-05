import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useI18n } from "../i18n";
import { AnimatedSection } from "../components/animations/AnimatedSection";
import { RevealText } from "../components/animations/RevealText";
import { certificationsData } from "../data/certifications";

const entryLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { type: "spring", damping: 15, stiffness: 100 } },
};

const entryRight = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { type: "spring", damping: 15, stiffness: 100 } },
};

function TimelineEntry({ cert, index }) {
  const { t, lang } = useI18n();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const title = lang === "fr" ? cert.title : cert.title_en;
  const variants = index % 2 === 0 ? entryLeft : entryRight;

  return (
    <div ref={ref} style={{ position: "relative", paddingLeft: "52px", paddingBottom: "40px" }}>
      <div className="timeline-dot" style={{ top: "6px" }}>
        {isInView && (
          <motion.div
            initial={{ scale: 1, opacity: 0.6 }}
            animate={{ scale: 2.5, opacity: 0 }}
            transition={{ duration: 1.5, repeat: Infinity }}
            style={{ position: "absolute", inset: "-4px", borderRadius: "50%", border: "2px solid var(--accent)" }}
          />
        )}
      </div>
      <motion.div variants={variants} initial="hidden" animate={isInView ? "visible" : "hidden"} className="glass-card" style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <div style={{ fontSize: "38px", flexShrink: 0 }}>{cert.icon}</div>
        <div style={{ flex: 1 }}>
          <h3 style={{ fontWeight: 800, fontSize: "16px", marginBottom: "4px", fontFamily: "var(--font-display)" }}>{title}</h3>
          <p style={{ color: "var(--text2)", fontSize: "13px" }}>{cert.issuer}</p>
        </div>
        <div style={{ textAlign: "right", flexShrink: 0 }}>
          <span className="chip">{cert.date}</span>
          {cert.link && (
            <div style={{ marginTop: "8px" }}>
              <a href={cert.link} target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent)", fontSize: "12px", textDecoration: "none", fontWeight: 700, fontFamily: "var(--font-mono)" }}>
                {t("certifications.view")} →
              </a>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export function Certifications() {
  const { t } = useI18n();
  const timelineRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: timelineRef, offset: ["start 0.8", "end 0.5"] });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="certifications" className="section-wrapper section-wrapper--alt">
      <div className="container">
        <AnimatedSection>
          <RevealText as="h2" className="section-title">
            {t("certifications.title")}
          </RevealText>
          <RevealText as="p" className="section-subtitle" wordByWord delay={0.2}>{t("certifications.subtitle")}</RevealText>
        </AnimatedSection>
        <div ref={timelineRef} style={{ position: "relative" }}>
          <motion.div className="timeline-line" style={{ scaleY, transformOrigin: "top", background: "linear-gradient(180deg, var(--accent), var(--accent2))" }} />
          <div className="timeline-line" style={{ background: "var(--border)", zIndex: 0 }} />
          {certificationsData.map((cert, i) => (
            <TimelineEntry key={cert.id} cert={cert} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

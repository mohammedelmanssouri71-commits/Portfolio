import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useI18n } from "../i18n";
import { TypewriterText } from "../components/ui/TypewriterText";
import { FloatingParticles } from "../components/animations/FloatingParticles";
import { MagneticButton } from "../components/animations/MagneticButton";
import { Rocket, Mail, Download } from "lucide-react";

/* ══════════════════════════════════════════════════════════════════
   HERO — Cinematic Entrance
   - Letter-by-letter name reveal (stagger 0.05, spring from y:100, rotateX:90)
   - TypewriterText on subtitle/tagline
   - Breathing gradient mesh background
   - FloatingParticles ambient shapes
   - CTA buttons with blur-to-sharp entrance
   - Parallax scroll at 0.3x speed
   ══════════════════════════════════════════════════════════════════ */

/* ── Animation Variants (defined as CONSTANTS outside component) ── */

const letterContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const letterVariants = {
  hidden: {
    y: 100,
    opacity: 0,
    rotateX: 90,
  },
  visible: {
    y: 0,
    opacity: 1,
    rotateX: 0,
    transition: {
      type: "spring",
      damping: 12,
      stiffness: 100,
    },
  },
};

const ctaContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 1.6,
    },
  },
};

const ctaVariants = {
  hidden: { opacity: 0, filter: "blur(8px)", y: 20 },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const statsContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 2.0,
    },
  },
};

const statVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const greetingVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: 0.3, ease: "easeOut" },
  },
};

const roleVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: 1.0, ease: "easeOut" },
  },
};

const subtitleVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: 1.3, ease: "easeOut" },
  },
};

const badgeVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, delay: 0.1, ease: "easeOut" },
  },
};

/* ── Animated Counter Hook ───────────────────────────────────── */
function AnimatedCounter({ value, suffix = "" }) {
  const numericPart = parseInt(value, 10);
  const textPart = value.replace(/[0-9]/g, "");

  return (
    <span>
      {isNaN(numericPart) ? value : numericPart}
      {textPart}
      {suffix}
    </span>
  );
}

/* ── Split text into individual letters ────────────────────── */
function SplitLetters({ text, className = "", style = {} }) {
  return (
    <motion.span
      variants={letterContainerVariants}
      className={className}
      style={{ display: "inline-flex", whiteSpace: "nowrap", ...style }}
    >
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          variants={letterVariants}
          style={{
            display: "inline-block",
            transformOrigin: "bottom",
            willChange: "transform",
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.span>
  );
}

export function Hero() {
  const { t, lang } = useI18n();
  const sectionRef = useRef(null);

  /* Parallax: title scrolls at 0.3x speed */
  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 500], [0, 150]);

  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="hero"
      ref={sectionRef}
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        padding: "80px clamp(20px, 6vw, 80px) 40px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* ── Breathing gradient mesh background ──────────────── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 20% 50%, rgba(99,102,241,0.08) 0%, transparent 50%), " +
            "radial-gradient(ellipse at 80% 20%, rgba(34,211,238,0.06) 0%, transparent 50%), " +
            "radial-gradient(ellipse at 50% 80%, rgba(99,102,241,0.04) 0%, transparent 50%)",
          backgroundSize: "200% 200%",
          animation: "gradient-breathe 15s ease infinite",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* ── Floating particles ─────────────────────────────── */}
      <FloatingParticles count={15} />

      {/* ── Content ────────────────────────────────────────── */}
      <motion.div
        initial="hidden"
        animate="visible"
        style={{
          maxWidth: "960px",
          margin: "0 auto",
          width: "100%",
          position: "relative",
          zIndex: 1,
          y: parallaxY,
        }}
      >
        {/* Available badge */}
        <motion.div
          variants={badgeVariants}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginBottom: "28px",
          }}
        >
          <span className="glow-dot" />
          <span
            style={{
              color: "#22C55E",
              fontFamily: "var(--font-mono)",
              fontSize: "13px",
              fontWeight: 700,
              letterSpacing: "0.05em",
            }}
          >
            {t("hero.available")}
          </span>
        </motion.div>

        {/* Greeting */}
        <motion.p
          variants={greetingVariants}
          style={{
            color: "var(--text2)",
            fontSize: "18px",
            fontWeight: 600,
            marginBottom: "8px",
            fontFamily: "var(--font-body)",
          }}
        >
          {t("hero.greeting")}
        </motion.p>

        {/* Name — Cinematic letter-by-letter reveal */}
        <motion.h1
          variants={letterContainerVariants}
          style={{
            fontSize: "clamp(36px, 6.5vw, 88px)",
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            marginBottom: "16px",
            fontFamily: "var(--font-display)",
            perspective: "600px",
            display: "flex",
            flexWrap: "wrap",
            columnGap: "16px",
          }}
        >
          <SplitLetters text="Mohammed" />
          <motion.span
            variants={letterContainerVariants}
            style={{
              display: "inline-flex",
              background: "linear-gradient(135deg, var(--accent), var(--accent2))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            <SplitLetters text="El-Manssouri" />
          </motion.span>
        </motion.h1>

        {/* Animated role — typewriter effect */}
        <motion.h2
          variants={roleVariants}
          style={{
            fontSize: "clamp(20px, 3vw, 34px)",
            fontWeight: 700,
            color: "var(--text2)",
            marginBottom: "24px",
            minHeight: "44px",
            fontFamily: "var(--font-display)",
          }}
        >
          <TypewriterText texts={t("hero.roles")} />
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          variants={subtitleVariants}
          style={{
            fontSize: "17px",
            lineHeight: 1.8,
            color: "var(--text2)",
            maxWidth: "540px",
            marginBottom: "44px",
            fontFamily: "var(--font-body)",
          }}
        >
          {t("hero.subtitle")}
        </motion.p>

        {/* CTAs — blur-to-sharp entrance */}
        <motion.div
          variants={ctaContainerVariants}
          style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}
        >
          <motion.div variants={ctaVariants}>
            <MagneticButton
              className="btn btn--primary"
              onClick={() => scrollTo("projects")}
            >
              <Rocket size={16} /> {t("hero.cta_projects")}
            </MagneticButton>
          </motion.div>
          <motion.div variants={ctaVariants}>
            <MagneticButton
              className="btn btn--outline"
              onClick={() => scrollTo("contact")}
            >
              <Mail size={16} /> {t("hero.cta_contact")}
            </MagneticButton>
          </motion.div>
          <motion.div variants={ctaVariants}>
            <MagneticButton
              as="a"
              href={`/cv-mohammed-elmanssouri-${lang}.pdf`}
              download
              className="btn btn--outline"
            >
              <Download size={16} /> {t("hero.cta_download")}
            </MagneticButton>
          </motion.div>
        </motion.div>

        {/* Stats row */}
        <motion.div
          variants={statsContainerVariants}
          style={{
            display: "flex",
            gap: "48px",
            marginTop: "64px",
            flexWrap: "wrap",
          }}
        >
          {[
            ["1+", t("hero.stats.study")],
            ["10+", t("hero.stats.tech")],
            ["2", t("hero.stats.project")],
          ].map(([num, label]) => (
            <motion.div key={label} variants={statVariants}>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "38px",
                  fontWeight: 700,
                  color: "var(--accent)",
                  lineHeight: 1,
                  marginBottom: "6px",
                }}
              >
                <AnimatedCounter value={num} />
              </div>
              <div
                style={{
                  fontSize: "12px",
                  color: "var(--text2)",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  fontFamily: "var(--font-mono)",
                }}
              >
                {label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

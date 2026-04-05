import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { useI18n } from "../i18n";
import { useTheme } from "../context/ThemeContext";
import { MagneticButton } from "./animations/MagneticButton";
import { Sun, Moon, Menu, X, Globe } from "lucide-react";

const NAV_SECTIONS = ["about", "skills", "projects", "certifications", "contact"];

const navVariants = {
  visible: { y: 0, transition: { type: "spring", damping: 20, stiffness: 200 } },
  hidden: { y: "-100%", transition: { type: "spring", damping: 20, stiffness: 200 } },
};

const mobileMenuVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, staggerChildren: 0.05 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
};

const mobileItemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
};

export function Navbar() {
  const { t, lang, setLang } = useI18n();
  const { dark, toggle } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [activeSection, setActiveSection] = useState("");
  const lastScrollY = useRef(0);

  const { scrollY } = useScroll();

  /* Hide on scroll down, reveal on scroll up */
  useMotionValueEvent(scrollY, "change", (latest) => {
    const direction = latest > lastScrollY.current ? "down" : "up";
    if (direction === "down" && latest > 100) setIsNavVisible(false);
    else setIsNavVisible(true);
    lastScrollY.current = latest;
  });

  /* Track active section via IntersectionObserver */
  useEffect(() => {
    const observers = [];
    NAV_SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { threshold: 0.3 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <>
      <motion.nav
        variants={navVariants}
        animate={isNavVisible ? "visible" : "hidden"}
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 200, height: "64px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "0 clamp(16px, 5vw, 56px)",
          backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
          background: "var(--nav-bg)", borderBottom: "1px solid var(--border)",
        }}
      >
        {/* Logo with hover rotation */}
        <MagneticButton onClick={() => scrollTo("hero")} className="btn--ghost"
          style={{ background: "none", border: "none", fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "18px", color: "var(--text)", padding: "4px 8px" }}>
          <motion.span whileHover={{ rotateZ: 10 }} transition={{ type: "spring", damping: 10, stiffness: 200 }} style={{ display: "inline-block" }}>
            <span style={{ color: "var(--accent)" }}>M</span><span>OHAMMED</span>
          </motion.span>
        </MagneticButton>

        {/* Desktop links with active indicator */}
        <div className="hide-mobile" style={{ display: "flex", gap: "28px", position: "relative" }}>
          {NAV_SECTIONS.map((key) => (
            <button key={key} className={`nav-link ${activeSection === key ? "active" : ""}`} onClick={() => scrollTo(key)} style={{ position: "relative" }}>
              {t(`nav.${key}`)}
              {activeSection === key && (
                <motion.div layoutId="nav-indicator" style={{ position: "absolute", bottom: "-2px", left: 0, right: 0, height: "2px", background: "var(--accent)", borderRadius: "1px" }}
                  transition={{ type: "spring", damping: 20, stiffness: 300 }} />
              )}
            </button>
          ))}
        </div>

        {/* Controls */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <MagneticButton onClick={() => setLang(lang === "fr" ? "en" : "fr")}
            style={{ background: "var(--card)", border: "1.5px solid var(--border)", borderRadius: "8px", padding: "6px 12px", color: "var(--text)", fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: "12px", letterSpacing: "0.05em", display: "flex", alignItems: "center", gap: "4px" }}>
            <Globe size={14} /> {lang === "fr" ? "EN" : "FR"}
          </MagneticButton>

          <MagneticButton onClick={toggle} title={dark ? "Light mode" : "Dark mode"}
            style={{ background: "var(--card)", border: "1.5px solid var(--border)", borderRadius: "8px", width: "36px", height: "36px", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text)" }}>
            <motion.div key={dark ? "sun" : "moon"} initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.3 }}>
              {dark ? <Sun size={16} color="orange" /> : <Moon size={16} />}
            </motion.div>
          </MagneticButton>

          <button className="hide-desktop" onClick={() => setMobileOpen((o) => !o)}
            style={{ background: "none", border: "none", color: "var(--text)", padding: "4px", display: "flex", alignItems: "center" }}>
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div variants={mobileMenuVariants} initial="hidden" animate="visible" exit="exit"
            style={{ position: "fixed", top: "64px", left: 0, right: 0, zIndex: 199, background: "var(--bg2)", borderBottom: "1px solid var(--border)", padding: "20px 24px", display: "flex", flexDirection: "column", gap: "16px", backdropFilter: "blur(20px)" }}>
            {NAV_SECTIONS.map((key) => (
              <motion.button key={key} variants={mobileItemVariants} className="nav-link" style={{ fontSize: "16px", textAlign: "left" }} onClick={() => scrollTo(key)}>
                {t(`nav.${key}`)}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

import { motion } from "framer-motion";
import { useI18n } from "../i18n";
import { MagneticButton } from "./animations/MagneticButton";
import { Mail } from "lucide-react";
import { Github, Linkedin } from "./ui/BrandIcons";

const SOCIAL_LINKS = [
  { icon: <Github size={18} />, label: "GitHub", href: "https://github.com/mohammedelmanssouri71-commits/" },
  { icon: <Linkedin size={18} />, label: "LinkedIn", href: "https://linkedin.com/in/mohammed-el-manssouri-21120b33b" },
  { icon: <Mail size={18} />, label: "Email", href: "mailto:mohammedelmanssouri71@gmail.com" },
];

const footerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, staggerChildren: 0.1 } },
};

const itemVariant = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

export function Footer() {
  const { t } = useI18n();

  return (
    <motion.footer
      variants={footerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      style={{
        background: "var(--bg2)", borderTop: "1px solid var(--border)",
        padding: "48px clamp(20px, 6vw, 80px)",
      }}
    >
      <div style={{ maxWidth: "1000px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "28px" }}>
        <motion.div variants={itemVariant}>
          <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "20px", marginBottom: "8px" }}>
            <span style={{ color: "var(--accent)" }}>M</span>OHAMMED
          </div>
          <p style={{ color: "var(--text2)", fontSize: "13px", lineHeight: 1.8 }}>
            © {new Date().getFullYear()} Mohammed El-Manssouri. {t("footer.rights")}
          </p>
          <p style={{ color: "var(--text2)", fontSize: "13px" }}>
            {t("footer.made_with")} ❤️
          </p>
        </motion.div>

        <motion.div variants={itemVariant} style={{ display: "flex", gap: "10px" }}>
          {SOCIAL_LINKS.map(({ icon, label, href }) => (
            <MagneticButton key={label} as="a" href={href} target="_blank" rel="noopener noreferrer" title={label}
              style={{
                display: "flex", flexDirection: "column", alignItems: "center", gap: "4px",
                color: "var(--text2)", textDecoration: "none", fontSize: "12px", fontWeight: 600,
                padding: "10px 14px", borderRadius: "var(--radius-sm)", border: "1px solid var(--border)",
                transition: "all 0.3s ease", background: "transparent",
              }}
            >
              {icon}
              <span>{label}</span>
            </MagneticButton>
          ))}
        </motion.div>
      </div>
    </motion.footer>
  );
}

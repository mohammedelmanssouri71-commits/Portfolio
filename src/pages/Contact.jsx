import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useI18n } from "../i18n";
import { AnimatedSection } from "../components/animations/AnimatedSection";
import { RevealText } from "../components/animations/RevealText";
import { MagneticButton } from "../components/animations/MagneticButton";
import { Send, Mail, Phone, CheckCircle, Loader2 } from "lucide-react";
import whatsappLogo from "../assets/whatsapp.png";
import emailjs from "@emailjs/browser";

const SERVICE_ID = "service_scjga6e";
const TEMPLATE_ID = "template_ruw1dsg";
const PUBLIC_KEY = "GVqjI4UVE1BT2-p0M";
const WHATSAPP_NUMBER = "212613967856";
const COOLDOWN_MS = 60_000;

const fieldVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94], delay: i * 0.1 },
  }),
};

const infoVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i) => ({
    opacity: 1, x: 0,
    transition: { duration: 0.4, delay: 0.5 + i * 0.1 },
  }),
};

export function Contact() {
  const { t } = useI18n();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle");
  const [lastSent, setLastSent] = useState(null);

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (lastSent && Date.now() - lastSent < COOLDOWN_MS) { setStatus("error"); return; }
    setStatus("sending");
    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, { user_name: form.name, user_email: form.email, message: form.message }, PUBLIC_KEY);
      setStatus("sent");
      setLastSent(Date.now());
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 5000);
    } catch (error) {
      console.error("Email error:", error);
      setStatus("error");
    }
  };

  const whatsappMessage = encodeURIComponent("Bonjour Mohammed, j'ai vu votre portfolio et je souhaiterais vous contacter.");
  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`;

  return (
    <section id="contact" className="section-wrapper">
      <div className="container" style={{ maxWidth: "720px" }}>
        <AnimatedSection>
          <p className="section-index">{t("contact.section_index")}</p>
          <RevealText as="h2" className="section-title">{t("contact.title")}</RevealText>
          <RevealText as="p" className="section-subtitle" wordByWord delay={0.2}>{t("contact.subtitle")}</RevealText>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <motion.div variants={fieldVariants} custom={0} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <input className="input" type="text" name="name" placeholder={t("contact.name")} value={form.name} onChange={handleChange} required />
              </motion.div>
              <motion.div variants={fieldVariants} custom={1} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <input className="input" type="email" name="email" placeholder={t("contact.email")} value={form.email} onChange={handleChange} required />
              </motion.div>
            </div>

            <motion.div variants={fieldVariants} custom={2} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <textarea className="input" name="message" placeholder={t("contact.message")} rows={6} value={form.message} onChange={handleChange} required />
            </motion.div>

            {status === "error" && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ color: "#ff6b6b", fontSize: "14px", fontWeight: 600 }}>
                ⚠️ {t("contact.error")}
              </motion.p>
            )}
            {status === "sent" && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ color: "#22C55E", fontSize: "14px", fontWeight: 600, display: "flex", alignItems: "center", gap: "6px" }}>
                <CheckCircle size={16} /> {t("contact.success")}
              </motion.p>
            )}

            <motion.div variants={fieldVariants} custom={3} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <MagneticButton type="submit" className="btn btn--primary" disabled={status === "sending"} style={{ opacity: status === "sending" ? 0.7 : 1 }}>
                {status === "sending" ? (<><Loader2 size={16} style={{ animation: "spin 1s linear infinite" }} /> {t("contact.sending")}</>) : (<><Send size={16} /> {t("contact.send")}</>)}
              </MagneticButton>
            </motion.div>
          </form>

          {/* Contact info */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "24px", marginTop: "40px" }}>
            {[
              [<Mail size={18} />, t("contact.info_email"), `mailto:${t("contact.info_email")}`],
              [<Phone size={18} />, t("contact.info_phone"), `tel:+212613967856`],
            ].map(([icon, label, href], i) => (
              <motion.a
                key={label}
                href={href}
                variants={infoVariants}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={{ color: "var(--accent)", x: 4 }}
                style={{ display: "flex", alignItems: "center", gap: "10px", color: "var(--text2)", textDecoration: "none", fontSize: "14px", fontWeight: 600 }}
              >
                {icon} {label}
              </motion.a>
            ))}
          </div>
        </AnimatedSection>
      </div>

      {/* WhatsApp float */}
      <motion.div className="whatsapp-msg" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
        <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
          <img src={whatsappLogo} alt="whatsapp" style={{ width: "48px", height: "48px" }} />
        </a>
      </motion.div>
    </section>
  );
}

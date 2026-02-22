import { useRef, useState } from "react";
import { useI18n } from "../i18n";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import whatsappLogo from '../assets/whatsapp.png';
import emailjs from "@emailjs/browser";
const SERVICE_ID = "service_scjga6e";
const TEMPLATE_ID = "template_ruw1dsg";
const PUBLIC_KEY = "GVqjI4UVE1BT2-p0M";

const WHATSAPP_NUMBER = "212613967856";
const COOLDOWN_MS     = 60_000; // 60 seconds anti-spam

export function Contact() {
  const { t } = useI18n();
  const ref     = useRef(null);
  const visible = useIntersectionObserver(ref);

  const [form, setForm]       = useState({ name: "", email: "", message: "" });
  const [status, setStatus]   = useState("idle"); // idle | sending | sent | error
  const [lastSent, setLastSent] = useState(null);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
      e.preventDefault();

      // Anti-spam check
      if (lastSent && Date.now() - lastSent < COOLDOWN_MS) {
        setStatus("error");
        return;
      }

      setStatus("sending");

      try {
        await emailjs.send(
          SERVICE_ID,
          TEMPLATE_ID,
          {
            user_name: form.name,
            user_email: form.email,
            message: form.message,
          },
          PUBLIC_KEY
        );

        setStatus("sent");
        setLastSent(Date.now());
        setForm({ name: "", email: "", message: "" });

        setTimeout(() => setStatus("idle"), 5000);
      } catch (error) {
        console.error("Email error:", error);
        setStatus("error");
      }
    };

  const whatsappMessage = encodeURIComponent(
    "Bonjour Mohammed, j'ai vu votre portfolio et je souhaiterais vous contacter."
  );
  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`;

  return (
    <section id="contact" className="section-wrapper">
      <div ref={ref} className="container" style={{ maxWidth: "720px" }}>
        <div className={`fade-in ${visible ? "visible" : ""}`}>
          <p className="section-index">{t("contact.section_index")}</p>
          <h2 className="section-title">{t("contact.title")}</h2>
          <p className="section-subtitle">{t("contact.subtitle")}</p>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <input
                className="input"
                type="text"
                name="name"
                placeholder={t("contact.name")}
                value={form.name}
                onChange={handleChange}
                required
              />
              <input
                className="input"
                type="email"
                name="email"
                placeholder={t("contact.email")}
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <textarea
              className="input"
              name="message"
              placeholder={t("contact.message")}
              rows={6}
              value={form.message}
              onChange={handleChange}
              required
            />

            {/* Status messages */}
            {status === "error" && (
              <p style={{ color: "#ff6b6b", fontSize: "14px", fontWeight: 600 }}>
                ⚠️ {t("contact.error")}
              </p>
            )}
            {status === "sent" && (
              <p style={{ color: "#51cf66", fontSize: "14px", fontWeight: 600 }}>
                ✅ {t("contact.success")}
              </p>
            )}

            {/* Buttons */}
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <button
                type="submit"
                className="btn btn--primary"
                disabled={status === "sending"}
                style={{ opacity: status === "sending" ? 0.7 : 1 }}
              >
                {status === "sending" ? `⏳ ${t("contact.sending")}` : `${t("contact.send")}`}
              </button>
            </div>
          </form>
          {/* Contact info */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "24px", marginTop: "40px" }}>
            {[
              [<i class="fa-solid fa-envelope"></i>, t("contact.info_email"), `mailto:${t("contact.info_email")}`],
              [<i class="fa-solid fa-phone"></i>, t("contact.info_phone"), `tel:+212613967856`],
            ].map(([icon, label, href]) => (
              <a
                key={label}
                href={href}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  color: "var(--text2)",
                  textDecoration: "none",
                  fontSize: "14px",
                  fontWeight: 600,
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text2)")}
              >
                <span style={{ fontSize: "18px" }}>{icon}</span>
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="whatsapp-msg">
        <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
            >
          <img src={whatsappLogo} alt="whatsapp"/>
        </a>
      </div>
    </section>
  );
}

import { useRef } from "react";
import { useI18n } from "../i18n";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";

export function About() {
  const { t } = useI18n();
  const ref     = useRef(null);
  const visible = useIntersectionObserver(ref);

  const formation  = t("about.formation");   // array
  const languages  = t("about.languages");   // array
  const softskills = t("about.softskills");  // array
  const interests  = t("about.interests");   // array

  return (
    <section id="about" className="section-wrapper">
      <div ref={ref} className="container">
        <div className={`fade-in ${visible ? "visible" : ""}`}>
          <p className="section-index">{t("about.section_index")}</p>
          <h2 className="section-title">{t("about.title")}</h2>
          <p className="section-subtitle">{t("about.description")}</p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(270px, 1fr))", gap: "20px" }}>
            {/* Education timeline */}
            <div className="card">
              <h3 style={{ fontWeight: 800, marginBottom: "22px", display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{ fontSize: "22px" }}>🎓</span>
                {t("about.formation_title")}
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                {Array.isArray(formation) && formation.map((item) => (
                  <div
                    key={item.label}
                    style={{ paddingLeft: "14px", borderLeft: "2px solid var(--accent)" }}
                  >
                    <div style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--accent)", fontWeight: 700, marginBottom: "3px" }}>
                      {item.year}
                    </div>
                    <div style={{ fontWeight: 700, fontSize: "14px", lineHeight: 1.3 }}>{item.label}</div>
                    <div style={{ color: "var(--text2)", fontSize: "13px", marginTop: "2px" }}>{item.org}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Languages */}
            <div className="card">
              <h3 style={{ fontWeight: 800, marginBottom: "22px", display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{ fontSize: "22px" }}>🌍</span>
                {t("about.languages_title")}
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {Array.isArray(languages) && languages.map((lang) => (
                  <div key={lang.name}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", fontWeight: 600, marginBottom: "6px" }}>
                      <span>{lang.flag} {lang.name}</span>
                      <span style={{ color: "var(--text2)", fontSize: "12px" }}>{lang.level}</span>
                    </div>
                    <div style={{ background: "var(--bar-bg)", borderRadius: "999px", height: "4px" }}>
                      <div style={{
                        width: visible ? `${lang.pct}%` : "0%",
                        height: "100%",
                        borderRadius: "999px",
                        background: "linear-gradient(90deg, var(--accent), var(--accent2))",
                        transition: "width 1s ease 0.3s",
                      }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Soft skills + interests */}
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div className="card" style={{ flex: 1 }}>
                <h3 style={{ fontWeight: 800, marginBottom: "16px", display: "flex", alignItems: "center", gap: "10px" }}>
                  <span style={{ fontSize: "22px" }}>🧠</span>
                  {t("about.softskills_title")}
                </h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {Array.isArray(softskills) && softskills.map((s) => (
                    <span key={s} className="chip">{s}</span>
                  ))}
                </div>
              </div>

              <div className="card" style={{ flex: 1 }}>
                <h3 style={{ fontWeight: 800, marginBottom: "16px", display: "flex", alignItems: "center", gap: "10px" }}>
                  <span style={{ fontSize: "22px" }}>💡</span>
                  {t("about.interests_title")}
                </h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {Array.isArray(interests) && interests.map((i) => (
                    <span key={i} className="chip chip--purple">{i}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

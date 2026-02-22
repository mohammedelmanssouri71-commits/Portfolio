import { useRef } from "react";
import { useI18n } from "../i18n";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import { CertCard } from "../components/ui/CertCard";
import { certificationsData } from "../data/certifications";

export function Certifications() {
  const { t } = useI18n();
  const ref     = useRef(null);
  const visible = useIntersectionObserver(ref);

  return (
    <section id="certifications" className="section-wrapper section-wrapper--alt">
      <div ref={ref} className="container">
        <div className={`fade-in ${visible ? "visible" : ""}`}>
          <p className="section-index">{t("certifications.section_index")}</p>
          <h2 className="section-title">{t("certifications.title")}</h2>
          <p className="section-subtitle">{t("certifications.subtitle")}</p>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {certificationsData.map((cert, i) => (
              <CertCard key={cert.id} cert={cert} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

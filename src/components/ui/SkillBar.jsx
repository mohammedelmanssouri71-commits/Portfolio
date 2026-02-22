import { AnimatedCounter } from "./AnimatedCounter";

export function SkillBar({ skill, isVisible, delay = 0 }) {
  return (
    <div style={{ marginBottom: "18px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "7px",
        }}
      >
        <span
          style={{
            display: "flex",
            alignItems: "center",
            gap: "9px",
            fontWeight: 700,
            fontSize: "14px",
          }}
        >
          <span style={{ fontSize: "18px" }}><img src={skill.icon} alt={skill.name} style={{
            width: "30px",
            height: "30px"
          }}/></span>
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
          <AnimatedCounter value={skill.level} isVisible={isVisible} suffix="%" />
        </span>
      </div>

      {/* Track */}
      <div
        style={{
          background: "var(--bar-bg)",
          borderRadius: "999px",
          height: "5px",
          overflow: "hidden",
        }}
      >
        {/* Fill */}
        <div
          style={{
            height: "100%",
            borderRadius: "999px",
            background: "linear-gradient(90deg, var(--accent), var(--accent2))",
            width: isVisible ? `${skill.level}%` : "0%",
            transition: `width 0.9s cubic-bezier(0.4, 0, 0.2, 1) ${delay}ms`,
            boxShadow: "0 0 8px var(--accent-glow)",
          }}
        />
      </div>
    </div>
  );
}

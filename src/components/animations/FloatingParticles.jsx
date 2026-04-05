import { useMemo } from "react";
import { motion } from "framer-motion";

/* ──────────────────────────────────────────────────────────────────
   FloatingParticles — Geometric shapes drifting in the background
   Uses Framer Motion's animate with random x/y keyframes for
   organic, ambient movement. Purely decorative.
   ────────────────────────────────────────────────────────────────── */

const SHAPES = ["circle", "square", "triangle"];

function generateParticles(count) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    shape: SHAPES[i % SHAPES.length],
    size: 4 + Math.random() * 12,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: 15 + Math.random() * 20,
    delay: Math.random() * 5,
    opacity: 0.06 + Math.random() * 0.12,
  }));
}

function ShapeElement({ shape, size, opacity }) {
  const baseStyle = {
    width: size,
    height: size,
    opacity,
    position: "absolute",
  };

  switch (shape) {
    case "circle":
      return (
        <div
          style={{
            ...baseStyle,
            borderRadius: "50%",
            background: "var(--accent)",
          }}
        />
      );
    case "square":
      return (
        <div
          style={{
            ...baseStyle,
            borderRadius: "2px",
            background: "var(--accent2)",
            transform: "rotate(45deg)",
          }}
        />
      );
    case "triangle":
      return (
        <div
          style={{
            ...baseStyle,
            width: 0,
            height: 0,
            borderLeft: `${size / 2}px solid transparent`,
            borderRight: `${size / 2}px solid transparent`,
            borderBottom: `${size}px solid var(--accent)`,
            background: "transparent",
          }}
        />
      );
    default:
      return null;
  }
}

export function FloatingParticles({ count = 12 }) {
  const particles = useMemo(() => generateParticles(count), [count]);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
      {particles.map((p) => (
        <motion.div
          key={p.id}
          style={{
            position: "absolute",
            left: `${p.x}%`,
            top: `${p.y}%`,
          }}
          animate={{
            x: [0, 30, -20, 15, -30, 0],
            y: [0, -25, 15, -35, 20, 0],
            rotate: [0, 90, 180, 270, 360],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear",
            delay: p.delay,
          }}
        >
          <ShapeElement shape={p.shape} size={p.size} opacity={p.opacity} />
        </motion.div>
      ))}
    </div>
  );
}

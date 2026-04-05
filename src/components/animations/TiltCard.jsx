import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/* ──────────────────────────────────────────────────────────────────
   TiltCard — 3D tilt on mouse move
   Calculates rotateX/Y based on cursor position within the card
   (up to ±15deg). Inner elements can get different depth levels
   via CSS transform for a parallax-within-card effect.
   On hover: glowing border rotates via CSS conic-gradient.
   ────────────────────────────────────────────────────────────────── */

const TILT_MAX = 15; // degrees

export function TiltCard({
  children,
  className = "",
  style = {},
  glowBorder = true,
}) {
  const ref = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const springRotateX = useSpring(rotateX, { damping: 20, stiffness: 150 });
  const springRotateY = useSpring(rotateY, { damping: 20, stiffness: 150 });

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Normalize to [-1, 1] range
    const normalizedX = (e.clientX - centerX) / (rect.width / 2);
    const normalizedY = (e.clientY - centerY) / (rect.height / 2);

    // rotateY follows X axis, rotateX follows negative Y axis (natural tilt)
    rotateY.set(normalizedX * TILT_MAX);
    rotateX.set(-normalizedY * TILT_MAX);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <div
      className={`tilt-card-wrapper ${className}`}
      style={{ perspective: "1000px", ...style }}
    >
      {/* Rotating conic-gradient glow border */}
      {glowBorder && <div className="tilt-card-glow" />}

      <motion.div
        ref={ref}
        className="tilt-card-inner"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: springRotateX,
          rotateY: springRotateY,
          transformStyle: "preserve-3d",
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}

/* Use this on inner elements for parallax depth within the card */
export function TiltLayer({ children, depth = 0, className = "", style = {} }) {
  return (
    <div
      className={className}
      style={{
        transform: `translateZ(${depth}px)`,
        transformStyle: "preserve-3d",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

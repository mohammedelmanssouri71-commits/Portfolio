import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/* ──────────────────────────────────────────────────────────────────
   MagneticButton — Button that attracts toward the cursor on hover
   Uses useMotionValue to track cursor position relative to button
   center, then applies a spring-based offset to create a
   "magnetic pull" effect.
   ────────────────────────────────────────────────────────────────── */

export function MagneticButton({
  children,
  className = "",
  style = {},
  strength = 0.3,
  as = "button",
  ...props
}) {
  const ref = useRef(null);
  const [hovered, setHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { damping: 15, stiffness: 200, mass: 0.5 });
  const springY = useSpring(y, { damping: 15, stiffness: 200, mass: 0.5 });

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * strength);
    y.set((e.clientY - centerY) * strength);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    x.set(0);
    y.set(0);
  };

  const Tag = motion[as] || motion.button;

  return (
    <Tag
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        x: springX,
        y: springY,
        ...style,
      }}
      whileTap={{ scale: 0.95 }}
      className={className}
      data-magnetic-hover={hovered ? "true" : "false"}
      {...props}
    >
      {children}
    </Tag>
  );
}

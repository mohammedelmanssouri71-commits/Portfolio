import { useRef } from "react";
import { motion, useInView } from "framer-motion";

/* ──────────────────────────────────────────────────────────────────
   AnimatedSection — Scroll-triggered section wrapper
   Wraps children in a motion.div that fades/slides in when the
   element enters the viewport. Uses Framer Motion's useInView.
   ────────────────────────────────────────────────────────────────── */

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94],
      staggerChildren: 0.1,
    },
  },
};

export function AnimatedSection({
  children,
  className = "",
  style = {},
  delay = 0,
  threshold = 0.15,
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: threshold });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        ...sectionVariants,
        visible: {
          ...sectionVariants.visible,
          transition: {
            ...sectionVariants.visible.transition,
            delay,
          },
        },
      }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

/* Child item variant — use on direct children for stagger effect */
export const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

import { useRef, useMemo } from "react";
import { motion, useInView } from "framer-motion";

/* ──────────────────────────────────────────────────────────────────
   RevealText — Masked slide-up text reveal
   ────────────────────────────────────────────────────────────────── */

const wordVariants = {
  hidden: {
    y: 20,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.04,
    },
  },
};

// Create a safe motion component factory
const getMotionComponent = (as) => {
  if (typeof as === 'string' && motion[as]) {
    return motion[as];
  }
  return motion.div;
};

export function RevealText({
  children,
  as = "h2",
  className = "",
  style = {},
  wordByWord = false,
  delay = 0,
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  
  const Tag = useMemo(() => getMotionComponent(as), [as]);

  if (wordByWord && typeof children === "string") {
    const words = children.split(" ");

    return (
      <Tag
        ref={ref}
        variants={{
          ...containerVariants,
          visible: {
            transition: { staggerChildren: 0.04, delayChildren: delay },
          },
        }}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className={className}
        style={{ display: "flex", flexWrap: "wrap", gap: "0.3em", ...style }}
      >
        {words.map((word, i) => (
          <motion.span
            key={i}
            variants={wordVariants}
            style={{ display: "inline-block" }}
          >
            {word}
          </motion.span>
        ))}
      </Tag>
    );
  }

  return (
    <Tag
      ref={ref}
      initial={{
        y: 30,
        opacity: 0,
      }}
      animate={
        isInView
          ? {
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.6,
                ease: [0.25, 0.46, 0.45, 0.94],
                delay,
              },
            }
          : {}
      }
      className={className}
      style={style}
    >
      {children}
    </Tag>
  );
}

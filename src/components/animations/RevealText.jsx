import { useRef } from "react";
import { motion, useInView } from "framer-motion";

/* ──────────────────────────────────────────────────────────────────
   RevealText — Masked slide-up text reveal
   Uses clipPath animation: inset(100% 0 0 0) → inset(0% 0 0 0)
   Can reveal word-by-word with stagger, or as a single block.
   ────────────────────────────────────────────────────────────────── */

const wordVariants = {
  hidden: {
    clipPath: "inset(100% 0 0 0)",
    y: 20,
    opacity: 0,
  },
  visible: {
    clipPath: "inset(0% 0 0 0)",
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

export function RevealText({
  children,
  as = "h2",
  className = "",
  style = {},
  wordByWord = false,
  delay = 0,
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const Tag = motion[as] || motion.div;

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
        clipPath: "inset(100% 0 0 0)",
        y: 30,
        opacity: 0,
      }}
      animate={
        isInView
          ? {
              clipPath: "inset(0% 0 0 0)",
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

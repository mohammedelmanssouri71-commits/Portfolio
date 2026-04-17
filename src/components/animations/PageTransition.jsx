import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logoImg from "../../assets/logo.png";

/* ──────────────────────────────────────────────────────────────────
   PageTransition — Full-screen curtain lift overlay
   Covers the viewport on first load, then slides up to reveal
   the page. Uses a custom easing for cinematic feel.
   ease: [0.76, 0, 0.24, 1] — sharp accelerate, smooth decelerate
   ────────────────────────────────────────────────────────────────── */

export function PageTransition({ children }) {
  const [isComplete, setIsComplete] = useState(false);

  return (
    <>
      <AnimatePresence>
        {!isComplete && (
          <motion.div
            key="page-transition-overlay"
            initial={{ y: 0 }}
            animate={{ y: "-100%" }}
            transition={{
              duration: 1.2,
              ease: [0.76, 0, 0.24, 1],
              delay: 0.3,
            }}
            onAnimationComplete={() => setIsComplete(true)}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 10000,
              background: "#0a0e1a",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Optional: Logo or loading indicator during curtain */}
            <motion.div
              initial={{ opacity: 1, scale: 1 }}
              animate={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.4, delay: 0.6 }}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img src={logoImg} alt="Logo" style={{ height: "80px", width: "auto" }} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Page content fades in after curtain lifts */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.0 }}
      >
        {children}
      </motion.div>
    </>
  );
}

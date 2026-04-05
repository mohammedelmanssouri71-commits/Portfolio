import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/* ──────────────────────────────────────────────────────────────────
   MagneticCursor — Custom cursor replacing the default
   A small dot follows the cursor exactly, while a larger ring
   follows with a spring lag (damping:20, stiffness:150).
   On hovering interactive elements: ring expands + mix-blend-mode.
   ────────────────────────────────────────────────────────────────── */

export function MagneticCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springX = useSpring(cursorX, { damping: 20, stiffness: 150 });
  const springY = useSpring(cursorY, { damping: 20, stiffness: 150 });

  useEffect(() => {
    // Detect touch device
    if (window.matchMedia("(pointer: coarse)").matches) {
      setIsTouchDevice(true);
      return;
    }

    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleEnter = () => setIsVisible(true);
    const handleLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseenter", handleEnter);
    document.addEventListener("mouseleave", handleLeave);

    // Add custom-cursor class to body
    document.body.classList.add("custom-cursor");

    // Track interactive element hovers
    const interactiveSelector = "a, button, input, textarea, [data-magnetic-hover]";
    const handleInteractiveEnter = () => setIsHovering(true);
    const handleInteractiveLeave = () => setIsHovering(false);

    const addListeners = () => {
      document.querySelectorAll(interactiveSelector).forEach((el) => {
        el.addEventListener("mouseenter", handleInteractiveEnter);
        el.addEventListener("mouseleave", handleInteractiveLeave);
      });
    };

    addListeners();
    const observer = new MutationObserver(addListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseenter", handleEnter);
      document.removeEventListener("mouseleave", handleLeave);
      document.body.classList.remove("custom-cursor");
      observer.disconnect();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (isTouchDevice) return null;

  return (
    <>
      {/* Dot — follows cursor exactly */}
      <motion.div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          x: cursorX,
          y: cursorY,
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: "var(--cursor-dot)",
          pointerEvents: "none",
          zIndex: 9999,
          translateX: "-50%",
          translateY: "-50%",
          opacity: isVisible ? 1 : 0,
        }}
      />

      {/* Ring — follows with spring lag */}
      <motion.div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          x: springX,
          y: springY,
          width: isHovering ? 48 : 32,
          height: isHovering ? 48 : 32,
          borderRadius: "50%",
          border: `1.5px solid ${isHovering ? "var(--cursor-ring-hover)" : "var(--cursor-ring)"}`,
          pointerEvents: "none",
          zIndex: 9998,
          translateX: "-50%",
          translateY: "-50%",
          opacity: isVisible ? 1 : 0,
          mixBlendMode: isHovering ? "difference" : "normal",
          transition: "width 0.3s ease, height 0.3s ease, border-color 0.3s ease",
        }}
      />
    </>
  );
}

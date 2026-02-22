import { useState, useEffect } from "react";

/**
 * Cycles through an array of strings with a typewriter + delete effect.
 */
export function TypewriterText({ texts = [], speed = 75 }) {
  const [displayed, setDisplayed] = useState("");
  const [textIdx, setTextIdx]     = useState(0);
  const [charIdx, setCharIdx]     = useState(0);
  const [deleting, setDeleting]   = useState(false);

  useEffect(() => {
    if (!texts.length) return;
    const current = texts[textIdx % texts.length];
    let timeout;

    if (!deleting && charIdx < current.length) {
      timeout = setTimeout(() => setCharIdx((c) => c + 1), speed);
    } else if (!deleting && charIdx === current.length) {
      timeout = setTimeout(() => setDeleting(true), 2200);
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => setCharIdx((c) => c - 1), speed / 2);
    } else {
      setDeleting(false);
      setTextIdx((i) => (i + 1) % texts.length);
    }

    setDisplayed(current.slice(0, charIdx));
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, textIdx, texts, speed]);

  return (
    <span style={{ fontFamily: "var(--font-display)" }}>
      {displayed}
      <span
        style={{
          borderRight: "3px solid var(--accent)",
          animation: "blink 1s step-end infinite",
          marginLeft: "2px",
        }}
      />
    </span>
  );
}

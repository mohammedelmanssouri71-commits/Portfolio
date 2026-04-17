import { useState, useEffect, useRef } from "react";
import "./BootScreen.css";

/* ══════════════════════════════════════════════════════════════════
   BOOT SCREEN — Terminal initialization sequence
   Pure JS typewriter + CSS-only glitch/dissolve.
   No animation libraries — only React state + setTimeout.

   Phases:
     1. Blinking cursor (0 → 800ms)
     2. Typewriter lines (800ms → ~2200ms)
     3. Glitch flash (~2200ms → ~2500ms)
     4. Dissolve into hero (~2500ms → ~3200ms)
   ══════════════════════════════════════════════════════════════════ */

/* ── Boot line definitions ─────────────────────────────────────── */
const BOOT_LINES = [
  { text: "initializing portfolio...        ", tag: "[OK]" },
  { text: "loading projects................  ", tag: "[OK]" },
  { text: "connecting to stack...........    ", tag: "[OK]" },
  { text: "welcome, Mohammed El-Manssouri",    tag: null  },
];

/* ── Typing speed: dots/spaces are fast, text is slower ────────── */
const charDelay = (ch) => (ch === "." || ch === " " ? 4 : 14);

/* ══════════════════════════════════════════════════════════════════
   BootSequence — Wraps app content.
   Manages the boot → reveal → done lifecycle.
   Children mount only when dissolve starts (so Framer Motion
   hero animations play fresh, not while hidden).
   ══════════════════════════════════════════════════════════════════ */
export function BootSequence({ children }) {
  // "boot" → overlay visible, children hidden
  // "reveal" → overlay dissolving, children fading in
  // "done" → overlay unmounted, children fully visible
  const [phase, setPhase] = useState("boot");

  const reducedMotion = useRef(
    typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
  );

  // Skip boot entirely for reduced-motion users
  if (reducedMotion.current) return <>{children}</>;

  return (
    <>
      {/* Children mount when reveal starts — hero animations fire fresh */}
      {phase !== "boot" && (
        <div className="boot-content-reveal">{children}</div>
      )}

      {/* Boot overlay — unmounts after dissolve finishes */}
      {phase !== "done" && (
        <BootOverlay
          onReveal={() => setPhase("reveal")}
          onDone={() => setPhase("done")}
        />
      )}
    </>
  );
}

/* ══════════════════════════════════════════════════════════════════
   BootOverlay — The actual fullscreen terminal boot screen.
   Drives the 4-phase animation sequence via async/await.
   ══════════════════════════════════════════════════════════════════ */
function BootOverlay({ onReveal, onDone }) {
  /*
   * lines[]: completed + currently typing lines
   *   Each: { text: string, tag: string|null }
   *   The last line may be partially typed (tag === null while typing)
   *
   * typingDone: true when all lines finished typing
   * glitching:  true during Phase 3 CSS glitch
   * dissolving: true during Phase 4 CSS dissolve
   */
  const [lines, setLines] = useState([]);
  const [typingDone, setTypingDone] = useState(false);
  const [glitching, setGlitching] = useState(false);
  const [dissolving, setDissolving] = useState(false);
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;

    /* ── Async sequence driver ─────────────────────────────────── */
    const wait = (ms) => new Promise((r) => setTimeout(r, ms));

    (async () => {
      /* ── Phase 1: blinking cursor (800ms) ───────────────────── */
      await wait(800);
      if (!mounted.current) return;

      /* ── Phase 2: typewriter lines ──────────────────────────── */
      for (let i = 0; i < BOOT_LINES.length; i++) {
        const { text, tag } = BOOT_LINES[i];

        // Push a new empty line
        setLines((prev) => [...prev, { text: "", tag: null }]);
        await wait(30);
        if (!mounted.current) return;

        // Type each character with variable speed
        for (let c = 1; c <= text.length; c++) {
          if (!mounted.current) return;
          const partial = text.slice(0, c);
          setLines((prev) => {
            const next = [...prev];
            next[next.length - 1] = { text: partial, tag: null };
            return next;
          });
          await wait(charDelay(text[c - 1]));
        }
        if (!mounted.current) return;

        // Flash in the [OK] tag (or null for last line)
        setLines((prev) => {
          const next = [...prev];
          next[next.length - 1] = { ...next[next.length - 1], tag };
          return next;
        });

        // Pause between lines (longer pause after last line)
        await wait(i < BOOT_LINES.length - 1 ? 120 : 350);
        if (!mounted.current) return;
      }

      setTypingDone(true);

      /* ── Phase 3: glitch flash (300ms) ──────────────────────── */
      setGlitching(true);
      await wait(300);
      if (!mounted.current) return;
      setGlitching(false);

      /* ── Phase 4: dissolve out (700ms) ──────────────────────── */
      setDissolving(true);
      onReveal(); // mount children underneath
      await wait(700);
      if (!mounted.current) return;
      onDone(); // unmount this overlay
    })();

    return () => {
      mounted.current = false;
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  /* ── Cursor visibility logic ─────────────────────────────────── */
  const showCursor = !typingDone && !glitching && !dissolving;

  /* ── CSS class composition ───────────────────────────────────── */
  const overlayClass = [
    "boot-overlay",
    glitching ? "boot-glitch" : "",
    dissolving ? "boot-dissolve" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={overlayClass}>
      <div className="boot-terminal">
        {/* ── Rendered lines ──────────────────────────────────── */}
        {lines.map((line, i) => (
          <div key={i} className="boot-line">
            <span className="boot-text">{line.text}</span>

            {/* Blinking cursor on active (last) line while typing */}
            {showCursor && i === lines.length - 1 && !line.tag && (
              <span className="boot-cursor">_</span>
            )}

            {/* [OK] tag — flashes in when line completes */}
            {line.tag && <span className="boot-tag"> {line.tag}</span>}
          </div>
        ))}

        {/* ── Phase 1: standalone cursor before any lines ─────── */}
        {lines.length === 0 && <span className="boot-cursor">_</span>}
      </div>
    </div>
  );
}

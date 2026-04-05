/* ──────────────────────────────────────────────────────────────────
   MarqueeRow — Infinite scrolling row
   Duplicates children to create seamless loop using CSS animation.
   Pauses on hover. Supports left/right direction.
   ────────────────────────────────────────────────────────────────── */

export function MarqueeRow({
  children,
  direction = "left",
  speed = 30,
  className = "",
  altBg = false,
}) {
  const trackClass = direction === "left" ? "marquee-track--left" : "marquee-track--right";
  const containerClass = altBg ? "marquee-container marquee-container--alt" : "marquee-container";

  return (
    <div className={`${containerClass} ${className}`}>
      <div
        className={`marquee-track ${trackClass}`}
        style={{ animationDuration: `${speed}s` }}
      >
        {children}
        {/* Duplicate for seamless loop */}
        {children}
      </div>
    </div>
  );
}

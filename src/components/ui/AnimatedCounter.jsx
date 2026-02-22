import { useState, useEffect } from "react";

export function AnimatedCounter({ value, isVisible, suffix = "" }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    let current = 0;
    const step = Math.max(1, Math.ceil(value / 40));
    const timer = setInterval(() => {
      current += step;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(current);
      }
    }, 20);
    return () => clearInterval(timer);
  }, [isVisible, value]);

  return <>{count}{suffix}</>;
}

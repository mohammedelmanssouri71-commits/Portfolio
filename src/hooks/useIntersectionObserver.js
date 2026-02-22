import { useState, useEffect } from "react";

/**
 * Returns true once the referenced element enters the viewport.
 * @param {React.RefObject} ref
 * @param {IntersectionObserverInit} options
 */
export function useIntersectionObserver(ref, options = {}) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // fire once
        }
      },
      { threshold: 0.15, ...options }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, options]);

  return isVisible;
}

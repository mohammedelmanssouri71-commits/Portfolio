import { useRef } from 'react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

export function AnimatedSection({ id, className = '', children }) {
  const ref = useRef(null);
  const visible = useIntersectionObserver(ref);

  return (
    <section id={id} ref={ref} className={`animated-section ${visible ? 'is-visible' : ''} ${className}`.trim()}>
      {children}
    </section>
  );
}

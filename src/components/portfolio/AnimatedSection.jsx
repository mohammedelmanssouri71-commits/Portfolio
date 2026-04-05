import { motion } from 'framer-motion';
import { sectionReveal } from './motionVariants';

export function AnimatedSection({ id, className = '', children }) {
  return (
    <motion.section
      id={id}
      className={`animated-section is-visible ${className}`.trim()}
      variants={sectionReveal}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
      {children}
    </motion.section>
  );
}

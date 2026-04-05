import { motion } from 'framer-motion';
import { Badge } from '../ui/badge';
import { badgeBounce } from './motionVariants';

export function SkillBadge({ skill }) {
  return (
    <motion.span initial="rest" whileHover="hover" animate="rest" variants={badgeBounce}>
      <Badge className="skill-badge" tabIndex={0} aria-label={skill.name}>
        <img src={skill.icon} alt={skill.name} loading="lazy" />
        <span>{skill.name}</span>
      </Badge>
    </motion.span>
  );
}

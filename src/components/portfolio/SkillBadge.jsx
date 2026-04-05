import { Badge } from '../ui/badge';

export function SkillBadge({ skill }) {
  return (
    <Badge className="skill-badge" tabIndex={0} aria-label={skill.name}>
      <img src={skill.icon} alt={skill.name} loading="lazy" />
      <span>{skill.name}</span>
    </Badge>
  );
}

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';

export function ProjectCard({ project, labels }) {
  return (
    <Card className="project-card" style={{ '--project-accent': project.accentColor }}>
      <CardHeader>
        <div className="project-card__top">
          <span className="project-card__icon" aria-hidden="true">{project.icon}</span>
          {project.inProgress && <Badge className="project-progress">{labels.inProgress}</Badge>}
        </div>
        <CardTitle>{project.title}</CardTitle>
        <CardDescription>{project.description}</CardDescription>
      </CardHeader>

      <CardContent>
        <div className="project-tech">
          {project.tech.map((tech) => (
            <Badge key={tech}>{tech}</Badge>
          ))}
        </div>

        <div className="project-links">
          <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-link">
            {labels.github}
          </a>
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noopener noreferrer" className="text-link">
              {labels.demo}
            </a>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

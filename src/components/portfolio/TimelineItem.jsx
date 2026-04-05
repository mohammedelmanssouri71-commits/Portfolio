import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

export function TimelineItem({ item }) {
  return (
    <div className="timeline-item">
      <span className="timeline-dot" aria-hidden="true" />
      <Card className="timeline-card">
        <CardHeader>
          <p className="timeline-date">{item.date}</p>
          <CardTitle>{item.icon} {item.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{item.issuer}</p>
        </CardContent>
      </Card>
    </div>
  );
}

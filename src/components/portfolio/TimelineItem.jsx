import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { timelineItem } from './motionVariants';

export function TimelineItem({ item, index }) {
  return (
    <motion.div className="timeline-item" variants={timelineItem} custom={index}>
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
    </motion.div>
  );
}

import * as Icons from 'lucide-react';
import Card from '../ui/Card.jsx';
import './SummaryCard.css';

// One component for all four summary cards — `variant` selects the color
// treatment (danger/warning/success/info) and `icon` names a lucide-react icon.
function SummaryCard({ title, value, description, icon, variant = 'info' }) {
  const Icon = Icons[icon] || Icons.Circle;

  return (
    <Card className={`summary-card summary-card--${variant}`}>
      <div className="summary-card__icon">
        <Icon size={20} />
      </div>
      <div className="summary-card__title">{title}</div>
      <div className="summary-card__value">{value}</div>
      {description && <div className="summary-card__description">{description}</div>}
    </Card>
  );
}

export default SummaryCard;

import * as Icons from 'lucide-react';
import Card from '../ui/Card.jsx';
import './SummaryCard.css';

// One component for all four summary cards — `variant` selects the color
// treatment (danger/warning/success/info) and `icon` names a lucide-react icon.
// Passing `onClick` turns the card into a button-like, clickable affordance;
// omit it (as Avg. Resolution Time does) to keep a card purely informative.
function SummaryCard({ title, value, description, icon, variant = 'info', onClick }) {
  const Icon = Icons[icon] || Icons.Circle;
  const isClickable = typeof onClick === 'function';

  return (
    <Card
      as={isClickable ? 'button' : 'div'}
      type={isClickable ? 'button' : undefined}
      onClick={onClick}
      className={`summary-card summary-card--${variant} ${
        isClickable ? 'summary-card--clickable' : ''
      }`}
    >
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


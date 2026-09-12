import { CheckCircle2, AlertTriangle, AlertOctagon } from 'lucide-react';
import Card from '../ui/Card.jsx';
import './SprintHealthCard.css';

const STATUS_ICON = {
  'On Track': CheckCircle2,
  'At Risk': AlertTriangle,
  Critical: AlertOctagon,
};

const STATUS_CLASS = {
  'On Track': 'sprint-health--success',
  'At Risk': 'sprint-health--warning',
  Critical: 'sprint-health--danger',
};

// Presentational — `progressPercent`, `status`, and `message` are derived
// per-sprint by getSprintHealth() in dashboardData.js and passed down, so
// this card always reflects whichever sprint is currently selected.
function SprintHealthCard({ progressPercent, status, message }) {
  const StatusIcon = STATUS_ICON[status] || CheckCircle2;
  const statusClass = STATUS_CLASS[status] || 'sprint-health--success';

  return (
    <Card className="sprint-health">
      <div className="sprint-health__header">Sprint Health</div>

      <div className="sprint-health__progress-row">
        <span className="sprint-health__progress-label">Sprint Progress</span>
        <span className="sprint-health__progress-value">{progressPercent}%</span>
      </div>

      <div className="sprint-health__track">
        <div
          className={`sprint-health__fill ${statusClass}`}
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <div className={`sprint-health__status ${statusClass}`}>
        <div className="sprint-health__status-icon">
          <StatusIcon size={20} />
        </div>
        <div>
          <div className="sprint-health__status-title">{status}</div>
          <div className="sprint-health__status-message">{message}</div>
        </div>
      </div>
    </Card>
  );
}

export default SprintHealthCard;

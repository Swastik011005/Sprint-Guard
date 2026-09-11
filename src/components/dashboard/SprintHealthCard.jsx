import { CheckCircle2 } from 'lucide-react';
import Card from '../ui/Card.jsx';
import { sprintHealth } from '../../data/dashboardData.js';
import './SprintHealthCard.css';

function SprintHealthCard() {
  return (
    <Card className="sprint-health">
      <div className="sprint-health__header">Sprint Health</div>

      <div className="sprint-health__progress-row">
        <span className="sprint-health__progress-label">Sprint Progress</span>
        <span className="sprint-health__progress-value">{sprintHealth.progressPercent}%</span>
      </div>

      <div className="sprint-health__track">
        <div
          className="sprint-health__fill"
          style={{ width: `${sprintHealth.progressPercent}%` }}
        />
      </div>

      <div className="sprint-health__status">
        <div className="sprint-health__status-icon">
          <CheckCircle2 size={20} />
        </div>
        <div>
          <div className="sprint-health__status-title">{sprintHealth.status}</div>
          <div className="sprint-health__status-message">{sprintHealth.message}</div>
        </div>
      </div>
    </Card>
  );
}

export default SprintHealthCard;

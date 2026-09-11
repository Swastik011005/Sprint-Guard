import Card from '../ui/Card.jsx';
import { priorityBreakdown, activeBlockerCount } from '../../data/dashboardData.js';
import './PriorityChart.css';

const SIZE = 140;
const STROKE = 22;
const RADIUS = (SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

// Custom SVG donut — no charting library needed for a single static ring.
function PriorityChart() {
  let cumulativePercent = 0;

  return (
    <Card className="priority-chart">
      <div className="priority-chart__header">Blockers by Priority</div>

      <div className="priority-chart__body">
        <svg
          className="priority-chart__svg"
          width={SIZE}
          height={SIZE}
          viewBox={`0 0 ${SIZE} ${SIZE}`}
        >
          <g transform={`rotate(-90 ${SIZE / 2} ${SIZE / 2})`}>
            {priorityBreakdown.map((slice) => {
              const dash = (slice.percent / 100) * CIRCUMFERENCE;
              const offset = (cumulativePercent / 100) * CIRCUMFERENCE;
              cumulativePercent += slice.percent;

              return (
                <circle
                  key={slice.id}
                  cx={SIZE / 2}
                  cy={SIZE / 2}
                  r={RADIUS}
                  fill="none"
                  stroke={slice.color}
                  strokeWidth={STROKE}
                  strokeDasharray={`${dash} ${CIRCUMFERENCE - dash}`}
                  strokeDashoffset={-offset}
                  strokeLinecap="butt"
                />
              );
            })}
          </g>
          <text x="50%" y="47%" textAnchor="middle" className="priority-chart__count">
            {activeBlockerCount}
          </text>
          <text x="50%" y="63%" textAnchor="middle" className="priority-chart__count-label">
            Active
          </text>
        </svg>

        <ul className="priority-chart__legend">
          {priorityBreakdown.map((slice) => (
            <li key={slice.id} className="priority-chart__legend-item">
              <span
                className="priority-chart__legend-dot"
                style={{ backgroundColor: slice.color }}
              />
              <span className="priority-chart__legend-label">{slice.label}</span>
              <span className="priority-chart__legend-value">
                {slice.value}({slice.percent}%)
              </span>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
}

export default PriorityChart;

import Card from '../ui/Card.jsx';
import './PriorityChart.css';

const SIZE = 140;
const STROKE = 22;
const RADIUS = (SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

// Custom SVG donut. Purely presentational — receives its data and selection
// state as props so it can be driven by whichever sprint is active.
// Clicking a slice (or its legend row) filters the Recently Detected
// Blockers table on the Dashboard; clicking the same slice again clears it.
function PriorityChart({ data, activeCount, selectedPriority, onSelectPriority }) {
  let cumulativePercent = 0;

  return (
    <Card className="priority-chart">
      <div className="priority-chart__header-row">
        <div className="priority-chart__header">Blockers by Priority</div>
        {selectedPriority && (
          <button
            type="button"
            className="priority-chart__clear"
            onClick={() => onSelectPriority(null)}
          >
            Clear filter
          </button>
        )}
      </div>

      <div className="priority-chart__body">
        <svg
          className="priority-chart__svg"
          width={SIZE}
          height={SIZE}
          viewBox={`0 0 ${SIZE} ${SIZE}`}
        >
          <g transform={`rotate(-90 ${SIZE / 2} ${SIZE / 2})`}>
            {data.map((slice) => {
              const dash = (slice.percent / 100) * CIRCUMFERENCE;
              const offset = (cumulativePercent / 100) * CIRCUMFERENCE;
              cumulativePercent += slice.percent;
              const isDimmed = selectedPriority && selectedPriority !== slice.label;

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
                  opacity={isDimmed ? 0.3 : 1}
                  className="priority-chart__slice"
                  onClick={() => onSelectPriority(slice.label)}
                />
              );
            })}
          </g>
          <text x="50%" y="47%" textAnchor="middle" className="priority-chart__count">
            {activeCount}
          </text>
          <text x="50%" y="63%" textAnchor="middle" className="priority-chart__count-label">
            Active
          </text>
        </svg>

        <ul className="priority-chart__legend">
          {data.map((slice) => (
            <li key={slice.id}>
              <button
                type="button"
                className={`priority-chart__legend-item ${
                  selectedPriority === slice.label ? 'priority-chart__legend-item--active' : ''
                }`}
                onClick={() => onSelectPriority(slice.label)}
              >
                <span
                  className="priority-chart__legend-dot"
                  style={{ backgroundColor: slice.color }}
                />
                <span className="priority-chart__legend-label">{slice.label}</span>
                <span className="priority-chart__legend-value">
                  {slice.value}({slice.percent}%)
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
}

export default PriorityChart;

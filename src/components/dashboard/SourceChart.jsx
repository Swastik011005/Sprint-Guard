import { Component, Slack, BookOpen, Github } from 'lucide-react';
import Card from '../ui/Card.jsx';
import './SourceChart.css';

const SOURCE_ICONS = {
  jira: Component,
  slack: Slack,
  confluence: BookOpen,
  github: Github,
};

// Presentational bar chart — CSS bars, no charting dependency. Clicking a
// bar/label filters the Recently Detected Blockers table by that source;
// clicking the same source again clears the filter.
function SourceChart({ data, selectedSource, onSelectSource }) {
  const maxValue = Math.max(1, ...data.map((source) => source.value));

  return (
    <Card className="source-chart">
      <div className="source-chart__header">
        <div className="source-chart__title">Blockers by Source</div>
        {selectedSource && (
          <button
            type="button"
            className="source-chart__clear"
            onClick={() => onSelectSource(null)}
          >
            Clear filter
          </button>
        )}
      </div>

      <div className="source-chart__bars">
        {data.map((source) => {
          const Icon = SOURCE_ICONS[source.id];
          const heightPercent = (source.value / maxValue) * 100;
          const isDimmed = selectedSource && selectedSource !== source.label;

          return (
            <button
              type="button"
              className={`source-chart__bar-column ${
                selectedSource === source.label ? 'source-chart__bar-column--active' : ''
              }`}
              key={source.id}
              onClick={() => onSelectSource(source.label)}
            >
              <div className="source-chart__bar-track">
                <div
                  className="source-chart__bar"
                  style={{ height: `${heightPercent}%`, opacity: isDimmed ? 0.35 : 1 }}
                />
              </div>
              <Icon size={16} className="source-chart__icon" />
              <span className="source-chart__label">{source.label}</span>
            </button>
          );
        })}
      </div>
    </Card>
  );
}

export default SourceChart;

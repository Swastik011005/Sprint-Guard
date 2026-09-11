import { useState } from 'react';
import { Component, Slack, BookOpen, Github } from 'lucide-react';
import Card from '../ui/Card.jsx';
import Dropdown from '../ui/Dropdown.jsx';
import { sourceBreakdown } from '../../data/dashboardData.js';
import './SourceChart.css';

const SOURCE_ICONS = {
  jira: Component,
  slack: Slack,
  confluence: BookOpen,
  github: Github,
};

const RANGE_OPTIONS = [
  { id: 'this-sprint', label: 'This Sprint' },
  { id: 'last-sprint', label: 'Last Sprint' },
];

// Simple CSS-bar chart — heights are computed as a percentage of the max
// value so the visual stays proportional however the mock numbers change.
function SourceChart() {
  const [range, setRange] = useState('this-sprint');
  const maxValue = Math.max(...sourceBreakdown.map((source) => source.value));

  return (
    <Card className="source-chart">
      <div className="source-chart__header">
        <div className="source-chart__title">Blockers by Source</div>
        <Dropdown value={range} options={RANGE_OPTIONS} onChange={setRange} />
      </div>

      <div className="source-chart__bars">
        {sourceBreakdown.map((source) => {
          const Icon = SOURCE_ICONS[source.id];
          const heightPercent = (source.value / maxValue) * 100;

          return (
            <div className="source-chart__bar-column" key={source.id}>
              <div className="source-chart__bar-track">
                <div className="source-chart__bar" style={{ height: `${heightPercent}%` }} />
              </div>
              <Icon size={16} className="source-chart__icon" />
              <span className="source-chart__label">{source.label}</span>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

export default SourceChart;

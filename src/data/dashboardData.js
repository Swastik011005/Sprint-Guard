// Sprint metadata + pure functions that derive dashboard numbers from the
// canonical blocker records in blockerData.js. Nothing here is a hardcoded
// count — switching sprints or mutating a blocker's status/priority just
// re-runs these functions against the current blocker list.

export const sprints = [
  { id: 'sprint-1-jul-2026', label: 'Sprint 1 (July 2026)', progressPercent: 88 },
  { id: 'sprint-2-aug-2026', label: 'Sprint 2 (August 2026)', progressPercent: 72 },
  { id: 'sprint-3-sep-2026', label: 'Sprint 3 (September 2026)', progressPercent: 35 },
];

export const currentSprintId = 'sprint-2-aug-2026';

const PRIORITY_COLORS = {
  High: 'var(--color-priority-high)',
  Medium: 'var(--color-priority-medium)',
  Low: 'var(--color-priority-low)',
};

// "Active" = not yet resolved. Avg resolution time is a simple mock stat
// (not derived from timestamps, since detectedOn/resolvedOn aren't full
// datetimes in this mock dataset) but is still per-sprint and swappable.
const AVG_RESOLUTION_DAYS = {
  'sprint-1-jul-2026': '2.3 days',
  'sprint-2-aug-2026': '1.8 days',
  'sprint-3-sep-2026': '2.9 days',
};

export function getActiveBlockers(blockers) {
  return blockers.filter((b) => b.status !== 'Resolved');
}

export function getSummary(blockers, sprintId) {
  const active = getActiveBlockers(blockers);
  const inProgress = blockers.filter((b) => b.status === 'In Progress');
  const resolved = blockers.filter((b) => b.status === 'Resolved');

  return [
    {
      id: 'active-blockers',
      title: 'Active Blockers',
      value: String(active.length),
      description: null,
      icon: 'AlertTriangle',
      variant: 'danger',
    },
    {
      id: 'in-progress',
      title: 'In Progress',
      value: String(inProgress.length),
      description: null,
      icon: 'Clock',
      variant: 'warning',
    },
    {
      id: 'resolved',
      title: 'Resolved',
      value: String(resolved.length),
      description: null,
      icon: 'CheckCircle2',
      variant: 'success',
    },
    {
      id: 'avg-resolution',
      title: 'Avg. Resolution Time',
      value: AVG_RESOLUTION_DAYS[sprintId] || 'n/a',
      description: null,
      icon: 'BarChart3',
      variant: 'info',
    },
  ];
}

export function getPriorityBreakdown(blockers) {
  const active = getActiveBlockers(blockers);
  const total = active.length;
  const order = ['High', 'Medium', 'Low'];

  return order.map((priority) => {
    const count = active.filter((b) => b.priority === priority).length;
    const percent = total > 0 ? Math.round((count / total) * 100) : 0;
    return {
      id: priority.toLowerCase(),
      label: priority,
      value: count,
      percent,
      color: PRIORITY_COLORS[priority],
    };
  });
}

export function getSourceBreakdown(blockers) {
  const order = ['Jira', 'Slack', 'Confluence', 'Github'];
  return order.map((source) => ({
    id: source.toLowerCase(),
    label: source,
    value: blockers.filter((b) => b.source === source).length,
  }));
}

// Simple, explainable thresholds — not a scoring algorithm.
export function getSprintHealth(sprint) {
  const progress = sprint.progressPercent;
  let status = 'On Track';
  let message = 'Great progress! Keep it up.';

  if (progress < 40) {
    status = 'Critical';
    message = 'Sprint is significantly behind — consider re-scoping or escalating blockers.';
  } else if (progress < 70) {
    status = 'At Risk';
    message = 'Progress is slipping — keep an eye on unresolved blockers.';
  }

  return { progressPercent: progress, status, message };
}

// All dashboard content is mock/static for the foundation build.
// Swap these for real API calls once the backend exists — component props stay the same.

export const sprints = [
  { id: 'sprint-2-aug-2026', label: 'Sprint 2 (August 2026)' },
  { id: 'sprint-1-jul-2026', label: 'Sprint 1 (July 2026)' },
];

export const currentSprintId = 'sprint-2-aug-2026';

export const summaryCards = [
  {
    id: 'active-blockers',
    title: 'Active Blockers',
    value: '7',
    description: '+2 from last sprint',
    icon: 'AlertTriangle',
    variant: 'danger',
  },
  {
    id: 'in-progress',
    title: 'In Progress',
    value: '4',
    description: 'No change',
    icon: 'Clock',
    variant: 'warning',
  },
  {
    id: 'resolved',
    title: 'Resolved',
    value: '10',
    description: '+3 from last sprint',
    icon: 'CheckCircle2',
    variant: 'success',
  },
  {
    id: 'avg-resolution',
    title: 'Avg. Resolution Time',
    value: '1.8 days',
    description: null,
    icon: 'BarChart3',
    variant: 'info',
  },
];

export const priorityBreakdown = [
  { id: 'high', label: 'High', value: 3, percent: 43, color: 'var(--color-priority-high)' },
  { id: 'medium', label: 'Medium', value: 2, percent: 29, color: 'var(--color-priority-medium)' },
  { id: 'low', label: 'Low', value: 2, percent: 29, color: 'var(--color-priority-low)' },
];

export const activeBlockerCount = 7;

export const sourceBreakdown = [
  { id: 'jira', label: 'Jira', value: 4 },
  { id: 'slack', label: 'Slack', value: 2 },
  { id: 'confluence', label: 'Confluence', value: 1 },
  { id: 'github', label: 'Github', value: 3 },
];

export const recentBlockers = [
  {
    id: 'BLK-1007',
    title: 'API Mismatch in User Service',
    source: 'Jira',
    priority: 'High',
    detectedOn: '20th August 10:30 AM',
    status: 'Open',
  },
  {
    id: 'BLK-1006',
    title: 'Licensing Issue - Third Party',
    source: 'Confluence',
    priority: 'Medium',
    detectedOn: '25th August 08:35 AM',
    status: 'In Progress',
  },
  {
    id: 'BLK-1005',
    title: 'Database Connection Issue',
    source: 'Github',
    priority: 'High',
    detectedOn: '18th August 14:10 PM',
    status: 'In Progress',
  },
  {
    id: 'BLK-1004',
    title: 'No response on PR review',
    source: 'Github',
    priority: 'Medium',
    detectedOn: '13th August 18:45 PM',
    status: 'Open',
  },
];

export const sprintHealth = {
  progressPercent: 72,
  status: 'On Track',
  message: 'Great progress! Keep it up.',
};

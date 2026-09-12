// Mock notifications for the top-navbar notification panel. `blockerId`
// links a notification to a blocker so clicking it can open that blocker's
// detail view; notifications without one are purely informational.
export const initialNotifications = [
  {
    id: 'n1',
    type: 'critical',
    message: 'New critical blocker detected: API Mismatch in User Service',
    blockerId: 'BLK-1007',
    sprintId: 'sprint-2-aug-2026',
    timestamp: '20th August 10:31 AM',
    read: false,
  },
  {
    id: 'n2',
    type: 'resolved',
    message: 'Blocker resolved: Fixed broken staging deploy script',
    blockerId: 'BLK-1019',
    sprintId: 'sprint-2-aug-2026',
    timestamp: '13th August 09:26 AM',
    read: false,
  },
  {
    id: 'n3',
    type: 'health',
    message: 'Sprint health changed to On Track for Sprint 2 (August 2026)',
    blockerId: null,
    sprintId: 'sprint-2-aug-2026',
    timestamp: '15th August 09:00 AM',
    read: false,
  },
  {
    id: 'n4',
    type: 'stale',
    message: 'Blocker has remained unresolved for 5+ days: Flaky integration test suite',
    blockerId: 'BLK-1009',
    sprintId: 'sprint-2-aug-2026',
    timestamp: '24th August 09:00 AM',
    read: true,
  },
  {
    id: 'n5',
    type: 'critical',
    message: 'New critical blocker detected: Staging environment down',
    blockerId: 'BLK-1008',
    sprintId: 'sprint-2-aug-2026',
    timestamp: '21st August 09:06 AM',
    read: true,
  },
];

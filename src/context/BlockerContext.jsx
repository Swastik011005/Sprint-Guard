import { createContext, useContext, useMemo, useState } from 'react';
import { blockersBySprint as initialBlockersBySprint } from '../data/blockerData.js';
import {
  sprints,
  currentSprintId,
  getActiveBlockers,
  getSummary,
  getPriorityBreakdown,
  getSourceBreakdown,
  getSprintHealth,
} from '../data/dashboardData.js';
import { initialNotifications } from '../data/notificationData.js';

// Single shared state hub for everything the Scrum Master dashboard and
// blocker-management pages need: which sprint is selected, the (mutable,
// in-memory) blocker records, which blocker's detail view is open, and the
// mock notification feed. Kept as plain React state/context per Phase 2
// scope — no Redux needed for this size of app.

const BlockerContext = createContext(null);

export function BlockerProvider({ children }) {
  const [sprintId, setSprintId] = useState(currentSprintId);
  const [blockersState, setBlockersState] = useState(initialBlockersBySprint);
  const [openBlockerId, setOpenBlockerId] = useState(null);
  const [notifications, setNotifications] = useState(initialNotifications);

  const blockers = blockersState[sprintId] || [];
  const sprint = sprints.find((s) => s.id === sprintId) || sprints[0];

  const summary = useMemo(() => getSummary(blockers, sprintId), [blockers, sprintId]);
  const activeBlockers = useMemo(() => getActiveBlockers(blockers), [blockers]);
  const priorityBreakdown = useMemo(() => getPriorityBreakdown(blockers), [blockers]);
  const sourceBreakdown = useMemo(() => getSourceBreakdown(blockers), [blockers]);
  const sprintHealth = useMemo(() => getSprintHealth(sprint), [sprint]);

  function findBlockerAnywhere(blockerId) {
    for (const sId of Object.keys(blockersState)) {
      const match = blockersState[sId].find((b) => b.id === blockerId);
      if (match) return match;
    }
    return null;
  }

  function getBlockerById(blockerId) {
    return blockers.find((b) => b.id === blockerId) || findBlockerAnywhere(blockerId);
  }

  function mutateBlocker(blockerId, updater) {
    setBlockersState((prev) => {
      const next = { ...prev };
      for (const sId of Object.keys(next)) {
        const index = next[sId].findIndex((b) => b.id === blockerId);
        if (index !== -1) {
          const updatedList = [...next[sId]];
          updatedList[index] = updater(updatedList[index]);
          next[sId] = updatedList;
          break;
        }
      }
      return next;
    });
  }

  function updateBlockerStatus(blockerId, newStatus) {
    mutateBlocker(blockerId, (blocker) => ({
      ...blocker,
      status: newStatus,
      activity: [
        ...blocker.activity,
        {
          id: `a-${Date.now()}`,
          text: `Status changed from ${blocker.status} to ${newStatus}.`,
          timestamp: 'Just now',
        },
      ],
    }));
  }

  function updateBlockerPriority(blockerId, newPriority) {
    mutateBlocker(blockerId, (blocker) => ({
      ...blocker,
      priority: newPriority,
      activity: [
        ...blocker.activity,
        {
          id: `a-${Date.now()}`,
          text: `Priority changed from ${blocker.priority} to ${newPriority}.`,
          timestamp: 'Just now',
        },
      ],
    }));
  }

  // Used by search results and notifications: makes sure the sprint
  // selector follows the blocker being opened, so the detail view is
  // always consistent with what's currently loaded.
  function openBlockerDetail(blockerId) {
    const target = findBlockerAnywhere(blockerId);
    if (target && target.sprintId !== sprintId) {
      setSprintId(target.sprintId);
    }
    setOpenBlockerId(blockerId);
  }

  function closeBlockerDetail() {
    setOpenBlockerId(null);
  }

  function markNotificationRead(notificationId) {
    setNotifications((prev) =>
      prev.map((n) => (n.id === notificationId ? { ...n, read: true } : n))
    );
  }

  function markAllNotificationsRead() {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }

  const unreadNotificationCount = notifications.filter((n) => !n.read).length;

  const value = {
    sprints,
    sprintId,
    sprint,
    setSprintId,
    blockers,
    activeBlockers,
    summary,
    priorityBreakdown,
    sourceBreakdown,
    sprintHealth,
    getBlockerById,
    updateBlockerStatus,
    updateBlockerPriority,
    openBlockerId,
    openBlockerDetail,
    closeBlockerDetail,
    notifications,
    unreadNotificationCount,
    markNotificationRead,
    markAllNotificationsRead,
  };

  return <BlockerContext.Provider value={value}>{children}</BlockerContext.Provider>;
}

export function useBlockers() {
  const context = useContext(BlockerContext);
  if (!context) {
    throw new Error('useBlockers must be used within a BlockerProvider');
  }
  return context;
}

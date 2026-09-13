import { createContext, useContext, useMemo, useState } from 'react';
import { blockersBySprint as rawBlockersBySprint } from '../data/blockerData.js';
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
// mock notification feed. Kept as plain React state/context — no Redux
// needed for this size of app.

const BlockerContext = createContext(null);

// Seed records don't carry a `lastUpdated` field — default it to
// `detectedOn` once, at load time, rather than hand-editing every record.
function withDefaults(bySprint) {
  return Object.fromEntries(
    Object.entries(bySprint).map(([sprintIdKey, list]) => [
      sprintIdKey,
      list.map((b) => ({ ...b, lastUpdated: b.lastUpdated || b.detectedOn })),
    ])
  );
}

function nextBlockerId(bySprint) {
  let max = 1000;
  for (const list of Object.values(bySprint)) {
    for (const blocker of list) {
      const match = /^BLK-(\d+)$/.exec(blocker.id);
      if (match) max = Math.max(max, Number(match[1]));
    }
  }
  return `BLK-${max + 1}`;
}

export function BlockerProvider({ children }) {
  const [sprintId, setSprintId] = useState(currentSprintId);
  const [blockersState, setBlockersState] = useState(() => withDefaults(rawBlockersBySprint));
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

  // Diffs `changes` against the blocker's current fields and appends one
  // human-readable activity line per changed field, so every meaningful
  // edit — from a quick status pill to a full form edit — goes through the
  // same activity-log path instead of each caller writing its own text.
  function describeChange(field, before, after) {
    switch (field) {
      case 'status':
        return `Status changed from ${before} to ${after}.`;
      case 'priority':
        return `Priority changed from ${before} to ${after}.`;
      case 'assignedTo':
        return `Assigned to ${after}.`;
      case 'title':
        return 'Title updated.';
      case 'description':
        return 'Description updated.';
      default:
        return `${field} updated.`;
    }
  }

  function applyBlockerUpdate(blockerId, changes) {
    setBlockersState((prev) => {
      const next = { ...prev };
      for (const sId of Object.keys(next)) {
        const index = next[sId].findIndex((b) => b.id === blockerId);
        if (index === -1) continue;

        const current = next[sId][index];
        const newActivityEntries = [];

        for (const [field, value] of Object.entries(changes)) {
          if (value === undefined || value === current[field]) continue;
          newActivityEntries.push({
            id: `a-${Date.now()}-${field}`,
            text: describeChange(field, current[field], value),
            timestamp: 'Just now',
          });
        }

        if (newActivityEntries.length === 0) return prev;

        const updatedList = [...next[sId]];
        updatedList[index] = {
          ...current,
          ...changes,
          lastUpdated: 'Just now',
          activity: [...current.activity, ...newActivityEntries],
        };
        next[sId] = updatedList;
        break;
      }
      return next;
    });
  }

  function updateBlockerStatus(blockerId, newStatus) {
    applyBlockerUpdate(blockerId, { status: newStatus });
  }

  function updateBlockerPriority(blockerId, newPriority) {
    applyBlockerUpdate(blockerId, { priority: newPriority });
  }

  function updateBlockerAssignee(blockerId, assignedTo) {
    applyBlockerUpdate(blockerId, { assignedTo });
  }

  // Used by the Edit Blocker form — applies several field changes (title,
  // description, priority, assignee, status) in one go.
  function editBlocker(blockerId, changes) {
    applyBlockerUpdate(blockerId, changes);
  }

  // Used by the "+ Report Blocker" form. Places the new blocker into
  // whichever sprint the form specifies and switches the active sprint to
  // match, so it's visible in the list immediately.
  function createBlocker(formValues) {
    const id = nextBlockerId(blockersState);
    const targetSprintId = formValues.sprintId || sprintId;

    const newBlocker = {
      id,
      sprintId: targetSprintId,
      title: formValues.title,
      description: formValues.description,
      source: formValues.source,
      priority: formValues.priority,
      status: 'Open',
      detectedOn: 'Just now',
      lastUpdated: 'Just now',
      reportedBy: formValues.reportedBy,
      assignedTo: formValues.assignedTo,
      activity: [{ id: 'a1', text: 'Blocker created.', timestamp: 'Just now' }],
    };

    setBlockersState((prev) => ({
      ...prev,
      [targetSprintId]: [newBlocker, ...(prev[targetSprintId] || [])],
    }));

    if (targetSprintId !== sprintId) {
      setSprintId(targetSprintId);
    }

    return id;
  }

  function deleteBlocker(blockerId) {
    setBlockersState((prev) => {
      const next = { ...prev };
      for (const sId of Object.keys(next)) {
        if (next[sId].some((b) => b.id === blockerId)) {
          next[sId] = next[sId].filter((b) => b.id !== blockerId);
          break;
        }
      }
      return next;
    });
    setOpenBlockerId((current) => (current === blockerId ? null : current));
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
    updateBlockerAssignee,
    editBlocker,
    createBlocker,
    deleteBlocker,
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

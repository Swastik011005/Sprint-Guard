import { Calendar } from 'lucide-react';
import Dropdown from '../ui/Dropdown.jsx';
import { teamMembers } from '../../data/mockUsers.js';
import { useBlockers } from '../../context/BlockerContext.jsx';
import './BlockerFilters.css';

const SOURCE_OPTIONS = ['All', 'Jira', 'Slack', 'Confluence', 'Github'];
const PRIORITY_OPTIONS = ['All', 'High', 'Medium', 'Low'];

// All five filter dimensions the Scrum Master can combine (AND'd together
// by the caller): Sprint, Status, Priority, Source, Assignee. Sprint is
// bound straight to BlockerContext since it's the same global sprint the
// Dashboard uses — switching it here updates the Dashboard too.
function BlockerFilters({
  statusOptions,
  statusFilter,
  onStatusChange,
  priorityFilter,
  onPriorityChange,
  sourceFilter,
  onSourceChange,
  assigneeFilter,
  onAssigneeChange,
}) {
  const { sprints, sprintId, setSprintId } = useBlockers();

  const assigneeOptions = [
    { id: 'All', label: 'All assignees' },
    ...teamMembers.map((member) => ({ id: member.name, label: member.name })),
  ];

  return (
    <div className="blocker-filters">
      <div className="blocker-filters__row">
        <Dropdown
          label="Sprint"
          value={sprintId}
          options={sprints}
          onChange={setSprintId}
          icon={Calendar}
        />
        <Dropdown
          label="Assignee"
          value={assigneeFilter}
          options={assigneeOptions}
          onChange={onAssigneeChange}
        />
      </div>

      <div className="blocker-filters__group">
        <span className="blocker-filters__label">Status</span>
        <div className="blocker-filters__pill-row">
          {statusOptions.map((status) => (
            <button
              type="button"
              key={status}
              className={`blocker-filters__pill ${
                statusFilter === status ? 'blocker-filters__pill--active' : ''
              }`}
              onClick={() => onStatusChange(status)}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      <div className="blocker-filters__group">
        <span className="blocker-filters__label">Priority</span>
        <div className="blocker-filters__pill-row">
          {PRIORITY_OPTIONS.map((priority) => (
            <button
              type="button"
              key={priority}
              className={`blocker-filters__pill ${
                priorityFilter === priority ? 'blocker-filters__pill--active' : ''
              }`}
              onClick={() => onPriorityChange(priority)}
            >
              {priority}
            </button>
          ))}
        </div>
      </div>

      <div className="blocker-filters__group">
        <span className="blocker-filters__label">Source</span>
        <div className="blocker-filters__pill-row">
          {SOURCE_OPTIONS.map((source) => (
            <button
              type="button"
              key={source}
              className={`blocker-filters__pill ${
                sourceFilter === source ? 'blocker-filters__pill--active' : ''
              }`}
              onClick={() => onSourceChange(source)}
            >
              {source}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BlockerFilters;

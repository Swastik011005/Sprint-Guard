import { useState } from 'react';
import { X, User, UserCheck, Calendar, Tag, Layers, Pencil, Trash2 } from 'lucide-react';
import Badge from '../ui/Badge.jsx';
import Button from '../ui/Button.jsx';
import BlockerForm from '../blockers/BlockerForm.jsx';
import DeleteBlockerDialog from '../blockers/DeleteBlockerDialog.jsx';
import { useBlockers } from '../../context/BlockerContext.jsx';
import './BlockerDetailModal.css';

const PRIORITY_TONE = { High: 'danger', Medium: 'warning', Low: 'info' };
const STATUS_TONE = {
  Open: 'info',
  'In Progress': 'warning',
  Blocked: 'danger',
  Resolved: 'success',
  Closed: 'neutral',
};
const STATUSES = ['Open', 'In Progress', 'Blocked', 'Resolved', 'Closed'];
const PRIORITIES = ['High', 'Medium', 'Low'];

// Rendered once (inside AppLayout) and driven entirely by BlockerContext's
// `openBlockerId` — any component (search, notifications, a table row) can
// open it just by calling `openBlockerDetail(id)`, no prop drilling needed.
// Enhanced in Phase 3 with full Edit and Delete actions, on top of the
// existing quick status/priority pills from Phase 2.
function BlockerDetailModal() {
  const {
    openBlockerId,
    closeBlockerDetail,
    getBlockerById,
    updateBlockerStatus,
    updateBlockerPriority,
    deleteBlocker,
    sprints,
  } = useBlockers();

  const [editing, setEditing] = useState(false);
  const [confirmingDelete, setConfirmingDelete] = useState(false);

  if (!openBlockerId) return null;

  const blocker = getBlockerById(openBlockerId);
  if (!blocker) return null;

  const sprintLabel = sprints.find((s) => s.id === blocker.sprintId)?.label || blocker.sprintId;

  function handleDeleteConfirmed() {
    deleteBlocker(blocker.id);
    setConfirmingDelete(false);
  }

  return (
    <>
      <div className="blocker-modal__overlay" onClick={closeBlockerDetail}>
        <div className="blocker-modal" onClick={(event) => event.stopPropagation()}>
          <div className="blocker-modal__header">
            <div>
              <div className="blocker-modal__id">{blocker.id}</div>
              <h2 className="blocker-modal__title">{blocker.title}</h2>
            </div>
            <button
              type="button"
              className="blocker-modal__close"
              aria-label="Close"
              onClick={closeBlockerDetail}
            >
              <X size={20} />
            </button>
          </div>

          <div className="blocker-modal__badges">
            <Badge tone={PRIORITY_TONE[blocker.priority]}>{blocker.priority} priority</Badge>
            <Badge tone={STATUS_TONE[blocker.status]}>{blocker.status}</Badge>
          </div>

          <p className="blocker-modal__description">{blocker.description}</p>

          <div className="blocker-modal__meta">
            <div className="blocker-modal__meta-item">
              <Tag size={15} />
              <span>Source: {blocker.source}</span>
            </div>
            <div className="blocker-modal__meta-item">
              <Layers size={15} />
              <span>Sprint: {sprintLabel}</span>
            </div>
            <div className="blocker-modal__meta-item">
              <Calendar size={15} />
              <span>Detected: {blocker.detectedOn}</span>
            </div>
            <div className="blocker-modal__meta-item">
              <Calendar size={15} />
              <span>Last updated: {blocker.lastUpdated}</span>
            </div>
            <div className="blocker-modal__meta-item">
              <User size={15} />
              <span>Reported by: {blocker.reportedBy}</span>
            </div>
            <div className="blocker-modal__meta-item">
              <UserCheck size={15} />
              <span>Assigned to: {blocker.assignedTo}</span>
            </div>
          </div>

          <div className="blocker-modal__section">
            <div className="blocker-modal__section-title">Status</div>
            <div className="blocker-modal__pill-row">
              {STATUSES.map((status) => (
                <button
                  type="button"
                  key={status}
                  className={`blocker-modal__pill ${
                    blocker.status === status ? 'blocker-modal__pill--active' : ''
                  }`}
                  disabled={blocker.status === status}
                  onClick={() => updateBlockerStatus(blocker.id, status)}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          <div className="blocker-modal__section">
            <div className="blocker-modal__section-title">Priority</div>
            <div className="blocker-modal__pill-row">
              {PRIORITIES.map((priority) => (
                <button
                  type="button"
                  key={priority}
                  className={`blocker-modal__pill ${
                    blocker.priority === priority ? 'blocker-modal__pill--active' : ''
                  }`}
                  disabled={blocker.priority === priority}
                  onClick={() => updateBlockerPriority(blocker.id, priority)}
                >
                  {priority}
                </button>
              ))}
            </div>
          </div>

          <div className="blocker-modal__section">
            <div className="blocker-modal__section-title">Activity</div>
            <ul className="blocker-modal__activity">
              {blocker.activity
                .slice()
                .reverse()
                .map((entry) => (
                  <li key={entry.id} className="blocker-modal__activity-item">
                    <span className="blocker-modal__activity-text">{entry.text}</span>
                    <span className="blocker-modal__activity-time">{entry.timestamp}</span>
                  </li>
                ))}
            </ul>
          </div>

          <div className="blocker-modal__footer">
            <Button
              variant="secondary"
              className="blocker-modal__delete"
              onClick={() => setConfirmingDelete(true)}
            >
              <Trash2 size={16} />
              Delete
            </Button>
            <div className="blocker-modal__footer-right">
              <Button variant="secondary" onClick={() => setEditing(true)}>
                <Pencil size={16} />
                Edit
              </Button>
              <Button variant="secondary" onClick={closeBlockerDetail}>
                Close
              </Button>
            </div>
          </div>
        </div>
      </div>

      {editing && (
        <BlockerForm mode="edit" blocker={blocker} onClose={() => setEditing(false)} />
      )}

      {confirmingDelete && (
        <DeleteBlockerDialog
          blockerTitle={blocker.title}
          onCancel={() => setConfirmingDelete(false)}
          onConfirm={handleDeleteConfirmed}
        />
      )}
    </>
  );
}

export default BlockerDetailModal;

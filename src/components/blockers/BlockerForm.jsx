import { useState } from 'react';
import { X } from 'lucide-react';
import Input from '../ui/Input.jsx';
import Button from '../ui/Button.jsx';
import { teamMembers } from '../../data/mockUsers.js';
import { useBlockers } from '../../context/BlockerContext.jsx';
import './BlockerForm.css';

const SOURCES = ['Jira', 'Slack', 'Confluence', 'Github'];
const PRIORITIES = ['High', 'Medium', 'Low'];
const STATUSES = ['Open', 'In Progress', 'Blocked', 'Resolved', 'Closed'];

// One form, two modes. `mode="create"` collects everything needed to
// report a new blocker (including Source/Reporter/Sprint, which are fixed
// at creation time). `mode="edit"` only exposes the fields the Scrum
// Master is allowed to change afterward: title, description, priority,
// assignee, and status — Source/Reporter/Sprint are shown read-only.
function BlockerForm({ mode, blocker, onClose }) {
  const { sprints, sprintId, createBlocker, editBlocker } = useBlockers();
  const isEdit = mode === 'edit';

  const [title, setTitle] = useState(blocker?.title || '');
  const [description, setDescription] = useState(blocker?.description || '');
  const [priority, setPriority] = useState(blocker?.priority || 'Medium');
  const [source, setSource] = useState(blocker?.source || 'Jira');
  const [reportedBy, setReportedBy] = useState(blocker?.reportedBy || teamMembers[0].name);
  const [assignedTo, setAssignedTo] = useState(blocker?.assignedTo || teamMembers[0].name);
  const [formSprintId, setFormSprintId] = useState(blocker?.sprintId || sprintId);
  const [status, setStatus] = useState(blocker?.status || 'Open');
  const [error, setError] = useState('');

  function handleSubmit(event) {
    event.preventDefault();

    if (!title.trim() || !description.trim()) {
      setError('Title and description are required.');
      return;
    }

    if (isEdit) {
      editBlocker(blocker.id, {
        title: title.trim(),
        description: description.trim(),
        priority,
        assignedTo,
        status,
      });
    } else {
      createBlocker({
        title: title.trim(),
        description: description.trim(),
        priority,
        source,
        reportedBy,
        assignedTo,
        sprintId: formSprintId,
      });
    }

    onClose();
  }

  return (
    <div className="blocker-form__overlay" onClick={onClose}>
      <div className="blocker-form" onClick={(event) => event.stopPropagation()}>
        <div className="blocker-form__header">
          <h2 className="blocker-form__title">
            {isEdit ? `Edit ${blocker.id}` : 'Report Blocker'}
          </h2>
          <button type="button" className="blocker-form__close" onClick={onClose} aria-label="Close">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="blocker-form__body">
          <label className="blocker-form__label">Title</label>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Short summary of the blocker" />

          <label className="blocker-form__label">Description</label>
          <textarea
            className="blocker-form__textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="What's blocked, and why?"
            rows={3}
          />

          <div className="blocker-form__grid">
            <div>
              <label className="blocker-form__label">Priority</label>
              <select
                className="blocker-form__select"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                {PRIORITIES.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="blocker-form__label">Assignee</label>
              <select
                className="blocker-form__select"
                value={assignedTo}
                onChange={(e) => setAssignedTo(e.target.value)}
              >
                {teamMembers.map((member) => (
                  <option key={member.id} value={member.name}>
                    {member.name}
                  </option>
                ))}
              </select>
            </div>

            {isEdit ? (
              <div>
                <label className="blocker-form__label">Status</label>
                <select
                  className="blocker-form__select"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  {STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              <div>
                <label className="blocker-form__label">Source</label>
                <select
                  className="blocker-form__select"
                  value={source}
                  onChange={(e) => setSource(e.target.value)}
                >
                  {SOURCES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {!isEdit && (
              <div>
                <label className="blocker-form__label">Reporter</label>
                <select
                  className="blocker-form__select"
                  value={reportedBy}
                  onChange={(e) => setReportedBy(e.target.value)}
                >
                  {teamMembers.map((member) => (
                    <option key={member.id} value={member.name}>
                      {member.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {!isEdit && (
              <div>
                <label className="blocker-form__label">Sprint</label>
                <select
                  className="blocker-form__select"
                  value={formSprintId}
                  onChange={(e) => setFormSprintId(e.target.value)}
                >
                  {sprints.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {isEdit && (
            <p className="blocker-form__readonly-note">
              Source: {blocker.source} · Reporter: {blocker.reportedBy} · Sprint fixed at creation
            </p>
          )}

          {error && <div className="blocker-form__error">{error}</div>}

          <div className="blocker-form__actions">
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">{isEdit ? 'Save Changes' : 'Report Blocker'}</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BlockerForm;

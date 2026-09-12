import { useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import BlockerTable from '../../components/dashboard/BlockerTable.jsx';
import { useBlockers } from '../../context/BlockerContext.jsx';
import './BlockerListPage.css';

const STATUS_OPTIONS = ['All', 'Open', 'In Progress', 'Resolved'];
const PRIORITY_OPTIONS = ['All', 'High', 'Medium', 'Low'];

// Shared by both /active-blockers and /blocker-list. `scope="active"` shows
// only unresolved blockers for the current sprint (used by Active
// Blockers); `scope="all"` shows every blocker (used by Blocker List).
// This is intentionally a lightweight filterable list for Phase 2 — full
// blocker management (sort, assign, bulk actions) is Phase 3.
function BlockerListPage({ scope, title }) {
  const location = useLocation();
  const { blockers, activeBlockers, openBlockerDetail } = useBlockers();

  const baseBlockers = scope === 'active' ? activeBlockers : blockers;

  const [statusFilter, setStatusFilter] = useState(
    location.state?.statusFilter || 'All'
  );
  const [priorityFilter, setPriorityFilter] = useState('All');

  const filtered = useMemo(() => {
    return baseBlockers.filter(
      (blocker) =>
        (statusFilter === 'All' || blocker.status === statusFilter) &&
        (priorityFilter === 'All' || blocker.priority === priorityFilter)
    );
  }, [baseBlockers, statusFilter, priorityFilter]);

  return (
    <div className="blocker-list-page">
      <div className="blocker-list-page__header">
        <h1 className="blocker-list-page__title">{title}</h1>
        <p className="blocker-list-page__subtitle">
          {scope === 'active'
            ? 'Blockers that are still open or in progress for the current sprint.'
            : 'All blockers detected for the current sprint.'}
        </p>
      </div>

      <div className="blocker-list-page__filters">
        <div className="blocker-list-page__filter-group">
          <span className="blocker-list-page__filter-label">Status</span>
          <div className="blocker-list-page__pill-row">
            {(scope === 'active' ? ['All', 'Open', 'In Progress'] : STATUS_OPTIONS).map(
              (status) => (
                <button
                  type="button"
                  key={status}
                  className={`blocker-list-page__pill ${
                    statusFilter === status ? 'blocker-list-page__pill--active' : ''
                  }`}
                  onClick={() => setStatusFilter(status)}
                >
                  {status}
                </button>
              )
            )}
          </div>
        </div>

        <div className="blocker-list-page__filter-group">
          <span className="blocker-list-page__filter-label">Priority</span>
          <div className="blocker-list-page__pill-row">
            {PRIORITY_OPTIONS.map((priority) => (
              <button
                type="button"
                key={priority}
                className={`blocker-list-page__pill ${
                  priorityFilter === priority ? 'blocker-list-page__pill--active' : ''
                }`}
                onClick={() => setPriorityFilter(priority)}
              >
                {priority}
              </button>
            ))}
          </div>
        </div>
      </div>

      <BlockerTable
        title={`${filtered.length} blocker${filtered.length === 1 ? '' : 's'}`}
        blockers={filtered}
        onRowClick={openBlockerDetail}
        emptyMessage="No blockers match the selected filters."
      />
    </div>
  );
}

export default BlockerListPage;

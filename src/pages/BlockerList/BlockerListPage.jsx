import { useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Plus } from 'lucide-react';
import BlockerTable from '../../components/dashboard/BlockerTable.jsx';
import BlockerFilters from '../../components/blockers/BlockerFilters.jsx';
import BlockerForm from '../../components/blockers/BlockerForm.jsx';
import Button from '../../components/ui/Button.jsx';
import { useBlockers } from '../../context/BlockerContext.jsx';
import './BlockerListPage.css';

const ACTIVE_STATUS_OPTIONS = ['All', 'Open', 'In Progress', 'Blocked'];
const ALL_STATUS_OPTIONS = ['All', 'Open', 'In Progress', 'Blocked', 'Resolved', 'Closed'];

// Shared by both /active-blockers and /blocker-list. `scope="active"` shows
// only unresolved/unclosed blockers for the current sprint (Active
// Blockers); `scope="all"` shows every blocker for the sprint (Blocker
// List). Both now support the full Phase 3 filter set plus creating new
// blockers via "+ Report Blocker".
function BlockerListPage({ scope, title }) {
  const location = useLocation();
  const { blockers, activeBlockers, openBlockerDetail } = useBlockers();

  const baseBlockers = scope === 'active' ? activeBlockers : blockers;
  const statusOptions = scope === 'active' ? ACTIVE_STATUS_OPTIONS : ALL_STATUS_OPTIONS;

  const [statusFilter, setStatusFilter] = useState(location.state?.statusFilter || 'All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [sourceFilter, setSourceFilter] = useState('All');
  const [assigneeFilter, setAssigneeFilter] = useState('All');
  const [showCreateForm, setShowCreateForm] = useState(false);

  const filtered = useMemo(() => {
    return baseBlockers.filter(
      (blocker) =>
        (statusFilter === 'All' || blocker.status === statusFilter) &&
        (priorityFilter === 'All' || blocker.priority === priorityFilter) &&
        (sourceFilter === 'All' || blocker.source === sourceFilter) &&
        (assigneeFilter === 'All' || blocker.assignedTo === assigneeFilter)
    );
  }, [baseBlockers, statusFilter, priorityFilter, sourceFilter, assigneeFilter]);

  return (
    <div className="blocker-list-page">
      <div className="blocker-list-page__header">
        <div>
          <h1 className="blocker-list-page__title">{title}</h1>
          <p className="blocker-list-page__subtitle">
            {scope === 'active'
              ? 'Blockers that still need attention for the selected sprint.'
              : 'Every blocker detected for the selected sprint.'}
          </p>
        </div>
        <Button onClick={() => setShowCreateForm(true)}>
          <Plus size={16} />
          Report Blocker
        </Button>
      </div>

      <BlockerFilters
        statusOptions={statusOptions}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        priorityFilter={priorityFilter}
        onPriorityChange={setPriorityFilter}
        sourceFilter={sourceFilter}
        onSourceChange={setSourceFilter}
        assigneeFilter={assigneeFilter}
        onAssigneeChange={setAssigneeFilter}
      />

      <BlockerTable
        title={`${filtered.length} blocker${filtered.length === 1 ? '' : 's'}`}
        blockers={filtered}
        onRowClick={openBlockerDetail}
        emptyMessage="No blockers match the selected filters."
        detailed
      />

      {showCreateForm && (
        <BlockerForm mode="create" onClose={() => setShowCreateForm(false)} />
      )}
    </div>
  );
}

export default BlockerListPage;

import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SummaryCard from '../../components/dashboard/SummaryCard.jsx';
import SprintSelector from '../../components/dashboard/SprintSelector.jsx';
import PriorityChart from '../../components/dashboard/PriorityChart.jsx';
import SourceChart from '../../components/dashboard/SourceChart.jsx';
import BlockerTable from '../../components/dashboard/BlockerTable.jsx';
import SprintHealthCard from '../../components/dashboard/SprintHealthCard.jsx';
import { useAuth } from '../../auth/AuthContext.jsx';
import { useBlockers } from '../../context/BlockerContext.jsx';
import './Dashboard.css';

// Where each summary card sends the Scrum Master. Active Blockers goes to
// its own page; In Progress / Resolved go to the general Blocker List
// pre-filtered by status (that page is a lightweight Phase 2 view — full
// search/sort/assign management lands in Phase 3).
function useSummaryCardActions(navigate) {
  return {
    'active-blockers': () => navigate('/active-blockers'),
    'in-progress': () => navigate('/blocker-list', { state: { statusFilter: 'In Progress' } }),
    resolved: () => navigate('/blocker-list', { state: { statusFilter: 'Resolved' } }),
    // 'avg-resolution' intentionally has no action — it's informative only.
  };
}

function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const {
    summary,
    priorityBreakdown,
    sourceBreakdown,
    sprintHealth,
    activeBlockers,
    openBlockerDetail,
  } = useBlockers();

  const [selectedPriority, setSelectedPriority] = useState(null);
  const [selectedSource, setSelectedSource] = useState(null);

  const cardActions = useSummaryCardActions(navigate);

  function togglePriority(priority) {
    setSelectedPriority((prev) => (prev === priority ? null : priority));
  }

  function toggleSource(source) {
    setSelectedSource((prev) => (prev === source ? null : source));
  }

  const filteredBlockers = useMemo(() => {
    return activeBlockers.filter(
      (blocker) =>
        (!selectedPriority || blocker.priority === selectedPriority) &&
        (!selectedSource || blocker.source === selectedSource)
    );
  }, [activeBlockers, selectedPriority, selectedSource]);

  return (
    <div className="dashboard">
      <div className="dashboard__header">
        <div>
          <h1 className="dashboard__title">Welcome, {user?.name}!</h1>
          <p className="dashboard__subtitle">
            Here's an overview of your team's blockers and sprint health.
          </p>
        </div>
        <SprintSelector />
      </div>

      <div className="dashboard__summary-grid">
        {summary.map((card) => (
          <SummaryCard key={card.id} {...card} onClick={cardActions[card.id]} />
        ))}
      </div>

      <div className="dashboard__charts-grid">
        <PriorityChart
          data={priorityBreakdown}
          activeCount={activeBlockers.length}
          selectedPriority={selectedPriority}
          onSelectPriority={togglePriority}
        />
        <SourceChart
          data={sourceBreakdown}
          selectedSource={selectedSource}
          onSelectSource={toggleSource}
        />
      </div>

      <div className="dashboard__bottom-grid">
        <BlockerTable
          blockers={filteredBlockers}
          onRowClick={openBlockerDetail}
          emptyMessage="No active blockers match the selected filter."
        />
        <SprintHealthCard {...sprintHealth} />
      </div>
    </div>
  );
}

export default Dashboard;

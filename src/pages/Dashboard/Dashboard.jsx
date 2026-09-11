import SummaryCard from '../../components/dashboard/SummaryCard.jsx';
import SprintSelector from '../../components/dashboard/SprintSelector.jsx';
import PriorityChart from '../../components/dashboard/PriorityChart.jsx';
import SourceChart from '../../components/dashboard/SourceChart.jsx';
import BlockerTable from '../../components/dashboard/BlockerTable.jsx';
import SprintHealthCard from '../../components/dashboard/SprintHealthCard.jsx';
import { summaryCards } from '../../data/dashboardData.js';
import { useAuth } from '../../auth/AuthContext.jsx';
import './Dashboard.css';

function Dashboard() {
  const { user } = useAuth();

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
        {summaryCards.map((card) => (
          <SummaryCard key={card.id} {...card} />
        ))}
      </div>

      <div className="dashboard__charts-grid">
        <PriorityChart />
        <SourceChart />
      </div>

      <div className="dashboard__bottom-grid">
        <BlockerTable />
        <SprintHealthCard />
      </div>
    </div>
  );
}

export default Dashboard;

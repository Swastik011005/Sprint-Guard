import { Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './components/common/AppLayout.jsx';
import Login from './pages/Login/Login.jsx';
import RoleSelection from './pages/RoleSelection/RoleSelection.jsx';
import Dashboard from './pages/Dashboard/Dashboard.jsx';
import PlaceholderPage from './pages/Placeholder/PlaceholderPage.jsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/role-selection" element={<RoleSelection />} />

      <Route element={<AppLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route
          path="/active-blockers"
          element={<PlaceholderPage title="Active Blockers" />}
        />
        <Route
          path="/blocker-list"
          element={<PlaceholderPage title="Blocker List" />}
        />
        <Route path="/analytics" element={<PlaceholderPage title="Analytics" />} />
        <Route
          path="/team-status"
          element={<PlaceholderPage title="Team Status" />}
        />
        <Route path="/reports" element={<PlaceholderPage title="Reports" />} />
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;

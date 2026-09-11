import { Routes, Route } from 'react-router-dom';
import AppLayout from './components/common/AppLayout.jsx';
import Login from './pages/Login/Login.jsx';
import RoleSelection from './pages/RoleSelection/RoleSelection.jsx';
import Dashboard from './pages/Dashboard/Dashboard.jsx';
import PlaceholderPage from './pages/Placeholder/PlaceholderPage.jsx';
import ProtectedRoute, {
  RootRedirect,
  RedirectIfAuthenticated,
  RequireAuthenticated,
  RequireAuthAndRole,
} from './auth/ProtectedRoute.jsx';
import { PERMISSIONS } from './auth/permissions.js';

function App() {
  return (
    <Routes>
      <Route path="/" element={<RootRedirect />} />

      <Route
        path="/login"
        element={
          <RedirectIfAuthenticated>
            <Login />
          </RedirectIfAuthenticated>
        }
      />

      <Route
        path="/role-selection"
        element={
          <RequireAuthenticated>
            <RoleSelection />
          </RequireAuthenticated>
        }
      />

      <Route element={<RequireAuthAndRole />}>
        <Route element={<AppLayout />}>
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute permission={PERMISSIONS.ACCESS_DASHBOARD}>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/active-blockers"
            element={
              <ProtectedRoute permission={PERMISSIONS.MANAGE_BLOCKERS}>
                <PlaceholderPage title="Active Blockers" />
              </ProtectedRoute>
            }
          />
          <Route
            path="/blocker-list"
            element={
              <ProtectedRoute permission={PERMISSIONS.MANAGE_BLOCKERS}>
                <PlaceholderPage title="Blocker List" />
              </ProtectedRoute>
            }
          />
          <Route
            path="/analytics"
            element={
              <ProtectedRoute permission={PERMISSIONS.ACCESS_ANALYTICS}>
                <PlaceholderPage title="Analytics" />
              </ProtectedRoute>
            }
          />
          <Route
            path="/team-status"
            element={
              <ProtectedRoute permission={PERMISSIONS.VIEW_TEAM}>
                <PlaceholderPage title="Team Status" />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reports"
            element={
              <ProtectedRoute permission={PERMISSIONS.VIEW_REPORTS}>
                <PlaceholderPage title="Reports" />
              </ProtectedRoute>
            }
          />
        </Route>
      </Route>

      <Route path="*" element={<RootRedirect />} />
    </Routes>
  );
}

export default App;

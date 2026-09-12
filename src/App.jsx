import { Routes, Route } from 'react-router-dom';
import AppLayout from './components/common/AppLayout.jsx';
import Login from './pages/Login/Login.jsx';
import RoleSelection from './pages/RoleSelection/RoleSelection.jsx';
import Dashboard from './pages/Dashboard/Dashboard.jsx';
import BlockerListPage from './pages/BlockerList/BlockerListPage.jsx';
import PlaceholderPage from './pages/Placeholder/PlaceholderPage.jsx';
import ProtectedRoute, {
  RootRedirect,
  RedirectIfAuthenticated,
  RequireAuthenticated,
  RequireAuthAndRole,
} from './auth/ProtectedRoute.jsx';
import { PERMISSIONS } from './auth/permissions.js';
import { BlockerProvider } from './context/BlockerContext.jsx';

// Wrapping AppLayout in BlockerProvider (rather than wrapping the whole app
// in main.jsx) keeps blocker/sprint state scoped to the authenticated
// product shell — Login and Role Selection don't need it.
function ProtectedAppShell() {
  return (
    <BlockerProvider>
      <AppLayout />
    </BlockerProvider>
  );
}

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
        <Route element={<ProtectedAppShell />}>
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
                <BlockerListPage scope="active" title="Active Blockers" />
              </ProtectedRoute>
            }
          />
          <Route
            path="/blocker-list"
            element={
              <ProtectedRoute permission={PERMISSIONS.MANAGE_BLOCKERS}>
                <BlockerListPage scope="all" title="Blocker List" />
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

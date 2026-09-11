import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext.jsx';
import { getDashboardPath } from './permissions.js';
import AccessDenied from '../pages/AccessDenied/AccessDenied.jsx';

// All the route-guarding building blocks live in this one file — they're
// small and conceptually one thing ("who is allowed to see this route").

// Used at "/". Sends the visitor to whichever step of
// login -> role-selection -> dashboard they actually belong at.
export function RootRedirect() {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;
  if (!user.role) return <Navigate to="/role-selection" replace />;
  return <Navigate to={getDashboardPath(user.role)} replace />;
}

// Wraps /login. An already-authenticated visitor shouldn't see the login
// form again — send them wherever they were already headed.
export function RedirectIfAuthenticated({ children }) {
  const { user } = useAuth();

  if (user && !user.role) return <Navigate to="/role-selection" replace />;
  if (user && user.role) return <Navigate to={getDashboardPath(user.role)} replace />;
  return children;
}

// Wraps /role-selection. You must be logged in to pick a role, but you can
// revisit this page even after already choosing one (settings will offer a
// "change role" path later).
export function RequireAuthenticated({ children }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return children;
}

// Layout-level guard for everything inside AppLayout (Dashboard + the
// sidebar pages). Must be logged in AND have a role selected.
export function RequireAuthAndRole() {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;
  if (!user.role) return <Navigate to="/role-selection" replace />;
  return <Outlet />;
}

// Per-route permission gate. The visitor is already known to be logged in
// and role-selected by the time this runs (it sits inside
// RequireAuthAndRole) — this only decides whether *their role* covers the
// permission this page needs.
function ProtectedRoute({ permission, children }) {
  const { can } = useAuth();

  if (permission && !can(permission)) {
    return <AccessDenied />;
  }

  return children;
}

export default ProtectedRoute;

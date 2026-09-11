import { useNavigate } from 'react-router-dom';
import { ShieldOff } from 'lucide-react';
import Card from '../../components/ui/Card.jsx';
import Button from '../../components/ui/Button.jsx';
import { useAuth } from '../../auth/AuthContext.jsx';
import { getDashboardPath } from '../../auth/permissions.js';
import { getRoleName } from '../../data/mockRoles.js';
import './AccessDenied.css';

// Rendered by ProtectedRoute whenever the signed-in user's role doesn't
// carry the permission a route requires. Reusable as-is once Developer and
// Product Owner permissions are filled in.
function AccessDenied() {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="access-denied">
      <Card className="access-denied__card">
        <div className="access-denied__icon">
          <ShieldOff size={32} />
        </div>
        <h1 className="access-denied__title">Access Denied</h1>
        <p className="access-denied__message">
          Your current role{user?.role ? ` (${getRoleName(user.role)})` : ''} doesn't have
          permission to view this page.
        </p>
        <Button onClick={() => navigate(getDashboardPath(user?.role))}>
          Back to Dashboard
        </Button>
      </Card>
    </div>
  );
}

export default AccessDenied;

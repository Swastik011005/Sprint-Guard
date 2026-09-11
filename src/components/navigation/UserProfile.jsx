import { ChevronDown } from 'lucide-react';
import { useAuth } from '../../auth/AuthContext.jsx';
import { getRoleName } from '../../data/mockRoles.js';
import './UserProfile.css';

// Reads the real signed-in user from AuthContext, so this updates
// automatically on login/role-selection/logout.
function UserProfile() {
  const { user } = useAuth();
  if (!user) return null;

  return (
    <button type="button" className="user-profile">
      <span className="user-profile__avatar">{user.avatarInitial}</span>
      <span className="user-profile__text">
        <span className="user-profile__name">{user.name}</span>
        <span className="user-profile__role">{getRoleName(user.role)}</span>
      </span>
      <ChevronDown size={16} className="user-profile__chevron" />
    </button>
  );
}

export default UserProfile;

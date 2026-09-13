import { ChevronDown } from 'lucide-react';
import { useAuth } from '../../auth/AuthContext.jsx';
import { getRoleName } from '../../data/mockRoles.js';
import './UserProfile.css';

const AVAILABILITY_DOT = {
  Available: 'user-profile__status-dot--available',
  Away: 'user-profile__status-dot--away',
  'Do Not Disturb': 'user-profile__status-dot--dnd',
};

// Reads the real signed-in user from AuthContext, so this updates
// automatically on login/role-selection/logout. This is the *trigger*
// button for ProfileMenu's dropdown — `onClick` toggles it open/closed and
// `isOpen` rotates the chevron to match.
function UserProfile({ onClick, isOpen = false }) {
  const { user } = useAuth();
  if (!user) return null;

  return (
    <button type="button" className="user-profile" onClick={onClick} aria-expanded={isOpen}>
      <span className="user-profile__avatar-wrap">
        <span className="user-profile__avatar">{user.avatarInitial}</span>
        <span
          className={`user-profile__status-dot ${AVAILABILITY_DOT[user.availability] || ''}`}
        />
      </span>
      <span className="user-profile__text">
        <span className="user-profile__name">{user.name}</span>
        <span className="user-profile__role">{getRoleName(user.role)}</span>
      </span>
      <ChevronDown
        size={16}
        className={`user-profile__chevron ${isOpen ? 'user-profile__chevron--open' : ''}`}
      />
    </button>
  );
}

export default UserProfile;

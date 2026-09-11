import { ChevronDown } from 'lucide-react';
import { currentUser } from '../../data/mockUsers.js';
import './UserProfile.css';

// Reads from the mock "current user" object today; swap for real session
// data once auth exists — the markup/props shape won't need to change.
function UserProfile() {
  return (
    <button type="button" className="user-profile">
      <span className="user-profile__avatar">{currentUser.avatarInitial}</span>
      <span className="user-profile__text">
        <span className="user-profile__name">{currentUser.name}</span>
        <span className="user-profile__role">{currentUser.role}</span>
      </span>
      <ChevronDown size={16} className="user-profile__chevron" />
    </button>
  );
}

export default UserProfile;

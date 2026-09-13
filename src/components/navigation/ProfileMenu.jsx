import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Edit3, KeyRound, Settings as SettingsIcon, LogOut, Circle } from 'lucide-react';
import UserProfile from './UserProfile.jsx';
import AvailabilityPicker from './AvailabilityPicker.jsx';
import ProfileModal from './ProfileModal.jsx';
import { useAuth } from '../../auth/AuthContext.jsx';
import { getRoleName } from '../../data/mockRoles.js';
import './ProfileMenu.css';

// Wraps UserProfile (the avatar/name trigger) with the dropdown menu from
// the profile requirements: My Profile / Edit Profile / Change Password /
// Availability, then Settings / Logout. Modal screens (My Profile, Edit
// Profile, Change Password) are handled by the shared ProfileModal.
function ProfileMenu() {
  const [open, setOpen] = useState(false);
  const [modalView, setModalView] = useState(null);
  const rootRef = useRef(null);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  useEffect(() => {
    function handleClickOutside(event) {
      if (rootRef.current && !rootRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!user) return null;

  return (
    <div className="profile-menu" ref={rootRef}>
      <UserProfile onClick={() => setOpen((prev) => !prev)} isOpen={open} />

      {open && (
        <div className="profile-menu__dropdown">
          <div className="profile-menu__header">
            <span className="profile-menu__header-name">{user.name}</span>
            <span className="profile-menu__header-role">{getRoleName(user.role)}</span>
          </div>

          <div className="profile-menu__section">
            <button
              type="button"
              className="profile-menu__item"
              onClick={() => {
                setModalView('my-profile');
                setOpen(false);
              }}
            >
              <User size={16} />
              My Profile
            </button>
            <button
              type="button"
              className="profile-menu__item"
              onClick={() => {
                setModalView('edit-profile');
                setOpen(false);
              }}
            >
              <Edit3 size={16} />
              Edit Profile
            </button>
            <button
              type="button"
              className="profile-menu__item"
              onClick={() => {
                setModalView('change-password');
                setOpen(false);
              }}
            >
              <KeyRound size={16} />
              Change Password
            </button>
          </div>

          <div className="profile-menu__section">
            <div className="profile-menu__item profile-menu__item--label">
              <Circle size={16} />
              Availability
            </div>
            <AvailabilityPicker onSelect={() => setOpen(false)} />
          </div>

          <div className="profile-menu__section profile-menu__section--last">
            <button
              type="button"
              className="profile-menu__item"
              onClick={() => {
                navigate('/settings');
                setOpen(false);
              }}
            >
              <SettingsIcon size={16} />
              Settings
            </button>
            <button
              type="button"
              className="profile-menu__item profile-menu__item--danger"
              onClick={() => {
                logout();
                navigate('/login');
              }}
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>
      )}

      {modalView && <ProfileModal view={modalView} onClose={() => setModalView(null)} />}
    </div>
  );
}

export default ProfileMenu;

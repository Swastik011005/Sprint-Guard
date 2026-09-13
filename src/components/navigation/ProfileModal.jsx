import { useState } from 'react';
import { X, CheckCircle2 } from 'lucide-react';
import Input from '../ui/Input.jsx';
import Button from '../ui/Button.jsx';
import { useAuth } from '../../auth/AuthContext.jsx';
import { getRoleName } from '../../data/mockRoles.js';
import './ProfileModal.css';

// Handles the three simple profile screens from the dropdown/Settings:
// "my-profile" (read-only), "edit-profile" (name/email/avatar form), and
// "change-password" (mock-only, never persisted — there's no real password
// to change against). Rendered by whichever parent (ProfileMenu or the
// Settings page) opened it; `view` is fixed for the modal's lifetime.
function ProfileModal({ view, onClose }) {
  const { user, updateProfile } = useAuth();

  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [avatarText, setAvatarText] = useState(user?.avatarText || '');
  const [editError, setEditError] = useState('');

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  function handleEditSubmit(event) {
    event.preventDefault();
    if (!name.trim() || !email.trim()) {
      setEditError('Name and email are required.');
      return;
    }
    if (!email.includes('@')) {
      setEditError('Please enter a valid email address.');
      return;
    }
    updateProfile({ name: name.trim(), email: email.trim(), avatarText: avatarText.trim() || null });
    onClose();
  }

  function handlePasswordSubmit(event) {
    event.preventDefault();
    if (!currentPassword.trim() || !newPassword.trim() || !confirmPassword.trim()) {
      setPasswordError('Please fill in all three fields.');
      return;
    }
    if (newPassword.length < 6) {
      setPasswordError('New password must be at least 6 characters.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError("New password and confirmation don't match.");
      return;
    }
    // Mock only — there is no real backend/password to update against.
    setPasswordError('');
    setPasswordSuccess(true);
  }

  const titles = {
    'my-profile': 'My Profile',
    'edit-profile': 'Edit Profile',
    'change-password': 'Change Password',
  };

  return (
    <div className="profile-modal__overlay" onClick={onClose}>
      <div className="profile-modal" onClick={(event) => event.stopPropagation()}>
        <div className="profile-modal__header">
          <h2 className="profile-modal__title">{titles[view]}</h2>
          <button type="button" className="profile-modal__close" onClick={onClose} aria-label="Close">
            <X size={20} />
          </button>
        </div>

        {view === 'my-profile' && (
          <div className="profile-modal__readonly">
            <div className="profile-modal__avatar">{user?.avatarInitial}</div>
            <div className="profile-modal__field">
              <span className="profile-modal__field-label">Name</span>
              <span className="profile-modal__field-value">{user?.name}</span>
            </div>
            <div className="profile-modal__field">
              <span className="profile-modal__field-label">Email</span>
              <span className="profile-modal__field-value">{user?.email}</span>
            </div>
            <div className="profile-modal__field">
              <span className="profile-modal__field-label">Role</span>
              <span className="profile-modal__field-value">{getRoleName(user?.role)}</span>
            </div>
            <div className="profile-modal__field">
              <span className="profile-modal__field-label">Team</span>
              <span className="profile-modal__field-value">{user?.team}</span>
            </div>
          </div>
        )}

        {view === 'edit-profile' && (
          <form className="profile-modal__form" onSubmit={handleEditSubmit}>
            <label className="profile-modal__label">Display name</label>
            <Input value={name} onChange={(e) => setName(e.target.value)} />

            <label className="profile-modal__label">Email</label>
            <Input value={email} onChange={(e) => setEmail(e.target.value)} />

            <label className="profile-modal__label">Avatar initials (optional)</label>
            <Input
              value={avatarText}
              maxLength={2}
              placeholder={user?.name?.[0]?.toUpperCase()}
              onChange={(e) => setAvatarText(e.target.value.toUpperCase())}
            />

            {editError && <div className="profile-modal__error">{editError}</div>}

            <div className="profile-modal__actions">
              <Button type="button" variant="secondary" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">Save Changes</Button>
            </div>
          </form>
        )}

        {view === 'change-password' && (
          <form className="profile-modal__form" onSubmit={handlePasswordSubmit}>
            {passwordSuccess ? (
              <div className="profile-modal__success">
                <CheckCircle2 size={18} />
                <span>Password updated successfully.</span>
              </div>
            ) : (
              <>
                <label className="profile-modal__label">Current password</label>
                <Input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />

                <label className="profile-modal__label">New password</label>
                <Input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />

                <label className="profile-modal__label">Confirm new password</label>
                <Input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />

                {passwordError && <div className="profile-modal__error">{passwordError}</div>}
              </>
            )}

            <div className="profile-modal__actions">
              <Button type="button" variant="secondary" onClick={onClose}>
                {passwordSuccess ? 'Close' : 'Cancel'}
              </Button>
              {!passwordSuccess && <Button type="submit">Update Password</Button>}
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default ProfileModal;

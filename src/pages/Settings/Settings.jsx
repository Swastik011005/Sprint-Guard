import { useState } from 'react';
import { Edit3, KeyRound, Circle } from 'lucide-react';
import Card from '../../components/ui/Card.jsx';
import Button from '../../components/ui/Button.jsx';
import AvailabilityPicker from '../../components/navigation/AvailabilityPicker.jsx';
import ProfileModal from '../../components/navigation/ProfileModal.jsx';
import { useAuth } from '../../auth/AuthContext.jsx';
import { getRoleName } from '../../data/mockRoles.js';
import './Settings.css';

// Deliberately minimal for now — a proper multi-section Settings feature
// (notifications, preferences, appearance, security) is future work. This
// gives the profile dropdown's "Settings" link and the sidebar item
// somewhere real to go, reusing the same profile modals.
function Settings() {
  const { user } = useAuth();
  const [modalView, setModalView] = useState(null);

  return (
    <div className="settings-page">
      <h1 className="settings-page__title">Settings</h1>
      <p className="settings-page__subtitle">
        Manage your profile and preferences. More settings are coming soon.
      </p>

      <Card className="settings-page__section">
        <div className="settings-page__section-header">Profile</div>
        <div className="settings-page__profile-row">
          <span className="settings-page__avatar">{user?.avatarInitial}</span>
          <div>
            <div className="settings-page__name">{user?.name}</div>
            <div className="settings-page__meta">
              {user?.email} · {getRoleName(user?.role)} · {user?.team}
            </div>
          </div>
        </div>
        <div className="settings-page__actions">
          <Button variant="secondary" onClick={() => setModalView('edit-profile')}>
            <Edit3 size={16} />
            Edit Profile
          </Button>
          <Button variant="secondary" onClick={() => setModalView('change-password')}>
            <KeyRound size={16} />
            Change Password
          </Button>
        </div>
      </Card>

      <Card className="settings-page__section">
        <div className="settings-page__section-header">
          <Circle size={16} />
          Availability
        </div>
        <AvailabilityPicker />
      </Card>

      {modalView && <ProfileModal view={modalView} onClose={() => setModalView(null)} />}
    </div>
  );
}

export default Settings;

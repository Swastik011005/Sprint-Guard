import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Icons from 'lucide-react';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import Button from '../../components/ui/Button.jsx';
import { roles } from '../../data/mockRoles.js';
import { currentUser } from '../../data/mockUsers.js';
import './RoleSelection.css';

function RoleSelection() {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState(null);

  function handleConfirm() {
    // In a real build this would persist the selected role to the user's
    // session/profile. For now it just proceeds to the dashboard.
    navigate('/dashboard');
  }

  return (
    <div className="role-selection">
      <header className="role-selection__header">
        <div className="role-selection__brand">
          <ShieldCheck size={22} />
          <span>Sprint Guard</span>
        </div>
        <div className="role-selection__user">
          <span className="role-selection__user-avatar">
            {currentUser.avatarInitial}
          </span>
          <span>{currentUser.name}</span>
        </div>
      </header>

      <main className="role-selection__main">
        <h1 className="role-selection__title">Select Your Role</h1>
        <p className="role-selection__subtitle">Please select your role to continue</p>

        <div className="role-selection__cards">
          {roles.map((role) => {
            const Icon = Icons[role.icon] || Icons.User;
            const isSelected = selectedRole === role.id;

            return (
              <button
                type="button"
                key={role.id}
                className={`role-card ${isSelected ? 'role-card--selected' : ''}`}
                onClick={() => setSelectedRole(role.id)}
              >
                <span className="role-card__icon">
                  <Icon size={28} />
                </span>
                <span className="role-card__name">{role.name}</span>
                <span className="role-card__description">{role.description}</span>
                <span
                  className={`role-card__radio ${isSelected ? 'role-card__radio--checked' : ''}`}
                />
              </button>
            );
          })}
        </div>

        <Button
          className="role-selection__confirm"
          disabled={!selectedRole}
          onClick={handleConfirm}
        >
          CONFIRM &amp; CONTINUE <ArrowRight size={18} />
        </Button>

        <p className="role-selection__note">
          Note: You can change your role later from settings.
        </p>
      </main>
    </div>
  );
}

export default RoleSelection;

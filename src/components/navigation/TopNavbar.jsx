import { useNavigate } from 'react-router-dom';
import { Settings, Menu } from 'lucide-react';
import SearchBar from './SearchBar.jsx';
import NotificationPanel from './NotificationPanel.jsx';
import ProfileMenu from './ProfileMenu.jsx';
import './TopNavbar.css';

function TopNavbar({ onMenuClick }) {
  const navigate = useNavigate();

  return (
    <header className="top-navbar">
      <button
        type="button"
        className="top-navbar__menu-btn"
        aria-label="Toggle navigation"
        onClick={onMenuClick}
      >
        <Menu size={22} />
      </button>

      <SearchBar />

      <div className="top-navbar__actions">
        <NotificationPanel />
        <button
          type="button"
          className="top-navbar__icon-btn"
          aria-label="Settings"
          onClick={() => navigate('/settings')}
        >
          <Settings size={19} />
        </button>
        <span className="top-navbar__divider" />
        <ProfileMenu />
      </div>
    </header>
  );
}

export default TopNavbar;

import { Bell, Settings, Menu } from 'lucide-react';
import SearchBar from './SearchBar.jsx';
import UserProfile from './UserProfile.jsx';
import './TopNavbar.css';

// Notification and settings icons are visual placeholders for now — real
// behaviour lands once those features are built on their own branches.
function TopNavbar({ onMenuClick }) {
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
        <button type="button" className="top-navbar__icon-btn" aria-label="Notifications">
          <Bell size={19} />
        </button>
        <button type="button" className="top-navbar__icon-btn" aria-label="Settings">
          <Settings size={19} />
        </button>
        <span className="top-navbar__divider" />
        <UserProfile />
      </div>
    </header>
  );
}

export default TopNavbar;

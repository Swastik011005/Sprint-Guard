import { Settings, Menu } from 'lucide-react';
import SearchBar from './SearchBar.jsx';
import NotificationPanel from './NotificationPanel.jsx';
import UserProfile from './UserProfile.jsx';
import './TopNavbar.css';

// Settings icon remains a visual placeholder — real behaviour lands in
// Phase 5. Notifications are now a functional dropdown (NotificationPanel).
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
        <NotificationPanel />
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

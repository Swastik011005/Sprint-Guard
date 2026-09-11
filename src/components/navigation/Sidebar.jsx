import { NavLink, useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  LayoutDashboard,
  AlertTriangle,
  ClipboardList,
  BarChart3,
  Users,
  FileText,
  LogOut,
} from 'lucide-react';
import './Sidebar.css';

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/active-blockers', label: 'Active Blockers', icon: AlertTriangle },
  { to: '/blocker-list', label: 'Blocker List', icon: ClipboardList },
  { to: '/analytics', label: 'Analytics', icon: BarChart3 },
  { to: '/team-status', label: 'Team Status', icon: Users },
  { to: '/reports', label: 'Reports', icon: FileText },
];

function Sidebar({ isOpen = false, onNavigate }) {
  const navigate = useNavigate();

  return (
    <aside className={`sidebar ${isOpen ? 'sidebar--open' : ''}`}>
      <div className="sidebar__brand">
        <ShieldCheck size={26} strokeWidth={2.2} />
        <div className="sidebar__brand-text">
          <span className="sidebar__brand-name">SPRINT GUARD</span>
          <span className="sidebar__brand-tagline">Detect. Alert. Resolve. Deliver.</span>
        </div>
      </div>

      <nav className="sidebar__nav">
        <ul>
          {navItems.map(({ to, label, icon: Icon }) => (
            <li key={to}>
              <NavLink
                to={to}
                onClick={onNavigate}
                className={({ isActive }) =>
                  `sidebar__link ${isActive ? 'sidebar__link--active' : ''}`
                }
              >
                <Icon size={18} />
                <span>{label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="sidebar__footer">
        <button
          type="button"
          className="sidebar__link sidebar__logout"
          onClick={() => navigate('/login')}
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;

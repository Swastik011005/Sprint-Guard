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
import { useAuth } from '../../auth/AuthContext.jsx';
import { PERMISSIONS } from '../../auth/permissions.js';
import './Sidebar.css';

// Each item declares the permission it needs — the sidebar only ever shows
// what the signed-in role can actually open, instead of every link for
// everyone. Adding Developer/Product Owner items later just means adding
// entries with their own `permission`.
const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, permission: PERMISSIONS.ACCESS_DASHBOARD },
  { to: '/active-blockers', label: 'Active Blockers', icon: AlertTriangle, permission: PERMISSIONS.MANAGE_BLOCKERS },
  { to: '/blocker-list', label: 'Blocker List', icon: ClipboardList, permission: PERMISSIONS.MANAGE_BLOCKERS },
  { to: '/analytics', label: 'Analytics', icon: BarChart3, permission: PERMISSIONS.ACCESS_ANALYTICS },
  { to: '/team-status', label: 'Team Status', icon: Users, permission: PERMISSIONS.VIEW_TEAM },
  { to: '/reports', label: 'Reports', icon: FileText, permission: PERMISSIONS.VIEW_REPORTS },
];

function Sidebar({ isOpen = false, onNavigate }) {
  const navigate = useNavigate();
  const { can, logout } = useAuth();
  const visibleItems = navItems.filter((item) => can(item.permission));

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
          {visibleItems.map(({ to, label, icon: Icon }) => (
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
          onClick={() => {
            logout();
            navigate('/login');
          }}
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;

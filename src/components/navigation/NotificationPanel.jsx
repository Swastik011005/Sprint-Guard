import { useEffect, useRef, useState } from 'react';
import { Bell, AlertTriangle, CheckCircle2, Activity, Clock } from 'lucide-react';
import { useBlockers } from '../../context/BlockerContext.jsx';
import './NotificationPanel.css';

const TYPE_ICON = {
  critical: AlertTriangle,
  resolved: CheckCircle2,
  health: Activity,
  stale: Clock,
};

// Self-contained bell button + dropdown. Reads/writes notification state
// from BlockerContext so read/unread status and the unread badge count stay
// consistent no matter where the panel is opened from.
function NotificationPanel() {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);
  const {
    notifications,
    unreadNotificationCount,
    markNotificationRead,
    markAllNotificationsRead,
    openBlockerDetail,
  } = useBlockers();

  useEffect(() => {
    function handleClickOutside(event) {
      if (rootRef.current && !rootRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function handleNotificationClick(notification) {
    markNotificationRead(notification.id);
    if (notification.blockerId) {
      openBlockerDetail(notification.blockerId);
    }
    setOpen(false);
  }

  return (
    <div className="notification-panel" ref={rootRef}>
      <button
        type="button"
        className="top-navbar__icon-btn notification-panel__trigger"
        aria-label="Notifications"
        onClick={() => setOpen((prev) => !prev)}
      >
        <Bell size={19} />
        {unreadNotificationCount > 0 && (
          <span className="notification-panel__badge">{unreadNotificationCount}</span>
        )}
      </button>

      {open && (
        <div className="notification-panel__menu">
          <div className="notification-panel__header">
            <span>Notifications</span>
            {unreadNotificationCount > 0 && (
              <button
                type="button"
                className="notification-panel__mark-all"
                onClick={markAllNotificationsRead}
              >
                Mark all as read
              </button>
            )}
          </div>

          <ul className="notification-panel__list">
            {notifications.length === 0 && (
              <li className="notification-panel__empty">You're all caught up.</li>
            )}
            {notifications.map((notification) => {
              const Icon = TYPE_ICON[notification.type] || Bell;
              return (
                <li key={notification.id}>
                  <button
                    type="button"
                    className={`notification-panel__item ${
                      !notification.read ? 'notification-panel__item--unread' : ''
                    }`}
                    onClick={() => handleNotificationClick(notification)}
                  >
                    <span className="notification-panel__item-icon">
                      <Icon size={16} />
                    </span>
                    <span className="notification-panel__item-text">
                      <span className="notification-panel__item-message">
                        {notification.message}
                      </span>
                      <span className="notification-panel__item-time">
                        {notification.timestamp}
                      </span>
                    </span>
                    {!notification.read && <span className="notification-panel__dot" />}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

export default NotificationPanel;

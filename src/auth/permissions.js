// Centralized permission architecture for Sprint Guard.
//
// Every permission a role could ever need is declared here, even ones no
// role currently uses. That way adding the Developer and Product Owner
// roles later is a matter of filling in their row below — not redesigning
// this file or touching every component that checks a permission.

export const PERMISSIONS = {
  ACCESS_DASHBOARD: 'canAccessDashboard',
  ACCESS_ANALYTICS: 'canAccessAnalytics',
  ACCESS_SETTINGS: 'canAccessSettings',
  MANAGE_BLOCKERS: 'canManageBlockers',
  MANAGE_USERS: 'canManageUsers',
  MANAGE_ROLES: 'canManageRoles',
  VIEW_TEAM: 'canViewTeam',
  VIEW_REPORTS: 'canViewReports',
  MANAGE_SPRINTS: 'canManageSprints',
  USE_INTEGRATIONS: 'canUseIntegrations',
};

// role id -> permission map. Only Scrum Master is filled in for this phase.
// Developer and Product Owner are intentionally left as "everything off"
// placeholders so the shape already exists when those roles are built.
const ROLE_PERMISSIONS = {
  'scrum-master': {
    [PERMISSIONS.ACCESS_DASHBOARD]: true,
    [PERMISSIONS.ACCESS_ANALYTICS]: true,
    [PERMISSIONS.ACCESS_SETTINGS]: true,
    [PERMISSIONS.MANAGE_BLOCKERS]: true,
    [PERMISSIONS.MANAGE_USERS]: false,
    [PERMISSIONS.MANAGE_ROLES]: false,
    [PERMISSIONS.VIEW_TEAM]: true,
    [PERMISSIONS.VIEW_REPORTS]: true,
    [PERMISSIONS.MANAGE_SPRINTS]: true,
    [PERMISSIONS.USE_INTEGRATIONS]: false,
  },
  // To be defined when the Developer role is implemented.
  developer: {
    [PERMISSIONS.ACCESS_DASHBOARD]: false,
    [PERMISSIONS.ACCESS_ANALYTICS]: false,
    [PERMISSIONS.ACCESS_SETTINGS]: false,
    [PERMISSIONS.MANAGE_BLOCKERS]: false,
    [PERMISSIONS.MANAGE_USERS]: false,
    [PERMISSIONS.MANAGE_ROLES]: false,
    [PERMISSIONS.VIEW_TEAM]: false,
    [PERMISSIONS.VIEW_REPORTS]: false,
    [PERMISSIONS.MANAGE_SPRINTS]: false,
    [PERMISSIONS.USE_INTEGRATIONS]: false,
  },
  // To be defined when the Product Owner role is implemented.
  'product-owner': {
    [PERMISSIONS.ACCESS_DASHBOARD]: false,
    [PERMISSIONS.ACCESS_ANALYTICS]: false,
    [PERMISSIONS.ACCESS_SETTINGS]: false,
    [PERMISSIONS.MANAGE_BLOCKERS]: false,
    [PERMISSIONS.MANAGE_USERS]: false,
    [PERMISSIONS.MANAGE_ROLES]: false,
    [PERMISSIONS.VIEW_TEAM]: false,
    [PERMISSIONS.VIEW_REPORTS]: false,
    [PERMISSIONS.MANAGE_SPRINTS]: false,
    [PERMISSIONS.USE_INTEGRATIONS]: false,
  },
};

// Where a role lands after selecting it / logging back in. Only Scrum
// Master has a real destination today; everything else falls back to
// /dashboard until that role's own dashboard exists.
const ROLE_DASHBOARD_PATH = {
  'scrum-master': '/dashboard',
};

export function getPermissionsForRole(role) {
  return ROLE_PERMISSIONS[role] || {};
}

export function getDashboardPath(role) {
  return ROLE_DASHBOARD_PATH[role] || '/dashboard';
}

// Answers "can this user do X?" — the single place every component/route
// guard should call instead of reading role strings directly.
export function can(user, permissionKey) {
  if (!user || !user.role) return false;
  const permissions = getPermissionsForRole(user.role);
  return !!permissions[permissionKey];
}

// Roles offered on the Role Selection screen.
// `icon` holds a lucide-react icon name, resolved in RoleSelection.jsx.
export const roles = [
  {
    id: 'developer',
    name: 'Developer',
    description: 'Report blockers, track your tasks and collaborate with the team.',
    icon: 'Code2',
  },
  {
    id: 'scrum-master',
    name: 'Scrum Master',
    description: 'Monitor blockers, get real-time alerts and take actions to unblock the team.',
    icon: 'ShieldCheck',
  },
  {
    id: 'product-owner',
    name: 'Product Owner',
    description: 'View blocker impact on sprint goals and manage priorities.',
    icon: 'ClipboardList',
  },
];

// Turns a role id (e.g. "scrum-master") into its display label (e.g.
// "Scrum Master") wherever a role needs to be shown as text.
export function getRoleName(roleId) {
  return roles.find((role) => role.id === roleId)?.name || roleId;
}

// The signed-in "current user" now lives in src/auth/AuthContext.jsx
// (useAuth().user) so it can actually change on login/role-selection/logout
// instead of being a fixed constant. This file just keeps the mock team
// directory used elsewhere.

// Simple mock directory used by the top-bar search to match "team members".
export const teamMembers = [
  { id: 'u1', name: 'Swastik', role: 'Scrum Master' },
  { id: 'u2', name: 'Ayaan', role: 'Developer' },
  { id: 'u3', name: 'Jai', role: 'Developer' },
  { id: 'u4', name: 'Rohit', role: 'Product Owner' },
];

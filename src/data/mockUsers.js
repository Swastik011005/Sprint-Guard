// Mock "current user" object. Replace with real auth/session data later.
export const currentUser = {
  name: 'Swastik',
  role: 'Scrum Master',
  avatarInitial: 'S',
};

// Simple mock directory used by the top-bar search to match "team members".
export const teamMembers = [
  { id: 'u1', name: 'Swastik', role: 'Scrum Master' },
  { id: 'u2', name: 'Ayaan', role: 'Developer' },
  { id: 'u3', name: 'Jai', role: 'Developer' },
  { id: 'u4', name: 'Rohit', role: 'Product Owner' },
];

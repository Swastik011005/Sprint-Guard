import { createContext, useContext, useEffect, useState } from 'react';
import { getPermissionsForRole } from './permissions.js';

// This is MOCK authentication for prototyping the UI/UX and the
// role-based-access architecture. It does not verify credentials against
// any backend and must not be treated as real security. Swapping this out
// for a real auth API later should only mean rewriting login()/logout()
// below — everything that consumes useAuth() stays the same.

const STORAGE_KEY = 'sprintguard.auth';
const AuthContext = createContext(null);

function readStoredAccount() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function writeStoredAccount(account) {
  try {
    if (account) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(account));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  } catch {
    // localStorage can fail (private browsing, quota). Session just won't
    // persist across a refresh in that case — not fatal for a mock auth layer.
  }
}

// Turns "swastik.k@company.com" into "Swastik K" for display purposes.
function deriveNameFromEmail(email) {
  const local = email.split('@')[0] || email;
  const cleaned = local.replace(/[._-]+/g, ' ').trim();
  if (!cleaned) return 'User';
  return cleaned
    .split(' ')
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function AuthProvider({ children }) {
  const [account, setAccount] = useState(() => readStoredAccount());

  useEffect(() => {
    writeStoredAccount(account);
  }, [account]);

  // Returns { success, error } instead of throwing so the Login page can
  // show an inline validation message without a try/catch.
  function login(email, password) {
    if (!email?.trim() || !password?.trim()) {
      return {
        success: false,
        error: 'Please enter both an email/username and a password.',
      };
    }

    // A fresh login always starts the role-selection flow over, even if the
    // same account previously had a role picked.
    setAccount({
      id: `user-${Date.now()}`,
      name: deriveNameFromEmail(email),
      email: email.trim(),
      role: null,
    });

    return { success: true };
  }

  function selectRole(roleId) {
    setAccount((prev) => (prev ? { ...prev, role: roleId } : prev));
  }

  function logout() {
    setAccount(null);
  }

  const permissions = account?.role ? getPermissionsForRole(account.role) : {};

  const user = account
    ? {
        ...account,
        avatarInitial: account.name?.[0]?.toUpperCase() || '?',
        permissions,
      }
    : null;

  const value = {
    user,
    isAuthenticated: !!account,
    login,
    selectRole,
    logout,
    can: (permissionKey) => !!permissions[permissionKey],
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

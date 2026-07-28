import { createContext, useContext, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { ADMIN_CREDENTIALS, AUTH_STORAGE_KEY } from '../config/auth';

interface AuthContextValue {
  isAuthenticated: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => localStorage.getItem(AUTH_STORAGE_KEY) === 'true');

  const value = useMemo<AuthContextValue>(() => ({
    isAuthenticated,
    login: (username, password) => {
      const valid = username.trim() === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password;
      if (valid) {
        localStorage.setItem(AUTH_STORAGE_KEY, 'true');
        setIsAuthenticated(true);
      }
      return valid;
    },
    logout: () => {
      localStorage.removeItem(AUTH_STORAGE_KEY);
      setIsAuthenticated(false);
    },
  }), [isAuthenticated]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  return context;
}

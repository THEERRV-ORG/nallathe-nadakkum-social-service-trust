import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import type { AuthError, User } from 'firebase/auth';
import { onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import { auth, isAdminEmail, googleProvider, isFirebaseConfigured } from '../lib/firebase';

interface AuthContextValue {
  isAuthenticated: boolean;
  loading: boolean;
  user: User | null;
  authError: string;
  loginWithGoogle: () => Promise<boolean>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

function getFirebaseAuthMessage(error: unknown) {
  const authError = error as Partial<AuthError>;

  switch (authError.code) {
    case 'auth/unauthorized-domain':
      return 'This domain is not authorized in Firebase Authentication. Add localhost under Authorized domains.';
    case 'auth/popup-closed-by-user':
      return 'Google sign-in was closed before completion. Please try again.';
    case 'auth/popup-blocked':
      return 'Your browser blocked the Google sign-in popup. Please allow popups for localhost and try again.';
    case 'auth/api-key-not-valid':
      return 'Firebase API key is not valid. Please check the Firebase config in .env.';
    case 'auth/operation-not-allowed':
      return 'Google sign-in is not enabled in Firebase Authentication.';
    default:
      return authError.message
        ? `Google sign-in failed: ${authError.message}`
        : 'Google sign-in could not be completed. Please try again.';
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(isFirebaseConfigured);
  const [authError, setAuthError] = useState('');

  useEffect(() => {
    if (!auth) {
      setLoading(false);
      return undefined;
    }

    return onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        setUser(null);
        setLoading(false);
        return;
      }

      if (!isAdminEmail(firebaseUser.email)) {
        await signOut(auth);
        setUser(null);
        setAuthError('This Google account is not authorized for the admin portal.');
        setLoading(false);
        return;
      }

      setUser(firebaseUser);
      setAuthError('');
      setLoading(false);
    });
  }, []);

  const value = useMemo<AuthContextValue>(() => ({
    isAuthenticated: Boolean(user),
    loading,
    user,
    authError,
    loginWithGoogle: async () => {
      if (!auth) {
        setAuthError('Firebase is not configured yet. Add Firebase values and VITE_ADMIN_EMAIL to .env.');
        return false;
      }

      setAuthError('');
      let result;
      try {
        result = await signInWithPopup(auth, googleProvider);
      } catch (error) {
        setAuthError(getFirebaseAuthMessage(error));
        return false;
      }

      if (!isAdminEmail(result.user.email)) {
        await signOut(auth);
        setUser(null);
        setAuthError('This Google account is not authorized for the admin portal.');
        return false;
      }

      setUser(result.user);
      return true;
    },
    logout: async () => {
      if (auth) {
        await signOut(auth);
      }
      setUser(null);
    },
  }), [authError, loading, user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  return context;
}

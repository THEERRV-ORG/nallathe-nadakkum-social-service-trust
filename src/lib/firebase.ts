import { initializeApp, getApps } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Authorized admin accounts. Prefer VITE_ADMIN_EMAILS (comma-separated list);
// fall back to the legacy single VITE_ADMIN_EMAIL for backward compatibility.
export const allowedAdminEmails = (
  import.meta.env.VITE_ADMIN_EMAILS ?? import.meta.env.VITE_ADMIN_EMAIL ?? ''
)
  .split(',')
  .map((email: string) => email.trim().toLowerCase())
  .filter(Boolean);

/** True if the given email is on the admin allowlist. */
export function isAdminEmail(email: string | null | undefined) {
  return allowedAdminEmails.includes((email ?? '').trim().toLowerCase());
}

export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey &&
  firebaseConfig.authDomain &&
  firebaseConfig.projectId &&
  firebaseConfig.appId &&
  allowedAdminEmails.length > 0,
);

const app = isFirebaseConfigured
  ? getApps()[0] ?? initializeApp(firebaseConfig)
  : null;

export const auth = app ? getAuth(app) : null;
export const db = app ? getFirestore(app) : null;
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

export function requireFirestore() {
  if (!db) {
    throw new Error('Firebase is not configured. Add Firebase values and VITE_ADMIN_EMAIL to .env.');
  }
  return db;
}

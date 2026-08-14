import { useState } from 'react';
import { FaGoogle, FaLock, FaShieldHalved } from 'react-icons/fa6';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { ADMIN_DEFAULT_PATH } from '../config/auth';
import { useAuth } from '../context/AuthContext';

type LoginLocationState = {
  from?: {
    pathname?: string;
    search?: string;
  };
};

export default function LoginView() {
  const { isAuthenticated, loading, loginWithGoogle, authError } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LoginLocationState | null;
  const redirectTo = state?.from?.pathname?.startsWith('/admin')
    ? `${state.from.pathname}${state.from.search ?? ''}`
    : ADMIN_DEFAULT_PATH;

  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (!loading && isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  const handleGoogleSignIn = async () => {
    setError('');
    setSubmitting(true);
    try {
      const success = await loginWithGoogle();
      if (success) {
        navigate(redirectTo, { replace: true });
      }
    } catch (signInError) {
      setError(signInError instanceof Error ? signInError.message : 'Google sign-in could not be completed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f8fbf8] font-sans text-gray-900">
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 overflow-hidden">
        <img src="/logo.png" alt="" className="absolute -left-20 top-12 h-72 w-72 object-contain opacity-[0.035] grayscale" />
        <img src="/logo.png" alt="" className="absolute -bottom-24 -right-16 h-96 w-96 object-contain opacity-[0.035] grayscale" />
      </div>

      <section className="relative flex min-h-screen items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid w-full max-w-5xl overflow-hidden rounded-xl border border-emerald-100 bg-white shadow-[0_24px_70px_-42px_rgba(15,61,38,0.45)] lg:grid-cols-[0.9fr_1.1fr]">
          <aside className="flex min-h-[28rem] flex-col justify-between bg-emerald-950 px-6 py-8 text-white sm:px-8 lg:px-10">
            <div>
              <img
                src="/logo.png"
                alt="Nallathae Nadakkum Social Service Trust logo"
                className="h-16 w-16 object-contain"
              />
              <div className="mt-5">
                <h1 className="font-display text-2xl font-extrabold leading-tight">Nallathae Nadakkum</h1>
                <p className="mt-1 text-[11px] font-bold uppercase tracking-wider text-emerald-200">Social Service Trust</p>
              </div>
              <div className="mt-10 h-px w-16 bg-emerald-300/30" />
              <p className="mt-8 max-w-xs font-display text-2xl font-extrabold leading-tight text-emerald-50">
                Service to Humanity is Service to God
              </p>
              <p className="mt-5 max-w-sm text-sm leading-6 text-emerald-50/82">
                This administration portal is restricted to authorized personnel responsible for managing requests, volunteers, donations, gallery updates and trust operations.
              </p>
            </div>

            <p className="mt-10 text-xs font-semibold text-emerald-100">
              Secure • Private • Authorized Access
            </p>
          </aside>

          <section className="flex items-center bg-white px-6 py-8 sm:px-8 lg:px-12">
            <div className="w-full">
              <div className="flex items-start gap-4">
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100">
                  <FaLock className="h-4 w-4" />
                </span>
                <div>
                  <h2 className="font-display text-3xl font-extrabold tracking-tight text-emerald-950">Admin Login</h2>
                  <p className="mt-2 text-sm leading-6 text-gray-700">Sign in to access the administration dashboard.</p>
                </div>
              </div>

              <div className="my-7 h-px bg-gray-100" />

              <div className="space-y-5">
                {(error || authError) && (
                  <p className="rounded-lg border border-red-100 bg-red-50 px-3 py-2 text-xs font-semibold leading-5 text-red-700">
                    {error || authError}
                  </p>
                )}

                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  disabled={loading || submitting}
                  className="btn btn-primary min-h-12 w-full justify-center rounded-lg shadow-sm disabled:cursor-not-allowed disabled:bg-emerald-400"
                >
                  <FaGoogle className="h-4 w-4" />
                  {submitting || loading ? 'Checking Access...' : 'Sign In with Google'}
                </button>
              </div>

              <div className="mt-6 rounded-lg border border-emerald-100 bg-emerald-50/70 p-4">
                <div className="flex gap-3">
                  <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white text-emerald-700 ring-1 ring-emerald-100">
                    <FaShieldHalved className="h-3 w-3" />
                  </span>
                  <div>
                    <p className="text-xs font-extrabold text-emerald-950">Restricted Access</p>
                    <p className="mt-1 text-xs leading-5 text-gray-700">
                      This portal is intended only for authorized trust administrators.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}

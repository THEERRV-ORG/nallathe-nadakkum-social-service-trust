import { motion } from 'motion/react';
import { FaShieldHalved, FaXmark } from 'react-icons/fa6';

interface AdminPanelProps {
  lang: 'en' | 'ta';
  onClose: () => void;
}

/**
 * Placeholder modal retained to make the decommissioning explicit.
 * If a future team introduces a real staff dashboard, it should be backed by
 * server-side authentication, RBAC, and audit logging instead of client-only UI.
 */
export default function AdminPanel({ lang, onClose }: AdminPanelProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/55 backdrop-blur-xs">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl border border-gray-100 overflow-hidden"
      >
        <div className="bg-gray-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="h-8 w-8 bg-emerald-600 rounded-lg flex items-center justify-center text-sm font-bold">
              <FaShieldHalved className="h-4 w-4" />
            </div>
            <div>
              <h2 className="font-display text-sm sm:text-base font-bold tracking-tight">
                {lang === 'en' ? 'Operations Dashboard Disabled' : 'நிர்வாக பலகை முடக்கப்பட்டுள்ளது'}
              </h2>
              <p className="text-[10px] sm:text-xs text-gray-400">
                {lang === 'en' ? 'Sensitive workflows must move to a real server-side admin system.' : 'அதிக பாதுகாப்பு தேவைப்படும் நிர்வாக செயல்பாடுகள் சர்வர் சார்ந்த அமைப்புக்கு மாற்றப்பட வேண்டும்.'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-gray-800 rounded-lg text-gray-400 hover:text-white transition-colors cursor-pointer"
          >
            <FaXmark className="h-4 w-4" />
          </button>
        </div>

        <div className="p-6 sm:p-8 bg-slate-50 text-sm text-gray-700 space-y-4">
          <p>
            {lang === 'en'
              ? 'This repository does not contain a backend, authentication layer, or audit logging needed for a safe trustee dashboard. The previous browser-only implementation has been retired to avoid storing donor or beneficiary data in localStorage.'
              : 'இந்த நிரல்தொகுப்பில் பாதுகாப்பான நிர்வாக பலகைக்குத் தேவையான பின்னணி சேவை, அங்கீகாரம், audit பதிவு போன்றவை இல்லை. அதனால் browser localStorage-ல் நன்கொடையாளர் அல்லது பயனாளி தகவல்கள் சேமிக்கப்படாதவாறு முந்தைய அமைப்பு நிறுத்தப்பட்டுள்ளது.'}
          </p>
          <p>
            {lang === 'en'
              ? 'Recommended replacement: server-side authentication, MFA for trustees, role-based authorization, tamper-resistant audit logs, and a protected database.'
              : 'பரிந்துரைக்கப்படும் மாற்று: server-side authentication, trustees க்கு MFA, role-based authorization, tamper-resistant audit logs, மற்றும் பாதுகாக்கப்பட்ட தரவுத்தளம்.'}
          </p>
        </div>
      </motion.div>
    </div>
  );
}


import { useState } from 'react';
import { FaBars, FaXmark, FaGlobe } from 'react-icons/fa6';
import { navigationLabels } from '../data';

interface NavbarProps {
  lang: 'en' | 'ta';
  setLang: (lang: 'en' | 'ta') => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenAdmin: () => void;
}

export default function Navbar({ lang, setLang, activeTab, setActiveTab, onOpenAdmin }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-100 bg-white/95 backdrop-blur-md">
      {/* Full-width flex row — no max-w constraint so brand sits at the true left edge */}
      <div className="flex h-16 items-center gap-4 pl-3 pr-4 sm:pl-4 sm:pr-6 lg:pl-6 lg:pr-8">

        {/* ── Brand: logo + name ─────────────────────────────────── */}
        <button
          className="flex shrink-0 cursor-pointer items-center gap-2.5 focus:outline-none"
          onClick={() => { setActiveTab('home'); setIsMenuOpen(false); }}
          id="brand-logo"
          aria-label="Go to homepage"
        >
          <img
            src="/logo.png"
            alt="Nallathe Nadakkum Social Service Trust logo"
            className="h-10 w-10 rounded-full object-cover ring-2 ring-emerald-100 shrink-0"
          />
          <div className="whitespace-nowrap leading-tight">
            <span className="block font-display text-sm font-bold tracking-tight text-gray-900 sm:text-[15px]">
              {lang === 'en' ? 'Nallathe Nadakkum' : 'நல்லதே நடக்கும்'}
            </span>
            <span className="block text-[10px] font-semibold text-emerald-600 sm:text-[11px]">
              {lang === 'en' ? 'Social Service Trust' : 'சமூக சேவை அறக்கட்டளை'}
            </span>
          </div>
        </button>

        {/* ── Desktop nav — fills remaining space ────────────────── */}
        <nav className="hidden lg:flex flex-1 items-center justify-center gap-0.5 xl:gap-1 overflow-x-auto scrollbar-none">
          {navigationLabels.map((item) => (
            <button
              key={item.id}
              id={`nav-${item.id}`}
              onClick={() => setActiveTab(item.id)}
              className={`shrink-0 whitespace-nowrap rounded-md px-2.5 py-2 text-[11px] xl:text-xs font-medium transition-colors cursor-pointer ${
                activeTab === item.id
                  ? 'bg-emerald-50 text-emerald-700 font-semibold'
                  : 'text-gray-600 hover:text-emerald-600 hover:bg-gray-50'
              }`}
            >
              {item.label[lang]}
            </button>
          ))}
        </nav>

        {/* ── Actions: lang toggle · admin · hamburger ───────────── */}
        <div className="ml-auto flex shrink-0 items-center gap-2 sm:gap-3">

          {/* Language toggle */}
          <button
            id="lang-toggle"
            onClick={() => setLang(lang === 'en' ? 'ta' : 'en')}
            className="flex items-center gap-1 rounded-full border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer whitespace-nowrap"
            title={lang === 'en' ? 'தமிழ் பதிப்பிற்கு மாற்றவும்' : 'Switch to English version'}
          >
            <FaGlobe className="h-3.5 w-3.5 shrink-0 text-emerald-600" />
            <span>{lang === 'en' ? 'தமிழ்' : 'English'}</span>
          </button>

          {/* Admin shortcut */}
          <button
            onClick={onOpenAdmin}
            className="hidden sm:inline-flex items-center justify-center rounded-md p-1 text-xs text-gray-400 hover:text-emerald-600 transition-colors cursor-pointer"
            title="Trustee Dashboard"
            id="admin-btn-nav"
          >
            💼
          </button>

          {/* Mobile menu toggle */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="inline-flex lg:hidden items-center justify-center rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-colors cursor-pointer"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMenuOpen ? <FaXmark className="h-5 w-5" /> : <FaBars className="h-5 w-5" />}
          </button>
        </div>

      </div>

      {/* ── Mobile dropdown menu ──────────────────────────────────── */}
      {isMenuOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white">
          <div className="space-y-0.5 px-3 pb-3 pt-2">
            {navigationLabels.map((item) => (
              <button
                key={item.id}
                id={`mobile-nav-${item.id}`}
                onClick={() => { setActiveTab(item.id); setIsMenuOpen(false); }}
                className={`flex w-full items-center gap-2 rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
                  activeTab === item.id
                    ? 'bg-emerald-50 text-emerald-700 font-semibold border-l-4 border-emerald-600 pl-2'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-emerald-600'
                }`}
              >
                {item.label[lang]}
              </button>
            ))}
            <button
              onClick={() => { onOpenAdmin(); setIsMenuOpen(false); }}
              className="flex w-full items-center gap-2 rounded-md px-3 py-2.5 text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              💼 {lang === 'en' ? 'Trustee Dashboard' : 'நிர்வாகப் பலகை'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

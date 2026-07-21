import { useState } from 'react';
import { Menu, X, Globe, HeartHandshake } from 'lucide-react';
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
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          
          {/* Logo & Brand */}
          <div 
            className="flex cursor-pointer items-center space-x-3" 
            onClick={() => { setActiveTab('home'); setIsMenuOpen(false); }}
            id="brand-logo"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
              <HeartHandshake className="h-6 w-6" />
            </div>
            <div>
              <h1 className="font-display text-sm font-bold tracking-tight text-gray-900 sm:text-base leading-tight">
                {lang === 'en' ? 'Nallathe Nadakkum' : 'நல்லதே நடக்கும்'}
              </h1>
              <p className="text-[10px] sm:text-xs font-medium text-emerald-600 leading-none mt-0.5">
                {lang === 'en' ? 'Social Service Trust' : 'சமூக சேவை அறக்கட்டளை'}
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2 mx-4 xl:mx-8 shrink-0 flex-nowrap">
            {navigationLabels.map((item) => (
              <button
                key={item.id}
                id={`nav-${item.id}`}
                onClick={() => setActiveTab(item.id)}
                className={`px-3 py-2 rounded-md text-xs font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  activeTab === item.id
                    ? 'bg-emerald-50 text-emerald-700 font-semibold'
                    : 'text-gray-600 hover:text-emerald-600 hover:bg-gray-50'
                }`}
              >
                {item.label[lang]}
              </button>
            ))}
          </nav>

          {/* Action Area */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            
            {/* Language Switcher */}
            <button
              id="lang-toggle"
              onClick={() => setLang(lang === 'en' ? 'ta' : 'en')}
              className="flex items-center space-x-1 rounded-full border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
              title={lang === 'en' ? 'தமிழ் பதிப்பிற்கு மாற்றவும்' : 'Switch to English version'}
            >
              <Globe className="h-3.5 w-3.5 text-emerald-600" />
              <span>{lang === 'en' ? 'தமிழ்' : 'English'}</span>
            </button>

            {/* Admin Access Panel Link (Subtle) */}
            <button
              onClick={onOpenAdmin}
              className="hidden sm:inline-flex items-center justify-center rounded-md text-xs font-medium text-gray-400 hover:text-emerald-600 p-1"
              title="Trustee Dashboard"
              id="admin-btn-nav"
            >
              💼
            </button>

            {/* Mobile Menu Toggle */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex lg:hidden items-center justify-center rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-colors cursor-pointer"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden border-b border-gray-100 bg-white">
          <div className="space-y-1 px-2 pb-3 pt-2">
            {navigationLabels.map((item) => (
              <button
                key={item.id}
                id={`mobile-nav-${item.id}`}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsMenuOpen(false);
                }}
                className={`block w-full text-left px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                  activeTab === item.id
                    ? 'bg-emerald-50 text-emerald-700 font-semibold border-l-4 border-emerald-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-emerald-600'
                }`}
              >
                {item.label[lang]}
              </button>
            ))}
            <button
              onClick={() => {
                onOpenAdmin();
                setIsMenuOpen(false);
              }}
              className="block w-full text-left px-3 py-2.5 rounded-md text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              💼 {lang === 'en' ? 'Trustee Dashboard (Admin)' : 'நிர்வாகப் பலகை (அறங்காவலர்)'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

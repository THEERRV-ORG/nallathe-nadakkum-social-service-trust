import { useState, useEffect } from 'react';
import { FaEnvelope, FaPhone, FaLocationDot, FaInstagram, FaFacebookF, FaYoutube } from 'react-icons/fa6';
import { OFFICIAL_SOCIAL } from './security';
import { DonatePreset } from './data';
import Navbar from './components/Navbar';
import HomeView from './components/HomeView';
import AboutView from './components/AboutView';
import ServicesView from './components/ServicesView';
import GalleryView from './components/GalleryView';
import FormsView from './components/FormsView';
import DonateView from './components/DonateView';
import TransparencyView from './components/TransparencyView';
import SpeakerView from './components/SpeakerView';

export default function App() {
  // Language preference is the only state intentionally persisted in-browser.
  const [lang, setLang] = useState<'en' | 'ta'>(() => {
    const saved = localStorage.getItem('nn_site_lang');
    return (saved === 'en' || saved === 'ta') ? saved : 'ta';
  });

  // Top-level tab state keeps routing simple for this single-page brochure site.
  const [activeTab, setActiveTab] = useState<string>('home');

  // Pre-selection carried from the home "What Can You Donate" cards to the donate form.
  const [donatePreset, setDonatePreset] = useState<DonatePreset | null>(null);

  useEffect(() => {
    localStorage.setItem('nn_site_lang', lang);
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    // When a "What Can You Donate" card routes to the donate page, DonateView
    // scrolls straight to the form itself — so skip the default scroll-to-top.
    if (donatePreset) return;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  return (
    <div className="site-shell min-h-screen bg-transparent flex flex-col font-sans text-gray-800 antialiased selection:bg-emerald-100 selection:text-emerald-900">
      {/* Decorative brand watermark layer — fixed, faint, non-interactive.
          Oversized mission glyphs anchored to the corners plus the grayscale
          logo, so every section that scrolls past carries a subtle brand mark. */}
      <div aria-hidden="true" className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        {/* Logo watermark — centered */}
        <img
          src="/logo.png"
          alt=""
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 sm:h-[38rem] sm:w-[38rem] object-contain grayscale opacity-[0.05]"
        />
      </div>

      <Navbar
        lang={lang}
        setLang={setLang}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <main className="flex-grow">
        {activeTab === 'home' && <HomeView lang={lang} setActiveTab={setActiveTab} onDonatePreset={setDonatePreset} />}
        {activeTab === 'about' && <AboutView lang={lang} setActiveTab={setActiveTab} />}
        {activeTab === 'services' && <ServicesView lang={lang} setActiveTab={setActiveTab} />}
        {activeTab === 'gallery' && <GalleryView lang={lang} />}
        {activeTab === 'help' && <FormsView lang={lang} formType="help" />}
        {activeTab === 'volunteer' && <FormsView lang={lang} formType="volunteer" />}
        {activeTab === 'contact' && <FormsView lang={lang} formType="contact" />}
        {activeTab === 'donate' && <DonateView lang={lang} preset={donatePreset} onPresetConsumed={() => setDonatePreset(null)} />}
        {activeTab === 'transparency' && <TransparencyView lang={lang} />}
        {activeTab === 'speaker' && <SpeakerView lang={lang} />}
      </main>

      <section className="bg-emerald-900 text-white py-4 px-4 text-center text-xs font-semibold">
        {lang === 'en'
          ? 'Nallathe Nadakkum is a registered public trust. We accept domestic Indian Rupees only. No foreign currency is accepted.'
          : 'நல்லதே நடக்கும் ஒரு பதிவு செய்யப்பட்ட அறக்கட்டளை ஆகும். நாங்கள் உள்நாட்டு நன்கொடைகளை மட்டுமே ஏற்கிறோம்; வெளிநாட்டு நிதி ஏற்பதில்லை.'}
      </section>

      <footer className="border-t border-gray-200 bg-white pt-12 pb-8">
        <div className="px-6 sm:px-10 lg:px-16 space-y-12">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-4 lg:gap-16">
            <div>
              <div className="flex items-center gap-4">
                <img
                  src="/logo.png"
                  alt="Nallathe Nadakkum Social Service Trust logo"
                  className="h-32 w-32 sm:h-36 sm:w-36 rounded-full object-cover shrink-0"
                />
                <div className="flex flex-col gap-3">
                  {/* Trust name — top half */}
                  <div>
                    <h3 className="font-display text-base font-bold text-gray-900">
                      {lang === 'en' ? 'Nallathe Nadakkum' : 'நல்லதே நடக்கும்'}
                    </h3>
                    <p className="text-[11px] font-semibold text-emerald-600">
                      {lang === 'en' ? 'Social Service Trust' : 'சமூக சேவை அறக்கட்டளை'}
                    </p>
                  </div>
                  {/* Socials — bottom half */}
                  <div className="flex items-center gap-2.5">
                  <a
                    href={OFFICIAL_SOCIAL.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Follow Nallathe Nadakkum on Instagram"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-900 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#E4405F] hover:bg-[#E4405F] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E4405F] focus-visible:ring-offset-2"
                  >
                    <FaInstagram className="h-4 w-4" />
                  </a>
                  <a
                    href={OFFICIAL_SOCIAL.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Follow Nallathe Nadakkum on Facebook"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-900 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#1877F2] hover:bg-[#1877F2] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1877F2] focus-visible:ring-offset-2"
                  >
                    <FaFacebookF className="h-4 w-4" />
                  </a>
                  <a
                    href={OFFICIAL_SOCIAL.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Follow Nallathe Nadakkum on YouTube"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-900 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#FF0000] hover:bg-[#FF0000] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF0000] focus-visible:ring-offset-2"
                  >
                    <FaYoutube className="h-4 w-4" />
                  </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900">
                {lang === 'en' ? 'Our Program Tracks' : 'எங்கள் திட்டங்கள்'}
              </h4>
              <ul className="space-y-2 text-xs text-gray-900">
                <li><button onClick={() => setActiveTab('services')} className="hover:text-emerald-700 hover:underline cursor-pointer">{lang === 'en' ? 'Daily Roadside Annadhanam' : 'தினசரி அன்னதானம்'}</button></li>
                <li><button onClick={() => setActiveTab('services')} className="hover:text-emerald-700 hover:underline cursor-pointer">{lang === 'en' ? 'Free Ambulance Dispatch' : 'இலவச ஆம்புலன்ஸ் சேவை'}</button></li>
                <li><button onClick={() => setActiveTab('services')} className="hover:text-emerald-700 hover:underline cursor-pointer">{lang === 'en' ? 'Police Coordinated Last Rites' : 'ஆதரவற்றோருக்கு இறுதி மரியாதை'}</button></li>
                <li><button onClick={() => setActiveTab('services')} className="hover:text-emerald-700 hover:underline cursor-pointer">{lang === 'en' ? 'Elderly Rescue & Shelter' : 'முதியோர் மீட்பு & மறுவாழ்வு'}</button></li>
                <li><button onClick={() => setActiveTab('speaker')} className="hover:text-emerald-700 hover:underline cursor-pointer">{lang === 'en' ? 'Invite as Speaker' : 'சொற்பொழிவாளராக அழைக்க'}</button></li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900">
                {lang === 'en' ? 'Office Coordinates' : 'அலுவலகத் தொடர்பு'}
              </h4>
              <ul className="space-y-2 text-xs text-gray-900">
                <li className="flex items-start space-x-2">
                  <FaLocationDot className="h-3.5 w-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span className="leading-normal">38/5, Rajeev Nagar Cross Road, Opp. SPM Hospital, Tiruchengode - 637211</span>
                </li>
                <li className="flex items-center space-x-2">
                  <FaPhone className="h-3.5 w-3.5 text-emerald-600" />
                  <span>+91 98765 43210</span>
                </li>
                <li className="flex items-center space-x-2">
                  <FaEnvelope className="h-3.5 w-3.5 text-emerald-600" />
                  <span>nallathanadakum@gmail.com</span>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900">
                {lang === 'en' ? 'Trust Disclosures' : 'சட்ட அறிவிப்புகள்'}
              </h4>
              <div className="text-xs text-gray-900 space-y-1 bg-slate-50 p-3 rounded-lg border border-slate-100">
                <p><strong>Deed Number:</strong> Doc 16/2025</p>
                <p><strong>Registry Office:</strong> Tiruchengode</p>
                <p><strong>80G / 12A Status:</strong> <span className="text-amber-700 font-semibold">{lang === 'en' ? 'Pending' : 'நிலுவையில்'}</span></p>
                <p><strong>FCRA Status:</strong> <span className="text-red-600 font-semibold">{lang === 'en' ? 'No / Blocked' : 'இல்லை'}</span></p>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-900">
            <p>
              {lang === 'en'
                ? `© ${new Date().getFullYear()} Nallathe Nadakkum Social Service Trust. All rights reserved.`
                : `© ${new Date().getFullYear()} நல்லதே நடக்கும் சமூக சேவை அறக்கட்டளை. அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.`}
            </p>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => setActiveTab('transparency')}
                className="hover:text-emerald-700 transition-colors cursor-pointer underline"
              >
                {lang === 'en' ? 'Legals & Disclaimers' : 'சட்ட விபரங்கள் & மறுப்புரை'}
              </button>

              {/* Version — reveals "Maintained by THEERRV" on hover/focus.
                  The wider maintained-by text defines the width so nothing shifts. */}
              <span className="group relative inline-flex items-center" tabIndex={0}>
                <span className="whitespace-nowrap opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100">
                  {lang === 'en' ? 'Maintained by ' : 'பராமரிப்பு: '}
                  <a
                    href="https://theerrv.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-emerald-700 underline hover:text-emerald-800"
                  >
                    THEERRV
                  </a>
                </span>
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 flex items-center font-mono text-gray-400 opacity-100 transition-opacity duration-200 group-hover:opacity-0 group-focus-within:opacity-0"
                >
                  v{__APP_VERSION__}
                </span>
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}



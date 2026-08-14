import { useState, useEffect, lazy, Suspense } from 'react';
import { FaPhone, FaLocationDot, FaInstagram, FaFacebookF, FaYoutube } from 'react-icons/fa6';
import { Link, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { OFFICIAL_SOCIAL } from './security';
import { DonatePreset } from './data';
import Navbar from './components/Navbar';
import BrandMark from './components/ui/BrandMark';
import HomeView from './components/HomeView';
import AboutView from './components/AboutView';
import ServicesView from './components/ServicesView';
import GalleryView from './components/GalleryView';
import FormsView from './components/FormsView';
import DonateView from './components/DonateView';
import TransparencyView from './components/TransparencyView';
import SpeakerView from './components/SpeakerView';
// Admin + login are lazy-loaded so their bundle (Firebase, tables, drawer) is
// only fetched when a visitor actually navigates to /admin or /login — keeping
// the public site's initial download light.
const AdminPanel = lazy(() => import('./components/AdminPanel'));
const LoginView = lazy(() => import('./components/LoginView'));
import ProtectedAdminRoute from './components/ProtectedAdminRoute';
import PolicyPage from './components/PolicyPage';

const TAB_PATHS: Record<string, string> = {
  home: '/',
  about: '/about',
  services: '/services',
  gallery: '/gallery',
  help: '/request-help',
  volunteer: '/volunteer',
  contact: '/contact',
  donate: '/donate',
  transparency: '/transparency',
  speaker: '/invite-speaker',
};

const PATH_TABS = Object.fromEntries(
  Object.entries(TAB_PATHS).map(([tab, path]) => [path, tab]),
) as Record<string, string>;

const SEO_META: Record<string, { title: string; description: string }> = {
  home: {
    title: 'Nallathae Nadakkum Social Service Trust | Food, Ambulance & Humanitarian Support',
    description: 'Nallathae Nadakkum Social Service Trust in Tiruchengode provides food support, free ambulance service, elderly rescue, educational aid, dignified last rites, and community welfare support.',
  },
  about: {
    title: 'About Us | Nallathae Nadakkum Social Service Trust',
    description: 'Learn about Nallathae Nadakkum Social Service Trust, its founder N. Kavinraj, the story behind the trust, its values, team structure, and humanitarian mission in Tiruchengode.',
  },
  services: {
    title: 'Our Services | Nallathae Nadakkum Social Service Trust',
    description: 'Explore the services of Nallathae Nadakkum Social Service Trust including annadhanam, free ambulance support, elderly rescue, last rites assistance, education support, and emergency medical fundraising.',
  },
};

export default function App() {
  return (
    <Suspense
      fallback={(
        <div className="flex min-h-screen items-center justify-center bg-[#f8fbf8] font-sans text-sm font-bold text-emerald-900">
          Loading…
        </div>
      )}
    >
      <Routes>
        <Route path="/login" element={<LoginView />} />
        <Route path="/privacy-policy" element={<PolicyPage slug="privacy-policy" />} />
        <Route path="/privacy-policy-full" element={<PolicyPage slug="privacy-policy-full" />} />
        <Route path="/terms-and-conditions" element={<PolicyPage slug="terms-and-conditions" />} />
        <Route path="/terms-and-conditions-full" element={<PolicyPage slug="terms-and-conditions-full" />} />
        <Route path="/refund-policy" element={<PolicyPage slug="refund-policy" />} />
        <Route path="/refund-policy-full" element={<PolicyPage slug="refund-policy-full" />} />
        <Route path="/child-protection-policy" element={<PolicyPage slug="child-protection-policy" />} />
        <Route
          path="/admin/*"
          element={(
            <ProtectedAdminRoute>
              <AdminPanel />
            </ProtectedAdminRoute>
          )}
        />
        <Route path="*" element={<PublicSite />} />
      </Routes>
    </Suspense>
  );
}

function PublicSite() {
  const location = useLocation();
  const navigate = useNavigate();
  // Language preference is the only state intentionally persisted in-browser.
  const [lang, setLang] = useState<'en' | 'ta'>(() => {
    const saved = localStorage.getItem('nn_site_lang');

  return (saved === 'en' || saved === 'ta') ? saved : 'ta';
  });

  const activeTab = PATH_TABS[location.pathname] ?? 'home';
  const setActiveTab = (tab: string) => {
    navigate(TAB_PATHS[tab] ?? '/');
  };

  const openFooterService = (serviceId: string) => {
    setActiveTab('services');
    window.setTimeout(() => {
      document.getElementById(`service-${serviceId}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 80);
  };


  const footerPolicies = [
    { href: '/privacy-policy', label: { en: 'Privacy Policy', ta: 'தனியுரிமைக் கொள்கை' } },
    { href: '/terms-and-conditions', label: { en: 'Terms & Conditions', ta: 'விதிமுறைகள் & நிபந்தனைகள்' } },
    { href: '/refund-policy', label: { en: 'Refund Policy', ta: 'பணம் திருப்பிக் கொடுக்கும் கொள்கை' } },
  ];

  const footerServices = [
    { id: 'food', label: { en: 'Daily Annadhanam', ta: 'தினசரி அன்னதானம்' } },
    { id: 'ambulance', label: { en: 'Free Ambulance Service', ta: 'இலவச ஆம்புலன்ஸ் சேவை' } },
    { id: 'lastrites', label: { en: 'Last Rites for the Unclaimed', ta: 'ஆதரவற்றோருக்கு இறுதி மரியாதை' } },
    { id: 'elderly', label: { en: 'Elderly Rescue and Rehousing', ta: 'முதியோர் மீட்பு மற்றும் மறுவாழ்வு' } },
    { id: 'education', label: { en: 'Education Support', ta: 'கல்வி உதவி' } },
    { id: 'medical', label: { en: 'Emergency Medical Fundraising', ta: 'அவசர மருத்துவ நிதி உதவி' } },
  ];

  // Pre-selection carried from the home "What Can You Donate" cards to the donate form.
  const [donatePreset, setDonatePreset] = useState<DonatePreset | null>(null);

  useEffect(() => {
    localStorage.setItem('nn_site_lang', lang);
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    const meta = SEO_META[activeTab] ?? SEO_META.home;
    document.title = meta.title;

    let descriptionTag = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!descriptionTag) {
      descriptionTag = document.createElement('meta');
      descriptionTag.name = 'description';
      document.head.appendChild(descriptionTag);
    }
    descriptionTag.content = meta.description;
  }, [activeTab]);

  useEffect(() => {
    // When a "What Can You Donate" card routes to the donate page, DonateView
    // scrolls straight to the form itself — so skip the default scroll-to-top.
    if (donatePreset) return;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  return (
    <div className={`site-shell min-h-screen bg-transparent flex flex-col font-sans text-gray-900 antialiased selection:bg-emerald-100 selection:text-emerald-900 ${lang === 'ta' ? 'tamil-type' : ''}`}>
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
        {activeTab === 'home' && <HomeView lang={lang} setActiveTab={setActiveTab} />}
        {activeTab === 'about' && <AboutView lang={lang} setActiveTab={setActiveTab} />}
        {activeTab === 'services' && <ServicesView lang={lang} setActiveTab={setActiveTab} setDonatePreset={setDonatePreset} />}
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
          ? 'Nallathae Nadakkum is a registered public trust.'
          : 'நல்லதே நடக்கும் ஒரு பதிவு செய்யப்பட்ட அறக்கட்டளை ஆகும்.'}
      </section>

      <footer className="border-t border-gray-200 bg-white pt-12 pb-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-4 md:gap-10 lg:gap-12">
            <div>
              <div className="flex items-center gap-4">
                <BrandMark size="footer" variant="round" className="shrink-0" />
                <div className="flex flex-col gap-3">
                  {/* Trust name — top half */}
                  <div>
                    <h3 className="font-display text-base font-bold text-gray-900">
                      {lang === 'en' ? 'Nallathae Nadakkum' : 'நல்லதே நடக்கும்'}
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
                    aria-label="Follow Nallathae Nadakkum on Instagram"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-900 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#E4405F] hover:bg-[#E4405F] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E4405F] focus-visible:ring-offset-2"
                  >
                    <FaInstagram className="h-4 w-4" />
                  </a>
                  <a
                    href={OFFICIAL_SOCIAL.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Follow Nallathae Nadakkum on Facebook"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-900 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#1877F2] hover:bg-[#1877F2] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1877F2] focus-visible:ring-offset-2"
                  >
                    <FaFacebookF className="h-4 w-4" />
                  </a>
                  <a
                    href={OFFICIAL_SOCIAL.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Follow Nallathae Nadakkum on YouTube"
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
                {lang === 'en' ? 'Policies' : 'கொள்கைகள்'}
              </h4>
              <ul className="space-y-2 text-xs text-gray-900">
                {footerPolicies.map((item) => (
                  <li key={item.href}>
                    <Link to={item.href} className="hover:text-emerald-700 hover:underline">
                      {item.label[lang]}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900">
                {lang === 'en' ? 'Our Services' : 'எங்கள் சேவைகள்'}
              </h4>
              <ul className="space-y-2 text-xs text-gray-900">
                {footerServices.map((service) => (
                  <li key={service.id}>
                    <button onClick={() => openFooterService(service.id)} className="hover:text-emerald-700 hover:underline cursor-pointer">
                      {service.label[lang]}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900">
                {lang === 'en' ? 'Office Coordinates' : 'அலுவலக தொடர்பு விவரங்கள்'}
              </h4>
              <ul className="space-y-2 text-xs text-gray-900">
                <li className="flex items-start space-x-2">
                  <FaLocationDot className="h-3.5 w-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=11.388999%2C77.894306"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="leading-normal hover:text-emerald-700 hover:underline"
                  >
                    {lang === 'en' ? '38/5, Rajeev Nagar Cross Road, Opp. SPM Hospital, Tiruchengode - 637211' : '38/5, ராஜீவ் நகர் குறுக்கு சாலை, SPM மருத்துவமனை எதிரில், திருச்செங்கோடு - 637211'}
                  </a>
                </li>
                <li className="flex items-center space-x-2">
                  <FaPhone className="h-3.5 w-3.5 text-emerald-600" />
                  <a
                    href="https://wa.me/917540017625"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-emerald-700 hover:underline"
                  >
                    +91 75400 17625
                  </a>
                </li>
                <li className="flex items-center space-x-2">
                  <FaPhone className="h-3.5 w-3.5 text-emerald-600" />
                  <a
                    href="tel:+919360462890"
                    className="hover:text-emerald-700 hover:underline"
                  >
                    +91 93604 62890
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-900">
            <p>
              {lang === 'en'
                ? `© ${new Date().getFullYear()} Nallathae Nadakkum Social Service Trust. All rights reserved.`
                : `© ${new Date().getFullYear()} நல்லதே நடக்கும் சமூக சேவை அறக்கட்டளை. அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.`}
            </p>

            <div className="flex items-center space-x-4">
              <span className="offbit-credit text-gray-900">
                Designed and Maintained by{' '}
                <a
                  href="https://theerrv.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-violet-700 underline hover:text-brand-violet"
                >
                  theerrv.com
                </a>
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}



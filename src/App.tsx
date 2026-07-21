import { useState, useEffect } from 'react';
import { Heart, Globe, Mail, Phone, MapPin, ExternalLink, HeartHandshake } from 'lucide-react';
import Navbar from './components/Navbar';
import HomeView from './components/HomeView';
import AboutView from './components/AboutView';
import ServicesView from './components/ServicesView';
import GalleryView from './components/GalleryView';
import FormsView from './components/FormsView';
import DonateView from './components/DonateView';
import TransparencyView from './components/TransparencyView';
import AdminPanel from './components/AdminPanel';

export default function App() {
  const [lang, setLang] = useState<'en' | 'ta'>(() => {
    const saved = localStorage.getItem('nn_site_lang');
    return (saved === 'en' || saved === 'ta') ? saved : 'ta';
  });
  
  const [activeTab, setActiveTab] = useState<string>('home');
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);

  // Sync language selection to localStorage
  useEffect(() => {
    localStorage.setItem('nn_site_lang', lang);
  }, [lang]);

  // Smooth scroll to top when changing tabs
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-slate-50/30 flex flex-col font-sans text-gray-800 antialiased selection:bg-emerald-100 selection:text-emerald-900">
      
      {/* Global Navigation Header */}
      <Navbar 
        lang={lang} 
        setLang={setLang} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Main Viewport Content */}
      <main className="flex-grow">
        {activeTab === 'home' && <HomeView lang={lang} setActiveTab={setActiveTab} />}
        {activeTab === 'about' && <AboutView lang={lang} />}
        {activeTab === 'services' && <ServicesView lang={lang} setActiveTab={setActiveTab} />}
        {activeTab === 'gallery' && <GalleryView lang={lang} />}
        {activeTab === 'help' && <FormsView lang={lang} formType="help" />}
        {activeTab === 'volunteer' && <FormsView lang={lang} formType="volunteer" />}
        {activeTab === 'contact' && <FormsView lang={lang} formType="contact" />}
        {activeTab === 'donate' && <DonateView lang={lang} />}
        {activeTab === 'transparency' && <TransparencyView lang={lang} />}
      </main>

      {/* Visual Safety Notice Bar Above Footer */}
      <section className="bg-emerald-900 text-white py-4 px-4 text-center text-xs font-semibold">
        <span className="inline-block mr-1">🛡️</span>
        {lang === 'en'
          ? 'Nallathe Nadakkum is a registered public trust. We accept domestic Indian Rupees only. No foreign currency is accepted.'
          : 'நல்லதே நடக்கும் ஒரு பதிவு செய்யப்பட்ட அறக்கட்டளை ஆகும். நாங்கள் உள்நாட்டு நன்கொடைகளை மட்டுமே ஏற்கிறோம்; வெளிநாட்டு நிதி ஏற்பதில்லை.'}
      </section>

      {/* Global Brand Footer */}
      <footer className="border-t border-gray-200 bg-white pt-12 pb-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Top Footer: Grid Layout */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            
            {/* Column 1: Brand details */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                  <HeartHandshake className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-display text-sm font-bold text-gray-900">
                    {lang === 'en' ? 'Nallathe Nadakkum' : 'நல்லதே நடக்கும்'}
                  </h3>
                  <p className="text-[10px] font-semibold text-emerald-600">
                    {lang === 'en' ? 'Social Service Trust' : 'சமூக சேவை அறக்கட்டளை'}
                  </p>
                </div>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed text-justify">
                {lang === 'en'
                  ? 'A registered public charitable trust based in Tiruchengode Town, Tamil Nadu. Serving destitute roadside families, elderly rescues, and unclaimed funerals.'
                  : 'திருச்செங்கோட்டைத் தலைமையிடமாகக் கொண்ட பதிவு செய்யப்பட்ட பொது தொண்டு அமைப்பு. ஆதரவற்ற முதியவர்கள் மீட்பு, அன்னதானம், மற்றும் உரிமை கோரப்படாத உடல்களுக்கு இறுதி மரியாதை செய்ய அர்ப்பணிக்கப்பட்டது.'}
              </p>
            </div>

            {/* Column 2: Program Links */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900">
                {lang === 'en' ? 'Our Program Tracks' : 'எங்கள் திட்டங்கள்'}
              </h4>
              <ul className="space-y-2 text-xs text-gray-500">
                <li><button onClick={() => setActiveTab('services')} className="hover:text-emerald-700 hover:underline cursor-pointer">{lang === 'en' ? 'Daily Roadside Annadhanam' : 'தினசரி அன்னதானம்'}</button></li>
                <li><button onClick={() => setActiveTab('services')} className="hover:text-emerald-700 hover:underline cursor-pointer">{lang === 'en' ? 'Free Ambulance Dispatch' : 'இலவச ஆம்புலன்ஸ் சேவை'}</button></li>
                <li><button onClick={() => setActiveTab('services')} className="hover:text-emerald-700 hover:underline cursor-pointer">{lang === 'en' ? 'Police Coordinated Last Rites' : 'ஆதரவற்றோருக்கு இறுதி மரியாதை'}</button></li>
                <li><button onClick={() => setActiveTab('services')} className="hover:text-emerald-700 hover:underline cursor-pointer">{lang === 'en' ? 'Elderly Rescue & Shelter' : 'முதியோர் மீட்பு & மறுவாழ்வு'}</button></li>
              </ul>
            </div>

            {/* Column 3: Contact details */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900">
                {lang === 'en' ? 'Office Coordinates' : 'அலுவலகத் தொடர்பு'}
              </h4>
              <ul className="space-y-2 text-xs text-gray-500">
                <li className="flex items-start space-x-2">
                  <MapPin className="h-3.5 w-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span className="leading-normal">38/5, Rajeev Nagar Cross Road, Opp. SPM Hospital, Tiruchengode - 637211</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Phone className="h-3.5 w-3.5 text-emerald-600" />
                  <span>+91 98765 43210</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Mail className="h-3.5 w-3.5 text-emerald-600" />
                  <span>nallathanadakum@gmail.com</span>
                </li>
              </ul>
            </div>

            {/* Column 4: Trust Quick Disclosures */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900">
                {lang === 'en' ? 'Trust Disclosures' : 'சட்ட அறிவிப்புகள்'}
              </h4>
              <div className="text-xs text-gray-500 space-y-1 bg-slate-50 p-3 rounded-lg border border-slate-100">
                <p><strong>Deed Number:</strong> Doc 16/2025</p>
                <p><strong>Registry Office:</strong> Tiruchengode</p>
                <p><strong>80G / 12A Status:</strong> <span className="text-amber-700 font-semibold">{lang === 'en' ? 'Pending' : 'நிலுவையில்'}</span></p>
                <p><strong>FCRA Status:</strong> <span className="text-red-600 font-semibold">{lang === 'en' ? 'No / Blocked' : 'இல்லை'}</span></p>
              </div>
            </div>

          </div>

          {/* Bottom Footer: Copyrights and Subtle Admin Trigger */}
          <div className="pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
            <p>
              © {new Date().getFullYear()} நல்லதே நடக்கும் சமூக சேவை அறக்கட்டளை (Nallathe Nadakkum Social Trust). All rights reserved.
            </p>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setActiveTab('transparency')}
                className="hover:text-emerald-700 transition-colors cursor-pointer underline"
              >
                {lang === 'en' ? 'Legals & Disclaimers' : 'சட்ட விபரங்கள் & மறுப்புரை'}
              </button>
              
              {/* Trustee Dashboard Access Trigger */}
              <button
                onClick={() => setIsAdminOpen(true)}
                className="text-gray-300 hover:text-emerald-600 transition-colors flex items-center space-x-1 cursor-pointer"
                title="Trustee Staff Login"
                id="footer-admin-trigger"
              >
                <span>💼</span>
                <span className="underline">{lang === 'en' ? 'Trustee Dashboard' : 'நிர்வாகப் பலகை'}</span>
              </button>
            </div>
          </div>

        </div>
      </footer>

      {/* Administrative Dashboard Overlay */}
      {isAdminOpen && (
        <AdminPanel 
          lang={lang} 
          onClose={() => setIsAdminOpen(false)} 
        />
      )}

    </div>
  );
}

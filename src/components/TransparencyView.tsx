import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  FaShieldHalved, FaChevronDown, FaChevronRight, FaFileLines, FaLock, FaUsers, FaTriangleExclamation, FaCircleExclamation,
  FaLocationDot, FaMap, FaArrowUpRightFromSquare
} from 'react-icons/fa6';
import { faqData, commonTranslations } from '../data';
import Monogram from './Monogram';

interface TransparencyViewProps {
  lang: 'en' | 'ta';
}

export default function TransparencyView({ lang }: TransparencyViewProps) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const auditLogs = [
    { year: 'FY 2025–26', status: { en: 'Audit In Progress', ta: 'தணிக்கை நடைபெறுகிறது' }, auditor: { en: 'Tiruchengode Local Auditor Board', ta: 'திருச்செங்கோடு தணிக்கை வாரியம்' } },
    { year: 'Trust Deed (Deed No. 16/2025)', status: { en: 'Legally Active & Certified', ta: 'பதிவு செய்யப்பட்டது - ஆவணம் 16/2025' }, auditor: { en: 'Sub-Registrar, Tiruchengode', ta: 'சார்பதிவாளர் அலுவலகம், திருச்செங்கோடு' } },
  ];

  return (
    <div className="space-y-12 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Title Header */}
      <section className="text-center max-w-3xl mx-auto space-y-4">
        <h1 className="font-display text-3xl font-extrabold text-gray-900 sm:text-4xl">
          {lang === 'en' ? 'Transparency, Legals & Audit Ledger' : 'வெளிப்படைத்தன்மை மற்றும் சட்டப்பூர்வ விபரங்கள்'}
        </h1>
        <p className="text-gray-900 text-base sm:text-lg leading-relaxed sm:leading-[1.65]">
          {lang === 'en' 
            ? 'We maintain complete alignment with the laws of the Republic of India. Read our legal structure, registrations, and FAQs.' 
            : 'நாங்கள் இந்திய சட்டங்களுக்கு முழுமையாக உட்பட்டு, தகுந்த தணிக்கை ஆவணங்களுடன் செயல்படுகிறோம். எங்களது சட்ட விபரங்கள் மற்றும் கேள்விகளை இங்கு காணலாம்.'}
        </p>
      </section>

      {/* Trust Legal Profile Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Irrevocable Charter Info */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-emerald-50 text-emerald-700 rounded-xl w-fit shrink-0">
                <FaShieldHalved className="h-5 w-5" />
              </div>
              <h3 className="font-display text-base font-bold text-gray-900">
                {lang === 'en' ? 'Irrevocable Public Trust' : 'மாற்ற முடியாத பொது அறக்கட்டளை'}
              </h3>
            </div>
            <p className="text-base sm:text-lg text-gray-900 leading-relaxed sm:leading-[1.65] text-justify">
              {lang === 'en'
                ? 'Nallathe Nadakkum is registered as an Irrevocable Public Charitable Trust governed under a Board of Trustees. The trust assets can never be redirected to any personal profit. In the event of dissolution, all assets can only be transferred to a similarly registered public trust.'
                : 'எங்களது அறக்கட்டளை ஒரு மாற்ற முடியாத பொது தொண்டு அமைப்பாகும். இதன் சொத்துக்கள் அல்லது நிதி ஒருபோதும் தனிநபர் இலாபத்திற்காகப் பயன்படுத்தப்படாது. ஒருவேளை அறக்கட்டளை கலைக்கப்பட்டால், அதன் சொத்துக்கள் அனைத்தும் மற்றொரு பொது தொண்டு நிறுவனத்திடமே ஒப்படைக்கப்படும்.'}
            </p>
          </div>
          <span className="text-[10px] font-mono text-gray-900 bg-gray-50 px-2 py-0.5 rounded w-fit">
            {lang === 'en' ? 'Status: Active and Compliant' : 'நிலை: செயல்பாட்டில் உள்ளது'}
          </span>
        </div>

        {/* Dual Signatory Control */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-emerald-50 text-emerald-700 rounded-xl w-fit shrink-0">
                <FaLock className="h-5 w-5" />
              </div>
              <h3 className="font-display text-base font-bold text-gray-900">
                {lang === 'en' ? 'Dual Signatory Oversight' : 'இரட்டை கையொப்பக் கட்டுப்பாடு'}
              </h3>
            </div>
            <p className="text-base sm:text-lg text-gray-900 leading-relaxed sm:leading-[1.65] text-justify">
              {lang === 'en'
                ? 'Financial transactions require joint signatures from both the Chairman (Advocate N. Kavinraj) and the Treasurer (Mrs. N. Kogila). No single trustee possesses the right to withdraw or dispense public donations without Board approval.'
                : 'அறக்கட்டளையின் அனைத்து நிதி பரிவர்த்தனைகளும் தலைவர் (வழக்கறிஞர் நா. கவின்ராஜ்) மற்றும் பொருளாளர் (திருமதி. N. கோகிலா) ஆகியோரின் கூட்டு கையொப்பத்துடன் மட்டுமே நிகழும். அறங்காவலர் குழு ஒப்புதல் இன்றி தனிநபர் யாரும் பணத்தை எடுக்கவோ செலுத்தவோ முடியாது.'}
            </p>
          </div>
          <span className="text-[10px] font-mono text-gray-900 bg-gray-50 px-2 py-0.5 rounded w-fit">
            {lang === 'en' ? 'Process: Joint Bank Mandate' : 'வழிமுறை: கூட்டு வங்கிக் கணக்கு'}
          </span>
        </div>

        {/* Foreign Funding Compliance */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-emerald-50 text-emerald-700 rounded-xl w-fit shrink-0">
                <FaCircleExclamation className="h-5 w-5" />
              </div>
              <h3 className="font-display text-base font-bold text-gray-900">
                {lang === 'en' ? 'Foreign Contributions Blocked' : 'வெளிநாட்டு நிதிகள் மறுப்பு'}
              </h3>
            </div>
            <p className="text-base sm:text-lg text-gray-900 leading-relaxed sm:leading-[1.65] text-justify">
              {lang === 'en'
                ? 'We strictly abide by FCRA regulations of the Ministry of Home Affairs. Nallathe Nadakkum trust DOES NOT hold an FCRA registration and, therefore, cannot accept any foreign donations from non-Indian bank accounts. We accept Indian rupees from accounts residing within India.'
                : 'இந்திய அரசின் FCRA விதிகளுக்கு நாங்கள் முழுமையாகக் கட்டுப்படுகிறோம். எங்களது அறக்கட்டளையிடம் வெளிநாட்டு நிதி பெறுவதற்கான FCRA சான்றிதழ் இல்லை. எனவே, வெளிநாட்டு கணக்குகளில் இருந்து வரும் பணத்தை சட்டப்பூர்வமாக எங்களால் ஏற்க முடியாது.'}
            </p>
          </div>
          <span className="text-[10px] font-mono text-gray-900 bg-gray-50 px-2 py-0.5 rounded w-fit text-red-600 font-semibold">
            {lang === 'en' ? 'FCRA: Not Registered' : 'FCRA: பதிவு செய்யப்படவில்லை'}
          </span>
        </div>

      </section>

      {/* Trust Deed & Auditor Listings */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Registrations Table */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-gray-100 p-6 shadow-xs space-y-4">
          <h3 className="font-display text-base font-bold text-gray-900 flex items-center gap-2">
            <Monogram label="L" size="sm" />
            <span>{lang === 'en' ? 'Legal Framework & Statutory Registry' : 'அறக்கட்டளை பதிவு மற்றும் சட்ட விபரங்கள்'}</span>
          </h3>
          <div className="divide-y divide-gray-100 text-xs sm:text-sm">
            <div className="py-3 flex justify-between">
              <span className="font-semibold text-gray-900">{lang === 'en' ? 'Registered Trust Name' : 'பதிவு செய்யப்பட்ட பெயர்'}</span>
              <span className="font-medium text-gray-900 text-right">நல்லதே நடக்கும் சமூக சேவை அறக்கட்டளை</span>
            </div>
            <div className="py-3 flex justify-between">
              <span className="font-semibold text-gray-900">{lang === 'en' ? 'Registration Deed Number' : 'அறக்கட்டளை பதிவு எண்'}</span>
              <span className="font-medium text-gray-900 text-right font-mono">Doc No. 16/2025</span>
            </div>
            <div className="py-3 flex justify-between">
              <span className="font-semibold text-gray-900">{lang === 'en' ? 'Sub-Registrar Office' : 'சார்பதிவாளர் அலுவலகம்'}</span>
              <span className="font-medium text-gray-900 text-right">Tiruchengode Town & Taluk, Namakkal</span>
            </div>
            <div className="py-3 flex justify-between">
              <span className="font-semibold text-gray-900">{lang === 'en' ? 'Date of Registry' : 'பதிவு செய்யப்பட்ட தேதி'}</span>
              <span className="font-medium text-gray-900 text-right font-mono">08.04.2025</span>
            </div>
            <div className="py-3 flex justify-between">
              <span className="font-semibold text-gray-900">{lang === 'en' ? 'Drafting Advocate' : 'ஆவணத்தை வடிவமைத்த வழக்கறிஞர்'}</span>
              <span className="font-medium text-gray-900 text-right">Advocate Sathiskumar, Tiruchengode</span>
            </div>
            <div className="py-3 flex justify-between">
              <span className="font-semibold text-gray-900">{lang === 'en' ? '12A & 80G Tax Exemption Status' : '12A மற்றும் 80G வரி விலக்கு நிலை'}</span>
              <span className="font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded text-[10px] uppercase text-right">
                {lang === 'en' ? 'Pending (In Process)' : 'நிலுவையில் உள்ளது'}
              </span>
            </div>
          </div>
        </div>

        {/* Right: Audited Ledger Books */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-gray-100 p-6 shadow-xs space-y-4">
          <h3 className="font-display text-base font-bold text-gray-900 flex items-center gap-2">
            <Monogram label="A" size="sm" />
            <span>{lang === 'en' ? 'Audits & Filing Log' : 'தணிக்கை மற்றும் தாக்கல் விபரங்கள்'}</span>
          </h3>
          <p className="text-base text-gray-900 leading-relaxed text-justify">
            {lang === 'en'
              ? 'Our deed mandates that accounting logs be audited annually by a certified Chartered Accountant. Summaries will be made available here.'
              : 'அறக்கட்டளையின் கணக்கு வழக்குகள் தகுதிவாய்ந்த தணிக்கையாளரால் தணிக்கை செய்யப்பட்டு ஆண்டுதோறும் தாக்கல் செய்யப்பட வேண்டும் என்பது விதியாகும்.'}
          </p>

          <div className="space-y-3">
            {auditLogs.map((log, idx) => (
              <div key={idx} className="p-4 border border-gray-100 rounded-xl bg-gray-50/50 flex items-start justify-between">
                <div className="space-y-0.5">
                  <h4 className="text-xs font-bold text-gray-800">{log.year}</h4>
                  <p className="text-[10px] text-gray-900">{log.auditor[lang]}</p>
                </div>
                <span className="text-[9px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full">
                  {log.status[lang]}
                </span>
              </div>
            ))}
          </div>
        </div>

      </section>

      {/* Official Registered Office Location & Map Section */}
      <section className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 shadow-xs space-y-6 animate-fade-in">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-gray-100 pb-5">
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full w-fit block">
              {lang === 'en' ? 'Physical Presence' : 'நேரடி இருப்பிடம்'}
            </span>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Monogram label="O" size="sm" />
              <span>{lang === 'en' ? 'Official Registered Office & Location Pin' : 'அதிகாரப்பூர்வ பதிவு அலுவலகம் & வரைபடம்'}</span>
            </h2>
            <p className="text-base sm:text-lg text-gray-900 leading-relaxed sm:leading-[1.65] max-w-2xl">
              {lang === 'en' 
                ? 'We operate in full transparency with a physical office in Tiruchengode. Click on the map below to immediately open GPS coordinates in Google Maps.' 
                : 'நாங்கள் திருச்செங்கோட்டில் முறையான அலுவலகத்துடன் செயல்படுகிறோம். எங்களது இருப்பிடத்தை வரைபடம் மூலம் துல்லியமாக அறிந்து கொள்ள கீழே உள்ள வரைபடத்தை அழுத்தவும்.'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Address and directions details */}
          <div className="lg:col-span-5 space-y-5">
            <div className="rounded-xl bg-gray-50 p-5 border border-gray-100 space-y-4">
              <div className="space-y-1">
                <span className="text-[9px] font-bold text-gray-900 uppercase tracking-widest block">
                  {lang === 'en' ? 'Registered Office Address' : 'அலுவலக முகவரி'}
                </span>
                <p className="font-display text-sm font-bold text-gray-900 leading-snug">
                  Nallathe Nadakkum Trust
                </p>
                <p className="text-base sm:text-lg text-gray-900 leading-relaxed sm:leading-[1.65] font-medium">
                  38/5, Rajeev Nagar Cross Road,<br />
                  Opp. SPM Hospital,<br />
                  Tiruchengode - 637211,<br />
                  Namakkal District, Tamil Nadu.
                </p>
              </div>

              <div className="space-y-1.5 pt-2 border-t border-gray-200/60 text-xs text-gray-900">
                <div className="flex items-center space-x-2">
                  <FaLocationDot className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                  <span><strong>{lang === 'en' ? 'Landmark:' : 'அடையாளம்:'}</strong> Opp. SPM Hospital</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FaMap className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                  <span><strong>{lang === 'en' ? 'Locality:' : 'பகுதி:'}</strong> Tiruchengode Town & Taluk</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <a 
                href="https://www.google.com/maps/search/?api=1&query=38%2F5%2C+Rajeev+Nagar+Cross+Road%2C+Opp.+SPM+Hospital%2C+Tiruchengode+-+637211"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center space-x-2 w-full py-3 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-sm transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
              >
                <FaArrowUpRightFromSquare className="h-4 w-4" />
                <span>{lang === 'en' ? 'Open in Google Maps App' : 'கூகுள் மேப்ஸில் திறக்கவும்'}</span>
              </a>
              <p className="text-[11px] text-gray-900 text-center">
                {lang === 'en' ? 'Live Navigation Coordinates for Visitors & Donors' : 'வருகையாளர்கள் மற்றும் நன்கொடையாளர்களுக்கான நேரடி வழிகாட்டி'}
              </p>
            </div>
          </div>

          {/* Right Column: Google Map Iframe with hover action overlay */}
          <div className="lg:col-span-7 h-[300px] sm:h-[350px] rounded-2xl overflow-hidden border border-gray-100 shadow-sm relative group cursor-pointer">
            <a
              href="https://www.google.com/maps/search/?api=1&query=38%2F5%2C+Rajeev+Nagar+Cross+Road%2C+Opp.+SPM+Hospital%2C+Tiruchengode+-+637211"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute inset-0 z-10 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center"
              title={lang === 'en' ? 'Click to open in Google Maps' : 'கூகுள் வரைபடத்தில் பார்க்க அழுத்தவும்'}
            >
              {/* Overlay Badge that appears on hover */}
              <div className="bg-emerald-950/95 backdrop-blur-xs text-white border border-emerald-500/30 px-4 py-2.5 rounded-xl flex items-center space-x-2 shadow-lg scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300">
                <FaLocationDot className="h-4 w-4 text-emerald-400 animate-bounce" />
                <span className="text-xs font-bold font-sans">
                  {lang === 'en' ? 'Click to Navigate on Google Maps →' : 'கூகுள் மேப்ஸில் வழிப்பாதையை காண்க →'}
                </span>
              </div>
            </a>
            
            <iframe
              src="https://maps.google.com/maps?q=SPM%20Hospital,%20Tiruchengode&t=&z=16&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full grayscale-[15%] contrast-[105%] group-hover:scale-[1.02] transition-transform duration-500"
            ></iframe>
          </div>

        </div>
      </section>

      {/* Interactive FAQ Accordion */}
      <section className="space-y-6 pt-4">
        <div className="text-center space-y-1">
          <h2 className="font-display text-2xl font-bold text-gray-900 flex items-center justify-center gap-2">
            <Monogram label="?" size="sm" />
            <span>{lang === 'en' ? 'Frequently Asked Questions' : 'அடிக்கடி கேட்கப்படும் கேள்விகள்'}</span>
          </h2>
          <p className="text-xs text-gray-900">
            {lang === 'en' ? 'Have questions regarding our operations or financial management? Click on an item below.' : 'எங்கள் செயல்பாடுகள் அல்லது நிதி மேலாண்மை குறித்து ஏதேனும் கேள்விகள் இருந்தால் கீழே தேர்வு செய்து விபரம் அறியலாம்.'}
          </p>
        </div>

        <div className="max-w-4xl mx-auto divide-y divide-gray-100 border-t border-b border-gray-100">
          {faqData.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div key={idx} className="py-4">
                <button
                  id={`faq-btn-${idx}`}
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex justify-between items-center text-left font-sans text-sm font-semibold text-gray-900 hover:text-emerald-700 transition-colors py-1 cursor-pointer"
                >
                  <span className="pr-4 leading-snug">{faq.question[lang]}</span>
                  {isOpen ? <FaChevronDown className="h-4 w-4 text-emerald-600 flex-shrink-0" /> : <FaChevronRight className="h-4 w-4 text-gray-900 flex-shrink-0" />}
                </button>
                
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <p className="text-base sm:text-lg text-gray-900 leading-relaxed sm:leading-[1.65] text-justify pt-3 pr-6">
                        {faq.answer[lang]}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
}

import { useState, useRef } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  FaUtensils,
  FaTruckMedical,
  FaHeart,
  FaUserCheck,
  FaGraduationCap,
  FaHeartPulse,
  FaPhoneFlip,
  FaIndianRupeeSign,
  FaUsers,
  FaChevronRight,
} from 'react-icons/fa6';
import { servicesData } from '../data';
import Monogram from './Monogram';

interface ServicesViewProps {
  lang: 'en' | 'ta';
  setActiveTab: (tab: string) => void;
}

// Confirmed image assets in /public/gallery/
const SERVICE_IMG: Record<string, string> = {
  food:      '/gallery/activity-food-indoor.jpeg',
  ambulance: '/gallery/activity-ambulance-banner.jpeg',
  lastrites: '/gallery/activity-last-rites-indoor.jpg',
  elderly:   '/gallery/activity-elder-rescue.jpeg',
  education: '/gallery/activity-education-scholarship.png',
  medical:   '/gallery/activity-water-street.jpg',
};

const ACCENT: Record<string, { border: string; text: string; bg: string }> = {
  food:      { border: 'border-brand-orange-100', text: 'text-brand-orange-700', bg: 'bg-brand-orange-50' },
  ambulance: { border: 'border-brand-blue-100',   text: 'text-brand-blue-700',   bg: 'bg-brand-blue-50' },
  lastrites: { border: 'border-brand-violet-100', text: 'text-brand-violet-700', bg: 'bg-brand-violet-50' },
  elderly:   { border: 'border-emerald-100',      text: 'text-emerald-700',      bg: 'bg-emerald-50' },
  education: { border: 'border-brand-gold-100',   text: 'text-brand-gold-700',   bg: 'bg-brand-gold-50' },
  medical:   { border: 'border-rose-100',         text: 'text-rose-600',         bg: 'bg-rose-50' },
};

const SLUGS: Record<string, { en: string; ta: string }> = {
  food:      { en: 'FOOD & NOURISHMENT',   ta: 'உணவு & ஊட்டம்' },
  ambulance: { en: 'EMERGENCY TRANSPORT',  ta: 'அவசர போக்குவரத்து' },
  lastrites: { en: 'DIGNITY IN DEATH',     ta: 'மரணத்தில் கண்ணியம்' },
  elderly:   { en: 'ELDER CARE',           ta: 'முதியோர் பராமரிப்பு' },
  education: { en: 'EDUCATION ACCESS',     ta: 'கல்வி வாய்ப்பு' },
  medical:   { en: 'MEDICAL SUPPORT',      ta: 'மருத்துவ உதவி' },
};

function getIcon(name: string) {
  switch (name) {
    case 'Utensils':      return <FaUtensils className="h-5 w-5" />;
    case 'Ambulance':     return <FaTruckMedical className="h-5 w-5" />;
    case 'HeartHandshake': return <FaHeart className="h-5 w-5" />;
    case 'UserCheck':     return <FaUserCheck className="h-5 w-5" />;
    case 'GraduationCap': return <FaGraduationCap className="h-5 w-5" />;
    case 'Activity':      return <FaHeartPulse className="h-5 w-5" />;
    default:              return null;
  }
}

export default function ServicesView({ lang, setActiveTab }: ServicesViewProps) {
  const [indexActive, setIndexActive] = useState(0);
  const reduce = useReducedMotion();
  const chapterRefs = useRef<(HTMLElement | null)[]>([]);

  const scrollToChapter = (i: number) => {
    chapterRefs.current[i]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const reveal = (delay = 0) =>
    reduce
      ? { initial: false as const }
      : {
          initial: { opacity: 0, y: 24 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: '-50px' },
          transition: { duration: 0.5, delay },
        };

  const activeService = servicesData[indexActive];
  const activeImg = SERVICE_IMG[activeService.id];

  return (
    <div className="pb-24">

      {/* ── Page Hero ── */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-14 text-center space-y-4">
        <p className="text-xs font-bold uppercase tracking-widest text-emerald-700">
          {lang === 'en' ? 'Nallathe Nadakkum Social Service Trust' : 'நல்லதே நடக்கும் சமூக சேவை அறக்கட்டளை'}
        </p>
        <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
          {lang === 'en' ? 'Our Services & Social Activities' : 'நமது சேவைகள் மற்றும் மக்கள் பணிகள்'}
        </h1>
        <p className="text-base sm:text-lg text-gray-700 leading-relaxed max-w-2xl mx-auto">
          {lang === 'en'
            ? 'Six direct humanitarian programs reaching people who fall outside traditional social safety nets in Tiruchengode, Tamil Nadu.'
            : 'திருச்செங்கோட்டில் முறையான அரசு உதவிகள் எட்டாத நலிந்த மக்களுக்கு உதவிட செயல்படுகின்ற ஆறு மக்கள் நலத் திட்டங்கள்.'}
        </p>
      </section>

      {/* ── Interactive Service Index ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="flex flex-col lg:flex-row border border-gray-100 rounded-2xl overflow-hidden shadow-sm bg-white">

          {/* Left: numbered list */}
          <div className="lg:w-1/2 divide-y divide-gray-50">
            {servicesData.map((s, i) => {
              const a = ACCENT[s.id] ?? ACCENT.food;
              const isActive = i === indexActive;
              return (
                <button
                  key={s.id}
                  onMouseEnter={() => setIndexActive(i)}
                  onFocus={() => setIndexActive(i)}
                  onClick={() => scrollToChapter(i)}
                  className={`w-full text-left flex items-center gap-4 px-6 py-5 transition-all cursor-pointer border-l-4 ${
                    isActive ? `${a.bg} ${a.border}` : 'border-transparent hover:bg-gray-50'
                  }`}
                >
                  <span className={`font-mono text-xl font-bold tabular-nums shrink-0 transition-colors ${
                    isActive ? a.text : 'text-gray-200'
                  }`}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className={`text-[10px] font-bold uppercase tracking-wider transition-colors ${
                      isActive ? a.text : 'text-gray-400'
                    }`}>
                      {SLUGS[s.id]?.[lang] ?? SLUGS[s.id]?.en}
                    </p>
                    <p className="font-display font-bold text-gray-900 text-sm sm:text-base truncate mt-0.5">
                      {s.title[lang]}
                    </p>
                  </div>
                  <div className={`shrink-0 p-1.5 rounded-lg transition-colors ${isActive ? `${a.bg} ${a.text}` : 'text-gray-300'}`}>
                    {getIcon(s.iconName)}
                  </div>
                  <FaChevronRight className={`h-3 w-3 shrink-0 transition-colors ${isActive ? a.text : 'text-gray-200'}`} />
                </button>
              );
            })}
          </div>

          {/* Right: live image preview */}
          <div className="lg:w-1/2 relative min-h-[260px] lg:min-h-0 overflow-hidden bg-gray-100">
            <motion.img
              key={activeService.id}
              src={activeImg}
              alt={activeService.title.en}
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent flex items-end p-6">
              <div>
                <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest mb-1">
                  {SLUGS[activeService.id]?.[lang] ?? ''}
                </p>
                <h3 className="text-white font-display font-bold text-lg sm:text-xl leading-snug">
                  {activeService.title[lang]}
                </h3>
                <p className="text-white/70 text-xs mt-1.5 leading-relaxed line-clamp-2 max-w-xs">
                  {activeService.description[lang]}
                </p>
              </div>
            </div>
          </div>

        </div>
        <p className="text-center text-[11px] text-gray-400 mt-3">
          {lang === 'en'
            ? 'Hover to preview · Click to jump to chapter'
            : 'காட்சியைக் காண மேலே நகர்த்தவும் · பகுதிக்குச் செல்ல கிளிக் செய்யவும்'}
        </p>
      </section>

      {/* ── Service Chapters ── */}
      {servicesData.map((service, i) => {
        const a = ACCENT[service.id] ?? ACCENT.food;
        const num = String(i + 1).padStart(2, '0');
        const slug = SLUGS[service.id]?.[lang] ?? SLUGS[service.id]?.en ?? '';
        const imgLeft = i % 2 === 1;
        const sectionBg = i % 2 === 0 ? '' : 'bg-gray-50/70';

        return (
          <section
            key={service.id}
            ref={el => { chapterRefs.current[i] = el; }}
            id={`service-${service.id}`}
            className={`scroll-mt-24 py-16 lg:py-24 ${sectionBg}`}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className={`flex flex-col ${imgLeft ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-10 lg:gap-16 items-start lg:items-center`}>

                {/* ── Text side ── */}
                <div className="flex-1 space-y-6 min-w-0">

                  <motion.div className="flex items-baseline gap-3" {...reveal(0)}>
                    <span className={`font-mono text-6xl font-black leading-none select-none ${a.text} opacity-20`}>
                      {num}
                    </span>
                    <span className={`text-[10px] font-bold uppercase tracking-widest ${a.text}`}>
                      {slug}
                    </span>
                  </motion.div>

                  <motion.h2
                    className="font-display text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight"
                    {...reveal(0.05)}
                  >
                    {service.title[lang]}
                  </motion.h2>

                  <motion.p
                    className="text-base sm:text-lg text-gray-700 leading-relaxed"
                    {...reveal(0.1)}
                  >
                    {service.detailedDescription[lang]}
                  </motion.p>

                  {/* ── Food: daily sponsorship costs + quality pledge ── */}
                  {service.id === 'food' && (
                    <motion.div
                      className={`rounded-2xl border ${a.border} ${a.bg} p-5 sm:p-6 space-y-5`}
                      {...reveal(0.12)}
                    >
                      <p className={`text-[11px] font-bold uppercase tracking-widest ${a.text}`}>
                        {lang === 'en' ? 'Sponsor a Meal — Daily Costs' : 'ஒரு வேளை உணவை ஸ்பான்சர் செய்யுங்கள் — தினசரி செலவு'}
                      </p>

                      {[
                        {
                          head: { en: 'Outdoor Food Distribution (Daily)', ta: 'சாலையோர அன்னதானம் (தினசரி)' },
                          slots: [
                            { t: { en: 'Morning', ta: 'காலை' }, v: '2,000' },
                            { t: { en: 'Afternoon', ta: 'மதியம்' }, v: '3,000' },
                            { t: { en: 'Night', ta: 'இரவு' }, v: '2,000' },
                          ],
                        },
                        {
                          head: { en: 'Indoor Food — Mudhiyor Illam (Old-Age Home)', ta: 'முதியோர் இல்ல உணவு' },
                          slots: [
                            { t: { en: 'Morning', ta: 'காலை' }, v: '4,500' },
                            { t: { en: 'Afternoon', ta: 'மதியம்' }, v: '6,000' },
                            { t: { en: 'Night', ta: 'இரவு' }, v: '4,500' },
                          ],
                        },
                      ].map((row, ri) => (
                        <div key={ri} className="space-y-2">
                          <p className="text-sm font-bold text-gray-900">{row.head[lang]}</p>
                          <div className="grid grid-cols-3 gap-2">
                            {row.slots.map((s, si) => (
                              <div key={si} className="rounded-xl bg-white/80 border border-white px-3 py-2.5 text-center">
                                <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-500">
                                  {s.t[lang]}
                                </p>
                                <p className={`font-mono font-bold text-base sm:text-lg ${a.text}`}>
                                  ₹{s.v}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}

                      <p className="text-sm text-gray-700 leading-relaxed border-t border-white pt-4">
                        <span className="font-bold text-gray-900">
                          {lang === 'en' ? 'No compromise on quality: ' : 'தரத்தில் சமரசம் இல்லை: '}
                        </span>
                        {lang === 'en'
                          ? 'every meal is prepared using top-quality ingredients — the same standard we would serve our own family.'
                          : 'ஒவ்வொரு உணவும் தரமான, உயர்தர பொருட்களைக் கொண்டே தயாரிக்கப்படுகிறது — நம் சொந்தக் குடும்பத்திற்கு வழங்கும் அதே தரத்தில்.'}
                      </p>
                    </motion.div>
                  )}

                  {/* ── Ambulance: free-only-for-BPL emphasis ── */}
                  {service.id === 'ambulance' && (
                    <motion.div
                      className={`rounded-2xl border ${a.border} ${a.bg} p-5 sm:p-6`}
                      {...reveal(0.12)}
                    >
                      <p className={`text-[11px] font-bold uppercase tracking-widest ${a.text} mb-1.5`}>
                        {lang === 'en' ? 'Eligibility' : 'தகுதி'}
                      </p>
                      <p className="text-base sm:text-lg font-semibold text-gray-900 leading-relaxed">
                        {lang === 'en'
                          ? 'A totally free ambulance service — provided only to people living below the poverty line.'
                          : 'முற்றிலும் இலவச ஆம்புலன்ஸ் சேவை — வறுமைக்கோட்டிற்குக் கீழே உள்ள மக்களுக்கு மட்டுமே வழங்கப்படுகிறது.'}
                      </p>
                    </motion.div>
                  )}

                  <motion.div className={`w-14 border-t-2 ${a.border}`} {...reveal(0.12)} />

                  <motion.div className="flex flex-wrap gap-3" {...reveal(0.15)}>
                    <button
                      onClick={() => setActiveTab('help')}
                      className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold ${a.bg} ${a.text} hover:opacity-90 transition-opacity cursor-pointer`}
                    >
                      <FaPhoneFlip className="h-3.5 w-3.5" />
                      {lang === 'en' ? 'Request Help' : 'உதவி கோர'}
                    </button>
                    <button
                      onClick={() => setActiveTab('donate')}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold bg-emerald-600 text-white hover:bg-emerald-700 transition-colors cursor-pointer"
                    >
                      <FaIndianRupeeSign className="h-3.5 w-3.5" />
                      {lang === 'en' ? 'Support This Program' : 'இந்த திட்டத்தை ஆதரிக்க'}
                    </button>
                    <button
                      onClick={() => setActiveTab('volunteer')}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold border border-gray-200 text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
                    >
                      <FaUsers className="h-3.5 w-3.5" />
                      {lang === 'en' ? 'Volunteer' : 'தன்னார்வலர்'}
                    </button>
                  </motion.div>

                  <motion.div
                    className="grid grid-cols-1 sm:grid-cols-3 gap-x-6 gap-y-4 pt-2"
                    {...reveal(0.2)}
                  >
                    <div className="space-y-1.5">
                      <p className={`text-[10px] font-bold uppercase tracking-wider ${a.text}`}>
                        {lang === 'en' ? 'How to Request' : 'உதவி பெறுவது எப்படி'}
                      </p>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        {service.howToRequest[lang]}
                      </p>
                    </div>
                    <div className="space-y-1.5">
                      <p className={`text-[10px] font-bold uppercase tracking-wider ${a.text}`}>
                        {lang === 'en' ? 'How to Donate' : 'நன்கொடை வழங்குவது எப்படி'}
                      </p>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        {service.howToDonate[lang]}
                      </p>
                    </div>
                    <div className="space-y-1.5">
                      <p className={`text-[10px] font-bold uppercase tracking-wider ${a.text}`}>
                        {lang === 'en' ? 'Volunteer Role' : 'தன்னார்வ பணி'}
                      </p>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        {service.volunteerRole[lang]}
                      </p>
                    </div>
                  </motion.div>
                </div>

                {/* ── Image side ── */}
                <motion.div className="w-full lg:w-5/12 shrink-0" {...reveal(0.07)}>
                  <div className="relative rounded-2xl overflow-hidden shadow-md aspect-[4/3]">
                    <img
                      src={SERVICE_IMG[service.id]}
                      alt={service.title.en}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3">
                      <span className={`inline-block text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm ${a.text}`}>
                        {num} / {SLUGS[service.id]?.en}
                      </span>
                    </div>
                  </div>
                </motion.div>

              </div>
            </div>
          </section>
        );
      })}

      {/* ── Verification Notice ── */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center space-y-4">
        <div className="w-10 h-px bg-gray-200 mx-auto" />
        <div className="flex items-center justify-center gap-2 flex-wrap">
          <Monogram label="i" size="xs" />
          <p className="text-sm font-semibold text-emerald-800">
            {lang === 'en'
              ? 'All request submissions undergo physical verification'
              : 'கோரிக்கைகள் அனைத்தும் நேரடி ஆய்வுக்குப் பின்னரே ஏற்றுக்கொள்ளப்படும்'}
          </p>
        </div>
        <p className="text-sm text-gray-600 max-w-xl mx-auto leading-relaxed">
          {lang === 'en'
            ? 'Our local volunteer network verifies every help request prior to resource allocation to ensure donor funds go to genuine, highly distressed cases.'
            : 'நன்கொடையாளர் நிதி தகுதியுள்ள நபர்களைச் சென்றடைவதை உறுதிசெய்ய, உதவி கோரிக்கைகள் அனைத்தும் எமது தன்னார்வலர்களின் நேரடி ஆய்வுக்கு உட்படுத்தப்படும்.'}
        </p>
        <div className="w-10 h-px bg-gray-200 mx-auto" />
      </section>

    </div>
  );
}

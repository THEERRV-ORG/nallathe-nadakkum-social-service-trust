import { useState, useRef, useEffect } from 'react';
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
  FaShareNodes,
  FaUserLarge,
  FaShieldHalved,
} from 'react-icons/fa6';
import { servicesData } from '../data';

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

  // Desktop scroll-pin: while the section stays pinned, vertical scroll steps
  // the selection through all six services (same visual as hovering) before the
  // page continues down to the chapters.
  const indexPinRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = indexPinRef.current;
    if (!el || reduce) return;
    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight; // scrollable while pinned
      if (total <= 0) return;
      const progressed = Math.min(Math.max(-rect.top, 0), total);
      const p = progressed / total;
      const idx = Math.min(
        servicesData.length - 1,
        Math.max(0, Math.floor(p * servicesData.length)),
      );
      setIndexActive(idx);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [reduce]);

  // Shared index card (numbered list + live preview), used by both the
  // desktop scroll-pinned version and the mobile/reduced-motion static version.
  const indexInner = (
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
            <p className="text-white text-xs mt-1.5 leading-relaxed line-clamp-2 max-w-xs">
              {activeService.description[lang]}
            </p>
          </div>
        </div>
      </div>

    </div>
  );

  return (
    <div className="pb-24">

      {/* ── Page Hero ── */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-14 text-center space-y-4">
        <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
          {lang === 'en' ? 'Our Services & Social Activities' : 'நமது சேவைகள் மற்றும் மக்கள் பணிகள்'}
        </h1>
        <p className="text-base sm:text-lg text-gray-900 leading-relaxed max-w-2xl mx-auto">
          {lang === 'en'
            ? 'Six direct humanitarian programs reaching people who fall outside traditional social safety nets in Tiruchengode, Tamil Nadu.'
            : 'திருச்செங்கோட்டில் முறையான அரசு உதவிகள் எட்டாத நலிந்த மக்களுக்கு உதவிட செயல்படுகின்ற ஆறு மக்கள் நலத் திட்டங்கள்.'}
        </p>
      </section>

      {/* ── Interactive Service Index ── */}
      {/* Desktop: scroll-pinned. While pinned, scrolling steps the selection
          through all six services before the page continues to the chapters. */}
      {!reduce && (
        <div ref={indexPinRef} className="hidden lg:block relative" style={{ height: 'calc(100vh + 110vh)' }}>
          <div className="sticky top-16 flex h-[calc(100vh-4rem)] items-center">
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {indexInner}
              <p className="text-center text-[11px] text-gray-400 mt-3">
                {lang === 'en'
                  ? 'Scroll to browse each service · Click to jump to its chapter'
                  : 'ஒவ்வொரு சேவையையும் காண உருட்டவும் · பகுதிக்குச் செல்ல கிளிக் செய்யவும்'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Mobile / reduced-motion: normal static index */}
      <section className={`${reduce ? '' : 'lg:hidden'} max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-14`}>
        {indexInner}
        <p className="text-center text-[11px] text-gray-400 mt-3">
          {lang === 'en'
            ? 'Tap a service to jump to its chapter'
            : 'பகுதிக்குச் செல்ல ஒரு சேவையைத் தட்டவும்'}
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
            className={`scroll-mt-24 py-11 lg:py-16 ${sectionBg}`}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

              {/* Chapter header — number + slug sit above both columns so the
                  photo below starts exactly at the service title line. */}
              <motion.div className="flex items-baseline gap-3 mb-5 lg:mb-6" {...reveal(0)}>
                <span className={`font-mono text-6xl font-black leading-none select-none ${a.text} opacity-20`}>
                  {num}
                </span>
                <span className={`text-[10px] font-bold uppercase tracking-widest ${a.text}`}>
                  {slug}
                </span>
              </motion.div>

              <div className={`flex flex-col ${imgLeft ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-10 lg:gap-16 items-start`}>

                {/* ── Text side ── */}
                <div className="flex-1 space-y-6 min-w-0">

                  <motion.h2
                    className="font-display text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight"
                    {...reveal(0.05)}
                  >
                    {service.title[lang]}
                  </motion.h2>

                  <motion.p
                    className="text-base sm:text-lg text-gray-900 leading-relaxed"
                    {...reveal(0.1)}
                  >
                    {service.detailedDescription[lang]}
                  </motion.p>

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
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold border border-gray-200 text-gray-900 hover:bg-gray-100 transition-colors cursor-pointer"
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
                      <p className="text-xs text-gray-900 leading-relaxed">
                        {service.howToRequest[lang]}
                      </p>
                    </div>
                    <div className="space-y-1.5">
                      <p className={`text-[10px] font-bold uppercase tracking-wider ${a.text}`}>
                        {lang === 'en' ? 'How to Donate' : 'நன்கொடை வழங்குவது எப்படி'}
                      </p>
                      <p className="text-xs text-gray-900 leading-relaxed">
                        {service.howToDonate[lang]}
                      </p>
                    </div>
                    <div className="space-y-1.5">
                      <p className={`text-[10px] font-bold uppercase tracking-wider ${a.text}`}>
                        {lang === 'en' ? 'Volunteer Role' : 'தன்னார்வ பணி'}
                      </p>
                      <p className="text-xs text-gray-900 leading-relaxed">
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

              {/* ── Full-width detail box below the picture (keeps every service
                  section symmetric — the special panels no longer stretch one
                  column taller than the other). ── */}
              {service.id === 'food' && (
                <motion.div
                  className={`mt-10 lg:mt-12 rounded-2xl border ${a.border} ${a.bg} p-5 sm:p-6 space-y-5`}
                  {...reveal(0.12)}
                >
                  <p className={`text-[11px] font-bold uppercase tracking-widest ${a.text}`}>
                    {lang === 'en' ? 'Sponsor a Meal — Daily Costs' : 'ஒரு வேளை உணவை ஸ்பான்சர் செய்யுங்கள் — தினசரி செலவு'}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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
                              <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-900">
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
                  </div>

                  <p className="text-sm text-gray-900 leading-relaxed border-t border-white pt-4">
                    <span className="font-bold text-gray-900">
                      {lang === 'en' ? 'No compromise on quality: ' : 'தரத்தில் சமரசம் இல்லை: '}
                    </span>
                    {lang === 'en'
                      ? 'every meal is prepared using top-quality ingredients — the same standard we would serve our own family.'
                      : 'ஒவ்வொரு உணவும் தரமான, உயர்தர பொருட்களைக் கொண்டே தயாரிக்கப்படுகிறது — நம் சொந்தக் குடும்பத்திற்கு வழங்கும் அதே தரத்தில்.'}
                  </p>
                </motion.div>
              )}

              {service.id === 'ambulance' && (
                <motion.div
                  className={`mt-10 lg:mt-12 rounded-2xl border ${a.border} ${a.bg} p-5 sm:p-6`}
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
            </div>
          </section>
        );
      })}

      {/* ── Verification Notice — highlighted trust callout ── */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="relative overflow-hidden rounded-3xl border border-emerald-200 bg-gradient-to-br from-emerald-50 via-white to-emerald-50/60 p-8 sm:p-12 text-center shadow-[0_16px_40px_-16px_rgba(31,115,74,0.35)] ring-1 ring-emerald-100">
          {/* Soft brand glow accents */}
          <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-emerald-400/10 blur-2xl" />
          <div className="pointer-events-none absolute -left-10 -bottom-10 h-40 w-40 rounded-full bg-emerald-500/10 blur-2xl" />

          <div className="relative space-y-5">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-md">
              <FaShieldHalved className="h-7 w-7" />
            </div>

            <h3 className="font-display text-xl sm:text-2xl lg:text-3xl font-bold text-emerald-900 leading-snug">
              {lang === 'en'
                ? 'All request submissions undergo physical verification'
                : 'கோரிக்கைகள் அனைத்தும் நேரடி ஆய்வுக்குப் பின்னரே ஏற்றுக்கொள்ளப்படும்'}
            </h3>

            <p className="text-base sm:text-lg text-gray-900 max-w-2xl mx-auto leading-relaxed sm:leading-[1.7]">
              {lang === 'en'
                ? 'Our local volunteer network verifies every help request prior to resource allocation to ensure donor funds go to genuine, highly distressed cases.'
                : 'நன்கொடையாளர் நிதி தகுதியுள்ள நபர்களைச் சென்றடைவதை உறுதிசெய்ய, உதவி கோரிக்கைகள் அனைத்தும் எமது தன்னார்வலர்களின் நேரடி ஆய்வுக்கு உட்படுத்தப்படும்.'}
            </p>
          </div>
        </div>
      </section>

      {/* ── Our Teams (placeholder) ──────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-4 space-y-10">
        <div className="text-center space-y-2">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-gray-900">
            {lang === 'en' ? 'Our Teams' : 'எங்கள் குழுக்கள்'}
          </h2>
          <p className="text-sm sm:text-base text-gray-900 max-w-xl mx-auto">
            {lang === 'en'
              ? 'Dedicated volunteers work across four core teams every day. Member photos and details will be added soon.'
              : 'அர்ப்பணிப்புள்ள தன்னார்வலர்கள் நான்கு முக்கிய குழுக்களாக தினமும் செயல்படுகிறார்கள். உறுப்பினர்களின் படங்களும் விவரங்களும் விரைவில் இணைக்கப்படும்.'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: <FaUtensils className="h-5 w-5" />, tile: 'bg-brand-orange-50 text-brand-orange-700', name: { en: 'Cooking Team', ta: 'சமையல் குழு' }, desc: { en: 'Prepares and packs daily Annadhanam meals.', ta: 'தினசரி அன்னதான உணவைத் தயாரித்து பேக் செய்கிறது.' } },
            { icon: <FaTruckMedical className="h-5 w-5" />, tile: 'bg-brand-blue-50 text-brand-blue-700', name: { en: 'Transport Team', ta: 'போக்குவரத்து குழு' }, desc: { en: 'Runs meal routes and the free ambulance.', ta: 'உணவு விநியோகம் மற்றும் இலவச ஆம்புலன்ஸ் இயக்குகிறது.' } },
            { icon: <FaHeart className="h-5 w-5" />, tile: 'bg-brand-violet-50 text-brand-violet-700', name: { en: 'Last Rites Team', ta: 'இறுதிச் சடங்கு குழு' }, desc: { en: 'Handles dignified last rites coordination.', ta: 'கண்ணியமான இறுதிச் சடங்குகளை ஒருங்கிணைக்கிறது.' } },
            { icon: <FaShareNodes className="h-5 w-5" />, tile: 'bg-brand-gold-50 text-brand-gold-700', name: { en: 'Social Media Team', ta: 'சமூக ஊடகக் குழு' }, desc: { en: 'Documents work and manages online updates.', ta: 'பணிகளைப் பதிவு செய்து ஆன்லைன் புதுப்பிப்புகளை நிர்வகிக்கிறது.' } },
          ].map((team, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="rounded-2xl border border-gray-100 bg-white p-6 shadow-[0_10px_30px_-12px_rgba(16,24,40,0.15)] ring-1 ring-gray-900/[0.04] flex flex-col space-y-4"
            >
              {/* Team header */}
              <div className="flex items-center gap-3">
                <div className={`p-2.5 rounded-xl w-fit shrink-0 ${team.tile}`}>
                  {team.icon}
                </div>
                <h3 className="font-display text-base font-bold text-gray-900 leading-tight">
                  {team.name[lang]}
                </h3>
              </div>

              <p className="text-sm text-gray-900 leading-relaxed">
                {team.desc[lang]}
              </p>

              {/* Member photo placeholders — replace with real member photos later */}
              <div className="mt-auto space-y-2.5 pt-1">
                {[0, 1, 2].map((m) => (
                  <div key={m} className="flex items-center gap-3">
                    <div className="h-9 w-9 shrink-0 rounded-full border-2 border-dashed border-gray-200 bg-gray-50 flex items-center justify-center text-gray-300">
                      <FaUserLarge className="h-3.5 w-3.5" />
                    </div>
                    <div className="min-w-0 flex-1 space-y-1">
                      <div className="h-2 w-20 rounded bg-gray-100" />
                      <div className="h-2 w-14 rounded bg-gray-100" />
                    </div>
                  </div>
                ))}
                <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 pt-1">
                  {lang === 'en' ? 'Members coming soon' : 'உறுப்பினர்கள் விரைவில்'}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

    </div>
  );
}





import { useState, useEffect } from 'react';
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
  FaShieldHalved,
} from 'react-icons/fa6';
import { DonatePreset, servicesData } from '../data';

interface ServicesViewProps {
  lang: 'en' | 'ta';
  setActiveTab: (tab: string) => void;
  setDonatePreset: (preset: DonatePreset) => void;
}

// Confirmed image assets in /public/gallery/
const SERVICE_IMG: Record<string, string> = {
  food:      '/gallery/activity-food-indoor.jpeg',
  ambulance: '/gallery/activity-ambulance-banner.jpeg',
  lastrites: '/gallery/activity-last-rites-indoor.jpg',
  elderly:   '/gallery/activity-elder-rescue1.jpeg',
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

const DONATE_PRESETS: Record<string, DonatePreset> = {
  food: { type: 'Money', program: 'annadhanam', amount: '2000' },
  ambulance: { type: 'Money', program: 'ambulance', amount: '2500' },
  lastrites: { type: 'Money', program: 'cremation', amount: '5000' },
  elderly: { type: 'Money', program: 'elderly', amount: '1000' },
  education: { type: 'Money', program: 'student', amount: '5000' },
  medical: { type: 'Money', program: 'medical', amount: '1000' },
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

export default function ServicesView({ lang, setActiveTab, setDonatePreset }: ServicesViewProps) {
  const [indexActive, setIndexActive] = useState(0);
  const [mealSlideIndex, setMealSlideIndex] = useState(0);
  const reduce = useReducedMotion();
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
  const activeAccent = ACCENT[activeService.id] ?? ACCENT.food;
  const mealSlides = [
    { label: { en: 'Breakfast', ta: 'காலை உணவு' }, src: '/gallery/activity-food-indoor.jpeg' },
    { label: { en: 'Lunch', ta: 'மதிய உணவு' }, src: '/gallery/activity-water-street.jpg' },
    { label: { en: 'Dinner', ta: 'இரவு உணவு' }, src: '/gallery/activity-clothes-distribution.jpeg' },
  ];

  useEffect(() => {
    if (reduce) return;
    const timer = window.setInterval(() => {
      setIndexActive((current) => (current + 1) % servicesData.length);
    }, 4500);
    return () => window.clearInterval(timer);
  }, [reduce]);

  useEffect(() => {
    if (reduce) return;
    const timer = window.setInterval(() => {
      setMealSlideIndex((current) => (current + 1) % mealSlides.length);
    }, 3000);
    return () => window.clearInterval(timer);
  }, [mealSlides.length, reduce]);

  return (
    <div className="pb-24">

      {/* ── Page Hero ── */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-14 text-center space-y-4">
        <h1 className="h1-page">
          {lang === 'en' ? 'Practical Support. Compassionate Action. Dignified Care.' : 'எங்கள் சேவைகள்'}
        </h1>
        <p className="text-base sm:text-lg text-gray-900 leading-relaxed max-w-2xl mx-auto">
          {lang === 'en' ? (
            'Our services are designed to respond to urgent human needs with respect, responsibility, and local community involvement.'
          ) : (
            <>
              <strong>தேவைக்கான உதவி மட்டும் அல்ல, இதயத்திலிருந்து வரும் பொறுப்பு</strong>
              <br />
              ஒவ்வொரு சேவையும் ஒருவரின் துயரத்தை குறைக்க, அவரின் மரியாதையை காக்க, அவரின் வாழ்வில் நம்பிக்கையை மீட்டெடுக்க உருவாக்கப்பட்டது.
            </>
          )}
        </p>
      </section>

      {/* Rotating Service Image Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-14">
        <div className="relative min-h-[380px] overflow-hidden rounded-2xl bg-gray-100 shadow-[0_10px_30px_-12px_rgba(16,24,40,0.15)] ring-1 ring-gray-900/[0.04] sm:min-h-[520px]">
          <motion.img
            key={activeService.id}
            src={activeImg}
            alt={activeService.title.en}
            initial={reduce ? false : { opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/5" />
          <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8 lg:p-12">
            <div className="max-w-3xl space-y-3">
              <span className={`section-eyebrow inline-flex items-center gap-2 rounded-full px-3 py-1.5 ring-1 backdrop-blur ${activeAccent.bg} ${activeAccent.text} ${activeAccent.border}`}>
                {getIcon(activeService.iconName)}
                {SLUGS[activeService.id]?.[lang] ?? ''}
              </span>
              <h2 className="font-display text-3xl font-extrabold leading-tight text-white sm:text-5xl">
                {activeService.title[lang]}
              </h2>
              <p className="max-w-2xl text-sm leading-relaxed text-white/90 sm:text-base">
                {activeService.description[lang]}
              </p>
            </div>
          </div>
          <div className="absolute bottom-5 right-5 flex gap-2 sm:bottom-8 sm:right-8">
            {servicesData.map((service, i) => {
              const dotAccent = ACCENT[service.id] ?? ACCENT.food;
              return (
              <span
                key={service.id}
                className={`h-2 rounded-full transition-all ${
                  i === indexActive ? `w-8 ${dotAccent.bg}` : 'w-2 bg-white/45'
                }`}
                aria-hidden="true"
              />
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Service Chapters ── */}
      {servicesData.map((service, i) => {
        const a = ACCENT[service.id] ?? ACCENT.food;
        const num = String(i + 1).padStart(2, '0');
        const slug = SLUGS[service.id]?.[lang] ?? SLUGS[service.id]?.en ?? '';
        const imgLeft = i % 2 === 1;
        const sectionBg = i % 2 === 0 ? '' : 'bg-emerald-50/45';

        return (
          <section
            key={service.id}
            id={`service-${service.id}`}
            className={`scroll-mt-24 py-11 lg:py-16 ${sectionBg}`}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

              {/* Chapter header — number + slug sit above both columns so the
                  photo below starts exactly at the service title line. */}
              <motion.div className="flex items-baseline gap-3 mb-5 lg:mb-6" {...reveal(0)}>
                <span className={`font-display text-lg sm:text-2xl font-black leading-none select-none ${a.text} opacity-40`}>
                  {num}
                </span>
                <span className={`text-lg sm:text-2xl font-bold uppercase tracking-wider ${a.text}`}>
                  {slug}
                </span>
              </motion.div>

              <div className={`flex flex-col ${imgLeft ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-10 lg:gap-16 items-start`}>

                {/* ── Text side ── */}
                <div className="flex-1 space-y-6 min-w-0">

                  <motion.h2
                    className="h2-section"
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
                      onClick={() => {
                        setDonatePreset(DONATE_PRESETS[service.id] ?? { type: 'Money', program: 'general', amount: '1000' });
                        setActiveTab('donate');
                      }}
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
                  <div className="space-y-1">
                    <p className={`text-[11px] font-bold uppercase tracking-widest ${a.text}`}>
                      {lang === 'en' ? 'Sponsor a Meal' : 'ஒரு வேளை உணவை ஆதரிக்க'}
                    </p>
                    <p className="text-sm font-medium text-gray-900">
                      {lang === 'en'
                        ? 'Choose a meal session to support. Each listed session is planned for approximately 50 persons.'
                        : 'ஆதரிக்க வேண்டிய உணவு நேரத்தைத் தேர்வு செய்யுங்கள். ஒவ்வொரு உணவு நேரமும் சுமார் 50 பேருக்காக திட்டமிடப்பட்டுள்ளது.'}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(220px,0.34fr)] lg:items-stretch">
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-0">
                      {[
                        {
                          head: { en: 'Roadside Meals', ta: 'சாலையோர உணவு' },
                          sub: { en: 'Food distributed outdoors', ta: 'வெளிப்புறங்களில் வழங்கப்படும் உணவு' },
                          slots: [
                            { t: { en: 'Breakfast', ta: 'காலை உணவு' }, v: '2,000' },
                            { t: { en: 'Lunch', ta: 'மதிய உணவு' }, v: '3,000' },
                            { t: { en: 'Dinner', ta: 'இரவு உணவு' }, v: '2,000' },
                          ],
                        },
                        {
                          head: { en: 'Old-Age Home Meals', ta: 'முதியோர் இல்ல உணவு' },
                          sub: { en: 'Food supplied to nearby old-age homes', ta: 'அருகிலுள்ள முதியோர் இல்லங்களுக்கு உணவு வழங்கல்' },
                          slots: [
                            { t: { en: 'Breakfast', ta: 'காலை உணவு' }, v: '4,500' },
                            { t: { en: 'Lunch', ta: 'மதிய உணவு' }, v: '6,000' },
                            { t: { en: 'Dinner', ta: 'இரவு உணவு' }, v: '4,500' },
                          ],
                        },
                      ].map((row, ri) => (
                        <div key={ri} className={`space-y-3 ${ri === 1 ? 'sm:border-l sm:border-brand-orange-200 sm:pl-5' : 'sm:pr-5'}`}>
                          <div>
                            <p className="font-display text-sm font-bold uppercase tracking-wider text-gray-900">{row.head[lang]}</p>
                            <p className="text-xs font-medium text-gray-700">{row.sub[lang]}</p>
                          </div>
                          <div className="divide-y divide-brand-orange-200/70">
                            {row.slots.map((s, si) => (
                              <div key={si} className="grid grid-cols-[1fr_auto] items-center gap-4 py-2 first:pt-0 last:pb-0">
                                <p className="text-sm font-semibold text-gray-900">
                                  {s.t[lang]}
                                </p>
                                <p className={`text-right font-display text-base font-black leading-none sm:text-lg ${a.text}`}>
                                  ₹{s.v}
                                  <span className="ml-1 font-sans text-[10px] font-bold uppercase tracking-wide text-gray-600">
                                    {lang === 'en' ? 'per session' : 'ஒரு நேரம்'}
                                  </span>
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="relative min-h-[170px] overflow-hidden rounded-xl bg-brand-orange-100/60">
                      <motion.img
                        key={mealSlides[mealSlideIndex].label.en}
                        src={mealSlides[mealSlideIndex].src}
                        alt={mealSlides[mealSlideIndex].label.en}
                        initial={reduce ? false : { opacity: 0, scale: 1.03 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.45 }}
                        className="absolute inset-0 h-full w-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                      <div className="absolute bottom-3 left-3">
                        <p className="rounded-full bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-gray-900 backdrop-blur">
                          {mealSlides[mealSlideIndex].label[lang]}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 border-t border-brand-orange-200/70 pt-4 text-sm leading-relaxed text-gray-900">
                    <p>
                      <span className="font-bold">
                        {lang === 'en'
                          ? 'Each amount sponsors one complete meal session for approximately 50 persons. '
                          : 'ஒவ்வொரு தொகையும் சுமார் 50 பேருக்கான ஒரு முழு உணவு நேரத்தை ஆதரிக்கும். '}
                      </span>
                      {lang === 'en' ? 'We never compromise on food quality.' : 'உணவின் தரத்தில் எப்போதும் சமரசம் இல்லை.'}
                    </p>
                    <p className="text-xs leading-relaxed text-gray-800">
                      {lang === 'en'
                        ? 'Old-age home meal support refers to food supplied to nearby old-age homes in the locality. Nallathae Nadakkum Trust does not own, operate, or maintain any old-age home.'
                        : 'முதியோர் இல்ல உணவு உதவி என்பது அருகிலுள்ள முதியோர் இல்லங்களுக்கு உணவு வழங்குவதை குறிக்கும். நல்லதே நடக்கும் அறக்கட்டளை எந்த முதியோர் இல்லத்தையும் சொந்தமாக வைத்திருக்கவோ, இயக்கவோ, பராமரிக்கவோ இல்லை.'}
                    </p>
                  </div>
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
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="relative overflow-hidden rounded-3xl border border-emerald-200 bg-gradient-to-br from-emerald-50 via-white to-emerald-50/60 p-8 sm:p-12 text-center shadow-[0_16px_40px_-16px_rgba(31,115,74,0.35)] ring-1 ring-emerald-100">
          {/* Soft brand glow accents */}
          <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-emerald-400/10 blur-2xl" />
          <div className="pointer-events-none absolute -left-10 -bottom-10 h-40 w-40 rounded-full bg-emerald-500/10 blur-2xl" />

          <div className="relative space-y-5">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-md">
              <FaShieldHalved className="h-7 w-7" />
            </div>

            <h3 className="font-display text-xl sm:text-2xl font-bold text-emerald-900 leading-snug">
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

    </div>
  );
}





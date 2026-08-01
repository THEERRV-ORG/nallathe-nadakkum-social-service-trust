import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  FaHeart, FaHeartPulse, FaTruckMedical, FaUtensils, FaAward, FaFileLines, FaChevronRight,
  FaGraduationCap, FaCircleCheck, FaCamera, FaVideo, FaDroplet, FaShirt, FaInstagram, FaFacebookF, FaYoutube
} from 'react-icons/fa6';
import { commonTranslations, statsData } from '../data';
import { OFFICIAL_SOCIAL } from '../security';
import CountUpStat from './CountUpStat';
import { StarsBackground } from './ui/stars';

interface HomeViewProps {
  lang: 'en' | 'ta';
  setActiveTab: (tab: string) => void;
}

// Hero slides are ordered by programme priority so Food Donation and Last Rites
// lead. When Kavin supplies dedicated Food / Last Rites photos or videos, replace
// the first two entries in place — the slideshow architecture stays unchanged.
const heroImages = [
  // 1. Food Donation / Annadhanam
  { src: '/gallery/activity-food-indoor.jpeg', alt: 'Elderly men eating a full meal at our shelter' },
  // 2. Last Rites
  { src: '/gallery/activity-last-rites-indoor.jpg', alt: 'Dignified last rites conducted with the family' },
  // Supporting services
  { src: '/gallery/activity-water-street.jpg', alt: 'Street food and water distribution to elders' },
  { src: '/gallery/activity-ambulance-banner.jpeg', alt: 'Nallathae Nadakkum free ambulance service launch' },
  { src: '/gallery/activity-elder-rescue.jpeg', alt: 'Destitute elderly rescued and cared for' },
];

// Display priority for the "What Can You Donate" cards (highest need first).
const DONATE_PRIORITY = ['annadhanam', 'cremation', 'blood', 'ambulance', 'student', 'dress'];

export default function HomeView({ lang, setActiveTab }: HomeViewProps) {
  const [heroIndex, setHeroIndex] = useState(0);

  const openServiceDetail = (serviceId: string) => {
    setActiveTab('services');
    window.setTimeout(() => {
      document.getElementById(`service-${serviceId}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 80);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroIndex(prev => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-12 pb-8">
      {/* Hero Section */}
      <section className="relative w-full h-[620px] sm:h-[650px] md:h-[700px] flex items-center overflow-hidden">
        {/* Hero Slideshow Background */}
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="sync">
            <motion.img
              key={heroIndex}
              src={heroImages[heroIndex].src}
              alt={heroImages[heroIndex].alt}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: 'easeInOut' }}
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
          </AnimatePresence>
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/75 to-black/90 sm:bg-gradient-to-r sm:from-black/95 sm:via-black/80 sm:to-emerald-950/30"></div>
          {/* Slide dot indicators */}
          <div className="absolute bottom-6 right-6 sm:right-8 flex space-x-2 z-10">
            {heroImages.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setHeroIndex(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  idx === heroIndex ? 'w-6 bg-[#34d399]' : 'w-1.5 bg-white/40 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Hero Content Overlay */}
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl text-white space-y-6">
            
            {/* Trust Registration Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center space-x-2 rounded-full bg-emerald-500/20 backdrop-blur-md border border-emerald-500/30 px-3 py-1 text-xs font-semibold text-[#6ee7b7]"
            >
              <span className="flex h-2 w-2 rounded-full bg-[#34d399] animate-pulse"></span>
              <span>{lang === 'en' ? 'Registered Trust: 16/2025' : 'பதிவு செய்யப்பட்ட அறக்கட்டளை: 16/2025'}</span>
            </motion.div>
            
            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl leading-snug"
            >
              <span className="text-[#34d399]">
                {lang === 'en' ? 'Nallathae Nadakkum' : 'நல்லதே நடக்கும்'}
              </span>
              <br />
              <span className="text-white">
                {lang === 'en' ? 'Social Service Trust' : 'சமூக சேவை அறக்கட்டளை'}
              </span>
            </motion.h1>
            
            {/* Slogan */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-serif text-base sm:text-lg font-medium text-[#6ee7b7] italic border-l-4 border-[#10b981] pl-4"
            >
              "{commonTranslations.heroSlogan[lang]}"
            </motion.p>
            
            {/* Subtitle */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-sm sm:text-base md:text-lg text-white leading-relaxed sm:leading-[1.65] max-w-2xl"
            >
              {commonTranslations.heroSub[lang]}
            </motion.p>
            
            {/* Actions */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-3 sm:gap-4 pt-2"
            >
              <button
                id="hero-donate-btn"
                onClick={() => setActiveTab('donate')}
                className="rounded-lg bg-emerald-600 px-5 py-3 text-xs sm:text-sm font-bold text-white shadow-md hover:bg-emerald-500 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer flex items-center space-x-2"
              >
                <FaHeart className="h-4 w-4 fill-white" />
                <span>{commonTranslations.donateNow[lang]}</span>
              </button>
              
              <button
                id="hero-help-btn"
                onClick={() => setActiveTab('help')}
                className="rounded-lg bg-white/10 backdrop-blur-md border border-white/20 px-5 py-3 text-xs sm:text-sm font-bold text-white shadow-sm hover:bg-white/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer flex items-center space-x-2"
              >
                <span>{commonTranslations.requestHelp[lang]}</span>
                <FaChevronRight className="h-4 w-4 text-[#6ee7b7]" />
              </button>
            </motion.div>

            {/* Quick trust guarantee detail overlay badge */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="pt-4 flex items-start space-x-2.5 text-xs sm:text-sm text-[#6ee7b7] leading-relaxed border-t border-white/10 mt-4 max-w-2xl"
            >
              <FaAward className="h-4 w-4 text-[#34d399] flex-shrink-0 mt-0.5" />
              <p>
                {lang === 'en' 
                  ? 'A grassroots trust dedicated to dignity, service, and responsible community support.'
                  : 'சாலையோரங்கள், மருத்துவமனைகளில் யாருமின்றி தவிக்கும் ஏழைகள், ஆதரவற்ற முதியவர்கள் மற்றும் உரிமை கோரப்படாத உடல்களுக்கு கண்ணியமான முறையில் தொண்டு செய்கிறோம்.'}
              </p>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Trust Introduction + Quick Stats — one unified "Who We Are" box */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-white border border-gray-100 p-6 sm:p-10 shadow-[0_10px_30px_-12px_rgba(16,24,40,0.15)] ring-1 ring-gray-900/[0.04]">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-10">
            {/* Logo — left on desktop, top on mobile */}
            <div className="md:w-[36%] flex justify-center shrink-0">
              <img
                src="/logo.png"
                alt="Nallathae Nadakkum Social Service Trust logo"
                className="h-48 w-48 sm:h-64 sm:w-64 md:h-72 md:w-72 rounded-full object-cover"
              />
            </div>

            {/* Content — right on desktop, left-aligned text */}
            <div className="md:w-[64%] space-y-5 text-center md:text-left">
              <h2 className="h2-section">
                {lang === 'en' ? 'Who We Are' : 'எங்களை பற்றி'}
              </h2>
              <p className="text-base sm:text-lg text-gray-900 leading-relaxed sm:leading-[1.65] max-w-2xl mx-auto md:mx-0">
                {commonTranslations.introShort[lang]}
              </p>
              <div>
                <button
                  onClick={() => setActiveTab('about')}
                  className="text-emerald-700 font-semibold text-sm hover:text-emerald-800 hover:underline inline-flex items-center space-x-1 cursor-pointer"
                >
                  <span>{lang === 'en' ? 'Learn More About Us' : 'எங்கள் அறக்கட்டளையின் முழு வரலாறு & அறங்காவலர்கள் பற்றி படிக்க'}</span>
                  <FaChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Divider between intro and stats */}
          <hr className="my-8 sm:my-10 border-t border-gray-100" />

          {/* Quick Stats — inside the same white box */}
          <div className="mb-8 text-center space-y-1.5">
            <h3 className="h2-section">
              {commonTranslations.quickStatsTitle[lang]}
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-y-10 gap-x-6 sm:grid-cols-3 lg:grid-cols-6 text-center">
            {statsData.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="space-y-2"
              >
                <CountUpStat
                  value={stat.value}
                  className="font-display text-3xl font-extrabold text-emerald-700 sm:text-4xl"
                />
                <div className="text-[11px] sm:text-xs font-medium text-gray-900 leading-snug">
                  {stat.label[lang]}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Follow CTA + Evidence Transparency Highlights */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <StarsBackground
          starColor="#ffffff"
          className="rounded-3xl border border-emerald-900/40 shadow-lg"
        >
          <div className="relative z-10 px-6 py-8 sm:px-10 sm:py-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 text-center md:text-left">
              <div className="space-y-2 max-w-xl">
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">
                  {lang === 'en' ? 'Follow Our Daily Work' : 'எங்கள் தினசரி பணிகளைப் பின்தொடருங்கள்'}
                </h2>
                <p className="text-sm sm:text-base text-emerald-50/80 leading-relaxed sm:leading-[1.65]">
                  {lang === 'en'
                    ? 'See real-time photos and videos of our annadhanam, rescues, and last rites on our official social channels.'
                    : 'எங்கள் அன்னதானம், மீட்பு மற்றும் இறுதி மரியாதை பணிகளின் புகைப்படங்கள் மற்றும் வீடியோக்களை எங்கள் அதிகாரப்பூர்வ சமூக ஊடகங்களில் நேரடியாகக் காணுங்கள்.'}
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
                {[
                  { key: 'instagram', href: OFFICIAL_SOCIAL.instagram, label: 'Instagram', icon: <FaInstagram className="h-6 w-6" />, iconText: 'text-[#E4405F]', iconHover: 'group-hover:bg-[#E4405F] group-hover:text-white' },
                  { key: 'facebook', href: OFFICIAL_SOCIAL.facebook, label: 'Facebook', icon: <FaFacebookF className="h-6 w-6" />, iconText: 'text-[#1877F2]', iconHover: 'group-hover:bg-[#1877F2] group-hover:text-white' },
                  { key: 'youtube', href: OFFICIAL_SOCIAL.youtube, label: 'YouTube', icon: <FaYoutube className="h-6 w-6" />, iconText: 'text-[#FF0000]', iconHover: 'group-hover:bg-[#FF0000] group-hover:text-white' },
                ].map((link) => (
                  <a
                    key={link.key}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Nallathae Nadakkum on ${link.label}`}
                    className="inline-flex items-center gap-3 rounded-xl border border-white/15 bg-white/95 pl-2.5 pr-4 py-2.5 shadow-md backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:bg-white hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-emerald-950 group"
                  >
                    <span className={`inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gray-50 transition-colors ${link.iconText} ${link.iconHover}`}>
                      {link.icon}
                    </span>
                    <span className="flex min-h-12 items-center text-left leading-tight">
                      <span className="block text-sm font-bold text-gray-900">
                        {link.label}
                      </span>
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Uploaded screenshot section hidden by request; keep for future restoration. */}
            {false && (
            <div className="mt-8 grid grid-cols-1 divide-y divide-white/10 border-t border-white/10 pt-6 md:grid-cols-3 md:divide-x md:divide-y-0">
              <div className="flex gap-3 py-4 first:pt-0 last:pb-0 md:px-5 md:py-0 md:first:pl-0 md:last:pr-0">
                <div className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/15 text-brand-gold ring-1 ring-white/15">
                  <FaCircleCheck className="h-5 w-5" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="font-display text-base font-bold text-white">
                    {lang === 'en' ? 'Contribution Recognition' : 'பங்களிப்பு அங்கீகாரம்'}
                  </h3>
                  <p className="text-sm text-emerald-50/80 leading-relaxed">
                    {lang === 'en'
                      ? 'Every donation is recorded and acknowledged with gratitude, ensuring transparency and appreciation for each supporter.'
                      : 'ஒவ்வொரு நன்கொடையும் நன்றியுடன் பதிவு செய்து அங்கீகரிக்கப்படுகிறது. இதன் மூலம் ஒவ்வொரு ஆதரவாளரின் பங்களிப்பும் வெளிப்படையாக மதிப்பளிக்கப்படுகிறது.'}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 py-4 first:pt-0 last:pb-0 md:px-5 md:py-0 md:first:pl-0 md:last:pr-0">
                <div className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/15 text-brand-blue-100 ring-1 ring-white/15">
                  <FaCamera className="h-5 w-5" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="font-display text-base font-bold text-white">
                    {lang === 'en' ? 'Photo Impact Updates' : 'புகைப்பட தாக்கப் பதிவுகள்'}
                  </h3>
                  <p className="text-sm text-emerald-50/80 leading-relaxed">
                    {lang === 'en'
                      ? 'Photo updates help donors understand how their contributions are used and the difference they create in the community.'
                      : 'நன்கொடைகள் எவ்வாறு பயன்படுத்தப்படுகின்றன மற்றும் சமூகத்தில் அவை ஏற்படுத்தும் மாற்றத்தை புகைப்படப் பதிவுகள் மூலம் நன்கொடையாளர்கள் அறிந்துகொள்ளலாம்.'}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 py-4 first:pt-0 last:pb-0 md:px-5 md:py-0 md:first:pl-0 md:last:pr-0">
                <div className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/15 text-brand-orange-100 ring-1 ring-white/15">
                  <FaVideo className="h-5 w-5" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="font-display text-base font-bold text-white">
                    {lang === 'en' ? 'Video Impact Stories' : 'காணொளி தாக்கக் கதைகள்'}
                  </h3>
                  <p className="text-sm text-emerald-50/80 leading-relaxed">
                    {lang === 'en'
                      ? 'Video updates showcase the real outcomes of each initiative and highlight the meaningful impact made possible by donor support.'
                      : 'ஒவ்வொரு சேவை முயற்சியின் உண்மையான விளைவுகளையும், நன்கொடையாளர்களின் ஆதரவால் உருவாகும் நல்ல மாற்றங்களையும் காணொளிப் பதிவுகள் வெளிப்படுத்துகின்றன.'}
                  </p>
                </div>
              </div>
            </div>
            )}
          </div>
        </StarsBackground>
      </section>

      {/* What Can You Donate — bold spotlight panel (key conversion area) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-700 via-emerald-600 to-emerald-800 p-6 sm:p-10 lg:p-14 shadow-[0_30px_80px_-30px_rgba(15,61,38,0.75)] ring-1 ring-emerald-900/20">
          {/* Brand glow accents */}
          <div className="pointer-events-none absolute -left-20 -top-16 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          <div className="pointer-events-none absolute -right-20 -bottom-16 h-72 w-72 rounded-full bg-brand-gold/15 blur-3xl" />

          <div className="relative">
            <div className="text-center space-y-4 mb-10">
              <span className="section-eyebrow inline-flex items-center gap-1.5 rounded-full bg-white/15 backdrop-blur px-3.5 py-1.5 text-white ring-1 ring-white/25">
                <FaHeart className="h-3 w-3 fill-white" />
                {lang === 'en' ? 'Ways to Give' : 'உதவும் வழிகள்'}
              </span>
              <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
                {lang === 'en' ? 'What Can You Donate' : 'நீங்கள் எதை நன்கொடையாக வழங்கலாம்'}
              </h2>
              {/* Accent underline */}
              <div className="mx-auto h-1.5 w-24 rounded-full bg-brand-gold" />
              <p className="text-sm sm:text-base text-emerald-50 max-w-2xl mx-auto">
                {lang === 'en'
                  ? 'Every contribution, whether financial or in kind, can become meaningful support for someone in need. You may choose to support a specific cause that reflects your values.'
                  : 'ஆதரிக்க ஒரு திட்டத்தைத் தேர்ந்தெடுங்கள். ஒவ்வொரு பங்களிப்பும் தேவைப்படுவோரை நேரடியாகச் சென்றடைகிறது — நிர்வாகச் செலவு பிடித்தம் இல்லை.'}
              </p>
              {/* Trust line */}
              <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 pt-1 text-xs font-semibold text-white">
                <span className="inline-flex items-center gap-1.5">
                  <FaCircleCheck className="h-3.5 w-3.5 text-brand-gold" />
                  {lang === 'en' ? '0% administrative deductions' : '0% நிர்வாகச் செலவு'}
                </span>
                <span className="text-white/70">•</span>
                <span className="inline-flex items-center gap-1.5">
                  <FaCircleCheck className="h-3.5 w-3.5 text-brand-gold" />
                  {lang === 'en' ? '100% reaches the field' : '100% நேரடியாக மக்களுக்கு'}
                </span>
              </div>
            </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {([
            {
              id: 'annadhanam',
              serviceId: 'food',
              preset: { type: 'Money', program: 'annadhanam', amount: '2000' },
              title: { en: 'Daily Annadhanam – Food Donation', ta: 'தினசரி அன்னதானம்' },
              kicker: { en: 'Sponsorship Level', ta: 'உதவித் தொகை' },
              amt: { en: 'From ₹2,000', ta: 'From ₹2,000' },
              unit: { en: 'Per Meal Session', ta: 'ஒரு வேளை உணவு' },
              desc: {
                en: 'Help us provide fresh meals to people living in hardship, including those on the streets and residents in care homes. Your support can directly reduce hunger and bring daily relief to someone who may otherwise go without a meal.',
                ta: 'சாலையோரம் அல்லது முதியோர் இல்லத்தில் ஒரு வேளை உணவை ஸ்பான்சர் செய்யலாம் — வேளை மற்றும் இடத்தைப் பொறுத்து செலவு மாறுபடும் — ஆதரவற்ற ஏழைகள், முதியோர் மற்றும் நோயாளிகளுக்கு சத்தான உணவு வழங்கப்படும்.'
              },
              note: null,
              icon: <FaUtensils className="h-5 w-5" />,
              color: 'bg-brand-orange-50 text-brand-orange-700 border-brand-orange-100',
              badge: 'bg-brand-orange-100 text-brand-orange-700',
              cta: { en: 'View Details >', ta: 'விவரங்களை பார்க்க >' }
            },
            {
              id: 'student',
              serviceId: 'education',
              preset: { type: 'Money', program: 'student', amount: '5000' },
              title: { en: 'Student Support', ta: 'மாணவர்கள் கல்வி' },
              kicker: { en: 'Sponsorship Level', ta: 'உதவித் தொகை' },
              amt: { en: '₹5,000', ta: '₹5,000' },
              unit: { en: 'Annual Tuition Fee', ta: 'ஓராண்டு கல்வி கட்டணம்' },
              desc: {
                en: 'Support tuition fees and academic needs for deserving students from financially struggling backgrounds. Your contribution can help a meritorious student continue education with hope and stability.',
                ta: 'கல்வி தடைபடாமல் இருக்க வறிய நிலையில் உள்ள ஒரு பள்ளி/கல்லூரி மாணவரின் ஓராண்டு கல்வி கட்டணத்தை கல்வி நிலையத்திற்கு நேரடியாக செலுத்தும்.'
              },
              note: null,
              icon: <FaGraduationCap className="h-5 w-5" />,
              color: 'bg-brand-gold-50 text-brand-gold-700 border-brand-gold-100',
              badge: 'bg-brand-gold-100 text-brand-gold-700',
              cta: { en: 'View Details >', ta: 'விவரங்களை பார்க்க >' }
            },
            {
              id: 'ambulance',
              serviceId: 'ambulance',
              preset: { type: 'Money', program: 'ambulance', amount: '2500' },
              title: { en: 'Ambulance Fuel', ta: 'ஆம்புலன்ஸ் எரிபொருள்' },
              kicker: { en: 'Sponsorship Level', ta: 'உதவித் தொகை' },
              amt: { en: '₹2,500', ta: '₹2,500' },
              unit: { en: '10 Emergency Trips', ta: '10 அவசரப் பயணங்கள்' },
              desc: {
                en: 'Help keep the trust’s ambulance service moving for poor patients and emergency welfare needs. Fuel support ensures timely transportation without placing a financial burden on those who cannot afford it.',
                ta: 'அவசர சிகிச்சை தேவைப்படும் ஏழைகளை அரசு மருத்துவமனைகளுக்கு அழைத்துச் செல்ல 10 இலவச பயணங்களுக்கான எரிபொருளை ஸ்பான்சர் செய்யும்.'
              },
              note: null,
              icon: <FaTruckMedical className="h-5 w-5" />,
              color: 'bg-brand-blue-50 text-brand-blue-700 border-brand-blue-100',
              badge: 'bg-brand-blue-100 text-brand-blue-700',
              cta: { en: 'View Details >', ta: 'விவரங்களை பார்க்க >' }
            },
            {
              id: 'cremation',
              serviceId: 'lastrites',
              preset: { type: 'Money', program: 'cremation', amount: '5000' },
              title: { en: 'Dignified Last Rites', ta: 'ஆதரவற்றோர் இறுதி மரியாதை' },
              kicker: { en: 'Sponsorship Level', ta: 'உதவித் தொகை' },
              amt: { en: '₹5,000', ta: '₹5,000' },
              unit: { en: '1 Dignified Burial', ta: '1 தகனச் சடங்கு' },
              desc: {
                en: 'Support the final journey of destitute and unclaimed individuals with dignity and respect. Contributions in this category help us arrange essential funeral support for those who have no one to stand for them.',
                ta: 'நாமக்கல்/சேலம் காவல்துறையின் முறைப்படியான அனுமதியுடன், உரிமை கோரப்படாத ஆதரவற்ற ஒரு உடலுக்கு இறுதிச் சடங்குகள் செய்யும்.'
              },
              note: null,
              icon: <FaHeart className="h-5 w-5" />,
              color: 'bg-brand-violet-50 text-brand-violet-700 border-brand-violet-100',
              badge: 'bg-brand-violet-100 text-brand-violet-700',
              cta: { en: 'View Details >', ta: 'விவரங்களை பார்க்க >' }
            },
            {
              id: 'blood',
              serviceId: 'medical',
              preset: { type: 'Blood', program: undefined, amount: undefined },
              title: { en: 'Blood Donation', ta: 'இரத்த நன்கொடை' },
              kicker: { en: 'Life-Saving Gift', ta: 'உயிர் காக்கும் கொடை' },
              amt: { en: 'Give Blood', ta: 'இரத்த தானம்' },
              unit: { en: '1 Unit · up to 3 Lives', ta: '1 யூனிட் · 3 உயிர் வரை' },
              desc: {
                en: 'Join humanitarian support in its most life-saving form. Blood donors can become a vital part of emergency community response when patients and families urgently need help.',
                ta: 'தன்னார்வ இரத்த தானம் செய்பவராகப் பதிவு செய்து, திருச்செங்கோடு மற்றும் அருகிலுள்ள அரசு மருத்துவமனைகளில் அவசரத் தேவையுள்ள நோயாளிகளுக்கு உதவுங்கள்.'
              },
              note: null,
              icon: <FaDroplet className="h-5 w-5" />,
              color: 'bg-rose-50 text-rose-600 border-rose-100',
              badge: 'bg-rose-100 text-rose-700',
              cta: { en: 'View Details >', ta: 'விவரங்களை பார்க்க >' }
            },
            {
              id: 'dress',
              serviceId: 'elderly',
              preset: { type: 'Dress', program: undefined, amount: undefined },
              title: { en: 'Dress Donation', ta: 'ஆடை நன்கொடை' },
              kicker: { en: 'Material Gift', ta: 'பொருள் கொடை' },
              amt: { en: 'Material Aid', ta: 'பொருள் உதவி' },
              unit: { en: 'New / Gently-used', ta: 'புதிய / சிறிது பயன்பட்ட' },
              desc: {
                en: 'Contribute new clothes or support clothing drives for individuals and families in need. Seasonal and festival clothing support brings comfort, dignity, and inclusion.',
                ta: 'வேட்டி, சேலை, சட்டைகள் மற்றும் பள்ளி சீருடைகளை சாலையோரக் குடும்பங்கள் மற்றும் முதியோருடன் பகிர்ந்து, ஆடை மூலம் கண்ணியத்தை மீட்டுத் தாருங்கள்.'
              },
              note: {
                en: 'Please donate only new or gently-used clothes — not heavily worn — so they can be given with dignity.',
                ta: 'தயவுசெய்து புதிய அல்லது சிறிது பயன்படுத்திய ஆடைகளை மட்டும் வழங்கவும் — அதிகம் பயன்பட்டவை வேண்டாம் — கண்ணியத்துடன் வழங்க உதவும்.'
              },
              icon: <FaShirt className="h-5 w-5" />,
              color: 'bg-emerald-50 text-emerald-700 border-emerald-100',
              badge: 'bg-emerald-100 text-emerald-700',
              cta: { en: 'View Details >', ta: 'விவரங்களை பார்க்க >' }
            }
          ] as const)
            .slice()
            .sort((a, b) => DONATE_PRIORITY.indexOf(a.id) - DONATE_PRIORITY.indexOf(b.id))
            .map((card, i) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="rounded-2xl border border-gray-100 p-6 bg-white shadow-[0_10px_30px_-12px_rgba(16,24,40,0.15)] ring-1 ring-gray-900/[0.04] flex flex-col justify-between space-y-4 hover:shadow-2xl hover:-translate-y-1 hover:border-gray-200 transition-all duration-300 group"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-xl border ${card.color}`}>
                    {card.icon}
                  </div>
                  <h3 className="font-display font-bold text-gray-900 text-lg">
                    {card.title[lang]}
                  </h3>
                </div>

                <div className="space-y-0.5">
                  <p className="text-[10px] text-gray-900 uppercase font-bold tracking-wider">
                    {card.kicker[lang]}
                  </p>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight">
                      {card.amt[lang]}
                    </span>
                    <span className={`shrink-0 text-[10px] sm:text-xs font-bold px-1.5 py-0.5 rounded ${card.badge}`}>
                      {card.unit[lang]}
                    </span>
                  </div>
                </div>

                <p className="text-sm text-gray-900 leading-relaxed">
                  {card.desc[lang]}
                </p>

                {card.note && (
                  <p className="text-xs text-amber-700 leading-snug">
                    {card.note[lang]}
                  </p>
                )}
              </div>

              <button
                onClick={() => openServiceDetail(card.serviceId)}
                className="w-full text-center py-2.5 rounded-lg bg-emerald-50 text-emerald-800 text-sm font-bold hover:bg-emerald-600 hover:text-white transition-all cursor-pointer"
              >
                {card.cta[lang]}
              </button>
            </motion.div>
          ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision — card-less editorial pair with a center divider */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Mission */}
          <div className="rounded-2xl border border-brand-blue-100 bg-white p-6 sm:p-8 shadow-[0_10px_30px_-12px_rgba(16,24,40,0.15)] ring-1 ring-gray-900/[0.04] space-y-3">
            <div className="flex items-center gap-3">
              <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-blue-50 text-brand-blue-700">
                <FaHeartPulse className="h-6 w-6" />
              </div>
              <h3 className="font-display text-lg font-bold text-gray-900">
                {commonTranslations.missionTitle[lang]}
              </h3>
            </div>
            <p className="text-base sm:text-lg text-gray-900 leading-relaxed sm:leading-[1.65]">
              {commonTranslations.missionText[lang]}
            </p>
          </div>

          {/* Vision */}
          <div className="rounded-2xl border border-brand-gold-100 bg-white p-6 sm:p-8 shadow-[0_10px_30px_-12px_rgba(16,24,40,0.15)] ring-1 ring-gray-900/[0.04] space-y-3">
            <div className="flex items-center gap-3">
              <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-gold-50 text-brand-gold-700">
                <FaAward className="h-6 w-6" />
              </div>
              <h3 className="font-display text-lg font-bold text-gray-900">
                {commonTranslations.visionTitle[lang]}
              </h3>
            </div>
            <p className="text-base sm:text-lg text-gray-900 leading-relaxed sm:leading-[1.65]">
              {commonTranslations.visionText[lang]}
            </p>
          </div>

        </div>
      </section>

      {/* Founder Message — full-width editorial band (deliberately not a card) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-700 via-emerald-600 to-emerald-800 p-7 sm:p-9 lg:p-10 shadow-[0_30px_80px_-30px_rgba(15,61,38,0.75)]">
          {/* Soft brand glow */}
          <div className="pointer-events-none absolute -right-16 -bottom-16 h-64 w-64 rounded-full bg-brand-gold/10 blur-3xl" />

          <div className="relative mb-6 text-center">
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
              {lang === 'en' ? 'A Message from the Founder' : 'நிறுவனரின் செய்தி'}
            </h2>
            <div className="mx-auto mt-3 h-1.5 w-20 rounded-full bg-brand-gold" />
          </div>

          <div className="relative mx-auto max-w-5xl text-center">
            <div className="space-y-5">
              <blockquote className="font-serif italic text-white text-base sm:text-xl leading-relaxed sm:leading-[1.65]">
                {lang === 'en'
                  ? '"I believe service should not be delayed until it becomes convenient. If someone is hungry today, they need food today. If someone is abandoned, they need human care today. If a person dies without support, they still deserve dignity. Nallathae Nadakkum Social Service Trust was created from this conviction: that humanity must be practical, responsible, and compassionate."'
                  : '"நல்லதே நடக்கும் என்பது வெறும் பெயர் அல்ல, அது எங்களின் நம்பிக்கை. ஒவ்வொரு நாளும் நாம் செய்யும் சிறிய நற்செயல்களும் உதவிகளும் மிகப்பெரிய சமூக மாற்றத்தை ஏற்படுத்தும். நாங்கள் அலுவலகக் கதவுகளுக்குப் பின்னால் அமர்ந்து கொண்டிருக்கவில்லை; நேரடியாகச் சாலைகளுக்குச் செல்கிறோம், முதியவர்களை மீட்கிறோம், காவல்துறை அனுமதியுடன் இறுதி மரியாதைகளைச் செய்கிறோம். சாதி, மதம், பின்னணி வேறுபாடின்றி அனைவரும் இதில் இணைய அழைக்கிறோம்."'}
              </blockquote>
              <div className="flex flex-col gap-4 text-left sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-display text-base font-bold text-white">{commonTranslations.founderName[lang]}</p>
                  <p className="text-sm text-emerald-100">{lang === 'en' ? 'Founder & Chairman, Advocate' : 'நிறுவனர் மற்றும் தலைவர், வழக்கறிஞர்'}</p>
                </div>
                <button
                  onClick={() => {
                    setActiveTab('speaker');
                    window.setTimeout(() => {
                      document.getElementById('speaker-invite-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }, 80);
                  }}
                  className="inline-flex w-fit items-center gap-2 rounded-full bg-white/10 border border-white/25 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur hover:bg-white/20 transition-colors cursor-pointer sm:ml-auto"
                >
                  <span>{lang === 'en' ? 'Invite our Founder to Speak' : 'எங்கள் நிறுவனரை சொற்பொழிவாளராக அழைக்க'}</span>
                  <FaChevronRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}




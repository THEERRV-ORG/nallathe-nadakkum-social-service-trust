import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  FaHeart, FaHeartPulse, FaTruckMedical, FaUtensils, FaAward, FaFileLines, FaChevronRight,
  FaGraduationCap, FaCircleCheck, FaCamera, FaVideo, FaDroplet, FaShirt
} from 'react-icons/fa6';
import { commonTranslations, statsData, DonatePreset } from '../data';
import SocialConnect from './SocialConnect';
import CountUpStat from './CountUpStat';

interface HomeViewProps {
  lang: 'en' | 'ta';
  setActiveTab: (tab: string) => void;
  onDonatePreset: (preset: DonatePreset) => void;
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
  { src: '/gallery/activity-ambulance-banner.jpeg', alt: 'Nallathe Nadakkum free ambulance service launch' },
  { src: '/gallery/activity-elder-rescue.jpeg', alt: 'Destitute elderly rescued and cared for' },
];

export default function HomeView({ lang, setActiveTab, onDonatePreset }: HomeViewProps) {
  const [heroIndex, setHeroIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroIndex(prev => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-16 pb-8">
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
          {/* Bottom fade */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-50 via-slate-50/10 to-transparent"></div>
          {/* Slide dot indicators */}
          <div className="absolute bottom-36 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
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
                {lang === 'en' ? 'Nallathe Nadakkum' : 'நல்லதே நடக்கும்'}
              </span>
              <br />
              <span className="text-white">
                {lang === 'en' ? 'Social Trust' : 'சமூக சேவை அறக்கட்டளை'}
              </span>
            </motion.h1>
            
            {/* Slogan */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-sans text-base sm:text-lg font-medium text-[#6ee7b7] italic border-l-4 border-[#10b981] pl-4"
            >
              "{commonTranslations.heroSlogan[lang]}"
            </motion.p>
            
            {/* Subtitle */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-sm sm:text-base md:text-lg text-gray-200 leading-relaxed sm:leading-[1.65] max-w-2xl"
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
              animate={{ opacity: 0.9 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="pt-4 flex items-start space-x-2.5 text-[10px] sm:text-xs text-[#6ee7b7]/90 leading-normal border-t border-white/10 mt-4 max-w-xl"
            >
              <FaAward className="h-4 w-4 text-[#34d399] flex-shrink-0 mt-0.5" />
              <p>
                {lang === 'en' 
                  ? 'Nallathe Nadakkum serves at the point where safety nets run thin—for people sleeping on pavements, elders with no family left, and the unclaimed dead.' 
                  : 'சாலையோரங்கள், மருத்துவமனைகளில் யாருமின்றி தவிக்கும் ஏழைகள், ஆதரவற்ற முதியவர்கள் மற்றும் உரிமை கோரப்படாத உடல்களுக்கு கண்ணியமான முறையில் தொண்டு செய்கிறோம்.'}
              </p>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Trust Introduction */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-white border border-gray-100 p-6 sm:p-10 shadow-[0_10px_30px_-12px_rgba(16,24,40,0.15)] ring-1 ring-gray-900/[0.04]">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-10">
            {/* Logo — left on desktop, top on mobile */}
            <div className="md:w-[36%] flex justify-center shrink-0">
              <img
                src="/logo.png"
                alt="Nallathe Nadakkum Social Service Trust logo"
                className="h-48 w-48 sm:h-64 sm:w-64 md:h-72 md:w-72 rounded-full object-cover"
              />
            </div>

            {/* Content — right on desktop, left-aligned text */}
            <div className="md:w-[64%] space-y-5 text-center md:text-left">
              <h2 className="font-display text-2xl font-bold text-gray-900 sm:text-3xl">
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
                  <span>{lang === 'en' ? 'Read Our Full History & Trustees' : 'எங்கள் அறக்கட்டளையின் முழு வரலாறு & அறங்காவலர்கள் பற்றி படிக்க'}</span>
                  <FaChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats Grid */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-brand-violet text-white p-8 sm:p-12 shadow-md relative overflow-hidden">
          <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-white/10 blur-xl"></div>

          <div className="mb-10 text-center space-y-2">
            <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
              {commonTranslations.quickStatsTitle[lang]}
            </h2>
            <p className="text-white/70 text-xs sm:text-sm">
              {commonTranslations.quickStatsNote[lang]}
            </p>
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
                  className="font-display text-3xl font-extrabold text-white sm:text-4xl"
                />
                <div className="text-[11px] sm:text-xs font-medium text-white/80 leading-snug">
                  {stat.label[lang]}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Follow CTA */}
      <SocialConnect lang={lang} />

      {/* Contribution, Photo & Video Evidence Transparency Highlights */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Contribution Recognition */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="bg-white rounded-2xl border border-gray-100 p-6 shadow-[0_10px_30px_-12px_rgba(16,24,40,0.15)] ring-1 ring-gray-900/[0.04] flex flex-col space-y-4 hover:border-emerald-200 hover:shadow-md transition-all duration-300"
          >
            <div className="flex items-center gap-3">
              <div className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-gold-50 text-brand-gold-700">
                <FaCircleCheck className="h-6 w-6" />
              </div>
              <h3 className="font-display text-lg sm:text-xl font-bold text-gray-900">
                {lang === 'en' ? 'Contribution Recognition' : 'பங்களிப்பு அங்கீகாரம்'}
              </h3>
            </div>
            <p className="text-base sm:text-lg text-gray-900 leading-relaxed sm:leading-[1.65]">
              {lang === 'en'
                ? 'Every donation is recorded and acknowledged with gratitude, ensuring transparency and appreciation for each supporter.'
                : 'ஒவ்வொரு நன்கொடையும் நன்றியுடன் பதிவு செய்து அங்கீகரிக்கப்படுகிறது. இதன் மூலம் ஒவ்வொரு ஆதரவாளரின் பங்களிப்பும் வெளிப்படையாக மதிப்பளிக்கப்படுகிறது.'}
            </p>
          </motion.div>

          {/* Card 2: Photo Impact Evidence */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="bg-white rounded-2xl border border-gray-100 p-6 shadow-[0_10px_30px_-12px_rgba(16,24,40,0.15)] ring-1 ring-gray-900/[0.04] flex flex-col space-y-4 hover:border-emerald-200 hover:shadow-md transition-all duration-300"
          >
            <div className="flex items-center gap-3">
              <div className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-blue-50 text-brand-blue-700">
                <FaCamera className="h-6 w-6" />
              </div>
              <h3 className="font-display text-lg sm:text-xl font-bold text-gray-900">
                {lang === 'en' ? 'Photo Impact Updates' : 'புகைப்பட தாக்கப் பதிவுகள்'}
              </h3>
            </div>
            <p className="text-base sm:text-lg text-gray-900 leading-relaxed sm:leading-[1.65]">
              {lang === 'en'
                ? 'Photo updates help donors understand how their contributions are used and the difference they create in the community.'
                : 'நன்கொடைகள் எவ்வாறு பயன்படுத்தப்படுகின்றன மற்றும் சமூகத்தில் அவை ஏற்படுத்தும் மாற்றத்தை புகைப்படப் பதிவுகள் மூலம் நன்கொடையாளர்கள் அறிந்துகொள்ளலாம்.'}
            </p>
          </motion.div>

          {/* Card 3: Video Impact Stories */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="bg-white rounded-2xl border border-gray-100 p-6 shadow-[0_10px_30px_-12px_rgba(16,24,40,0.15)] ring-1 ring-gray-900/[0.04] flex flex-col space-y-4 hover:border-emerald-200 hover:shadow-md transition-all duration-300"
          >
            <div className="flex items-center gap-3">
              <div className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-orange-50 text-brand-orange-700">
                <FaVideo className="h-6 w-6" />
              </div>
              <h3 className="font-display text-lg sm:text-xl font-bold text-gray-900">
                {lang === 'en' ? 'Video Impact Stories' : 'காணொளி தாக்கக் கதைகள்'}
              </h3>
            </div>
            <p className="text-base sm:text-lg text-gray-900 leading-relaxed sm:leading-[1.65]">
              {lang === 'en'
                ? 'Video updates showcase the real outcomes of each initiative and highlight the meaningful impact made possible by donor support.'
                : 'ஒவ்வொரு சேவை முயற்சியின் உண்மையான விளைவுகளையும், நன்கொடையாளர்களின் ஆதரவால் உருவாகும் நல்ல மாற்றங்களையும் காணொளிப் பதிவுகள் வெளிப்படுத்துகின்றன.'}
            </p>
          </motion.div>

        </div>
      </section>

      {/* What Can You Donate */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 mb-8">
          <p className="text-xs font-bold uppercase tracking-widest text-brand-violet-700">
            {lang === 'en' ? 'Ways to Give' : 'உதவும் வழிகள்'}
          </p>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-gray-900">
            {lang === 'en' ? 'What Can You Donate' : 'நீங்கள் எதை நன்கொடையாக வழங்கலாம்'}
          </h2>
          <p className="text-sm sm:text-base text-gray-900/70 max-w-2xl mx-auto">
            {lang === 'en'
              ? 'Choose a programme to support. Every contribution reaches the people who need it — 0% administrative deductions.'
              : 'ஆதரிக்க ஒரு திட்டத்தைத் தேர்ந்தெடுங்கள். ஒவ்வொரு பங்களிப்பும் தேவைப்படுவோரை நேரடியாகச் சென்றடைகிறது — நிர்வாகச் செலவு பிடித்தம் இல்லை.'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {([
            {
              id: 'annadhanam',
              preset: { type: 'Money', program: 'annadhanam', amount: '2000' },
              title: { en: 'Daily Annadhanam', ta: 'தினசரி அன்னதானம்' },
              kicker: { en: 'Sponsorship Level', ta: 'உதவித் தொகை' },
              amt: { en: 'From ₹2,000', ta: 'From ₹2,000' },
              unit: { en: 'Per Meal Session', ta: 'ஒரு வேளை உணவு' },
              desc: {
                en: 'Sponsor a roadside or care-home meal session — costs range by session and location — serving fresh hot meals to destitute pavement dwellers, homeless elders, and hospital patients.',
                ta: 'சாலையோரம் அல்லது முதியோர் இல்லத்தில் ஒரு வேளை உணவை ஸ்பான்சர் செய்யலாம் — வேளை மற்றும் இடத்தைப் பொறுத்து செலவு மாறுபடும் — ஆதரவற்ற ஏழைகள், முதியோர் மற்றும் நோயாளிகளுக்கு சத்தான உணவு வழங்கப்படும்.'
              },
              note: null,
              icon: <FaUtensils className="h-5 w-5" />,
              color: 'bg-brand-orange-50 text-brand-orange-700 border-brand-orange-100',
              badge: 'bg-brand-orange-100 text-brand-orange-700',
              cta: { en: 'Sponsor Program →', ta: 'ஸ்பான்சர் செய்ய →' }
            },
            {
              id: 'student',
              preset: { type: 'Money', program: 'student', amount: '5000' },
              title: { en: 'Student Support', ta: 'மாணவர்கள் கல்வி' },
              kicker: { en: 'Sponsorship Level', ta: 'உதவித் தொகை' },
              amt: { en: '₹5,000', ta: '₹5,000' },
              unit: { en: 'Annual Tuition Fee', ta: 'ஓராண்டு கல்வி கட்டணம்' },
              desc: {
                en: 'Directly remits full school tuition fees for a meritorious student from a daily-wage single-parent household to secure their classroom seat.',
                ta: 'கல்வி தடைபடாமல் இருக்க வறிய நிலையில் உள்ள ஒரு பள்ளி/கல்லூரி மாணவரின் ஓராண்டு கல்வி கட்டணத்தை கல்வி நிலையத்திற்கு நேரடியாக செலுத்தும்.'
              },
              note: null,
              icon: <FaGraduationCap className="h-5 w-5" />,
              color: 'bg-brand-gold-50 text-brand-gold-700 border-brand-gold-100',
              badge: 'bg-brand-gold-100 text-brand-gold-700',
              cta: { en: 'Sponsor Program →', ta: 'ஸ்பான்சர் செய்ய →' }
            },
            {
              id: 'ambulance',
              preset: { type: 'Money', program: 'ambulance', amount: '2500' },
              title: { en: 'Ambulance Fuel', ta: 'ஆம்புலன்ஸ் எரிபொருள்' },
              kicker: { en: 'Sponsorship Level', ta: 'உதவித் தொகை' },
              amt: { en: '₹2,500', ta: '₹2,500' },
              unit: { en: '10 Emergency Trips', ta: '10 அவசரப் பயணங்கள்' },
              desc: {
                en: 'Covers diesel fuel logistics and patient transfer for 10 emergency runs carrying vulnerable patients to Salem Govt Hospital.',
                ta: 'அவசர சிகிச்சை தேவைப்படும் ஏழைகளை அரசு மருத்துவமனைகளுக்கு அழைத்துச் செல்ல 10 இலவச பயணங்களுக்கான எரிபொருளை ஸ்பான்சர் செய்யும்.'
              },
              note: null,
              icon: <FaTruckMedical className="h-5 w-5" />,
              color: 'bg-brand-blue-50 text-brand-blue-700 border-brand-blue-100',
              badge: 'bg-brand-blue-100 text-brand-blue-700',
              cta: { en: 'Sponsor Program →', ta: 'ஸ்பான்சர் செய்ய →' }
            },
            {
              id: 'cremation',
              preset: { type: 'Money', program: 'cremation', amount: '5000' },
              title: { en: 'Dignified Last Rites', ta: 'ஆதரவற்றோர் இறுதி மரியாதை' },
              kicker: { en: 'Sponsorship Level', ta: 'உதவித் தொகை' },
              amt: { en: '₹5,000', ta: '₹5,000' },
              unit: { en: '1 Dignified Burial', ta: '1 தகனச் சடங்கு' },
              desc: {
                en: 'Covers municipal cremation fees, shroud cloth, and ceremonial materials for performing police-coordinated burial with complete dignity.',
                ta: 'நாமக்கல்/சேலம் காவல்துறையின் முறைப்படியான அனுமதியுடன், உரிமை கோரப்படாத ஆதரவற்ற ஒரு உடலுக்கு இறுதிச் சடங்குகள் செய்யும்.'
              },
              note: null,
              icon: <FaHeart className="h-5 w-5" />,
              color: 'bg-brand-violet-50 text-brand-violet-700 border-brand-violet-100',
              badge: 'bg-brand-violet-100 text-brand-violet-700',
              cta: { en: 'Sponsor Program →', ta: 'ஸ்பான்சர் செய்ய →' }
            },
            {
              id: 'blood',
              preset: { type: 'Blood', program: undefined, amount: undefined },
              title: { en: 'Blood Donation', ta: 'இரத்த நன்கொடை' },
              kicker: { en: 'Life-Saving Gift', ta: 'உயிர் காக்கும் கொடை' },
              amt: { en: 'Give Blood', ta: 'இரத்த தானம்' },
              unit: { en: '1 Unit · up to 3 Lives', ta: '1 யூனிட் · 3 உயிர் வரை' },
              desc: {
                en: 'Register as a voluntary blood donor and respond to urgent requests for patients in need across Tiruchengode and nearby government hospitals.',
                ta: 'தன்னார்வ இரத்த தானம் செய்பவராகப் பதிவு செய்து, திருச்செங்கோடு மற்றும் அருகிலுள்ள அரசு மருத்துவமனைகளில் அவசரத் தேவையுள்ள நோயாளிகளுக்கு உதவுங்கள்.'
              },
              note: null,
              icon: <FaDroplet className="h-5 w-5" />,
              color: 'bg-rose-50 text-rose-600 border-rose-100',
              badge: 'bg-rose-100 text-rose-700',
              cta: { en: 'Donate Blood →', ta: 'இரத்தம் தானம் செய்ய →' }
            },
            {
              id: 'dress',
              preset: { type: 'Dress', program: undefined, amount: undefined },
              title: { en: 'Dress Donation', ta: 'ஆடை நன்கொடை' },
              kicker: { en: 'Material Gift', ta: 'பொருள் கொடை' },
              amt: { en: 'Donate Clothes', ta: 'ஆடை தானம்' },
              unit: { en: 'New / Gently-used', ta: 'புதிய / சிறிது பயன்பட்ட' },
              desc: {
                en: 'Share dhotis, sarees, shirts, and school uniforms with roadside families and elders — restoring dignity through clean clothing.',
                ta: 'வேட்டி, சேலை, சட்டைகள் மற்றும் பள்ளி சீருடைகளை சாலையோரக் குடும்பங்கள் மற்றும் முதியோருடன் பகிர்ந்து, ஆடை மூலம் கண்ணியத்தை மீட்டுத் தாருங்கள்.'
              },
              note: {
                en: 'Please donate only new or gently-used clothes — not heavily worn — so they can be given with dignity.',
                ta: 'தயவுசெய்து புதிய அல்லது சிறிது பயன்படுத்திய ஆடைகளை மட்டும் வழங்கவும் — அதிகம் பயன்பட்டவை வேண்டாம் — கண்ணியத்துடன் வழங்க உதவும்.'
              },
              icon: <FaShirt className="h-5 w-5" />,
              color: 'bg-emerald-50 text-emerald-700 border-emerald-100',
              badge: 'bg-emerald-100 text-emerald-700',
              cta: { en: 'Donate Clothes →', ta: 'ஆடை தானம் செய்ய →' }
            }
          ] as const).map((card) => (
            <div
              key={card.id}
              className="rounded-2xl border border-gray-100 p-6 bg-white shadow-[0_10px_30px_-12px_rgba(16,24,40,0.15)] ring-1 ring-gray-900/[0.04] flex flex-col justify-between space-y-4 hover:shadow-md hover:border-gray-200 transition-all group"
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
                  <div className="flex items-baseline flex-wrap gap-x-1.5 gap-y-1">
                    <span className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight">
                      {card.amt[lang]}
                    </span>
                    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${card.badge}`}>
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
                onClick={() => { onDonatePreset({ type: card.preset.type, program: card.preset.program, amount: card.preset.amount }); setActiveTab('donate'); }}
                className="w-full text-center py-2.5 rounded-lg bg-emerald-50 text-emerald-800 text-sm font-bold hover:bg-emerald-600 hover:text-white transition-all cursor-pointer"
              >
                {card.cta[lang]}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          
          {/* Mission Card */}
          <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm flex flex-col space-y-4 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-brand-blue"></div>
            <div className="flex items-center gap-3">
              <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-blue-50 text-brand-blue-700">
                <FaHeartPulse className="h-6 w-6" />
              </div>
              <h3 className="font-display text-lg sm:text-xl font-bold text-gray-900">
                {commonTranslations.missionTitle[lang]}
              </h3>
            </div>
            <p className="text-base sm:text-lg text-gray-900 leading-relaxed sm:leading-[1.65] flex-grow">
              {commonTranslations.missionText[lang]}
            </p>
          </div>

          {/* Vision Card */}
          <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm flex flex-col space-y-4 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-brand-gold"></div>
            <div className="flex items-center gap-3">
              <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-gold-50 text-brand-gold-700">
                <FaAward className="h-6 w-6" />
              </div>
              <h3 className="font-display text-lg sm:text-xl font-bold text-gray-900">
                {commonTranslations.visionTitle[lang]}
              </h3>
            </div>
            <p className="text-base sm:text-lg text-gray-900 leading-relaxed sm:leading-[1.65] flex-grow">
              {commonTranslations.visionText[lang]}
            </p>
          </div>

        </div>
      </section>

      {/* Founder Message & Stated Claims Notice */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-gray-50 border border-gray-200/60 p-8 flex flex-col md:flex-row gap-8 items-center">
          <img
            src="/founder.jpeg"
            alt={commonTranslations.founderName[lang]}
            className="h-40 w-40 sm:h-44 sm:w-44 rounded-full object-cover object-top flex-shrink-0 border border-emerald-200"
          />
          <div className="space-y-4 flex-grow">
            <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700">
              {lang === 'en' ? 'A Message from our Founder' : 'நிறுவனரின் செய்தி'}
            </p>
            <blockquote className="text-base sm:text-lg text-gray-900 italic leading-relaxed sm:leading-[1.65] font-sans">
              {lang === 'en' 
                ? '"Nallathe Nadakkum translates to Good things will happen. It is our firm conviction that consistent, small acts of daily compassion compound into real social reform. We do not wait behind a desk; we identify people on pavements, coordinate burials at the mortuary, and drive patients to emergency beds ourselves. We welcome anyone of any background to join this effort."' 
                : '"நல்லதே நடக்கும் என்பது வெறும் பெயர் அல்ல, அது எங்களின் நம்பிக்கை. ஒவ்வொரு நாளும் நாம் செய்யும் சிறிய நற்செயல்களும் உதவிகளும் மிகப்பெரிய சமூக மாற்றத்தை ஏற்படுத்தும். நாங்கள் அலுவலகக் கதவுகளுக்குப் பின்னால் அமர்ந்து கொண்டிருக்கவில்லை; நேரடியாகச் சாலைகளுக்குச் செல்கிறோம், முதியவர்களை மீட்கிறோம், காவல்துறை அனுமதியுடன் இறுதி மரியாதைகளைச் செய்கிறோம். சாதி, மதம், பின்னணி வேறுபாடின்றி அனைவரும் இதில் இணைய அழைக்கிறோம்."'}
            </blockquote>
            <div>
              <p className="font-display text-sm font-bold text-gray-900">{commonTranslations.founderName[lang]}</p>
              <p className="text-xs text-gray-900">{lang === 'en' ? 'Founder & Chairman, Advocate' : 'நிறுவனர் மற்றும் தலைவர், வழக்கறிஞர்'}</p>
            </div>
            <button
              onClick={() => setActiveTab('speaker')}
              className="text-emerald-700 font-semibold text-sm hover:text-emerald-800 hover:underline inline-flex items-center space-x-1 cursor-pointer"
            >
              <span>{lang === 'en' ? 'Invite our Founder to Speak' : 'எங்கள் நிறுவனரை சொற்பொழிவாளராக அழைக்க'}</span>
              <FaChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Core Activities Quick Links */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-gray-900">
          {lang === 'en' ? 'Our Direct Support Programs' : 'அறக்கட்டளையின் நேரடி திட்டங்கள்'}
        </h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { label: { en: 'Daily Food', ta: 'அன்னதானம்' }, tab: 'services', icon: <FaUtensils className="h-5 w-5" />, accent: 'bg-brand-orange-50 text-brand-orange-700 group-hover:bg-brand-orange-100' },
            { label: { en: 'Free Ambulance', ta: 'இலவச ஆம்புலன்ஸ்' }, tab: 'services', icon: <FaTruckMedical className="h-5 w-5" />, accent: 'bg-brand-blue-50 text-brand-blue-700 group-hover:bg-brand-blue-100' },
            { label: { en: 'Last Rites', ta: 'இறுதி மரியாதை' }, tab: 'services', icon: <FaHeart className="h-5 w-5" />, accent: 'bg-brand-violet-50 text-brand-violet-700 group-hover:bg-brand-violet-100' },
            { label: { en: 'Elder Rescue', ta: 'முதியோர் மீட்பு' }, tab: 'services', icon: <FaAward className="h-5 w-5" />, accent: 'bg-emerald-50 text-emerald-700 group-hover:bg-emerald-100' },
            { label: { en: 'Education Support', ta: 'கல்வி உதவி' }, tab: 'services', icon: <FaFileLines className="h-5 w-5" />, accent: 'bg-brand-gold-50 text-brand-gold-700 group-hover:bg-brand-gold-100' },
            { label: { en: 'Emergency Help', ta: 'அவசர உதவி' }, tab: 'help', icon: <FaHeartPulse className="h-5 w-5" />, accent: 'bg-brand-blue-50 text-brand-blue-700 group-hover:bg-brand-blue-100' },
            { label: { en: 'Blood Donation', ta: 'இரத்த நன்கொடை' }, tab: 'donate', icon: <FaDroplet className="h-5 w-5" />, accent: 'bg-rose-50 text-rose-600 group-hover:bg-rose-100' },
            { label: { en: 'Dress Donation', ta: 'ஆடை நன்கொடை' }, tab: 'donate', icon: <FaShirt className="h-5 w-5" />, accent: 'bg-emerald-50 text-brand-leaf group-hover:bg-emerald-100' }
          ].map((prog, idx) => (
            <button
              key={idx}
              id={`quick-link-${idx}`}
              onClick={() => setActiveTab(prog.tab)}
              className="rounded-xl border border-gray-100 bg-white p-4 text-center shadow-sm hover:shadow-md hover:border-emerald-200 hover:bg-emerald-50/20 transition-all cursor-pointer flex flex-col items-center justify-center space-y-2 group"
            >
              <div className={`p-2 rounded-lg transition-colors ${prog.accent}`}>
                {prog.icon}
              </div>
              <span className="text-xs sm:text-sm font-semibold text-gray-900 leading-tight">
                {prog.label[lang]}
              </span>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}



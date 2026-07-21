import React, { useState, useEffect } from 'react';
import { SAMPLE_SPONSORS } from '../security';
import { motion, AnimatePresence } from 'motion/react';
import {
  FaHeart, FaHeartPulse, FaTruckMedical, FaUtensils, FaAward, FaFileLines, FaChevronRight,
  FaGraduationCap, FaCircleExclamation, FaLock, FaWandMagicSparkles, FaGift, FaCoins, FaCircleCheck, FaCircleQuestion,
  FaCamera, FaVideo
} from 'react-icons/fa6';
import { commonTranslations, statsData } from '../data';

interface HomeViewProps {
  lang: 'en' | 'ta';
  setActiveTab: (tab: string) => void;
}

const heroImages = [
  { src: '/gallery/activity-school-books-distribution.jpeg', alt: 'Distributing notebooks at a government school' },
  { src: '/gallery/activity-ambulance-banner.jpeg', alt: 'Nallathe Nadakkum free ambulance service launch' },
  { src: '/gallery/activity-food-indoor.jpeg', alt: 'Elderly men eating a full meal at our shelter' },
  { src: '/gallery/activity-water-street.jpg', alt: 'Street food and water distribution to elders' },
  { src: '/gallery/activity-elder-rescue.jpeg', alt: 'Destitute elderly rescued and cared for' },
];

export default function HomeView({ lang, setActiveTab }: HomeViewProps) {
  const [activeHubTab, setActiveHubTab] = useState<'impact' | 'pledges' | 'disclosures'>('impact');
  const [recentPledges, setRecentPledges] = useState<any[]>([]);
  const [heroIndex, setHeroIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroIndex(prev => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    setRecentPledges([...SAMPLE_SPONSORS].slice(0, 3));
  }, []);
  return (
    <div className="space-y-16 py-8">
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
                  idx === heroIndex ? 'w-6 bg-emerald-400' : 'w-1.5 bg-white/40 hover:bg-white/70'
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
              className="inline-flex items-center space-x-2 rounded-full bg-emerald-500/20 backdrop-blur-md border border-emerald-500/30 px-3 py-1 text-xs font-semibold text-emerald-300"
            >
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>{lang === 'en' ? 'Registered Trust: 16/2025' : 'பதிவு செய்யப்பட்ட அறக்கட்டளை: 16/2025'}</span>
            </motion.div>
            
            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl leading-snug"
            >
              <span className="text-emerald-400">
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
              className="font-sans text-base sm:text-lg font-medium text-emerald-300 italic border-l-4 border-emerald-500 pl-4"
            >
              "{commonTranslations.heroSlogan[lang]}"
            </motion.p>
            
            {/* Subtitle */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-xs sm:text-sm md:text-base text-gray-200 leading-relaxed text-justify sm:text-left max-w-2xl"
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
                <FaChevronRight className="h-4 w-4 text-emerald-300" />
              </button>
            </motion.div>

            {/* Quick trust guarantee detail overlay badge */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.9 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="pt-4 flex items-start space-x-2.5 text-[10px] sm:text-xs text-emerald-300/90 leading-normal border-t border-white/10 mt-4 max-w-xl"
            >
              <FaAward className="h-4 w-4 text-emerald-400 flex-shrink-0 mt-0.5" />
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
        <div className="rounded-2xl bg-white border border-gray-100 p-6 sm:p-10 shadow-sm">
          <div className="max-w-3xl mx-auto space-y-6 text-center">
            <h2 className="font-display text-2xl font-bold text-gray-900 sm:text-3xl">
              {lang === 'en' ? 'Who We Are' : 'எங்களை பற்றி'}
            </h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed text-justify sm:text-center">
              {commonTranslations.introText[lang]}
            </p>
            <div className="pt-2">
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
      </section>

      {/* Quick Stats Grid */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-emerald-800 text-white p-8 sm:p-12 shadow-md relative overflow-hidden">
          <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-emerald-700/50 blur-xl"></div>
          
          <div className="mb-10 text-center space-y-2">
            <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
              {commonTranslations.quickStatsTitle[lang]}
            </h2>
            <p className="text-emerald-200 text-xs sm:text-sm">
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
                <div className="font-display text-3xl font-extrabold text-emerald-100 sm:text-4xl">
                  {stat.value}
                </div>
                <div className="text-[11px] sm:text-xs font-medium text-emerald-100/80 leading-snug">
                  {stat.label[lang]}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contribution, Photo & Video Evidence Transparency Highlights */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Contribution Recognition */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="bg-white rounded-2xl border border-gray-100 p-6 shadow-xs flex flex-col space-y-4 hover:border-emerald-200 hover:shadow-md transition-all duration-300"
          >
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
              <FaCircleCheck className="h-6 w-6" />
            </div>
            <div className="space-y-2">
              <h3 className="font-display text-base sm:text-lg font-bold text-gray-900">
                {lang === 'en' ? 'Contribution Recognition' : 'பங்களிப்பு அங்கீகாரம்'}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed text-justify sm:text-left">
                {lang === 'en' 
                  ? 'Every donation is recorded and acknowledged with gratitude, ensuring transparency and appreciation for each supporter.'
                  : 'ஒவ்வொரு நன்கொடையும் நன்றியுடன் பதிவு செய்து அங்கீகரிக்கப்படுகிறது. இதன் மூலம் ஒவ்வொரு ஆதரவாளரின் பங்களிப்பும் வெளிப்படையாக மதிப்பளிக்கப்படுகிறது.'}
              </p>
            </div>
          </motion.div>

          {/* Card 2: Photo Impact Evidence */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="bg-white rounded-2xl border border-gray-100 p-6 shadow-xs flex flex-col space-y-4 hover:border-emerald-200 hover:shadow-md transition-all duration-300"
          >
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
              <FaCamera className="h-6 w-6" />
            </div>
            <div className="space-y-2">
              <h3 className="font-display text-base sm:text-lg font-bold text-gray-900">
                {lang === 'en' ? 'Photo Impact Updates' : 'புகைப்பட தாக்கப் பதிவுகள்'}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed text-justify sm:text-left">
                {lang === 'en' 
                  ? 'Photo updates help donors understand how their contributions are used and the difference they create in the community.'
                  : 'நன்கொடைகள் எவ்வாறு பயன்படுத்தப்படுகின்றன மற்றும் சமூகத்தில் அவை ஏற்படுத்தும் மாற்றத்தை புகைப்படப் பதிவுகள் மூலம் நன்கொடையாளர்கள் அறிந்துகொள்ளலாம்.'}
              </p>
            </div>
          </motion.div>

          {/* Card 3: Video Impact Stories */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="bg-white rounded-2xl border border-gray-100 p-6 shadow-xs flex flex-col space-y-4 hover:border-emerald-200 hover:shadow-md transition-all duration-300"
          >
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
              <FaVideo className="h-6 w-6" />
            </div>
            <div className="space-y-2">
              <h3 className="font-display text-base sm:text-lg font-bold text-gray-900">
                {lang === 'en' ? 'Video Impact Stories' : 'காணொளி தாக்கக் கதைகள்'}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed text-justify sm:text-left">
                {lang === 'en' 
                  ? 'Video updates showcase the real outcomes of each initiative and highlight the meaningful impact made possible by donor support.'
                  : 'ஒவ்வொரு சேவை முயற்சியின் உண்மையான விளைவுகளையும், நன்கொடையாளர்களின் ஆதரவால் உருவாகும் நல்ல மாற்றங்களையும் காணொளிப் பதிவுகள் வெளிப்படுத்துகின்றன.'}
              </p>
            </div>
          </motion.div>

        </div>
      </section>

      {/* Donation Impact & Live Transparency Hub */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 animate-fade-in">
        <div className="rounded-2xl border border-gray-100 bg-white p-6 sm:p-8 shadow-xs space-y-8">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-gray-100 pb-6">
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full w-fit block">
                {lang === 'en' ? 'Live Trust Activity' : 'நேரடி அறக்கட்டளை தகவல்கள்'}
              </span>
              <h2 className="font-display text-xl sm:text-2xl font-bold text-gray-900">
                {lang === 'en' ? '💖 Generosity & Transparency Hub' : '💖 தாராள மனப்பான்மை & வெளிப்படைத்தன்மை மையம்'}
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 leading-relaxed max-w-2xl">
                {lang === 'en' 
                  ? 'Explore where your contributions go, view real-time pledged donations, and read critical safety notices.' 
                  : 'உங்கள் பங்களிப்புகள் எங்கு செல்கின்றன என்பதை ஆராயுங்கள், சமீபத்திய நன்கொடைகளைக் காணுங்கள் மற்றும் முக்கிய பாதுகாப்பு அறிவிப்புகளைப் படியுங்கள்.'}
              </p>
            </div>

            {/* Quick Efficiency Badge */}
            <div className="bg-emerald-50/50 rounded-xl p-3 border border-emerald-100/60 flex items-center space-x-2 w-fit">
              <FaWandMagicSparkles className="h-4 w-4 text-emerald-600 flex-shrink-0 animate-pulse" />
              <div className="text-[10px] leading-tight">
                <p className="font-bold text-emerald-900">{lang === 'en' ? '100% Direct Delivery' : '100% நேரடி உதவி'}</p>
                <p className="text-emerald-700">{lang === 'en' ? '0% Administrative Deductions' : 'நிர்வாக செலவு பிடித்தங்கள் இல்லை'}</p>
              </div>
            </div>
          </div>

          {/* Interactive Navigation Tabs */}
          <div className="flex border-b border-gray-100 p-1 bg-gray-50/50 rounded-xl max-w-md">
            {[
              { id: 'impact', label: { en: 'How It Helps (Impact)', ta: 'உதவிகள் எவ்வாறு பயனாகின்றன' }, icon: <FaHeartPulse className="h-3.5 w-3.5" /> },
              { id: 'pledges', label: { en: 'Recent Kindness', ta: 'சமீபத்திய பங்களிப்புகள்' }, icon: <FaGift className="h-3.5 w-3.5" /> },
              { id: 'disclosures', label: { en: 'Trust Notices', ta: 'பாதுகாப்பு அறிவிப்புகள்' }, icon: <FaCircleExclamation className="h-3.5 w-3.5" /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveHubTab(tab.id as any)}
                className={`flex items-center justify-center space-x-1.5 py-2 px-3 text-xs font-bold rounded-lg flex-1 transition-all cursor-pointer ${
                  activeHubTab === tab.id
                    ? 'bg-white text-emerald-800 shadow-xs border border-gray-100'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                {tab.icon}
                <span>{tab.label[lang]}</span>
              </button>
            ))}
          </div>

          {/* Tab Contents */}
          <div className="pt-2">
            <AnimatePresence mode="wait">
              
              {/* TAB 1: HOW IT HELPS (IMPACT MAP) */}
              {activeHubTab === 'impact' && (
                <motion.div
                  key="impact"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                  {[
                    {
                      id: 'annadhanam',
                      title: { en: 'Daily Annadhanam', ta: 'தினசரி அன்னதானம்' },
                      amt: '₹3,000',
                      unit: { en: '1 Day of Meals', ta: '1 நாள் மதிய உணவு' },
                      desc: {
                        en: 'Provides fresh hot meals directly to approximately 80 destitute pavement dwellers, homeless elders, and government hospital patients.',
                        ta: 'சாலையோரம் வசிக்கும் மற்றும் அரசு மருத்துவமனை வளாகங்களில் உள்ள சுமார் 80 ஆதரவற்ற ஏழைகளுக்கு ஒரு நாள் சத்தான மதிய உணவு வழங்கப்படும்.'
                      },
                      icon: <FaUtensils className="h-4 w-4" />,
                      color: 'bg-emerald-50 text-emerald-700 border-emerald-100',
                      badge: 'bg-emerald-100 text-emerald-800'
                    },
                    {
                      id: 'student',
                      title: { en: 'Student Support', ta: 'மாணவர்கள் கல்வி' },
                      amt: '₹5,000',
                      unit: { en: 'Annual Tuition Fee', ta: 'ஓராண்டு கல்வி கட்டணம்' },
                      desc: {
                        en: 'Directly remits full school tuition fees for a meritorious student from a daily-wage single-parent household to secure their classroom seat.',
                        ta: 'கல்வி தடைபடாமல் இருக்க வறிய நிலையில் உள்ள ஒரு பள்ளி/கல்லூரி மாணவரின் ஓராண்டு கல்வி கட்டணத்தை கல்வி நிலையத்திற்கு நேரடியாக செலுத்தும்.'
                      },
                      icon: <FaGraduationCap className="h-4 w-4" />,
                      color: 'bg-sky-50 text-sky-700 border-sky-100',
                      badge: 'bg-sky-100 text-sky-800'
                    },
                    {
                      id: 'ambulance',
                      title: { en: 'Ambulance Fuel', ta: 'ஆம்புலன்ஸ் எரிபொருள்' },
                      amt: '₹2,500',
                      unit: { en: '10 Emergency Trips', ta: '10 அவசரப் பயணங்கள்' },
                      desc: {
                        en: 'Covers diesel fuel logistics and patient transfer for 10 emergency runs carrying vulnerable patients to Salem Govt Hospital.',
                        ta: 'அவசர சிகிச்சை தேவைப்படும் ஏழைகளை அரசு மருத்துவமனைகளுக்கு அழைத்துச் செல்ல 10 இலவச பயணங்களுக்கான எரிபொருளை ஸ்பான்சர் செய்யும்.'
                      },
                      icon: <FaTruckMedical className="h-4 w-4" />,
                      color: 'bg-amber-50 text-amber-700 border-amber-100',
                      badge: 'bg-amber-100 text-amber-800'
                    },
                    {
                      id: 'cremation',
                      title: { en: 'Dignified Last Rites', ta: 'ஆதரவற்றோர் இறுதி மரியாதை' },
                      amt: '₹1,500',
                      unit: { en: '1 Dignified Burial', ta: '1 தகனச் சடங்கு' },
                      desc: {
                        en: 'Covers municipal cremation fees, shroud cloth, and ceremonial materials for performing police-coordinated burial with complete dignity.',
                        ta: 'நாமக்கல்/சேலம் காவல்துறையின் முறைப்படியான அனுமதியுடன், உரிமை கோரப்படாத ஆதரவற்ற ஒரு உடலுக்கு இறுதிச் சடங்குகள் செய்யும்.'
                      },
                      icon: <FaHeart className="h-4 w-4" />,
                      color: 'bg-rose-50 text-rose-700 border-rose-100',
                      badge: 'bg-rose-100 text-rose-800'
                    }
                  ].map((scenario) => (
                    <div 
                      key={scenario.id} 
                      className="rounded-xl border border-gray-100 p-5 bg-white shadow-xs flex flex-col justify-between space-y-4 hover:border-gray-200 transition-all group"
                    >
                      <div className="space-y-3">
                        {/* Title and Icon */}
                        <div className="flex items-center space-x-2">
                          <div className={`p-2 rounded-lg border ${scenario.color}`}>
                            {scenario.icon}
                          </div>
                          <h4 className="font-display font-bold text-gray-900 text-xs sm:text-sm">
                            {scenario.title[lang]}
                          </h4>
                        </div>

                        {/* Amount Box */}
                        <div className="space-y-0.5">
                          <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">
                            {lang === 'en' ? 'Sponsorship Level' : 'உதவித் தொகை'}
                          </p>
                          <div className="flex items-baseline space-x-1.5">
                            <span className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight">
                              {scenario.amt}
                            </span>
                            <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${scenario.badge}`}>
                              {scenario.unit[lang]}
                            </span>
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-[11px] sm:text-xs text-gray-600 leading-relaxed text-justify">
                          {scenario.desc[lang]}
                        </p>
                      </div>

                      {/* Sponsor Action CTA */}
                      <button
                        onClick={() => setActiveTab('donate')}
                        className="w-full text-center py-2 rounded-lg bg-emerald-50 text-emerald-800 text-[10px] sm:text-xs font-bold hover:bg-emerald-600 hover:text-white transition-all cursor-pointer"
                      >
                        {lang === 'en' ? 'Sponsor Program →' : 'இந்த திட்டத்திற்கு உதவவும் →'}
                      </button>
                    </div>
                  ))}
                </motion.div>
              )}

              {/* TAB 2: RECENT KINDNESS (DONATIONS PLEDGED) */}
              {activeHubTab === 'pledges' && (
                <motion.div
                  key="pledges"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {recentPledges.length === 0 ? (
                      <div className="col-span-3 text-center py-10 text-xs text-gray-400">
                        {lang === 'en' ? 'No recent contributions logged yet.' : 'சமீபத்திய பங்களிப்புகள் இன்னும் பதிவாகவில்லை.'}
                      </div>
                    ) : (
                      recentPledges.map((pledge, idx) => (
                        <div 
                          key={idx} 
                          className="rounded-xl border border-emerald-100/60 p-4 bg-emerald-50/10 flex flex-col justify-between space-y-3 relative overflow-hidden"
                        >
                          <div className="absolute top-0 right-0 h-8 w-8 bg-emerald-50 text-emerald-600 rounded-bl-full flex items-center justify-center text-xs">
                            ❤️
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <div className="h-6 w-6 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold flex items-center justify-center">
                                {pledge.name.charAt(0)}
                              </div>
                              <div>
                                <h5 className="text-xs font-bold text-gray-900 leading-tight">{pledge.name}</h5>
                                <p className="text-[9px] text-gray-400 font-mono">{pledge.date}</p>
                              </div>
                            </div>
                            <p className="text-xs text-gray-600 italic leading-relaxed">
                              "{pledge.msg}"
                            </p>
                          </div>
                          
                          <div className="pt-2 border-t border-emerald-100/50 flex justify-between items-center text-[10px]">
                            <span className="font-semibold text-gray-400 uppercase tracking-wider">
                              {pledge.type === 'Money' || pledge.type === 'Sponsorship' ? (lang === 'en' ? 'Pledged' : 'நிதி உதவி') : (lang === 'en' ? 'Material' : 'பொருளுதவி')}
                            </span>
                            <span className="font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                              {pledge.item}
                            </span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-gray-50 text-xs">
                    <p className="text-gray-500">
                      {lang === 'en' 
                        ? 'Recent kindness logs demonstrating active community support on this device.' 
                        : 'அறக்கட்டளையின் தாராள மனப்பான்மை நன்றிக்கூடம் தங்களின் தொடர் சமூக ஆதரவை மெய்ப்பிக்கின்றது.'}
                    </p>
                    <div className="flex gap-3">
                      <button
                        onClick={() => setActiveTab('donate')}
                        className="text-emerald-700 font-bold hover:underline cursor-pointer flex items-center space-x-1"
                      >
                        <span>{lang === 'en' ? 'Pledge Your Support Now' : 'நன்றிக் கூடத்தில் உங்களை இணைக்க'}</span>
                        <FaChevronRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* TAB 3: IMPORTANT TRUST DISCLOSURES & SAFETY */}
              {activeHubTab === 'disclosures' && (
                <motion.div
                  key="disclosures"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="grid grid-cols-1 md:grid-cols-3 gap-6"
                >
                  
                  {/* Warning 1: Official bank only */}
                  <div className="rounded-xl border border-red-100 bg-red-50/30 p-5 flex flex-col justify-between space-y-3">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-red-700">
                        <FaCircleExclamation className="h-4 w-4 flex-shrink-0" />
                        <h4 className="text-xs font-bold uppercase tracking-wider">
                          🚨 {lang === 'en' ? 'Official Account Only' : 'அதிகாரப்பூர்வ கணக்கு மட்டுமே'}
                        </h4>
                      </div>
                      <p className="text-[11px] sm:text-xs text-red-900 leading-relaxed text-justify">
                        {lang === 'en'
                          ? 'Make payments only to the official Nallathe Nadakkum Trust bank account or official QR codes. Never send donations to any private personal bank accounts of members.'
                          : 'நன்கொடைகளை அறக்கட்டளையின் பெயரில் உள்ள அதிகாரப்பூர்வ வங்கிக் கணக்கிற்கு மட்டுமே செலுத்துங்கள். தனிநபர்களின் சொந்தக் கணக்குகளுக்குப் பணம் அனுப்ப வேண்டாம்.'}
                      </p>
                    </div>
                    <span className="text-[9px] font-mono font-bold text-red-700 bg-red-100 px-2 py-0.5 rounded w-fit uppercase">
                      {lang === 'en' ? 'Zero Commission Policy' : 'கமிஷன்கள் இல்லை'}
                    </span>
                  </div>

                  {/* Warning 2: Tax Exemption Status */}
                  <div className="rounded-xl border border-amber-100 bg-amber-50/30 p-5 flex flex-col justify-between space-y-3">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-amber-800">
                        <FaLock className="h-4 w-4 flex-shrink-0" />
                        <h4 className="text-xs font-bold uppercase tracking-wider">
                          📋 {lang === 'en' ? 'Tax Status Disclosures' : 'வரி விலக்கு நிலைப்பாடு'}
                        </h4>
                      </div>
                      <p className="text-[11px] sm:text-xs text-amber-900 leading-relaxed text-justify">
                        {lang === 'en'
                          ? 'Nallathe Nadakkum is registered as Doc No. 16/2025. Applications for 12A and 80G tax exemptions are in process with the IT Department and are currently NOT tax-exempt.'
                          : 'எங்களது அறக்கட்டளை Doc 16/2025 ஆக பதிவு செய்யப்பட்டுள்ளது. 12A மற்றும் 80G வரி விலக்கு விண்ணப்பங்கள் வருமான வரித்துறையிடம் நிலுவையில் இருப்பதால் தற்போது வரி விலக்கு பெற இயலாது.'}
                      </p>
                    </div>
                    <span className="text-[9px] font-mono font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded w-fit uppercase">
                      {lang === 'en' ? 'Pending Approval' : 'விண்ணப்பம் பரிசீலனையில்'}
                    </span>
                  </div>

                  {/* Warning 3: FCRA blocking */}
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 flex flex-col justify-between space-y-3">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-slate-700">
                        <FaCoins className="h-4 w-4 flex-shrink-0" />
                        <h4 className="text-xs font-bold uppercase tracking-wider">
                          🚫 {lang === 'en' ? 'FCRA & Foreign Funds' : 'வெளிநாட்டு நிதி மறுப்பு'}
                        </h4>
                      </div>
                      <p className="text-[11px] sm:text-xs text-slate-700 leading-relaxed text-justify">
                        {lang === 'en'
                          ? 'We strictly comply with Home Ministry FCRA regulations. Since we do not hold FCRA registration, we cannot accept foreign currency donations or non-Indian remittances.'
                          : 'FCRA சட்ட விதிகளின்படி, வெளிநாட்டு வங்கிக் கணக்குகளில் இருந்தோ அல்லது வெளிநாட்டுப் பணமாகவோ எங்களால் நன்கொடைகளை ஏற்க முடியாது என்பதைத் தெளிவுபடுத்துகிறோம்.'}
                      </p>
                    </div>
                    <span className="text-[9px] font-mono font-bold text-slate-700 bg-slate-200 px-2 py-0.5 rounded w-fit uppercase">
                      {lang === 'en' ? 'Domestic Only' : 'உள்நாட்டு நிதி மட்டுமே'}
                    </span>
                  </div>

                </motion.div>
              )}

            </AnimatePresence>
          </div>

        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          
          {/* Mission Card */}
          <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm flex flex-col space-y-4 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-emerald-600"></div>
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700 mb-2">
              <FaHeartPulse className="h-6 w-6" />
            </div>
            <h3 className="font-display text-xl font-bold text-gray-900">
              {commonTranslations.missionTitle[lang]}
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed flex-grow text-justify">
              {commonTranslations.missionText[lang]}
            </p>
          </div>

          {/* Vision Card */}
          <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm flex flex-col space-y-4 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-emerald-600"></div>
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700 mb-2">
              <FaAward className="h-6 w-6" />
            </div>
            <h3 className="font-display text-xl font-bold text-gray-900">
              {commonTranslations.visionTitle[lang]}
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed flex-grow text-justify">
              {commonTranslations.visionText[lang]}
            </p>
          </div>

        </div>
      </section>

      {/* Founder Message & Stated Claims Notice */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-gray-50 border border-gray-200/60 p-8 flex flex-col md:flex-row gap-8 items-center">
          <div className="h-28 w-28 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-4xl flex-shrink-0 font-bold border border-emerald-200">
            NK
          </div>
          <div className="space-y-4 flex-grow">
            <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700">
              {lang === 'en' ? 'A Message from our Founder' : 'நிறுவனரின் செய்தி'}
            </p>
            <blockquote className="text-sm sm:text-base text-gray-700 italic leading-relaxed font-sans">
              {lang === 'en' 
                ? '"Nallathe Nadakkum translates to Good things will happen. It is our firm conviction that consistent, small acts of daily compassion compound into real social reform. We do not wait behind a desk; we identify people on pavements, coordinate burials at the mortuary, and drive patients to emergency beds ourselves. We welcome anyone of any background to join this effort."' 
                : '"நல்லதே நடக்கும் என்பது வெறும் பெயர் அல்ல, அது எங்களின் நம்பிக்கை. ஒவ்வொரு நாளும் நாம் செய்யும் சிறிய நற்செயல்களும் உதவிகளும் மிகப்பெரிய சமூக மாற்றத்தை ஏற்படுத்தும். நாங்கள் அலுவலகக் கதவுகளுக்குப் பின்னால் அமர்ந்து கொண்டிருக்கவில்லை; நேரடியாகச் சாலைகளுக்குச் செல்கிறோம், முதியவர்களை மீட்கிறோம், காவல்துறை அனுமதியுடன் இறுதி மரியாதைகளைச் செய்கிறோம். சாதி, மதம், பின்னணி வேறுபாடின்றி அனைவரும் இதில் இணைய அழைக்கிறோம்."'}
            </blockquote>
            <div>
              <p className="font-display text-sm font-bold text-gray-900">{commonTranslations.founderName[lang]}</p>
              <p className="text-xs text-gray-500">{lang === 'en' ? 'Founder & Chairman, Advocate' : 'நிறுவனர் மற்றும் தலைவர், வழக்கறிஞர்'}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Activities Quick Links */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <h2 className="font-display text-2xl font-bold text-gray-900">
          {lang === 'en' ? 'Our Direct Support Programs' : 'அறக்கட்டளையின் நேரடி திட்டங்கள்'}
        </h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {[
            { label: { en: 'Daily Food', ta: 'அன்னதானம்' }, tab: 'services', icon: <FaUtensils className="h-5 w-5" /> },
            { label: { en: 'Free Ambulance', ta: 'இலவச ஆம்புலன்ஸ்' }, tab: 'services', icon: <FaTruckMedical className="h-5 w-5" /> },
            { label: { en: 'Last Rites', ta: 'இறுதி மரியாதை' }, tab: 'services', icon: <FaHeart className="h-5 w-5" /> },
            { label: { en: 'Elder Rescue', ta: 'முதியோர் மீட்பு' }, tab: 'services', icon: <FaAward className="h-5 w-5" /> },
            { label: { en: 'Education Support', ta: 'கல்வி உதவி' }, tab: 'services', icon: <FaFileLines className="h-5 w-5" /> },
            { label: { en: 'Emergency Help', ta: 'அவசர உதவி' }, tab: 'help', icon: <FaHeartPulse className="h-5 w-5" /> }
          ].map((prog, idx) => (
            <button
              key={idx}
              id={`quick-link-${idx}`}
              onClick={() => setActiveTab(prog.tab)}
              className="rounded-xl border border-gray-100 bg-white p-4 text-center shadow-sm hover:shadow-md hover:border-emerald-200 hover:bg-emerald-50/20 transition-all cursor-pointer flex flex-col items-center justify-center space-y-2 group"
            >
              <div className="p-2 bg-emerald-50 text-emerald-700 rounded-lg group-hover:bg-emerald-100 transition-colors">
                {prog.icon}
              </div>
              <span className="text-xs font-semibold text-gray-800 leading-tight">
                {prog.label[lang]}
              </span>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}



import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Utensils, 
  Ambulance as AmbulanceIcon, 
  Heart, 
  UserCheck, 
  GraduationCap, 
  Activity, 
  X, 
  PhoneCall, 
  DollarSign, 
  Users,
  ChevronRight,
  Info
} from 'lucide-react';
import { servicesData, ServiceItem } from '../data';
import ProgramImageSlider from './ProgramImageSlider';

interface ServicesViewProps {
  lang: 'en' | 'ta';
  setActiveTab: (tab: string) => void;
}

export default function ServicesView({ lang, setActiveTab }: ServicesViewProps) {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [filter, setFilter] = useState<string>('all');

  const getIcon = (name: string) => {
    switch (name) {
      case 'Utensils': return <Utensils className="h-6 w-6" />;
      case 'Ambulance': return <AmbulanceIcon className="h-6 w-6" />;
      case 'HeartHandshake': return <Heart className="h-6 w-6" />;
      case 'UserCheck': return <UserCheck className="h-6 w-6" />;
      case 'GraduationCap': return <GraduationCap className="h-6 w-6" />;
      case 'Activity': return <Activity className="h-6 w-6" />;
      default: return <Info className="h-6 w-6" />;
    }
  };

  const filteredServices = filter === 'all' 
    ? servicesData 
    : servicesData.filter(s => s.id === filter);

  return (
    <div className="space-y-12 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Title Header */}
      <section className="text-center max-w-3xl mx-auto space-y-4">
        <h1 className="font-display text-3xl font-extrabold text-gray-900 sm:text-4xl">
          {lang === 'en' ? 'Our Services & Social Activities' : 'நமது சேவைகள் மற்றும் மக்கள் பணிகள்'}
        </h1>
        <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
          {lang === 'en' 
            ? 'We operate six direct humanitarian programs in Tiruchengode, Tamil Nadu, to reach those who fall outside traditional social safety nets.' 
            : 'திருச்செங்கோட்டில் முறையான அரசு உதவிகள் எட்டாத நலிந்த மக்களுக்கு உதவிட, நாங்கள் ஆறு முக்கிய மக்கள் நலத் திட்டங்களைச் செயல்படுத்தி வருகிறோம்.'}
        </p>
      </section>

      {/* Program Quick Filters */}
      <section className="flex flex-wrap justify-center gap-2">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-full text-xs font-semibold cursor-pointer transition-all ${
            filter === 'all' 
              ? 'bg-emerald-600 text-white shadow-sm' 
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          {lang === 'en' ? 'All Programs' : 'அனைத்து பணிகள்'}
        </button>
        {servicesData.map((s) => (
          <button
            key={s.id}
            onClick={() => setFilter(s.id)}
            className={`px-4 py-2 rounded-full text-xs font-semibold cursor-pointer transition-all ${
              filter === s.id 
                ? 'bg-emerald-600 text-white shadow-sm' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {s.title[lang].split(' (')[0]}
          </button>
        ))}
      </section>

      {/* Grid of Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-4">
        {filteredServices.map((service, idx) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.05 }}
            className="group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm hover:shadow-md hover:border-emerald-100 transition-all flex flex-col justify-between"
          >
            <div className="space-y-4">
              {/* Sliding Moving Images for each support program section */}
              <ProgramImageSlider programId={service.id} />
              
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-emerald-50 text-emerald-700 rounded-xl w-fit group-hover:bg-emerald-100 transition-colors flex-shrink-0">
                  {getIcon(service.iconName)}
                </div>
                <h3 className="font-display text-base font-bold text-gray-900 group-hover:text-emerald-700 transition-colors">
                  {service.title[lang]}
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed text-justify">
                {service.description[lang]}
              </p>
            </div>

            <div className="pt-6 flex items-center justify-between">
              <span className="text-[10px] text-gray-400 font-mono uppercase bg-gray-50 px-2 py-0.5 rounded">
                ID: {service.id}
              </span>
              <button
                id={`btn-more-info-${service.id}`}
                onClick={() => setSelectedService(service)}
                className="text-xs font-semibold text-emerald-600 hover:text-emerald-800 flex items-center space-x-1 cursor-pointer"
              >
                <span>{lang === 'en' ? 'More Info' : 'விவரம் அறிக'}</span>
                <ChevronRight className="h-3 w-3" />
              </button>
            </div>
          </motion.div>
        ))}
      </section>

      {/* Bottom Legal Clarification banner */}
      <section className="rounded-2xl bg-gray-50 p-6 border border-gray-200/60 text-center space-y-2">
        <p className="text-xs font-semibold text-emerald-800">
          💡 {lang === 'en' ? 'All request submissions undergo physical verification' : 'கோரிக்கைகள் அனைத்தும் நேரடி ஆய்வுக்குப் பின்னரே ஏற்றுக்கொள்ளப்படும்'}
        </p>
        <p className="text-[11px] text-gray-500 max-w-2xl mx-auto">
          {lang === 'en'
            ? 'Our local volunteer network verifies every help request prior to resource allocation to ensure donor funds go to genuine, highly distressed cases.'
            : 'நன்கொடையாளர் நிதி தகுதியுள்ள நபர்களைச் சென்றடைவதை உறுதிசெய்ய, உதவி கோரிக்கைகள் அனைத்தும் எமது தன்னார்வலர்களின் நேரடி ஆய்வுக்கு உட்படுத்தப்படும்.'}
        </p>
      </section>

      {/* Detail Expansion Modal */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative w-full max-w-2xl rounded-2xl bg-white shadow-2xl overflow-hidden border border-gray-100 flex flex-col max-h-[90vh]"
            >
              
              {/* Modal Header */}
              <div className="p-6 bg-emerald-800 text-white flex items-start justify-between relative">
                <div className="flex items-center space-x-3">
                  <div className="p-2.5 bg-emerald-700/60 rounded-xl">
                    {getIcon(selectedService.iconName)}
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold leading-tight">
                      {selectedService.title[lang]}
                    </h3>
                    <p className="text-emerald-200 text-xs mt-0.5">
                      {lang === 'en' ? 'Program Detail File' : 'திட்ட செயல்பாட்டு விபரம்'}
                    </p>
                  </div>
                </div>
                <button
                  id="close-modal-btn"
                  onClick={() => setSelectedService(null)}
                  className="rounded-full bg-emerald-700 p-1.5 text-emerald-100 hover:bg-emerald-600 transition-colors cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Modal Body (Scrollable) */}
              <div className="p-6 overflow-y-auto space-y-6">
                
                {/* Large Program Image Slider inside modal */}
                <div className="w-full h-56 sm:h-64 rounded-xl overflow-hidden shadow-sm border border-gray-100">
                  <ProgramImageSlider programId={selectedService.id} />
                </div>
                
                {/* Full Description */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                    {lang === 'en' ? 'Description' : 'திட்ட விளக்கம்'}
                  </h4>
                  <p className="text-sm text-gray-700 leading-relaxed text-justify">
                    {selectedService.detailedDescription[lang]}
                  </p>
                </div>

                {/* Benefits */}
                <div className="space-y-2 bg-emerald-50/50 p-4 rounded-xl border border-emerald-100">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center space-x-1">
                    <span>✨</span>
                    <span>{lang === 'en' ? 'Stated Benefits & Stated Metrics' : 'நமது திட்ட இலக்குகள் & தாக்கங்கள்'}</span>
                  </h4>
                  <p className="text-xs sm:text-sm text-emerald-900 leading-relaxed">
                    {selectedService.benefits[lang]}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                  
                  {/* How to Request */}
                  <div className="border border-gray-100 rounded-xl p-4 space-y-2 flex flex-col justify-between">
                    <div className="space-y-1">
                      <div className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center space-x-1">
                        <PhoneCall className="h-3 w-3 text-emerald-600" />
                        <span>{lang === 'en' ? 'Request help' : 'உதவி பெற'}</span>
                      </div>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        {selectedService.howToRequest[lang]}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedService(null);
                        setActiveTab('help');
                      }}
                      className="text-xs font-semibold text-emerald-600 hover:underline hover:text-emerald-800 text-left pt-2 flex items-center space-x-1 cursor-pointer"
                    >
                      <span>{lang === 'en' ? 'Open Form' : 'படிவத்தை திறக்கவும்'}</span>
                      <ChevronRight className="h-3 w-3" />
                    </button>
                  </div>

                  {/* How to Donate */}
                  <div className="border border-gray-100 rounded-xl p-4 space-y-2 flex flex-col justify-between">
                    <div className="space-y-1">
                      <div className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center space-x-1">
                        <DollarSign className="h-3 w-3 text-emerald-600" />
                        <span>{lang === 'en' ? 'Sponsor Program' : 'ஸ்பான்சர் செய்ய'}</span>
                      </div>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        {selectedService.howToDonate[lang]}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedService(null);
                        setActiveTab('donate');
                      }}
                      className="text-xs font-semibold text-emerald-600 hover:underline hover:text-emerald-800 text-left pt-2 flex items-center space-x-1 cursor-pointer"
                    >
                      <span>{lang === 'en' ? 'Sponsor Now' : 'இப்போதே ஸ்பான்சர் செய்ய'}</span>
                      <ChevronRight className="h-3 w-3" />
                    </button>
                  </div>

                  {/* Volunteer Role */}
                  <div className="border border-gray-100 rounded-xl p-4 space-y-2 flex flex-col justify-between">
                    <div className="space-y-1">
                      <div className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center space-x-1">
                        <Users className="h-3 w-3 text-emerald-600" />
                        <span>{lang === 'en' ? 'Volunteer role' : 'தன்னார்வ பணி'}</span>
                      </div>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        {selectedService.volunteerRole[lang]}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedService(null);
                        setActiveTab('volunteer');
                      }}
                      className="text-xs font-semibold text-emerald-600 hover:underline hover:text-emerald-800 text-left pt-2 flex items-center space-x-1 cursor-pointer"
                    >
                      <span>{lang === 'en' ? 'Join Us' : 'எங்களுடன் இணைய'}</span>
                      <ChevronRight className="h-3 w-3" />
                    </button>
                  </div>

                </div>

              </div>

              {/* Modal Footer */}
              <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-end">
                <button
                  id="btn-close-modal-footer"
                  onClick={() => setSelectedService(null)}
                  className="rounded-lg bg-white border border-gray-300 px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  {lang === 'en' ? 'Close' : 'மூடவும்'}
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}

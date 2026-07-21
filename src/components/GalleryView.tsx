import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Filter, Calendar, MapPin, X, ChevronRight } from 'lucide-react';
import { galleryData, GalleryItem } from '../data';

interface GalleryViewProps {
  lang: 'en' | 'ta';
}

export default function GalleryView({ lang }: GalleryViewProps) {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const categories = ['All', 'Food', 'Ambulance', 'Last Rites', 'Rescue', 'Education', 'Essentials'];

  const filteredItems = galleryData.filter(item => {
    const matchesCategory = activeFilter === 'All' || item.category === activeFilter;
    const matchesSearch = 
      item.title[lang].toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description[lang].toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location[lang].toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-12 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Title Header */}
      <section className="text-center max-w-3xl mx-auto space-y-4">
        <h1 className="font-display text-3xl font-extrabold text-gray-900 sm:text-4xl">
          {lang === 'en' ? 'Our Activities & Gallery' : 'கடந்தகால பணிகள் மற்றும் புகைப்படத் தொகுப்பு'}
        </h1>
        <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
          {lang === 'en' 
            ? 'A visual ledger of our daily presence in the streets, mortuaries, and classrooms of Namakkal and Salem districts.' 
            : 'நாமக்கல் மற்றும் சேலம் மாவட்டங்களில் நாங்கள் மேற்கொண்ட அவசரப் பணிகள், மீட்புகள் மற்றும் தினசரி அன்னதான நிகழ்வுகளின் நேரடிப் பதிவுகள்.'}
        </p>
      </section>

      {/* Search & Filter Bar */}
      <section className="flex flex-col md:flex-row gap-4 items-center justify-between bg-gray-50 p-4 rounded-2xl border border-gray-200/60">
        
        {/* Search */}
        <div className="relative w-full md:max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder={lang === 'en' ? 'Search activities...' : 'தேடவும்...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-xs sm:text-sm bg-white focus:outline-hidden focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
          />
        </div>

        {/* Filter Scrollable */}
        <div className="flex flex-wrap gap-1.5 w-full md:w-auto justify-start md:justify-end overflow-x-auto pb-1 md:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition-colors ${
                activeFilter === cat
                  ? 'bg-emerald-600 text-white'
                  : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              {lang === 'en' ? cat : (
                cat === 'All' ? 'அனைத்தும்' :
                cat === 'Food' ? 'அன்னதானம்' :
                cat === 'Ambulance' ? 'ஆம்புலன்ஸ்' :
                cat === 'Last Rites' ? 'இறுதிச் சடங்கு' :
                cat === 'Rescue' ? 'முதியோர் மீட்பு' :
                cat === 'Education' ? 'கல்வி' : 'அத்தியாவசியம்'
              )}
            </button>
          ))}
        </div>

      </section>

      {/* Grid of Photo Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item, idx) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="rounded-2xl border border-gray-100 bg-white overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col group"
            >
              {/* Image Frame */}
              <div className="relative overflow-hidden h-48 bg-gray-100">
                <img
                  src={item.image}
                  alt={item.title[lang]}
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-3 left-3 bg-emerald-700/90 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                  {item.category}
                </span>
              </div>

              {/* Content Frame */}
              <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-3 text-[10px] font-mono text-gray-400">
                    <span className="flex items-center space-x-1">
                      <Calendar className="h-3 w-3" />
                      <span>{item.date}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <MapPin className="h-3 w-3" />
                      <span>{item.location[lang]}</span>
                    </span>
                  </div>
                  <h3 className="font-display text-sm sm:text-base font-bold text-gray-900 group-hover:text-emerald-700 transition-colors">
                    {item.title[lang]}
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed text-justify line-clamp-3">
                    {item.description[lang]}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-gray-50">
                  {item.beneficiaries && (
                    <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                      {item.beneficiaries[lang]}
                    </span>
                  )}
                  <button
                    id={`btn-open-gallery-${item.id}`}
                    onClick={() => setSelectedItem(item)}
                    className="text-xs font-semibold text-emerald-600 hover:text-emerald-800 cursor-pointer flex items-center space-x-1"
                  >
                    <span>{lang === 'en' ? 'View Details' : 'விபரம் பார்க்க'}</span>
                    <ChevronRight className="h-3 w-3" />
                  </button>
                </div>
              </div>

            </motion.div>
          ))}
        </AnimatePresence>
      </section>

      {/* Social Media Link Redirects Info */}
      <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1">
          <h3 className="font-display text-base font-bold text-gray-900">
            {lang === 'en' ? 'Follow Real-time Daily Updates' : 'தினசரி பணிகளை உடனுக்குடன் பார்க்க'}
          </h3>
          <p className="text-xs text-gray-500 leading-normal max-w-xl">
            {lang === 'en'
              ? 'Our founder routinely posts on-site photos, police burial verification logs, and video updates directly onto our social pages.'
              : 'எங்கள் நிறுவனரின் நேரடி மீட்பு மற்றும் இறுதி மரியாதை வீடியோக்கள், புகைப்படங்களை எங்களது அதிகாரப்பூர்வ சமூக ஊடகங்களில் தினமும் காணலாம்.'}
          </p>
        </div>
        <div className="flex gap-3">
          <a
            href="https://www.instagram.com/nn_socialservice_trust"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-red-50 text-red-700 px-4 py-2 text-xs font-bold hover:bg-red-100 transition-colors"
          >
            Instagram
          </a>
          <a
            href="https://www.youtube.com/@nallathenadakumsocialtrust"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-red-50 text-red-700 px-4 py-2 text-xs font-bold hover:bg-red-100 transition-colors"
          >
            YouTube
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-blue-50 text-blue-700 px-4 py-2 text-xs font-bold hover:bg-blue-100 transition-colors"
          >
            Facebook
          </a>
        </div>
      </section>

      {/* Expanded Modal Box */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-lg rounded-2xl bg-white shadow-2xl overflow-hidden border border-gray-100 flex flex-col max-h-[85vh]"
            >
              <div className="relative overflow-hidden h-56 bg-gray-100">
                <img
                  src={selectedItem.image}
                  alt={selectedItem.title[lang]}
                  className="h-full w-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <button
                  id="close-gallery-modal"
                  onClick={() => setSelectedItem(null)}
                  className="absolute top-4 right-4 rounded-full bg-black/60 p-1.5 text-white hover:bg-black/80 transition-colors cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="p-6 overflow-y-auto space-y-4">
                <div className="flex items-center justify-between text-xs font-mono text-gray-400">
                  <span className="flex items-center space-x-1">
                    <Calendar className="h-3 w-3" />
                    <span>{selectedItem.date}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <MapPin className="h-3 w-3" />
                    <span>{selectedItem.location[lang]}</span>
                  </span>
                </div>

                <h3 className="font-display text-base sm:text-lg font-bold text-gray-900 leading-tight">
                  {selectedItem.title[lang]}
                </h3>

                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed text-justify">
                  {selectedItem.description[lang]}
                </p>

                {selectedItem.beneficiaries && (
                  <div className="pt-3 border-t border-gray-50 flex justify-between items-center">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                      {lang === 'en' ? 'Stated Impact' : 'தாக்கம்/விபரம்'}
                    </span>
                    <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full">
                      {selectedItem.beneficiaries[lang]}
                    </span>
                  </div>
                )}
              </div>

              <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-end">
                <button
                  id="btn-close-gallery-modal-footer"
                  onClick={() => setSelectedItem(null)}
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

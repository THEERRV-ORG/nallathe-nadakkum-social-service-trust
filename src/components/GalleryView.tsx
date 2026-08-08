import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FaMagnifyingGlass, FaCalendarDays, FaLocationDot, FaXmark, FaChevronRight } from 'react-icons/fa6';
import { galleryData, GalleryItem } from '../data';

interface GalleryViewProps {
  lang: 'en' | 'ta';
}

const GalleryCard = React.memo(({ item, lang, onOpen }: { item: GalleryItem; lang: 'en' | 'ta'; onOpen: (item: GalleryItem) => void }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="rounded-2xl border border-gray-100 bg-white overflow-hidden shadow-[0_10px_30px_-12px_rgba(16,24,40,0.15)] ring-1 ring-gray-900/[0.04] hover:shadow-md transition-all flex flex-col group"
    >
      {/* Image Frame with lazy load and placeholder fade-in */}
      <div className={`relative overflow-hidden h-48 ${isLoaded ? 'bg-gray-100' : 'bg-gray-200 animate-pulse'}`}>
        <img
          src={item.image}
          alt={item.title[lang]}
          loading="lazy"
          decoding="async"
          onLoad={() => setIsLoaded(true)}
          className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 ${
            isLoaded ? 'opacity-100 group-hover:scale-105' : 'opacity-0'
          }`}
          referrerPolicy="no-referrer"
        />
        <span className="absolute top-3 left-3 bg-emerald-700/90 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded z-10">
          {item.category}
        </span>
      </div>

      {/* Content Frame */}
      <div className="p-5 flex-grow flex flex-col justify-between space-y-4 bg-white z-10">
        <div className="space-y-2">
          <div className="flex items-center space-x-3 text-[10px] font-sans font-semibold text-gray-900">
            <span className="flex items-center space-x-1">
              <FaCalendarDays className="h-3 w-3" />
              <span>{item.date}</span>
            </span>
            <span className="flex items-center space-x-1">
              <FaLocationDot className="h-3 w-3" />
              <span>{item.location[lang]}</span>
            </span>
          </div>
          <h3 className="font-display text-sm sm:text-base font-bold text-gray-900 group-hover:text-emerald-700 transition-colors line-clamp-1">
            {item.title[lang]}
          </h3>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-gray-50">
          <button
            id={`btn-open-gallery-${item.id}`}
            onClick={() => onOpen(item)}
            className="text-xs font-semibold text-emerald-600 hover:text-emerald-800 cursor-pointer flex items-center space-x-1"
          >
            <span>{lang === 'en' ? 'View Details' : 'விபரம் பார்க்க'}</span>
            <FaChevronRight className="h-3 w-3" />
          </button>
        </div>
      </div>
    </motion.div>
  );
});
GalleryCard.displayName = 'GalleryCard';

export default function GalleryView({ lang }: GalleryViewProps) {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [modalImageLoaded, setModalImageLoaded] = useState(false);

  const categories = ['All', 'Food', 'Ambulance', 'Last Rites', 'Rescue', 'Education', 'Essentials'];

  // Memoize the filtered gallery data to avoid recalculating on every render
  const filteredItems = useMemo(() => {
    return galleryData.filter(item => {
      const matchesCategory = activeFilter === 'All' || item.category === activeFilter;
      if (!matchesCategory) return false;

      if (!searchQuery.trim()) return true;
      const query = searchQuery.toLowerCase();
      return (
        item.title[lang].toLowerCase().includes(query) ||
        item.description[lang].toLowerCase().includes(query) ||
        item.location[lang].toLowerCase().includes(query)
      );
    });
  }, [searchQuery, activeFilter, lang]);

  const handleOpenModal = (item: GalleryItem) => {
    setModalImageLoaded(false);
    setSelectedItem(item);
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
  };

  return (
    <div className="space-y-12 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Title Header */}
      <section className="text-center max-w-3xl mx-auto space-y-4">
        <h1 className="h1-page">
          {lang === 'en' ? 'Moments of Service, Stories of Dignity' : 'செயற்பாடுகள் & புகைப்படங்கள்'}
        </h1>
        <p className="text-gray-900 text-base sm:text-lg leading-relaxed sm:leading-[1.65]">
          {lang === 'en' ? (
            'A glimpse into the trust’s field work, community activities, service milestones, and humanitarian outreach.'
          ) : (
            <>
              <strong>ஒவ்வொரு புகைப்படமும் ஒரு செயலை மட்டும் அல்ல, ஒரு மனித வாழ்க்கையின் கதையையும் சொல்கிறது</strong>
              <br />
              நாங்கள் சென்ற இடங்கள், உதவிய தருணங்கள், மீட்ட நம்பிக்கைகள், பகிர்ந்த மனிதநேயம்—அனைத்தும் இங்கே
            </>
          )}
        </p>
      </section>

      {/* Search & Filter Bar */}
      <section className="flex flex-col md:flex-row gap-4 items-center justify-between bg-gray-50 p-4 rounded-2xl border border-gray-200/60">
        
        {/* Search */}
        <div className="flex min-h-[3.125rem] w-full items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 transition-colors focus-within:border-emerald-500 focus-within:ring-1 focus-within:ring-emerald-500 md:max-w-xs">
          <FaMagnifyingGlass className="h-4 w-4 shrink-0 text-gray-600" />
          <input
            type="text"
            placeholder={lang === 'en' ? 'Search activities...' : 'தேடவும்...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="min-w-0 flex-1 bg-transparent text-xs text-gray-900 placeholder:text-gray-400 focus:outline-hidden sm:text-sm"
            style={{ border: 0, borderRadius: 0, boxShadow: 'none', minHeight: 'auto', padding: 0 }}
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
                  : 'bg-white border border-gray-200 text-gray-900 hover:bg-gray-50'
              }`}
            >
              {lang === 'en' ? cat : (
                cat === 'All' ? 'அனைத்தும்' :
                cat === 'Food' ? 'அன்னதானம்' :
                cat === 'Ambulance' ? 'ஆம்புலன்ஸ்' :
                cat === 'Last Rites' ? 'இறுதிச் சடங்கு' :
                cat === 'Rescue' ? 'முதியோர் மீட்பு' :
                cat === 'Education' ? 'கல்வி' :
                'அத்தியாவசியம்'
              )}
            </button>
          ))}
        </div>

      </section>

      {/* Grid of Photo Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item) => (
            <GalleryCard key={item.id} item={item} lang={lang} onOpen={handleOpenModal} />
          ))}
        </AnimatePresence>
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
              <div className={`relative overflow-hidden flex items-center justify-center ${modalImageLoaded ? 'bg-gray-100' : 'bg-gray-200 animate-pulse min-h-[40vh]'}`}>
                <img
                  src={selectedItem.image}
                  alt={selectedItem.title[lang]}
                  loading="lazy"
                  decoding="async"
                  onLoad={() => setModalImageLoaded(true)}
                  className={`max-h-[68vh] w-full object-contain transition-opacity duration-500 ${modalImageLoaded ? 'opacity-100' : 'opacity-0'}`}
                  referrerPolicy="no-referrer"
                />
                <button
                  id="close-gallery-modal"
                  onClick={handleCloseModal}
                  className="absolute top-4 right-4 rounded-full bg-black/60 p-1.5 text-white hover:bg-black/80 transition-colors cursor-pointer z-20"
                >
                  <FaXmark className="h-4 w-4" />
                </button>
              </div>

              <div className="p-6 overflow-y-auto space-y-4">
                <div className="flex items-center justify-between text-xs font-sans font-semibold text-gray-900">
                  <span className="flex items-center space-x-1">
                    <FaCalendarDays className="h-3 w-3" />
                    <span>{selectedItem.date}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <FaLocationDot className="h-3 w-3" />
                    <span>{selectedItem.location[lang]}</span>
                  </span>
                </div>

                <h3 className="font-display text-base font-bold text-gray-900 leading-tight line-clamp-1">
                  {selectedItem.title[lang]}
                </h3>

                {false && selectedItem.beneficiaries && (
                  <div className="pt-3 border-t border-gray-50 flex justify-between items-center">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-900">
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
                  onClick={handleCloseModal}
                  className="rounded-lg bg-white border border-gray-300 px-4 py-2 text-xs font-semibold text-gray-900 hover:bg-gray-50 transition-colors cursor-pointer"
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

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';

interface ProgramImageSliderProps {
  programId: string;
}

const programImages: Record<string, string[]> = {
  food: [
    '/gallery/activity-food-indoor.jpeg',
    '/gallery/activity-water-street.jpg'
  ],
  ambulance: [
    '/gallery/activity-ambulance-banner.jpeg',
    '/gallery/activity-ambulance-founder.jpg'
  ],
  lastrites: [
    '/gallery/activity-burial-ground.jpeg',
    '/gallery/activity-last-rites-indoor.jpg',
    '/gallery/activity-mortuary-respects.jpg'
  ],
  elderly: [
    '/gallery/activity-elder-rescue1.jpeg',
    '/gallery/activity-tricycle-wheelchair.jpg',
    '/gallery/activity-fan-donation.jpg'
  ],
  education: [
    '/gallery/activity-school-classroom.jpg',
    '/gallery/activity-education-scholarship.jpg',
    '/gallery/activity-cricket-kits.jpeg'
  ],
  medical: [
    '/gallery/activity-clothes-distribution.jpeg',
    '/gallery/activity-fan-donation.jpg'
  ]
};

export default function ProgramImageSlider({ programId }: ProgramImageSliderProps) {
  const images = programImages[programId] || [
    '/gallery/activity-ambulance-banner.jpg'
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000); // cycle every 4 seconds

    return () => clearInterval(timer);
  }, [images.length]);

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative w-full h-44 sm:h-48 rounded-xl overflow-hidden bg-gray-100 group">
      <AnimatePresence mode="wait">
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          alt={`Program ${programId} slide ${currentIndex + 1}`}
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.6 }}
          className="w-full h-full object-cover"
        />
      </AnimatePresence>

      {/* Manual Controls */}
      <button
        onClick={handlePrev}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer z-10"
        title="Previous image"
      >
        <FaChevronLeft className="h-4 w-4" />
      </button>

      <button
        onClick={handleNext}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer z-10"
        title="Next image"
      >
        <FaChevronRight className="h-4 w-4" />
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-1.5 z-10">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={(e) => {
              e.stopPropagation();
              setCurrentIndex(idx);
            }}
            className={`h-1.5 w-1.5 rounded-full transition-all cursor-pointer ${
              idx === currentIndex ? 'bg-emerald-600 w-3' : 'bg-white/60'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

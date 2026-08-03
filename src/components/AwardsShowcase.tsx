interface AwardsShowcaseProps {
  lang: 'en' | 'ta';
  /** Optional spacing mode for compact page placements. */
  compact?: boolean;
}

const AWARD_PHOTOS = [
  {
    src: '/gallery/award-rotary-yoga-day.jpeg',
    alt: {
      en: 'Adv. N. Kavinraj receiving a community service recognition at a Rotary public event',
      ta: 'ரோட்டரி பொதுநிகழ்வில் சமூக சேவை அங்கீகாரம் பெறும் வழக்கறிஞர் நா. கவின்ராஜ்',
    },
  },
  {
    src: '/gallery/award-rotary-installation.jpeg',
    alt: {
      en: 'Adv. N. Kavinraj receiving a Rotary recognition plaque at an installation function',
      ta: 'ரோட்டரி நிகழ்வில் அங்கீகார பலகை பெறும் வழக்கறிஞர் நா. கவின்ராஜ்',
    },
  },
];

/**
 * Reusable Awards & Recognition showcase. Rendered on the About page.
 */
export default function AwardsShowcase({ lang, compact = false }: AwardsShowcaseProps) {
  return (
    <section className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${compact ? 'space-y-6' : 'space-y-8'}`}>
      <div className="text-center space-y-2">
        <h2 className="h2-section">
          {lang === 'en' ? 'Awards & Recognition' : 'விருதுகள் & அங்கீகாரம்'}
        </h2>
        <p className="text-sm sm:text-base text-gray-900 max-w-xl mx-auto">
          {lang === 'en'
            ? 'Recognition received by our founder, Adv. N. Kavinraj, for community service.'
            : 'சமூக சேவைக்காக எங்கள் நிறுவனர் வழக்கறிஞர் நா. கவின்ராஜ் அவர்கள் பெற்ற அங்கீகாரங்கள்.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
        {AWARD_PHOTOS.map((photo) => (
          <figure key={photo.src} className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
            <img
              src={photo.src}
              alt={photo.alt[lang]}
              className="aspect-[4/3] w-full object-cover"
              loading="lazy"
            />
          </figure>
        ))}
      </div>
    </section>
  );
}

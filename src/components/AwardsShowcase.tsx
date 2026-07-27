import { FaTrophy, FaMedal, FaAward } from 'react-icons/fa6';

interface AwardsShowcaseProps {
  lang: 'en' | 'ta';
  /** Optional heading override; defaults to "Awards & Recognition". */
  compact?: boolean;
}

/*
  PLACEHOLDER — Awards & Recognition earned by the founder, Adv. N. Kavinraj.
  Real award names, awarding bodies, years, and photos will replace these
  entries once supplied. Nothing here is verified data; the copy is deliberately
  generic and marked as a placeholder so it is never mistaken for a real claim.
*/
const PLACEHOLDER_AWARDS = [
  {
    icon: <FaTrophy className="h-6 w-6" />,
    tile: 'bg-brand-gold-50 text-brand-gold-700',
    title: { en: 'Award Title', ta: 'விருதின் பெயர்' },
    org: { en: 'Awarding Organisation', ta: 'வழங்கிய அமைப்பு' },
    year: '20XX',
  },
  {
    icon: <FaMedal className="h-6 w-6" />,
    tile: 'bg-brand-blue-50 text-brand-blue-700',
    title: { en: 'Award Title', ta: 'விருதின் பெயர்' },
    org: { en: 'Awarding Organisation', ta: 'வழங்கிய அமைப்பு' },
    year: '20XX',
  },
  {
    icon: <FaAward className="h-6 w-6" />,
    tile: 'bg-brand-orange-50 text-brand-orange-700',
    title: { en: 'Award Title', ta: 'விருதின் பெயர்' },
    org: { en: 'Awarding Organisation', ta: 'வழங்கிய அமைப்பு' },
    year: '20XX',
  },
];

/**
 * Reusable Awards & Recognition showcase. Rendered on the About page (below the
 * founder details) and on the Invite-as-Speaker page (below the form). All
 * entries are placeholders pending the trust's real award details.
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
            ? 'Recognition received by our founder, Adv. N. Kavinraj, for community service. Details will be updated soon.'
            : 'சமூக சேவைக்காக எங்கள் நிறுவனர் வழக்கறிஞர் நா. கவின்ராஜ் அவர்கள் பெற்ற அங்கீகாரங்கள். விவரங்கள் விரைவில் இணைக்கப்படும்.'}
        </p>
      </div>

      {/* Soft placeholder — one quiet row of muted icons instead of three empty
          cards, so the section reads as intentionally-pending, not broken. */}
      <div className="rounded-2xl border border-dashed border-gray-200 bg-gray-50/60 px-6 py-8 flex flex-col items-center gap-4 text-center">
        <div className="flex items-center gap-3 text-gray-300">
          {PLACEHOLDER_AWARDS.map((award, idx) => (
            <span key={idx} className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white border border-gray-100">
              {award.icon}
            </span>
          ))}
        </div>
        <p className="text-sm text-gray-500 max-w-md">
          {lang === 'en'
            ? 'Award certificates and recognitions will be published here soon.'
            : 'விருது சான்றிதழ்கள் மற்றும் அங்கீகாரங்கள் விரைவில் இங்கு வெளியிடப்படும்.'}
        </p>
      </div>
    </section>
  );
}


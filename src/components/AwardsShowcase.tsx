import { motion } from 'motion/react';
import { FaTrophy, FaMedal, FaAward, FaCertificate } from 'react-icons/fa6';

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
        <p className="text-xs font-bold uppercase tracking-widest text-brand-gold-700">
          {lang === 'en' ? 'Honours' : 'கௌரவங்கள்'}
        </p>
        <h2 className="font-display text-2xl font-bold text-gray-900 sm:text-3xl">
          {lang === 'en' ? 'Awards & Recognition' : 'விருதுகள் & அங்கீகாரம்'}
        </h2>
        <p className="text-sm sm:text-base text-gray-900/70 max-w-xl mx-auto">
          {lang === 'en'
            ? 'Recognition received by our founder, Adv. N. Kavinraj, for community service. Details will be updated soon.'
            : 'சமூக சேவைக்காக எங்கள் நிறுவனர் வழக்கறிஞர் நா. கவின்ராஜ் அவர்கள் பெற்ற அங்கீகாரங்கள். விவரங்கள் விரைவில் இணைக்கப்படும்.'}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {PLACEHOLDER_AWARDS.map((award, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.05 }}
            className="rounded-2xl border border-gray-100 bg-white p-6 shadow-[0_10px_30px_-12px_rgba(16,24,40,0.15)] ring-1 ring-gray-900/[0.04] flex flex-col space-y-4"
          >
            {/* Photo placeholder — replace with the award/certificate photo later */}
            <div className="aspect-[4/3] w-full rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 flex flex-col items-center justify-center gap-2 text-gray-400">
              <FaCertificate className="h-8 w-8" />
              <span className="text-[11px] font-semibold uppercase tracking-wider">
                {lang === 'en' ? 'Photo coming soon' : 'படம் விரைவில்'}
              </span>
            </div>

            <div className="flex items-start gap-3">
              <div className={`p-2.5 rounded-xl w-fit shrink-0 ${award.tile}`}>
                {award.icon}
              </div>
              <div className="space-y-0.5">
                <h3 className="font-display text-base font-bold text-gray-900">
                  {award.title[lang]}
                </h3>
                <p className="text-xs text-gray-900/70">
                  {award.org[lang]} · {award.year}
                </p>
              </div>
            </div>

            <p className="text-sm text-gray-900/70 leading-relaxed">
              {lang === 'en'
                ? 'Short description of the award and why it was received will appear here.'
                : 'விருது மற்றும் அது வழங்கப்பட்டதற்கான சுருக்கமான விவரம் இங்கு இடம்பெறும்.'}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

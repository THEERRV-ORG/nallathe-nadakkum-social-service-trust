import { motion, useReducedMotion } from 'motion/react';

interface JourneyTimelineProps {
  lang: 'en' | 'ta';
}

interface Milestone {
  year: string;
  title: { en: string; ta: string };
  desc: { en: string; ta: string };
  node: string;
  badge: string;
  registration?: boolean;
}

const milestones: Milestone[] = [
  {
    year: '2023',
    node: 'bg-emerald-300',
    badge: 'bg-emerald-50 text-emerald-700',
    title: { en: 'The Beginning of Consistent Personal Service', ta: 'தொடர்ச்சியான தனிப்பட்ட சேவையின் தொடக்கம்' },
    desc: {
      en: 'A phase of personal and small-scale humanitarian action, especially food support, carried out with direct individual commitment and growing community awareness.',
      ta: 'உணவு உதவி உள்ளிட்ட சிறிய அளவிலான மனிதநேய பணிகள் தனிப்பட்ட அர்ப்பணிப்புடன் தொடங்கிய காலம்.',
    },
  },
  {
    year: '08 Apr 2025',
    node: 'bg-emerald-600',
    badge: 'bg-emerald-600 text-white',
    registration: true,
    title: { en: 'Formal Registration and Organized Service', ta: 'முறையான பதிவு மற்றும் ஒழுங்கமைந்த சேவை' },
    desc: {
      en: 'On 08.04.2025, the work was officially registered as Nallathae Nadakkum Social Service Trust, creating clearer systems, public accountability, and a growing volunteer structure.',
      ta: '08.04.2025 அன்று நல்லதே நடக்கும் சமூக சேவை அறக்கட்டளையாக பதிவு செய்யப்பட்டு, பொது பொறுப்புணர்வு மற்றும் தன்னார்வ அமைப்பு வலுவடைந்தது.',
    },
  },
  {
    year: '2025-2026',
    node: 'bg-brand-gold',
    badge: 'bg-brand-gold-100 text-brand-gold-700',
    title: { en: 'Multi-Service Expansion', ta: 'பல சேவைகளாக விரிவு' },
    desc: {
      en: 'The trust strengthened daily annadhanam, dignified last rites, elderly rescue, educational support, emergency medical response, volunteer mobilization, and public documentation.',
      ta: 'தினசரி அன்னதானம், இறுதி மரியாதை, முதியோர் மீட்பு, கல்வி உதவி, அவசர மருத்துவ உதவி, தன்னார்வ இயக்கம் ஆகியவை வலுவடைந்தன.',
    },
  },
  {
    year: '21 Mar 2026',
    node: 'bg-brand-blue',
    badge: 'bg-brand-blue-50 text-brand-blue-700',
    title: { en: 'Ambulance Service Milestone', ta: 'இலவச ஆம்புலன்ஸ் சேவை தொடக்கம்' },
    desc: {
      en: 'A dedicated ambulance was arranged for the trust, strengthening emergency transport support for poor and vulnerable patients.',
      ta: 'ஏழை மற்றும் அவசர நோயாளிகளுக்கான முக்கிய உதவியாக இலவச ஆம்புலன்ஸ் அறிமுகப்படுத்தப்பட்டது.',
    },
  },
  {
    year: 'Jul 2026',
    node: 'bg-brand-violet',
    badge: 'bg-brand-violet-50 text-brand-violet-700',
    title: { en: '500+ Days & Growing', ta: '500+ நாட்கள் தொடர்ச்சி' },
    desc: {
      en: 'By July 2026, the organization had become a multi-service grassroots trust with measurable impact, visible field involvement, public trust, and a growing support network.',
      ta: 'ஜூலை 2026க்குள் நேரடி திடல் பணிகள், வெளிப்படைத்தன்மை, சமூக நம்பிக்கை மற்றும் பலரின் பங்களிப்புடன் வளர்ந்த மனிதநேய முயற்சியாக அமைந்தது.',
    },
  },
];

const desktopSteps = [
  { left: '0%', top: '0rem' },
  { left: '20%', top: '3.25rem' },
  { left: '40%', top: '6.5rem' },
  { left: '60%', top: '9.75rem' },
  { left: '80%', top: '13rem' },
];

function MilestoneCard({ m, lang, index }: { m: Milestone; lang: 'en' | 'ta'; index: number }) {
  return (
    <div
      className={`relative h-full rounded-xl bg-white p-4 text-left shadow-[0_10px_30px_-12px_rgba(16,24,40,0.15)] ring-1 ring-gray-900/[0.04] ${
        m.registration ? 'border border-emerald-200 ring-emerald-100' : 'border border-gray-100'
      }`}
    >
      <div className="mb-3 flex items-center justify-between gap-2">
        <span className={`inline-block rounded-full px-2 py-0.5 font-display text-[9px] font-bold uppercase tracking-wider ${m.badge}`}>
          {m.year}
        </span>
        <span className="font-display text-[11px] font-bold text-gray-300">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>
      <h4 className="font-display text-sm font-bold leading-snug text-gray-900">
        {m.title[lang]}
      </h4>
      <p className="mt-2 text-xs leading-relaxed text-gray-900">
        {m.desc[lang]}
      </p>
      {m.registration && (
        <p className="mt-3 inline-flex rounded-full bg-emerald-50 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-emerald-700">
          {lang === 'en' ? 'Officially Registered' : 'அதிகாரப்பூர்வ பதிவு'}
        </p>
      )}
    </div>
  );
}

export default function JourneyTimeline({ lang }: JourneyTimelineProps) {
  const reduce = useReducedMotion();
  const anim = (delay: number) =>
    reduce
      ? { initial: false as const }
      : {
          initial: { opacity: 0, y: 14 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: '-60px' },
          transition: { duration: 0.35, delay },
        };

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="text-center space-y-2">
        <h2 className="h2-section">
          {lang === 'en' ? 'Our Growth Journey: 2023 to July 2026' : 'எங்கள் வளர்ச்சி பயணம்: 2023 முதல் ஜூலை 2026 வரை'}
        </h2>
        <p className="mx-auto max-w-xl text-sm text-gray-900 sm:text-base">
          {lang === 'en'
            ? 'The trust journey is a gradual and sincere expansion of service rather than a sudden institutional beginning.'
            : 'அறக்கட்டளையின் பயணம் திடீர் தொடக்கம் அல்ல; அது சேவையின் மெதுவான, உண்மையான விரிவாக்கம்.'}
        </p>
      </div>

      <div className="relative mt-8">
        <div className="hidden md:block">
          <div className="relative mx-auto h-[25rem] max-w-7xl">
            {milestones.map((m, i) => (
              <motion.div
                key={m.year}
                className="absolute w-[18%]"
                style={desktopSteps[i]}
                {...anim(i * 0.05)}
              >
                <div className="mb-3 flex items-center gap-2">
                  <span className={`h-3.5 w-3.5 rounded-full ring-4 ring-white shadow ${m.node}`} />
                  <span className="font-display text-[10px] font-bold text-gray-400">
                    Step {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <MilestoneCard m={m} lang={lang} index={i} />
              </motion.div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:hidden">
          {milestones.map((m, i) => (
            <motion.div
              key={m.year}
              className="relative pl-12"
              {...anim(i * 0.05)}
            >
              <span className={`absolute left-[0.8rem] top-5 z-10 h-4 w-4 rounded-full ring-4 ring-white shadow ${m.node}`} />
              <MilestoneCard m={m} lang={lang} index={i} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

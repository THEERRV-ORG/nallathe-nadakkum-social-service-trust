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
    title: { en: 'It Begins on Saturdays', ta: 'சனிக்கிழமை தொடக்கம்' },
    desc: {
      en: 'Advocate N. Kavinraj begins cooking and distributing meals to roadside families every Saturday.',
      ta: 'வழக்கறிஞர் நா. கவின்ராஜ் ஒவ்வொரு சனிக்கிழமையும் சாலையோர மக்களுக்கு சமைத்து வழங்கத் தொடங்கினார்.'
    }
  },
  {
    year: '08 Apr 2025',
    node: 'bg-emerald-600',
    badge: 'bg-emerald-600 text-white',
    registration: true,
    title: { en: 'Official Trust Registration', ta: 'அறக்கட்டளை பதிவு' },
    desc: {
      en: 'Registered as a public charitable trust at the Sub-Registrar Office, Tiruchengode.',
      ta: 'திருச்செங்கோடு சார்பதிவாளர் அலுவலகத்தில் பொது தொண்டு அறக்கட்டளையாக பதிவு செய்யப்பட்டது.'
    }
  },
  {
    year: 'Oct 2025',
    node: 'bg-brand-gold',
    badge: 'bg-brand-gold-100 text-brand-gold-700',
    title: { en: 'Diwali Clothes Distribution', ta: 'தீபாவளி ஆடை விநியோகம்' },
    desc: {
      en: 'New clothes given to around 100 destitute individuals so they could celebrate with dignity.',
      ta: 'சுமார் 100 ஆதரவற்றோருக்கு பண்டிகையை கண்ணியத்துடன் கொண்டாட ஆடைகள் வழங்கப்பட்டது.'
    }
  },
  {
    year: '21 Mar 2026',
    node: 'bg-brand-blue',
    badge: 'bg-brand-blue-50 text-brand-blue-700',
    title: { en: 'Free Ambulance Launched', ta: 'இலவச ஆம்புலன்ஸ் தொடக்கம்' },
    desc: {
      en: 'Trust ambulance flagged off for zero-cost emergency transport to government hospitals.',
      ta: 'அரசு மருத்துவமனைகளுக்கான இலவச அவசர போக்குவரத்துக்கு அறக்கட்டளை ஆம்புலன்ஸ் தொடங்கப்பட்டது.'
    }
  },
  {
    year: 'Jul 2026',
    node: 'bg-brand-violet',
    badge: 'bg-brand-violet-50 text-brand-violet-700',
    title: { en: '400+ Days & Growing', ta: '400+ நாட்கள் தொடர்ச்சி' },
    desc: {
      en: 'Over 400 consecutive days of Annadhanam, with rescues, last rites, and scholarships continuing.',
      ta: '400-க்கும் மேற்பட்ட தொடர் நாட்கள் அன்னதானம், மீட்பு, இறுதிச் சடங்கு, கல்வி உதவி தொடர்கிறது.'
    }
  }
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
          {lang === 'en' ? 'From a Saturday Habit to a Registered Trust' : 'சனிக்கிழமைப் பழக்கம் முதல் அறக்கட்டளை வரை'}
        </h2>
        <p className="mx-auto max-w-xl text-sm text-gray-900 sm:text-base">
          {lang === 'en'
            ? "One person's weekend meal drive now serves thousands every month."
            : 'ஒரு நபரின் வார இறுதி அன்னதானம் இன்று மாதந்தோறும் ஆயிரக்கணக்கானோருக்கு சேவை செய்கிறது.'}
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

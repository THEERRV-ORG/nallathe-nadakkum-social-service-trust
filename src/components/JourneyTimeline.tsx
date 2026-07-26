import { useLayoutEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { FaArrowRightLong, FaArrowDownLong } from 'react-icons/fa6';

interface JourneyTimelineProps {
  lang: 'en' | 'ta';
}

interface Milestone {
  year: string;
  title: { en: string; ta: string };
  desc: { en: string; ta: string };
  node: string;   // node dot colour
  badge: string;  // date-chip colours
  registration?: boolean;
  growing?: boolean;
}

const milestones: Milestone[] = [
  {
    year: '2023',
    node: 'bg-emerald-300',
    badge: 'bg-emerald-50 text-emerald-700',
    title: { en: 'It Begins on Saturdays', ta: 'சனிக்கிழமை தொடக்கம்' },
    desc: {
      en: 'Advocate N. Kavinraj begins cooking and distributing meals to roadside families every Saturday — entirely from personal funds.',
      ta: 'வழக்கறிஞர் நா. கவின்ராஜ் ஒவ்வொரு சனிக்கிழமையும் தனது சொந்தச் செலவில் சாலையோர மக்களுக்கு சமைத்து வழங்கத் தொடங்கினார்.'
    }
  },
  {
    year: '08 Apr 2025',
    node: 'bg-emerald-600',
    badge: 'bg-emerald-600 text-white',
    registration: true,
    title: { en: 'Official Trust Registration', ta: 'அதிகாரப்பூர்வ அறக்கட்டளை பதிவு' },
    desc: {
      en: 'Registered as a public charitable trust (Doc No. 16/2025) at the Sub-Registrar Office, Tiruchengode. Daily Annadhanam launched immediately.',
      ta: 'பொது தொண்டு அறக்கட்டளையாக (ஆவணம் 16/2025) சார்பதிவாளர் அலுவலகம், திருச்செங்கோட்டில் பதிவு செய்யப்பட்டது. தினசரி அன்னதானம் உடனடியாகத் தொடங்கியது.'
    }
  },
  {
    year: 'Oct 2025',
    node: 'bg-brand-gold',
    badge: 'bg-brand-gold-100 text-brand-gold-700',
    title: { en: 'Diwali Clothes Distribution', ta: 'தீபாவளி ஆடை விநியோகம்' },
    desc: {
      en: 'New dhotis, sarees, and shirts given to around 100 destitute individuals so all could celebrate the festival with dignity.',
      ta: 'சுமார் 100 ஆதரவற்றோருக்கு வேட்டி, சேலை, சட்டைகள் வழங்கப்பட்டு அனைவரும் கண்ணியத்துடன் பண்டிகை கொண்டாட வழி செய்யப்பட்டது.'
    }
  },
  {
    year: '21 Mar 2026',
    node: 'bg-brand-blue',
    badge: 'bg-brand-blue-50 text-brand-blue-700',
    title: { en: 'Free Ambulance Launched', ta: 'இலவச ஆம்புலன்ஸ் தொடக்கம்' },
    desc: {
      en: 'Trust ambulance (TN.09.AE.9447) flagged off — zero-cost emergency transport for vulnerable patients to government hospitals.',
      ta: 'அறக்கட்டளை ஆம்புலன்ஸ் (TN.09.AE.9447) அர்ப்பணிக்கப்பட்டது — ஏழை நோயாளிகளுக்கு இலவச அவசர போக்குவரத்து.'
    }
  },
  {
    year: 'Jul 2026',
    node: 'bg-brand-violet',
    badge: 'bg-brand-violet-50 text-brand-violet-700',
    growing: true,
    title: { en: '400+ Days & Growing', ta: '400+ நாட்கள் & தொடர்கிறோம்' },
    desc: {
      en: 'Over 400 consecutive days of Annadhanam — and still growing, with rescues, last rites, and scholarships continuing every week.',
      ta: '400-க்கும் மேற்பட்ட தொடர் நாட்கள் அன்னதானம் — மீட்பு, இறுதிச் சடங்கு, கல்வி உதவி என தொடர்ந்து வளர்ந்து வருகிறது.'
    }
  }
];

function MilestoneCard({ m, lang, arrow = false, fill = false }: { m: Milestone; lang: 'en' | 'ta'; arrow?: boolean; fill?: boolean }) {
  return (
    <div
      className={`w-full rounded-2xl bg-white p-5 sm:p-6 text-left shadow-[0_10px_30px_-12px_rgba(16,24,40,0.15)] ring-1 ring-gray-900/[0.04] ${
        fill ? 'h-full flex flex-col' : ''
      } ${
        m.registration ? 'border border-emerald-200 ring-1 ring-emerald-100 shadow-sm' : 'border border-gray-100'
      }`}
    >
      <div className="flex flex-wrap items-center gap-1.5">
        <span className={`inline-block text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full font-mono ${m.badge}`}>
          {m.year}
        </span>
        {m.registration && (
          <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
            {lang === 'en' ? 'Officially Registered' : 'அதிகாரப்பூர்வ பதிவு'}
          </span>
        )}
      </div>
      <h4 className="font-display text-base sm:text-lg font-bold text-gray-900 mt-2.5 mb-1.5">
        {m.title[lang]}{arrow && m.growing ? ' →' : ''}
      </h4>
      <p className={`text-sm sm:text-base text-gray-900 leading-relaxed ${fill ? 'flex-grow' : ''}`}>{m.desc[lang]}</p>
    </div>
  );
}

/**
 * Desktop journey: a scroll-pinned horizontal timeline. The section is made
 * tall; while it stays pinned to the viewport, vertical page scroll is mapped
 * to horizontal movement of the track. Once the last milestone is reached the
 * page continues to the next section. Falls back to a plain horizontal
 * scroller when the user prefers reduced motion.
 */
function HorizontalJourney({ lang }: JourneyTimelineProps) {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [scrollRange, setScrollRange] = useState(0);

  useLayoutEffect(() => {
    const update = () => {
      if (trackRef.current && viewportRef.current) {
        setScrollRange(
          Math.max(0, trackRef.current.scrollWidth - viewportRef.current.clientWidth),
        );
      }
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [lang]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });
  const x = useTransform(scrollYProgress, [0, 1], [0, -scrollRange]);

  // Heading is rendered inside the pinned area (desktop) so the title and the
  // horizontal cards stay together on a single screen while the section is
  // pinned — no large gap between them.
  const heading = (
    <div className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 text-center space-y-2">
      <h2 className="font-display text-2xl font-bold text-gray-900 sm:text-3xl">
        {lang === 'en' ? 'From a Saturday Habit to a Registered Trust' : 'சனிக்கிழமைப் பழக்கம் முதல் அறக்கட்டளை வரை'}
      </h2>
      <p className="text-sm sm:text-base text-gray-900 max-w-xl mx-auto">
        {lang === 'en'
          ? "One person's weekend meal drive now serves thousands every month."
          : 'ஒரு நபரின் வார இறுதி அன்னதானம் இன்று மாதந்தோறும் ஆயிரக்கணக்கானோருக்கு சேவை செய்கிறது.'}
      </p>
    </div>
  );

  const line = (
    <motion.div
      className="pointer-events-none absolute left-0 right-0 top-[7.5rem] h-[2px] bg-gray-200 origin-left"
      initial={reduce ? false : { scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={reduce ? undefined : { duration: 0.8, ease: 'easeInOut' }}
    />
  );

  const cards = (
    <div ref={trackRef} className="flex gap-8 items-stretch">
      {milestones.map((m, i) => (
        <div key={i} className="relative flex flex-col items-center w-[22rem] shrink-0">
          <div className="w-full flex-1 flex">
            <MilestoneCard m={m} lang={lang} arrow fill />
          </div>
          <div className="h-6 w-px bg-gray-200" />
          <span className={`relative z-10 h-5 w-5 rounded-full ring-4 ring-white shadow ${m.node}`} />
        </div>
      ))}
      <div className="flex flex-col items-center justify-start pt-[6.7rem] text-gray-400 shrink-0">
        <FaArrowRightLong className="h-5 w-5" />
      </div>
    </div>
  );

  // Reduced-motion / no-overflow fallback: plain horizontal scroller.
  if (reduce) {
    return (
      <div className="hidden lg:block space-y-8">
        {heading}
        <div className="overflow-x-auto pb-4 -mx-4 px-4 [scrollbar-width:thin]">
          <div className="relative min-w-max pt-2">
            {line}
            {cards}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={sectionRef}
      className="relative hidden lg:block"
      style={{ height: `calc(100vh + ${scrollRange}px)` }}
    >
      <div className="sticky top-16 flex h-[calc(100vh-4rem)] flex-col justify-center gap-8 overflow-hidden">
        {heading}
        <div ref={viewportRef} className="relative w-full px-4 sm:px-6 lg:px-8">
          <motion.div style={{ x }} className="relative w-max pt-2">
            {line}
            {cards}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default function JourneyTimeline({ lang }: JourneyTimelineProps) {
  const reduce = useReducedMotion();
  const anim = (delay: number, extra: object = {}) =>
    reduce
      ? { initial: false as const }
      : {
          initial: { opacity: 0, ...extra },
          whileInView: { opacity: 1, x: 0, y: 0, scale: 1 },
          viewport: { once: true, margin: '-60px' },
          transition: { duration: 0.4, delay },
        };

  return (
    <section className="space-y-10">
      {/* Outer heading is for mobile/tablet only; desktop renders its heading
          inside the pinned area (see HorizontalJourney) so title + cards align. */}
      <div className="lg:hidden mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center space-y-2">
        <h2 className="font-display text-2xl font-bold text-gray-900 sm:text-3xl">
          {lang === 'en' ? 'From a Saturday Habit to a Registered Trust' : 'சனிக்கிழமைப் பழக்கம் முதல் அறக்கட்டளை வரை'}
        </h2>
        <p className="text-sm sm:text-base text-gray-900 max-w-xl mx-auto">
          {lang === 'en'
            ? "One person's weekend meal drive now serves thousands every month."
            : 'ஒரு நபரின் வார இறுதி அன்னதானம் இன்று மாதந்தோறும் ஆயிரக்கணக்கானோருக்கு சேவை செய்கிறது.'}
        </p>
      </div>

      {/* ── Desktop: scroll-pinned horizontal timeline ── */}
      <div className="mx-auto max-w-7xl">
        <HorizontalJourney lang={lang} />
      </div>

      {/* ── Mobile / tablet: vertical timeline ── */}
      <div className="lg:hidden relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {milestones.map((m, i) => (
          <div key={i} className="relative flex gap-4 pb-8 last:pb-0">
            {/* Node + connecting line */}
            <div className="relative flex flex-col items-center">
              <motion.span
                className={`z-10 h-4 w-4 shrink-0 rounded-full ring-4 ring-white shadow ${m.node}`}
                initial={reduce ? false : { scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={reduce ? undefined : { duration: 0.3, delay: i * 0.1 }}
              />
              {i < milestones.length - 1 && <div className="w-px flex-1 bg-gray-200 mt-1" />}
            </div>

            {/* Content */}
            <motion.div className="flex-1 pb-2" {...anim(i * 0.1, { y: 12 })}>
              <MilestoneCard m={m} lang={lang} arrow />
            </motion.div>
          </div>
        ))}

        {/* Continuing-growth tail */}
        <div className="flex items-center gap-2 pl-1.5 text-gray-400">
          <FaArrowDownLong className="h-3.5 w-3.5" />
          <span className="text-[11px] font-medium">
            {lang === 'en' ? 'and growing' : 'தொடர்கிறது'}
          </span>
        </div>
      </div>
    </section>
  );
}


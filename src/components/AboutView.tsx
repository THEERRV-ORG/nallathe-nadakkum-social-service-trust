import { motion } from 'motion/react';
import { FaAward, FaShieldHalved, FaHandHoldingHeart, FaFileLines, FaMicrophoneLines } from 'react-icons/fa6';
import { commonTranslations } from '../data';
import SocialConnect from './SocialConnect';
import JourneyTimeline from './JourneyTimeline';

interface AboutViewProps {
  lang: 'en' | 'ta';
  setActiveTab: (tab: string) => void;
}

export default function AboutView({ lang, setActiveTab }: AboutViewProps) {
  const values = [
    {
      title: { en: 'Compassion First', ta: 'இரக்கம் முதன்மை' },
      desc: {
        en: 'Treating every individual—whether living on a pavement or unclaimed in death—with the highest level of dignity and respect.',
        ta: 'சாலையோரம் வசிப்பவரோ அல்லது உரிமை கோரப்படாமல் மறைந்தவரோ — அனைவரையும் முழு மனிதக் கண்ணியத்துடனும் மரியாதையுடனும் நடத்துதல்.'
      },
      tile: 'bg-brand-orange-50 text-brand-orange-700',
      icon: <FaHandHoldingHeart className="h-6 w-6" />
    },
    {
      title: { en: 'Absolute Equality', ta: 'முழு சமத்துவம்' },
      desc: {
        en: 'Providing services, food, and rescue operations without any regard to caste, religion, language, gender, or background.',
        ta: 'சாதி, மதம், மொழி, பாலினம் அல்லது சமூகப் பின்னணி என எந்தவொரு பாகுபாடுமின்றி அனைவருக்கும் பாரபட்சமில்லாமல் சேவையாற்றுதல்.'
      },
      tile: 'bg-brand-gold-50 text-brand-gold-700',
      icon: <FaAward className="h-6 w-6" />
    },
    {
      title: { en: 'Financial Transparency', ta: 'நிதி வெளிப்படைத்தன்மை' },
      desc: {
        en: 'Accounting for every single rupee received. Displaying expenses openly, avoiding cash transactions where possible, and keeping ledgers audited.',
        ta: 'பெறப்படும் ஒவ்வொரு ரூபாய்க்கும் முறையான கணக்கு பராமரித்தல். வரவு செலவுகளை வெளிப்படையாக அறிவித்து, ஆண்டுதோறும் தணிக்கை செய்தல்.'
      },
      tile: 'bg-brand-blue-50 text-brand-blue-700',
      icon: <FaShieldHalved className="h-6 w-6" />
    },
    {
      title: { en: 'Legal Integrity', ta: 'சட்டரீதியான நேர்மை' },
      desc: {
        en: 'Running all activities in full compliance with the laws of the State. Coordinating with District Police departments, municipalities, and government health wings.',
        ta: 'அனைத்து செயல்பாடுகளையும் நாட்டின் சட்டங்களுக்கு உட்பட்டு நடத்துதல். காவல்துறை, நகராட்சி மற்றும் அரசு மருத்துவமனைகளுடன் முழுமையாக ஒருங்கிணைந்து பணிபுரிதல்.'
      },
      tile: 'bg-brand-violet-50 text-brand-violet-700',
      icon: <FaFileLines className="h-6 w-6" />
    }
  ];

  const founder = {
    role: commonTranslations.founderTitle[lang],
    name: commonTranslations.founderName[lang],
    image: '/founder.jpeg',
    desc: {
      en: 'N. Kavinraj is a practicing Advocate in Tiruchengode Town with a deep passion for social justice and human rights. Having personally funded and coordinated street food distribution for two years before formal trust registration, he continues to lead rescue operations and police coordinations on the ground.',
      ta: 'வழக்கறிஞர் நா. கவின்ராஜ் அவர்கள் திருச்செங்கோட்டில் வழக்கறிஞராகப் பணியாற்றி வருகிறார். அறக்கட்டளையை முறையாகப் பதிவு செய்வதற்கு முன்பு இரண்டு ஆண்டுகளாகத் தனது சொந்தச் செலவில் ஏழைகளுக்கு உணவு வழங்கியவர். தற்போது களப்பணிகள், மீட்பு நடவடிக்கைகள் மற்றும் போலீஸ் தொடர்புகளை நேரில் நின்று வழிநடத்துகிறார்.'
    }
  };

  return (
    <div className="space-y-20 pb-8">

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="text-center max-w-3xl mx-auto space-y-4 px-4 pt-14 sm:pt-16">
        <p className="text-xs font-bold uppercase tracking-widest text-emerald-700">
          {lang === 'en' ? 'About Nallathe Nadakkum' : 'நல்லதே நடக்கும் பற்றி'}
        </p>
        <h1 className="font-display text-3xl font-extrabold text-gray-900 sm:text-4xl lg:text-5xl">
          {lang === 'en' ? 'About Our Trust' : 'அறக்கட்டளை வரலாறு & ஆளுமை'}
        </h1>
        <p className="text-gray-900 text-base sm:text-lg leading-relaxed sm:leading-[1.65] max-w-2xl mx-auto">
          {lang === 'en'
            ? 'A structured commitment born from daily personal encounters with poverty on the pavements of Tiruchengode Town.'
            : 'திருச்செங்கோடு சாலைகளில் கண்ட எளிய மக்களின் வறுமையைப் போக்க உருவான ஒரு முறையான சேவை அமைப்பு.'}
        </p>
        {/* Credibility meta row */}
        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 pt-2 text-xs font-semibold text-gray-900/70">
          <span>{lang === 'en' ? 'Registered 2025' : '2025-ல் பதிவு'}</span>
          <span className="text-emerald-600/50">•</span>
          <span>{lang === 'en' ? 'Tiruchengode, Tamil Nadu' : 'திருச்செங்கோடு, தமிழ்நாடு'}</span>
          <span className="text-emerald-600/50">•</span>
          <span>{lang === 'en' ? 'Community-led' : 'சமூக அடிப்படையிலானது'}</span>
        </div>
      </section>

      {/* ── Why Nallathe Nadakkum — editorial identity box ────── */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-gray-100 bg-white p-8 sm:p-10 lg:p-14 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

            {/* Logo — left, on a soft radial halo */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="relative flex items-center justify-center">
                <div className="absolute h-56 w-56 sm:h-64 sm:w-64 rounded-full bg-[radial-gradient(circle,_rgba(31,115,74,0.10),_transparent_65%)] blur-xl" />
                <img
                  src="/logo.png"
                  alt="Nallathe Nadakkum Social Service Trust logo"
                  className="relative h-44 w-44 sm:h-60 sm:w-60 object-contain"
                />
              </div>
            </div>

            {/* Content — right */}
            <div className="lg:col-span-8 space-y-5 text-center lg:text-left">
              <p className="text-xs font-bold uppercase tracking-widest text-brand-violet-700">
                {lang === 'en' ? 'Our Name' : 'எங்கள் பெயர்'}
              </p>
              <h2 className="font-display text-2xl font-bold text-gray-900 sm:text-3xl">
                {lang === 'en' ? 'Why Nallathe Nadakkum' : 'ஏன் “நல்லதே நடக்கும்”'}
              </h2>

              {/* Meaning — typographic emphasis, not a nested card */}
              <p className="text-lg sm:text-xl text-gray-900">
                <span className="font-display font-bold">{lang === 'en' ? '“Nallathe Nadakkum”' : '“நல்லதே நடக்கும்”'}</span>
                <span className="text-gray-900/60"> — </span>
                <span className="font-display font-bold text-emerald-700">
                  {lang === 'en' ? 'Good things will happen.' : 'நல்லது நடக்கும்.'}
                </span>
              </p>

              <div className="text-base sm:text-lg text-gray-900 space-y-4 leading-relaxed sm:leading-[1.65] max-w-2xl mx-auto lg:mx-0">
                <p>
                  {lang === 'en'
                    ? 'It is a foundational belief that consistent, small acts of daily compassion compound into real social security for those abandoned by society.'
                    : 'மனிதநேயத்துடன் நாம் செய்யும் ஒவ்வொரு சிறிய செயலும் தொடர்ந்து நடக்கும் போது, அது சமூகத்தால் கைவிடப்பட்ட மனிதர்களின் வாழ்வில் பெரிய நல்ல மாற்றங்களை ஏற்படுத்தும் என்ற நம்பிக்கையில் உருவானது.'}
                </p>
                <p>
                  {lang === 'en'
                    ? 'Our Founder, Advocate N. Kavinraj, grew up witnessing extreme economic hardships in his local vicinity. While practicing law, he initiated an informal weekend food drive, preparing meals in his kitchen and seeking out destitute individuals living on bus stands. Over two years, the scale of requirements grew rapidly, necessitating a structured public trust to legally manage volunteers and donor funds.'
                    : 'எங்கள் நிறுவனர், வழக்கறிஞர் நா. கவின்ராஜ் அவர்கள், தனது வழக்கறிஞர் பணிக்கு இடையே சாலையோரங்களில் ஆதரவின்றித் தவித்த மக்களுக்கு வார இறுதியில் தனது சொந்தச் செலவில் சமைத்து வழங்கத் தொடங்கினார். நாளடைவில் தேவைகள் அதிகரித்ததால், அதனை மேலும் முறைப்படுத்தி, பலருக்கும் உதவிட 08.04.2025 அன்று அறக்கட்டளையாக நிறுவினார்.'}
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Our Journey — chronological timeline ── */}
      <JourneyTimeline lang={lang} />

      {/* ── Meet Our Founder ─────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <p className="text-xs font-bold uppercase tracking-widest text-brand-blue-700">
            {lang === 'en' ? 'Leadership' : 'தலைமை'}
          </p>
          <h2 className="font-display text-2xl font-bold text-gray-900 sm:text-3xl">
            {lang === 'en' ? 'Meet Our Founder' : 'எங்கள் நிறுவனரை சந்திக்கவும்'}
          </h2>
        </div>

        {/* Editorial split: image occupies the left column across both rows;
            the right column carries the heading above and the story below.
            On mobile it stacks role → name → image → description → CTA. */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-14 gap-y-6 items-start">
          {/* Heading — role + name (mobile: first; desktop: right column, top) */}
          <div className="order-1 lg:order-2 lg:col-span-7 lg:col-start-6 space-y-3">
            <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-brand-blue-700 bg-brand-blue-50 px-3 py-1 rounded-full">
              {founder.role}
            </span>
            <h3 className="font-display text-3xl sm:text-4xl font-bold leading-tight text-gray-900">
              {founder.name}
            </h3>
          </div>

          {/* Photo — larger editorial presence, natural aspect ratio */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="order-2 lg:order-1 lg:col-span-5 lg:col-start-1 lg:row-span-2 lg:row-start-1"
          >
            <img
              src={founder.image}
              alt={founder.name}
              className="w-full h-auto object-cover object-top rounded-3xl shadow-md border border-gray-100"
            />
          </motion.div>

          {/* Story + CTA (mobile: after image; desktop: right column, below heading) */}
          <div className="order-3 lg:col-span-7 lg:col-start-6 space-y-5">
            <p className="text-base sm:text-lg text-gray-900 leading-relaxed sm:leading-[1.65]">
              {founder.desc[lang]}
            </p>
            <blockquote className="border-l-4 border-emerald-500 pl-4 text-base sm:text-lg italic text-gray-900/90 leading-relaxed">
              {lang === 'en'
                ? '“We seek those who have nobody left, and we stand beside them in life, in sickness, and in death.”'
                : '“யாருமற்ற நிலைக்குத் தள்ளப்பட்ட மக்களைக் கண்டறிந்து, அவர்கள் வாழ்விலும், மரணத்திலும் நாங்கள் உடனிருக்கிறோம்.”'}
            </blockquote>

            {/* Invite as Speaker CTA — concludes the section */}
            <div className="pt-2">
              <button
                onClick={() => setActiveTab('speaker')}
                className="inline-flex items-center gap-2 rounded-full bg-brand-blue px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-brand-blue-700 transition-colors cursor-pointer"
              >
                <FaMicrophoneLines className="h-4 w-4" />
                {lang === 'en' ? 'Invite the Founder as Speaker' : 'நிறுவனரை சொற்பொழிவாளராக அழைக்க'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Trust Credentials ────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <p className="text-xs font-bold uppercase tracking-widest text-brand-blue-700">
            {lang === 'en' ? 'Verified & Registered' : 'சரிபார்க்கப்பட்டது & பதிவு'}
          </p>
          <h2 className="font-display text-2xl font-bold text-gray-900 sm:text-3xl">
            {lang === 'en' ? 'Trust Credentials' : 'அறக்கட்டளை சான்றுகள்'}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:items-stretch">
          {/* Credential items — stack on lg so the three together match the right box height */}
          <div className="lg:col-span-5 flex flex-col gap-4 sm:grid sm:grid-cols-3 sm:gap-4 lg:flex lg:flex-col">
            {[
              { label: { en: 'Trust Deed', ta: 'அறக்கட்டளை ஆவணம்' }, value: 'Doc No. 16/2025' },
              { label: { en: 'Registered', ta: 'பதிவு தேதி' }, value: '08.04.2025' },
              { label: { en: 'Registry Office', ta: 'பதிவு அலுவலகம்' }, value: 'Tiruchengode' },
            ].map((item, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-gray-100 bg-white p-5 shadow-xs border-l-4 border-l-brand-blue flex flex-col justify-center lg:flex-1"
              >
                <p className="text-[11px] font-bold uppercase tracking-wider text-brand-blue-700">
                  {item.label[lang]}
                </p>
                <p className="font-display text-lg font-bold text-gray-900 mt-1 font-mono">
                  {item.value}
                </p>
              </div>
            ))}
          </div>

          {/* Legal explanation */}
          <div className="lg:col-span-7 rounded-2xl border border-brand-blue-100 bg-brand-blue-50/50 p-6 sm:p-8">
            <h3 className="font-display text-lg font-bold text-gray-900 mb-3">
              {lang === 'en' ? 'Legal Framework' : 'சட்டக் கட்டமைப்பு'}
            </h3>
            <p className="text-base sm:text-lg text-gray-900 leading-relaxed sm:leading-[1.65]">
              {commonTranslations.deedDetails[lang]}
            </p>
          </div>
        </div>
      </section>

      {/* ── Ethical Guiding Values ───────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <p className="text-xs font-bold uppercase tracking-widest text-brand-gold-700">
            {lang === 'en' ? 'What Guides Us' : 'எங்களை வழிநடத்துபவை'}
          </p>
          <h2 className="font-display text-2xl font-bold text-gray-900 sm:text-3xl">
            {lang === 'en' ? 'Our Ethical Guiding Values' : 'நமது தார்மீக வழிகாட்டி நெறிமுறைகள்'}
          </h2>
          <p className="text-sm sm:text-base text-gray-900/70 max-w-xl mx-auto">
            {lang === 'en' ? 'These four principles guide our daily street programs and financial stewardship.' : 'இந்த நான்கு நெறிமுறைகள் எங்கள் அன்றாடக் களப்பணி மற்றும் நிதி நிர்வாகத்தை வழிநடத்துகின்றன.'}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((val, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm hover:border-emerald-100 hover:shadow-md transition-all flex flex-col space-y-3"
            >
              <div className="flex items-center gap-3">
                <div className={`p-2.5 rounded-xl w-fit shrink-0 ${val.tile}`}>
                  {val.icon}
                </div>
                <h3 className="font-display text-base font-bold text-gray-900">
                  {val.title[lang]}
                </h3>
              </div>
              <p className="text-sm sm:text-base text-gray-900 leading-relaxed">
                {val.desc[lang]}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Follow Our Daily Work (end of story) ─────────────── */}
      <SocialConnect lang={lang} />

    </div>
  );
}

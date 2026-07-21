import { motion } from 'motion/react';
import { FaAward, FaShieldHalved, FaHandHoldingHeart, FaFileLines, FaCircleCheck } from 'react-icons/fa6';
import { commonTranslations } from '../data';

interface AboutViewProps {
  lang: 'en' | 'ta';
}

export default function AboutView({ lang }: AboutViewProps) {
  const values = [
    {
      title: { en: 'Compassion First', ta: 'இரக்கம் முதன்மை' },
      desc: { 
        en: 'Treating every individual—whether living on a pavement or unclaimed in death—with the highest level of dignity and respect.', 
        ta: 'சாலையோரம் வசிப்பவரோ அல்லது உரிமை கோரப்படாமல் மறைந்தவரோ — அனைவரையும் முழு மனிதக் கண்ணியத்துடனும் மரியாதையுடனும் நடத்துதல்.' 
      },
      icon: <FaHandHoldingHeart className="h-6 w-6 text-emerald-600" />
    },
    {
      title: { en: 'Absolute Equality', ta: 'முழு சமத்துவம்' },
      desc: { 
        en: 'Providing services, food, and rescue operations without any regard to caste, religion, language, gender, or background.', 
        ta: 'சாதி, மதம், மொழி, பாலினம் அல்லது சமூகப் பின்னணி என எந்தவொரு பாகுபாடுமின்றி அனைவருக்கும் பாரபட்சமில்லாமல் சேவையாற்றுதல்.' 
      },
      icon: <FaAward className="h-6 w-6 text-emerald-600" />
    },
    {
      title: { en: 'Financial Transparency', ta: 'நிதி வெளிப்படைத்தன்மை' },
      desc: { 
        en: 'Accounting for every single rupee received. Displaying expenses openly, avoiding cash transactions where possible, and keeping ledgers audited.', 
        ta: 'பெறப்படும் ஒவ்வொரு ரூபாய்க்கும் முறையான கணக்கு பராமரித்தல். வரவு செலவுகளை வெளிப்படையாக அறிவித்து, ஆண்டுதோறும் தணிக்கை செய்தல்.' 
      },
      icon: <FaShieldHalved className="h-6 w-6 text-emerald-600" />
    },
    {
      title: { en: 'Legal Integrity', ta: 'சட்டரீதியான நேர்மை' },
      desc: { 
        en: 'Running all activities in full compliance with the laws of the State. Coordinating with District Police departments, municipalities, and government health wings.', 
        ta: 'அனைத்து செயல்பாடுகளையும் நாட்டின் சட்டங்களுக்கு உட்பட்டு நடத்துதல். காவல்துறை, நகராட்சி மற்றும் அரசு மருத்துவமனைகளுடன் முழுமையாக ஒருங்கிணைந்து பணிபுரிதல்.' 
      },
      icon: <FaFileLines className="h-6 w-6 text-emerald-600" />
    }
  ];

  const trustees = [
    {
      role: commonTranslations.founderTitle[lang],
      name: commonTranslations.founderName[lang],
      initials: 'NK',
      image: '/founder.jpeg',
      desc: {
        en: 'N. Kavinraj is a practicing Advocate in Tiruchengode Town with a deep passion for social justice and human rights. Having personally funded and coordinated street food distribution for two years before formal trust registration, he continues to lead rescue operations and police coordinations on the ground.',
        ta: 'வழக்கறிஞர் நா. கவின்ராஜ் அவர்கள் திருச்செங்கோட்டில் வழக்கறிஞராகப் பணியாற்றி வருகிறார். அறக்கட்டளையை முறையாகப் பதிவு செய்வதற்கு முன்பு இரண்டு ஆண்டுகளாகத் தனது சொந்தச் செலவில் ஏழைகளுக்கு உணவு வழங்கியவர். தற்போது களப்பணிகள், மீட்பு நடவடிக்கைகள் மற்றும் போலீஸ் தொடர்புகளை நேரில் நின்று வழிநடத்துகிறார்.'
      }
    },
    {
      role: commonTranslations.secretaryTitle[lang],
      name: commonTranslations.secretaryName[lang],
      initials: 'SK',
      image: null,
      desc: {
        en: 'S. Kolarisingar oversees administrative operations, legal documents, and ensures the trust matches up to standard protocols for non-governmental organizations. He handles coordinate linkages with other shelter structures.',
        ta: 'S. கொளரிசிங்கர் அவர்கள் அறக்கட்டளையின் நிர்வாக செயல்பாடுகள், ஆவணங்கள் மற்றும் பிற தொண்டு நிறுவனங்களுடனான தொடர்புகளை ஒருங்கிணைக்கும் பணிகளை மேற்கொள்கிறார்.'
      }
    },
    {
      role: commonTranslations.treasurerTitle[lang],
      name: commonTranslations.treasurerName[lang],
      initials: 'NK',
      image: null,
      desc: {
        en: 'Mrs. N. Kogila maintains complete track of donations, bills, expense approvals, and accounts. Jointly operates the trust bank account alongside the Chairman to ensure total control of public charity funds.',
        ta: 'திருமதி. N. கோகிலா அவர்கள் அறக்கட்டளையின் வரவு செலவுகள், பில்கள் மற்றும் தணிக்கைக் கணக்குகளைப் பராமரிக்கிறார். தலைவருடன் இணைந்து கூட்டு வங்கிக் கணக்கை இயக்கி நிதி ஆளுமையை உறுதி செய்கிறார்.'
      }
    }
  ];

  return (
    <div className="space-y-16 py-8">
      
      {/* Title Header */}
      <section className="text-center max-w-3xl mx-auto space-y-4 px-4">
        <h1 className="font-display text-3xl font-extrabold text-gray-900 sm:text-4xl">
          {lang === 'en' ? 'About Our Trust' : 'அறக்கட்டளை வரலாறு & ஆளுமை'}
        </h1>
        <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
          {lang === 'en' 
            ? 'A structured commitment born from daily personal encounters with poverty on the pavements of Tiruchengode Town.' 
            : 'திருச்செங்கோடு சாலைகளில் கண்ட எளிய மக்களின் வறுமையைப் போக்க உருவான ஒரு முறையான சேவை அமைப்பு.'}
        </p>
      </section>

      {/* Origin Story */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
          
          <div className="space-y-6">
            <h2 className="font-display text-2xl font-bold text-gray-900">
              {lang === 'en' ? 'Our Origin & Name' : 'தோற்றம் மற்றும் பெயர்க்காரணம்'}
            </h2>
            <div className="text-sm sm:text-base text-gray-600 space-y-4 leading-relaxed text-justify">
              <p>
                {lang === 'en'
                  ? 'The phrase "Nallathe Nadakkum" translates to "Good things will happen." It is a foundational belief that consistent, small acts of daily compassion compound into real social security for those abandoned by society.'
                  : '"நல்லதே நடக்கும்" என்பது ஒரு நேர்மறை நம்பிக்கை. மனிதநேயத்துடன் நாம் செய்யும் ஒவ்வொரு சிறிய செயலும் தொடர்ந்து நடக்கும் போது, அது சமூகத்தால் கைவிடப்பட்ட மனிதர்களின் வாழ்வில் பெரிய நல்ல மாற்றங்களை ஏற்படுத்தும் என்ற நம்பிக்கையில் உருவானது.'}
              </p>
              <p>
                {lang === 'en'
                  ? 'Our Founder, Advocate N. Kavinraj, grew up witnessing extreme economic hardships in his local vicinity. While practicing law, he initiated an informal weekend food drive, preparing meals in his kitchen and seeking out destitute individuals living on bus stands. Over two years, the scale of requirements grew rapidly, necessitating a structured public trust to legally manage volunteers and donor funds.'
                  : 'எங்கள் நிறுவனர், வழக்கறிஞர் நா. கவின்ராஜ் அவர்கள், தனது வழக்கறிஞர் பணிக்கு இடையே சாலையோரங்களில் ஆதரவின்றித் தவித்த மக்களுக்கு வார இறுதியில் தனது சொந்தச் செலவில் சமைத்து வழங்கத் தொடங்கினார். நாளடைவில் தேவைகள் அதிகரித்ததால், அதனை மேலும் முறைப்படுத்தி, பலருக்கும் உதவிட 08.04.2025 அன்று அறக்கட்டளையாக நிறுவினார்.'}
              </p>
            </div>
          </div>

          <div className="relative rounded-3xl overflow-hidden shadow-lg bg-gray-100 border border-gray-100">
            <img
              src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=800&auto=format&fit=crop"
              alt="Community group helping and holding hands"
              className="h-[300px] sm:h-[350px] w-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent flex items-end p-6 text-white">
              <p className="text-xs sm:text-sm font-medium italic">
                {lang === 'en' 
                  ? '"We seek those who have nobody left, and we stand beside them in life, in sickness, and in death."' 
                  : '"யாருமற்ற நிலைக்குத் தள்ளப்பட்ட மக்களைக் கண்டறிந்து, அவர்கள் வாழ்விலும், மரணத்திலும் நாங்கள் உடனிருக்கிறோம்."'}
              </p>
            </div>
          </div>

        </div>
      </section>
upd
      {/* Journey Milestones Timeline */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          <div className="text-center space-y-1">
            <h2 className="font-display text-2xl font-bold text-gray-900">
              {lang === 'en' ? 'Our Journey' : 'எங்கள் பயணம்'}
            </h2>
            <p className="text-xs text-gray-500">
              {lang === 'en' ? 'From one person\'s Saturday habit to a registered trust serving thousands.' : 'ஒரு நபரின் சனிக்கிழமை பழக்கம் இன்று ஆயிரங்களுக்கு சேவை செய்யும் அறக்கட்டளையாக மாறியது.'}
            </p>
          </div>

          <div className="relative">
            {/* Connecting line */}
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-emerald-100 hidden sm:block sm:left-1/2 sm:-translate-x-px"></div>

            <div className="space-y-6">
              {[
                {
                  year: '2023',
                  dot: 'bg-gray-300',
                  title: { en: 'It Begins on Saturdays', ta: 'சனிக்கிழமை தொடக்கம்' },
                  desc: {
                    en: 'Advocate N. Kavinraj begins cooking and distributing meals to roadside families every Saturday, entirely from personal funds — two years before any formal structure.',
                    ta: 'வழக்கறிஞர் நா. கவின்ராஜ் தனது சொந்தச் செலவில் ஒவ்வொரு சனிக்கிழமையும் சாலையோர மக்களுக்கு சமைத்து வழங்கத் தொடங்கினார் — அறக்கட்டளை பதிவிற்கு இரண்டு ஆண்டுகள் முன்பே.'
                  }
                },
                {
                  year: '08 Apr 2025',
                  dot: 'bg-emerald-500',
                  title: { en: 'Official Trust Registration', ta: 'அதிகாரப்பூர்வ அறக்கட்டளை பதிவு' },
                  desc: {
                    en: 'Nallathe Nadakkum Samuga Sevai Arakkattalai formally registered as a public charitable trust (Doc No. 16/2025) at the Sub-Registrar Office, Tiruchengode. Daily Annadhanam launched immediately.',
                    ta: 'நல்லதே நடக்கும் சமூக சேவை அறக்கட்டளை சார்பதிவாளர் அலுவலகம், திருச்செங்கோட்டில் பொது தொண்டு அறக்கட்டளையாக முறையாகப் பதிவு செய்யப்பட்டது (ஆவணம் 16/2025). தினசரி அன்னதானம் உடனடியாகத் தொடங்கியது.'
                  }
                },
                {
                  year: 'Oct 2025',
                  dot: 'bg-amber-400',
                  title: { en: 'Diwali Clothes Distribution', ta: 'தீபாவளி ஆடை விநியோகம்' },
                  desc: {
                    en: 'The trust distributed new dhotis, sarees, and shirts to approximately 100 destitute individuals and roadside families — ensuring all could celebrate the festival of lights with dignity.',
                    ta: 'சுமார் 100 ஆதரவற்றோர் மற்றும் சாலையோரக் குடும்பங்களுக்கு வேட்டி, சேலை மற்றும் சட்டைகளை வழங்கியது. அனைவரும் கண்ணியத்துடன் தீபாவளியைக் கொண்டாட வாய்ப்பு கிட்டியது.'
                  }
                },
                {
                  year: '21 Mar 2026',
                  dot: 'bg-blue-500',
                  title: { en: 'Free Ambulance Launched', ta: 'இலவச ஆம்புலன்ஸ் சேவை தொடக்கம்' },
                  desc: {
                    en: 'Trust ambulance (TN.09.AE.9447) formally flagged off — providing zero-cost emergency transport to vulnerable patients transferring to government hospitals.',
                    ta: 'அறக்கட்டளை ஆம்புலன்ஸ் (TN.09.AE.9447) அர்ப்பணிக்கப்பட்டது — ஏழை நோயாளிகளை அரசு மருத்துவமனைக்கு கட்டணமின்றி கொண்டு செல்லும் சேவை தொடங்கியது.'
                  }
                },
                {
                  year: 'Jul 2026',
                  dot: 'bg-emerald-600',
                  title: { en: '400+ Days & Growing', ta: '400+ நாட்கள் & தொடர்கிறோம்' },
                  desc: {
                    en: '400+ consecutive days of Annadhanam serving 3,000–5,000 people monthly. 30+ unclaimed burials, 10 family funerals conducted, 5 elders rescued, 7 students actively sponsored, accident victims supported through fundraising.',
                    ta: '400-க்கும் மேற்பட்ட தொடர் நாட்களாக மாதந்தோறும் 3,000–5,000 பேருக்கு அன்னதானம். 30-க்கும் மேற்பட்ட நல்லடக்கங்கள், 10 உறவாய் நடத்திய இறுதிச் சடங்குகள், 5 முதியோர் மீட்பு, 7 மாணவர் கல்வி ஆதரவு, விபத்து பாதிக்கப்பட்டோருக்கு நிதி திரட்டல்.'
                  }
                }
              ].map((milestone, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.07 }}
                  className="relative flex gap-4 sm:gap-6"
                >
                  {/* Dot + year */}
                  <div className="flex flex-col items-center gap-1 shrink-0 w-24 sm:w-28">
                    <div className={`h-3 w-3 rounded-full ring-2 ring-white shadow ${milestone.dot} mt-1`} />
                    <span className="text-[10px] font-bold text-gray-500 text-center leading-tight">{milestone.year}</span>
                  </div>
                  {/* Content */}
                  <div className="pb-6 flex-1">
                    <h4 className="font-display text-sm font-bold text-gray-900 mb-1">{milestone.title[lang]}</h4>
                    <p className="text-xs text-gray-600 leading-relaxed text-justify">{milestone.desc[lang]}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trust Registration Legalities Info */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-dashed border-emerald-300 bg-emerald-50/50 p-6 sm:p-10">
          <div className="flex flex-col md:flex-row gap-6 md:items-center">
            <div className="h-12 w-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0 text-xl font-bold">
              📜
            </div>
            <div className="space-y-2 flex-grow">
              <h3 className="font-display text-lg font-bold text-gray-900">
                {lang === 'en' ? 'Official Legal Framework' : 'அதிகாரப்பூர்வ சட்டக் கட்டமைப்பு'}
              </h3>
              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed text-justify">
                {commonTranslations.deedDetails[lang]}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trustees Directory */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="font-display text-2xl font-bold text-gray-900">
            {commonTranslations.trusteeTitle[lang]}
          </h2>
          <p className="text-xs sm:text-sm text-gray-500">
            {lang === 'en' ? 'The legally registered governing body of our charitable trust.' : 'அறக்கட்டளையின் சட்டப்பூர்வ நிர்வாகப் பொறுப்பாளர்கள்.'}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {trustees.map((tr, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="rounded-2xl border border-gray-100 bg-white shadow-sm flex flex-col hover:shadow-md transition-all overflow-hidden"
            >
              {/* Full-width photo / placeholder */}
              {tr.image ? (
                <img
                  src={tr.image}
                  alt={tr.name}
                  className="w-full h-64 object-cover object-top"
                />
              ) : (
                <div className="w-full h-64 bg-gradient-to-br from-emerald-50 to-emerald-100 flex flex-col items-center justify-center gap-2">
                  <span className="font-display text-5xl font-bold text-emerald-300 select-none">
                    {tr.initials}
                  </span>
                  <span className="text-[10px] font-semibold text-emerald-400 tracking-widest uppercase">
                    {lang === 'en' ? 'Photo coming soon' : 'படம் விரைவில்'}
                  </span>
                </div>
              )}

              {/* Card content */}
              <div className="p-5 flex flex-col space-y-3 flex-grow">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
                    {tr.role}
                  </span>
                  <h3 className="font-display text-base font-bold text-gray-900 pt-2">{tr.name}</h3>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed flex-grow text-justify">
                  {tr.desc[lang]}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Core Values Bento Grid */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="font-display text-2xl font-bold text-gray-900">
            {lang === 'en' ? 'Our Ethical Guiding Values' : 'நமது தார்மீக வழிகாட்டி நெறிமுறைகள்'}
          </h2>
          <p className="text-xs sm:text-sm text-gray-500">
            {lang === 'en' ? 'These five codes direct our daily street programs and financial stewardship.' : 'இவை ஒவ்வொன்றும் எங்கள் அன்றாடக் களப்பணி மற்றும் நிதி நிர்வாகத்தை வழிநடத்துகின்றன.'}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((val, idx) => (
            <div 
              key={idx}
              className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm hover:border-emerald-100 hover:shadow-sm transition-all flex flex-col space-y-3"
            >
              <div className="p-2.5 bg-emerald-50 text-emerald-700 rounded-xl w-fit">
                {val.icon}
              </div>
              <h3 className="font-display text-sm font-bold text-gray-900">
                {val.title[lang]}
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed text-justify">
                {val.desc[lang]}
              </p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}

import {
  FaShieldHalved, FaLock,
  FaLocationDot, FaMap, FaArrowUpRightFromSquare
} from 'react-icons/fa6';

interface TransparencyViewProps {
  lang: 'en' | 'ta';
}

export default function TransparencyView({ lang }: TransparencyViewProps) {
  const auditLogs = [
    { year: 'FY 2025–26', status: { en: 'Audit In Progress', ta: 'தணிக்கை நடைபெறுகிறது' }, auditor: { en: 'Tiruchengode Local Auditor Board', ta: 'திருச்செங்கோடு தணிக்கை வாரியம்' } },
    { year: 'Trust Deed (Deed No. 16/2025)', status: { en: 'Legally Active & Certified', ta: 'பதிவு செய்யப்பட்டது - ஆவணம் 16/2025' }, auditor: { en: 'Sub-Registrar, Tiruchengode', ta: 'சார்பதிவாளர் அலுவலகம், திருச்செங்கோடு' } },
  ];

  return (
    <div className="space-y-12 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Title Header */}
      <section className="text-center max-w-3xl mx-auto space-y-4">
        <h1 className="h1-page">
          {lang === 'en' ? 'Built on Trust, Guided by Responsibility' : 'வெளிப்படைத் தன்மையும் சட்ட அடிப்படையும்'}
        </h1>
        <p className="text-gray-900 text-base sm:text-lg leading-relaxed sm:leading-[1.65]">
          {lang === 'en' ? (
            'Our commitment to lawful operation, ethical service, financial accountability, and public trust.'
          ) : (
            <>
              <strong>நம்பிக்கையைப் பெறுவதற்கும் காக்குவதற்கும் நாம் பொறுப்புடன் செயல்படுகிறோம்</strong>
              <br />
              சேவையில் கருணை, நிர்வாகத்தில் பொறுப்பு, நிதியில் வெளிப்படைத் தன்மை—இதுவே எங்கள் அடிப்படை.
            </>
          )}
        </p>
      </section>

      {/* Trust Legal Profile — editorial list (one panel, not three cards) */}
      <section className="rounded-2xl border border-gray-100 bg-white divide-y divide-gray-100 shadow-[0_10px_30px_-12px_rgba(16,24,40,0.15)] ring-1 ring-gray-900/[0.04] overflow-hidden">
        {[
          {
            icon: <FaShieldHalved className="h-5 w-5" />,
            tile: 'bg-brand-blue-50 text-brand-blue-700',
            title: { en: 'Irrevocable Public Trust', ta: 'மாற்ற முடியாத பொது அறக்கட்டளை' },
            body: {
              en: (
                <>
                  The trust operates as a <strong>public charitable trust</strong> established for social welfare purposes and governed through a <strong>board of trustees</strong>. Its charitable intent is public in nature and service-oriented in purpose.
                </>
              ),
              ta: 'எங்களது அறக்கட்டளை ஒரு மாற்ற முடியாத பொது தொண்டு அமைப்பாகும். இதன் சொத்துக்கள் அல்லது நிதி ஒருபோதும் தனிநபர் இலாபத்திற்காகப் பயன்படுத்தப்படாது. ஒருவேளை அறக்கட்டளை கலைக்கப்பட்டால், அதன் சொத்துக்கள் அனைத்தும் மற்றொரு பொது தொண்டு நிறுவனத்திடமே ஒப்படைக்கப்படும்.',
            }
          },
          {
            icon: <FaLock className="h-5 w-5" />,
            tile: 'bg-brand-violet-50 text-brand-violet-700',
            title: { en: 'Dual Signatory Oversight', ta: 'இரட்டை கையொப்பக் கட்டுப்பாடு' },
            body: {
              en: 'To strengthen financial responsibility, key financial transactions are subject to joint signatory oversight by the Chairman and Treasurer. This supports disciplined use of funds and reduces the risk of unilateral financial handling.',
              ta: 'அறக்கட்டளையின் அனைத்து நிதி பரிவர்த்தனைகளும் தலைவர் (வழக்கறிஞர் நா. கவின்ராஜ்) மற்றும் பொருளாளர் (திருமதி. N. கோகிலா) ஆகியோரின் கூட்டு கையொப்பத்துடன் மட்டுமே நிகழும். அறங்காவலர் குழு ஒப்புதல் இன்றி தனிநபர் யாரும் பணத்தை எடுக்கவோ செலுத்தவோ முடியாது.',
            }
          },
        ].map((item, idx) => (
          <div key={idx} className="flex flex-col sm:flex-row gap-4 sm:gap-8 p-6 sm:p-8">
            <div className="flex items-center gap-4 sm:w-1/3 shrink-0">
              <div className={`p-3 rounded-xl w-fit shrink-0 ${item.tile}`}>
                {item.icon}
              </div>
              <h3 className="font-display text-base font-bold text-gray-900 leading-snug">
                {item.title[lang]}
              </h3>
            </div>
            <div className="sm:flex-1 space-y-3">
              <p className="text-sm sm:text-base text-gray-900 leading-relaxed sm:leading-[1.65] [&_strong]:font-bold">
                {item.body[lang]}
              </p>
            </div>
          </div>
        ))}
      </section>

      {/* Trust Deed & Auditor Listings */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

        {/* Left: Registrations Table */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-gray-100 p-6 shadow-[0_10px_30px_-12px_rgba(16,24,40,0.15)] ring-1 ring-gray-900/[0.04] space-y-4">
          <h3 className="font-display text-base font-bold text-gray-900">
            {lang === 'en' ? 'Legal Framework & Statutory Registry' : 'அறக்கட்டளை பதிவு மற்றும் சட்ட விபரங்கள்'}
          </h3>
          <div className="divide-y divide-gray-100 text-xs sm:text-sm">
            <div className="py-3 flex justify-between">
              <span className="font-semibold text-gray-900">{lang === 'en' ? 'Registered Trust Name' : 'பதிவு செய்யப்பட்ட பெயர்'}</span>
              <span className="font-medium text-gray-900 text-right">நல்லதே நடக்கும் சமூக சேவை அறக்கட்டளை</span>
            </div>
            <div className="py-3 flex justify-between">
              <span className="font-semibold text-gray-900">{lang === 'en' ? 'Registration Deed Number' : 'அறக்கட்டளை பதிவு எண்'}</span>
              <span className="font-display font-semibold text-gray-900 text-right">
                {lang === 'en' ? 'Doc No. 16/2025' : 'ஆவண எண். 16/2025'}
              </span>
            </div>
            <div className="py-3 flex justify-between">
              <span className="font-semibold text-gray-900">{lang === 'en' ? 'Sub-Registrar Office' : 'சார்பதிவாளர் அலுவலகம்'}</span>
              <span className="font-medium text-gray-900 text-right">
                {lang === 'en' ? 'Tiruchengode Town & Taluk, Namakkal' : 'திருச்செங்கோடு நகரம் & வட்டம், நாமக்கல்'}
              </span>
            </div>
            <div className="py-3 flex justify-between">
              <span className="font-semibold text-gray-900">{lang === 'en' ? 'Date of Registry' : 'பதிவு செய்யப்பட்ட தேதி'}</span>
              <span className="font-display font-semibold text-gray-900 text-right">08.04.2025</span>
            </div>
            <div className="py-3 flex justify-between">
              <span className="font-semibold text-gray-900">{lang === 'en' ? 'Drafting Advocate' : 'ஆவணத்தை வடிவமைத்த வழக்கறிஞர்'}</span>
              <span className="font-medium text-gray-900 text-right">
                {lang === 'en' ? 'Advocate Sathiskumar, Tiruchengode' : 'வழக்கறிஞர் சதீஷ்குமார், திருச்செங்கோடு'}
              </span>
            </div>
            <div className="py-3 flex justify-between">
              <span className="font-semibold text-gray-900">{lang === 'en' ? '12A & 80G Tax Exemption Status' : '12A மற்றும் 80G வரி விலக்கு நிலை'}</span>
              <span className="font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded text-[10px] uppercase text-right">
                {lang === 'en' ? 'Pending (In Process)' : 'நிலுவையில் உள்ளது'}
              </span>
            </div>
          </div>
        </div>

        {/* Right: Audited Ledger Books */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-gray-100 p-6 shadow-[0_10px_30px_-12px_rgba(16,24,40,0.15)] ring-1 ring-gray-900/[0.04] space-y-4">
          <h3 className="font-display text-base font-bold text-gray-900">
            {lang === 'en' ? 'Donation Transparency & Accountability' : 'தணிக்கை மற்றும் தாக்கல் விபரங்கள்'}
          </h3>
          <p className="text-base text-gray-900 leading-relaxed">
            {lang === 'en'
              ? 'The trust values every contribution and believes donors deserve clarity on how support is used. Funds are directed toward genuine service-related needs such as food support, ambulance operations, last rites assistance, educational aid, elderly rescue, and humanitarian relief activities within the trust’s scope.'
              : 'அறக்கட்டளையின் கணக்கு வழக்குகள் தகுதிவாய்ந்த தணிக்கையாளரால் தணிக்கை செய்யப்பட்டு ஆண்டுதோறும் தாக்கல் செய்யப்பட வேண்டும் என்பது விதியாகும்.'}
          </p>

          <div className="space-y-3">
            {auditLogs.map((log, idx) => (
              <div key={idx} className="p-4 border border-gray-100 rounded-xl bg-gray-50/50 flex items-start justify-between">
                <div className="space-y-0.5">
                  <h4 className="text-xs font-bold text-gray-900">{log.year}</h4>
                  <p className="text-[10px] text-gray-900">{log.auditor[lang]}</p>
                </div>
                <span className="text-[9px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full">
                  {log.status[lang]}
                </span>
              </div>
            ))}
          </div>
        </div>

      </section>

      {/* Official Registered Office Location & Map Section hidden by request; keep for future restoration. */}
      {false && (
      <section className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 shadow-[0_10px_30px_-12px_rgba(16,24,40,0.15)] ring-1 ring-gray-900/[0.04] space-y-6 animate-fade-in">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-gray-100 pb-5">
          <div className="space-y-1">
            <span className="section-eyebrow text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full w-fit block">
              {lang === 'en' ? 'Physical Presence' : 'நேரடி இருப்பிடம்'}
            </span>
            <h2 className="h2-section">
              {lang === 'en' ? 'Official Registered Office & Location Pin' : 'அதிகாரப்பூர்வ பதிவு அலுவலகம் & வரைபடம்'}
            </h2>
            <p className="text-sm sm:text-base text-gray-900 leading-relaxed sm:leading-[1.65] max-w-2xl">
              {lang === 'en' 
                ? 'We operate in full transparency with a physical office in Tiruchengode. Click on the map below to immediately open GPS coordinates in Google Maps.' 
                : 'நாங்கள் திருச்செங்கோட்டில் முறையான அலுவலகத்துடன் செயல்படுகிறோம். எங்களது இருப்பிடத்தை வரைபடம் மூலம் துல்லியமாக அறிந்து கொள்ள கீழே உள்ள வரைபடத்தை அழுத்தவும்.'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Address and directions details */}
          <div className="lg:col-span-5 space-y-5">
            <div className="rounded-xl bg-gray-50 p-5 border border-gray-100 space-y-4">
              <div className="space-y-1">
                <span className="text-[9px] font-bold text-gray-900 uppercase tracking-widest block">
                  {lang === 'en' ? 'Registered Office Address' : 'அலுவலக முகவரி'}
                </span>
                <p className="font-display text-sm font-bold text-gray-900 leading-snug">
                  {lang === 'en' ? 'Nallathae Nadakkum Trust' : 'நல்லதே நடக்கும் அறக்கட்டளை'}
                </p>
                <p className="text-sm sm:text-base text-gray-900 leading-relaxed sm:leading-[1.65] font-medium">
                  {lang === 'en' ? (
                    <>
                      38/5, Rajeev Nagar Cross Road,<br />
                      Opp. SPM Hospital,<br />
                      Tiruchengode - 637211,<br />
                      Namakkal District, Tamil Nadu.
                    </>
                  ) : (
                    <>
                      38/5, ராஜீவ் நகர் குறுக்கு சாலை,<br />
                      SPM மருத்துவமனை எதிரில்,<br />
                      திருச்செங்கோடு - 637211,<br />
                      நாமக்கல் மாவட்டம், தமிழ்நாடு.
                    </>
                  )}
                </p>
              </div>

              <div className="space-y-1.5 pt-2 border-t border-gray-200/60 text-xs text-gray-900">
                <div className="flex items-center space-x-2">
                  <FaLocationDot className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                  <span><strong>{lang === 'en' ? 'Landmark:' : 'அடையாளம்:'}</strong> {lang === 'en' ? 'Opp. SPM Hospital' : 'SPM மருத்துவமனை எதிரில்'}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FaMap className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                  <span><strong>{lang === 'en' ? 'Locality:' : 'பகுதி:'}</strong> {lang === 'en' ? 'Tiruchengode Town & Taluk' : 'திருச்செங்கோடு நகரம் & வட்டம்'}</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <a 
                href="https://www.google.com/maps/search/?api=1&query=11.388999%2C77.894306"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center space-x-2 w-full py-3 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-sm transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
              >
                <FaArrowUpRightFromSquare className="h-4 w-4" />
                <span>{lang === 'en' ? 'Open in Google Maps App' : 'கூகுள் மேப்ஸில் திறக்கவும்'}</span>
              </a>
              <p className="text-[11px] text-gray-900 text-center">
                {lang === 'en' ? 'Live Navigation Coordinates for Visitors & Donors' : 'வருகையாளர்கள் மற்றும் நன்கொடையாளர்களுக்கான நேரடி வழிகாட்டி'}
              </p>
            </div>
          </div>

          {/* Right Column: Google Map Iframe with hover action overlay */}
          <div className="lg:col-span-7 h-[300px] sm:h-[350px] rounded-2xl overflow-hidden border border-gray-100 shadow-[0_10px_30px_-12px_rgba(16,24,40,0.15)] ring-1 ring-gray-900/[0.04] relative group cursor-pointer">
            <a
              href="https://www.google.com/maps/search/?api=1&query=11.388999%2C77.894306"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute inset-0 z-10 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center"
              title={lang === 'en' ? 'Click to open in Google Maps' : 'கூகுள் வரைபடத்தில் பார்க்க அழுத்தவும்'}
            >
              {/* Overlay Badge that appears on hover */}
              <div className="bg-emerald-950/95 backdrop-blur-xs text-white border border-emerald-500/30 px-4 py-2.5 rounded-xl flex items-center space-x-2 shadow-lg scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300">
                <FaLocationDot className="h-4 w-4 text-emerald-400 animate-bounce" />
                <span className="text-xs font-bold font-sans">
                  {lang === 'en' ? 'Click to Navigate on Google Maps →' : 'கூகுள் மேப்ஸில் வழிப்பாதையை காண்க →'}
                </span>
              </div>
            </a>
            
            <iframe
              src="https://maps.google.com/maps?q=11.388999%2C77.894306&t=&z=16&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full grayscale-[15%] contrast-[105%] group-hover:scale-[1.02] transition-transform duration-500"
            ></iframe>
          </div>

        </div>
      </section>
      )}

    </div>
  );
}


import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  ShieldAlert, CreditCard, Gift, Heart, User, Award, CheckCircle,
  Play, Tv, Youtube, Video
} from 'lucide-react';

interface DonateViewProps {
  lang: 'en' | 'ta';
}

export default function DonateView({ lang }: DonateViewProps) {
  const [sponsorType, setSponsorType] = useState('annadhanam');
  const [multiplier, setMultiplier] = useState(1);

  // Active YouTube video ID and lists
  const [activeVideoId, setActiveVideoId] = useState('nTjWxd91AMA');
  const trustVideos = [
    {
      id: 'nTjWxd91AMA',
      title: { 
        en: 'Provide Food & Clothes to Care Homes, Never Abandon Parents', 
        ta: 'முதியோர் இல்லத்திற்கு உணவு கொடு,உடை கொடு உன் தாய் தந்தையை மட்டும் கொடுத்து விடாதே.' 
      },
      duration: '5:12',
      category: { en: 'Elder Care', ta: 'முதியோர் ஆதரவு' },
      thumbnail: 'https://img.youtube.com/vi/nTjWxd91AMA/mqdefault.jpg'
    },
    {
      id: 'mUZS8A5twvE',
      title: { 
        en: 'Future Goals & Vision of Nallathe Nadakkum Trust (Interview)', 
        ta: 'நல்லதே நடக்கும் அறக்கட்டளையின் எதிர்கால இலக்குகள் பற்றிய நேர்காணல்' 
      },
      duration: '11:42',
      category: { en: 'Our Vision', ta: 'எதிர்கால நேர்காணல்' },
      thumbnail: 'https://img.youtube.com/vi/mUZS8A5twvE/mqdefault.jpg'
    },
    {
      id: '5PNWVI-ML4A',
      title: { 
        en: 'Annadhanam of Love for 2,500 People at Temple Festival', 
        ta: 'சின்ன ஓங்காளியம்மன் கோயில் பண்டிகையை முன்னிட்டு 2500 பேருக்கு அன்னதானம்' 
      },
      duration: '4:30',
      category: { en: 'Mega Annadhanam', ta: 'அன்னதானம்' },
      thumbnail: 'https://img.youtube.com/vi/5PNWVI-ML4A/mqdefault.jpg'
    }
  ];

  // Simulated Donor State
  const [donorName, setDonorName] = useState('');
  const [donationAmt, setDonationAmt] = useState('1000');
  const [donationItem, setDonationItem] = useState('');
  const [donationType, setDonationType] = useState('Money');
  const [donorMsg, setDonorMsg] = useState('');
  const [donorLoading, setDonorLoading] = useState(false);
  const [donorSuccess, setDonorSuccess] = useState(false);

  // Live sponsors list
  const [wallSponsors, setWallSponsors] = useState<any[]>([]);

  // Copy-to-clipboard state & helper
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(type);
    setTimeout(() => setCopiedText(null), 2000);
  };

  // Calculate simulated cost & impact
  const getImpactData = () => {
    switch (sponsorType) {
      case 'annadhanam':
        return {
          cost: multiplier * 3000,
          unit: lang === 'en' ? 'days of daily roadside meals' : 'நாட்களுக்கான தினசரி அன்னதானம்',
          impact: lang === 'en' ? `Will feed approximately ${multiplier * 80} destitute pavement dwellers.` : `ஏறத்தாழ ${multiplier * 80} சாலையோர ஏழைகளுக்கு சத்தான மதிய உணவு வழங்கப்படும்.`,
        };
      case 'student':
        return {
          cost: multiplier * 5000,
          unit: lang === 'en' ? 'school students sponsored' : 'பள்ளி மாணவருக்கான கல்வி உதவி',
          impact: lang === 'en' ? `Remits full year pending tuition fees for ${multiplier} student from daily-wage home.` : `${multiplier} ஏழை மாணவர்களின் கல்வி தடைபடாமல் இருக்க ஓராண்டு கட்டணம் முழுவதும் செலுத்தப்படும்.`,
        };
      case 'ambulance':
        return {
          cost: multiplier * 2500,
          unit: lang === 'en' ? 'ambulance emergency trips sponsored' : 'ஆம்புலன்ஸ் அவசர பயண ஸ்பான்சர்',
          impact: lang === 'en' ? `Covers fuel and maintenance logistics for ${multiplier * 10} life-saving ambulance drives.` : `பணம் செலுத்த இயலாத ஏழைகளுக்கான ${multiplier * 10} அவசர பயணங்கள் முழுவதும் இலவசமாக நடத்த வழிவகை செய்யும்.`,
        };
      case 'cremation':
        return {
          cost: multiplier * 1500,
          unit: lang === 'en' ? 'unclaimed last rites sponsored' : 'ஆதரவற்றோர் இறுதி மரியாதை ஸ்பான்சர்',
          impact: lang === 'en' ? `Covers shroud cloth, municipal fees, and ceremonial materials for ${multiplier} dignified burials.` : `உரிமை கோரப்படாத ${multiplier} உடல்களுக்கு முழு இறுதிச் சடங்குகள் செய்ய தேவையான பொருட்கள் மற்றும் தகனக் கட்டணங்கள் செலுத்தப்படும்.`,
        };
      default:
        return { cost: 1000, unit: '', impact: '' };
    }
  };

  const { cost, unit, impact } = getImpactData();

  useEffect(() => {
    try {
      const savedSponsors = localStorage.getItem('nn_sponsors_wall');
      if (savedSponsors) {
        setWallSponsors(JSON.parse(savedSponsors));
      } else {
        // Initial seeds for visual context
        const initialSponsors = [
          { name: 'K. Senthil Kumar', type: 'Sponsorship', item: 'Annadhanam (1 Day)', msg: 'Sponsoring in memory of my parents.', date: '20.07.2026' },
          { name: 'Nandhini Devi', type: 'Material', item: '2 Rice bags (25kg)', msg: 'For the daily kitchen, thank you team!', date: '18.07.2026' },
          { name: 'Ravi & Family', type: 'Sponsorship', item: 'Student Fees Support', msg: 'Wishing the trust all strength.', date: '15.07.2026' }
        ];
        localStorage.setItem('nn_sponsors_wall', JSON.stringify(initialSponsors));
        setWallSponsors(initialSponsors);
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleSponsorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!donorName) {
      alert(lang === 'en' ? 'Please fill in your name.' : 'தயவுசெய்து உங்கள் பெயரை எழுதவும்.');
      return;
    }
    setDonorLoading(true);

    setTimeout(() => {
      const itemDetail = donationType === 'Money' 
        ? `₹${Number(donationAmt).toLocaleString()}` 
        : donationItem || 'Material Groceries';
        
      const newDonor = {
        name: donorName,
        type: donationType,
        item: itemDetail,
        msg: donorMsg || (lang === 'en' ? 'Blessed to support.' : 'உதவி செய்வதில் மகிழ்ச்சி.'),
        date: new Date().toLocaleDateString()
      };

      try {
        const currentSponsors = JSON.parse(localStorage.getItem('nn_sponsors_wall') || '[]');
        const updatedSponsors = [newDonor, ...currentSponsors];
        localStorage.setItem('nn_sponsors_wall', JSON.stringify(updatedSponsors));
        setWallSponsors(updatedSponsors);
      } catch (err) {
        console.error(err);
      }

      setDonorLoading(false);
      setDonorSuccess(true);
      setDonorName('');
      setDonationAmt('1000');
      setDonationItem('');
      setDonorMsg('');
    }, 1200);
  };

  return (
    <div className="space-y-12 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Title Header */}
      <section className="text-center max-w-3xl mx-auto space-y-4">
        <h1 className="font-display text-3xl font-extrabold text-gray-900 sm:text-4xl">
          {lang === 'en' ? 'Sponsor & Direct Support Page' : 'மக்களுக்கு நேரடியாக உதவ நன்கொடைகள்'}
        </h1>
        <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
          {lang === 'en' 
            ? 'We maintain absolute transparency. We do not use third-party collectors. Support our programs directly.' 
            : 'நாங்கள் எவ்வித தனிப்பட்ட கமிஷன்களும் இல்லாமல், பெற்ற முழு நிதியையும் மக்களுக்கே பயன்படுத்துகிறோம். எங்களது பணிகளுக்கு நேரடியாக உதவலாம்.'}
        </p>
      </section>

      {/* Safety & Tax Warnings */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Safety Warning */}
        <div className="rounded-2xl border border-red-200 bg-red-50/50 p-5 flex items-start space-x-3">
          <ShieldAlert className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="text-xs font-bold text-red-900 uppercase tracking-wider">
              🚨 {lang === 'en' ? 'Important Safety Notice' : 'முக்கிய பாதுகாப்பு அறிவிப்பு'}
            </h4>
            <p className="text-[11px] sm:text-xs text-red-800 leading-relaxed text-justify">
              {lang === 'en'
                ? 'Please make payments only to the official trust bank account or UPI ID listed below. Do not send funds to any individual personal account claiming to represent the trust. If in doubt, contact us directly first.'
                : 'தயவுசெய்து கீழே குறிப்பிடப்பட்டுள்ள அறக்கட்டளையின் அதிகாரப்பூர்வ வங்கிக் கணக்கு அல்லது UPI முகவரிக்கு மட்டுமே பணம் அனுப்புங்கள். அறக்கட்டளையின் ஊழியர் என்று கூறி வரும் தனிநபர் கணக்குகளுக்குப் பணம் அனுப்பக் கூடாது.'}
            </p>
          </div>
        </div>

        {/* Tax Exemption Status */}
        <div className="rounded-2xl border border-amber-200 bg-amber-50/50 p-5 flex items-start space-x-3">
          <ShieldAlert className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="text-xs font-bold text-amber-950 uppercase tracking-wider">
              🛡️ {lang === 'en' ? 'Tax Deduction & Exemption Status' : 'வரி விலக்கு நிலைப்பாடு'}
            </h4>
            <p className="text-[11px] sm:text-xs text-amber-900 leading-relaxed text-justify">
              {lang === 'en'
                ? 'The trust is registered under deed Doc No. 16/2025. Applications for 12A and 80G tax-exempt registrations are pending. Donations are NOT currently eligible for tax deduction. We will update our notices once granted.'
                : 'எங்களது அறக்கட்டளை 2025-ல் பதிவு செய்யப்பட்டுள்ளது. 12A / 80G வருமான வரி விலக்கிற்கான விண்ணப்பம் தற்போது நிலுவையில் உள்ளது. எனவே தற்போதைய நிலையில் வரி விலக்கு கோர இயலாது என்பதை வெளிப்படையாகத் தெரிவித்துக் கொள்கிறோம்.'}
            </p>
          </div>
        </div>

      </section>

      {/* Interactive Sponsorship Impact Calculator */}
      <section className="rounded-2xl border border-gray-100 bg-white p-6 sm:p-8 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Input Selection */}
        <div className="lg:col-span-6 space-y-6">
          <h3 className="font-display text-lg font-bold text-gray-900">
            📊 {lang === 'en' ? 'Sponsorship Impact Calculator' : 'தாக்கக் கணக்கீடு கால்குலேட்டர்'}
          </h3>
          
          <div className="space-y-3">
            <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
              {lang === 'en' ? 'Choose a Program to Sponsor' : 'உதவ விரும்பும் திட்டம்'}
            </label>
            <div className="grid grid-cols-2 gap-3">
              {[
                { id: 'annadhanam', label: { en: 'Daily Annadhanam', ta: 'தினசரி அன்னதானம்' } },
                { id: 'student', label: { en: 'Student Support', ta: 'மாணவர்கள் கல்வி' } },
                { id: 'ambulance', label: { en: 'Ambulance Fuel', ta: 'ஆம்புலன்ஸ் எரிபொருள்' } },
                { id: 'cremation', label: { en: 'Dignified Burials', ta: 'இறுதி மரியாதைகள்' } }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => { setSponsorType(item.id); setMultiplier(1); }}
                  className={`p-3 text-xs font-semibold rounded-xl text-center cursor-pointer transition-colors border ${
                    sponsorType === item.id 
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm' 
                      : 'bg-white border-gray-100 hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  {item.label[lang]}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <div className="flex justify-between items-center text-xs font-bold text-gray-700 uppercase tracking-wider">
              <span>{lang === 'en' ? 'Scale / Quantity' : 'அளவு / எண்ணிக்கை'}</span>
              <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-xs">
                {multiplier} {multiplier === 1 ? (lang === 'en' ? 'Unit' : 'அலகு') : (lang === 'en' ? 'Units' : 'அலகுகள்')}
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="15"
              value={multiplier}
              onChange={(e) => setMultiplier(Number(e.target.value))}
              className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-emerald-600"
            />
          </div>
        </div>

        {/* Right: Calculated Impact Display */}
        <div className="lg:col-span-6 bg-emerald-800 text-white rounded-xl p-6 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute -right-8 -bottom-8 h-24 w-24 bg-emerald-700/60 rounded-full blur-lg"></div>
          
          <div className="space-y-4">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-200 bg-emerald-700/60 px-2.5 py-1 rounded-full w-fit block">
              {lang === 'en' ? 'Calculated Sponsorship File' : 'திட்டமிட்ட உதவி அறிக்கை'}
            </span>
            <div className="space-y-1">
              <p className="text-[10px] uppercase font-bold text-emerald-200 tracking-widest">{lang === 'en' ? 'Estimated cost' : 'தேவைப்படும் தொகை'}</p>
              <h2 className="font-display text-4xl font-extrabold text-emerald-100">
                ₹{cost.toLocaleString()}
              </h2>
            </div>
            <p className="text-xs text-emerald-100 leading-relaxed italic border-l-2 border-emerald-300 pl-3">
              "{multiplier} {unit}"
            </p>
          </div>

          <div className="pt-6 space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-200">{lang === 'en' ? 'Direct Social Outcome' : 'இதனால் விளையும் தாக்கம்'}</h4>
            <p className="text-xs sm:text-sm text-white font-medium leading-relaxed">
              {impact}
            </p>
          </div>

        </div>

      </section>

      {/* Official Bank Account Details Table */}
      <section className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="space-y-1 border-b border-gray-100 pb-4">
          <h3 className="font-display text-xl font-bold text-gray-900 flex items-center space-x-2">
            <CreditCard className="h-6 w-6 text-emerald-600" />
            <span>{lang === 'en' ? 'Official Banking Credentials' : 'அதிகாரப்பூர்வ வங்கிக் கணக்கு விபரங்கள்'}</span>
          </h3>
          <p className="text-xs sm:text-sm text-gray-500">
            {lang === 'en' ? 'Operated jointly by Chairman and Treasurer. Strictly audited.' : 'தலைவர் மற்றும் பொருளாளரால் மட்டுமே இயக்கப்படும் பாதுகாப்பான கணக்கு.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 space-y-4">
            <div className="rounded-2xl border border-gray-100 bg-white overflow-hidden shadow-xs">
              <table className="w-full text-left text-xs sm:text-sm">
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="px-4 py-3 font-semibold text-gray-500 bg-gray-50/50 w-1/3">{lang === 'en' ? 'Bank Name' : 'வங்கிப் பெயர்'}</td>
                    <td className="px-4 py-3 font-bold text-gray-900">Equitas Small Finance Bank</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-semibold text-gray-500 bg-gray-50/50">{lang === 'en' ? 'Account Name' : 'கணக்கின் பெயர்'}</td>
                    <td className="px-4 py-3 font-bold text-emerald-800">Nallathe Nadakkum Trust</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-semibold text-gray-500 bg-gray-50/50">{lang === 'en' ? 'Account Number' : 'கணக்கு எண்'}</td>
                    <td className="px-4 py-3 font-mono font-bold text-gray-950 tracking-wider">20000300375</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-semibold text-gray-500 bg-gray-50/50">{lang === 'en' ? 'IFSC Code' : 'IFSC குறியீடு'}</td>
                    <td className="px-4 py-3 font-mono font-bold text-gray-950 tracking-wider">ESFB0001138</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Quick UPI / Mobile Payment Option */}
            <div className="rounded-2xl border border-emerald-100 bg-emerald-50/20 p-5 space-y-3 shadow-xs">
              <h4 className="text-xs sm:text-sm font-bold text-emerald-950 flex items-center space-x-2">
                <span className="flex h-2 w-2 rounded-full bg-emerald-600 animate-pulse"></span>
                <span>{lang === 'en' ? 'UPI & Mobile Transfer Methods' : 'UPI மற்றும் மொபைல் பேமெண்ட் வழிகள்'}</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                {/* Paytm Card */}
                <div className="bg-white border border-gray-100 p-4 rounded-xl flex flex-col justify-between space-y-3 shadow-2xs relative overflow-hidden group hover:border-sky-200 transition-all">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1.5">
                      <svg className="w-16 h-5" viewBox="0 0 100 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.4 8.2c-3.1 0-5.5 2.5-5.5 5.6v7.2c0 3.1 2.4 5.6 5.5 5.6s5.5-2.5 5.5-5.6v-7.2c0-3.1-2.4-5.6-5.5-5.6zm2.2 12.8c0 1.2-1 2.2-2.2 2.2s-2.2-1-2.2-2.2v-7.2c0-1.2 1-2.2 2.2-2.2s2.2 1 2.2 2.2v7.2zm7.6-12.2h5.1V26h-5.1V8.8zm15.4 0l-4.7 11-4.7-11H21l7.3 16.4c-.3.6-.7 1.1-1.3 1.1h-.9v3.1h.9c2.1 0 3.5-1.2 4.4-3.1l7.8-17.5H37.6zm13.1 3.2h-4.6V8.8h14.2v3.2H50.7V26h-5V12z" fill="#002E6E"/>
                        <path d="M62.6 8.8h4.6l4.2 6.6 4.2-6.6h4.6V26h-4.6v-8.4l-4.2 6.6h-.1l-4.2-6.6V26h-4.6V8.8z" fill="#00BAF2"/>
                      </svg>
                    </div>
                    <button 
                      onClick={() => handleCopy('+917540017625', 'paytm')}
                      className="p-1 rounded-md text-gray-400 hover:text-sky-600 hover:bg-sky-50 transition-colors"
                      title="Copy Number"
                    >
                      {copiedText === 'paytm' ? (
                        <svg className="h-4 w-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                        </svg>
                      )}
                    </button>
                  </div>
                  <div>
                    <span className="block text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Paytm Number</span>
                    <span className="font-mono font-bold text-gray-950 text-xs sm:text-sm tracking-wide">+91 75400 17625</span>
                  </div>
                  {copiedText === 'paytm' && (
                    <span className="absolute bottom-1 right-2 text-[9px] text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.5 rounded animate-fade-in">Copied!</span>
                  )}
                </div>

                {/* PhonePe Card */}
                <div className="bg-white border border-gray-100 p-4 rounded-xl flex flex-col justify-between space-y-3 shadow-2xs relative overflow-hidden group hover:border-purple-200 transition-all">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1.5">
                      <svg className="w-20 h-5" viewBox="0 0 100 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="18" height="18" rx="4" fill="#5F259F"/>
                        <path d="M9 4c-2.5 0-4.5 2-4.5 4.5S6.5 13 9 13s4.5-2 4.5-4.5S11.5 4 9 4zm0 6.8c-1.3 0-2.3-1-2.3-2.3S7.7 6.2 9 6.2s2.3 1 2.3 2.3-1 2.3-2.3 2.3z" fill="white"/>
                        <path d="M9 8.5v4.5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                        <path d="M6.5 10.8h5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                        <text x="24" y="14" fill="#5F259F" fontWeight="800" fontSize="12" fontFamily="sans-serif" letterSpacing="0.5">PhonePe</text>
                      </svg>
                    </div>
                    <button 
                      onClick={() => handleCopy('+917540017625', 'phonepe')}
                      className="p-1 rounded-md text-gray-400 hover:text-purple-600 hover:bg-purple-50 transition-colors"
                      title="Copy Number"
                    >
                      {copiedText === 'phonepe' ? (
                        <svg className="h-4 w-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                        </svg>
                      )}
                    </button>
                  </div>
                  <div>
                    <span className="block text-[10px] text-gray-400 uppercase tracking-wider font-semibold">PhonePe Number</span>
                    <span className="font-mono font-bold text-gray-950 text-xs sm:text-sm tracking-wide">+91 75400 17625</span>
                  </div>
                  {copiedText === 'phonepe' && (
                    <span className="absolute bottom-1 right-2 text-[9px] text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.5 rounded animate-fade-in">Copied!</span>
                  )}
                </div>

                {/* Google Pay Card */}
                <div className="bg-white border border-gray-100 p-4 rounded-xl flex flex-col justify-between space-y-3 shadow-2xs relative overflow-hidden group hover:border-blue-200 transition-all">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1.5">
                      <svg className="w-16 h-5" viewBox="0 0 74 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g transform="translate(2, 2)">
                          <path d="M10.1 11.5c0-.6-.1-1.2-.2-1.7H5.2v3.3h2.8c-.1.7-.5 1.3-1.1 1.7v2.2h2.2c1.3-1.2 2-3 2-5.5z" fill="#4285F4"/>
                          <path d="M5.2 16.5c1.4 0 2.6-.5 3.5-1.3l-2.2-2.2c-.6.4-1.4.6-2.2.6-1.7 0-3.1-1.2-3.6-2.7H.7v2.2c.9 1.8 2.8 3.4 5.1 3.4z" fill="#34A853"/>
                          <path d="M1.6 10.9c-.1-.4-.2-.9-.2-1.4s.1-1 .2-1.4V5.9H.7c-.5 1-.8 2.1-.8 3.5s.3 2.5.8 3.5l1.6-1.6z" fill="#FBBC05"/>
                          <path d="M5.2 6.3c.8 0 1.5.3 2 .8l2.2-2.2C8 .8 6.7.3 5.2.3 2.8.3.9 1.8 0 3.7l1.6 1.6c.5-1.5 1.9-2.7 3.6-2.7z" fill="#EA4335"/>
                        </g>
                        <text x="18" y="16" fill="#5F6368" fontWeight="bold" fontSize="13" fontFamily="sans-serif" letterSpacing="0.5">Pay</text>
                      </svg>
                    </div>
                    <button 
                      onClick={() => handleCopy('+917540017625', 'gpay')}
                      className="p-1 rounded-md text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                      title="Copy Number"
                    >
                      {copiedText === 'gpay' ? (
                        <svg className="h-4 w-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                        </svg>
                      )}
                    </button>
                  </div>
                  <div>
                    <span className="block text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Google Pay Number</span>
                    <span className="font-mono font-bold text-gray-950 text-xs sm:text-sm tracking-wide">+91 75400 17625</span>
                  </div>
                  {copiedText === 'gpay' && (
                    <span className="absolute bottom-1 right-2 text-[9px] text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.5 rounded animate-fade-in">Copied!</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-4">
            <div className="rounded-xl bg-gray-50 p-5 border border-gray-200/60 text-xs sm:text-sm text-gray-600 leading-relaxed space-y-3">
              <h4 className="font-bold text-gray-900 flex items-center space-x-1.5">
                <span>💡</span>
                <span>{lang === 'en' ? 'How to secure your receipt' : 'நன்கொடை ரசீது பெற'}</span>
              </h4>
              <p className="text-justify leading-relaxed">
                {lang === 'en' 
                  ? 'Please notify us of your bank remittance alongside transfer receipts via email or WhatsApp so our treasurer can mail you an official trust donation voucher.'
                  : 'வங்கிக் கணக்கிற்கு பணம் அனுப்பிய பின், அதன் ரசீதை எங்களது வாட்ஸ்அப் அல்லது மின்னஞ்சலுக்கு அனுப்பி வைத்தால் முறையான அறக்கட்டளை ரசீது உங்களுக்கு அனுப்பி வைக்கப்படும்.'}
              </p>
            </div>
            <p className="text-[11px] text-gray-400 text-center italic">
              {lang === 'en' ? '✓ Registered Doc No. 16/2025 Namakkal District, Tamil Nadu.' : '✓ பதிவு எண் 16/2025 நாமக்கல் மாவட்டம், தமிழ்நாடு.'}
            </p>
          </div>
        </div>
      </section>

      {/* Pledge a Donation / Material Support */}
      <section className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 shadow-xs max-w-3xl mx-auto w-full space-y-6">
        <div className="space-y-1 text-center border-b border-gray-100 pb-4">
          <h3 className="font-display text-xl font-bold text-gray-900 flex items-center justify-center space-x-2">
            <Gift className="h-6 w-6 text-emerald-600" />
            <span>{lang === 'en' ? 'Pledge a Donation / Material Support' : 'பொருட்கள் / உதவிப் பங்களிப்புகளைப் பதிவிட'}</span>
          </h3>
          <p className="text-xs sm:text-sm text-gray-500">
            {lang === 'en' ? 'Simulate adding your support to our Wall of Gratitude below.' : 'உங்களது பொருள் உதவி அல்லது பங்களிப்பினைப் பதிந்து நன்றிக் கூடத்தில் இடம்பெறுக.'}
          </p>
        </div>

        {donorSuccess ? (
          <div className="text-center py-6 space-y-4">
            <div className="h-12 w-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center text-xl mx-auto">
              ✓
            </div>
            <div className="space-y-1">
              <h4 className="font-display text-base font-bold text-gray-900">{lang === 'en' ? 'Thank You, Donor!' : 'மிக்க நன்றி!'}</h4>
              <p className="text-xs text-gray-600">
                {lang === 'en' 
                  ? 'Your simulated contribution has been recorded on the device gratitude board.' 
                  : 'உங்களது பங்களிப்பு வெற்றிகரமாக நன்றிக் கூடப் பலகையில் பதிவேற்றப்பட்டுள்ளது.'}
              </p>
            </div>
            <button
              id="reset-donor"
              onClick={() => setDonorSuccess(false)}
              className="rounded-lg bg-emerald-600 text-white font-semibold text-xs px-4 py-1.5 hover:bg-emerald-700 cursor-pointer"
            >
              {lang === 'en' ? 'Sponsor Again' : 'மற்றொரு உதவிப் பதிவு'}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSponsorSubmit} className="space-y-4">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-600 uppercase tracking-wider block">{lang === 'en' ? 'Your Name' : 'உங்கள் பெயர்'} *</label>
                <input
                  type="text"
                  required
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  placeholder="e.g. S. Vinayagamoorthy"
                  className="w-full px-3 py-1.5 border border-gray-200 rounded-lg text-xs focus:outline-hidden focus:border-emerald-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-600 uppercase tracking-wider block">{lang === 'en' ? 'Support Type' : 'பங்களிப்பு வகை'}</label>
                <select
                  value={donationType}
                  onChange={(e) => setDonationType(e.target.value)}
                  className="w-full px-3 py-1.5 border border-gray-200 rounded-lg text-xs bg-white focus:outline-hidden focus:border-emerald-500"
                >
                  <option value="Money">{lang === 'en' ? 'Financial Remittance' : 'நிதிப் பங்களிப்பு'}</option>
                  <option value="Material">{lang === 'en' ? 'Material Groceries/Rice' : 'பொருளுதவி (அரிசி/மளிகை)'}</option>
                </select>
              </div>
            </div>

            {donationType === 'Money' ? (
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-600 uppercase tracking-wider block">{lang === 'en' ? 'Simulated Amount (₹)' : 'பங்களிப்புத் தொகை (₹)'}</label>
                <input
                  type="number"
                  value={donationAmt}
                  onChange={(e) => setDonationAmt(e.target.value)}
                  className="w-full px-3 py-1.5 border border-gray-200 rounded-lg text-xs focus:outline-hidden focus:border-emerald-500"
                />
              </div>
            ) : (
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-600 uppercase tracking-wider block">{lang === 'en' ? 'Describe Materials remitted' : 'பொருட்களின் விவரம் (எ.கா. அரிசி மூட்டை)'} *</label>
                <input
                  type="text"
                  required
                  value={donationItem}
                  onChange={(e) => setDonationItem(e.target.value)}
                  placeholder="e.g. 1 Bag of Raw Rice (25kg)"
                  className="w-full px-3 py-1.5 border border-gray-200 rounded-lg text-xs focus:outline-hidden focus:border-emerald-500"
                />
              </div>
            )}

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-600 uppercase tracking-wider block">{lang === 'en' ? 'Blessing / Message for the board' : 'வாழ்த்துச் செய்தி / குறிப்பு'}</label>
              <input
                type="text"
                value={donorMsg}
                onChange={(e) => setDonorMsg(e.target.value)}
                placeholder="e.g. May Good Things Happen to all!"
                className="w-full px-3 py-1.5 border border-gray-200 rounded-lg text-xs focus:outline-hidden focus:border-emerald-500"
              />
            </div>

            <button
              id="submit-donor-pledge"
              type="submit"
              disabled={donorLoading}
              className="w-full rounded-lg bg-emerald-600 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-emerald-700 transition-colors disabled:bg-emerald-400 cursor-pointer text-center"
            >
              {donorLoading ? (lang === 'en' ? 'Publishing...' : 'பதிவேற்றப்படுகிறது...') : (lang === 'en' ? 'Log Contribution on Gratitude Board' : 'அறக்கட்டளை நன்றிக் கூடப் பலகையில் வெளியிடவும்')}
            </button>

          </form>
        )}
      </section>

      {/* Live Sponsors Board (Sponsors Wall of Gratitude) */}
      <section className="space-y-4 pt-4">
        <div className="text-center space-y-1">
          <h2 className="font-display text-2xl font-bold text-gray-900">
            🌸 {lang === 'en' ? 'Sponsors Wall of Gratitude' : 'அறக்கட்டளையின் நன்றிக் கூடம்'}
          </h2>
          <p className="text-xs text-gray-500">
            {lang === 'en' ? 'A real-time ledger of kind-hearted individuals who support Tiruchengode street services.' : 'திருச்செங்கோடு மற்றும் அதன் சுற்றுவட்டாரப் பகுதிகளில் ஏழைகளுக்கு உதவிய நல்ல உள்ளங்களின் விபரம்.'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
          {wallSponsors.map((spo, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="p-5 border border-emerald-100 rounded-2xl bg-emerald-50/20 shadow-xs flex flex-col justify-between space-y-4 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 h-10 w-10 bg-emerald-100/40 rounded-bl-full flex items-center justify-center text-emerald-700 text-[10px]">
                ❤️
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="h-7 w-7 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold flex items-center justify-center">
                    {spo.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-900 leading-tight">{spo.name}</h4>
                    <p className="text-[9px] text-gray-400">{spo.date}</p>
                  </div>
                </div>
                <p className="text-xs text-gray-600 italic">
                  "{spo.msg}"
                </p>
              </div>

              <div className="pt-3 border-t border-emerald-100/50 flex justify-between items-center text-[10px]">
                <span className="font-semibold text-gray-400 uppercase tracking-wider">
                  {spo.type === 'Money' || spo.type === 'Sponsorship' ? (lang === 'en' ? 'Sponsored' : 'ஸ்பான்சர்') : (lang === 'en' ? 'Donated Materials' : 'பொருளுதவி')}
                </span>
                <span className="font-mono font-bold text-emerald-700 bg-emerald-100/60 px-2 py-0.5 rounded">
                  {spo.item}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Interactive YouTube Video Showcase */}
      <section className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 shadow-xs space-y-6 animate-fade-in">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-gray-100 pb-5">
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full w-fit block">
              {lang === 'en' ? 'See Impact in Motion' : 'நேரடி ஒளிபரப்பு'}
            </span>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-gray-900 flex items-center space-x-2">
              <Youtube className="h-6 w-6 text-red-600 flex-shrink-0 animate-pulse" />
              <span>{lang === 'en' ? '📽️ Watch Trust Activities & Field Footage' : '📽️ எங்களது களப்பணி வீடியோக்களைக் காண்க'}</span>
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 leading-relaxed max-w-2xl">
              {lang === 'en' 
                ? 'Watch real videos documenting our daily roadside lunch distributions, healthcare ambulance drives, and sacred burial rituals in Tamil Nadu.' 
                : 'எங்கள் தினசரி அன்னதானம், இலவச அவசர ஆம்புலன்ஸ் இயக்கம் மற்றும் ஆதரவற்றோர் இறுதி மரியாதை போன்ற உண்மையான பணிகளை வீடியோ வடிவில் காணுங்கள்.'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Main Video Embed Container */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
            <div className="aspect-video w-full rounded-2xl overflow-hidden bg-slate-900 border border-gray-100 shadow-md relative">
              <iframe
                src={`https://www.youtube.com/embed/${activeVideoId}?autoplay=0&rel=0`}
                title="Trust Activity Video Player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
            <div className="bg-emerald-50/40 rounded-xl p-4 border border-emerald-100 flex items-start space-x-3 text-xs text-emerald-800">
              <Video className="h-4 w-4 text-emerald-600 flex-shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                {lang === 'en' 
                  ? 'All video documents are recorded directly by trust volunteers on the ground to guarantee that 100% of community sponsorship is put into direct social relief.' 
                  : 'எங்களது அனைத்து ஒளிப்பதிவுகளும் தன்னார்வலர்களால் நேரடியாக களத்தில் எடுக்கப்பட்டவை. 100% நிதி உதவி நேரடியாக ஏழை மக்களை சென்றடைகிறது.'}
              </p>
            </div>
          </div>

          {/* Video Library Selection List */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">
                {lang === 'en' ? 'Select Video to Play' : 'பிளேலிஸ்ட் விவரம்'}
              </span>
              
              <div className="space-y-3 max-h-[310px] overflow-y-auto pr-1">
                {trustVideos.map((vid) => {
                  const isActive = activeVideoId === vid.id;
                  return (
                    <button
                      key={vid.id}
                      onClick={() => setActiveVideoId(vid.id)}
                      className={`w-full text-left p-2.5 rounded-xl border flex items-center space-x-3 transition-all cursor-pointer ${
                        isActive 
                          ? 'border-emerald-600 bg-emerald-50/60 shadow-xs' 
                          : 'border-gray-100 bg-white hover:bg-gray-50'
                      }`}
                    >
                      {/* Video Thumbnail with Hover overlay play button */}
                      <div className="h-14 w-20 rounded-lg overflow-hidden bg-slate-100 relative flex-shrink-0 border border-gray-100">
                        <img 
                          src={vid.thumbnail} 
                          alt={vid.title[lang]} 
                          className="h-full w-full object-cover"
                        />
                        <div className={`absolute inset-0 flex items-center justify-center transition-opacity ${
                          isActive ? 'bg-emerald-950/65' : 'bg-black/40 group-hover:bg-black/50'
                        }`}>
                          <Play className={`h-4 w-4 fill-white text-white ${isActive ? 'animate-pulse' : ''}`} />
                        </div>
                        <span className="absolute bottom-0.5 right-0.5 bg-black/85 text-white font-mono text-[8px] font-bold px-1 rounded">
                          {vid.duration}
                        </span>
                      </div>

                      {/* Video Details */}
                      <div className="flex-1 min-w-0 space-y-1">
                        <span className={`text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded w-fit block ${
                          isActive ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-500'
                        }`}>
                          {vid.category[lang]}
                        </span>
                        <h4 className={`text-xs font-bold leading-tight truncate ${
                          isActive ? 'text-emerald-900' : 'text-gray-800'
                        }`}>
                          {vid.title[lang]}
                        </h4>
                        <p className="text-[9px] text-gray-400">
                          {lang === 'en' ? 'Tap to view inline' : 'இயக்க இங்கே அழுத்தவும்'}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick Action Link to Subscribe / Watch More */}
            <a 
              href="https://www.youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center space-x-2 py-3 px-4 rounded-xl bg-red-50 text-red-700 hover:bg-red-100 transition-colors text-xs font-bold w-full cursor-pointer border border-red-100"
            >
              <Youtube className="h-4 w-4 text-red-600 fill-red-600" />
              <span>{lang === 'en' ? 'Subscribe to Trust YouTube Channel' : 'அறக்கட்டளை யூடியூப் சேனல்'}</span>
            </a>
          </div>

        </div>
      </section>

    </div>
  );
}

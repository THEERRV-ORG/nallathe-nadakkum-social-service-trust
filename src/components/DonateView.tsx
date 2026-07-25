import React, { useState, useEffect } from 'react';
import { OFFICIAL_CONTACT, SAMPLE_SPONSORS, buildMailtoUrl, hasMeaningfulText, isValidDonationAmount, isValidIndianPhone, isValidPersonName, normalizeIndianPhone, sanitizeSingleLine } from '../security';
import { motion } from 'motion/react';
import {
  FaCircleExclamation, FaCreditCard, FaGift, FaHeart,
  FaPlay, FaYoutube, FaVideo
} from 'react-icons/fa6';
import Monogram from './Monogram';

interface DonateViewProps {
  lang: 'en' | 'ta';
}

/**
 * Donation page for public programme information and safe acknowledgement
 * handoff. This component intentionally avoids client-side persistence for
 * donor data.
 */
export default function DonateView({ lang }: DonateViewProps) {
  // Video content is curated and static so embeds stay predictable and auditable.
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

  // Acknowledgement draft state. Inputs are validated, normalized, and handed
  // off to the user's email client rather than being stored in-browser.
  const [donorName, setDonorName] = useState('');
  const [donorPhone, setDonorPhone] = useState('');
  const [donationAmt, setDonationAmt] = useState('1000');
  const [donationItem, setDonationItem] = useState('');
  const [bloodType, setBloodType] = useState('O+');
  const [donationType, setDonationType] = useState('Money');
  const [donorMsg, setDonorMsg] = useState('');
  const [donorLoading, setDonorLoading] = useState(false);
  const [donorSuccess, setDonorSuccess] = useState(false);

  // Public-facing, sample-only acknowledgement cards.
  const [wallSponsors, setWallSponsors] = useState<any[]>([]);

  // Used for short-lived UI feedback when copying official payment details.
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(type);
    setTimeout(() => setCopiedText(null), 2000);
  };

  useEffect(() => {
    setWallSponsors([...SAMPLE_SPONSORS]);
  }, []);

  // Create a normalized acknowledgement draft for staff review. No payment is
  // accepted or verified in this client-only flow.
  const handleSponsorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const normalizedName = sanitizeSingleLine(donorName, 80);
    const normalizedPhone = normalizeIndianPhone(donorPhone);
    const normalizedMessage = sanitizeSingleLine(donorMsg, 160);
    const normalizedItem = sanitizeSingleLine(donationItem, 120);

    if (!isValidPersonName(normalizedName)) {
      alert(lang === 'en' ? 'Enter a valid donor name before preparing the acknowledgement draft.' : 'பங்களிப்பை உறுதிப்படுத்த செல்லுபடியாகும் பெயரை வழங்கவும்.');
      return;
    }

    if (!isValidIndianPhone(normalizedPhone)) {
      alert(lang === 'en' ? 'Enter a valid Indian phone number so we can follow up with you.' : 'தொடர்பு கொள்ள செல்லுபடியாகும் இந்திய தொலைபேசி எண்ணை வழங்கவும்.');
      return;
    }

    if (donationType === 'Money' && !isValidDonationAmount(donationAmt)) {
      alert(lang === 'en' ? 'Donation amounts must be between Rs. 10 and Rs. 10,00,000.' : 'நன்கொடை தொகை ரூ.10 முதல் ரூ.10,00,000 வரை இருக்க வேண்டும்.');
      return;
    }

    if (donationType !== 'Money' && donationType !== 'Blood' && !hasMeaningfulText(normalizedItem, 3, 120)) {
      alert(lang === 'en' ? 'Please describe what you are donating.' : 'நீங்கள் வழங்கும் நன்கொடையின் விவரத்தை குறிப்பிடவும்.');
      return;
    }

    setDonorLoading(true);

    setTimeout(() => {
      const itemDetail = donationType === 'Money'
        ? `Rs. ${Number(donationAmt).toLocaleString('en-IN')}`
        : donationType === 'Blood'
        ? `${bloodType} (${lang === 'en' ? 'Blood Type' : 'இரத்த வகை'})`
        : normalizedItem;

      const donationTypeLabel = {
        'Money': lang === 'en' ? 'Financial Remittance' : 'நிதிப் பங்களிப்பு',
        'Groceries': lang === 'en' ? 'Groceries / Materials' : 'மளிகைப் பொருட்கள் / பொருளுதவி',
        'Blood': lang === 'en' ? 'Blood Donation' : 'இரத்த நன்கொடை',
        'Dress': lang === 'en' ? 'Clothes / Dress' : 'ஆடைகள் / உடை',
      }[donationType] || donationType;

      const mailtoUrl = buildMailtoUrl(OFFICIAL_CONTACT.email, 'Donation acknowledgement request', [
        `Name: ${normalizedName}`,
        `Phone: ${normalizedPhone}`,
        `Support type: ${donationTypeLabel}`,
        `Support detail: ${itemDetail}`,
        `Message: ${normalizedMessage || 'Blessed to support.'}`,
      ]);

      window.location.href = mailtoUrl;
      setDonorLoading(false);
      setDonorSuccess(true);
      setDonorName('');
      setDonorPhone('');
      setDonationAmt('1000');
      setDonationItem('');
      setBloodType('O+');
      setDonorMsg('');
    }, 500);
  };

  return (
    <div className="space-y-12 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Title Header */}
      <section className="text-center max-w-3xl mx-auto space-y-4">
        <h1 className="font-display text-3xl font-extrabold text-gray-900 sm:text-4xl">
          {lang === 'en' ? 'Sponsor & Direct Support Page' : 'மக்களுக்கு நேரடியாக உதவ நன்கொடைகள்'}
        </h1>
        <p className="text-gray-900 text-base sm:text-lg leading-relaxed sm:leading-[1.65]">
          {lang === 'en' 
            ? 'We maintain absolute transparency. We do not use third-party collectors. Support our programs directly.' 
            : 'நாங்கள் எவ்வித தனிப்பட்ட கமிஷன்களும் இல்லாமல், பெற்ற முழு நிதியையும் மக்களுக்கே பயன்படுத்துகிறோம். எங்களது பணிகளுக்கு நேரடியாக உதவலாம்.'}
        </p>
      </section>

      {/* Safety & Tax Warnings */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Safety Warning */}
        <div className="rounded-2xl border border-red-200 bg-red-50/50 p-5 flex items-start space-x-3">
          <FaCircleExclamation className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="text-xs font-bold text-red-900 uppercase tracking-wider">
              {lang === 'en' ? 'Important Safety Notice' : 'முக்கிய பாதுகாப்பு அறிவிப்பு'}
            </h4>
            <p className="text-base sm:text-lg text-red-800 leading-relaxed sm:leading-[1.65] text-justify">
              {lang === 'en'
                ? 'Please make payments only to the official trust bank account or UPI ID listed below. Do not send funds to any individual personal account claiming to represent the trust. If in doubt, contact us directly first.'
                : 'தயவுசெய்து கீழே குறிப்பிடப்பட்டுள்ள அறக்கட்டளையின் அதிகாரப்பூர்வ வங்கிக் கணக்கு அல்லது UPI முகவரிக்கு மட்டுமே பணம் அனுப்புங்கள். அறக்கட்டளையின் ஊழியர் என்று கூறி வரும் தனிநபர் கணக்குகளுக்குப் பணம் அனுப்பக் கூடாது.'}
            </p>
          </div>
        </div>

        {/* Tax Exemption Status */}
        <div className="rounded-2xl border border-amber-200 bg-amber-50/50 p-5 flex items-start space-x-3">
          <FaCircleExclamation className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="text-xs font-bold text-amber-950 uppercase tracking-wider">
              {lang === 'en' ? 'Tax Deduction & Exemption Status' : 'வரி விலக்கு நிலைப்பாடு'}
            </h4>
            <p className="text-base sm:text-lg text-amber-900 leading-relaxed sm:leading-[1.65] text-justify">
              {lang === 'en'
                ? 'The trust is registered under deed Doc No. 16/2025. Applications for 12A and 80G tax-exempt registrations are pending. Donations are NOT currently eligible for tax deduction. We will update our notices once granted.'
                : 'எங்களது அறக்கட்டளை 2025-ல் பதிவு செய்யப்பட்டுள்ளது. 12A / 80G வருமான வரி விலக்கிற்கான விண்ணப்பம் தற்போது நிலுவையில் உள்ளது. எனவே தற்போதைய நிலையில் வரி விலக்கு கோர இயலாது என்பதை வெளிப்படையாகத் தெரிவித்துக் கொள்கிறோம்.'}
            </p>
          </div>
        </div>

      </section>

      {/* Official Bank Account Details Table */}
      <section className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="space-y-1 border-b border-gray-100 pb-4">
          <h3 className="font-display text-xl font-bold text-gray-900 flex items-center space-x-2">
            <FaCreditCard className="h-6 w-6 text-emerald-600" />
            <span>{lang === 'en' ? 'Official Banking Credentials' : 'அதிகாரப்பூர்வ வங்கிக் கணக்கு விபரங்கள்'}</span>
          </h3>
          <p className="text-xs sm:text-sm text-gray-900">
            {lang === 'en' ? 'Operated jointly by Chairman and Treasurer. Strictly audited.' : 'தலைவர் மற்றும் பொருளாளரால் மட்டுமே இயக்கப்படும் பாதுகாப்பான கணக்கு.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 space-y-4">
            <div className="rounded-2xl border border-gray-100 bg-white overflow-hidden shadow-xs">
              <table className="w-full text-left text-xs sm:text-sm">
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="px-4 py-3 font-semibold text-gray-900 bg-gray-50/50 w-1/3">{lang === 'en' ? 'Bank Name' : 'வங்கிப் பெயர்'}</td>
                    <td className="px-4 py-3 font-bold text-gray-900">Equitas Small Finance Bank</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-semibold text-gray-900 bg-gray-50/50">{lang === 'en' ? 'Account Name' : 'கணக்கின் பெயர்'}</td>
                    <td className="px-4 py-3 font-bold text-emerald-800">Nallathe Nadakkum Trust</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-semibold text-gray-900 bg-gray-50/50">{lang === 'en' ? 'Account Number' : 'கணக்கு எண்'}</td>
                    <td className="px-4 py-3 font-mono font-bold text-gray-950 tracking-wider">20000300375</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-semibold text-gray-900 bg-gray-50/50">{lang === 'en' ? 'IFSC Code' : 'IFSC குறியீடு'}</td>
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
                      <img src="/icons/paytm.svg" alt="Paytm" className="h-7 w-auto object-contain" />
                    </div>
                    <button 
                      onClick={() => handleCopy('+917540017625', 'paytm')}
                      className="p-1 rounded-md text-gray-900 hover:text-sky-600 hover:bg-sky-50 transition-colors"
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
                    <span className="block text-[10px] text-gray-900 uppercase tracking-wider font-semibold">Paytm Number</span>
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
                      {/*
                        PhonePe SVG has a 1366×768 canvas; the logo lives at
                        roughly x=204-1060, y=257-515. Clip to that region so
                        the rendered mark matches Paytm's visual height (28px).
                        Scale = 28/258 ≈ 0.1085 → rendered img height = 83px.
                      */}
                      <span className="relative block overflow-hidden shrink-0" style={{width: '95px', height: '28px'}}>
                        <img
                          src="/icons/phonepe.svg"
                          alt="PhonePe"
                          className="absolute w-auto"
                          style={{height: '83px', top: '-28px', left: '-22px'}}
                        />
                      </span>
                    </div>
                    <button 
                      onClick={() => handleCopy('+917540017625', 'phonepe')}
                      className="p-1 rounded-md text-gray-900 hover:text-purple-600 hover:bg-purple-50 transition-colors"
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
                    <span className="block text-[10px] text-gray-900 uppercase tracking-wider font-semibold">PhonePe Number</span>
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
                      {/* GPay SVG is 24×24 square; scale up to h-8 to match visual weight */}
                      <img src="/icons/google-pay.svg" alt="Google Pay" className="h-8 w-8 object-contain" />
                    </div>
                    <button 
                      onClick={() => handleCopy('+917540017625', 'gpay')}
                      className="p-1 rounded-md text-gray-900 hover:text-blue-600 hover:bg-blue-50 transition-colors"
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
                    <span className="block text-[10px] text-gray-900 uppercase tracking-wider font-semibold">Google Pay Number</span>
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
            {/* UPI QR Code */}
            <div className="rounded-xl bg-white p-5 border border-emerald-100 shadow-xs flex flex-col items-center text-center space-y-3">
              <h4 className="text-xs sm:text-sm font-bold text-emerald-950 flex items-center space-x-2">
                <span className="flex h-2 w-2 rounded-full bg-emerald-600 animate-pulse"></span>
                <span>{lang === 'en' ? 'Scan & Pay via UPI' : 'UPI மூலம் ஸ்கேன் செய்து செலுத்த'}</span>
              </h4>
              <div className="h-44 w-44 rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 flex flex-col items-center justify-center gap-2 text-gray-900">
                <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0113.5 9.375v-4.5zM13.5 13.5h1.5v1.5h-1.5zM16.5 13.5H18V15h-1.5zM19.5 15H21v1.5h-1.5zM13.5 16.5H15V18h-1.5zM16.5 16.5H18V18h-1.5zM19.5 18H21v1.5h-1.5zM13.5 19.5H15V21h-1.5zM16.5 19.5H18V21h-1.5z" />
                </svg>
                <span className="text-[10px] font-semibold uppercase tracking-wider">
                  {lang === 'en' ? 'QR Code Coming Soon' : 'QR குறியீடு விரைவில்'}
                </span>
              </div>
              <p className="text-base text-gray-900 leading-relaxed">
                {lang === 'en'
                  ? 'Official UPI QR code will be added here. Meanwhile, use the UPI numbers above.'
                  : 'அதிகாரப்பூர்வ UPI QR குறியீடு விரைவில் இங்கே சேர்க்கப்படும். அதுவரை மேலே உள்ள UPI எண்களைப் பயன்படுத்தவும்.'}
              </p>
            </div>

            <div className="rounded-xl bg-gray-50 p-5 border border-gray-200/60 text-xs sm:text-sm text-gray-900 leading-relaxed space-y-3">
              <h4 className="font-bold text-gray-900 flex items-center space-x-1.5">
                <Monogram label="i" size="xs" />
                <span>{lang === 'en' ? 'How to secure your receipt' : 'நன்கொடை ரசீது பெற'}</span>
              </h4>
              <p className="text-justify leading-relaxed">
                {lang === 'en' 
                  ? 'Please notify us of your bank remittance alongside transfer receipts via email or WhatsApp so our treasurer can mail you an official trust donation voucher.'
                  : 'வங்கிக் கணக்கிற்கு பணம் அனுப்பிய பின், அதன் ரசீதை எங்களது வாட்ஸ்அப் அல்லது மின்னஞ்சலுக்கு அனுப்பி வைத்தால் முறையான அறக்கட்டளை ரசீது உங்களுக்கு அனுப்பி வைக்கப்படும்.'}
              </p>
            </div>
            <p className="text-[11px] text-gray-900 text-center italic">
              {lang === 'en' ? '✓ Registered Doc No. 16/2025 Namakkal District, Tamil Nadu.' : '✓ பதிவு எண் 16/2025 நாமக்கல் மாவட்டம், தமிழ்நாடு.'}
            </p>
          </div>
        </div>
      </section>

      {/* Pledge a Donation / Material Support */}
      <section className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 shadow-xs max-w-3xl mx-auto w-full space-y-6">
        <div className="space-y-1 text-center border-b border-gray-100 pb-4">
          <h3 className="font-display text-xl font-bold text-gray-900 flex items-center justify-center space-x-2">
            <FaGift className="h-6 w-6 text-emerald-600" />
            <span>{lang === 'en' ? 'Pledge a Donation / Material Support' : 'பொருட்கள் / உதவிப் பங்களிப்புகளைப் பதிவிட'}</span>
          </h3>
          <p className="text-xs sm:text-sm text-gray-900">
            {lang === 'en' ? 'Prepare a direct acknowledgement request without storing donor details in this browser.' : 'உங்கள் விவரங்களை உலாவியில் சேமிக்காமல் நேரடி உறுதிப்படுத்தல் வரைவைத் தயாரிக்கவும்.'}
          </p>
        </div>

        {donorSuccess ? (
          <div className="text-center py-6 space-y-4">
            <div className="h-12 w-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center text-xl mx-auto">
              ✓
            </div>
            <div className="space-y-1">
              <h4 className="font-display text-base font-bold text-gray-900">{lang === 'en' ? 'Acknowledgement Draft Prepared' : 'உறுதிப்படுத்தல் வரைவு தயாராகிவிட்டது'}</h4>
              <p className="text-xs text-gray-900">
                {lang === 'en' 
                  ? 'Your email app should now open with a pre-filled acknowledgement request instead of publishing donor details in the browser.' 
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
                <label className="text-[10px] font-bold text-gray-900 uppercase tracking-wider block">{lang === 'en' ? 'Your Name' : 'உங்கள் பெயர்'} *</label>
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
                <label className="text-[10px] font-bold text-gray-900 uppercase tracking-wider block">{lang === 'en' ? 'Contact Phone' : 'தொடர்பு எண்'} *</label>
                <input
                  type="tel"
                  required
                  value={donorPhone}
                  onChange={(e) => setDonorPhone(e.target.value)}
                  placeholder="e.g. 9876543210"
                  className="w-full px-3 py-1.5 border border-gray-200 rounded-lg text-xs focus:outline-hidden focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-900 uppercase tracking-wider block">{lang === 'en' ? 'Support Type' : 'பங்களிப்பு வகை'}</label>
                <select
                  value={donationType}
                  onChange={(e) => setDonationType(e.target.value)}
                  className="w-full px-3 py-1.5 border border-gray-200 rounded-lg text-xs bg-white focus:outline-hidden focus:border-emerald-500"
                >
                  <option value="Money">{lang === 'en' ? 'Financial Remittance' : 'நிதிப் பங்களிப்பு'}</option>
                  <option value="Groceries">{lang === 'en' ? 'Groceries / Materials' : 'மளிகைப் பொருட்கள் / பொருளுதவி'}</option>
                  <option value="Blood">{lang === 'en' ? 'Blood Donation' : 'இரத்த நன்கொடை'}</option>
                  <option value="Dress">{lang === 'en' ? 'Clothes / Dress' : 'ஆடைகள் / உடை'}</option>
                </select>
              </div>

              {donationType === 'Money' ? (
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-900 uppercase tracking-wider block">{lang === 'en' ? 'Simulated Amount (₹)' : 'பங்களிப்புத் தொகை (₹)'}</label>
                  <input
                    type="number"
                    value={donationAmt}
                    onChange={(e) => setDonationAmt(e.target.value)}
                    className="w-full px-3 py-1.5 border border-gray-200 rounded-lg text-xs focus:outline-hidden focus:border-emerald-500"
                  />
                </div>
              ) : donationType === 'Blood' ? (
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-900 uppercase tracking-wider block">{lang === 'en' ? 'Blood Type' : 'இரத்த வகை'} *</label>
                  <select
                    value={bloodType}
                    onChange={(e) => setBloodType(e.target.value)}
                    className="w-full px-3 py-1.5 border border-gray-200 rounded-lg text-xs bg-white focus:outline-hidden focus:border-emerald-500"
                  >
                    {['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'].map((bt) => (
                      <option key={bt} value={bt}>{bt}</option>
                    ))}
                  </select>
                </div>
              ) : (
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-900 uppercase tracking-wider block">{lang === 'en' ? 'Describe your donation' : 'உங்கள் நன்கொடையை விவரிக்கவும்'} *</label>
                  <input
                    type="text"
                    required
                    value={donationItem}
                    onChange={(e) => setDonationItem(e.target.value)}
                    placeholder={
                      donationType === 'Dress'
                        ? (lang === 'en' ? 'e.g. 10 shirts, 5 dhotis' : 'எ.கா. 10 சட்டைகள், 5 வேட்டிகள்')
                        : (lang === 'en' ? 'e.g. 1 Bag of Raw Rice (25kg)' : 'எ.கா. 1 மூட்டை அரிசி (25கி)')
                    }
                    className="w-full px-3 py-1.5 border border-gray-200 rounded-lg text-xs focus:outline-hidden focus:border-emerald-500"
                  />
                  {donationType === 'Dress' && (
                    <p className="text-[10px] text-amber-700 leading-snug pt-0.5">
                      {lang === 'en'
                        ? 'Note: Please donate clothes that are gently used or new — not heavily worn — so they can be given with dignity.'
                        : 'குறிப்பு: தயவுசெய்து மிதமாக பயன்படுத்தப்பட்ட அல்லது புதிய ஆடைகளை மட்டும் வழங்கவும் — அதிகம் பயன்படுத்தப்பட்டவை வேண்டாம் — கண்ணியத்துடன் வழங்க உதவும்.'}
                    </p>
                  )}
                </div>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-900 uppercase tracking-wider block">{lang === 'en' ? 'Blessing / Message for the board' : 'வாழ்த்துச் செய்தி / குறிப்பு'}</label>
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
          <h2 className="font-display text-2xl font-bold text-gray-900 flex items-center justify-center gap-2">
            <Monogram label="G" size="sm" />
            <span>{lang === 'en' ? 'Sample Gratitude Board' : 'மாதிரி நன்றிக் கூடம்'}</span>
          </h2>
          <p className="text-xs text-gray-900">
            {lang === 'en' ? 'Illustrative sample acknowledgements only. Real donor data is not stored client-side.' : 'இவை மாதிரி பதிவுகள் மட்டுமே. உண்மையான நன்கொடையாளர் விவரங்கள் கிளையன்ட் உலாவியில் சேமிக்கப்படாது.'}
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
              <div className="absolute top-0 right-0 h-10 w-10 bg-emerald-100/40 rounded-bl-full flex items-center justify-center text-emerald-700 text-[10px] font-bold">
                NN
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="h-7 w-7 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold flex items-center justify-center">
                    {spo.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-900 leading-tight">{spo.name}</h4>
                    <p className="text-[9px] text-gray-900">{spo.date}</p>
                  </div>
                </div>
                <p className="text-xs text-gray-900 italic">
                  "{spo.msg}"
                </p>
              </div>

              <div className="pt-3 border-t border-emerald-100/50 flex justify-between items-center text-[10px]">
                <span className="font-semibold text-gray-900 uppercase tracking-wider">
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
              <FaYoutube className="h-6 w-6 text-red-600 flex-shrink-0 animate-pulse" />
              <span>{lang === 'en' ? 'Watch Trust Activities & Field Footage' : 'எங்களது களப்பணி வீடியோக்களைக் காண்க'}</span>
            </h2>
            <p className="text-base sm:text-lg text-gray-900 leading-relaxed sm:leading-[1.65] max-w-2xl">
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
                src={`https://www.youtube-nocookie.com/embed/${activeVideoId}?autoplay=0&rel=0`}
                title="Trust Activity Video Player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                sandbox="allow-scripts allow-same-origin allow-presentation"
                className="w-full h-full"
              ></iframe>
            </div>
            <div className="bg-emerald-50/40 rounded-xl p-4 border border-emerald-100 flex items-start space-x-3 text-xs text-emerald-800">
              <FaVideo className="h-4 w-4 text-emerald-600 flex-shrink-0 mt-0.5" />
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
              <span className="text-[10px] font-bold text-gray-900 uppercase tracking-widest block">
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
                          <FaPlay className={`h-4 w-4 fill-white text-white ${isActive ? 'animate-pulse' : ''}`} />
                        </div>
                        <span className="absolute bottom-0.5 right-0.5 bg-black/85 text-white font-mono text-[8px] font-bold px-1 rounded">
                          {vid.duration}
                        </span>
                      </div>

                      {/* Video Details */}
                      <div className="flex-1 min-w-0 space-y-1">
                        <span className={`text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded w-fit block ${
                          isActive ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-900'
                        }`}>
                          {vid.category[lang]}
                        </span>
                        <h4 className={`text-xs font-bold leading-tight truncate ${
                          isActive ? 'text-emerald-900' : 'text-gray-800'
                        }`}>
                          {vid.title[lang]}
                        </h4>
                        <p className="text-[9px] text-gray-900">
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
              <FaYoutube className="h-4 w-4 text-red-600 fill-red-600" />
              <span>{lang === 'en' ? 'Subscribe to Trust YouTube Channel' : 'அறக்கட்டளை யூடியூப் சேனல்'}</span>
            </a>
          </div>

        </div>
      </section>

    </div>
  );
}







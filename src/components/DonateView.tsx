import React, { useState, useEffect } from 'react';
import { OFFICIAL_CONTACT, SAMPLE_SPONSORS, buildWhatsAppUrl, hasMeaningfulText, isValidDonationAmount, isValidIndianPhone, isValidPersonName, normalizeIndianPhone, sanitizeSingleLine } from '../security';
import { motion } from 'motion/react';
import {
  FaCircleExclamation, FaCreditCard, FaHeart,
  FaPlay, FaYoutube, FaVideo, FaBuildingColumns, FaMobileScreenButton,
  FaCopy, FaCheck, FaWhatsapp, FaPhone, FaChevronRight
} from 'react-icons/fa6';
import { DonatePreset, faqData } from '../data';
import { saveSubmission } from '../lib/submissions';
import SocialConnect from './SocialConnect';
import { CustomSelect, SelectOption } from './ui/FormControls';

interface DonateViewProps {
  lang: 'en' | 'ta';
  preset?: DonatePreset | null;
  onPresetConsumed?: () => void;
}

const FINANCIAL_PROGRAMS: Record<string, { en: string; ta: string }> = {
  general: { en: 'Where Most Needed', ta: 'மிக அவசியமான இடத்திற்கு' },
  annadhanam: { en: 'Daily Annadhanam', ta: 'தினசரி அன்னதானம்' },
  student: { en: 'Student Support', ta: 'மாணவர்கள் கல்வி' },
  ambulance: { en: 'Ambulance Fuel', ta: 'ஆம்புலன்ஸ் எரிபொருள்' },
  cremation: { en: 'Dignified Last Rites', ta: 'ஆதரவற்றோர் இறுதி மரியாதை' },
  elderly: { en: 'Elderly Rescue', ta: 'முதியோர் மீட்பு' },
  medical: { en: 'Emergency Medical Fund', ta: 'அவசர மருத்துவ நிதி' },
  other: { en: 'Other (please specify)', ta: 'மற்றவை (குறிப்பிடவும்)' },
};

// Suggested contribution amounts per programme. When a programme has presets,
// the amount field becomes a dropdown of these known costs (plus "Other" where
// the visitor may enter a custom amount). Figures are owner-provided.
type AmtOption = { id: string; amount: string; label: { en: string; ta: string } };
type AmtGroup = { heading?: { en: string; ta: string }; options: AmtOption[] };
const AMOUNT_PRESETS: Record<string, { allowOther: boolean; title: { en: string; ta: string }; groups: AmtGroup[] }> = {
  annadhanam: {
    allowOther: true,
    title: { en: 'Sponsor a Meal — Approx. 50 Persons per Session', ta: 'ஒரு வேளை உணவு — ஒவ்வொரு நேரமும் சுமார் 50 பேர்' },
    groups: [
      {
        heading: { en: 'Outdoor Food Distribution (Approx. 50 Persons)', ta: 'வெளிப்புற உணவு வழங்கல் (சுமார் 50 பேர்)' },
        options: [
          { id: 'out-morning', amount: '2000', label: { en: 'Morning — ₹2,000 / 50-person session', ta: 'காலை — ₹2,000 / 50 பேர் உணவு நேரம்' } },
          { id: 'out-afternoon', amount: '3000', label: { en: 'Afternoon — ₹3,000 / 50-person session', ta: 'மதியம் — ₹3,000 / 50 பேர் உணவு நேரம்' } },
          { id: 'out-night', amount: '2000', label: { en: 'Night — ₹2,000 / 50-person session', ta: 'இரவு — ₹2,000 / 50 பேர் உணவு நேரம்' } },
        ],
      },
      {
        heading: { en: 'Food Supplied to Nearby Old-Age Homes (Approx. 50 Persons)', ta: 'அருகிலுள்ள முதியோர் இல்லங்களுக்கு உணவு வழங்கல் (சுமார் 50 பேர்)' },
        options: [
          { id: 'in-morning', amount: '4500', label: { en: 'Morning — ₹4,500 / 50-person session', ta: 'காலை — ₹4,500 / 50 பேர் உணவு நேரம்' } },
          { id: 'in-afternoon', amount: '6000', label: { en: 'Afternoon — ₹6,000 / 50-person session', ta: 'மதியம் — ₹6,000 / 50 பேர் உணவு நேரம்' } },
          { id: 'in-night', amount: '4500', label: { en: 'Night — ₹4,500 / 50-person session', ta: 'இரவு — ₹4,500 / 50 பேர் உணவு நேரம்' } },
        ],
      },
    ],
  },
  student: {
    allowOther: true,
    title: { en: 'Student Support', ta: 'மாணவர்கள் கல்வி உதவி' },
    groups: [
      { options: [{ id: 'tuition', amount: '5000', label: { en: 'Annual Tuition Fee — ₹5,000', ta: 'ஆண்டு கல்விக் கட்டணம் — ₹5,000' } }] },
    ],
  },
  ambulance: {
    allowOther: true,
    title: { en: 'Ambulance Fuel', ta: 'ஆம்புலன்ஸ் எரிபொருள்' },
    groups: [
      { options: [{ id: 'amb-10', amount: '2500', label: { en: '10 Trips — ₹2,500', ta: '10 பயணங்கள் — ₹2,500' } }] },
    ],
  },
  cremation: {
    allowOther: false,
    title: { en: 'Dignified Last Rites', ta: 'ஆதரவற்றோர் இறுதி மரியாதை' },
    groups: [
      { options: [{ id: 'last-rites', amount: '5000', label: { en: 'Dignified Last Rites — ₹5,000', ta: 'இறுதி மரியாதை — ₹5,000' } }] },
    ],
  },
};

/**
 * Donation page for public programme information and safe acknowledgement
 * handoff. This component intentionally avoids client-side persistence for
 * donor data.
 */
export default function DonateView({ lang, preset, onPresetConsumed }: DonateViewProps) {
  // Video content is curated and static so embeds stay predictable and auditable.
  const [activeVideoId, setActiveVideoId] = useState('nTjWxd91AMA');
  const [openDonorQuestion, setOpenDonorQuestion] = useState(-1);
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
        en: 'Future Goals & Vision of Nallathae Nadakkum Trust (Interview)', 
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
  // off through WhatsApp rather than being stored in-browser.
  const [donorName, setDonorName] = useState('');
  const [donorPhone, setDonorPhone] = useState('');
  const [donationAmt, setDonationAmt] = useState('1000');
  const [donationItem, setDonationItem] = useState('');
  const [bloodType, setBloodType] = useState('O+');
  const [bloodOther, setBloodOther] = useState('');
  const [donationType, setDonationType] = useState('Money');
  const [financialProgram, setFinancialProgram] = useState('general');
  const [programOther, setProgramOther] = useState('');
  // Which preset amount option is picked ('other' means a custom amount).
  const [amountPresetId, setAmountPresetId] = useState('');
  const [donorMsg, setDonorMsg] = useState('');
  const [donorLoading, setDonorLoading] = useState(false);
  const [donorSuccess, setDonorSuccess] = useState(false);
  const [donorError, setDonorError] = useState('');

  // Anchor so a preset selection can scroll the visitor straight to the form.
  const formRef = React.useRef<HTMLDivElement>(null);

  // Apply a pre-selection arriving from the home "What Can You Donate" cards.
  useEffect(() => {
    if (!preset) return;
    setDonationType(preset.type);
    if (preset.program) setFinancialProgram(preset.program);
    if (preset.amount) setDonationAmt(preset.amount);
    setDonorSuccess(false);

    // Scroll to the form once the page has laid out, THEN clear the preset.
    // (Clearing earlier would re-run this effect and cancel the pending scroll.)
    const t = setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      onPresetConsumed?.();
    }, 300);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preset]);

  // When the selected programme has preset amounts, keep the amount dropdown in
  // sync: preserve an incoming matching amount, otherwise default to the first.
  useEffect(() => {
    const cfg = AMOUNT_PRESETS[financialProgram];
    if (donationType !== 'Money' || !cfg) {
      setAmountPresetId('');
      return;
    }
    const all = cfg.groups.flatMap((g) => g.options);
    const match = all.find((o) => o.amount === donationAmt);
    if (match) {
      setAmountPresetId(match.id);
    } else {
      setAmountPresetId(all[0].id);
      setDonationAmt(all[0].amount);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [financialProgram, donationType]);

  // Public-facing, sample-only acknowledgement cards.
  const [wallSponsors, setWallSponsors] = useState<any[]>([]);

  // Used for short-lived UI feedback when copying official payment details.
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const donationTypeOptions: SelectOption[] = [
    { value: 'Money', label: lang === 'en' ? 'Financial Remittance' : 'நிதிப் பங்களிப்பு' },
    { value: 'Groceries', label: lang === 'en' ? 'Groceries / Materials' : 'மளிகைப் பொருட்கள் / பொருளுதவி' },
    { value: 'Blood', label: lang === 'en' ? 'Blood Donation' : 'இரத்த நன்கொடை' },
    { value: 'Dress', label: lang === 'en' ? 'Clothes / Dress' : 'ஆடைகள் / உடை' },
    { value: 'Other', label: lang === 'en' ? 'Other' : 'மற்றவை' },
  ];

  const bloodTypeOptions: SelectOption[] = [
    ...['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'].map((bt) => ({ value: bt, label: bt })),
    { value: 'Other', label: lang === 'en' ? 'Other / Not sure' : 'மற்றவை / தெரியாது' },
  ];

  const financialProgramOptions: SelectOption[] = Object.entries(FINANCIAL_PROGRAMS).map(([key, val]) => ({
    value: key,
    label: val[lang],
  }));
  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(type);
    setTimeout(() => setCopiedText(null), 2000);
  };

  // Subtle, accessible copy affordance for official payment values.
  const copyBtn = (value: string, id: string) => (
    <button
      type="button"
      onClick={() => handleCopy(value, id)}
      aria-label={lang === 'en' ? 'Copy to clipboard' : 'நகலெடு'}
      className={`inline-flex items-center justify-center gap-1 rounded-md px-3 py-2 min-h-[2.5rem] text-[11px] font-semibold transition-colors shrink-0 ${
        copiedText === id
          ? 'text-emerald-700 bg-emerald-50'
          : 'text-gray-900 hover:text-emerald-700 hover:bg-emerald-50'
      }`}
    >
      {copiedText === id ? (
        <>
          <FaCheck className="h-3 w-3" />
          <span>{lang === 'en' ? 'Copied' : 'நகலெடுத்தது'}</span>
        </>
      ) : (
        <>
          <FaCopy className="h-3 w-3" />
          <span>{lang === 'en' ? 'Copy' : 'நகல்'}</span>
        </>
      )}
    </button>
  );

  useEffect(() => {
    setWallSponsors([...SAMPLE_SPONSORS]);
  }, []);

  // Create a normalized acknowledgement draft for staff review. No payment is
  // accepted or verified in this client-only flow.
  const handleSponsorSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const normalizedName = sanitizeSingleLine(donorName, 80);
    const normalizedPhone = normalizeIndianPhone(donorPhone);
    const normalizedMessage = sanitizeSingleLine(donorMsg, 160);
    const normalizedItem = sanitizeSingleLine(donationItem, 120);

    if (!isValidPersonName(normalizedName)) {
      setDonorError(lang === 'en' ? 'Donor Name is invalid. Enter a real name using letters, spaces, dots, apostrophes, or hyphens only.' : 'நன்கொடையாளர் பெயர் செல்லுபடியாகவில்லை. சரியான பெயரை மட்டும் உள்ளிடவும்.');
      return;
    }

    if (!isValidIndianPhone(normalizedPhone)) {
      setDonorError(lang === 'en' ? 'Donor Phone / WhatsApp is invalid. Enter a valid 10-digit Indian mobile number.' : 'நன்கொடையாளர் தொலைபேசி / WhatsApp எண் செல்லுபடியாகவில்லை. சரியான 10 இலக்க இந்திய மொபைல் எண்ணை உள்ளிடவும்.');
      return;
    }

    if (donationType === 'Money' && !isValidDonationAmount(donationAmt)) {
      setDonorError(lang === 'en' ? 'Donation Amount is invalid. Enter a whole rupee amount between Rs. 10 and Rs. 10,00,000.' : 'நன்கொடை தொகை செல்லுபடியாகவில்லை. ரூ.10 முதல் ரூ.10,00,000 வரை முழு ரூபாய் தொகையை உள்ளிடவும்.');
      return;
    }

    if (donationType !== 'Money' && donationType !== 'Blood' && !hasMeaningfulText(normalizedItem, 3, 120)) {
      setDonorError(lang === 'en' ? 'Donation Description is required. Describe the item or material you are donating.' : 'நன்கொடை விவரம் தேவை. நீங்கள் வழங்கும் பொருளை விவரிக்கவும்.');
      return;
    }

    setDonorError('');
    setDonorLoading(true);

    const bloodLabel = bloodType === 'Other' ? (sanitizeSingleLine(bloodOther, 40) || 'Other') : bloodType;
    const itemDetail = donationType === 'Money'
      ? `Rs. ${Number(donationAmt).toLocaleString('en-IN')}`
      : donationType === 'Blood'
      ? `${bloodLabel} (${lang === 'en' ? 'Blood Type' : 'இரத்த வகை'})`
      : normalizedItem;

    const donationTypeLabel = {
      'Money': lang === 'en' ? 'Financial Remittance' : 'நிதிப் பங்களிப்பு',
      'Groceries': lang === 'en' ? 'Groceries / Materials' : 'மளிகைப் பொருட்கள் / பொருளுதவி',
      'Blood': lang === 'en' ? 'Blood Donation' : 'இரத்த நன்கொடை',
      'Dress': lang === 'en' ? 'Clothes / Dress' : 'ஆடைகள் / உடை',
    }[donationType] || donationType;

    const programme = donationType === 'Money'
      ? financialProgram === 'other'
        ? (sanitizeSingleLine(programOther, 80) || 'Other')
        : (FINANCIAL_PROGRAMS[financialProgram]?.en ?? financialProgram)
      : 'Not applicable';
    const programLine = donationType === 'Money' ? `Programme: ${programme}` : '';

    const whatsappUrl = buildWhatsAppUrl(OFFICIAL_CONTACT.formsPhone, [
      `Form: Donation Pledge`,
      `Name: ${normalizedName}`,
      `Phone: ${normalizedPhone}`,
      `Support type: ${donationTypeLabel}`,
      programLine,
      `Support detail: ${itemDetail}`,
      `Message: ${normalizedMessage || 'Blessed to support.'}`,
    ]);

    try {
      await saveSubmission('donationPledges', {
        donorName: normalizedName,
        phone: normalizedPhone,
        supportType: donationTypeLabel,
        programme,
        supportDetail: itemDetail,
        message: normalizedMessage || 'Blessed to support.',
      });

      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      setDonorSuccess(true);
      setDonorName('');
      setDonorPhone('');
      setDonationAmt('1000');
      setDonationItem('');
      setBloodType('O+');
      setDonorMsg('');
    } catch {
      setDonorError(lang === 'en' ? 'Could not save your donation pledge. Please try again.' : 'உங்கள் நன்கொடை உறுதியை சேமிக்க முடியவில்லை. மீண்டும் முயற்சிக்கவும்.');
    } finally {
      setDonorLoading(false);
    }
  };

  return (
    <div className="space-y-12 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Title Header */}
      <section className="text-center max-w-3xl mx-auto space-y-4">
        <h1 className="h1-page">
          {lang === 'en' ? 'Your Donation Becomes Direct Help' : 'மக்களுக்கு நேரடியாக உதவ நன்கொடைகள்'}
        </h1>
        <p className="text-gray-900 text-base sm:text-lg leading-relaxed sm:leading-[1.65]">
          {lang === 'en' 
            ? 'Support food, emergency care, dignity, education, and humanitarian service for people who need timely help the most. Every donation supports real, local, and practical service.' 
            : 'நாங்கள் எவ்வித தனிப்பட்ட கமிஷன்களும் இல்லாமல், பெற்ற முழு நிதியையும் மக்களுக்கே பயன்படுத்துகிறோம். எங்களது பணிகளுக்கு நேரடியாக உதவலாம்.'}
        </p>
      </section>

      {/* Official Banking Credentials — symmetrical two-column payment section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-700 via-emerald-600 to-emerald-800 p-5 sm:p-6 lg:p-8 shadow-[0_30px_80px_-30px_rgba(15,61,38,0.75)] ring-1 ring-emerald-900/20 space-y-6">
        <div className="pointer-events-none absolute -left-20 -top-16 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-20 -bottom-16 h-72 w-72 rounded-full bg-brand-gold/15 blur-3xl" />
        {/* Shared header spanning both columns */}
        <div className="relative max-w-2xl mx-auto text-center space-y-2">
          <h3 className="font-display text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
            {lang === 'en' ? 'Donation Details' : 'அதிகாரப்பூர்வ வங்கிக் கணக்கு விபரங்கள்'}
          </h3>
          <p className="text-sm sm:text-base text-emerald-50">
            {lang === 'en' ? 'Give with purpose. Official bank and UPI details are shown below after verification.' : 'தலைவர் மற்றும் பொருளாளரால் மட்டுமே இயக்கப்படும் பாதுகாப்பான கணக்கு.'}
          </p>
          <p className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-100">
            <FaCheck className="h-3 w-3" />
            {lang === 'en'
              ? 'Registered Doc No. 16/2025 · Namakkal District, Tamil Nadu'
              : 'பதிவு எண் 16/2025 · நாமக்கல் மாவட்டம், தமிழ்நாடு'}
          </p>
        </div>

        {/* True 50/50 payment columns */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch">
          {/* LEFT — Bank Transfer */}
          <div className="flex flex-col rounded-2xl border border-white/20 bg-white/95 p-5 sm:p-6 space-y-5">
            <div className="flex items-center gap-2.5 pb-1">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
                <FaBuildingColumns className="h-4 w-4" />
              </span>
              <h4 className="text-sm font-bold uppercase tracking-widest text-gray-900">
                {lang === 'en' ? 'Bank Transfer' : 'வங்கி பரிமாற்றம்'}
              </h4>
            </div>

            <dl className="divide-y divide-gray-200/70">
              <div className="py-3">
                <dt className="text-[10px] font-bold uppercase tracking-wider text-gray-900">
                  {lang === 'en' ? 'Bank Name' : 'வங்கிப் பெயர்'}
                </dt>
                <dd className="mt-0.5 text-sm sm:text-base font-semibold text-gray-900">Equitas Small Finance Bank</dd>
              </div>
              <div className="py-3">
                <dt className="text-[10px] font-bold uppercase tracking-wider text-gray-900">
                  {lang === 'en' ? 'Account Name' : 'கணக்கின் பெயர்'}
                </dt>
                <dd className="mt-0.5 text-sm sm:text-base font-bold text-emerald-800">Nallathae Nadakkum Trust</dd>
              </div>
              <div className="py-3">
                <dt className="text-[10px] font-bold uppercase tracking-wider text-gray-900">
                  {lang === 'en' ? 'Account Number' : 'கணக்கு எண்'}
                </dt>
                <dd className="mt-1 flex items-center justify-between gap-2">
                  <span className="font-display text-base sm:text-lg font-bold text-gray-950 tracking-wider">20000300375</span>
                  {copyBtn('20000300375', 'acct')}
                </dd>
              </div>
              <div className="py-3">
                <dt className="text-[10px] font-bold uppercase tracking-wider text-gray-900">
                  {lang === 'en' ? 'IFSC Code' : 'IFSC குறியீடு'}
                </dt>
                <dd className="mt-1 flex items-center justify-between gap-2">
                  <span className="font-display text-base sm:text-lg font-bold text-gray-950 tracking-wider">ESFB0001138</span>
                  {copyBtn('ESFB0001138', 'ifsc')}
                </dd>
              </div>
            </dl>
          </div>

          {/* RIGHT — UPI / Mobile Payment */}
          <div className="flex flex-col rounded-2xl border border-white/20 bg-white/95 p-5 sm:p-6 space-y-5">
            <div className="flex items-center gap-2.5 pb-1">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
                <FaMobileScreenButton className="h-4 w-4" />
              </span>
              <h4 className="text-sm font-bold uppercase tracking-widest text-gray-900">
                {lang === 'en' ? 'UPI / Mobile Payment' : 'UPI / மொபைல் பேமெண்ட்'}
              </h4>
            </div>

            <div className="flex flex-1 flex-col gap-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-900">
                {lang === 'en' ? 'Scan & Pay via UPI' : 'UPI மூலம் ஸ்கேன் செய்து செலுத்த'}
              </p>

              <div className="mx-auto rounded-2xl border border-gray-200 bg-white p-3 shadow-sm">
                <img
                  src="/upi-qr.png"
                  alt={lang === 'en' ? 'BHIM UPI donation QR code' : 'BHIM UPI நன்கொடை QR குறியீடு'}
                  className="h-44 w-44 object-contain"
                />
              </div>

              <dl className="w-full divide-y divide-gray-200/70 border-y border-gray-200/70 text-left">
                <div className="py-3">
                  <dt className="text-[10px] font-bold uppercase tracking-wider text-gray-900">
                    {lang === 'en' ? 'Account Holder' : 'கணக்கு வைத்திருப்பவர்'}
                  </dt>
                  <dd className="mt-0.5 text-sm sm:text-base font-bold text-emerald-800">
                    Nallathae Nadakkum Trust
                  </dd>
                </div>
                <div className="py-3">
                  <dt className="text-[10px] font-bold uppercase tracking-wider text-gray-900">
                    {lang === 'en' ? 'Mobile / UPI Number' : 'மொபைல் / UPI எண்'}
                  </dt>
                  <dd className="mt-1 flex items-center justify-between gap-2">
                    <span className="font-display text-base sm:text-lg font-bold text-gray-950 tracking-wide">+91 75400 17625</span>
                    {copyBtn('+917540017625', 'upi')}
                  </dd>
                </div>
                <div className="py-3">
                  <dt className="text-[10px] font-bold uppercase tracking-wider text-gray-900">
                    {lang === 'en' ? 'UPI ID' : 'UPI ஐடி'}
                  </dt>
                  <dd className="mt-0.5 font-sans text-xs font-semibold text-gray-500">
                    upi-id-coming-soon
                  </dd>
                </div>
              </dl>

              {/* Brand logos — one shared number, no repeated cards */}
              <div className="mt-auto w-full border-t border-gray-200/70 pt-4 space-y-3">
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-900">
                  {lang === 'en' ? 'Supported UPI Apps' : 'ஆதரிக்கப்படும் UPI செயலிகள்'}
                </p>
                <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                  <img src="/icons/google-pay.svg" alt="Google Pay" className="h-6 w-auto object-contain" />
                  <img src="/icons/phonepe-logo.png" alt="PhonePe" className="h-6 w-auto object-contain" />
                  <img src="/icons/paytm-logo.png" alt="Paytm" className="h-6 w-auto object-contain" />
                </div>
                <p className="text-xs font-medium text-gray-600">
                  {lang === 'en' ? 'Works with any UPI-enabled app' : 'UPI ஆதரவு உள்ள எந்த செயலியிலும் இயங்கும்'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Shared receipt / acknowledgement area below both columns */}
        <div className="rounded-2xl border border-emerald-100 bg-emerald-50/30 p-6 sm:p-7 space-y-4">
          <div className="flex items-center gap-2">
            <FaCircleExclamation className="h-4 w-4 text-emerald-700" />
            <h4 className="text-sm font-bold uppercase tracking-widest text-emerald-950">
              {lang === 'en' ? 'After Making Your Donation' : 'நன்கொடை அளித்த பிறகு'}
            </h4>
          </div>
          <p className="text-sm sm:text-base text-gray-900 leading-relaxed sm:leading-[1.65] max-w-2xl">
            {lang === 'en'
              ? 'Send your payment receipt via WhatsApp or call us directly, and our treasurer will issue you an official trust donation acknowledgement / voucher.'
              : 'உங்கள் பணம் செலுத்திய ரசீதை வாட்ஸ்அப் மூலம் அனுப்புங்கள் அல்லது எங்களை நேரடியாக அழைக்கவும் — முறையான அறக்கட்டளை நன்கொடை ரசீது / வவுச்சர் உங்களுக்கு வழங்கப்படும்.'}
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href={buildWhatsAppUrl(OFFICIAL_CONTACT.whatsappPhone, [
                lang === 'en'
                  ? 'Hello, I have made a donation to Nallathae Nadakkum Trust and would like to share my payment receipt.'
                  : 'வணக்கம், நல்லதே நடக்கும் அறக்கட்டளைக்கு நான் நன்கொடை அளித்துள்ளேன், எனது ரசீதைப் பகிர விரும்புகிறேன்.',
              ])}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700 transition-colors"
            >
              <FaWhatsapp className="h-4 w-4" />
              {lang === 'en' ? 'Send via WhatsApp' : 'வாட்ஸ்அப் மூலம் அனுப்பு'}
            </a>
            <a
              href={`tel:${OFFICIAL_CONTACT.whatsappPhone}`}
              className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-gray-900 hover:border-emerald-300 hover:text-emerald-700 transition-colors"
            >
              <FaPhone className="h-4 w-4" />
              {lang === 'en' ? 'Call Us' : 'எங்களை அழைக்கவும்'}
            </a>
          </div>
        </div>
      </section>

      {/* Safety & Tax Warnings */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Safety Warning */}
        <div className="rounded-2xl border border-red-200 bg-red-50/50 p-5 flex items-start space-x-3">
          <FaCircleExclamation className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h3 className="text-xs font-bold text-red-900 uppercase tracking-wider">
              {lang === 'en' ? 'Important Safety Notice' : 'முக்கிய பாதுகாப்பு அறிவிப்பு'}
            </h3>
            <p className="text-sm sm:text-base text-red-800 leading-relaxed sm:leading-[1.65]">
              {lang === 'en'
                ? 'Please make payments only to the official bank account and UPI details mentioned above. Do not send funds to any individual personal account claiming to represent the trust.'
                : 'தயவுசெய்து மேலே குறிப்பிடப்பட்டுள்ள அதிகாரப்பூர்வ வங்கிக் கணக்கு மற்றும் UPI விவரங்களுக்கு மட்டுமே பணம் அனுப்புங்கள். அறக்கட்டளையை பிரதிநிதித்துவப்படுத்துவதாகக் கூறும் எந்த தனிநபர் கணக்கிற்கும் பணம் அனுப்ப வேண்டாம்.'}
            </p>
          </div>
        </div>

        {/* Tax Exemption Status */}
        <div className="rounded-2xl border border-amber-200 bg-amber-50/50 p-5 flex items-start space-x-3">
          <FaCircleExclamation className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h3 className="text-xs font-bold text-amber-950 uppercase tracking-wider">
              {lang === 'en' ? 'Tax Deduction & Exemption Status' : 'வரி விலக்கு நிலைப்பாடு'}
            </h3>
            <p className="text-sm sm:text-base text-amber-900 leading-relaxed sm:leading-[1.65]">
              {lang === 'en'
                ? 'The trust is registered under deed Doc No. 16/2025. Applications for 12A and 80G tax-exempt registrations are pending. Donations are NOT currently eligible for tax deduction. We will update our notices once granted.'
                : 'எங்களது அறக்கட்டளை 2025-ல் பதிவு செய்யப்பட்டுள்ளது. 12A / 80G வருமான வரி விலக்கிற்கான விண்ணப்பம் தற்போது நிலுவையில் உள்ளது. எனவே தற்போதைய நிலையில் வரி விலக்கு கோர இயலாது என்பதை வெளிப்படையாகத் தெரிவித்துக் கொள்கிறோம்.'}
            </p>
          </div>
        </div>

      </section>

      {/* Pledge a Donation / Material Support */}
      <section ref={formRef} className="scroll-mt-24 bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 shadow-[0_10px_30px_-12px_rgba(16,24,40,0.15)] ring-1 ring-gray-900/[0.04] max-w-4xl mx-auto w-full space-y-6">
        <div className="space-y-2 text-center border-b border-gray-100 pb-5">
          <h3 className="h2-section">
            {lang === 'en' ? 'Pledge a Donation / Material Support' : 'பொருட்கள் / உதவிப் பங்களிப்புகளைப் பதிவிட'}
          </h3>
          <p className="text-sm sm:text-base text-gray-900">
            {lang === 'en' ? 'Prepare a direct acknowledgement request without storing donor details in this browser.' : 'உங்கள் விவரங்களை உலாவியில் சேமிக்காமல் நேரடி உறுதிப்படுத்தல் வரைவைத் தயாரிக்கவும்.'}
          </p>
        </div>

        {donorSuccess ? (
          <div className="text-center py-6 space-y-4">
            <div className="h-12 w-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center text-xl mx-auto">
              <FaCheck className="h-5 w-5" />
            </div>
            <div className="space-y-1">
              <h4 className="font-display text-base font-bold text-gray-900">{lang === 'en' ? 'WhatsApp Message Prepared' : 'வாட்ஸ்அப் செய்தி தயாராகிவிட்டது'}</h4>
              <p className="text-xs text-gray-900">
                {lang === 'en'
                  ? 'WhatsApp should now open with your pledge details pre-filled instead of publishing donor details in the browser. Tap send to share them with us.'
                  : 'உங்கள் பங்களிப்பு விவரங்களுடன் வாட்ஸ்அப் திறக்கும். எங்களுடன் பகிர அனுப்பு பொத்தானை அழுத்தவும்.'}
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
          <form onSubmit={handleSponsorSubmit} className="space-y-5">
            {donorError && (
              <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs font-semibold leading-relaxed text-red-800">
                {donorError}
              </p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-900 tracking-wide block">{lang === 'en' ? 'Your Name' : 'உங்கள் பெயர்'} *</label>
                <input
                  type="text"
                  required
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  placeholder="e.g. S. Kumar"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg text-xs sm:text-sm focus:outline-hidden focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-900 tracking-wide block">{lang === 'en' ? 'Contact Phone' : 'தொடர்பு எண்'} *</label>
                <input
                  type="tel"
                  required
                  value={donorPhone}
                  onChange={(e) => setDonorPhone(e.target.value)}
                  placeholder="10-digit mobile number"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg text-xs sm:text-sm focus:outline-hidden focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-900 tracking-wide block">{lang === 'en' ? 'Support Type' : 'பங்களிப்பு வகை'}</label>
                <CustomSelect
                  value={donationType}
                  onChange={setDonationType}
                  options={donationTypeOptions}
                  ariaLabel={lang === 'en' ? 'Support Type' : 'பங்களிப்பு வகை'}
                />
              </div>

              {donationType === 'Money' ? (
                (() => {
                  const cfg = AMOUNT_PRESETS[financialProgram];
                  const label = (
                    <label className="text-xs font-bold text-gray-900 tracking-wide block">
                      {cfg ? cfg.title[lang] : (lang === 'en' ? 'Simulated Amount (₹)' : 'பங்களிப்புத் தொகை (₹)')}
                    </label>
                  );
                  // Programmes without preset costs keep the free amount entry.
                  if (!cfg) {
                    return (
                      <div className="space-y-1">
                        {label}
                        <input
                          type="number"
                          value={donationAmt}
                          onChange={(e) => setDonationAmt(e.target.value)}
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg text-xs sm:text-sm focus:outline-hidden focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                        />
                      </div>
                    );
                  }
                  const amountOptions: SelectOption[] = [
                    ...cfg.groups.flatMap((g, gi) => [
                      ...(g.heading ? [{ value: `heading-${gi}`, label: g.heading[lang], disabled: true }] : []),
                      ...g.options.map((o) => ({ value: o.id, label: o.label[lang] })),
                    ]),
                    ...(cfg.allowOther ? [{ value: 'other', label: lang === 'en' ? 'Other (enter amount)' : 'மற்றவை (தொகையை உள்ளிடவும்)' }] : []),
                  ];
                  return (
                    <div className="space-y-1">
                      {label}
                      <CustomSelect
                        value={amountPresetId}
                        onChange={(id) => {
                          setAmountPresetId(id);
                          if (id !== 'other') {
                            const opt = cfg.groups.flatMap((g) => g.options).find((o) => o.id === id);
                            if (opt) setDonationAmt(opt.amount);
                          }
                        }}
                        options={amountOptions}
                        ariaLabel={cfg.title[lang]}
                      />
                      {amountPresetId === 'other' && (
                        <input
                          type="number"
                          value={donationAmt}
                          onChange={(e) => setDonationAmt(e.target.value)}
                          placeholder={lang === 'en' ? 'Enter amount (₹)' : 'தொகையை உள்ளிடவும் (₹)'}
                          className="mt-2 w-full px-4 py-2 border border-gray-200 rounded-lg text-xs sm:text-sm focus:outline-hidden focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                        />
                      )}
                    </div>
                  );
                })()
              ) : donationType === 'Blood' ? (
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-900 tracking-wide block">{lang === 'en' ? 'Blood Type' : 'இரத்த வகை'} *</label>
                  <CustomSelect
                    value={bloodType}
                    onChange={setBloodType}
                    options={bloodTypeOptions}
                    ariaLabel={lang === 'en' ? 'Blood Type' : 'இரத்த வகை'}
                  />
                  {bloodType === 'Other' && (
                    <input
                      type="text"
                      value={bloodOther}
                      onChange={(e) => setBloodOther(e.target.value)}
                      placeholder={lang === 'en' ? 'Specify blood type / note' : 'இரத்த வகையைக் குறிப்பிடவும்'}
                      className="mt-2 w-full px-4 py-2 border border-gray-200 rounded-lg text-xs sm:text-sm focus:outline-hidden focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                    />
                  )}
                </div>
              ) : (
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-900 tracking-wide block">{lang === 'en' ? 'Describe your donation' : 'உங்கள் நன்கொடையை விவரிக்கவும்'} *</label>
                  <input
                    type="text"
                    required
                    value={donationItem}
                    onChange={(e) => setDonationItem(e.target.value)}
                    placeholder={
                      donationType === 'Dress'
                        ? (lang === 'en' ? 'e.g. 10 shirts, 5 dhotis' : 'எ.கா. 10 சட்டைகள், 5 வேட்டிகள்')
                        : donationType === 'Other'
                        ? (lang === 'en' ? 'Please describe your donation' : 'உங்கள் நன்கொடையை விவரிக்கவும்')
                        : (lang === 'en' ? 'e.g. 1 Bag of Raw Rice (25kg)' : 'எ.கா. 1 மூட்டை அரிசி (25கி)')
                    }
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg text-xs sm:text-sm focus:outline-hidden focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
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

            {/* Programme selector — only under Financial Remittance */}
            {donationType === 'Money' && (
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-900 tracking-wide block">{lang === 'en' ? 'Programme to Support' : 'ஆதரிக்க விரும்பும் திட்டம்'}</label>
                <CustomSelect
                  value={financialProgram}
                  onChange={setFinancialProgram}
                  options={financialProgramOptions}
                  ariaLabel={lang === 'en' ? 'Programme to Support' : 'ஆதரிக்க விரும்பும் திட்டம்'}
                />
                {financialProgram === 'other' && (
                  <input
                    type="text"
                    value={programOther}
                    onChange={(e) => setProgramOther(e.target.value)}
                    placeholder={lang === 'en' ? 'Specify the programme you wish to support' : 'நீங்கள் ஆதரிக்க விரும்பும் திட்டத்தைக் குறிப்பிடவும்'}
                    className="mt-2 w-full px-4 py-2 border border-gray-200 rounded-lg text-xs sm:text-sm focus:outline-hidden focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                  />
                )}
              </div>
            )}

            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-900 tracking-wide block">{lang === 'en' ? 'Blessing / Message for the board' : 'வாழ்த்துச் செய்தி / குறிப்பு'}</label>
              <input
                type="text"
                value={donorMsg}
                onChange={(e) => setDonorMsg(e.target.value)}
                placeholder="e.g. May Good Things Happen to all!"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg text-xs sm:text-sm focus:outline-hidden focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            <button
              id="submit-donor-pledge"
              type="submit"
              disabled={donorLoading}
              className="w-full rounded-lg bg-emerald-600 py-3 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700 transition-colors disabled:bg-emerald-400 cursor-pointer text-center"
            >
              {donorLoading ? (lang === 'en' ? 'Preparing WhatsApp...' : 'வாட்ஸ்அப் தயாராகிறது...') : (lang === 'en' ? 'Send Donation Pledge via WhatsApp' : 'வாட்ஸ்அப் மூலம் நன்கொடை உறுதியை அனுப்பவும்')}
            </button>

          </form>
        )}
      </section>

      {/*
      Live Sponsors Board (Sponsors Wall of Gratitude)
      Hidden by request; kept here for future restoration.
      <section className="space-y-4 pt-4">
        <div className="text-center space-y-1">
          <h2 className="h2-section">
            {lang === 'en' ? 'Sample Gratitude Board' : 'மாதிரி நன்றிக் கூடம்'}
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
              className="p-5 border border-emerald-100 rounded-2xl bg-emerald-50/20 shadow-[0_10px_30px_-12px_rgba(16,24,40,0.15)] ring-1 ring-gray-900/[0.04] flex flex-col justify-between space-y-4 relative overflow-hidden"
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
                <span className="font-display font-bold text-emerald-700 bg-emerald-100/60 px-2 py-0.5 rounded">
                  {spo.item}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
      */}

      {/* Interactive YouTube Video Showcase */}
      <section className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 shadow-[0_10px_30px_-12px_rgba(16,24,40,0.15)] ring-1 ring-gray-900/[0.04] space-y-6 animate-fade-in">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-gray-100 pb-5">
          <div className="space-y-1">
            <span className="section-eyebrow text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full w-fit block">
              {lang === 'en' ? 'See Impact in Motion' : 'நேரடி ஒளிபரப்பு'}
            </span>
            <h2 className="h2-section flex items-center space-x-2">
              <FaYoutube className="h-6 w-6 text-red-600 flex-shrink-0" />
              <span>{lang === 'en' ? 'Watch Trust Activities & Field Footage' : 'எங்களது களப்பணி வீடியோக்களைக் காண்க'}</span>
            </h2>
            <p className="text-sm sm:text-base text-gray-900 leading-relaxed sm:leading-[1.65] max-w-2xl">
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
                          ? 'border-emerald-600 bg-emerald-50/60 shadow-[0_10px_30px_-12px_rgba(16,24,40,0.15)] ring-1 ring-gray-900/[0.04]' 
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
                        <span className="absolute bottom-0.5 right-0.5 bg-black/85 text-white font-sans text-[8px] font-bold px-1 rounded">
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
                          isActive ? 'text-emerald-900' : 'text-gray-900'
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

      {/* Uploaded screenshot sections hidden by request; keep for future restoration. */}
      {false && (
        <>
          {/* Your money → outcome — concrete proof strip */}
          <section className="rounded-2xl border border-emerald-100 bg-emerald-50/40 p-5 sm:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-emerald-100 text-center">
              {[
                { amt: '₹2,000', out: { en: 'feeds one roadside meal session', ta: 'ஒரு வேளை சாலையோர அன்னதானம்' } },
                { amt: '₹2,500', out: { en: 'fuels 10 emergency ambulance trips', ta: '10 அவசர ஆம்புலன்ஸ் பயணங்கள்' } },
                { amt: '₹5,000', out: { en: 'covers one dignified last rite', ta: 'ஒரு கண்ணியமான இறுதிச் சடங்கு' } },
              ].map((row, i) => (
                <div key={i} className="px-4 py-3 sm:py-1 space-y-1">
                  <p className="font-display text-2xl font-extrabold text-emerald-700">{row.amt}</p>
                  <p className="text-xs sm:text-sm text-gray-900 leading-snug">{row.out[lang]}</p>
                </div>
              ))}
            </div>
            <p className="mt-3 text-center text-[11px] font-semibold text-emerald-800">
              {lang === 'en' ? '0% administrative deductions · 100% reaches the field' : '0% நிர்வாகச் செலவு · 100% நேரடியாக மக்களுக்கு'}
            </p>
          </section>

          {/* Donor confidence — key questions surfaced on the donate page itself */}
          <section className="max-w-4xl mx-auto w-full space-y-6">
            <div className="text-center space-y-1">
              <h2 className="h2-section">
                {lang === 'en' ? 'Before You Give — Common Questions' : 'நன்கொடை அளிக்கும் முன் — பொதுவான கேள்விகள்'}
              </h2>
              <p className="text-sm text-gray-900">
                {lang === 'en' ? 'The essentials donors ask most. See the Transparency page for full legal details.' : 'நன்கொடையாளர்கள் அடிக்கடி கேட்கும் முக்கியக் கேள்விகள். முழு விபரங்களுக்கு வெளிப்படைத்தன்மை பக்கத்தைப் பார்க்கவும்.'}
              </p>
            </div>
            <div className="divide-y divide-gray-100 border-y border-gray-100">
              {faqData.slice(0, 3).map((faq, idx) => (
                <div key={idx}>
                  <button
                    type="button"
                    onClick={() => setOpenDonorQuestion(openDonorQuestion === idx ? -1 : idx)}
                    className="flex min-h-[4.25rem] w-full items-center justify-between gap-4 py-4 text-left font-sans cursor-pointer"
                    aria-expanded={openDonorQuestion === idx}
                  >
                    <span className="font-display text-sm sm:text-base font-bold text-gray-900 leading-snug">
                      {faq.question[lang]}
                    </span>
                    <FaChevronRight
                      className={`h-4 w-4 shrink-0 text-emerald-700 transition-transform ${
                        openDonorQuestion === idx ? 'rotate-90' : ''
                      }`}
                    />
                  </button>
                  {openDonorQuestion === idx && (
                    <div className="pb-5 pr-8">
                      <p className="text-sm sm:text-base text-gray-900 leading-relaxed">
                        {faq.answer[lang]}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      <SocialConnect lang={lang} />

    </div>
  );
}






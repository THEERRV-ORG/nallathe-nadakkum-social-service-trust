import React, { useState } from 'react';
import { OFFICIAL_CONTACT, buildWhatsAppUrl, createReference, hasMeaningfulText, isValidIndianPhone, isValidPersonName, normalizeIndianPhone, sanitizeMultiLine, sanitizeSingleLine } from '../security';
import { saveSubmission } from '../lib/submissions';
import { motion, AnimatePresence } from 'motion/react';
import { FaLocationDot, FaPhone, FaChevronDown, FaChevronRight, FaShieldHalved, FaUserCheck, FaClock, FaCircleInfo, FaHandsHoldingCircle, FaCheck, FaMap, FaArrowUpRightFromSquare } from 'react-icons/fa6';
import { faqData } from '../data';
import Monogram from './Monogram';
import { CustomSelect } from './ui/FormControls';

interface FormsViewProps {
  lang: 'en' | 'ta';
  formType: 'help' | 'volunteer' | 'contact';
}

/**
 * Public intake forms for help requests, volunteer registrations, and general
 * enquiries. Sensitive content is validated and handed off to trusted external
 * channels instead of being stored in the browser.
 */
export default function FormsView({ lang, formType }: FormsViewProps) {
  // Help Form State
  const [helpName, setHelpName] = useState('');
  const [helpPhone, setHelpPhone] = useState('');
  const [helpAddress, setHelpAddress] = useState('');
  const [helpType, setHelpType] = useState('Food');
  const [helpDesc, setHelpDesc] = useState('');
  const [helpUrgency, setHelpUrgency] = useState('Immediate');
  const [helpConsent, setHelpConsent] = useState(false);
  const [helpLoading, setHelpLoading] = useState(false);
  const [helpSuccess, setHelpSuccess] = useState<string | null>(null);
  const [helpError, setHelpError] = useState('');

  // Volunteer Form State
  const [volName, setVolName] = useState('');
  const [volPhone, setVolPhone] = useState('');
  const [volLocation, setVolLocation] = useState('');
  const [volInterests, setVolInterests] = useState<string[]>([]);
  const [volAvailability, setVolAvailability] = useState('Weekends');
  const [volSkills, setVolSkills] = useState('');
  const [volLoading, setVolLoading] = useState(false);
  const [volSuccess, setVolSuccess] = useState<string | null>(null);
  const [volError, setVolError] = useState('');

  // Contact Form State
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactMsg, setContactMsg] = useState('');
  const [contactLoading, setContactLoading] = useState(false);
  const [contactSuccess, setContactSuccess] = useState(false);
  const [contactError, setContactError] = useState('');

  // Contact-page FAQ accordion
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const toggleFaq = (index: number) => setOpenFaqIndex(openFaqIndex === index ? null : index);

  const helpCategoryInfo: Record<string, { title: { en: string; ta: string }; body: { en: string; ta: string } }> = {
    Food: {
      title: { en: 'Food assistance', ta: 'உணவு உதவி' },
      body: { en: 'For families, roadside residents, or elders who need immediate meal support.', ta: 'உடனடி உணவு உதவி தேவைப்படும் குடும்பங்கள், சாலையோர மக்கள் அல்லது முதியோருக்காக.' },
    },
    Ambulance: {
      title: { en: 'Ambulance eligibility', ta: 'ஆம்புலன்ஸ் தகுதி' },
      body: { en: 'For eligible low-income families, subject to verification and vehicle availability. For emergencies, contact the trust directly.', ta: 'தகுதியுள்ள குறைந்த வருமான குடும்பங்களுக்கு மட்டும்; சரிபார்ப்பு மற்றும் வாகன கிடைப்புத் தன்மைக்கு உட்பட்டது. அவசரநிலைகளில் அறக்கட்டளையை நேரடியாகத் தொடர்பு கொள்ளவும்.' },
    },
    'Last Rites': {
      title: { en: 'Last rites coordination', ta: 'இறுதி மரியாதை ஒருங்கிணைப்பு' },
      body: { en: 'Support is coordinated with local authorities where required before any field action.', ta: 'தேவைப்படும் இடங்களில் உள்ளூர் அதிகாரிகளுடன் ஒருங்கிணைத்த பிறகே களப்பணி மேற்கொள்ளப்படும்.' },
    },
    'Elder Rescue': {
      title: { en: 'Elder rescue', ta: 'முதியோர் மீட்பு' },
      body: { en: 'For abandoned or vulnerable elders requiring field verification and safe placement support.', ta: 'கைவிடப்பட்ட அல்லது ஆதரவற்ற முதியோருக்கு களச் சரிபார்ப்பு மற்றும் பாதுகாப்பான தங்குமிடம் உதவி.' },
    },
    Education: {
      title: { en: 'Education support', ta: 'கல்வி உதவி' },
      body: { en: 'For tuition-related requests where documents and family situation can be verified.', ta: 'ஆவணங்கள் மற்றும் குடும்ப நிலை சரிபார்க்கக்கூடிய கல்விக் கட்டண கோரிக்கைகளுக்கு.' },
    },
    Medical: {
      title: { en: 'Medical assistance', ta: 'மருத்துவ உதவி' },
      body: { en: 'For urgent medical or surgery-related support, with documents reviewed before fundraising.', ta: 'அவசர மருத்துவ அல்லது அறுவைசிகிச்சை உதவிக்கு, ஆவணங்கள் சரிபார்த்த பிறகு.' },
    },
    Other: {
      title: { en: 'Other humanitarian need', ta: 'இதர மனிதநேய உதவி' },
      body: { en: 'Share clear details so volunteers can decide the next verification step.', ta: 'அடுத்த சரிபார்ப்பு நடவடிக்கையை தீர்மானிக்க தெளிவான விவரங்களைப் பகிரவும்.' },
    },
  };

  const helpBeforeRows = [
    { icon: <FaUserCheck className="h-4 w-4" />, en: 'Requests are physically verified by trust volunteers.', ta: 'கோரிக்கைகள் தன்னார்வலர்களால் நேரடியாகச் சரிபார்க்கப்படும்.' },
    { icon: <FaShieldHalved className="h-4 w-4" />, en: 'Assistance depends on need and resource availability.', ta: 'உதவி தேவை மற்றும் வளங்களின் கிடைப்பைச் சார்ந்தது.' },
    { icon: <FaPhone className="h-4 w-4" />, en: 'For life-threatening emergencies, contact the trust directly.', ta: 'உயிருக்கு ஆபத்தான அவசரநிலையில் அறக்கட்டளையை நேரடியாக அழைக்கவும்.' },
  ];

  const volunteerBeforeRows = [
    { icon: <FaHandsHoldingCircle className="h-4 w-4" />, en: 'Volunteers may assist with field activities.', ta: 'தன்னார்வலர்கள் களப்பணிகளில் உதவலாம்.' },
    { icon: <FaClock className="h-4 w-4" />, en: 'Assignments depend on current programmes and availability.', ta: 'பணிகள் நடப்பு திட்டங்கள் மற்றும் கிடைக்கும் நேரத்தைச் சார்ந்தவை.' },
    { icon: <FaPhone className="h-4 w-4" />, en: 'The trust may contact applicants before assigning activities.', ta: 'பணி ஒதுக்குவதற்கு முன் அறக்கட்டளை விண்ணப்பதாரரைத் தொடர்பு கொள்ளலாம்.' },
  ];

  const helpTypeOptions = [
    { value: 'Food', label: lang === 'en' ? 'Food Support (Annadhanam)' : 'உணவு உதவி (அன்னதானம்)' },
    { value: 'Ambulance', label: lang === 'en' ? 'Free Ambulance Dispatch' : 'இலவச ஆம்புலன்ஸ் சேவை' },
    { value: 'Last Rites', label: lang === 'en' ? 'Last Rites (Burial/Cremation)' : 'இறுதிச் சடங்கு' },
    { value: 'Elder Rescue', label: lang === 'en' ? 'Elder Rescue and Placement' : 'முதியோர் மீட்பு & இல்ல சேர்க்கை' },
    { value: 'Education', label: lang === 'en' ? 'Education Tuition Sponsorship' : 'கல்வி கட்டண உதவி' },
    { value: 'Medical', label: lang === 'en' ? 'Hospital Surgery Crowdfund' : 'அவசர மருத்துவ உதவி' },
    { value: 'Other', label: lang === 'en' ? 'Other Humanitarian Need' : 'இதர உதவிகள்' },
  ];

  const availabilityOptions = [
    { value: 'Weekends', label: lang === 'en' ? 'Weekends (Saturday/Sunday)' : 'வார இறுதி நாட்கள் (சனி / ஞாயிறு)' },
    { value: 'Weekdays', label: lang === 'en' ? 'Weekdays (Monday-Friday)' : 'வார நாட்கள் (திங்கள் - வெள்ளி)' },
    { value: 'Flexible', label: lang === 'en' ? 'Flexible / Emergency call' : 'அவசர கால அழைப்பின் பேரில்' },
  ];

  const handleInterestToggle = (interest: string) => {
    if (volInterests.includes(interest)) {
      setVolInterests(volInterests.filter(i => i !== interest));
    } else {
      setVolInterests([...volInterests, interest]);
    }
  };

  // Help requests are prepared for WhatsApp handoff so distress data is not
  // left behind in browser storage on a shared device.
  const handleHelpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const normalizedName = sanitizeSingleLine(helpName, 80);
    const normalizedPhone = normalizeIndianPhone(helpPhone);
    const normalizedAddress = sanitizeMultiLine(helpAddress, 220);
    const normalizedDesc = sanitizeMultiLine(helpDesc, 500);

    if (!isValidPersonName(normalizedName)) {
      setHelpError(lang === 'en' ? 'Beneficiary / Contact Name is invalid. Enter a real name using letters, spaces, dots, apostrophes, or hyphens only.' : 'உதவி பெறுபவர் / தொடர்பு பெயர் செல்லுபடியாகவில்லை. சரியான பெயரை மட்டும் உள்ளிடவும்.');
      return;
    }

    if (!isValidIndianPhone(normalizedPhone)) {
      setHelpError(lang === 'en' ? 'Contact Phone / WhatsApp is invalid. Enter a valid 10-digit Indian mobile number.' : 'தொடர்பு எண் / WhatsApp செல்லுபடியாகவில்லை. சரியான 10 இலக்க இந்திய மொபைல் எண்ணை உள்ளிடவும்.');
      return;
    }

    if (!hasMeaningfulText(normalizedAddress, 10, 220)) {
      setHelpError(lang === 'en' ? 'Address / Location Details is too short. Add the door number, street, area, town, or nearby landmark.' : 'முகவரி / இருப்பிட விவரம் போதுமானதாக இல்லை. தெரு, பகுதி, ஊர் அல்லது அருகிலுள்ள அடையாளத்தை சேர்க்கவும்.');
      return;
    }

    if (!hasMeaningfulText(normalizedDesc, 10, 500)) {
      setHelpError(lang === 'en' ? 'Assistance Details is too short. Describe what happened and what help is needed.' : 'உதவி விவரம் போதுமானதாக இல்லை. என்ன நடந்தது மற்றும் என்ன உதவி தேவை என்பதை எழுதவும்.');
      return;
    }

    if (!helpConsent) {
      setHelpError(lang === 'en' ? 'Consent checkbox is required. Please agree to physical verification before submitting.' : 'ஒப்புதல் பெட்டி தேவை. அனுப்புவதற்கு முன் நேரடி சரிபார்ப்புக்கு ஒப்புதல் அளிக்கவும்.');
      return;
    }

    setHelpError('');
    setHelpLoading(true);

    const trackingId = createReference('NN-REQ');
    const whatsappUrl = buildWhatsAppUrl(OFFICIAL_CONTACT.formsPhone, [
      `Form: Request Help`,
      `Reference: ${trackingId}`,
      `Name: ${normalizedName}`,
      `Phone: ${normalizedPhone}`,
      `Address: ${normalizedAddress}`,
      `Need: ${helpType}`,
      `Urgency: ${helpUrgency}`,
      `Situation: ${normalizedDesc}`,
    ]);

    try {
      await saveSubmission('assistanceRequests', {
        reference: trackingId,
        beneficiaryName: normalizedName,
        phone: normalizedPhone,
        assistanceCategory: helpType,
        urgencyLevel: helpUrgency,
        address: normalizedAddress,
        situation: normalizedDesc,
        consent: helpConsent,
      });

      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      setHelpSuccess(trackingId);
      setHelpName('');
      setHelpPhone('');
      setHelpAddress('');
      setHelpDesc('');
      setHelpConsent(false);
    } catch {
      setHelpError(lang === 'en' ? 'Could not save your request. Please try again.' : 'உங்கள் கோரிக்கையை சேமிக்க முடியவில்லை. மீண்டும் முயற்சிக்கவும்.');
    } finally {
      setHelpLoading(false);
    }
  };

  // Volunteer details are routed to a WhatsApp message for staff follow-up.
  const handleVolSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const normalizedName = sanitizeSingleLine(volName, 80);
    const normalizedPhone = normalizeIndianPhone(volPhone);
    const normalizedLocation = sanitizeSingleLine(volLocation, 120);
    const normalizedSkills = sanitizeMultiLine(volSkills, 300);

    if (!isValidPersonName(normalizedName)) {
      setVolError(lang === 'en' ? 'Your Full Name is invalid. Enter a real name using letters, spaces, dots, apostrophes, or hyphens only.' : 'தன்னார்வலர் பெயர் செல்லுபடியாகவில்லை. சரியான பெயரை மட்டும் உள்ளிடவும்.');
      return;
    }

    if (!isValidIndianPhone(normalizedPhone)) {
      setVolError(lang === 'en' ? 'WhatsApp Phone Number is invalid. Enter a valid 10-digit Indian mobile number.' : 'WhatsApp எண் செல்லுபடியாகவில்லை. சரியான 10 இலக்க இந்திய மொபைல் எண்ணை உள்ளிடவும்.');
      return;
    }

    if (normalizedLocation.length < 3) {
      setVolError(lang === 'en' ? 'Your Location / Town is too short. Enter your area, town, or nearby landmark.' : 'வாழும் இடம் / இருப்பிடம் போதுமானதாக இல்லை. உங்கள் பகுதி அல்லது ஊரை உள்ளிடவும்.');
      return;
    }

    if (volInterests.length === 0) {
      setVolError(lang === 'en' ? 'Areas of Interest is required. Choose at least one volunteer area.' : 'பங்களிக்க விரும்பும் பகுதி தேவை. குறைந்தபட்சம் ஒன்றைத் தேர்வு செய்யவும்.');
      return;
    }

    if (volInterests.length > 6) {
      setVolError(lang === 'en' ? 'Areas of Interest has too many selections. Choose up to 6 volunteer areas.' : 'பங்களிக்க விரும்பும் பகுதிகள் அதிகமாக உள்ளன. அதிகபட்சம் 6 பகுதிகளைத் தேர்வு செய்யவும்.');
      return;
    }

    setVolError('');
    setVolLoading(true);

    const trackingId = createReference('NN-VOL');
    const whatsappUrl = buildWhatsAppUrl(OFFICIAL_CONTACT.formsPhone, [
      `Form: Volunteer Registration`,
      `Reference: ${trackingId}`,
      `Name: ${normalizedName}`,
      `Phone: ${normalizedPhone}`,
      `Location: ${normalizedLocation}`,
      `Availability: ${volAvailability}`,
      `Interests: ${volInterests.join(', ')}`,
      `Skills: ${normalizedSkills || 'Not provided'}`,
    ]);

    try {
      await saveSubmission('volunteerApplications', {
        reference: trackingId,
        name: normalizedName,
        phone: normalizedPhone,
        location: normalizedLocation,
        availability: volAvailability,
        interests: volInterests,
        skillsMessage: normalizedSkills,
      });

      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      setVolSuccess(trackingId);
      setVolName('');
      setVolPhone('');
      setVolLocation('');
      setVolInterests([]);
      setVolSkills('');
    } catch {
      setVolError(lang === 'en' ? 'Could not save your volunteer application. Please try again.' : 'தன்னார்வ விண்ணப்பத்தை சேமிக்க முடியவில்லை. மீண்டும் முயற்சிக்கவும்.');
    } finally {
      setVolLoading(false);
    }
  };

  // General enquiries follow the same pattern: validate first, then hand off
  // to a WhatsApp message rather than creating local-only pseudo-submissions.
  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const normalizedName = sanitizeSingleLine(contactName, 80);
    const normalizedPhone = normalizeIndianPhone(contactPhone);
    const normalizedMessage = sanitizeMultiLine(contactMsg, 500);

    if (!isValidPersonName(normalizedName)) {
      setContactError(lang === 'en' ? 'Your Name is invalid. Enter a real name using letters, spaces, dots, apostrophes, or hyphens only.' : 'உங்கள் பெயர் செல்லுபடியாகவில்லை. சரியான பெயரை மட்டும் உள்ளிடவும்.');
      return;
    }

    if (!isValidIndianPhone(normalizedPhone)) {
      setContactError(lang === 'en' ? 'Your Phone Number is invalid. Enter a valid 10-digit Indian mobile number.' : 'உங்கள் தொடர்பு எண் செல்லுபடியாகவில்லை. சரியான 10 இலக்க இந்திய மொபைல் எண்ணை உள்ளிடவும்.');
      return;
    }

    if (!hasMeaningfulText(normalizedMessage, 10, 500)) {
      setContactError(lang === 'en' ? 'Your Message or Enquiry is too short. Enter at least a short, clear message.' : 'உங்கள் செய்தி / கேள்வி போதுமானதாக இல்லை. தெளிவான செய்தியை உள்ளிடவும்.');
      return;
    }

    setContactError('');
    setContactLoading(true);

    const whatsappUrl = buildWhatsAppUrl(OFFICIAL_CONTACT.formsPhone, [
      `Form: Contact / Enquiry`,
      `Name: ${normalizedName}`,
      `Phone: ${normalizedPhone}`,
      `Message: ${normalizedMessage}`,
    ]);

    try {
      await saveSubmission('contactMessages', {
        name: normalizedName,
        phone: normalizedPhone,
        message: normalizedMessage,
      });

      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      setContactSuccess(true);
      setContactName('');
      setContactPhone('');
      setContactMsg('');
    } catch {
      setContactError(lang === 'en' ? 'Could not save your message. Please try again.' : 'உங்கள் செய்தியை சேமிக்க முடியவில்லை. மீண்டும் முயற்சிக்கவும்.');
    } finally {
      setContactLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8 space-y-8">
      
      {/* RENDER REQUEST HELP FORM */}
      {formType === 'help' && (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
          
          {/* Left Side: Form Details & Disclaimer */}
          <div className="lg:col-span-5 xl:col-span-4 space-y-5">
            <div className="space-y-3">
              <span className="section-eyebrow text-brand-orange-700">
                {lang === 'en' ? 'Community & Support' : 'உதவி மையப்பகுதி'}
              </span>
              <h1 className="h1-page">
                {lang === 'en' ? 'Request Help' : 'உதவி கோருங்கள்'}
              </h1>
              <p className="text-gray-900 form-copy">
                {lang === 'en'
                  ? 'Use this form when you are facing genuine need related to food support, ambulance assistance, elderly rescue, educational support, emergency medical fundraising, or another humanitarian concern within the trust’s scope. Share location, type of need, urgency, and any documents if relevant.'
                  : 'உங்களுக்கோ அல்லது உங்கள் பகுதியில் வசிக்கும் யாராவது ஒருவருக்கு அவசரமாக உணவு, முதியோர் மீட்பு, மருத்துவ உதவி அல்லது கல்வி கட்டண உதவி தேவைப்பட்டால் கீழே உள்ள படிவத்தை நிரப்பவும். எங்களது தன்னார்வலர்கள் 24-48 மணி நேரத்திற்குள் நேரில் வந்து விசாரித்து உதவுவர்.'}
              </p>
            </div>

            <div className="border-y border-brand-orange-100 py-3">
              <p className="text-xs font-bold uppercase tracking-wider text-gray-900">
                {lang === 'en' ? 'Life-threatening emergency?' : 'உயிருக்கு ஆபத்தான அவசரநிலையா?'}
              </p>
              <p className="mt-1 text-sm text-gray-900">
                {lang === 'en' ? 'Call us directly for immediate help.' : 'உடனடி உதவிக்கு எங்களை நேரடியாக அழைக்கவும்.'}
              </p>
              <a href={`tel:${OFFICIAL_CONTACT.formsPhone}`} className="mt-2 inline-flex items-center gap-2 text-base font-bold text-emerald-800 hover:text-emerald-900">
                <FaPhone className="h-4 w-4" />
                +91 75400 17625
              </a>
            </div>

            <div className="space-y-3">
              <h3 className="font-display text-sm font-bold uppercase tracking-wider text-gray-900">
                {lang === 'en' ? 'Before You Request' : 'கோருவதற்கு முன்'}
              </h3>
              <div className="divide-y divide-gray-100">
                {helpBeforeRows.map((item, idx) => (
                  <div key={idx} className="flex gap-3 py-2.5 first:pt-0 last:pb-0">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-orange-50 text-brand-orange-700">
                      {item.icon}
                    </span>
                    <p className="pt-1 text-sm leading-relaxed text-gray-900">{item[lang]}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side: Form */}
          <div className="lg:col-span-7 xl:col-span-8 bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 shadow-[0_10px_30px_-12px_rgba(16,24,40,0.15)] ring-1 ring-gray-900/[0.04]">
            {helpSuccess ? (
              <div className="text-center py-10 space-y-6">
                <div className="h-16 w-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center text-3xl mx-auto">
                  <FaCheck className="h-7 w-7" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-display text-lg font-bold text-gray-900">
                    {lang === 'en' ? 'Secure Contact Draft Prepared' : 'பாதுகாப்பான தொடர்பு வரைவு தயாராகிவிட்டது'}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-900">
                    {lang === 'en' 
                      ? 'A WhatsApp handoff was prepared instead of storing this request in your browser.' 
                      : 'உங்கள் விண்ணப்பம் வெற்றிகரமாகப் பதிவேற்றப்பட்டு, ஆய்வில் உள்ளது.'}
                  </p>
                  <div className="inline-block bg-emerald-50 border border-emerald-200 text-emerald-800 font-display text-sm font-bold px-4 py-2 rounded-lg mt-2">
                    {lang === 'en' ? 'Reference:' : 'குறிப்பு எண்:'} {helpSuccess}
                  </div>
                </div>
                <p className="text-xs text-gray-900">
                  {lang === 'en'
                    ? 'For emergencies, call the trust directly as well. This site no longer stores distress requests on shared devices.'
                    : 'தயவுசெய்து உங்களது தொலைபேசியை தொடர்பில் வைத்திருக்கவும். தன்னார்வலர் விரைவில் அழைப்பார்.'}
                </p>
                <button
                  id="reset-help-success"
                  onClick={() => setHelpSuccess(null)}
                  className="rounded-lg bg-emerald-600 text-white font-semibold text-xs px-5 py-2 hover:bg-emerald-700 cursor-pointer"
                >
                  {lang === 'en' ? 'Submit Another Request' : 'மற்றொரு கோரிக்கை அனுப்ப'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleHelpSubmit} className="space-y-4">
                {helpError && (
                  <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs font-semibold leading-relaxed text-red-800">
                    {helpError}
                  </p>
                )}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-900 tracking-wide block">
                    {lang === 'en' ? '1. Assistance Category' : '1. தேவைப்படும் உதவி வகை'}
                  </label>
                  <CustomSelect
                    value={helpType}
                    onChange={setHelpType}
                    options={helpTypeOptions}
                    ariaLabel={lang === 'en' ? 'Assistance Category' : 'தேவைப்படும் உதவி வகை'}
                  />
                  <div className="min-h-[4.5rem] rounded-lg border border-emerald-100 bg-emerald-50/55 px-3 py-2">
                    <div className="flex gap-2">
                      <FaCircleInfo className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-700" />
                      <div className="space-y-1">
                        <p className="text-xs font-bold text-emerald-900">
                          {helpCategoryInfo[helpType]?.title[lang]}
                        </p>
                        <p className="text-xs leading-relaxed text-gray-900">
                          {helpCategoryInfo[helpType]?.body[lang]}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* Name */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-900 tracking-wide block">
                      {lang === 'en' ? '2. Beneficiary / Contact Name' : '2. உதவி பெறுபவர் / தகவல் அளிப்பவர் பெயர்'} *
                    </label>
                    <input
                      type="text"
                      required
                      value={helpName}
                      onChange={(e) => setHelpName(e.target.value)}
                      placeholder="e.g. S. Kumar"
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg form-field focus:outline-hidden focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-900 tracking-wide block">
                      {lang === 'en' ? '3. Contact Phone / WhatsApp' : '3. தொடர்பு எண் / WhatsApp'} *
                    </label>
                    <input
                      type="tel"
                      required
                      value={helpPhone}
                      onChange={(e) => setHelpPhone(e.target.value)}
                      placeholder="10-digit mobile number"
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg form-field focus:outline-hidden focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>

                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Urgency */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-900 tracking-wide block">
                      {lang === 'en' ? '4. Urgency Level' : '4. அவசர நிலை'}
                    </label>
                    <div className="grid grid-cols-1 gap-2 pt-1 sm:grid-cols-3">
                      {['Immediate', 'Within a Week', 'Ongoing'].map((lvl) => (
                        <label
                          key={lvl}
                          className={`relative flex min-h-10 items-center justify-center rounded-lg border px-3 text-center text-xs font-semibold transition-colors cursor-pointer ${
                            helpUrgency === lvl
                              ? 'border-emerald-300 bg-emerald-50 text-emerald-900'
                              : 'border-gray-200 bg-white text-gray-900 hover:border-emerald-200 hover:bg-emerald-50/40'
                          }`}
                        >
                          <input
                            type="radio"
                            name="urgency"
                            value={lvl}
                            checked={helpUrgency === lvl}
                            onChange={() => setHelpUrgency(lvl)}
                            className="sr-only"
                          />
                          <span>
                            {lvl === 'Immediate' ? (lang === 'en' ? 'Urgent today' : 'இன்று அவசரம்') :
                             lvl === 'Within a Week' ? (lang === 'en' ? 'Within 7 days' : '7 நாட்களுக்குள்') :
                             (lang === 'en' ? 'Ongoing support' : 'தொடர்ச்சியான உதவி')}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Address */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-900 tracking-wide block">
                    {lang === 'en' ? '5. Address / Location Details' : '5. முகவரி / இருப்பிட விவரங்கள்'} *
                  </label>
                  <input
                    type="text"
                    required
                    value={helpAddress}
                    onChange={(e) => setHelpAddress(e.target.value)}
                    placeholder="e.g. Door No, Street Name, Tiruchengode Taluk"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg form-field focus:outline-hidden focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                  />
                </div>

                {/* Situation Description */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-900 tracking-wide block">
                    {lang === 'en' ? '6. Describe what happened / assistance needed' : '6. சூழ்நிலை அல்லது தேவையின் முழு விபரம்'} *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={helpDesc}
                    onChange={(e) => setHelpDesc(e.target.value)}
                    placeholder={lang === 'en' ? 'Describe why assistance is needed...' : 'உதவி தேவைப்படுவதற்கான காரணத்தை விரிவாக எழுதவும்...'}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg form-field focus:outline-hidden focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                  />
                </div>

                {/* Consent Checkbox */}
                <div className="relative flex items-start py-2">
                  <div className="relative flex h-5 w-5 shrink-0 items-center">
                    <input
                      id="consent-check"
                      type="checkbox"
                      required
                      checked={helpConsent}
                      onChange={(e) => setHelpConsent(e.target.checked)}
                      className="peer absolute inset-0 z-10 h-5 w-5 cursor-pointer opacity-0"
                      aria-label={lang === 'en' ? 'Consent to physical verification' : 'நேரடி சரிபார்ப்புக்கு ஒப்புதல்'}
                    />
                    <span className="flex h-5 w-5 items-center justify-center rounded-md border border-gray-300 bg-white text-white transition-colors peer-checked:border-emerald-600 peer-checked:bg-emerald-600 peer-focus-visible:ring-2 peer-focus-visible:ring-emerald-600/20">
                      <FaCheck className="h-3 w-3" />
                    </span>
                  </div>
                  <div className="ml-3 text-xs">
                    <p className="font-medium text-gray-900">
                      {lang === 'en' 
                        ? 'I consent to the physical verification of these details by the trust volunteers.' 
                        : 'இந்த விவரங்கள் உண்மை என்றும், தன்னார்வலர்கள் நேரில் வந்து சரிபார்க்க முழு ஒப்புதல் அளிக்கிறேன்.'} *
                    </p>
                  </div>
                </div>

                {/* Submit button */}
                <button
                  id="submit-help-request"
                  type="submit"
                  disabled={helpLoading}
                  className="w-full rounded-lg bg-emerald-600 py-3 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700 transition-all cursor-pointer disabled:bg-emerald-400"
                >
                  {helpLoading ? (lang === 'en' ? 'Preparing request...' : 'கோரிக்கை தயாராகிறது...') : (lang === 'en' ? 'Submit Assistance Request' : 'உதவி கோரிக்கையை அனுப்பவும்')}
                </button>

              </form>
            )}
          </div>

        </div>
      )}

      {/* RENDER VOLUNTEER REGISTRATION FORM */}
      {formType === 'volunteer' && (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
          
          {/* Left Column: Vol details */}
          <div className="lg:col-span-5 xl:col-span-4 space-y-5">
            <div className="space-y-3">
              <span className="section-eyebrow text-brand-blue-700">
                {lang === 'en' ? 'Community & Support' : 'எங்களுடன் தன்னார்வமாக இணைக'}
              </span>
              <h1 className="h1-page">
                {lang === 'en' ? 'Volunteer With Us' : 'உங்கள் நேரத்தை வழங்கி நேரடி தாக்கத்தை உருவாக்குங்கள்'}
              </h1>
              <p className="text-gray-900 form-copy">
                {lang === 'en'
                  ? 'The trust’s work grows stronger when compassionate people contribute their time, energy, skills, and presence. Volunteers may help with food preparation and distribution, logistics and transport support, elderly support activities, documentation, social media support, campaign drives, and event or awareness coordination.'
                  : 'எங்கள் அறக்கட்டளையில் சம்பளம் பெறும் ஊழியர்கள் யாரும் இல்லை. வாரத்தில் ஒரு சில மணிநேரங்களை சமூகத்திற்காக வழங்கத் துடிக்கும் தன்னார்வலர்களை மட்டுமே நம்பியே எங்களது பணிகள் நடக்கின்றன. காலையில் உணவு பேக்கிங் செய்தல், முதியோர் மீட்பு, கள விசாரணை என ஏதேனும் ஒரு பணியில் உங்களை இணைத்துக் கொள்ளலாம்.'}
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="font-display text-sm font-bold uppercase tracking-wider text-gray-900">
                {lang === 'en' ? 'Before You Volunteer' : 'தன்னார்வத்திற்கு முன்'}
              </h3>
              <div className="divide-y divide-gray-100">
                {volunteerBeforeRows.map((item, idx) => (
                  <div key={idx} className="flex gap-3 py-2.5 first:pt-0 last:pb-0">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-blue-50 text-brand-blue-700">
                      {item.icon}
                    </span>
                    <p className="pt-1 text-sm leading-relaxed text-gray-900">{item[lang]}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Volunteer Form */}
          <div className="lg:col-span-7 xl:col-span-8 bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 shadow-[0_10px_30px_-12px_rgba(16,24,40,0.15)] ring-1 ring-gray-900/[0.04]">
            {volSuccess ? (
              <div className="text-center py-10 space-y-6">
                <div className="h-16 w-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center text-3xl mx-auto">
                  <FaCheck className="h-7 w-7" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-display text-lg font-bold text-gray-900">
                    {lang === 'en' ? 'WhatsApp Message Prepared' : 'வாட்ஸ்அப் செய்தி தயாரானது'}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-900">
                    {lang === 'en'
                      ? 'WhatsApp should now open with your volunteer details pre-filled. Tap send to complete your registration.'
                      : 'உங்கள் தன்னார்வ விவரங்களுடன் வாட்ஸ்அப் திறக்கும். பதிவை முடிக்க அனுப்பு பொத்தானை அழுத்தவும்.'}
                  </p>
                  <div className="inline-block bg-emerald-50 border border-emerald-200 text-emerald-800 font-display text-sm font-bold px-4 py-2 rounded-lg mt-2">
                    {lang === 'en' ? 'Reference:' : 'குறிப்பு எண்:'} {volSuccess}
                  </div>
                </div>
                <p className="form-copy text-gray-900 max-w-sm mx-auto">
                  {lang === 'en'
                    ? 'This website no longer stores volunteer applications locally. Please send the prepared WhatsApp message from your trusted device.'
                    : 'நமது ஒருங்கிணைப்பாளர் விரைவில் வாட்ஸ்அப் மூலம் தொடர்புகொண்டு அடுத்தகட்டப் பணிகள் குறித்து விவரிப்பார்.'}
                </p>
                <button
                  id="reset-vol-success"
                  onClick={() => setVolSuccess(null)}
                  className="rounded-lg bg-emerald-600 text-white font-semibold text-xs px-5 py-2 hover:bg-emerald-700 cursor-pointer"
                >
                  {lang === 'en' ? 'Register Another Profile' : 'மற்றொரு நபரை பதிவு செய்ய'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleVolSubmit} className="space-y-4">
                {volError && (
                  <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs font-semibold leading-relaxed text-red-800">
                    {volError}
                  </p>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* Name */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-900 tracking-wide block">
                      {lang === 'en' ? '1. Your Full Name' : '1. தன்னார்வலர் பெயர்'} *
                    </label>
                    <input
                      type="text"
                      required
                      value={volName}
                      onChange={(e) => setVolName(e.target.value)}
                      placeholder="e.g. S. Kumar"
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg form-field focus:outline-hidden focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-900 tracking-wide block">
                      {lang === 'en' ? '2. WhatsApp Phone Number' : '2. WhatsApp எண்'} *
                    </label>
                    <input
                      type="tel"
                      required
                      value={volPhone}
                      onChange={(e) => setVolPhone(e.target.value)}
                      placeholder="10-digit mobile number"
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg form-field focus:outline-hidden focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>

                </div>

                {/* Location & Availability */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* Location */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-900 tracking-wide block">
                      {lang === 'en' ? '3. Your Location / Town' : '3. வாழும் இடம் / இருப்பிடம்'} *
                    </label>
                    <input
                      type="text"
                      required
                      value={volLocation}
                      onChange={(e) => setVolLocation(e.target.value)}
                      placeholder="e.g. Rajeev Nagar, Tiruchengode"
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg form-field focus:outline-hidden focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>

                  {/* Availability */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-900 tracking-wide block">
                      {lang === 'en' ? '4. Your Availability' : '4. எப்போது வர இயலும்'}
                    </label>
                    <CustomSelect
                      value={volAvailability}
                      onChange={setVolAvailability}
                      options={availabilityOptions}
                      ariaLabel={lang === 'en' ? 'Your Availability' : 'எப்போது வர இயலும்'}
                    />
                  </div>

                </div>

                {/* Interests checkboxes */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-900 tracking-wide block">
                    {lang === 'en' ? '5. Areas of Interest' : '5. பங்களிக்க விரும்பும் பகுதிகள்'} ({lang === 'en' ? 'choose at least one' : 'குறைந்தபட்சம் ஒன்றைத் தேர்வு செய்யவும்'}) *
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                    {[
                      { id: 'Food packing', label: { en: 'Food cooking & meal packing', ta: 'காலை உணவு தயாரித்தல் & பேக்கிங்' } },
                      { id: 'Ambulance logs', label: { en: 'Ambulance operations logs', ta: 'ஆம்புலன்ஸ் அவசர அழைப்புகள் ஒருங்கிணைப்பு' } },
                      { id: 'Burials assistance', label: { en: 'Last rites cemetery assistance', ta: 'இறுதி மரியாதைக் களப்பணி' } },
                      { id: 'Field verification', label: { en: 'Street elder rescue & case audits', ta: 'முதியோர் மீட்பு & நேரடி கள விசாரணை' } },
                      { id: 'Tuition support', label: { en: 'Liaising student sponsorships', ta: 'ஏழை மாணவர்களைத் தேர்ந்தெடுத்து உதவுதல்' } },
                      { id: 'Social media', label: { en: 'Social media updating & photography', ta: 'புகைப்படம் & சமூக ஊடகப் பகிர்வு' } }
                    ].map((item) => (
                      <label 
                        key={item.id} 
                        className={`flex items-start p-2.5 border rounded-lg cursor-pointer transition-colors ${
                          volInterests.includes(item.id) 
                            ? 'bg-emerald-50 border-emerald-300 text-emerald-900' 
                            : 'bg-white border-gray-100 hover:bg-gray-50'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={volInterests.includes(item.id)}
                          onChange={() => handleInterestToggle(item.id)}
                          className="peer sr-only"
                        />
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-white text-white transition-colors peer-checked:border-emerald-600 peer-checked:bg-emerald-600 peer-focus-visible:ring-2 peer-focus-visible:ring-emerald-600/20">
                          <FaCheck className="h-3 w-3" />
                        </span>
                        <span className="text-xs font-semibold ml-2.5 leading-tight">{item.label[lang]}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Relevant Skills */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-900 tracking-wide block">
                    {lang === 'en' ? '6. Any specific skills / message' : '6. திறமைகள் / இதர தகவல்கள்'}
                  </label>
                  <textarea
                    rows={2}
                    value={volSkills}
                    onChange={(e) => setVolSkills(e.target.value)}
                    placeholder={lang === 'en' ? 'Describe any skills like photography, heavy vehicle driving license, legal, audit, or first-aid training...' : 'வாகனம் ஓட்டுநர் உரிமம், முதலுதவிப் பயிற்சி, கம்ப்யூட்டர், சமையல் போன்ற உங்களுக்கு தெரிந்த கூடுதல் திறன்கள்...'}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg form-field focus:outline-hidden focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                  />
                </div>

                {/* Submit */}
                <button
                  id="submit-volunteer-reg"
                  type="submit"
                  disabled={volLoading}
                  className="w-full rounded-lg bg-emerald-600 py-3 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700 transition-all cursor-pointer disabled:bg-emerald-400"
                >
                  {volLoading ? (lang === 'en' ? 'Registering...' : 'பதிவு செய்யப்படுகிறது...') : (lang === 'en' ? 'Submit Registration Application' : 'தன்னார்வலராகப் பதிவு செய்ய விண்ணப்பிக்கவும்')}
                </button>

              </form>
            )}
          </div>

        </div>
      )}

      {/* RENDER CONTACT FORM */}
      {formType === 'contact' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Coordinates */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-4">
              <span className="section-eyebrow text-brand-violet-700 bg-brand-violet-50 px-2.5 py-1 rounded-full">
                {lang === 'en' ? 'Direct Coordinates' : 'தொடர்பு விபரம்'}
              </span>
              <h1 className="h1-page">
                {lang === 'en' ? 'We Are Here to Listen and Respond' : 'நேரடியாகத் தொடர்பு கொள்ள'}
              </h1>
              <p className="text-gray-900 form-copy">
                {lang === 'en'
                  ? 'Whether you need support, want to volunteer, wish to donate, or would like to connect for community collaboration, we welcome your message. For emergency ambulance requirements or reporting abandoned elderly, call us immediately.'
                  : 'உங்கள் ஒவ்வொரு தொடர்பும் எங்களுக்கு முக்கியம். உதவி கோர, நன்கொடை வழங்க, தன்னார்வலராக இணைய, அல்லது கூட்டாண்மை பற்றி பேச—எங்களை எப்போதும் அணுகலாம்.'}
              </p>
            </div>

            <div className="space-y-4 pt-2">
              <div className="flex items-start space-x-3.5">
                <div className="h-8 w-8 shrink-0 rounded-full bg-brand-violet-50 text-brand-violet-700 flex items-center justify-center">
                  <FaLocationDot className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider">{lang === 'en' ? 'Office address' : 'அலுவலக முகவரி'}</h4>
                  <p className="text-sm sm:text-base text-gray-900 leading-relaxed sm:leading-[1.65] mt-1">
                    Door No. 38/5, Rajeev Nagar Cross Road, Opp. SPM Hospital, Sanga Kiri Main Road, Tiruchengode – 637211
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3.5">
                <div className="h-8 w-8 shrink-0 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center">
                  <FaPhone className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider">{lang === 'en' ? 'Emergency Phone & WhatsApp' : 'அவசரத் தொடர்பு எண்கள்'}</h4>
                  <p className="text-sm sm:text-base text-gray-900 leading-relaxed sm:leading-[1.65] mt-1 font-semibold">
                    +91 75400 17625
                  </p>
                  <p className="text-[10px] text-gray-900 mt-0.5">
                    {lang === 'en' ? 'Operated jointly by Chairman & Trustees' : 'தலைவர் மற்றும் அறங்காவலர்களால் இயக்கப்படும் எண்கள்'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Message Form */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 shadow-[0_10px_30px_-12px_rgba(16,24,40,0.15)] ring-1 ring-gray-900/[0.04]">
            {contactSuccess ? (
              <div className="text-center py-10 space-y-4">
                <div className="h-14 w-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center text-2xl mx-auto">
                  <FaCheck className="h-6 w-6" />
                </div>
                <h3 className="font-display text-lg font-bold text-gray-900">
                  {lang === 'en' ? 'WhatsApp Message Prepared' : 'வாட்ஸ்அப் செய்தி தயாராகிவிட்டது'}
                </h3>
                <p className="text-xs sm:text-sm text-gray-900 max-w-sm mx-auto">
                  {lang === 'en'
                    ? 'WhatsApp should now open with your message pre-filled so your enquiry is not stored in this browser. Tap send to reach us.'
                    : 'உங்கள் செய்தியுடன் வாட்ஸ்அப் திறக்கும். எங்களைத் தொடர்பு கொள்ள அனுப்பு பொத்தானை அழுத்தவும்.'}
                </p>
                <button
                  id="reset-contact"
                  onClick={() => setContactSuccess(false)}
                  className="rounded-lg bg-emerald-600 text-white font-semibold text-xs px-5 py-2 hover:bg-emerald-700 cursor-pointer"
                >
                  {lang === 'en' ? 'Send Another Message' : 'மற்றொரு செய்தி அனுப்ப'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-6">
                {contactError && (
                  <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs font-semibold leading-relaxed text-red-800">
                    {contactError}
                  </p>
                )}
                
                {/* Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-900 tracking-wide block">
                    {lang === 'en' ? 'Your Name' : 'உங்கள் பெயர்'} *
                  </label>
                  <input
                    type="text"
                    required
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="e.g. S. Kumar"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg form-field focus:outline-hidden focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                  />
                </div>

                {/* Phone */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-900 tracking-wide block">
                    {lang === 'en' ? 'Your Phone Number' : 'உங்கள் தொடர்பு எண்'} *
                  </label>
                  <input
                    type="tel"
                    required
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    placeholder="10-digit mobile number"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg form-field focus:outline-hidden focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                  />
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-900 tracking-wide block">
                    {lang === 'en' ? 'Your Message or Enquiry' : 'உங்கள் செய்தி / கேள்வி'} *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={contactMsg}
                    onChange={(e) => setContactMsg(e.target.value)}
                    placeholder={lang === 'en' ? 'Write your message here...' : 'இங்கு எழுதவும்...'}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg form-field focus:outline-hidden focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                  />
                </div>

                {/* Submit */}
                <button
                  id="submit-contact"
                  type="submit"
                  disabled={contactLoading}
                  className="w-full rounded-lg bg-emerald-600 py-3 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700 transition-all cursor-pointer disabled:bg-emerald-400"
                >
                  {contactLoading ? (lang === 'en' ? 'Sending...' : 'அனுப்பப்படுகிறது...') : (lang === 'en' ? 'Send Message' : 'செய்தியை அனுப்பவும்')}
                </button>

              </form>
            )}
          </div>

          {/* Registered Office Location */}
          <section className="lg:col-span-12 rounded-2xl border border-gray-100 bg-white p-6 shadow-[0_10px_30px_-12px_rgba(16,24,40,0.15)] ring-1 ring-gray-900/[0.04] sm:p-8">
            <div className="mb-6 space-y-2 border-b border-gray-100 pb-5">
              <span className="section-eyebrow w-fit rounded-full bg-emerald-50 px-2.5 py-1 text-emerald-700">
                {lang === 'en' ? 'Physical Presence' : 'நேரடி இருப்பிடம்'}
              </span>
              <h2 className="h2-section">
                {lang === 'en' ? 'Official Registered Office & Location Pin' : 'அதிகாரப்பூர்வ பதிவு அலுவலகம் & வரைபடம்'}
              </h2>
              <p className="max-w-2xl text-sm leading-relaxed text-gray-900 sm:text-base sm:leading-[1.65]">
                {lang === 'en'
                  ? 'We operate in full transparency with a physical office in Tiruchengode. Click below to open GPS coordinates in Google Maps.'
                  : 'நாங்கள் திருச்செங்கோட்டில் முறையான அலுவலகத்துடன் செயல்படுகிறோம். எங்களது இருப்பிடத்தை வரைபடம் மூலம் துல்லியமாக அறிந்து கொள்ள கீழே உள்ள இணைப்பை அழுத்தவும்.'}
              </p>
            </div>

            <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
              <div className="space-y-5 lg:col-span-5">
                <div className="space-y-4 rounded-xl border border-gray-100 bg-gray-50 p-5">
                  <div className="space-y-1">
                    <span className="block text-[9px] font-bold uppercase tracking-widest text-gray-900">
                      {lang === 'en' ? 'Registered Office Address' : 'அலுவலக முகவரி'}
                    </span>
                    <p className="font-display text-sm font-bold leading-snug text-gray-900">
                      Nallathae Nadakkum Trust
                    </p>
                    <p className="text-sm font-medium leading-relaxed text-gray-900 sm:text-base sm:leading-[1.65]">
                      38/5, Rajeev Nagar Cross Road,<br />
                      Opp. SPM Hospital,<br />
                      Tiruchengode - 637211,<br />
                      Namakkal District, Tamil Nadu.
                    </p>
                  </div>

                  <div className="space-y-1.5 border-t border-gray-200/60 pt-2 text-xs text-gray-900">
                    <div className="flex items-center space-x-2">
                      <FaLocationDot className="h-4 w-4 shrink-0 text-emerald-600" />
                      <span><strong>{lang === 'en' ? 'Landmark:' : 'அடையாளம்:'}</strong> Opp. SPM Hospital</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FaMap className="h-4 w-4 shrink-0 text-emerald-600" />
                      <span><strong>{lang === 'en' ? 'Locality:' : 'பகுதி:'}</strong> Tiruchengode Town & Taluk</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=38%2F5%2C+Rajeev+Nagar+Cross+Road%2C+Opp.+SPM+Hospital%2C+Tiruchengode+-+637211"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center space-x-2 rounded-xl bg-emerald-600 px-5 py-3 text-xs font-bold text-white shadow-sm transition-all hover:scale-[1.01] hover:bg-emerald-700 active:scale-[0.99] sm:text-sm"
                  >
                    <FaArrowUpRightFromSquare className="h-4 w-4" />
                    <span>{lang === 'en' ? 'Open in Google Maps App' : 'கூகுள் மேப்ஸில் திறக்கவும்'}</span>
                  </a>
                  <p className="text-center text-[11px] text-gray-900">
                    {lang === 'en' ? 'Live Navigation Coordinates for Visitors & Donors' : 'வருகையாளர்கள் மற்றும் நன்கொடையாளர்களுக்கான நேரடி வழிகாட்டி'}
                  </p>
                </div>
              </div>

              <div className="relative h-[300px] overflow-hidden rounded-2xl border border-gray-100 shadow-[0_10px_30px_-12px_rgba(16,24,40,0.15)] ring-1 ring-gray-900/[0.04] sm:h-[350px] lg:col-span-7">
                <iframe
                  src="https://maps.google.com/maps?q=SPM%20Hospital,%20Tiruchengode&t=&z=16&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-full w-full grayscale-[15%] contrast-[105%]"
                  title={lang === 'en' ? 'Registered office location map' : 'பதிவு அலுவலக வரைபடம்'}
                />
              </div>
            </div>
          </section>

          {/* Frequently Asked Questions */}
          <div className="lg:col-span-12 space-y-6 pt-6">
            <div className="text-center space-y-1">
              <h2 className="h2-section">
                {lang === 'en' ? 'Frequently Asked Questions' : 'அடிக்கடி கேட்கப்படும் கேள்விகள்'}
              </h2>
              <p className="text-xs text-gray-900">
                {lang === 'en' ? 'Have questions regarding our operations or financial management? Click on an item below.' : 'எங்கள் செயல்பாடுகள் அல்லது நிதி மேலாண்மை குறித்து ஏதேனும் கேள்விகள் இருந்தால் கீழே தேர்வு செய்து விபரம் அறியலாம்.'}
              </p>
            </div>

            <div className="max-w-4xl mx-auto divide-y divide-gray-100 border-t border-b border-gray-100">
              {faqData.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div key={idx} className="py-4">
                    <button
                      id={`faq-btn-${idx}`}
                      onClick={() => toggleFaq(idx)}
                      className="w-full flex justify-between items-center text-left font-sans text-sm font-semibold text-gray-900 hover:text-emerald-700 transition-colors py-2.5 min-h-[2.75rem] cursor-pointer"
                    >
                      <span className="pr-4 leading-snug">{faq.question[lang]}</span>
                      {isOpen ? <FaChevronDown className="h-4 w-4 text-emerald-600 flex-shrink-0" /> : <FaChevronRight className="h-4 w-4 text-gray-900 flex-shrink-0" />}
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <p className="text-sm sm:text-base text-gray-900 leading-relaxed sm:leading-[1.65] pt-3 pr-6">
                            {faq.answer[lang]}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      )}

    </div>
  );
}



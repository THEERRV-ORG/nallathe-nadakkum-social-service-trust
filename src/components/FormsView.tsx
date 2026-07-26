import React, { useState } from 'react';
import { OFFICIAL_CONTACT, buildWhatsAppUrl, createReference, hasMeaningfulText, isValidIndianPhone, isValidPersonName, normalizeIndianPhone, sanitizeMultiLine, sanitizeSingleLine } from '../security';
import { motion, AnimatePresence } from 'motion/react';
import { FaLocationDot, FaEnvelope, FaPhone, FaChevronDown, FaChevronRight } from 'react-icons/fa6';
import { faqData } from '../data';
import Monogram from './Monogram';

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

  // Volunteer Form State
  const [volName, setVolName] = useState('');
  const [volPhone, setVolPhone] = useState('');
  const [volLocation, setVolLocation] = useState('');
  const [volInterests, setVolInterests] = useState<string[]>([]);
  const [volAvailability, setVolAvailability] = useState('Weekends');
  const [volSkills, setVolSkills] = useState('');
  const [volLoading, setVolLoading] = useState(false);
  const [volSuccess, setVolSuccess] = useState<string | null>(null);

  // Contact Form State
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactMsg, setContactMsg] = useState('');
  const [contactLoading, setContactLoading] = useState(false);
  const [contactSuccess, setContactSuccess] = useState(false);

  // Contact-page FAQ accordion
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const toggleFaq = (index: number) => setOpenFaqIndex(openFaqIndex === index ? null : index);

  const handleInterestToggle = (interest: string) => {
    if (volInterests.includes(interest)) {
      setVolInterests(volInterests.filter(i => i !== interest));
    } else {
      setVolInterests([...volInterests, interest]);
    }
  };

  // Help requests are prepared for WhatsApp handoff so distress data is not
  // left behind in browser storage on a shared device.
  const handleHelpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const normalizedName = sanitizeSingleLine(helpName, 80);
    const normalizedPhone = normalizeIndianPhone(helpPhone);
    const normalizedAddress = sanitizeMultiLine(helpAddress, 220);
    const normalizedDesc = sanitizeMultiLine(helpDesc, 500);

    if (!helpConsent || !isValidPersonName(normalizedName) || !isValidIndianPhone(normalizedPhone) || !hasMeaningfulText(normalizedAddress, 10, 220) || !hasMeaningfulText(normalizedDesc, 10, 500)) {
      alert(lang === 'en' ? 'Enter a valid name, Indian phone number, address, case details, and consent before sending.' : 'செல்லுபடியாகும் பெயர், இந்திய தொலைபேசி எண், முகவரி, விவரம் மற்றும் ஒப்புதலை வழங்கவும்.');
      return;
    }

    setHelpLoading(true);

    setTimeout(() => {
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

      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      setHelpLoading(false);
      setHelpSuccess(trackingId);
      setHelpName('');
      setHelpPhone('');
      setHelpAddress('');
      setHelpDesc('');
      setHelpConsent(false);
    }, 500);
  };

  // Volunteer details are routed to a mail draft for staff follow-up.
  const handleVolSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const normalizedName = sanitizeSingleLine(volName, 80);
    const normalizedPhone = normalizeIndianPhone(volPhone);
    const normalizedLocation = sanitizeSingleLine(volLocation, 120);
    const normalizedSkills = sanitizeMultiLine(volSkills, 300);

    if (!isValidPersonName(normalizedName) || !isValidIndianPhone(normalizedPhone) || normalizedLocation.length < 3 || volInterests.length === 0 || volInterests.length > 6) {
      alert(lang === 'en' ? 'Enter a valid name, Indian phone number, location, and at least one volunteer area.' : 'செல்லுபடியாகும் பெயர், இந்திய தொலைபேசி எண், இருப்பிடம் மற்றும் குறைந்தபட்சம் ஒரு தன்னார்வ பகுதியைத் தேர்ந்தெடுக்கவும்.');
      return;
    }

    setVolLoading(true);

    setTimeout(() => {
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

      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      setVolLoading(false);
      setVolSuccess(trackingId);
      setVolName('');
      setVolPhone('');
      setVolLocation('');
      setVolInterests([]);
      setVolSkills('');
    }, 500);
  };

  // General enquiries follow the same pattern: validate first, then hand off
  // to a mail draft rather than creating local-only pseudo-submissions.
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const normalizedName = sanitizeSingleLine(contactName, 80);
    const normalizedPhone = normalizeIndianPhone(contactPhone);
    const normalizedMessage = sanitizeMultiLine(contactMsg, 500);

    if (!isValidPersonName(normalizedName) || !isValidIndianPhone(normalizedPhone) || !hasMeaningfulText(normalizedMessage, 10, 500)) {
      alert(lang === 'en' ? 'Enter a valid name, Indian phone number, and message before sending.' : 'செல்லுபடியாகும் பெயர், இந்திய தொலைபேசி எண் மற்றும் செய்தியை வழங்கவும்.');
      return;
    }

    setContactLoading(true);

    setTimeout(() => {
      const whatsappUrl = buildWhatsAppUrl(OFFICIAL_CONTACT.formsPhone, [
        `Form: Contact / Enquiry`,
        `Name: ${normalizedName}`,
        `Phone: ${normalizedPhone}`,
        `Message: ${normalizedMessage}`,
      ]);

      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      setContactLoading(false);
      setContactSuccess(true);
      setContactName('');
      setContactPhone('');
      setContactMsg('');
    }, 500);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-12">
      
      {/* RENDER REQUEST HELP FORM */}
      {formType === 'help' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Side: Form Details & Disclaimer */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-orange-700 bg-brand-orange-50 px-2.5 py-1 rounded-full">
                {lang === 'en' ? 'Urgent Assistance Hub' : 'உதவி மையப்பகுதி'}
              </span>
              <h1 className="font-display text-3xl font-extrabold text-gray-900 leading-tight">
                {lang === 'en' ? 'Request Immediate Help' : 'நேரடி உதவி கோருங்கள்'}
              </h1>
              <p className="text-gray-900 text-sm leading-relaxed">
                {lang === 'en'
                  ? 'If you or someone in your vicinity is in severe distress (homelessness, abandonment in old age, needing last rites, or urgent hospital fees), please fill out our dispatch request. Our local network conducts a physical review within 24–48 hours.'
                  : 'உங்களுக்கோ அல்லது உங்கள் பகுதியில் வசிக்கும் யாராவது ஒருவருக்கு அவசரமாக உணவு, முதியோர் மீட்பு, மருத்துவ உதவி அல்லது கல்வி கட்டண உதவி தேவைப்பட்டால் கீழே உள்ள படிவத்தை நிரப்பவும். எங்களது தன்னார்வலர்கள் 24-48 மணி நேரத்திற்குள் நேரில் வந்து விசாரித்து உதவுவர்.'}
              </p>
            </div>

            {/* Disclaimer Checklist */}
            <div className="rounded-xl bg-gray-50 p-5 border border-gray-200/60 space-y-3">
              <h3 className="font-display text-xs font-bold uppercase tracking-wider text-gray-900 flex items-center gap-2">
                <Monogram label="!" size="xs" tone="amber" />
                <span>{lang === 'en' ? 'Requirements & Process' : 'அறிவிப்பும் செயல்முறையும்'}</span>
              </h3>
              <ul className="text-xs text-gray-900 space-y-2">
                {[
                  { en: 'All requests undergo physical verification by our trustees/volunteers.', ta: 'அனைத்து கோரிக்கைகளும் எங்களது அறங்காவலர்கள் அல்லது தன்னார்வலர்களால் நேரடியாகச் சரிபார்க்கப்படும்.' },
                  { en: 'Support is distributed based on the severity of distress and resource availability.', ta: 'வழங்கப்படும் உதவி நிலைமையின் தீவிரம் மற்றும் எங்களது நிதி ஆதாரத்தின் அடிப்படையிலேயே தீர்மானிக்கப்படும்.' },
                  { en: 'Last rites support is coordinated strictly alongside the local Police Station.', ta: 'ஆதரவற்றோர் இறுதி மரியாதை உதவி முற்றிலும் காவல்துறையின் ஒப்புதல் மற்றும் ஆவணங்களின் அடிப்படையிலேயே நிகழும்.' },
                  { en: 'Free ambulance dispatch is reserved strictly for families below the poverty line; eligibility is verified before dispatch.', ta: 'இலவச ஆம்புலன்ஸ் சேவை வறுமைக்கோட்டிற்குக் கீழே உள்ள குடும்பங்களுக்கு மட்டுமே; அனுப்பும் முன் தகுதி உறுதி செய்யப்படும்.' },
                ].map((item, idx) => (
                  <li key={idx} className="flex gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" />
                    <span>{item[lang]}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Right Side: Form */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 shadow-[0_10px_30px_-12px_rgba(16,24,40,0.15)] ring-1 ring-gray-900/[0.04]">
            {helpSuccess ? (
              <div className="text-center py-10 space-y-6">
                <div className="h-16 w-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center text-3xl mx-auto">
                  ✓
                </div>
                <div className="space-y-2">
                  <h3 className="font-display text-xl font-bold text-gray-900">
                    {lang === 'en' ? 'Secure Contact Draft Prepared' : 'பாதுகாப்பான தொடர்பு வரைவு தயாராகிவிட்டது'}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-900">
                    {lang === 'en' 
                      ? 'A WhatsApp handoff was prepared instead of storing this request in your browser.' 
                      : 'உங்கள் விண்ணப்பம் வெற்றிகரமாகப் பதிவேற்றப்பட்டு, ஆய்வில் உள்ளது.'}
                  </p>
                  <div className="inline-block bg-emerald-50 border border-emerald-200 text-emerald-800 font-mono text-sm font-bold px-4 py-2 rounded-lg mt-2">
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
              <form onSubmit={handleHelpSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  
                  {/* Name */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-900 uppercase tracking-wider block">
                      {lang === 'en' ? 'Beneficiary or Contact Name' : 'உதவி பெறுபவர் / தகவல் அளிப்பவர் பெயர்'} *
                    </label>
                    <input
                      type="text"
                      required
                      value={helpName}
                      onChange={(e) => setHelpName(e.target.value)}
                      placeholder="e.g. N. Arumugam"
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg text-xs sm:text-sm focus:outline-hidden focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-900 uppercase tracking-wider block">
                      {lang === 'en' ? 'Contact Phone / WhatsApp' : 'தொடர்பு எண் / WhatsApp'} *
                    </label>
                    <input
                      type="tel"
                      required
                      value={helpPhone}
                      onChange={(e) => setHelpPhone(e.target.value)}
                      placeholder="e.g. 9876543210"
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg text-xs sm:text-sm focus:outline-hidden focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>

                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  
                  {/* Assistance Type */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-900 uppercase tracking-wider block">
                      {lang === 'en' ? 'Assistance Category' : 'தேவைப்படும் உதவி வகை'}
                    </label>
                    <select
                      value={helpType}
                      onChange={(e) => setHelpType(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg text-xs sm:text-sm bg-white focus:outline-hidden focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                    >
                      <option value="Food">{lang === 'en' ? 'Food Support (Annadhanam)' : 'உணவு உதவி (அன்னதானம்)'}</option>
                      <option value="Ambulance">{lang === 'en' ? 'Free Ambulance Dispatch' : 'இலவச ஆம்புலன்ஸ் சேவை'}</option>
                      <option value="Last Rites">{lang === 'en' ? 'Last Rites (Burial/Cremation)' : 'இறுதிச் சடங்கு'}</option>
                      <option value="Elder Rescue">{lang === 'en' ? 'Elder Rescue and Placement' : 'முதியோர் மீட்பு & இல்ல சேர்க்கை'}</option>
                      <option value="Education">{lang === 'en' ? 'Education Tuition Sponsorship' : 'கல்வி கட்டண உதவி'}</option>
                      <option value="Medical">{lang === 'en' ? 'Hospital Surgery Crowdfund' : 'அவசர மருத்துவ உதவி'}</option>
                      <option value="Other">{lang === 'en' ? 'Other Humanitarian Need' : 'இதர உதவிகள்'}</option>
                    </select>
                    {helpType === 'Ambulance' && (
                      <p className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-[11px] font-medium leading-relaxed text-amber-900">
                        {lang === 'en'
                          ? 'Ambulance support is reserved for below-poverty-line families, subject to eligibility verification, vehicle availability, and government hospital transfer priority. For emergencies, call the trust directly as well.'
                          : 'இலவச ஆம்புலன்ஸ் உதவி வறுமைக்கோட்டிற்குக் கீழே உள்ள குடும்பங்களுக்கு மட்டுமே; தகுதி சரிபார்ப்பு, வாகன கிடைப்புத் தன்மை, அரசு மருத்துவமனை மாற்று முன்னுரிமை ஆகியவற்றின் அடிப்படையில் வழங்கப்படும். அவசரநிலைகளில் அறக்கட்டளையை நேரடியாகவும் அழைக்கவும்.'}
                      </p>
                    )}
                  </div>

                  {/* Urgency */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-900 uppercase tracking-wider block">
                      {lang === 'en' ? 'Urgency Level' : 'அவசர நிலை'}
                    </label>
                    <div className="flex gap-4 pt-1.5">
                      {['Immediate', 'Within a Week', 'Ongoing'].map((lvl) => (
                        <label key={lvl} className="inline-flex items-center space-x-1.5 text-xs font-medium text-gray-900 cursor-pointer">
                          <input
                            type="radio"
                            name="urgency"
                            value={lvl}
                            checked={helpUrgency === lvl}
                            onChange={() => setHelpUrgency(lvl)}
                            className="text-emerald-600 focus:ring-emerald-500 h-3.5 w-3.5"
                          />
                          <span>
                            {lvl === 'Immediate' ? (lang === 'en' ? 'Immediate' : 'அதி அவசரம்') :
                             lvl === 'Within a Week' ? (lang === 'en' ? 'Within a week' : 'ஒரு வாரத்திற்குள்') :
                             (lang === 'en' ? 'Ongoing' : 'பொதுவான தேவை')}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Address */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-900 uppercase tracking-wider block">
                    {lang === 'en' ? 'Address / Location Details' : 'முகவரி / இருப்பிட விவரங்கள்'} *
                  </label>
                  <input
                    type="text"
                    required
                    value={helpAddress}
                    onChange={(e) => setHelpAddress(e.target.value)}
                    placeholder="e.g. Door No, Street Name, Tiruchengode Taluk"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg text-xs sm:text-sm focus:outline-hidden focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                  />
                </div>

                {/* Situation Description */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-900 uppercase tracking-wider block">
                    {lang === 'en' ? 'Describe the distress or medical situation' : 'சூழ்நிலை அல்லது தேவையின் முழு விபரம்'} *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={helpDesc}
                    onChange={(e) => setHelpDesc(e.target.value)}
                    placeholder={lang === 'en' ? 'Describe why assistance is needed...' : 'உதவி தேவைப்படுவதற்கான காரணத்தை விரிவாக எழுதவும்...'}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg text-xs sm:text-sm focus:outline-hidden focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                  />
                </div>

                {/* Consent Checkbox */}
                <div className="relative flex items-start py-2">
                  <div className="flex h-5 items-center">
                    <input
                      id="consent-check"
                      type="checkbox"
                      required
                      checked={helpConsent}
                      onChange={(e) => setHelpConsent(e.target.checked)}
                      className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                    />
                  </div>
                  <div className="ml-3 text-xs">
                    <label htmlFor="consent-check" className="font-medium text-gray-900 cursor-pointer">
                      {lang === 'en' 
                        ? 'I consent to the physical verification of these details by the trust volunteers.' 
                        : 'இந்த விவரங்கள் உண்மை என்றும், தன்னார்வலர்கள் நேரில் வந்து சரிபார்க்க முழு ஒப்புதல் அளிக்கிறேன்.'} *
                    </label>
                  </div>
                </div>

                {/* Submit button */}
                <button
                  id="submit-help-request"
                  type="submit"
                  disabled={helpLoading}
                  className="w-full rounded-lg bg-emerald-600 py-3 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700 transition-all cursor-pointer disabled:bg-emerald-400"
                >
                  {helpLoading ? (lang === 'en' ? 'Verifying details...' : 'சரிபார்க்கப்படுகிறது...') : (lang === 'en' ? 'Submit Dispatch Request' : 'உதவி கோர பதிவிடவும்')}
                </button>

              </form>
            )}
          </div>

        </div>
      )}

      {/* RENDER VOLUNTEER REGISTRATION FORM */}
      {formType === 'volunteer' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Vol details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-blue-700 bg-brand-blue-50 px-2.5 py-1 rounded-full">
                {lang === 'en' ? 'Join Our Team' : 'எங்களுடன் இணையுங்கள்'}
              </span>
              <h1 className="font-display text-3xl font-extrabold text-gray-900 leading-tight">
                {lang === 'en' ? 'Become a Trust Volunteer' : 'தன்னார்வலராகச் சேவையற்றுக'}
              </h1>
              <p className="text-gray-900 text-sm leading-relaxed">
                {lang === 'en'
                  ? 'We have zero salaried administrative staffs. We rely on people who give a few hours a week—chopping vegetables for morning annadhanam, helping verify student profiles, driving ambulance transfers, or assisting in cemetery logistics. Join us to make a direct impact.'
                  : 'எங்கள் அறக்கட்டளையில் சம்பளம் பெறும் ஊழியர்கள் யாரும் இல்லை. வாரத்தில் ஒரு சில மணிநேரங்களை சமூகத்திற்காக வழங்கத் துடிக்கும் தன்னார்வலர்களை மட்டுமே நம்பியே எங்களது பணிகள் நடக்கின்றன. காலையில் உணவு பேக்கிங் செய்தல், முதியோர் மீட்பு, கள விசாரணை என ஏதேனும் ஒரு பணியில் உங்களை இணைத்துக் கொள்ளலாம்.'}
              </p>
            </div>

            {/* Volunteer areas detail list */}
            <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-[0_10px_30px_-12px_rgba(16,24,40,0.15)] ring-1 ring-gray-900/[0.04] space-y-3">
              <h3 className="font-display text-xs font-bold uppercase tracking-wider text-gray-900">
                {lang === 'en' ? 'Volunteer Deployment Tracks' : 'உதவக்கூடிய பணிப் பிரிவுகள்'}
              </h3>
              <ul className="text-xs text-gray-900 space-y-2">
                {[
                  { head: { en: 'Food Drive', ta: 'உணவு விநியோகம்' }, body: { en: 'Meal packing & transport routes', ta: 'மதிய உணவு விநியோகம் மற்றும் பேக்கிங்' } },
                  { head: { en: 'Ambulance Support', ta: 'ஆம்புலன்ஸ் ஒருங்கிணைப்பு' }, body: { en: 'Coordinating transfers & call log', ta: 'அவசர கால அழைப்புகளைப் பெறுதல்' } },
                  { head: { en: 'Outreach & Verification', ta: 'களப்பணி / சரிபார்ப்பு' }, body: { en: 'Home audits for students & elders', ta: 'மாணவர்கள் மற்றும் முதியோர்களின் வீட்டு வசதிகளை விசாரித்தல்' } },
                ].map((track, idx) => (
                  <li key={idx} className="flex gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" />
                    <span><strong>{track.head[lang]}:</strong> {track.body[lang]}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Right Column: Volunteer Form */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 shadow-[0_10px_30px_-12px_rgba(16,24,40,0.15)] ring-1 ring-gray-900/[0.04]">
            {volSuccess ? (
              <div className="text-center py-10 space-y-6">
                <div className="h-16 w-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center text-3xl mx-auto">
                  ✓
                </div>
                <div className="space-y-2">
                  <h3 className="font-display text-xl font-bold text-gray-900">
                    {lang === 'en' ? 'WhatsApp Message Prepared' : 'வாட்ஸ்அப் செய்தி தயாரானது'}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-900">
                    {lang === 'en'
                      ? 'WhatsApp should now open with your volunteer details pre-filled. Tap send to complete your registration.'
                      : 'உங்கள் தன்னார்வ விவரங்களுடன் வாட்ஸ்அப் திறக்கும். பதிவை முடிக்க அனுப்பு பொத்தானை அழுத்தவும்.'}
                  </p>
                  <div className="inline-block bg-emerald-50 border border-emerald-200 text-emerald-800 font-mono text-sm font-bold px-4 py-2 rounded-lg mt-2">
                    {lang === 'en' ? 'Reference:' : 'குறிப்பு எண்:'} {volSuccess}
                  </div>
                </div>
                <p className="text-base text-gray-900 max-w-sm mx-auto leading-relaxed">
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
              <form onSubmit={handleVolSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  
                  {/* Name */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-900 uppercase tracking-wider block">
                      {lang === 'en' ? 'Your Full Name' : 'தன்னார்வலர் பெயர்'} *
                    </label>
                    <input
                      type="text"
                      required
                      value={volName}
                      onChange={(e) => setVolName(e.target.value)}
                      placeholder="e.g. S. Karthik"
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg text-xs sm:text-sm focus:outline-hidden focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-900 uppercase tracking-wider block">
                      {lang === 'en' ? 'WhatsApp Phone Number' : 'WhatsApp எண்'} *
                    </label>
                    <input
                      type="tel"
                      required
                      value={volPhone}
                      onChange={(e) => setVolPhone(e.target.value)}
                      placeholder="e.g. 9876543210"
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg text-xs sm:text-sm focus:outline-hidden focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>

                </div>

                {/* Location & Availability */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  
                  {/* Location */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-900 uppercase tracking-wider block">
                      {lang === 'en' ? 'Your Location / Town' : 'வாழும் இடம் / இருப்பிடம்'} *
                    </label>
                    <input
                      type="text"
                      required
                      value={volLocation}
                      onChange={(e) => setVolLocation(e.target.value)}
                      placeholder="e.g. Rajeev Nagar, Tiruchengode"
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg text-xs sm:text-sm focus:outline-hidden focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>

                  {/* Availability */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-900 uppercase tracking-wider block">
                      {lang === 'en' ? 'Your Availability' : 'எப்போது வர இயலும்'}
                    </label>
                    <select
                      value={volAvailability}
                      onChange={(e) => setVolAvailability(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg text-xs sm:text-sm bg-white focus:outline-hidden focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                    >
                      <option value="Weekends">{lang === 'en' ? 'Weekends (Saturday/Sunday)' : 'வார இறுதி நாட்கள் (சனி / ஞாயிறு)'}</option>
                      <option value="Weekdays">{lang === 'en' ? 'Weekdays (Monday-Friday)' : 'வார நாட்கள் (திங்கள் - வெள்ளி)'}</option>
                      <option value="Flexible">{lang === 'en' ? 'Flexible / Emergency call' : 'அவசர கால அழைப்பின் பேரில்'}</option>
                    </select>
                  </div>

                </div>

                {/* Interests checkboxes */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-900 uppercase tracking-wider block">
                    {lang === 'en' ? 'Areas of Interest' : 'பங்களிக்க விரும்பும் பகுதிகள்'} (choose at least one) *
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
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
                        className={`flex items-start p-3 border rounded-xl cursor-pointer transition-colors ${
                          volInterests.includes(item.id) 
                            ? 'bg-emerald-50 border-emerald-300 text-emerald-900' 
                            : 'bg-white border-gray-100 hover:bg-gray-50'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={volInterests.includes(item.id)}
                          onChange={() => handleInterestToggle(item.id)}
                          className="text-emerald-600 focus:ring-emerald-500 rounded border-gray-300 h-4 w-4 mt-0.5"
                        />
                        <span className="text-xs font-semibold ml-2.5 leading-tight">{item.label[lang]}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Relevant Skills */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-900 uppercase tracking-wider block">
                    {lang === 'en' ? 'Any specific skills / message' : 'திறமைகள் / இதர தகவல்கள்'}
                  </label>
                  <textarea
                    rows={3}
                    value={volSkills}
                    onChange={(e) => setVolSkills(e.target.value)}
                    placeholder={lang === 'en' ? 'Describe any skills like photography, heavy vehicle driving license, legal, audit, or first-aid training...' : 'வாகனம் ஓட்டுநர் உரிமம், முதலுதவிப் பயிற்சி, கம்ப்யூட்டர், சமையல் போன்ற உங்களுக்கு தெரிந்த கூடுதல் திறன்கள்...'}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg text-xs sm:text-sm focus:outline-hidden focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
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
              <span className="text-xs font-bold uppercase tracking-wider text-brand-violet-700 bg-brand-violet-50 px-2.5 py-1 rounded-full">
                {lang === 'en' ? 'Direct Coordinates' : 'தொடர்பு விபரம்'}
              </span>
              <h1 className="font-display text-3xl font-extrabold text-gray-900 leading-tight">
                {lang === 'en' ? 'Contact our Registered Office' : 'நேரடியாகத் தொடர்பு கொள்ள'}
              </h1>
              <p className="text-gray-900 text-sm leading-relaxed">
                {lang === 'en'
                  ? 'Our registered administrative office is located on Rajeev Nagar crossroad, opp. SPM Hospital, Tiruchengode town. For emergency ambulance requirements or reporting abandoned elderly, call us immediately.'
                  : 'எங்கள் பதிவு அலுவலகம் திருச்செங்கோடு ராஜிவ் நகர் குறுக்கு சாலை, SPM மருத்துவமனைக்கு எதிரில் அமைந்துள்ளது. அவசர ஆம்புலன்ஸ் தேவை அல்லது முதியவர்கள் மீட்புத் தகவல்களுக்கு உடனடியாக அழைக்கவும்.'}
              </p>
            </div>

            <div className="space-y-4 pt-2">
              <div className="flex items-start space-x-3.5">
                <div className="h-8 w-8 shrink-0 rounded-full bg-brand-violet-50 text-brand-violet-700 flex items-center justify-center">
                  <FaLocationDot className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-800 uppercase tracking-wider">{lang === 'en' ? 'Office address' : 'அலுவலக முகவரி'}</h4>
                  <p className="text-sm sm:text-base text-gray-900 leading-relaxed sm:leading-[1.65] mt-1">
                    Door No. 38/5, Rajeev Nagar Cross Road, Opp. SPM Hospital, Sanga Kiri Main Road, Tiruchengode – 637211
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3.5">
                <div className="h-8 w-8 shrink-0 rounded-full bg-brand-blue-50 text-brand-blue-700 flex items-center justify-center">
                  <FaEnvelope className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-800 uppercase tracking-wider">{lang === 'en' ? 'Email Address' : 'மின்னஞ்சல் முகவரி'}</h4>
                  <p className="text-sm sm:text-base text-gray-900 leading-relaxed sm:leading-[1.65] mt-1">
                    nallathanadakum@gmail.com
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3.5">
                <div className="h-8 w-8 shrink-0 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center">
                  <FaPhone className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-800 uppercase tracking-wider">{lang === 'en' ? 'Emergency Phone & WhatsApp' : 'அவசரத் தொடர்பு எண்கள்'}</h4>
                  <p className="text-sm sm:text-base text-gray-900 leading-relaxed sm:leading-[1.65] mt-1 font-semibold">
                    +91 98765 43210 / +91 94435 67890
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
                  ✓
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
                
                {/* Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-900 uppercase tracking-wider block">
                    {lang === 'en' ? 'Your Name' : 'உங்கள் பெயர்'} *
                  </label>
                  <input
                    type="text"
                    required
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="e.g. Mohan"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg text-xs sm:text-sm focus:outline-hidden focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                  />
                </div>

                {/* Phone */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-900 uppercase tracking-wider block">
                    {lang === 'en' ? 'Your Phone Number' : 'உங்கள் தொடர்பு எண்'} *
                  </label>
                  <input
                    type="tel"
                    required
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    placeholder="e.g. 9876543210"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg text-xs sm:text-sm focus:outline-hidden focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                  />
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-900 uppercase tracking-wider block">
                    {lang === 'en' ? 'Your Message or Enquiry' : 'உங்கள் செய்தி / கேள்வி'} *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={contactMsg}
                    onChange={(e) => setContactMsg(e.target.value)}
                    placeholder={lang === 'en' ? 'Write your message here...' : 'இங்கு எழுதவும்...'}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg text-xs sm:text-sm focus:outline-hidden focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
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

          {/* Frequently Asked Questions */}
          <div className="lg:col-span-12 space-y-6 pt-6">
            <div className="text-center space-y-1">
              <h2 className="font-display text-2xl font-bold text-gray-900">
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
                      className="w-full flex justify-between items-center text-left font-sans text-sm font-semibold text-gray-900 hover:text-emerald-700 transition-colors py-1 cursor-pointer"
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





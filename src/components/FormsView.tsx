import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Calendar, PhoneCall, CheckCircle, Clock, AlertTriangle, UserCheck, Heart, Trash2 } from 'lucide-react';

interface FormsViewProps {
  lang: 'en' | 'ta';
  formType: 'help' | 'volunteer' | 'contact';
}

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

  // Lists of submissions from localStorage
  const [localHelpRequests, setLocalHelpRequests] = useState<any[]>([]);
  const [localVolApps, setLocalVolApps] = useState<any[]>([]);

  // Load submissions from localStorage on mount
  useEffect(() => {
    try {
      const savedRequests = localStorage.getItem('nn_help_requests');
      if (savedRequests) setLocalHelpRequests(JSON.parse(savedRequests));
      
      const savedVolApps = localStorage.getItem('nn_volunteer_applications');
      if (savedVolApps) setLocalVolApps(JSON.parse(savedVolApps));
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleInterestToggle = (interest: string) => {
    if (volInterests.includes(interest)) {
      setVolInterests(volInterests.filter(i => i !== interest));
    } else {
      setVolInterests([...volInterests, interest]);
    }
  };

  // Submit Help Request
  const handleHelpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!helpName || !helpPhone || !helpAddress || !helpDesc || !helpConsent) {
      alert(lang === 'en' ? 'Please fill in all required fields and accept consent.' : 'தேவையான அனைத்து விவரங்களையும் பூர்த்தி செய்து, ஒப்புதலை ஏற்கவும்.');
      return;
    }
    setHelpLoading(true);

    setTimeout(() => {
      const trackingId = `NN-REQ-${Math.floor(1000 + Math.random() * 9000)}`;
      const newRequest = {
        id: trackingId,
        name: helpName,
        phone: helpPhone,
        address: helpAddress,
        type: helpType,
        desc: helpDesc,
        urgency: helpUrgency,
        date: new Date().toLocaleDateString(),
        status: 'Pending Verification'
      };

      try {
        const currentRequests = JSON.parse(localStorage.getItem('nn_help_requests') || '[]');
        const updatedRequests = [newRequest, ...currentRequests];
        localStorage.setItem('nn_help_requests', JSON.stringify(updatedRequests));
        setLocalHelpRequests(updatedRequests);
      } catch (e) {
        console.error(e);
      }

      setHelpLoading(false);
      setHelpSuccess(trackingId);
      // Reset form
      setHelpName('');
      setHelpPhone('');
      setHelpAddress('');
      setHelpDesc('');
      setHelpConsent(false);
    }, 1500);
  };

  // Submit Volunteer Application
  const handleVolSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!volName || !volPhone || !volLocation || volInterests.length === 0) {
      alert(lang === 'en' ? 'Please fill in Name, Phone, Location and choose at least one interest.' : 'பெயர், தொலைபேசி, இருப்பிடம் ஆகியவற்றை நிரப்பி, குறைந்தபட்சம் ஒரு பணியையாவது தேர்ந்தெடுக்கவும்.');
      return;
    }
    setVolLoading(true);

    setTimeout(() => {
      const trackingId = `NN-VOL-${Math.floor(1000 + Math.random() * 9000)}`;
      const newApp = {
        id: trackingId,
        name: volName,
        phone: volPhone,
        location: volLocation,
        interests: volInterests,
        availability: volAvailability,
        skills: volSkills,
        date: new Date().toLocaleDateString(),
        status: 'Registered'
      };

      try {
        const currentApps = JSON.parse(localStorage.getItem('nn_volunteer_applications') || '[]');
        const updatedApps = [newApp, ...currentApps];
        localStorage.setItem('nn_volunteer_applications', JSON.stringify(updatedApps));
        setLocalVolApps(updatedApps);
      } catch (e) {
        console.error(e);
      }

      setVolLoading(false);
      setVolSuccess(trackingId);
      // Reset form
      setVolName('');
      setVolPhone('');
      setVolLocation('');
      setVolInterests([]);
      setVolSkills('');
    }, 1500);
  };

  // Submit Contact Form
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactPhone || !contactMsg) {
      alert(lang === 'en' ? 'Please fill in all fields.' : 'அனைத்து விவரங்களையும் நிரப்பவும்.');
      return;
    }
    setContactLoading(true);

    setTimeout(() => {
      setContactLoading(false);
      setContactSuccess(true);
      setContactName('');
      setContactPhone('');
      setContactMsg('');
    }, 1200);
  };

  const deleteHelpRequest = (id: string) => {
    const filtered = localHelpRequests.filter(r => r.id !== id);
    localStorage.setItem('nn_help_requests', JSON.stringify(filtered));
    setLocalHelpRequests(filtered);
  };

  const deleteVolApp = (id: string) => {
    const filtered = localVolApps.filter(a => a.id !== id);
    localStorage.setItem('nn_volunteer_applications', JSON.stringify(filtered));
    setLocalVolApps(filtered);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-12">
      
      {/* RENDER REQUEST HELP FORM */}
      {formType === 'help' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Side: Form Details & Disclaimer */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
                {lang === 'en' ? 'Urgent Assistance Hub' : 'உதவி மையப்பகுதி'}
              </span>
              <h1 className="font-display text-3xl font-extrabold text-gray-900 leading-tight">
                {lang === 'en' ? 'Request Immediate Help' : 'நேரடி உதவி கோருங்கள்'}
              </h1>
              <p className="text-gray-600 text-sm leading-relaxed text-justify">
                {lang === 'en'
                  ? 'If you or someone in your vicinity is in severe distress (homelessness, abandonment in old age, needing last rites, or urgent hospital fees), please fill out our dispatch request. Our local network conducts a physical review within 24–48 hours.'
                  : 'உங்களுக்கோ அல்லது உங்கள் பகுதியில் வசிக்கும் யாராவது ஒருவருக்கு அவசரமாக உணவு, முதியோர் மீட்பு, மருத்துவ உதவி அல்லது கல்வி கட்டண உதவி தேவைப்பட்டால் கீழே உள்ள படிவத்தை நிரப்பவும். எங்களது தன்னார்வலர்கள் 24-48 மணி நேரத்திற்குள் நேரில் வந்து விசாரித்து உதவுவர்.'}
              </p>
            </div>

            {/* Disclaimer Checklist */}
            <div className="rounded-xl bg-gray-50 p-5 border border-gray-200/60 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-700">
                ⚠️ {lang === 'en' ? 'Requirements & Process' : 'அறிவிப்பும் செயல்முறையும்'}
              </h3>
              <ul className="text-xs text-gray-600 space-y-2 list-disc pl-4 leading-relaxed">
                <li>{lang === 'en' ? 'All requests undergo physical verification by our trustees/volunteers.' : 'அனைத்து கோரிக்கைகளும் எங்களது அறங்காவலர்கள் அல்லது தன்னார்வலர்களால் நேரடியாகச் சரிபார்க்கப்படும்.'}</li>
                <li>{lang === 'en' ? 'Support is distributed based on the severity of distress and resource availability.' : 'வழங்கப்படும் உதவி நிலைமையின் தீவிரம் மற்றும் எங்களது நிதி ஆதாரத்தின் அடிப்படையிலேயே தீர்மானிக்கப்படும்.'}</li>
                <li>{lang === 'en' ? 'Last rites support is coordinated strictly alongside the local Police Station.' : 'ஆதரவற்றோர் இறுதி மரியாதை உதவி முற்றிலும் காவல்துறையின் ஒப்புதல் மற்றும் ஆவணங்களின் அடிப்படையிலேயே நிகழும்.'}</li>
              </ul>
            </div>

            {/* Device submissions tracking */}
            {localHelpRequests.length > 0 && (
              <div className="space-y-3">
                <h3 className="font-display text-sm font-bold text-gray-900">
                  📋 {lang === 'en' ? 'Requests Submitted from this Device' : 'இந்தக் கருவியிலிருந்து அனுப்பப்பட்ட கோரிக்கைகள்'}
                </h3>
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {localHelpRequests.map((req) => (
                    <div key={req.id} className="p-4 border border-gray-100 rounded-xl bg-white shadow-xs flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-mono text-xs font-bold text-emerald-800">{req.id}</span>
                          <span className="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded">
                            {req.type}
                          </span>
                        </div>
                        <p className="text-xs font-medium text-gray-700">{req.name} ({req.date})</p>
                        <div className="flex items-center space-x-1.5 pt-1">
                          {req.status === 'Pending Verification' ? <Clock className="h-3 w-3 text-amber-500" /> : <CheckCircle className="h-3 w-3 text-emerald-600" />}
                          <span className="text-[10px] font-semibold text-gray-500">
                            {req.status === 'Pending Verification' 
                              ? (lang === 'en' ? 'Pending Verification' : 'விசாரணையில் உள்ளது')
                              : (lang === 'en' ? 'Approved / Dispatched' : 'நிறைவேற்றப்பட்டது')}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => deleteHelpRequest(req.id)}
                        className="text-gray-400 hover:text-red-600 p-1 cursor-pointer"
                        title={lang === 'en' ? 'Remove local record' : 'பதிவை நீக்கு'}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Side: Form */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 shadow-xs">
            {helpSuccess ? (
              <div className="text-center py-10 space-y-6">
                <div className="h-16 w-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center text-3xl mx-auto">
                  ✓
                </div>
                <div className="space-y-2">
                  <h3 className="font-display text-xl font-bold text-gray-900">
                    {lang === 'en' ? 'Help Request Logged Successfully' : 'கோரிக்கை பதிவேற்றப்பட்டது'}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600">
                    {lang === 'en' 
                      ? 'Your dispatch file is stored and under initial review.' 
                      : 'உங்கள் விண்ணப்பம் வெற்றிகரமாகப் பதிவேற்றப்பட்டு, ஆய்வில் உள்ளது.'}
                  </p>
                  <div className="inline-block bg-emerald-50 border border-emerald-200 text-emerald-800 font-mono text-sm font-bold px-4 py-2 rounded-lg mt-2">
                    {lang === 'en' ? 'Tracking ID:' : 'விண்ணப்ப எண்:'} {helpSuccess}
                  </div>
                </div>
                <p className="text-xs text-gray-400">
                  {lang === 'en'
                    ? 'Please keep your phone line active. A volunteer will call you shortly.'
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
                    <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
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
                    <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
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
                    <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
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
                  </div>

                  {/* Urgency */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
                      {lang === 'en' ? 'Urgency Level' : 'அவசர நிலை'}
                    </label>
                    <div className="flex gap-4 pt-1.5">
                      {['Immediate', 'Within a Week', 'Ongoing'].map((lvl) => (
                        <label key={lvl} className="inline-flex items-center space-x-1.5 text-xs font-medium text-gray-700 cursor-pointer">
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
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
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
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
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
                    <label htmlFor="consent-check" className="font-medium text-gray-700 cursor-pointer">
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
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
                {lang === 'en' ? 'Join Our Team' : 'எங்களுடன் இணையுங்கள்'}
              </span>
              <h1 className="font-display text-3xl font-extrabold text-gray-900 leading-tight">
                {lang === 'en' ? 'Become a Trust Volunteer' : 'தன்னார்வலராகச் சேவையற்றுக'}
              </h1>
              <p className="text-gray-600 text-sm leading-relaxed text-justify">
                {lang === 'en'
                  ? 'We have zero salaried administrative staffs. We rely on people who give a few hours a week—chopping vegetables for morning annadhanam, helping verify student profiles, driving ambulance transfers, or assisting in cemetery logistics. Join us to make a direct impact.'
                  : 'எங்கள் அறக்கட்டளையில் சம்பளம் பெறும் ஊழியர்கள் யாரும் இல்லை. வாரத்தில் ஒரு சில மணிநேரங்களை சமூகத்திற்காக வழங்கத் துடிக்கும் தன்னார்வலர்களை மட்டுமே நம்பியே எங்களது பணிகள் நடக்கின்றன. காலையில் உணவு பேக்கிங் செய்தல், முதியோர் மீட்பு, கள விசாரணை என ஏதேனும் ஒரு பணியில் உங்களை இணைத்துக் கொள்ளலாம்.'}
              </p>
            </div>

            {/* Volunteer areas detail list */}
            <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-xs space-y-3">
              <h3 className="font-display text-xs font-bold uppercase tracking-wider text-gray-700">
                {lang === 'en' ? 'Volunteer Deployment Tracks' : 'உதவக்கூடிய பணிப் பிரிவுகள்'}
              </h3>
              <ul className="text-xs text-gray-600 space-y-2 list-none">
                <li className="flex items-center space-x-2">
                  <span className="text-emerald-600">🥘</span>
                  <span><strong>{lang === 'en' ? 'Food Drive' : 'உணவு விநியோகம்'}:</strong> {lang === 'en' ? 'Meal packing & transport routes' : 'மதிய உணவு விநியோகம் மற்றும் பேக்கிங்'}</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-emerald-600">🚑</span>
                  <span><strong>{lang === 'en' ? 'Ambulance Support' : 'ஆம்புலன்ஸ் ஒருங்கிணைப்பு'}:</strong> {lang === 'en' ? 'Coordinating transfers & call log' : 'அவசர கால அழைப்புகளைப் பெறுதல்'}</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-emerald-600">🔎</span>
                  <span><strong>{lang === 'en' ? 'Outreach & Verification' : 'களப்பணி / சரிபார்ப்பு'}:</strong> {lang === 'en' ? 'Home audits for students & elders' : 'மாணவர்கள் மற்றும் முதியோர்களின் வீட்டு வசதிகளை விசாரித்தல்'}</span>
                </li>
              </ul>
            </div>

            {/* Local Apps Tracker */}
            {localVolApps.length > 0 && (
              <div className="space-y-3">
                <h3 className="font-display text-sm font-bold text-gray-900">
                  📋 {lang === 'en' ? 'Your Registered Applications' : 'பதிவு செய்யப்பட்ட விண்ணப்பங்கள்'}
                </h3>
                <div className="space-y-3 max-h-48 overflow-y-auto">
                  {localVolApps.map((app) => (
                    <div key={app.id} className="p-4 border border-gray-100 rounded-xl bg-white shadow-xs flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-mono text-xs font-bold text-emerald-800">{app.id}</span>
                          <span className="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded">
                            {app.availability}
                          </span>
                        </div>
                        <p className="text-xs font-medium text-gray-700">{app.name} ({app.date})</p>
                        <div className="flex items-center space-x-1.5 pt-1">
                          <UserCheck className="h-3 w-3 text-emerald-600" />
                          <span className="text-[10px] font-semibold text-emerald-700">
                            {app.status === 'Registered' 
                              ? (lang === 'en' ? 'Registered - Pending WhatsApp Link' : 'விண்ணப்பம் ஏற்கப்பட்டது') 
                              : app.status}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => deleteVolApp(app.id)}
                        className="text-gray-400 hover:text-red-600 p-1 cursor-pointer"
                        title={lang === 'en' ? 'Remove local record' : 'பதிவை நீக்கு'}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Volunteer Form */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 shadow-xs">
            {volSuccess ? (
              <div className="text-center py-10 space-y-6">
                <div className="h-16 w-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center text-3xl mx-auto">
                  ✓
                </div>
                <div className="space-y-2">
                  <h3 className="font-display text-xl font-bold text-gray-900">
                    {lang === 'en' ? 'Volunteer Registration Complete' : 'பதிவு நிறைவடைந்தது'}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600">
                    {lang === 'en'
                      ? 'Thank you for stepping forward to serve your community.'
                      : 'சமூக சேவையில் உங்களை ஈடுபடுத்திக் கொண்டமைக்கு மனமார்ந்த நன்றிகள்.'}
                  </p>
                  <div className="inline-block bg-emerald-50 border border-emerald-200 text-emerald-800 font-mono text-sm font-bold px-4 py-2 rounded-lg mt-2">
                    {lang === 'en' ? 'Registration ID:' : 'பதிவு எண்:'} {volSuccess}
                  </div>
                </div>
                <p className="text-xs text-gray-400 max-w-sm mx-auto leading-relaxed">
                  {lang === 'en'
                    ? 'Our coordinator will contact you via WhatsApp shortly to guide you onto our next active field drive.'
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
                    <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
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
                    <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
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
                    <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
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
                    <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
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
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
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
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
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
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
                {lang === 'en' ? 'Direct Coordinates' : 'தொடர்பு விபரம்'}
              </span>
              <h1 className="font-display text-3xl font-extrabold text-gray-900 leading-tight">
                {lang === 'en' ? 'Contact our Registered Office' : 'நேரடியாகத் தொடர்பு கொள்ள'}
              </h1>
              <p className="text-gray-600 text-sm leading-relaxed text-justify">
                {lang === 'en'
                  ? 'Our registered administrative office is located on Rajeev Nagar crossroad, opp. SPM Hospital, Tiruchengode town. For emergency ambulance requirements or reporting abandoned elderly, call us immediately.'
                  : 'எங்கள் பதிவு அலுவலகம் திருச்செங்கோடு ராஜிவ் நகர் குறுக்கு சாலை, SPM மருத்துவமனைக்கு எதிரில் அமைந்துள்ளது. அவசர ஆம்புலன்ஸ் தேவை அல்லது முதியவர்கள் மீட்புத் தகவல்களுக்கு உடனடியாக அழைக்கவும்.'}
              </p>
            </div>

            <div className="space-y-4 pt-2">
              <div className="flex items-start space-x-3.5">
                <span className="text-xl">📍</span>
                <div>
                  <h4 className="text-xs font-bold text-gray-800 uppercase tracking-wider">{lang === 'en' ? 'Office address' : 'அலுவலக முகவரி'}</h4>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mt-1">
                    Door No. 38/5, Rajeev Nagar Cross Road, Opp. SPM Hospital, Sanga Kiri Main Road, Tiruchengode – 637211
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3.5">
                <span className="text-xl">✉️</span>
                <div>
                  <h4 className="text-xs font-bold text-gray-800 uppercase tracking-wider">{lang === 'en' ? 'Email Address' : 'மின்னஞ்சல் முகவரி'}</h4>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mt-1">
                    nallathanadakum@gmail.com
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3.5">
                <span className="text-xl">📞</span>
                <div>
                  <h4 className="text-xs font-bold text-gray-800 uppercase tracking-wider">{lang === 'en' ? 'Emergency Phone & WhatsApp' : 'அவசரத் தொடர்பு எண்கள்'}</h4>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mt-1 font-semibold">
                    +91 98765 43210 / +91 94435 67890
                  </p>
                  <p className="text-[10px] text-gray-400 mt-0.5">
                    {lang === 'en' ? 'Operated jointly by Chairman & Trustees' : 'தலைவர் மற்றும் அறங்காவலர்களால் இயக்கப்படும் எண்கள்'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Message Form */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 shadow-xs">
            {contactSuccess ? (
              <div className="text-center py-10 space-y-4">
                <div className="h-14 w-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center text-2xl mx-auto">
                  ✓
                </div>
                <h3 className="font-display text-lg font-bold text-gray-900">
                  {lang === 'en' ? 'Message Sent Successfully' : 'செய்தி அனுப்பப்பட்டது'}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 max-w-sm mx-auto">
                  {lang === 'en'
                    ? 'Thank you for reaching out. We will read your message and reply as soon as possible.'
                    : 'உங்கள் செய்தி எங்களை வந்தடைந்தது. விரைவில் பதில் அனுப்புகிறோம். நன்றி!'}
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
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
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
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
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
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
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

        </div>
      )}

    </div>
  );
}

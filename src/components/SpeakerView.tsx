import React, { useState } from 'react';
import { motion } from 'motion/react';
import { FaMicrophoneLines, FaCalendarDays, FaLocationDot, FaHeart } from 'react-icons/fa6';
import {
  OFFICIAL_CONTACT,
  buildWhatsAppUrl,
  createReference,
  hasMeaningfulText,
  isValidIndianPhone,
  isValidPersonName,
  normalizeIndianPhone,
  sanitizeSingleLine,
  sanitizeMultiLine,
} from '../security';
import PhotoPlaceholder from './PhotoPlaceholder';
import AwardsShowcase from './AwardsShowcase';

interface SpeakerViewProps {
  lang: 'en' | 'ta';
}

/**
 * "Invite as Speaker" page. Collects invitation details (organisation, event
 * date, venue, topic) and hands them off to the trust's WhatsApp line — the
 * same privacy-preserving pattern used by the other intake forms.
 */
export default function SpeakerView({ lang }: SpeakerViewProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [org, setOrg] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [venue, setVenue] = useState('');
  const [details, setDetails] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);

  const today = new Date().toISOString().slice(0, 10);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nName = sanitizeSingleLine(name, 80);
    const nPhone = normalizeIndianPhone(phone);
    const nOrg = sanitizeSingleLine(org, 120);
    const nVenue = sanitizeSingleLine(venue, 160);
    const nDetails = sanitizeMultiLine(details, 500);

    if (
      !isValidPersonName(nName) ||
      !isValidIndianPhone(nPhone) ||
      nOrg.length < 2 ||
      !eventDate ||
      nVenue.length < 3 ||
      !hasMeaningfulText(nDetails, 5, 500)
    ) {
      alert(
        lang === 'en'
          ? 'Enter a valid name, Indian phone number, organisation, event date, venue, and a short note about the event.'
          : 'செல்லுபடியாகும் பெயர், இந்திய தொலைபேசி எண், அமைப்பின் பெயர், நிகழ்வுத் தேதி, இடம் மற்றும் நிகழ்வு பற்றிய குறிப்பை வழங்கவும்.'
      );
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const trackingId = createReference('NN-SPK');
      const whatsappUrl = buildWhatsAppUrl(OFFICIAL_CONTACT.formsPhone, [
        `Form: Invite as Speaker`,
        `Reference: ${trackingId}`,
        `Name: ${nName}`,
        `Phone: ${nPhone}`,
        `Organisation / Function: ${nOrg}`,
        `Event date: ${eventDate}`,
        `Venue: ${nVenue}`,
        `Details: ${nDetails}`,
      ]);
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      setLoading(false);
      setSuccess(trackingId);
      setName('');
      setPhone('');
      setOrg('');
      setEventDate('');
      setVenue('');
      setDetails('');
    }, 500);
  };

  const inputCls =
    'w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-hidden focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500';
  const labelCls = 'text-xs font-bold text-gray-700 uppercase tracking-wider block';

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-14">

      {/* Header */}
      <section className="text-center max-w-3xl mx-auto space-y-4 pt-6">
        <p className="section-eyebrow text-brand-violet-700">
          {lang === 'en' ? 'Invite Our Founder' : 'எங்கள் நிறுவனரை அழையுங்கள்'}
        </p>
        <h1 className="font-display text-3xl font-extrabold text-gray-900 sm:text-4xl">
          {lang === 'en' ? 'Invite Advocate N. Kavinraj as a Speaker' : 'வழக்கறிஞர் நா. கவின்ராஜை சொற்பொழிவாளராக அழையுங்கள்'}
        </h1>
        <p className="text-gray-900 text-base sm:text-lg leading-relaxed sm:leading-[1.65]">
          {lang === 'en'
            ? 'Our founder speaks on compassion, social service, and community action at schools, colleges, temples, and public functions. Send us your event details and we will get back to you.'
            : 'எங்கள் நிறுவனர் பள்ளிகள், கல்லூரிகள், கோயில்கள் மற்றும் பொது நிகழ்வுகளில் மனிதநேயம், சமூக சேவை மற்றும் மக்கள் பணி குறித்து உரையாற்றுகிறார். உங்கள் நிகழ்வு விவரங்களை அனுப்புங்கள், நாங்கள் உங்களைத் தொடர்பு கொள்கிறோம்.'}
        </p>
      </section>

      {/* Past speeches placeholder (content to be added later) */}
      <section className="space-y-4">
        <div className="text-center space-y-1">
          <h2 className="font-display text-2xl font-bold text-gray-900 sm:text-3xl">
            {lang === 'en' ? 'Past Talks & Speeches' : 'முன்னைய உரைகள் & சொற்பொழிவுகள்'}
          </h2>
          <p className="text-sm sm:text-base text-gray-900/70">
            {lang === 'en' ? 'A selection of recent speaking engagements — coming soon.' : 'சமீபத்திய சொற்பொழிவு நிகழ்வுகள் விரைவில் இணைக்கப்படும்.'}
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[1, 2, 3].map((n) => (
            <PhotoPlaceholder
              key={n}
              lang={lang}
              aspectRatio="4 / 3"
              label={lang === 'en' ? 'Speech / Event Photo' : 'சொற்பொழிவு புகைப்படம்'}
              className="rounded-2xl"
            />
          ))}
        </div>
      </section>

      {/* No-fee / donate quote */}
      <section className="rounded-2xl border border-brand-gold-100 bg-brand-gold-50 p-6 sm:p-8 flex flex-col sm:flex-row items-start gap-4 max-w-4xl mx-auto">
        <div className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-gold-100 text-brand-gold-700">
          <FaHeart className="h-6 w-6" />
        </div>
        <blockquote className="rounded-xl border border-brand-gold-200 bg-white/70 px-4 py-3 text-base sm:text-lg font-bold text-gray-950 leading-relaxed sm:leading-[1.65] shadow-xs">
          {lang === 'en'
            ? '“We charge no fee for speaking engagements. If our words move you, we simply ask that you donate to the trust — whatever your heart is willing to give — as a token of love.”'
            : '“சொற்பொழிவுக்கு நாங்கள் எந்தக் கட்டணமும் வாங்குவதில்லை. எங்கள் வார்த்தைகள் உங்கள் மனதைத் தொட்டால், அன்பின் அடையாளமாக, உங்கள் மனம் விரும்பும் அளவு அறக்கட்டளைக்கு நன்கொடை அளியுங்கள் — அவ்வளவே.”'}
        </blockquote>
      </section>

      {/* Invitation form */}
      <section className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 shadow-[0_10px_30px_-12px_rgba(16,24,40,0.15)] ring-1 ring-gray-900/[0.04] max-w-3xl mx-auto w-full space-y-6">
        <div className="space-y-1 text-center border-b border-gray-100 pb-4">
          <h3 className="font-display text-xl font-bold text-gray-900 flex items-center justify-center gap-2">
            <FaMicrophoneLines className="h-6 w-6 text-emerald-600" />
            <span>{lang === 'en' ? 'Send a Speaker Invitation' : 'சொற்பொழிவு அழைப்பை அனுப்பவும்'}</span>
          </h3>
          <p className="text-xs sm:text-sm text-gray-900/70">
            {lang === 'en' ? 'Your request is sent securely via WhatsApp — nothing is stored in this browser.' : 'உங்கள் கோரிக்கை வாட்ஸ்அப் மூலம் பாதுகாப்பாக அனுப்பப்படும் — உலாவியில் எதுவும் சேமிக்கப்படாது.'}
          </p>
        </div>

        {success ? (
          <div className="text-center py-8 space-y-4">
            <div className="h-14 w-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center text-2xl mx-auto">
              ✓
            </div>
            <div className="space-y-2">
              <h4 className="font-display text-lg font-bold text-gray-900">
                {lang === 'en' ? 'Invitation Prepared' : 'அழைப்பு தயாராகிவிட்டது'}
              </h4>
              <p className="text-sm text-gray-900/70 max-w-sm mx-auto">
                {lang === 'en'
                  ? 'A WhatsApp message with your event details is ready to send. Our team will confirm availability shortly.'
                  : 'உங்கள் நிகழ்வு விவரங்களுடன் வாட்ஸ்அப் செய்தி அனுப்பத் தயாராக உள்ளது. எங்கள் குழு விரைவில் உறுதிப்படுத்தும்.'}
              </p>
              <div className="inline-block bg-emerald-50 border border-emerald-200 text-emerald-800 font-mono text-sm font-bold px-4 py-2 rounded-lg mt-1">
                {lang === 'en' ? 'Reference:' : 'குறிப்பு எண்:'} {success}
              </div>
            </div>
            <button
              onClick={() => setSuccess(null)}
              className="rounded-lg bg-emerald-600 text-white font-semibold text-xs px-5 py-2 hover:bg-emerald-700 cursor-pointer"
            >
              {lang === 'en' ? 'Send Another Invitation' : 'மற்றொரு அழைப்பை அனுப்ப'}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className={labelCls}>{lang === 'en' ? 'Your Name' : 'உங்கள் பெயர்'} *</label>
                <input type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. S. Kumar" className={inputCls} />
              </div>
              <div className="space-y-1.5">
                <label className={labelCls}>{lang === 'en' ? 'Phone / WhatsApp' : 'தொலைபேசி / வாட்ஸ்அப்'} *</label>
                <input type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="e.g. 9876543210" className={inputCls} />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className={labelCls}>{lang === 'en' ? 'Organisation / Function Name' : 'அமைப்பு / நிகழ்வின் பெயர்'} *</label>
              <input type="text" required value={org} onChange={(e) => setOrg(e.target.value)} placeholder={lang === 'en' ? 'e.g. Tiruchengode Arts College' : 'எ.கா. திருச்செங்கோடு கலைக் கல்லூரி'} className={inputCls} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className={labelCls}>
                  <span className="inline-flex items-center gap-1.5"><FaCalendarDays className="h-3 w-3 text-emerald-600" />{lang === 'en' ? 'Event Date' : 'நிகழ்வுத் தேதி'} *</span>
                </label>
                <input type="date" required min={today} value={eventDate} onChange={(e) => setEventDate(e.target.value)} className={inputCls} />
              </div>
              <div className="space-y-1.5">
                <label className={labelCls}>
                  <span className="inline-flex items-center gap-1.5"><FaLocationDot className="h-3 w-3 text-emerald-600" />{lang === 'en' ? 'Venue / Location' : 'இடம் / முகவரி'} *</span>
                </label>
                <input type="text" required value={venue} onChange={(e) => setVenue(e.target.value)} placeholder={lang === 'en' ? 'e.g. College Auditorium, Tiruchengode' : 'எ.கா. கல்லூரி அரங்கம், திருச்செங்கோடு'} className={inputCls} />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className={labelCls}>{lang === 'en' ? 'Event Details / Requested Topic' : 'நிகழ்வு விவரம் / விரும்பும் தலைப்பு'} *</label>
              <textarea required rows={4} value={details} onChange={(e) => setDetails(e.target.value)} placeholder={lang === 'en' ? 'Tell us about the occasion, expected audience, timing, and the topic you would like addressed...' : 'நிகழ்வு, எதிர்பார்க்கப்படும் பார்வையாளர்கள், நேரம் மற்றும் விரும்பும் தலைப்பு பற்றி எழுதவும்...'} className={inputCls} />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-emerald-600 py-3 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700 transition-all cursor-pointer disabled:bg-emerald-400"
            >
              {loading ? (lang === 'en' ? 'Preparing...' : 'தயாராகிறது...') : (lang === 'en' ? 'Send Invitation via WhatsApp' : 'வாட்ஸ்அப் மூலம் அழைப்பை அனுப்பவும்')}
            </button>
          </form>
        )}
      </section>

      {/* ── Awards & Recognition (founder) — below the form ──── */}
      <AwardsShowcase lang={lang} compact />
    </div>
  );
}

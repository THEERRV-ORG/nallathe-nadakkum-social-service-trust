import { FaInstagram, FaFacebookF, FaYoutube } from 'react-icons/fa6';
import { OFFICIAL_SOCIAL } from '../security';

interface SocialConnectProps {
  lang: 'en' | 'ta';
}

/**
 * Prominent "follow our work" call-to-action used across public pages.
 * Social URLs are sourced from the centralized OFFICIAL_SOCIAL config so links
 * stay consistent with the footer and anywhere else they surface.
 */
export default function SocialConnect({ lang }: SocialConnectProps) {
  const links = [
    {
      key: 'instagram',
      href: OFFICIAL_SOCIAL.instagram,
      label: 'Instagram',
      cue: { en: 'Follow', ta: 'பின்தொடர' },
      icon: <FaInstagram className="h-6 w-6" />,
      // Instagram brand pink/magenta.
      iconText: 'text-[#E4405F]',
      iconHover: 'group-hover:bg-[#E4405F] group-hover:text-white',
    },
    {
      key: 'facebook',
      href: OFFICIAL_SOCIAL.facebook,
      label: 'Facebook',
      cue: { en: 'Connect', ta: 'இணைய' },
      icon: <FaFacebookF className="h-6 w-6" />,
      // Facebook blue.
      iconText: 'text-[#1877F2]',
      iconHover: 'group-hover:bg-[#1877F2] group-hover:text-white',
    },
    {
      key: 'youtube',
      href: OFFICIAL_SOCIAL.youtube,
      label: 'YouTube',
      cue: { en: 'Watch', ta: 'பார்க்க' },
      icon: <FaYoutube className="h-6 w-6" />,
      // YouTube red.
      iconText: 'text-[#FF0000]',
      iconHover: 'group-hover:bg-[#FF0000] group-hover:text-white',
    },
  ];

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="rounded-2xl border border-emerald-100 bg-emerald-50/40 p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 text-center md:text-left">
        <div className="space-y-1.5 max-w-xl">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-gray-900">
            {lang === 'en' ? 'Follow Our Daily Work' : 'எங்கள் தினசரி பணிகளைப் பின்தொடருங்கள்'}
          </h2>
          <p className="text-base sm:text-lg text-gray-900 leading-relaxed sm:leading-[1.65]">
            {lang === 'en'
              ? 'See real-time photos and videos of our annadhanam, rescues, and last rites on our official social channels.'
              : 'எங்கள் அன்னதானம், மீட்பு மற்றும் இறுதி மரியாதை பணிகளின் புகைப்படங்கள் மற்றும் வீடியோக்களை எங்கள் அதிகாரப்பூர்வ சமூக ஊடகங்களில் நேரடியாகக் காணுங்கள்.'}
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
          {links.map((link) => (
            <a
              key={link.key}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${link.cue.en} Nallathe Nadakkum on ${link.label}`}
              className="inline-flex items-center gap-3 rounded-xl border border-gray-200 bg-white pl-2.5 pr-4 py-2.5 shadow-xs transition-all hover:-translate-y-0.5 hover:border-gray-300 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 group"
            >
              <span className={`inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gray-50 transition-colors ${link.iconText} ${link.iconHover}`}>
                {link.icon}
              </span>
              <span className="text-left leading-tight">
                <span className="block text-[10px] font-semibold uppercase tracking-wider text-gray-900/60">
                  {link.cue[lang]}
                </span>
                <span className="block text-sm font-bold text-gray-900">
                  {link.label}
                </span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

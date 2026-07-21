export interface ServiceItem {
  id: string;
  iconName: string;
  title: { en: string; ta: string };
  description: { en: string; ta: string };
  detailedDescription: { en: string; ta: string };
  benefits: { en: string; ta: string };
  howToRequest: { en: string; ta: string };
  howToDonate: { en: string; ta: string };
  volunteerRole: { en: string; ta: string };
}

export interface GalleryItem {
  id: string;
  title: { en: string; ta: string };
  date: string;
  location: { en: string; ta: string };
  category: string;
  description: { en: string; ta: string };
  beneficiaries?: { en: string; ta: string };
  image: string;
}

export interface FAQItem {
  question: { en: string; ta: string };
  answer: { en: string; ta: string };
}

export interface TranslationSet {
  [key: string]: { en: string; ta: string };
}

export const navigationLabels = [
  { id: 'home', label: { en: 'Home', ta: 'முகப்பு' } },
  { id: 'about', label: { en: 'About Us', ta: 'அறக்கட்டளை பற்றி' } },
  { id: 'services', label: { en: 'Our Services', ta: 'எங்கள் சேவைகள்' } },
  { id: 'gallery', label: { en: 'Activities & Gallery', ta: 'செயல்பாடுகள் & புகைப்படங்கள்' } },
  { id: 'help', label: { en: 'Request Help', ta: 'உதவி கோர' } },
  { id: 'volunteer', label: { en: 'Volunteer', ta: 'தன்னார்வலர்' } },
  { id: 'donate', label: { en: 'Donate', ta: 'நன்கொடை' } },
  { id: 'transparency', label: { en: 'Transparency & Legal', ta: 'வெளிப்படைத்தன்மை' } },
  { id: 'contact', label: { en: 'Contact Us', ta: 'தொடர்பு கொள்ள' } },
];

export const commonTranslations: TranslationSet = {
  heroTitle: {
    en: 'Nallathe Nadakkum Social Trust',
    ta: 'நல்லதே நடக்கும் சமூக சேவை அறக்கட்டளை'
  },
  heroSlogan: {
    en: 'Where no one is left to face life — or death — alone.',
    ta: 'வாழ்விலும், மறைவிலும் — யாரும் தனியே விடப்பட மாட்டார்கள்.'
  },
  heroSub: {
    en: 'A registered community trust based in Tiruchengode, Tamil Nadu, serving people who have no one else to turn to.',
    ta: 'திருச்செங்கோட்டை மையமாகக் கொண்ட பதிவு செய்யப்பட்ட சமூக சேவை அறக்கட்டளை. ஆதரவற்ற மக்களுக்காக தங்களை அர்ப்பணித்துக் கொள்கிறது.'
  },
  introText: {
    en: 'Nallathe Nadakkum Samuga Sevai Arakkattalai is a registered public charitable trust founded by Advocate N. Kavinraj in Tiruchengode, Tamil Nadu. What began as an informal, personal weekend habit of feeding roadside families has grown into a registered trust (08.04.2025) running daily food distribution, destitute elder rescue, education fee support, police-coordinated last rites, and free emergency ambulance transport.',
    ta: 'நல்லதே நடக்கும் சமூக சேவை அறக்கட்டளை, திருச்செங்கோடு வழக்கறிஞர் நா. கவின்ராஜ் அவர்களால் தொடங்கப்பட்ட பதிவு செய்யப்பட்ட சமூக சேவை அறக்கட்டளை ஆகும். சாலையோரம் வசிப்பவர்களுக்கு வார இறுதியில் உணவு வழங்கிய ஒரு தனிநபர் முயற்சியாக தொடங்கி, இரண்டு ஆண்டுகளுக்குப் பிறகு, 08.04.2025 அன்று முறையாக அறக்கட்டளையாக பதிவு செய்யப்பட்டது. இன்று தினசரி அன்னதானம், முதியோர் மீட்பு, ஆதரவற்று இறப்பவர்களுக்கு இறுதி மரியாதை, கல்வி உதவி, மற்றும் இலவச ஆம்புலன்ஸ் சேவை ஆகியவற்றை நடத்தி வருகிறோம்.'
  },
  missionTitle: {
    en: 'Our Mission',
    ta: 'நமது நோக்கம்'
  },
  missionText: {
    en: 'To provide direct, dignified, and timely support to destitute, elderly, and economically vulnerable people in and around Tiruchengode — through daily food assistance, emergency medical and funeral support, education access, and a transparent, donor-connected system of community care.',
    ta: 'திருச்செங்கோடு மற்றும் சுற்றுவட்டாரப் பகுதிகளில் உள்ள ஆதரவற்ற, முதியோர், பொருளாதார ரீதியில் நலிந்தோருக்கு — தினசரி உணவு உதவி, அவசர மருத்துவ/இறுதி மரியாதை உதவி, கல்வி வாய்ப்பு, மற்றும் வெளிப்படையான நன்கொடையாளர் இணைப்பு அமைப்பு மூலம் — நேரடியான, கண்ணியமான, சரியான நேரத்தில் உதவி வழங்குதல்.'
  },
  visionTitle: {
    en: 'Our Vision',
    ta: 'நமது தொலைநோக்கு'
  },
  visionText: {
    en: 'A society where people look out for one another as a matter of course, and no deserving person — regardless of their circumstances — is left without help or dignity.',
    ta: 'மக்கள் ஒருவருக்கொருவர் இயல்பாகவே கைகொடுக்கும் ஒரு சமூகம் — தகுதியுள்ள எவரும் உதவியின்றி அல்லது கண்ணியமின்றி விடப்படாத ஒரு சமூகம்.'
  },
  registeredOffice: {
    en: 'Registered Office',
    ta: 'பதிவு அலுவலகம்'
  },
  officeAddress: {
    en: 'Door No. 38/5, Rajeev Nagar Cross Road, Opp. SPM Hospital, Sanga Kiri Main Road, Tiruchengode Town & Taluk, Namakkal District, Tamil Nadu – 637211',
    ta: 'கதவு எண். 38/5, ராஜீவ் நகர் குறுக்கு சாலை, SPM மருத்துவமனை எதிரில், சங்ககிரி மெயின் ரோடு, திருச்செங்கோடு வட்டம், நாமக்கல் மாவட்டம், தமிழ்நாடு – 637211'
  },
  founderTitle: {
    en: 'Founder & Chairman',
    ta: 'நிறுவனர் & தலைவர்'
  },
  founderName: {
    en: 'N. Kavinraj, B.Com., LLM., Advocate',
    ta: 'நா. கவின்ராஜ், B.Com., LLM., வழக்கறிஞர்'
  },
  secretaryTitle: {
    en: 'Secretary',
    ta: 'செயலாளர்'
  },
  secretaryName: {
    en: 'S. Kolarisingar',
    ta: 'S. கொளரிசிங்கர்'
  },
  treasurerTitle: {
    en: 'Treasurer',
    ta: 'பொருளாளர்'
  },
  treasurerName: {
    en: 'Mrs. N. Kogila',
    ta: 'திருமதி. N. கோகிலா'
  },
  trusteeTitle: {
    en: 'Board of Trustees',
    ta: 'அறங்காவலர் குழு'
  },
  deedDetails: {
    en: 'Registered Trust Deed Reference: Doc No. 16/2025, Sub-Registrar Office, Tiruchengode (Registered: 08.04.2025). The trust operates as an irrevocable public charitable trust governed by a Board of Trustees. Financial transactions require joint signatures from the Chairman and Treasurer, and accounts are audited annually.',
    ta: 'பதிவு செய்யப்பட்ட அறக்கட்டளை ஆவண குறிப்பு: ஆவண எண். 16/2025, சார்பதிவாளர் அலுவலகம், திருச்செங்கோடு (பதிவு தேதி: 08.04.2025). இந்த அறக்கட்டளை ஒரு மாற்ற முடியாத பொது தொண்டு அறக்கட்டளையாக செயல்படுகிறது. நிதி பரிவர்த்தனைகள் தலைவர் மற்றும் பொருளாளரின் கூட்டு கையொப்பத்துடன் இயக்கப்படுகின்றன, மேலும் கணக்குகள் ஆண்டுதோறும் தணிக்கை செய்யப்படுகின்றன.'
  },
  learnMore: { en: 'Learn More', ta: 'மேலும் அறிய' },
  contactUs: { en: 'Contact Us', ta: 'எங்களை தொடர்பு கொள்ள' },
  donateNow: { en: 'Donate Now', ta: 'நன்கொடை அளியுங்கள்' },
  requestHelp: { en: 'Request Help', ta: 'உதவி கோருங்கள்' },
  joinAsVolunteer: { en: 'Become a Volunteer', ta: 'தன்னார்வலராக இணையுங்கள்' },
  submitButton: { en: 'Submit Request', ta: 'விண்ணப்பிக்கவும்' },
  submitting: { en: 'Submitting...', ta: 'சமர்ப்பிக்கப்படுகிறது...' },
  successMsg: { en: 'Successfully submitted!', ta: 'வெற்றிகரமாக சமர்ப்பிக்கப்பட்டது!' },
  quickStatsTitle: { en: 'Stated Reach & Social Action (FY 2025–26)', ta: 'நமது பணிகள் மற்றும் தாக்கங்கள் (FY 2025–26)' },
  quickStatsNote: {
    en: 'Based on the founder\'s documentation and active social service reports.',
    ta: 'அறக்கட்டளையின் செயல்பாட்டு ஆவணங்கள் மற்றும் சமூகப் பணி அறிக்கைகளின் அடிப்படையில்.'
  }
};

export const statsData = [
  { label: { en: 'Days of Annadhanam', ta: 'தொடர் அன்னதான நாட்கள்' }, value: '400+' },
  { label: { en: 'People Fed Monthly', ta: 'மாதந்தோறும் உணவு பெறுவோர்' }, value: '3,000+' },
  { label: { en: 'Unclaimed Burials', ta: 'போலீஸ் ஒருங்கிணைப்பு இறுதிச் சடங்கு' }, value: '30+' },
  { label: { en: 'Elders Rescued', ta: 'மீட்கப்பட்ட முதியவர்கள்' }, value: '5+' },
  { label: { en: 'Ambulance Trips Helped', ta: 'ஆம்புலன்ஸ் உதவிய பயனாளிகள்' }, value: '50+' },
  { label: { en: 'Students Sponsored', ta: 'கல்வி கட்டண உதவி' }, value: '15+' }
];

export const servicesData: ServiceItem[] = [
  {
    id: 'food',
    iconName: 'Utensils',
    title: { en: 'Daily Food Distribution (Annadhanam)', ta: 'தினசரி அன்னதானம்' },
    description: {
      en: 'Freshly cooked nutritious meals distributed daily to roadside families and homeless residents around Tiruchengode.',
      ta: 'திருச்செங்கோடு மற்றும் சுற்றுவட்டாரப் பகுதிகளில் வசிக்கும் சாலையோர ஏழைக் குடும்பங்களுக்கும் ஆதரவற்றோருக்கும் தினமும் சமைத்த உணவு வழங்கப்படுகிறது.'
    },
    detailedDescription: {
      en: 'What started as weekend family distribution has expanded into a daily service. We deliver fresh, hot meals directly to where people sleep on pavements, bus stands, and hospital premises. We also provide groceries and meals to local elder-care homes.',
      ta: 'வார இறுதியில் தொடங்கிய இந்த அன்னதானப் பணி தற்போது தினசரி சேவையாக விரிவடைந்துள்ளது. சாலையோரங்களில், பேருந்து நிலையங்களில், மற்றும் அரசு மருத்துவமனை வளாகங்களில் தங்கியிருக்கும் மக்களுக்கு நேரில் சென்று உணவு வழங்குகிறோம். அத்துடன் முதியோர் இல்லங்களுக்கும் உணவு தானியங்களை வழங்குகிறோம்.'
    },
    benefits: {
      en: 'Ensures homeless, sick, and vulnerable individuals do not go hungry. Reaches 50 to 100 roadside individuals daily.',
      ta: 'வீடற்ற, நோய்வாய்ப்பட்ட மற்றும் நலிந்த மக்கள் பசியின்றி இருப்பதை உறுதி செய்கிறது. தினசரி 50 முதல் 100 பேர் வரை பசியாறுகின்றனர்.'
    },
    howToRequest: {
      en: 'Referrals for roadside residents or elderly clusters in need can be made by calling or messaging our WhatsApp line.',
      ta: 'சாலை ஓரங்களில் உணவுத் தேவையில் உள்ள மக்கள் இருந்தால் எங்கள் வாட்ஸ்அப் அல்லது தொலைபேசி எண்ணிற்கு தகவல் தெரிவிக்கலாம்.'
    },
    howToDonate: {
      en: 'Sponsor a day\'s meals for roadside residents, or contribute rice bags, oil, and groceries directly to our distribution center.',
      ta: 'ஒரு நாள் அன்னதானத்தை நீங்கள் முழுமையாக ஸ்பான்சர் செய்யலாம், அல்லது அரிசி மூட்டைகள், சமையல் எண்ணெய், மளிகைப் பொருட்களை நேரடியாக வழங்கலாம்.'
    },
    volunteerRole: {
      en: 'Assist with morning vegetable chopping, meal packing, and transport/distribution along designated roadside routes.',
      ta: 'காலை காய்கறி நறுக்குதல், உணவு பேக்கிங் செய்தல், மற்றும் வாகனங்கள் மூலம் குறிப்பிட்ட இடங்களுக்குச் சென்று உணவு விநியோகம் செய்ய உதவலாம்.'
    }
  },
  {
    id: 'ambulance',
    iconName: 'Ambulance',
    title: { en: 'Free Ambulance Service', ta: 'இலவச ஆம்புலன்ஸ் சேவை' },
    description: {
      en: 'Emergency medical transport and last-mile patient transfer for destitute individuals, free of charge.',
      ta: 'வசதியற்ற ஏழை எளிய மக்களுக்கு அவசர மருத்துவக் காலங்களில் மருத்துவமனைக்குச் செல்ல இலவச ஆம்புலன்ஸ் போக்குவரத்து.'
    },
    detailedDescription: {
      en: 'Launched on March 21, 2026, our dedicated trust ambulance is equipped with life support essentials and GPS tracking. We operate this service specifically for individuals who cannot afford standard private ambulance charges, focusing on transfers to Government Hospitals.',
      ta: 'மார்ச் 21, 2026 அன்று தொடங்கப்பட்ட இந்த ஆம்புலன்ஸ் சேவை, அவசரக் காலங்களில் ஏழை எளிய மக்களை அரசு மருத்துவமனைக்குக் கொண்டு சேர்க்கப் பயன்படுகிறது. இதற்காக எந்தவொரு கட்டணமும் வசூலிக்கப்படுவதில்லை.'
    },
    benefits: {
      en: 'Immediate transit during accidents or critical illness for individuals in Tiruchengode town and taluk. GPS-tracked transparent usage.',
      ta: 'திருச்செங்கோடு மற்றும் சுற்றுவட்டாரப் பகுதிகளில் விபத்துகள் அல்லது அவசர மருத்துவத் தேவைகளின்போது உடனடி போக்குவரத்து.'
    },
    howToRequest: {
      en: 'Dial our emergency response line directly. Support is subject to vehicle availability at the time of the call.',
      ta: 'எங்கள் அவசர தொலைபேசி எண்ணை நேரடியாக அழைக்கவும். வாகனத்தின் இருப்பைப் பொறுத்து உடனடியாக சேவை வழங்கப்படும்.'
    },
    howToDonate: {
      en: 'Fuel sponsorship (monthly log published to sponsors), tyre replacement, or medical equipment additions.',
      ta: 'மாதாந்திர எரிபொருள் செலவை ஸ்பான்சர் செய்யலாம். ஆம்புலன்ஸ் டயர்கள் மற்றும் மருத்துவ உபகரணங்கள் வாங்க உதவலாம்.'
    },
    volunteerRole: {
      en: 'Help coordinate calls, assist non-critical patients during transport, and coordinate logistics with government hospitals.',
      ta: 'தொலைபேசி அழைப்புகளை ஒருங்கிணைத்தல், நோயாளிகளுக்குத் தேவையான உதவிகளைச் செய்தல், மற்றும் அரசு மருத்துவமனைகளுடன் தொடர்புகொள்ளுதல்.'
    }
  },
  {
    id: 'lastrites',
    iconName: 'HeartHandshake',
    title: { en: 'Last Rites for the Unclaimed', ta: 'ஆதரவற்றோருக்கு இறுதி மரியாதை' },
    description: {
      en: 'Providing dignified burials or cremations for unclaimed deceased bodies in coordination with local police.',
      ta: 'உரிமை கோர யாரும் இல்லாத ஆதரவற்ற உடல்களுக்கு காவல்துறையின் அனுமதியுடன் கண்ணியமான முறையில் இறுதிச் சடங்குகள் செய்தல்.'
    },
    detailedDescription: {
      en: 'Every human being deserves a dignified departure. In coordination with local police departments across Namakkal and Salem districts, our trust takes custody of unclaimed bodies of homeless or destitute individuals, arranging full traditional last rites and cremation services with complete dignity.',
      ta: 'ஒவ்வொரு மனிதனும் கண்ணியமான முறையில் விடைபெற தகுதியானவர். நாமக்கல் மற்றும் சேலம் மாவட்ட காவல்துறையினருடன் இணைந்து, சாலைகளில் உயிரிழக்கும் அடையாளம் தெரியாத அல்லது உறவினர்கள் இல்லாத உடல்களைப் பெற்று, முழுமையான இறுதி மரியாதையுடன் அடக்கம் அல்லது தகனம் செய்கிறோம்.'
    },
    benefits: {
      en: 'Dignified departure with respect. Over 30+ police-coordinated burials/cremations have been conducted in Namakkal/Salem district areas.',
      ta: 'மறைந்தோருக்குச் செய்யும் உன்னத கடமை. நாமக்கல் மற்றும் சேலம் பகுதிகளில் இதுவரை 30-க்கும் மேற்பட்ட உடல்களுக்கு போலீஸ் அனுமதியுடன் இறுதிச் சடங்குகள் செய்யப்பட்டுள்ளன.'
    },
    howToRequest: {
      en: 'Normally triggered directly via official communication from the local police station or hospital authorities, rather than public request forms.',
      ta: 'பொதுவாக, இந்த சேவை பொதுப் படிவங்கள் மூலமாக அல்லாமல், காவல்துறை அல்லது அரசு மருத்துவமனை மூலமாகவே எங்களை வந்தடையும்.'
    },
    howToDonate: {
      en: 'Fund cremation and burial costs including shroud cloths, ritual items, and municipal cemetery/crematorium fees.',
      ta: 'இறுதிச் சடங்கிற்கான பொருட்கள், துணி, மாலைகள், மற்றும் தகன மையக் கட்டணங்களை ஸ்பான்சர் செய்யலாம்.'
    },
    volunteerRole: {
      en: 'Due to legal and sensitive requirements, volunteers assist only with non-legal logistics, procurement of ceremonial items, and attending to pay respects.',
      ta: 'சட்டப்பூர்வ நடவடிக்கைகள் காரணமாக, தன்னார்வலர்கள் இறுதிச் சடங்கு உபகரணங்கள் வாங்குவதிலும், இறுதி அஞ்சலி செலுத்துவதிலும் மட்டுமே பங்கேற்க முடியும்.'
    }
  },
  {
    id: 'elderly',
    iconName: 'UserCheck',
    title: { en: 'Elderly Rescue and Rehousing', ta: 'முதியோர் மீட்பும் மறுவாழ்வும்' },
    description: {
      en: 'Identifying, rescuing, and rehousing abandoned, vulnerable, and destitute elderly people into safe care homes.',
      ta: 'சாலையோரம் தவித்து நிற்கும் ஆதரவற்ற முதியவர்களை மீட்டு, அவர்களுக்கு பாதுகாப்பான முதியோர் இல்லங்களில் அடைக்கலம் பெற்றுத் தருதல்.'
    },
    detailedDescription: {
      en: 'We actively reach out to destitute senior citizens left abandoned on the streets or at temple precincts. After basic medical checkups, cleansing, and dressing in clean clothes, we liaise with registered elder-care institutions to secure safe, long-term shelter, medical care, and nutrition for them.',
      ta: 'கோவில்கள், பேருந்து நிலையங்களில் கைவிடப்பட்ட நிலையில் இருக்கும் முதியவர்களை மீட்கிறோம். அவர்களுக்கு அடிப்படை மருத்துவ சிகிச்சை வழங்கி, தலைமுடி திருத்தி, புத்தாடை அணிவித்து, அரசு பதிவு பெற்ற முதியோர் இல்லங்களில் சேர்த்து அவர்களின் வாழ்நாளைப் பாதுகாக்கிறோம்.'
    },
    benefits: {
      en: 'Secures a safe living environment, medical attention, and three meals a day for elders who have no family left to look after them.',
      ta: 'ஆதரவற்ற முதியவர்களுக்கு பாதுகாப்பான தங்குமிடம், மருத்துவ வசதி, மற்றும் மூன்று வேளை சத்தான உணவு கிடைப்பதை உறுதி செய்கிறது.'
    },
    howToRequest: {
      en: 'Report details of abandoned elderly individuals found in public places around Tiruchengode via phone or WhatsApp.',
      ta: 'திருச்செங்கோடு சுற்றுவட்டாரப் பொது இடங்களில் ஆதரவின்றி தவிக்கும் முதியவர்களைக் கண்டால், எங்களது தொலைபேசி அல்லது வாட்ஸ்அப் மூலம் உடனடியாகத் தெரிவிக்கவும்.'
    },
    howToDonate: {
      en: 'Sponsor the initial care-home admission deposit, clothing kits, medical diagnostics, or support a specific elder\'s monthly shelter contribution.',
      ta: 'முதியோர் இல்ல சேர்க்கை வைப்பு நிதி, ஆடைகள், மருத்துவப் பரிசோதனைகள், அல்லது ஒரு முதியவரின் மாதாந்திர பராமரிப்புச் செலவை வழங்கலாம்.'
    },
    volunteerRole: {
      en: 'Support local field verification, accompany elderly persons during rescue transit, and visit rehoused elders to spend quality time with them.',
      ta: 'முதியவர்களை நேரில் கண்டறிந்து மீட்பதில் உதவுதல், இல்லங்களுக்கு அழைத்துச் செல்லுதல், மற்றும் அவ்வப்போது முதியோர் இல்லங்களுக்குச் சென்று அவர்களுடன் நேரம் செலவிடுதல்.'
    }
  },
  {
    id: 'education',
    iconName: 'GraduationCap',
    title: { en: 'Education Support', ta: 'கல்வி உதவித்தொகை' },
    description: {
      en: 'Sponsoring school and college tuition fees for meritorious students from highly vulnerable economic backgrounds.',
      ta: 'ஏழ்மை நிலையிலுள்ள, படிப்பில் ஆர்வம் கொண்ட பள்ளி மற்றும் கல்லூரி மாணவர்களின் கல்வி தடையின்றித் தொடர கட்டண உதவி வழங்குதல்.'
    },
    detailedDescription: {
      en: 'No child should have their schooling stopped over financial hardship. We identify students from single-parent homes or daily-wage earner families who are in danger of dropping out. The trust directly remits pending tuition fees to schools and colleges to keep them in classrooms.',
      ta: 'வறுமையின் காரணமாக எந்தக் குழந்தையும் படிப்பை நிறுத்தக் கூடாது. ஒற்றைப் பெற்றோர் அல்லது கூலித் தொழிலாளர்களின் பிள்ளைகளைக் கண்டறிந்து, அவர்கள் பள்ளி/கல்லூரிப் படிப்பை தொடர கல்வி நிறுவனங்களுக்கு நேரடியாக கட்டணத்தை செலுத்துகிறோம்.'
    },
    benefits: {
      en: 'Has actively supported school and college students, assisting them in continuing their professional and academic degrees.',
      ta: 'ஏழை எளிய மாணவர்கள் தங்களது பள்ளி மற்றும் உயர்கல்விப் பட்டப் படிப்புகளை வெற்றிகரமாகத் தொடர வழி செய்கிறது.'
    },
    howToRequest: {
      en: 'Submit student details along with academic records and fee demand sheets through our Request Help page or contact us directly.',
      ta: 'மாணவர்களின் மதிப்பெண் சான்றிதழ்கள் மற்றும் கட்டண விவரங்களுடன் எங்கள் உதவி கோரும் பக்கத்தில் விண்ணப்பிக்கலாம்.'
    },
    howToDonate: {
      en: 'Sponsor a student\'s annual school fee, college semester fees, or purchase notebooks and educational materials.',
      ta: 'ஒரு மாணவரின் ஓராண்டு பள்ளி கட்டணம் அல்லது கல்லூரி பருவக் கட்டணத்தை ஸ்பான்சர் செய்யலாம். புத்தகங்கள், உபகரணங்கள் வாங்கித் தரலாம்.'
    },
    volunteerRole: {
      en: 'Verify the student\'s economic background via home/school visits and help organize stationary distribution drives.',
      ta: 'உதவி கோரும் மாணவர்களின் வீடுகளுக்குச் சென்று பொருளாதார நிலையை சரிபார்த்தல் மற்றும் கல்வி உபகரணங்கள் வழங்குதலை ஒருங்கிணைத்தல்.'
    }
  },
  {
    id: 'medical',
    iconName: 'Activity',
    title: { en: 'Emergency Medical Fundraising', ta: 'அவசர மருத்துவ நிதி திரட்டல்' },
    description: {
      en: 'Crowdfunding support and direct aid for critical surgeries and accident victims with zero family resources.',
      ta: 'விபத்தில் சிக்கிய ஏழைகளுக்கும், அறுவை சிகிச்சைக்கு பணமின்றித் தவிக்கும் நோயாளிகளுக்கும் மருத்துவ நிதி திரட்ட உதவுதல்.'
    },
    detailedDescription: {
      en: 'When daily wage earners face sudden, catastrophic medical emergencies, they often lack any safety net. The trust assists in validating bills, negotiating with local hospitals, and mobilizing community crowdfunding to ensure immediate surgeries can go ahead without delay.',
      ta: 'திடீர் விபத்துகள் மற்றும் தீவிர நோய்களால் பாதிக்கப்படும் கூலித் தொழிலாளர்களின் மருத்துவச் செலவை ஏற்க உதவிக் கரம் நீட்டுகிறோம். மருத்துவமனைகளுடன் பேசி, சமூக வலைதளங்கள் மூலம் நிதி திரட்டி அவசர அறுவை சிகிச்சைகள் தடையின்றி நடக்க உதவுகிறோம்.'
    },
    benefits: {
      en: 'Prevents treatment denial due to lack of immediate deposit money, providing a critical lifeline during the golden hour.',
      ta: 'பணமில்லாத காரணத்தினால் சிகிச்சை மறுக்கப்படுவதைத் தடுத்து, அவசரக் காலத்தில் மனித உயிர்களைக் காப்பாற்ற உதவுகிறது.'
    },
    howToRequest: {
      en: 'Direct family referral with official hospital estimation sheets and diagnosis records. Emergency cases are prioritized.',
      ta: 'மருத்துவமனையின் அதிகாரப்பூர்வ சிகிச்சை மதிப்பீட்டு ஆவணங்களுடன் எங்களை நேரடியாகத் தொடர்பு கொள்ளலாம்.'
    },
    howToDonate: {
      en: 'Contribute directly toward active verified medical emergency cases highlighted on our transparency board or social channels.',
      ta: 'அறக்கட்டளையால் சரிபார்க்கப்பட்டு வெளியிடப்படும் மருத்துவக் கேஸ்களுக்கு நேரடியாக நிதி வழங்கலாம்.'
    },
    volunteerRole: {
      en: 'Verify case details with hospital staff and support social media campaign dissemination.',
      ta: 'மருத்துவ ஆவணங்களை சரிபார்த்தல் மற்றும் சிகிச்சைக்கான சமூக ஊடகப் பிரச்சாரங்களை பரப்புதல்.'
    }
  }
];

export const galleryData: GalleryItem[] = [
  {
    id: 'g1',
    title: { en: 'Pedestal Fan Donated to Disabled Resident', ta: 'மாற்றுத்திறனாளிக்கு மின்விசிறி வழங்கல்' },
    date: '2026-07-02',
    location: { en: 'Rajeev Nagar, Tiruchengode', ta: 'ராஜீவ் நகர், திருச்செங்கோடு' },
    category: 'Essentials',
    description: {
      en: 'A heavy-duty pedestal fan handed directly to a physically challenged resident in a poorly-ventilated home. Our founder and a volunteer posed with the beneficiary after a same-day door delivery.',
      ta: 'காற்று வசதி இல்லாத வீட்டில் வசிக்கும் மாற்றுத்திறனாளிக்கு நேரில் சென்று வழங்கப்பட்ட மின்விசிறி. நிறுவனரும் தன்னார்வலரும் பயனாளியுடன் படம் எடுத்துக்கொண்டனர்.'
    },
    beneficiaries: { en: 'Physically challenged resident relieved', ta: 'மாற்றுத்திறனாளி நேரடியாக பயன்பெற்றார்' },
    image: '/gallery/activity-fan-donation.jpg'
  },
  {
    id: 'g2',
    title: { en: 'Classroom Educational Resource Support', ta: 'அரசுப் பள்ளி வகுப்பறைகளுக்கு கல்வி உபகரணங்கள்' },
    date: '2026-06-18',
    location: { en: 'Panchayat Union Primary School', ta: 'ஊராட்சி ஒன்றிய தொடக்கப் பள்ளி' },
    category: 'Education',
    description: {
      en: 'Our founder and team visited a government primary school with a vibrantly decorated classroom to hand over educational materials to the headmistress, teachers, and a student representative.',
      ta: 'வண்ணமயமான கல்வி சூழலில் தலைமை ஆசிரியர், ஆசிரியர்கள் மற்றும் மாணவர் பிரதிநிதியிடம் கல்வி உபகரணங்களை வழங்கும் நிகழ்வு.'
    },
    beneficiaries: { en: '1 Primary School fully supported', ta: '1 அரசு தொடக்கப்பள்ளி முழுமையாக ஆதரிக்கப்பட்டது' },
    image: '/gallery/activity-school-classroom.jpg'
  },
  {
    id: 'g3',
    title: { en: 'New Clothes & Essentials Distribution', ta: 'ஏழை எளியோருக்கு புத்தாடை மற்றும் அத்தியாவசியப் பொருட்கள்' },
    date: '2026-06-28',
    location: { en: 'Tiruchengode', ta: 'திருச்செங்கோடு' },
    category: 'Essentials',
    description: {
      en: 'Our founder personally handing bundles of new clothes and essentials to a family in need — the mother holding her child — alongside a local elder who helped coordinate the distribution.',
      ta: 'அறக்கட்டளை நிறுவனர் நேரில் குழந்தையுடன் இருக்கும் தாயிடம் புத்தாடை மற்றும் அத்தியாவசிய பொருட்களை வழங்கும் நிகழ்வு.'
    },
    beneficiaries: { en: 'Family in need received essentials', ta: 'ஏழை குடும்பம் நேரடியாக பயன்பெற்றது' },
    image: '/gallery/activity-clothes-distribution.jpeg'
  },
  {
    id: 'g4',
    title: { en: 'Cricket Kits & Sports Gear Sponsorship', ta: 'இளைஞர்களுக்கு விளையாட்டு உபகரணங்கள் ஸ்பான்சர்ஷிப்' },
    date: '2026-07-15',
    location: { en: 'Green Sports Shop, Tiruchengode', ta: 'கிரீன் ஸ்போர்ட்ஸ் கடை, திருச்செங்கோடு' },
    category: 'Education',
    description: {
      en: 'At Green Sports in Tiruchengode, our founder and a volunteer procured a full cricket bat and kit package for underprivileged local youth, sponsored by the trust to foster grassroots sports talent.',
      ta: 'திருச்செங்கோடு கிரீன் ஸ்போர்ட்ஸில் நிறுவனரும் தன்னார்வலரும் ஏழை இளைஞர்களுக்காக கிரிக்கெட் பேட் மற்றும் கிட் வாங்கும் நிகழ்வு.'
    },
    beneficiaries: { en: 'Local youth cricket team', ta: 'உள்ளூர் இளைஞர் விளையாட்டு குழு பயனடைந்தது' },
    image: '/gallery/activity-cricket-kits.jpeg'
  },
  {
    id: 'g5',
    title: { en: 'Ambulance Launch — Founder & Secretary', ta: 'ஆம்புலன்ஸ் அர்ப்பணிப்பு — நிறுவனரும் செயலாளரும்' },
    date: '2026-03-21',
    location: { en: 'Trust Office, Tiruchengode', ta: 'அறக்கட்டளை அலுவலகம், திருச்செங்கோடு' },
    category: 'Ambulance',
    description: {
      en: 'The trust\'s free emergency ambulance (TN.09.AE.9447) formally flagged off outside our registered office, with the "நல்லதே நடக்கும்" banner overhead. Founder Advocate Kavinraj and Secretary Kolarisingar posed for the historic launch.',
      ta: '"நல்லதே நடக்கும்" பதாகையின் கீழ் அறக்கட்டளை ஆம்புலன்ஸ் (TN.09.AE.9447) முறையாக அர்ப்பணிக்கப்பட்டது. நிறுவனர் மற்றும் செயலாளர் இணைந்த வரலாற்று தருணம்.'
    },
    beneficiaries: { en: '24/7 free ambulance service active', ta: 'இலவச ஆம்புலன்ஸ் சேவை தொடங்கியது' },
    image: '/gallery/activity-ambulance-banner.jpeg'
  },
  {
    id: 'g6',
    title: { en: 'Founder with the Trust Ambulance', ta: 'நிறுவனர் ஆம்புலன்ஸுடன்' },
    date: '2026-03-25',
    location: { en: 'Tiruchengode Town', ta: 'திருச்செங்கோடு நகரம்' },
    category: 'Ambulance',
    description: {
      en: 'Founder and Chairman Advocate N. Kavinraj posed proudly in front of the trust\'s free emergency ambulance bearing the name "நல்லதே நடக்கும் அறக்கட்டளை" — a vehicle serving the most vulnerable at zero cost.',
      ta: 'அறக்கட்டளை நிறுவனர் நா. கவின்ராஜ் "நல்லதே நடக்கும் அறக்கட்டளை" என எழுதப்பட்ட இலவச ஆம்புலன்ஸ் முன்னால் நின்று எடுத்துக்கொண்ட படம்.'
    },
    beneficiaries: { en: 'Symbol of trust\'s emergency mission', ta: 'அவசர சேவையின் அடையாளம்' },
    image: '/gallery/activity-ambulance-founder.jpg'
  },
  {
    id: 'g7',
    title: { en: 'College Fee Scholarships & Financial Aid', ta: 'வறுமையில் உள்ள மாணவர்களுக்கு கல்வி கட்டண உதவி' },
    date: '2026-07-05',
    location: { en: 'Tiruchengode Town', ta: 'திருச்செங்கோடு நகரம்' },
    category: 'Education',
    description: {
      en: 'Founder Advocate Kavinraj personally visiting a student\'s home to hand over the scholarship envelope directly. A mother in a blue saree and her daughter received the education support at their doorstep.',
      ta: 'நிறுவனர் நேரில் சென்று நீல சேலை அணிந்த தாய் மற்றும் மகளிடம் கல்வி கட்டண உதவி வழங்கும் கண்கவர் தருணம்.'
    },
    beneficiaries: { en: 'Student education fees covered', ta: 'மாணவியின் கல்விக் கட்டணம் செலுத்தப்பட்டது' },
    image: '/gallery/activity-education-scholarship.png'
  },
  {
    id: 'g8',
    title: { en: 'Destitute Elderly Rescue — Before & After', ta: 'ஆதரவற்ற முதியவர்கள் மீட்பு — முன்பும் பின்பும்' },
    date: '2026-05-12',
    location: { en: 'Tiruchengode Bus Stand Zone', ta: 'திருச்செங்கோடு பேருந்து நிலைய பகுதி' },
    category: 'Rescue',
    description: {
      en: 'A before-and-after composite: our gloved volunteers found a frail, emaciated elderly man abandoned with his belongings. After bathing, fresh clothes, and care, the same man stands dignified in the second frame alongside our team.',
      ta: 'முதல் படம்: கைவிடப்பட்ட நிலையில் இருந்த மெலிந்த முதியவர். இரண்டாம் படம்: குளிப்பாட்டி, புத்தாடை அணிவித்த பிறகு கண்ணியமான நிலையில் நிற்கும் அதே முதியவர்.'
    },
    beneficiaries: { en: 'Elderly man rescued and re-clothed', ta: 'ஆதரவற்ற முதியவர் மீட்கப்பட்டு புத்தாடை அணிவிக்கப்பட்டார்' },
    image: '/gallery/activity-elder-rescue.jpeg'
  },
  {
    id: 'g9',
    title: { en: 'Annadhanam — Elders Eat a Full Meal', ta: 'அன்னதானம் — முதியோர் நிறைவாக உண்கின்றனர்' },
    date: '2026-07-19',
    location: { en: 'Trust Elder Care Shelter', ta: 'அறக்கட்டளை முதியோர் தங்குமிட வளாகம்' },
    category: 'Food',
    description: {
      en: 'Two elderly men sitting cross-legged on the floor, eating a full rice meal served on stainless steel plates — this is daily life at our care shelter where no one goes to bed hungry.',
      ta: 'நிலத்தில் அமர்ந்து வட்டத் தட்டில் நிறைவான அரிசி உணவு உண்ணும் இரு முதியவர்கள். இந்த தினசரி காட்சிதான் எங்கள் அறக்கட்டளையின் உண்மையான நோக்கம்.'
    },
    beneficiaries: { en: '90+ roadside elders fed daily', ta: 'தினமும் 90-க்கும் மேற்பட்டோர் பசியாறுகின்றனர்' },
    image: '/gallery/activity-food-indoor.jpeg'
  },
  {
    id: 'g10',
    title: { en: 'Street Food & Water Distribution', ta: 'தெரு அன்னதானம் மற்றும் குடிநீர் விநியோகம்' },
    date: '2026-05-20',
    location: { en: 'Tiruchengode Redrock Shelter Stop', ta: 'திருச்செங்கோடு ரெட்ராக் நிழற்குடை' },
    category: 'Food',
    description: {
      en: 'A volunteer handing a packaged food parcel to an elderly man in a saffron-coloured dhoti at the Redrock shelter stop, while an older woman seated nearby waits. Captured during a summer noon distribution.',
      ta: 'ரெட்ராக் நிழற்குடையில் காவி வேட்டி அணிந்த முதியவரிடம் உணவுப் பொட்டலம் வழங்கும் தன்னார்வலர். அருகே அமர்ந்திருக்கும் முதிய பெண்ணும் காத்திருக்கிறார்.'
    },
    beneficiaries: { en: 'Street elders and vendors reached', ta: 'சாலையோர முதியோருக்கு நேரடி உதவி' },
    image: '/gallery/activity-water-street.jpg'
  },
  {
    id: 'g11',
    title: { en: 'Burial Ground Flower Tribute', ta: 'இறுதிச் சடங்கு மற்றும் சமாதி மலரஞ்சலி' },
    date: '2026-06-05',
    location: { en: 'Municipal Cemetery, Tiruchengode', ta: 'நகராட்சி மயானம், திருச்செங்கோடு' },
    category: 'Last Rites',
    description: {
      en: 'Two trust members standing beside a freshly-filled burial mound adorned with flower petals in an open ground. After the interment, the team pays quiet respect before departing.',
      ta: 'மலர் இதழ்களால் அலங்கரிக்கப்பட்ட புதிய சமாதியருகில் அமைதியாக நிற்கும் இரு அறக்கட்டளை உறுப்பினர்கள். அடக்கம் செய்த பின் மரியாதை செலுத்தும் தருணம்.'
    },
    beneficiaries: { en: 'Unclaimed person buried with dignity', ta: 'ஆதரவற்றவர் கண்ணியமாக அடக்கம் செய்யப்பட்டார்' },
    image: '/gallery/activity-burial-ground.jpeg'
  },
  {
    id: 'g12',
    title: { en: 'Last Rites Performed at Home', ta: 'வீட்டிலேயே நடத்தப்பட்ட இறுதிச் சடங்கு' },
    date: '2026-06-12',
    location: { en: 'Namakkal District', ta: 'நாமக்கல் மாவட்டம்' },
    category: 'Last Rites',
    description: {
      en: 'Trust members, nurses in PPE, and a family elder gathered around the flower-draped body of a deceased woman inside a humble tiled-roof home. The trust ensured full traditional rites were observed with dignity.',
      ta: 'ஓட்டு கூரை வீட்டில் மலர் போர்வை போர்த்தப்பட்ட பெண்ணின் உடலருகில் அறக்கட்டளை உறுப்பினர்கள், செவிலியர்கள் மற்றும் குடும்பத்தினர் நின்று மரியாதை செலுத்தும் தருணம்.'
    },
    beneficiaries: { en: 'Full traditional last rites conducted', ta: 'முழுமையான இறுதிச் சடங்குகள் நடத்தப்பட்டன' },
    image: '/gallery/activity-last-rites-indoor.jpg'
  },
  {
    id: 'g13',
    title: { en: 'Mortuary Preparation with Dignity', ta: 'கண்ணியத்துடன் சடல தயாரிப்பு பணி' },
    date: '2026-06-20',
    location: { en: 'Government Hospital Mortuary, Namakkal', ta: 'அரசு மருத்துவமனை, நாமக்கல்' },
    category: 'Last Rites',
    description: {
      en: 'Two trust members and a female volunteer stand beside a body draped in floral cloth on a mortuary slab, inside an open-air preparation area. Every unclaimed person receives the same respectful care.',
      ta: 'திறந்தவெளி தயாரிப்பு இடத்தில் மலர் துணியால் போர்வை போர்த்தப்பட்ட உடலருகில் நிற்கும் இரு அறக்கட்டளை உறுப்பினர்கள் மற்றும் ஒரு மகளிர் தன்னார்வலர்.'
    },
    beneficiaries: { en: 'Unclaimed deceased given respectful preparation', ta: 'ஆதரவற்றவருக்கு கண்ணியமான சடல தயாரிப்பு' },
    image: '/gallery/activity-mortuary-respects.jpg'
  },
  {
    id: 'g14',
    title: { en: 'Hand-Pedaled Tricycle Wheelchair Donation', ta: 'மாற்றுத்திறனாளிகளுக்கு ட்ரைசைக்கிள் சக்கர நாற்காலி' },
    date: '2026-07-08',
    location: { en: 'Sanga Kiri Main Road, Tiruchengode', ta: 'சங்ககிரி மெயின் ரோடு, திருச்செங்கோடு' },
    category: 'Rescue',
    description: {
      en: 'A custom hand-pedaled tricycle, adorned with marigold garlands at the handles and freshly painted, stands ready for handover inside a shelter shed. This unit restores independent mobility for a physically challenged beneficiary.',
      ta: 'மரிகோல்ட் மாலை அலங்காரத்துடன் புதிதாக வர்ணம் பூசப்பட்ட கைமுறை சக்கர நாற்காலி, நிழல் கூரை வளாகத்தில் வழங்குவதற்கு தயாராக நிற்கிறது.'
    },
    beneficiaries: { en: 'Physically challenged resident empowered', ta: 'மாற்றுத்திறனாளி தனித்து நடமாடும் சுதந்திரம் பெற்றார்' },
    image: '/gallery/activity-tricycle-wheelchair.jpg'
  }
];

export const faqData: FAQItem[] = [
  {
    question: {
      en: 'What exactly does the Nallathe Nadakkum trust do?',
      ta: 'நல்லதே நடக்கும் அறக்கட்டளையின் முக்கிய செயல்பாடுகள் என்னென்ன?'
    },
    answer: {
      en: 'We run six core active service lines in and around Tiruchengode: Daily Annadhanam (food distribution) to pavement residents, Free emergency ambulance transit for low-income patients, Last rites and cremation for unclaimed deceased persons with police help, Rescue and placement of homeless elderly, school/college fee sponsorships, and urgent hospital fundraising.',
      ta: 'திருச்செங்கோட்டைச் சுற்றி ஆறு முக்கிய பணிகளைச் செய்கிறோம்: சாலையோர மக்களுக்கு தினசரி அன்னதானம், ஏழைகளுக்கு இலவச ஆம்புலன்ஸ் சேவை, போலீஸ் ஒத்துழைப்புடன் ஆதரவற்று இறப்போருக்கு இறுதிச் சடங்கு, வீடற்ற முதியவர்களை மீட்டு இல்லங்களில் சேர்த்தல், பள்ளி/கல்லூரி கட்டண உதவி, மற்றும் அவசர மருத்துவ நிதி உதவி.'
    }
  },
  {
    question: {
      en: 'Who can request assistance and how is it verified?',
      ta: 'யாரெல்லாம் உதவி கோரலாம், அது எவ்வாறு சரிபார்க்கப்படுகிறது?'
    },
    answer: {
      en: 'Anyone in genuine economic distress, particularly homeless individuals, vulnerable students, and destitute elders, can request aid. Our local volunteer network conducts a quick, respectful in-person visit to verify the situation and documents (such as fee requests or medical bills) before releasing trust resources.',
      ta: 'உண்மையிலேயே வறுமையில் உள்ள எவரும் உதவி கோரலாம். உதவி கோரிக்கை வந்ததும், எங்களது தன்னார்வலர்கள் நேரடியாகச் சென்று உண்மை நிலையை விசாரித்து, ஆவணங்களை (மருத்துவ பில் அல்லது கல்லூரி கட்டண சீட்டு) சரிபார்த்த பின்னரே அறக்கட்டளை நிதியை வழங்குவர்.'
    }
  },
  {
    question: {
      en: 'How are donations and funds managed inside the trust?',
      ta: 'அறக்கட்டளையின் நிதியும் நன்கொடைகளும் எவ்வாறு நிர்வகிக்கப்படுகின்றன?'
    },
    answer: {
      en: 'As per our registered Trust Deed (Doc No. 16/2025), all financial operations are routed strictly through our official bank account and require joint signatures from both our Founder & Chairman (Advocate N. Kavinraj) and our Treasurer (Mrs. N. Kogila). We maintain a complete ledger, and accounts are audited annually by a certified accountant.',
      ta: 'எங்கள் பதிவு ஆவணத்தின்படி (Doc No. 16/2025), அனைத்து பணப் பரிமாற்றங்களும் அறக்கட்டளையின் வங்கிக் கணக்கு மூலமாகவே நடக்கும். தலைவர் (வழக்கறிஞர் நா. கவின்ராஜ்) மற்றும் பொருளாளர் (திருமதி. N. கோகிலா) ஆகியோரின் கூட்டு கையொப்பம் அவசியமாகும். கணக்குகள் ஆண்டுதோறும் முறையாக தணிக்கை செய்யப்படுகின்றன.'
    }
  },
  {
    question: {
      en: 'Are donations to the trust tax-deductible?',
      ta: 'இந்த அறக்கட்டளைக்கு அளிக்கும் நன்கொடைகளுக்கு வரி விலக்கு உண்டா?'
    },
    answer: {
      en: 'Not at this moment. The trust has been recently registered on April 8, 2025. Applications for 12A and 80G tax exemptions are currently in process with the Income Tax department. Until they are formally granted, we cannot offer tax-deductible receipts, which we explicitly communicate to all donors to preserve trust and transparency.',
      ta: 'தற்போது வரி விலக்கு இல்லை. எங்களது அறக்கட்டளை 08.04.2025 அன்றுதான் பதிவு செய்யப்பட்டது. 12A மற்றும் 80G வரி விலக்குக்கான விண்ணப்பங்கள் வருமான வரித் துறையிடம் நிலுவையில் உள்ளன. அவை அங்கீகரிக்கப்பட்ட பின்னரே வரி விலக்கு ரசீதுகளை வழங்க முடியும். இதை நாங்கள் வெளிப்படையாகத் தெரிவித்துக் கொள்கிறோம்.'
    }
  },
  {
    question: {
      en: 'Does the trust accept foreign donations?',
      ta: 'அறக்கட்டளை வெளிநாட்டு நன்கொடைகளை ஏற்கிறதா?'
    },
    answer: {
      en: 'No. The trust does not possess FCRA registration and, therefore, is legally prohibited from accepting any funds or donations from bank accounts located outside of India. We request all international supporters to cooperate with this legal boundary.',
      ta: 'இல்லை. எங்கள் அறக்கட்டளையிடம் வெளிநாட்டு நிதி பெறுவதற்கான FCRA பதிவு இல்லை. எனவே, சட்டப்படி இந்தியாவிற்கு வெளியில் உள்ள கணக்குகளிலிருந்து எங்களால் நன்கொடை பெற முடியாது.'
    }
  },
  {
    question: {
      en: 'How can I volunteer my time?',
      ta: 'நான் எவ்வாறு தன்னார்வலராக பங்களிக்க முடியும்?'
    },
    answer: {
      en: 'We always need volunteers! You can register online using our Volunteer page, selecting your areas of interest (such as helping package morning meals, driving/coordinating the ambulance, verifying case details, or assisting in local educational distribution). We will contact you via WhatsApp for upcoming drives.',
      ta: 'அன்னதான உணவு பேக்கிங் செய்தல், ஆம்புலன்ஸ் சேவைக்கு உதவுதல், கள ஆய்வு செய்தல், மற்றும் கல்வி விநியோகப் பணிகளில் தன்னார்வலராக இணையலாம். தன்னார்வலர் பக்கத்தில் உங்கள் விவரங்களைப் பதிவு செய்தால், நாங்கள் வாட்ஸ்அப் மூலம் தொடர்புகொள்வோம்.'
    }
  },
  {
    question: {
      en: 'Can I donate materials directly instead of money?',
      ta: 'பணத்திற்குப் பதிலாகப் பொருட்களை நேரடியாக வழங்கலாமா?'
    },
    answer: {
      en: 'Yes, absolutely! Material donations are highly encouraged. We regularly accept raw rice bags, cooking oils, groceries for our daily annadhanam, new sarees/shirts for distribution, and school notebooks or stationery for student support. Please reach out to our registered address or contact us to coordinate delivery.',
      ta: 'நிச்சயமாக! அரிசி மூட்டைகள், சமையல் எண்ணெய், மளிகைப் பொருட்கள், புத்தாடைகள், அல்லது மாணவர்களுக்கான நோட்டுப் புத்தகங்களை நீங்கள் நேரடியாக வழங்கலாம். எங்கள் பதிவு அலுவலகத்திற்கு நேரில் வழங்கலாம் அல்லது எங்களைத் தொடர்பு கொண்டு பேசலாம்.'
    }
  },
  {
    question: {
      en: 'How can I report incorrect or fraudulent fundraising claiming to represent the trust?',
      ta: 'அறக்கட்டளையின் பெயரில் தவறான அல்லது போலி நிதி திரட்டல்களைக் கண்டால் எங்கு புகார் அளிப்பது?'
    },
    answer: {
      en: 'We maintain zero tolerance for financial discrepancies. We will never ask for transfers to unlisted personal bank accounts or private phone numbers. If you encounter any suspicious donation appeal under our name, please report it immediately to us via email at nallathanadakum@gmail.com so we can take immediate action.',
      ta: 'அறக்கட்டளையின் பெயரில் யாராவது தனிநபர் கணக்கிற்குப் பணம் கேட்டால் அனுப்ப வேண்டாம். இது போன்ற ஏமாற்று வேலைகளைக் கண்டால் உடனடியாக எங்களது nallathanadakum@gmail.com மின்னஞ்சலுக்குத் தெரிவிக்குமாறு கேட்டுக் கொள்கிறோம்.'
    }
  }
];

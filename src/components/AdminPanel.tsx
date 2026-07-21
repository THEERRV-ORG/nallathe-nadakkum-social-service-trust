import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { FaClock, FaCircleCheck, FaTrash, FaCircleExclamation, FaAward, FaFileLines, FaUserCheck, FaXmark, FaArrowsRotate } from 'react-icons/fa6';

interface AdminPanelProps {
  lang: 'en' | 'ta';
  onClose: () => void;
}

export default function AdminPanel({ lang, onClose }: AdminPanelProps) {
  const [requests, setRequests] = useState<any[]>([]);
  const [vols, setVols] = useState<any[]>([]);
  const [donors, setDonors] = useState<any[]>([]);
  const [activeSubTab, setActiveSubTab] = useState<'requests' | 'volunteers' | 'sponsors'>('requests');

  useEffect(() => {
    loadLocalData();
  }, []);

  const loadLocalData = () => {
    try {
      const r = localStorage.getItem('nn_help_requests');
      if (r) setRequests(JSON.parse(r));
      
      const v = localStorage.getItem('nn_volunteer_applications');
      if (v) setVols(JSON.parse(v));

      const d = localStorage.getItem('nn_sponsors_wall');
      if (d) setDonors(JSON.parse(d));
    } catch (e) {
      console.error(e);
    }
  };

  const updateRequestStatus = (id: string, newStatus: string) => {
    const updated = requests.map(req => req.id === id ? { ...req, status: newStatus } : req);
    localStorage.setItem('nn_help_requests', JSON.stringify(updated));
    setRequests(updated);
  };

  const updateVolStatus = (id: string, newStatus: string) => {
    const updated = vols.map(vol => vol.id === id ? { ...vol, status: newStatus } : vol);
    localStorage.setItem('nn_volunteer_applications', JSON.stringify(updated));
    setVols(updated);
  };

  const deleteRequest = (id: string) => {
    const updated = requests.filter(req => req.id !== id);
    localStorage.setItem('nn_help_requests', JSON.stringify(updated));
    setRequests(updated);
  };

  const deleteVol = (id: string) => {
    const updated = vols.filter(vol => vol.id !== id);
    localStorage.setItem('nn_volunteer_applications', JSON.stringify(updated));
    setVols(updated);
  };

  const deleteDonor = (name: string, date: string) => {
    const updated = donors.filter(d => !(d.name === name && d.date === date));
    localStorage.setItem('nn_sponsors_wall', JSON.stringify(updated));
    setDonors(updated);
  };

  const seedMockData = () => {
    const mockRequests = [
      { id: 'NN-REQ-7741', name: 'M. Palanisamy', phone: '9443567890', address: 'Bypass Road, Tiruchengode', type: 'Ambulance', desc: 'Destitute elder requiring immediate transfer to Salem Govt Hospital for lung care.', urgency: 'Immediate', date: '20.07.2026', status: 'Approved & Dispatched' },
      { id: 'NN-REQ-4890', name: 'Selvi S.', phone: '9842512345', address: 'Rajeev Nagar Dwellings, Tiruchengode', type: 'Education', desc: 'School fee support for single-parent child in 10th standard.', urgency: 'Within a Week', date: '19.07.2026', status: 'Pending Verification' },
      { id: 'NN-REQ-1249', name: 'Tiruchengode North Police Station', phone: '04288-252100', address: 'Salem main road, Tiruchengode', type: 'Last Rites', desc: 'Support requested for performing last-rites of an unidentified male found near bus stand.', urgency: 'Immediate', date: '18.07.2026', status: 'Approved & Dispatched' }
    ];

    const mockVols = [
      { id: 'NN-VOL-1190', name: 'G. Vignesh', phone: '9944012345', location: 'SPM Road, Tiruchengode', interests: ['Food packing', 'Field verification'], availability: 'Weekends', date: '19.07.2026', status: 'Active Volunteer' },
      { id: 'NN-VOL-5531', name: 'Advocate P. Ramkumar', phone: '9003567891', location: 'Tiruchengode Town', interests: ['Field verification', 'Social media'], availability: 'Flexible', date: '17.07.2026', status: 'Contacted on WhatsApp' }
    ];

    const mockDonors = [
      { name: 'K. Senthil Kumar', type: 'Sponsorship', item: 'Annadhanam (1 Day)', msg: 'Sponsoring in memory of my parents.', date: '20.07.2026' },
      { name: 'Nandhini Devi', type: 'Material', item: '2 Rice bags (25kg)', msg: 'For the daily kitchen, thank you team!', date: '18.07.2026' },
      { name: 'Ravi & Family', type: 'Sponsorship', item: 'Student Fees Support', msg: 'Wishing the trust all strength.', date: '15.07.2026' }
    ];

    localStorage.setItem('nn_help_requests', JSON.stringify(mockRequests));
    localStorage.setItem('nn_volunteer_applications', JSON.stringify(mockVols));
    localStorage.setItem('nn_sponsors_wall', JSON.stringify(mockDonors));

    setRequests(mockRequests);
    setVols(mockVols);
    setDonors(mockDonors);
  };

  const clearAllData = () => {
    if (confirm('Are you sure you want to clear all dispatch logs, volunteer registers, and sponsor entries from this device?')) {
      localStorage.removeItem('nn_help_requests');
      localStorage.removeItem('nn_volunteer_applications');
      localStorage.removeItem('nn_sponsors_wall');
      setRequests([]);
      setVols([]);
      setDonors([]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/55 backdrop-blur-xs">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        className="w-full max-w-5xl h-[88vh] rounded-2xl bg-white shadow-2xl border border-gray-100 flex flex-col overflow-hidden"
      >
        {/* Panel Header */}
        <div className="bg-gray-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="h-8 w-8 bg-emerald-600 rounded-lg flex items-center justify-center text-sm font-bold">
              💼
            </div>
            <div>
              <h2 className="font-display text-sm sm:text-base font-bold tracking-tight">
                {lang === 'en' ? 'Trustee Dispatch Dashboard' : 'அறங்காவலர் நிர்வாகத் தளம்'}
              </h2>
              <p className="text-[10px] sm:text-xs text-gray-400">
                {lang === 'en' ? 'Review help files, assign volunteers, and confirm sponsors.' : 'உதவி கோரிக்கைகளை ஆய்வு செய்யவும், தன்னார்வலர்களை நியமிக்கவும்.'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-gray-800 rounded-lg text-gray-400 hover:text-white transition-colors cursor-pointer"
          >
            <FaXmark className="h-4 w-4" />
          </button>
        </div>

        {/* Action Controls Sub-bar */}
        <div className="bg-gray-50 border-b border-gray-100 px-5 py-3 flex flex-wrap gap-3 items-center justify-between text-xs font-semibold">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveSubTab('requests')}
              className={`px-3 py-1.5 rounded-lg cursor-pointer ${activeSubTab === 'requests' ? 'bg-gray-800 text-white' : 'bg-white border text-gray-600 hover:bg-gray-100'}`}
            >
              {lang === 'en' ? 'Requests Help' : 'உதவி கோரிக்கைகள்'} ({requests.length})
            </button>
            <button
              onClick={() => setActiveSubTab('volunteers')}
              className={`px-3 py-1.5 rounded-lg cursor-pointer ${activeSubTab === 'volunteers' ? 'bg-gray-800 text-white' : 'bg-white border text-gray-600 hover:bg-gray-100'}`}
            >
              {lang === 'en' ? 'Volunteer Registry' : 'தன்னார்வலர் பட்டியல்'} ({vols.length})
            </button>
            <button
              onClick={() => setActiveSubTab('sponsors')}
              className={`px-3 py-1.5 rounded-lg cursor-pointer ${activeSubTab === 'sponsors' ? 'bg-gray-800 text-white' : 'bg-white border text-gray-600 hover:bg-gray-100'}`}
            >
              {lang === 'en' ? 'Gratitude Board' : 'நன்றிக் கூட பதிவுகள்'} ({donors.length})
            </button>
          </div>

          <div className="flex gap-2">
            <button
              id="seed-mock-btn"
              onClick={seedMockData}
              className="px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 cursor-pointer flex items-center space-x-1"
              title="Loads standard real entries for audit display"
            >
              <FaArrowsRotate className="h-3 w-3" />
              <span>{lang === 'en' ? 'Seed Demo Records' : 'மாதிரி பதிவுகள் பதிவேற்று'}</span>
            </button>
            <button
              onClick={clearAllData}
              className="px-3 py-1.5 rounded-lg bg-red-50 text-red-800 border border-red-200 hover:bg-red-100 cursor-pointer"
            >
              {lang === 'en' ? 'Clear Device Database' : 'சாதன தரவுகளை அழி'}
            </button>
          </div>
        </div>

        {/* Main Records Display Grid (Scrollable) */}
        <div className="p-6 overflow-y-auto flex-grow bg-slate-50">
          
          {/* TAB 1: HELP DISPATCH FILES */}
          {activeSubTab === 'requests' && (
            <div className="space-y-4">
              {requests.length === 0 ? (
                <div className="text-center py-16 bg-white border border-dashed rounded-2xl text-xs sm:text-sm text-gray-500 space-y-2">
                  <p>{lang === 'en' ? 'No active dispatch files submitted yet.' : 'பதிவு செய்யப்பட்ட விண்ணப்பங்கள் எதுவும் இல்லை.'}</p>
                  <p className="text-xs text-gray-400">{lang === 'en' ? 'Click "Seed Demo Records" to instantly populate realistic audited requests.' : 'மாதிரி பதிவுகளை பதிவேற்ற மேலே உள்ள பட்டனை அழுத்தவும்.'}</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {requests.map((req) => (
                    <div key={req.id} className="bg-white rounded-xl border border-gray-100 p-5 shadow-xs flex flex-col justify-between space-y-4 relative">
                      
                      {/* Request Header */}
                      <div className="flex justify-between items-start">
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <span className="font-mono text-xs font-bold text-emerald-800">{req.id}</span>
                            <span className={`text-[9px] font-bold px-2 py-0.5 rounded ${req.urgency === 'Immediate' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-600'}`}>
                              {req.urgency}
                            </span>
                          </div>
                          <h4 className="font-display font-bold text-gray-900 text-sm">{req.name}</h4>
                          <p className="text-[10px] font-mono text-gray-400">Date Logged: {req.date}</p>
                        </div>
                        <button
                          onClick={() => deleteRequest(req.id)}
                          className="text-gray-300 hover:text-red-600 p-1 cursor-pointer"
                        >
                          <FaTrash className="h-4 w-4" />
                        </button>
                      </div>

                      {/* Details Box */}
                      <div className="bg-gray-50 p-3.5 rounded-lg text-xs text-gray-600 space-y-2">
                        <p className="leading-relaxed"><strong>Situation:</strong> {req.desc}</p>
                        <p className="text-[11px]"><strong>Address:</strong> {req.address}</p>
                        <p className="text-[11px]"><strong>Phone:</strong> {req.phone}</p>
                        <p className="text-[11px]"><strong>Need Track:</strong> <span className="font-semibold text-emerald-800">{req.type}</span></p>
                      </div>

                      {/* Status Editor Controls */}
                      <div className="pt-2 border-t border-gray-50 flex items-center justify-between text-xs">
                        <span className="font-semibold text-gray-400 uppercase tracking-wider text-[9px]">
                          Audit Status
                        </span>
                        
                        <div className="flex gap-1.5">
                          {['Pending Verification', 'Approved & Dispatched'].map((st) => (
                            <button
                              key={st}
                              onClick={() => updateRequestStatus(req.id, st)}
                              className={`px-2.5 py-1 rounded text-[10px] font-bold cursor-pointer transition-colors ${
                                req.status === st
                                  ? 'bg-emerald-600 text-white'
                                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                              }`}
                            >
                              {st === 'Pending Verification' ? (lang === 'en' ? 'Audit' : 'விசாரணை') : (lang === 'en' ? 'Approve' : 'ஒப்புதல்')}
                            </button>
                          ))}
                        </div>
                      </div>

                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: VOLUNTEERS APPLICATIONS LIST */}
          {activeSubTab === 'volunteers' && (
            <div className="space-y-4">
              {vols.length === 0 ? (
                <div className="text-center py-16 bg-white border border-dashed rounded-2xl text-xs sm:text-sm text-gray-500 space-y-2">
                  <p>{lang === 'en' ? 'No volunteer applications registered on this device yet.' : 'பதிவு செய்யப்பட்ட தன்னார்வலர்கள் யாரும் இல்லை.'}</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {vols.map((vol) => (
                    <div key={vol.id} className="bg-white rounded-xl border border-gray-100 p-5 shadow-xs flex flex-col justify-between space-y-4">
                      
                      <div className="flex justify-between items-start">
                        <div className="space-y-1">
                          <span className="font-mono text-xs font-bold text-emerald-800">{vol.id}</span>
                          <h4 className="font-display font-bold text-gray-900 text-sm">{vol.name}</h4>
                          <p className="text-[10px] text-gray-400">Availability: {vol.availability}</p>
                        </div>
                        <button
                          onClick={() => deleteVol(vol.id)}
                          className="text-gray-300 hover:text-red-600 p-1 cursor-pointer"
                        >
                          <FaTrash className="h-4 w-4" />
                        </button>
                      </div>

                      <div className="bg-gray-50 p-3.5 rounded-lg text-xs text-gray-600 space-y-2">
                        <p><strong>Location:</strong> {vol.location}</p>
                        <p><strong>WhatsApp Phone:</strong> {vol.phone}</p>
                        <p className="leading-relaxed"><strong>Interests:</strong> {Array.isArray(vol.interests) ? vol.interests.join(', ') : vol.interests}</p>
                        {vol.skills && <p className="leading-normal text-slate-500"><strong>Skills Note:</strong> {vol.skills}</p>}
                      </div>

                      {/* Status controllers */}
                      <div className="pt-2 border-t border-gray-50 flex items-center justify-between text-xs">
                        <span className="font-semibold text-gray-400 uppercase tracking-wider text-[9px]">
                          Staff Status
                        </span>
                        
                        <div className="flex gap-1.5">
                          {['Registered', 'Active Volunteer'].map((st) => (
                            <button
                              key={st}
                              onClick={() => updateVolStatus(vol.id, st)}
                              className={`px-2.5 py-1 rounded text-[10px] font-bold cursor-pointer transition-colors ${
                                vol.status === st
                                  ? 'bg-emerald-600 text-white'
                                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                              }`}
                            >
                              {st === 'Registered' ? (lang === 'en' ? 'Hold' : 'பதிவு') : (lang === 'en' ? 'Active' : 'சேவையில்')}
                            </button>
                          ))}
                        </div>
                      </div>

                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: GRATITUDE BOARD LEDGERS */}
          {activeSubTab === 'sponsors' && (
            <div className="space-y-4">
              {donors.length === 0 ? (
                <div className="text-center py-16 bg-white border border-dashed rounded-2xl text-xs sm:text-sm text-gray-500 space-y-2">
                  <p>{lang === 'en' ? 'No pledges published on the wall yet.' : 'நன்றிக் கூடத்தில் பதிவுகள் எதுவும் இல்லை.'}</p>
                </div>
              ) : (
                <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-xs">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead className="bg-gray-50 border-b border-gray-100 text-gray-600 font-bold">
                      <tr>
                        <th className="px-4 py-3">{lang === 'en' ? 'Donor Name' : 'நன்கொடையாளர் பெயர்'}</th>
                        <th className="px-4 py-3">{lang === 'en' ? 'Sponsorship Contribution' : 'பங்களிப்பு விபரம்'}</th>
                        <th className="px-4 py-3">{lang === 'en' ? 'Blessing Message' : 'வாழ்த்துச் செய்தி'}</th>
                        <th className="px-4 py-3">{lang === 'en' ? 'Date' : 'தேதி'}</th>
                        <th className="px-4 py-3 text-center">{lang === 'en' ? 'Action' : 'செயல்'}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50 text-gray-700 font-medium">
                      {donors.map((d, idx) => (
                        <tr key={idx}>
                          <td className="px-4 py-3 font-semibold text-gray-900">{d.name}</td>
                          <td className="px-4 py-3">
                            <span className="font-mono bg-emerald-50 text-emerald-800 font-bold px-2 py-0.5 rounded text-xs">
                              {d.item}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-gray-500 italic max-w-xs truncate">"{d.msg}"</td>
                          <td className="px-4 py-3 text-gray-400 font-mono text-[11px]">{d.date}</td>
                          <td className="px-4 py-3 text-center">
                            <button
                              onClick={() => deleteDonor(d.name, d.date)}
                              className="text-gray-400 hover:text-red-600 p-1 cursor-pointer"
                            >
                              <FaTrash className="h-3.5 w-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

        </div>

        {/* Panel Footer */}
        <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-end">
          <button
            onClick={onClose}
            className="rounded-lg bg-gray-800 text-white font-semibold text-xs px-5 py-2 hover:bg-gray-700 transition-colors cursor-pointer"
          >
            {lang === 'en' ? 'Exit Dashboard' : 'வெளியேறவும்'}
          </button>
        </div>

      </motion.div>
    </div>
  );
}

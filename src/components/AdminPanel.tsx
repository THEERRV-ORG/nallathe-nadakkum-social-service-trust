import { useMemo, useState } from 'react';
import type { Dispatch, ReactElement, ReactNode, SetStateAction } from 'react';
import {
  FaBars,
  FaBell,
  FaChartSimple,
  FaChevronRight,
  FaCircleInfo,
  FaClapperboard,
  FaFileLines,
  FaGear,
  FaHouse,
  FaImage,
  FaInbox,
  FaMagnifyingGlass,
  FaMoneyBillTransfer,
  FaRegEye,
  FaRightFromBracket,
  FaShieldHalved,
  FaUpload,
  FaUser,
  FaUserCheck,
  FaUsers,
  FaVideo,
  FaXmark,
} from 'react-icons/fa6';
import { galleryData } from '../data';
import BrandMark from './ui/BrandMark';

type AdminRoute =
  | 'overview'
  | 'assistance'
  | 'volunteers'
  | 'speaker-invitations'
  | 'messages'
  | 'gallery'
  | 'photos'
  | 'videos'
  | 'donations'
  | 'website'
  | 'settings';

type StatusTone = 'green' | 'blue' | 'gold' | 'red' | 'gray';

interface AdminPanelProps {
  lang?: 'en' | 'ta';
  onClose?: () => void;
}

const assistanceRows = [
  { id: 'AR-9012', name: 'Arjun Kumar', phone: '+91 98765 41021', category: 'Medical', urgency: 'High', location: 'Madurai', submitted: '2h ago', status: 'New', note: 'Needs medical bill verification before field visit.' },
  { id: 'AR-8994', name: 'Priya Mani', phone: '+91 98412 55904', category: 'Education', urgency: 'Medium', location: 'Chennai', submitted: '5h ago', status: 'Under Review', note: 'School fee document received through WhatsApp.' },
  { id: 'AR-8950', name: 'Latha S.', phone: '+91 94431 22567', category: 'Elderly Care', urgency: 'Low', location: 'Coimbatore', submitted: '1d ago', status: 'Verified', note: 'Volunteer visit completed.' },
  { id: 'AR-8910', name: 'Ram Kumar', phone: '+91 75400 17625', category: 'Housing', urgency: 'Medium', location: 'Namakkal', submitted: '2d ago', status: 'In Progress', note: 'Trustee review pending.' },
];

const volunteerRows = [
  { id: 'VA-3021', name: 'Meera Jasmine', phone: '+91 98765 00981', email: 'meera@example.com', location: 'Madurai', area: 'Meal packing', availability: 'Weekends', submitted: 'Today', status: 'New' },
  { id: 'VA-3018', name: 'Arun Karthik', phone: '+91 94444 11880', email: 'arun@example.com', location: 'Chennai', area: 'Ambulance logs', availability: 'Evenings', submitted: 'Yesterday', status: 'Contacted' },
  { id: 'VA-2999', name: 'Nivetha R.', phone: '+91 90031 44220', email: 'nivetha@example.com', location: 'Tiruchengode', area: 'Street elder rescue', availability: 'Weekdays', submitted: '2d ago', status: 'Approved' },
];

const speakerRows = [
  { id: 'SI-118', organization: 'Arts College', contact: 'S. Kumar', phone: '+91 98765 43210', email: 'events@example.com', event: 'Youth Service Talk', location: 'Tiruchengode', date: '12 Aug 2026', audience: '250 students', message: 'Invite founder to speak about social responsibility.', status: 'Reviewing' },
  { id: 'SI-117', organization: 'Rotary Club', contact: 'Deepak Raj', phone: '+91 90033 12000', email: 'deepak@example.com', event: 'Community Leadership Meet', location: 'Namakkal', date: '28 Aug 2026', audience: 'Local donors', message: 'Requesting a short address and Q&A.', status: 'Contacted' },
];

const messageRows = [
  { id: 'CM-544', sender: 'Deepak Raj', contact: '+91 90033 12000', subject: 'Donation document request', preview: 'I would like to know about the upcoming blood donation camp...', date: '2 mins ago', status: 'Unread' },
  { id: 'CM-543', sender: 'Sarah Williams', contact: 'sarah@example.com', subject: 'Partnership enquiry', preview: 'Inquiry regarding international corporate partnership opportunities...', date: '1 hour ago', status: 'Read' },
  { id: 'CM-542', sender: 'Vijay Sethu', contact: '+91 98421 77880', subject: 'Local community support', preview: 'Thank you for the support provided to my local community center last...', date: 'Yesterday', status: 'Replied' },
];

const donations = [
  { donor: 'Local family sponsor', program: 'Annadhanam', amount: '₹2,000', mode: 'UPI', date: '20.07.2026', status: 'Acknowledged' },
  { donor: 'Community rice donor', program: 'Rice bags', amount: 'Material', mode: 'Direct', date: '18.07.2026', status: 'Recorded' },
  { donor: 'Student welfare sponsor', program: 'Education Support', amount: '₹5,000', mode: 'Bank', date: '15.07.2026', status: 'Acknowledged' },
];

const navGroups: Array<{ title: string; items: Array<{ id: AdminRoute; label: string; icon: ReactElement }> }> = [
  { title: 'Overview', items: [{ id: 'overview', label: 'Dashboard', icon: <FaChartSimple /> }] },
  {
    title: 'Form Submissions',
    items: [
      { id: 'assistance', label: 'Assistance Requests', icon: <FaFileLines /> },
      { id: 'volunteers', label: 'Volunteer Applications', icon: <FaUsers /> },
      { id: 'speaker-invitations', label: 'Founder Speaker Invitations', icon: <FaUserCheck /> },
      { id: 'messages', label: 'Contact Messages', icon: <FaInbox /> },
    ],
  },
  {
    title: 'Content',
    items: [
      { id: 'gallery', label: 'Gallery', icon: <FaImage /> },
      { id: 'photos', label: 'Photos', icon: <FaImage /> },
      { id: 'videos', label: 'Videos', icon: <FaVideo /> },
    ],
  },
  { title: 'Financial / Donor', items: [{ id: 'donations', label: 'Donation Records', icon: <FaMoneyBillTransfer /> }] },
  {
    title: 'System',
    items: [
      { id: 'website', label: 'Website', icon: <FaHouse /> },
      { id: 'settings', label: 'Settings', icon: <FaGear /> },
    ],
  },
];

function toneFor(status: string): StatusTone {
  if (['Verified', 'Completed', 'Approved', 'Accepted', 'Active', 'Acknowledged', 'Published', 'Replied'].includes(status)) return 'green';
  if (['Under Review', 'Reviewing', 'Contacted', 'In Progress', 'Read'].includes(status)) return 'blue';
  if (['Medium', 'Recorded', 'Draft'].includes(status)) return 'gold';
  if (['Rejected', 'Declined', 'High', 'Unread'].includes(status)) return 'red';
  return 'gray';
}

function StatusBadge({ children }: { children: string }) {
  const tone = toneFor(children);
  const cls = {
    green: 'bg-emerald-50 text-emerald-700 ring-emerald-100',
    blue: 'bg-brand-blue-50 text-brand-blue-700 ring-brand-blue-100',
    gold: 'bg-brand-gold-50 text-brand-gold-700 ring-brand-gold-100',
    red: 'bg-red-50 text-red-700 ring-red-100',
    gray: 'bg-gray-100 text-gray-700 ring-gray-200',
  }[tone];
  return <span className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-bold ring-1 ${cls}`}>{children}</span>;
}

function Metric({ label, value, icon }: { label: string; value: string; icon: ReactElement }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4">
      <div className="flex items-center justify-between gap-3">
        <p className="max-w-[9rem] text-[11px] font-bold uppercase tracking-wider text-gray-700">{label}</p>
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">{icon}</span>
      </div>
      <p className="mt-3 font-display text-3xl font-extrabold text-emerald-950">{value}</p>
    </div>
  );
}

function AdminTable({ children }: { children: ReactNode }) {
  return <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">{children}</div>;
}

export default function AdminPanel({ onClose }: AdminPanelProps) {
  const [route, setRoute] = useState<AdminRoute>(() => {
    const last = window.location.pathname.split('/').filter(Boolean).at(-1);
    return (last && last !== 'admin' ? last : 'overview') as AdminRoute;
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<string | null>(null);
  const [statusDrafts, setStatusDrafts] = useState<Record<string, string>>({});
  const [notes, setNotes] = useState<Record<string, string>>({});

  const activeLabel = navGroups.flatMap((g) => g.items).find((item) => item.id === route)?.label ?? 'Dashboard';
  const assistance = useMemo(() => assistanceRows.filter((row) => `${row.name} ${row.category} ${row.location}`.toLowerCase().includes(query.toLowerCase())), [query]);

  const navigate = (next: AdminRoute) => {
    setRoute(next);
    setSelected(null);
    setSidebarOpen(false);
    window.history.pushState(null, '', next === 'overview' ? '/admin' : `/admin/${next}`);
  };

  const Sidebar = (
    <aside className="flex h-full w-72 flex-col bg-emerald-950 text-white">
      <div className="flex items-center gap-3 px-5 py-5">
        <BrandMark size="inline" variant="round" className="bg-white/95" />
        <div>
          <p className="font-display text-sm font-bold leading-tight">Nallathe Nadakkum</p>
          <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-200">Administration</p>
        </div>
      </div>

      <nav className="flex-1 space-y-5 overflow-y-auto px-3 pb-4">
        {navGroups.map((group) => (
          <div key={group.title} className="space-y-1">
            <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-emerald-300/80">{group.title}</p>
            {group.items.map((item) => (
              <button
                key={item.id}
                onClick={() => navigate(item.id)}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-xs font-semibold transition-colors ${
                  route === item.id ? 'bg-white/12 text-white' : 'text-emerald-50 hover:bg-white/8'
                }`}
              >
                <span className="text-emerald-300">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        ))}
      </nav>

      <div className="space-y-2 border-t border-white/10 p-3">
        <button onClick={() => { window.history.pushState(null, '', '/'); onClose?.(); window.location.reload(); }} className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-xs font-semibold text-emerald-50 hover:bg-white/8">
          <FaHouse className="text-emerald-300" /> View Public Website
        </button>
        <div className="flex items-center gap-3 rounded-xl bg-white/8 p-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 text-emerald-800"><FaUser /></div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-bold">Admin Profile</p>
            <p className="truncate text-[10px] text-emerald-200">Server auth required</p>
          </div>
          <FaRightFromBracket className="text-emerald-300" />
        </div>
      </div>
    </aside>
  );

  return (
    <div className="min-h-screen bg-[#f8fbf8] font-sans text-gray-900">
      <div className="lg:hidden">
        {sidebarOpen && (
          <div className="fixed inset-0 z-50 flex">
            <div className="w-72">{Sidebar}</div>
            <button aria-label="Close admin navigation" onClick={() => setSidebarOpen(false)} className="flex-1 bg-black/40" />
          </div>
        )}
      </div>

      <div className="flex min-h-screen">
        <div className="hidden lg:block">{Sidebar}</div>

        <div className="min-w-0 flex-1">
          <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-gray-200 bg-white/95 px-4 backdrop-blur sm:px-6">
            <div className="flex items-center gap-3">
              <button onClick={() => setSidebarOpen(true)} className="rounded-lg p-2 text-gray-700 hover:bg-gray-100 lg:hidden" aria-label="Open admin navigation">
                <FaBars />
              </button>
              <h1 className="font-display text-lg font-bold text-emerald-950">{activeLabel}</h1>
            </div>
            <div className="flex items-center gap-3">
              <label className="relative hidden sm:block">
                <span className="sr-only">Search admin records</span>
                <FaMagnifyingGlass className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
                <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search requests..." className="h-10 w-64 rounded-full border border-gray-200 bg-gray-50 pl-9 pr-3 text-xs outline-none focus:border-emerald-500 focus:bg-white" />
              </label>
              <button className="relative rounded-lg p-2 text-gray-700 hover:bg-gray-100" aria-label="Notifications">
                <FaBell />
                <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />
              </button>
            </div>
          </header>

          <main className="mx-auto max-w-7xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs leading-relaxed text-amber-900">
              <span className="font-bold">Security note:</span> this admin interface is UI-only until connected to server-side authentication, role-based authorization, protected storage, and audit logs. Do not use it for real beneficiary, donor, or submission data yet.
            </div>

            {route === 'overview' && (
              <section className="space-y-6">
                <div>
                  <h2 className="font-display text-2xl font-extrabold text-emerald-950 sm:text-3xl">Good morning,<br />Nallathe Nadakkum Administration</h2>
                  <p className="mt-1 text-sm text-gray-700">Manage requests, volunteers, enquiries and website content.</p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                  <Metric label="Assistance Requests" value="142" icon={<FaFileLines />} />
                  <Metric label="Volunteer Applications" value="28" icon={<FaUsers />} />
                  <Metric label="Speaker Invitations" value="09" icon={<FaUserCheck />} />
                  <Metric label="Contact Messages" value="54" icon={<FaInbox />} />
                </div>
                <div className="grid gap-6 xl:grid-cols-[1fr_20rem]">
                  <RecentAssistance rows={assistanceRows.slice(0, 4)} onOpen={setSelected} />
                  <MessageList compact />
                </div>
                <VolunteerCards />
              </section>
            )}

            {route === 'assistance' && (
              <SubmissionSection title="Assistance Requests" subtitle="Submissions from the Request Assistance form." rows={assistance} statusOptions={['New', 'Under Review', 'Verified', 'In Progress', 'Completed', 'Rejected']} selected={selected} setSelected={setSelected} statusDrafts={statusDrafts} setStatusDrafts={setStatusDrafts} notes={notes} setNotes={setNotes} />
            )}

            {route === 'volunteers' && <VolunteerSection />}
            {route === 'speaker-invitations' && <SpeakerSection />}
            {route === 'messages' && <MessageList />}
            {['gallery', 'photos', 'videos'].includes(route) && <GalleryAdmin route={route} />}
            {route === 'donations' && <DonationSection />}
            {['website', 'settings'].includes(route) && <SystemSection route={route} />}
          </main>
        </div>
      </div>
    </div>
  );
}

function RecentAssistance({ rows, onOpen }: { rows: typeof assistanceRows; onOpen: (id: string) => void }) {
  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-lg font-bold text-emerald-950">Recent Assistance Requests</h2>
        <button className="text-xs font-bold text-emerald-700">View All</button>
      </div>
      <AdminTable>
        <table className="w-full text-left text-xs">
          <thead className="bg-gray-50 text-[10px] uppercase tracking-wider text-gray-600">
            <tr><th className="px-4 py-3">Requester</th><th className="px-4 py-3">Category</th><th className="px-4 py-3">Status</th><th className="px-4 py-3">Action</th></tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {rows.map((row) => (
              <tr key={row.id} className="hover:bg-emerald-50/40">
                <td className="px-4 py-3 font-semibold">{row.name}</td>
                <td className="px-4 py-3">{row.category}</td>
                <td className="px-4 py-3"><StatusBadge>{row.status}</StatusBadge></td>
                <td className="px-4 py-3"><button onClick={() => onOpen(row.id)} className="text-emerald-700"><FaRegEye /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </AdminTable>
    </section>
  );
}

function SubmissionSection(props: {
  title: string;
  subtitle: string;
  rows: typeof assistanceRows;
  statusOptions: string[];
  selected: string | null;
  setSelected: (id: string | null) => void;
  statusDrafts: Record<string, string>;
  setStatusDrafts: Dispatch<SetStateAction<Record<string, string>>>;
  notes: Record<string, string>;
  setNotes: Dispatch<SetStateAction<Record<string, string>>>;
}) {
  const active = props.rows.find((row) => row.id === props.selected);
  return (
    <section className="space-y-5">
      <PageIntro title={props.title} subtitle={props.subtitle} />
      <div className="grid gap-3 md:grid-cols-4">
        {['New', 'Verified', 'In Progress', 'High'].map((label, idx) => <Metric key={label} label={label === 'High' ? 'High Urgency' : label} value={['24', '112', '18', '06'][idx]} icon={<FaCircleInfo />} />)}
      </div>
      <div className="flex flex-wrap gap-3">
        <input placeholder="Search by name or case ID..." className="form-control max-w-sm" />
        <select className="form-control max-w-44"><option>All statuses</option>{props.statusOptions.map((s) => <option key={s}>{s}</option>)}</select>
        <select className="form-control max-w-44"><option>All categories</option><option>Medical</option><option>Education</option><option>Elderly Care</option></select>
      </div>
      <AdminTable>
        <table className="w-full min-w-[760px] text-left text-xs">
          <thead className="bg-gray-50 text-[10px] uppercase tracking-wider text-gray-600">
            <tr>{['Applicant / Beneficiary', 'Phone', 'Category', 'Urgency', 'Location', 'Submitted', 'Status', 'Action'].map((h) => <th key={h} className="px-4 py-3">{h}</th>)}</tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {props.rows.map((row) => (
              <tr key={row.id} className="hover:bg-emerald-50/40">
                <td className="px-4 py-3"><p className="font-bold">{row.name}</p><p className="text-[10px] text-gray-500">{row.id}</p></td>
                <td className="px-4 py-3">{row.phone}</td>
                <td className="px-4 py-3">{row.category}</td>
                <td className="px-4 py-3"><StatusBadge>{row.urgency}</StatusBadge></td>
                <td className="px-4 py-3">{row.location}</td>
                <td className="px-4 py-3">{row.submitted}</td>
                <td className="px-4 py-3"><StatusBadge>{props.statusDrafts[row.id] ?? row.status}</StatusBadge></td>
                <td className="px-4 py-3"><button onClick={() => props.setSelected(row.id)} className="text-emerald-700"><FaRegEye /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </AdminTable>
      {active && (
        <DetailDrawer title={active.name} onClose={() => props.setSelected(null)}>
          <dl className="grid gap-3 text-sm sm:grid-cols-2">
            {Object.entries(active).filter(([key]) => key !== 'note').map(([key, value]) => <div key={key}><dt className="text-[10px] font-bold uppercase tracking-wider text-gray-500">{key}</dt><dd className="font-semibold text-gray-900">{value}</dd></div>)}
          </dl>
          <div className="space-y-2">
            <label className="form-label">Update status</label>
            <select value={props.statusDrafts[active.id] ?? active.status} onChange={(e) => props.setStatusDrafts((s) => ({ ...s, [active.id]: e.target.value }))} className="form-control">
              {props.statusOptions.map((status) => <option key={status}>{status}</option>)}
            </select>
          </div>
          <div className="space-y-2">
            <label className="form-label">Internal admin notes</label>
            <textarea value={props.notes[active.id] ?? active.note} onChange={(e) => props.setNotes((n) => ({ ...n, [active.id]: e.target.value }))} className="form-control min-h-28" />
            <p className="text-xs text-gray-500">Notes are UI-only until a protected backend is connected.</p>
          </div>
        </DetailDrawer>
      )}
    </section>
  );
}

function VolunteerSection() {
  return <GenericTable title="Volunteer Applications" subtitle="Submissions from the Become a Volunteer form." headers={['Name', 'Phone', 'Email', 'Location', 'Preferred Area', 'Availability', 'Submitted', 'Status']} rows={volunteerRows.map((r) => [r.name, r.phone, r.email, r.location, r.area, r.availability, r.submitted, r.status])} />;
}

function SpeakerSection() {
  return <GenericTable title="Founder Speaker Invitations" subtitle="Requests from the Invite Founder as Speaker form." headers={['Organization', 'Contact Person', 'Phone', 'Event', 'Location', 'Event Date', 'Audience', 'Status']} rows={speakerRows.map((r) => [r.organization, r.contact, r.phone, r.event, r.location, r.date, r.audience, r.status])} />;
}

function MessageList({ compact = false }: { compact?: boolean }) {
  return (
    <section className="space-y-3">
      {!compact && <PageIntro title="Contact Messages" subtitle="Inbox-style view for public contact messages." />}
      <div className="rounded-xl border border-gray-200 bg-white">
        {messageRows.map((msg) => (
          <button key={msg.id} className={`block w-full border-b border-gray-100 p-4 text-left last:border-b-0 ${msg.status === 'Unread' ? 'bg-emerald-50/35' : ''}`}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-bold">{msg.sender}</p>
                <p className="mt-1 text-xs font-semibold text-gray-700">{msg.subject}</p>
                <p className="mt-1 line-clamp-2 text-xs text-gray-600">{msg.preview}</p>
              </div>
              <div className="shrink-0 text-right"><StatusBadge>{msg.status}</StatusBadge><p className="mt-2 text-[10px] text-gray-500">{msg.date}</p></div>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}

function VolunteerCards() {
  return (
    <section className="space-y-3">
      <h2 className="font-display text-lg font-bold text-emerald-950">Recent Volunteer Applications</h2>
      <div className="grid gap-3 sm:grid-cols-2">
        {volunteerRows.slice(0, 2).map((person) => (
          <div key={person.id} className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700"><FaUser /></span>
            <div className="min-w-0 flex-1"><p className="truncate text-sm font-bold">{person.name}</p><p className="text-xs text-gray-600">{person.location}</p></div>
            <FaChevronRight className="text-gray-400" />
          </div>
        ))}
      </div>
    </section>
  );
}

function GalleryAdmin({ route }: { route: AdminRoute }) {
  const media = galleryData.filter((item, idx) => route === 'videos' ? idx % 5 === 0 : route === 'photos' ? idx % 5 !== 0 : true).slice(0, 8);
  return (
    <section className="space-y-5">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <PageIntro title={route === 'videos' ? 'Video Management' : route === 'photos' ? 'Photo Management' : 'Gallery'} subtitle="Manage the photos and videos shown on the public website." />
        <div className="flex gap-3">
          <button className="btn btn-secondary"><FaClapperboard /> Add Video</button>
          <button className="btn btn-primary"><FaUpload /> Upload Photos</button>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 rounded-xl bg-gray-100 p-1 text-xs font-bold text-gray-700">
        {['All', 'Photos', 'Videos', 'Published', 'Draft'].map((filter) => <button key={filter} className="rounded-lg px-4 py-2 hover:bg-white">{filter}</button>)}
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {media.map((item, idx) => (
          <article key={item.id} className="group overflow-hidden rounded-xl border border-gray-200 bg-white">
            <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
              <img src={item.image} alt={item.title.en} className="h-full w-full object-cover transition-transform group-hover:scale-105" />
              <span className="absolute left-3 top-3"><StatusBadge>{idx % 4 === 0 ? 'Draft' : 'Published'}</StatusBadge></span>
              <div className="absolute inset-0 hidden items-center justify-center gap-2 bg-emerald-950/55 text-white group-hover:flex">
                <button className="rounded-full bg-white p-2 text-emerald-800" aria-label="Preview"><FaRegEye /></button>
                <button className="rounded-full bg-white p-2 text-emerald-800" aria-label="Edit"><FaGear /></button>
                <button className="rounded-full bg-white p-2 text-red-600" aria-label="Delete"><FaXmark /></button>
              </div>
            </div>
            <div className="space-y-1 p-3">
              <h3 className="line-clamp-1 text-sm font-bold">{item.title.en}</h3>
              <div className="flex justify-between text-[10px] font-semibold text-gray-500"><span>{item.category}</span><span>{item.date}</span></div>
            </div>
          </article>
        ))}
        <button className="min-h-60 rounded-xl border border-dashed border-gray-300 bg-white text-sm font-bold text-gray-700 hover:border-emerald-400 hover:text-emerald-700">
          Upload More Media
        </button>
      </div>
      <UploadPlaceholder />
    </section>
  );
}

function UploadPlaceholder() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5">
      <h3 className="font-display text-base font-bold">Upload Photo / Add Video Fields</h3>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {['Photo upload / Video URL', 'Title', 'Short description', 'Category', 'Event date', 'Alt text'].map((label) => <input key={label} placeholder={label} className="form-control" />)}
        <select className="form-control"><option>Draft</option><option>Published</option></select>
      </div>
      <p className="mt-3 text-xs text-gray-500">Upload progress and permanent storage require backend storage integration.</p>
    </div>
  );
}

function DonationSection() {
  return <GenericTable title="Donation Records" subtitle="Acknowledgement tracking for bank, UPI, and material donation records." headers={['Donor', 'Program', 'Amount', 'Mode', 'Date', 'Status']} rows={donations.map((d) => [d.donor, d.program, d.amount, d.mode, d.date, d.status])} />;
}

function SystemSection({ route }: { route: AdminRoute }) {
  return (
    <section className="space-y-5">
      <PageIntro title={route === 'settings' ? 'Settings' : 'Website'} subtitle="Operational configuration placeholders for a future secured backend." />
      <div className="rounded-xl border border-gray-200 bg-white p-5 text-sm leading-relaxed text-gray-700">
        <h3 className="font-display text-base font-bold text-gray-900">Required before production admin use</h3>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>Server-side session authentication with MFA for trustees.</li>
          <li>Role-based authorization for forms, gallery, and donor records.</li>
          <li>Protected database and object storage for submissions and media.</li>
          <li>Tamper-resistant audit logs for status changes and notes.</li>
        </ul>
      </div>
    </section>
  );
}

function GenericTable({ title, subtitle, headers, rows }: { title: string; subtitle: string; headers: string[]; rows: string[][] }) {
  return (
    <section className="space-y-5">
      <PageIntro title={title} subtitle={subtitle} />
      <AdminTable>
        <table className="w-full min-w-[760px] text-left text-xs">
          <thead className="bg-gray-50 text-[10px] uppercase tracking-wider text-gray-600"><tr>{headers.map((h) => <th key={h} className="px-4 py-3">{h}</th>)}</tr></thead>
          <tbody className="divide-y divide-gray-100">
            {rows.map((row, idx) => <tr key={idx} className="hover:bg-emerald-50/40">{row.map((cell, cidx) => <td key={cidx} className="px-4 py-3">{cidx === row.length - 1 ? <StatusBadge>{cell}</StatusBadge> : cell}</td>)}</tr>)}
          </tbody>
        </table>
      </AdminTable>
    </section>
  );
}

function PageIntro({ title, subtitle }: { title: string; subtitle: string }) {
  return <div><h2 className="font-display text-2xl font-extrabold text-emerald-950">{title}</h2><p className="mt-1 text-sm text-gray-700">{subtitle}</p></div>;
}

function DetailDrawer({ title, onClose, children }: { title: string; onClose: () => void; children: ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/35">
      <section className="h-full w-full max-w-xl overflow-y-auto bg-white p-6 shadow-2xl">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="font-display text-xl font-bold text-emerald-950">{title}</h3>
          <button onClick={onClose} className="rounded-lg p-2 hover:bg-gray-100" aria-label="Close details"><FaXmark /></button>
        </div>
        <div className="space-y-5">{children}</div>
      </section>
    </div>
  );
}

import { useEffect, useRef, useState } from 'react';
import type { ReactElement } from 'react';
import {
  FaBars,
  FaChevronDown,
  FaFileLines,
  FaInbox,
  FaMoneyBillTransfer,
  FaRightFromBracket,
  FaUser,
  FaUserCheck,
  FaUsers,
  FaXmark,
} from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { isFirebaseConfigured } from '../lib/firebase';
import { listenToSubmissions, type SubmissionCollection, type SubmissionRecord } from '../lib/submissions';
import BrandMark from './ui/BrandMark';

type AdminRoute =
  | 'assistance'
  | 'volunteers'
  | 'speaker-invitations'
  | 'messages'
  | 'donations';

interface AdminPanelProps {
  lang?: 'en' | 'ta';
  onClose?: () => void;
}

type RowValue = string;
type AdminRow = {
  id: string;
  status: string;
  values: RowValue[];
};

const navGroups: Array<{ title: string; items: Array<{ id: AdminRoute; label: string; icon: ReactElement }> }> = [
  {
    title: 'Form Submissions',
    items: [
      { id: 'assistance', label: 'Assistance Requests', icon: <FaFileLines /> },
      { id: 'volunteers', label: 'Volunteer Applications', icon: <FaUsers /> },
      { id: 'speaker-invitations', label: 'Founder Speaker Invitations', icon: <FaUserCheck /> },
      { id: 'messages', label: 'Contact Messages', icon: <FaInbox /> },
    ],
  },
  { title: 'Financial / Donor', items: [{ id: 'donations', label: 'Donation Records', icon: <FaMoneyBillTransfer /> }] },
];

const routeCollections: Record<AdminRoute, SubmissionCollection> = {
  assistance: 'assistanceRequests',
  volunteers: 'volunteerApplications',
  'speaker-invitations': 'speakerInvitations',
  messages: 'contactMessages',
  donations: 'donationPledges',
};

function value(data: Record<string, unknown>, key: string) {
  const raw = data[key];
  if (Array.isArray(raw)) return raw.join(', ');
  return typeof raw === 'string' || typeof raw === 'number' || typeof raw === 'boolean' ? String(raw) : '';
}

function rowFor(route: AdminRoute, record: SubmissionRecord): AdminRow {
  const data = record.data;
  const valuesByRoute: Record<AdminRoute, string[]> = {
    assistance: [
      value(data, 'beneficiaryName'),
      value(data, 'phone'),
      value(data, 'assistanceCategory'),
      value(data, 'urgencyLevel'),
      value(data, 'address'),
      value(data, 'situation'),
    ],
    volunteers: [
      value(data, 'name'),
      value(data, 'phone'),
      value(data, 'location'),
      value(data, 'availability'),
      value(data, 'interests'),
      value(data, 'skillsMessage'),
    ],
    'speaker-invitations': [
      value(data, 'name'),
      value(data, 'phone'),
      value(data, 'organisation'),
      value(data, 'eventDate'),
      value(data, 'venue'),
    ],
    messages: [
      value(data, 'name'),
      value(data, 'phone'),
      value(data, 'message'),
    ],
    donations: [
      value(data, 'donorName'),
      value(data, 'phone'),
      value(data, 'supportType'),
      value(data, 'programme'),
      value(data, 'supportDetail'),
      value(data, 'message'),
    ],
  };

  return { id: record.id, status: '', values: valuesByRoute[route] };
}

export default function AdminPanel({ onClose }: AdminPanelProps) {
  const routerNavigate = useNavigate();
  const { logout } = useAuth();
  const [route, setRoute] = useState<AdminRoute>(() => {
    const last = window.location.pathname.split('/').filter(Boolean).at(-1);
    const validRoutes: AdminRoute[] = ['assistance', 'volunteers', 'speaker-invitations', 'messages', 'donations'];
    return validRoutes.includes(last as AdminRoute) ? last as AdminRoute : 'assistance';
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  // Close the profile dropdown on any outside interaction or Escape.
  useEffect(() => {
    if (!profileOpen) return undefined;

    const handlePointerDown = (event: PointerEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setProfileOpen(false);
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [profileOpen]);
  const [rowsByRoute, setRowsByRoute] = useState<Record<AdminRoute, AdminRow[]>>({
    assistance: [],
    volunteers: [],
    'speaker-invitations': [],
    messages: [],
    donations: [],
  });
  const [loadingByRoute, setLoadingByRoute] = useState<Record<AdminRoute, boolean>>({
    assistance: true,
    volunteers: true,
    'speaker-invitations': true,
    messages: true,
    donations: true,
  });
  const [tableError, setTableError] = useState('');

  useEffect(() => {
    if (!isFirebaseConfigured) {
      setTableError('Firebase is not configured yet. Add your Firebase env values to load submissions.');
      setLoadingByRoute({
        assistance: false,
        volunteers: false,
        'speaker-invitations': false,
        messages: false,
        donations: false,
      });
      return undefined;
    }

    const unsubs = (Object.keys(routeCollections) as AdminRoute[]).map((routeKey) => (
      listenToSubmissions(
        routeCollections[routeKey],
        (records) => {
          setRowsByRoute((current) => ({ ...current, [routeKey]: records.map((record) => rowFor(routeKey, record)) }));
          setLoadingByRoute((current) => ({ ...current, [routeKey]: false }));
        },
        () => {
          setTableError('Could not load submissions from Firebase.');
          setLoadingByRoute((current) => ({ ...current, [routeKey]: false }));
        },
      )
    ));

    return () => unsubs.forEach((unsubscribe) => unsubscribe());
  }, []);

  const activeLabel = navGroups.flatMap((g) => g.items).find((item) => item.id === route)?.label ?? 'Assistance Requests';

  const navigate = (next: AdminRoute) => {
    setRoute(next);
    setSidebarOpen(false);
    routerNavigate(`/admin/${next}`);
  };

  const handleLogout = () => {
    logout();
    routerNavigate('/login', { replace: true });
  };

  const Sidebar = (
    <aside className="flex h-full w-72 flex-col bg-emerald-950 text-white">
      <div className="flex items-center gap-3 px-5 py-5">
        <BrandMark size="inline" variant="round" className="bg-white/95" />
        <div>
          <p className="font-display text-sm font-bold leading-tight">Nallathae Nadakkum</p>
          <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-200">Administration</p>
        </div>
      </div>

      <nav className="flex-1 space-y-4 overflow-y-auto px-3 pb-4">
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
        <button onClick={handleLogout} className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-xs font-semibold text-emerald-50 hover:bg-white/8">
          <FaRightFromBracket className="text-emerald-300" /> Logout
        </button>
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
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setProfileOpen((open) => !open)}
                aria-haspopup="menu"
                aria-expanded={profileOpen}
                className="flex items-center gap-3 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-bold text-gray-900 hover:border-emerald-200"
              >
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-emerald-100 text-emerald-800"><FaUser /></span>
                <span className="hidden sm:inline">Admin User</span>
                <FaChevronDown className="h-3 w-3 text-gray-500" />
              </button>
              {profileOpen && (
                <div className="absolute right-0 mt-2 w-44 rounded-xl border border-gray-100 bg-white p-1.5 shadow-lg">
                  <button onClick={handleLogout} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs font-bold text-gray-800 hover:bg-emerald-50">
                    <FaRightFromBracket className="text-emerald-700" /> Sign out
                  </button>
                </div>
              )}
            </div>
          </header>

          <main className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
            {route === 'assistance' && (
              <FormTable
                title="Assistance Requests"
                subtitle="Request Help form submissions."
                headers={['Beneficiary Name', 'Contact Phone / WhatsApp', 'Assistance Category', 'Urgency Level', 'Address / Location Details', 'Distress / Medical Situation']}
                rows={rowsByRoute.assistance}
                loading={loadingByRoute.assistance}
                error={tableError}
              />
            )}
            {route === 'volunteers' && (
              <FormTable
                title="Volunteer Applications"
                subtitle="Volunteer form submissions."
                headers={['Your Name', 'WhatsApp Phone Number', 'Your Location / Town', 'Your Availability', 'Areas of Interest', 'Any specific skills / message']}
                rows={rowsByRoute.volunteers}
                loading={loadingByRoute.volunteers}
                error={tableError}
              />
            )}
            {route === 'speaker-invitations' && (
              <FormTable
                title="Founder Speaker Invitations"
                subtitle="Invite as Speaker form submissions."
                headers={['Your Name', 'Phone / WhatsApp', 'Organisation / Function Name', 'Event Date', 'Venue / Location']}
                rows={rowsByRoute['speaker-invitations']}
                loading={loadingByRoute['speaker-invitations']}
                error={tableError}
              />
            )}
            {route === 'messages' && (
              <FormTable
                title="Contact Messages"
                subtitle="Contact form submissions."
                headers={['Your Name', 'Phone / WhatsApp', 'Message']}
                rows={rowsByRoute.messages}
                loading={loadingByRoute.messages}
                error={tableError}
              />
            )}
            {route === 'donations' && (
              <FormTable
                title="Donation Records"
                subtitle="Donation form and acknowledgement records."
                headers={['Donor Name', 'Contact Phone', 'Support Type', 'Programme to Support', 'Amount / Material / Blood Type', 'Blessing / Message']}
                rows={rowsByRoute.donations}
                loading={loadingByRoute.donations}
                error={tableError}
              />
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

const ROWS_PER_PAGE = 10;

function FormTable({
  title,
  subtitle,
  headers,
  rows,
  loading,
  error,
}: {
  title: string;
  subtitle: string;
  headers: string[];
  rows: AdminRow[];
  loading: boolean;
  error: string;
}) {
  const [page, setPage] = useState(1);
  const [selectedRow, setSelectedRow] = useState<AdminRow | null>(null);

  const totalPages = Math.max(1, Math.ceil(rows.length / ROWS_PER_PAGE));
  const safePage = Math.min(page, totalPages);
  const pageRows = rows.slice((safePage - 1) * ROWS_PER_PAGE, safePage * ROWS_PER_PAGE);

  // Keep the page in range when the underlying data shrinks (e.g. live updates).
  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  // Close the detail drawer on Escape.
  useEffect(() => {
    if (!selectedRow) return undefined;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedRow(null);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [selectedRow]);

  const showPagination = !error && !loading && rows.length > ROWS_PER_PAGE;
  const firstRow = rows.length === 0 ? 0 : (safePage - 1) * ROWS_PER_PAGE + 1;
  const lastRow = Math.min(safePage * ROWS_PER_PAGE, rows.length);

  return (
    <section className="space-y-4">
      <PageIntro title={title} subtitle={subtitle} />
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[920px] text-left text-xs">
            <thead className="bg-gray-50 text-[10px] uppercase tracking-wider text-gray-600">
              <tr>
                {headers.map((header) => <th key={header} className="px-4 py-3">{header}</th>)}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {error && (
                <tr>
                  <td colSpan={headers.length} className="px-4 py-6 text-center text-sm font-semibold text-red-600">
                    {error}
                  </td>
                </tr>
              )}
              {!error && loading && (
                <tr>
                  <td colSpan={headers.length} className="px-4 py-10 text-center text-sm font-semibold text-gray-500">
                    Loading submissions...
                  </td>
                </tr>
              )}
              {!error && !loading && pageRows.map((row) => (
                <tr
                  key={row.id}
                  onClick={() => setSelectedRow(row)}
                  className="cursor-pointer transition-colors hover:bg-emerald-50/40"
                >
                  {row.values.map((value, idx) => (
                    <td key={`${row.id}-${idx}`} className="max-w-[18rem] px-4 py-3 align-top">
                      <p className={`line-clamp-2 break-words ${idx === 0 ? 'font-bold text-gray-950' : 'text-gray-800'}`}>{value}</p>
                    </td>
                  ))}
                </tr>
              ))}
              {!error && !loading && rows.length === 0 && (
                <tr>
                  <td colSpan={headers.length} className="px-4 py-10 text-center text-sm font-semibold text-gray-500">
                    No rows available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {showPagination && (
          <div className="flex flex-col gap-3 border-t border-gray-100 bg-gray-50/60 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[11px] font-semibold text-gray-600">
              Showing {firstRow}–{lastRow} of {rows.length}
            </p>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={safePage === 1}
                className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-gray-700 transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setPage(n)}
                  aria-current={n === safePage ? 'page' : undefined}
                  className={`min-w-[2rem] rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-colors ${
                    n === safePage ? 'bg-emerald-600 text-white' : 'border border-gray-200 bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {n}
                </button>
              ))}
              <button
                type="button"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={safePage === totalPages}
                className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-gray-700 transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Detail drawer — full, labelled view of a single submission */}
      {selectedRow && (
        <div
          className="fixed inset-0 z-50 flex justify-end"
          role="dialog"
          aria-modal="true"
          aria-label={`${title} — record detail`}
        >
          {/* Backdrop */}
          <button
            type="button"
            aria-label="Close detail"
            onClick={() => setSelectedRow(null)}
            className="flex-1 bg-black/40"
          />
          {/* Panel */}
          <div className="flex h-full w-full max-w-md flex-col bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
              <div className="min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">{title}</p>
                <h3 className="truncate font-display text-base font-bold text-gray-950">
                  {selectedRow.values[0] || 'Record detail'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedRow(null)}
                aria-label="Close"
                className="ml-3 shrink-0 rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900"
              >
                <FaXmark />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4">
              <dl className="space-y-4">
                {headers.map((header, idx) => (
                  <div key={header} className="space-y-1">
                    <dt className="text-[10px] font-bold uppercase tracking-wider text-gray-500">{header}</dt>
                    <dd className="whitespace-pre-wrap break-words text-sm text-gray-900">
                      {selectedRow.values[idx]?.trim() ? selectedRow.values[idx] : <span className="text-gray-400">—</span>}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="border-t border-gray-200 px-5 py-3">
              <button
                type="button"
                onClick={() => setSelectedRow(null)}
                className="w-full rounded-lg bg-emerald-600 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function PageIntro({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div>
      <h2 className="font-display text-2xl font-extrabold text-emerald-950">{title}</h2>
      <p className="mt-1 text-sm text-gray-700">{subtitle}</p>
    </div>
  );
}

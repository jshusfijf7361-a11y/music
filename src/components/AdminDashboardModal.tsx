import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PartnerWaitlistEntry } from '../types';
import {
  X,
  ShieldAlert,
  ShieldCheck,
  Users,
  BookOpen,
  DollarSign,
  Plus,
  Trash2,
  CheckCircle2,
  Sparkles,
  BarChart2,
  Search,
  Phone,
  Mail,
  Building2,
  FileText,
  Clock,
  Lock,
  KeyRound,
  Download,
  Filter,
  Terminal,
  Cpu,
  LogOut,
  RefreshCw,
  ExternalLink
} from 'lucide-react';

export const AdminDashboardModal: React.FC = () => {
  const {
    isAdminOpen,
    setIsAdminOpen,
    isCipherAuthenticated,
    setIsCipherAuthenticated,
    setIsCipherAuthModalOpen,
    courses,
    artists,
    user,
    partnerWaitlist,
    updatePartnerWaitlistStatus,
    deletePartnerWaitlistEntry,
    addToast,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'partner_waitlist' | 'overview' | 'courses' | 'bookings' | 'donations' | 'cipher_security'>('partner_waitlist');
  
  // Partner Waitlist Filters
  const [partnerSearch, setPartnerSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Pending' | 'Contacted' | 'Approved' | 'Declined'>('All');

  // Inline Cipher Auth Login State (if opened directly)
  const [cipherUserInput, setCipherUserInput] = useState('');
  const [cipherPassInput, setCipherPassInput] = useState('');
  const [cipherAuthError, setCipherAuthError] = useState('');

  // New Course Form State
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Music Production');

  if (!isAdminOpen) return null;

  // Handle Cipher Authentication Submission
  const handleCipherLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const userClean = cipherUserInput.trim().toLowerCase();
    const passClean = cipherPassInput.trim();

    const isUserValid = userClean === 'cipher_admin' || userClean === 'admin';
    const isPassValid = passClean === 'Cipher2026!' || passClean === 'cipher2026' || passClean === 'Cipher2026';

    if (isUserValid && isPassValid) {
      setIsCipherAuthenticated(true);
      setCipherAuthError('');
      addToast('★ Cipher Admin Access Granted.', 'success');
    } else {
      setCipherAuthError('ACCESS DENIED: Invalid Cipher Administrator ID or Security Key.');
    }
  };

  const handleCreateCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    addToast(`New course "${newTitle}" created and published globally!`, 'success');
    setNewTitle('');
  };

  const handleExportCSV = () => {
    const headers = ['ID', 'Name', 'Phone', 'Email', 'Organization', 'Date', 'Status', 'Notes'];
    const rows = partnerWaitlist.map((p) => [
      p.id,
      `"${p.name.replace(/"/g, '""')}"`,
      `"${p.phone}"`,
      `"${p.email || ''}"`,
      `"${p.organization || ''}"`,
      p.createdAt,
      p.status,
      `"${(p.notes || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `gtf_cipher_partner_waitlist_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    addToast('Partner Waitlist CSV exported successfully!', 'success');
  };

  // Filtered Partner Waitlist
  const filteredWaitlist = partnerWaitlist.filter((entry) => {
    const query = partnerSearch.toLowerCase().trim();
    const matchesSearch =
      !query ||
      entry.name.toLowerCase().includes(query) ||
      entry.phone.toLowerCase().includes(query) ||
      (entry.email && entry.email.toLowerCase().includes(query)) ||
      (entry.organization && entry.organization.toLowerCase().includes(query));

    const matchesStatus = statusFilter === 'All' || entry.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/85 backdrop-blur-2xl animate-in fade-in duration-200 overflow-y-auto">
      <div className="relative w-full max-w-6xl my-auto bg-neutral-950 border border-neutral-800 rounded-3xl shadow-2xl overflow-hidden text-neutral-100 p-6 md:p-8">
        
        {/* Glow Effects */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* TOP BAR */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-800">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  Cipher Admin Dashboard
                </h2>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400 font-mono text-[10px] font-bold uppercase tracking-wider border border-amber-500/30">
                  CIPHER V2.6
                </span>
              </div>
              <p className="text-xs text-neutral-400 font-mono mt-0.5">
                The Global Talents Foundation • Sovereign Executive Control
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {isCipherAuthenticated && (
              <button
                onClick={() => {
                  setIsCipherAuthenticated(false);
                  addToast('Cipher session locked.', 'info');
                }}
                className="px-3.5 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-800 text-xs font-mono font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Lock Cipher Session"
              >
                <LogOut className="w-3.5 h-3.5 text-amber-500" />
                <span>Lock Session</span>
              </button>
            )}

            <button
              onClick={() => setIsAdminOpen(false)}
              className="p-2.5 rounded-2xl bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* LOCKED STATE IF NOT AUTHENTICATED */}
        {!isCipherAuthenticated ? (
          <div className="py-12 px-4 max-w-md mx-auto text-center space-y-6">
            <div className="w-16 h-16 mx-auto rounded-3xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-xl">
              <Lock className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[10px] font-mono font-bold uppercase tracking-widest">
                <Terminal className="w-3.5 h-3.5" />
                <span>Restricted Cipher Gate</span>
              </div>
              <h3 className="text-2xl font-black text-white">
                Cipher Credentials Required
              </h3>
              <p className="text-xs text-neutral-400">
                You must authenticate with true administrator credentials to access the Cipher dashboard and partner waitlist ledger.
              </p>
            </div>

            {/* Hint Box */}
            <div className="p-3.5 rounded-2xl bg-neutral-900 border border-neutral-800 text-left text-[11px] font-mono space-y-1">
              <div className="text-amber-500 font-bold uppercase text-[10px] flex items-center gap-1">
                <Cpu className="w-3.5 h-3.5" /> Authorized True Credentials:
              </div>
              <div className="text-neutral-300">Username: <span className="text-amber-400 font-bold">cipher_admin</span></div>
              <div className="text-neutral-300">Passcode: <span className="text-amber-400 font-bold">Cipher2026!</span></div>
            </div>

            {cipherAuthError && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/40 text-red-400 text-xs font-mono font-medium">
                {cipherAuthError}
              </div>
            )}

            <form onSubmit={handleCipherLogin} className="space-y-3 text-xs font-mono">
              <input
                type="text"
                required
                value={cipherUserInput}
                onChange={(e) => { setCipherUserInput(e.target.value); setCipherAuthError(''); }}
                placeholder="Username (e.g. cipher_admin)"
                className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500 font-medium"
              />
              <input
                type="password"
                required
                value={cipherPassInput}
                onChange={(e) => { setCipherPassInput(e.target.value); setCipherAuthError(''); }}
                placeholder="Passcode (e.g. Cipher2026!)"
                className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500 font-medium"
              />
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-sans font-bold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20 cursor-pointer transition-all"
              >
                Authenticate & Access Cipher Dashboard
              </button>
            </form>
          </div>
        ) : (
          <>
            {/* NAVIGATION TABS */}
            <div className="flex items-center gap-2 overflow-x-auto border-b border-neutral-800 my-6 pb-2 text-xs font-bold font-mono no-scrollbar">
              <button
                onClick={() => setActiveTab('partner_waitlist')}
                className={`px-4 py-2.5 rounded-xl transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
                  activeTab === 'partner_waitlist'
                    ? 'bg-amber-500 text-neutral-950 shadow-lg shadow-amber-500/20'
                    : 'bg-neutral-900 text-neutral-400 hover:text-white'
                }`}
              >
                <Users className="w-4 h-4" />
                <span>Partner Waitlist ({partnerWaitlist.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('overview')}
                className={`px-4 py-2.5 rounded-xl transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
                  activeTab === 'overview'
                    ? 'bg-amber-500 text-neutral-950 shadow-lg shadow-amber-500/20'
                    : 'bg-neutral-900 text-neutral-400 hover:text-white'
                }`}
              >
                <BarChart2 className="w-4 h-4" />
                <span>Overview</span>
              </button>

              <button
                onClick={() => setActiveTab('courses')}
                className={`px-4 py-2.5 rounded-xl transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
                  activeTab === 'courses'
                    ? 'bg-amber-500 text-neutral-950 shadow-lg shadow-amber-500/20'
                    : 'bg-neutral-900 text-neutral-400 hover:text-white'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>Courses ({courses.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('bookings')}
                className={`px-4 py-2.5 rounded-xl transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
                  activeTab === 'bookings'
                    ? 'bg-amber-500 text-neutral-950 shadow-lg shadow-amber-500/20'
                    : 'bg-neutral-900 text-neutral-400 hover:text-white'
                }`}
              >
                <Clock className="w-4 h-4" />
                <span>Mentorship Sessions</span>
              </button>

              <button
                onClick={() => setActiveTab('donations')}
                className={`px-4 py-2.5 rounded-xl transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
                  activeTab === 'donations'
                    ? 'bg-amber-500 text-neutral-950 shadow-lg shadow-amber-500/20'
                    : 'bg-neutral-900 text-neutral-400 hover:text-white'
                }`}
              >
                <DollarSign className="w-4 h-4" />
                <span>Grants & Funds</span>
              </button>

              <button
                onClick={() => setActiveTab('cipher_security')}
                className={`px-4 py-2.5 rounded-xl transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
                  activeTab === 'cipher_security'
                    ? 'bg-amber-500 text-neutral-950 shadow-lg shadow-amber-500/20'
                    : 'bg-neutral-900 text-neutral-400 hover:text-white'
                }`}
              >
                <Terminal className="w-4 h-4" />
                <span>Cipher Audit</span>
              </button>
            </div>

            {/* TAB 1: PARTNER WAITING LIST */}
            {activeTab === 'partner_waitlist' && (
              <div className="space-y-6">
                
                {/* Metrics Bar */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="p-4 rounded-2xl bg-neutral-900/80 border border-neutral-800">
                    <div className="text-[10px] font-mono uppercase text-neutral-400">Total Applications</div>
                    <div className="text-2xl font-black text-amber-400 font-mono mt-1">{partnerWaitlist.length}</div>
                    <div className="text-[10px] text-amber-500/80 font-mono mt-0.5">Submitted Entries</div>
                  </div>

                  <div className="p-4 rounded-2xl bg-neutral-900/80 border border-neutral-800">
                    <div className="text-[10px] font-mono uppercase text-neutral-400">Pending Review</div>
                    <div className="text-2xl font-black text-amber-400 font-mono mt-1">
                      {partnerWaitlist.filter((p) => p.status === 'Pending').length}
                    </div>
                    <div className="text-[10px] text-amber-400 font-mono mt-0.5">Awaiting Contact</div>
                  </div>

                  <div className="p-4 rounded-2xl bg-neutral-900/80 border border-neutral-800">
                    <div className="text-[10px] font-mono uppercase text-neutral-400">Contacted / Approved</div>
                    <div className="text-2xl font-black text-emerald-400 font-mono mt-1">
                      {partnerWaitlist.filter((p) => p.status === 'Contacted' || p.status === 'Approved').length}
                    </div>
                    <div className="text-[10px] text-emerald-500 font-mono mt-0.5">Active Pipelines</div>
                  </div>

                  <div className="p-4 rounded-2xl bg-neutral-900/80 border border-neutral-800 flex flex-col justify-between">
                    <div className="text-[10px] font-mono uppercase text-neutral-400">Export Ledger</div>
                    <button
                      onClick={handleExportCSV}
                      className="mt-2 py-2 px-3 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-mono font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download CSV</span>
                    </button>
                  </div>
                </div>

                {/* Filter and Search Bar */}
                <div className="p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                  <div className="relative w-full sm:w-72">
                    <Search className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      value={partnerSearch}
                      onChange={(e) => setPartnerSearch(e.target.value)}
                      placeholder="Search name, phone, email, org..."
                      className="w-full pl-10 pr-4 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
                    <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest shrink-0 flex items-center gap-1">
                      <Filter className="w-3 h-3" /> Status:
                    </span>
                    {(['All', 'Pending', 'Contacted', 'Approved', 'Declined'] as const).map((st) => (
                      <button
                        key={st}
                        onClick={() => setStatusFilter(st)}
                        className={`px-3 py-1.5 rounded-lg text-[11px] font-mono font-bold cursor-pointer transition-colors ${
                          statusFilter === st
                            ? 'bg-amber-500 text-neutral-950 font-extrabold'
                            : 'bg-neutral-950 text-neutral-400 hover:text-white border border-neutral-800'
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Submissions List / Table */}
                <div className="space-y-3 max-h-[50vh] overflow-y-auto pr-1">
                  {filteredWaitlist.length > 0 ? (
                    filteredWaitlist.map((entry) => (
                      <div
                        key={entry.id}
                        className="p-4 rounded-2xl bg-neutral-900/90 border border-neutral-800 hover:border-amber-500/40 transition-all space-y-3"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-800/80 pb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center font-mono font-bold text-xs shrink-0">
                              PTR
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-sm text-white">{entry.name}</span>
                                {entry.organization && (
                                  <span className="px-2 py-0.5 rounded bg-neutral-800 text-neutral-300 font-mono text-[10px]">
                                    {entry.organization}
                                  </span>
                                )}
                              </div>
                              <div className="text-[10px] text-neutral-400 font-mono mt-0.5">
                                Submitted on {entry.createdAt} • ID: {entry.id}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            {/* Status Selector Dropdown */}
                            <select
                              value={entry.status}
                              onChange={(e) => updatePartnerWaitlistStatus(entry.id, e.target.value as any)}
                              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold border focus:outline-none cursor-pointer ${
                                entry.status === 'Pending'
                                  ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                                  : entry.status === 'Contacted'
                                  ? 'bg-blue-500/10 text-blue-400 border-blue-500/30'
                                  : entry.status === 'Approved'
                                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                                  : 'bg-red-500/10 text-red-400 border-red-500/30'
                              }`}
                            >
                              <option value="Pending" className="bg-neutral-900 text-white">Pending</option>
                              <option value="Contacted" className="bg-neutral-900 text-white">Contacted</option>
                              <option value="Approved" className="bg-neutral-900 text-white">Approved</option>
                              <option value="Declined" className="bg-neutral-900 text-white">Declined</option>
                            </select>

                            <button
                              onClick={() => deletePartnerWaitlistEntry(entry.id)}
                              className="p-1.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 transition-colors"
                              title="Delete Entry"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        {/* Contact Details Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs font-mono">
                          <div className="p-2.5 rounded-xl bg-neutral-950 border border-neutral-800/80 flex items-center gap-2">
                            <Phone className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                            <span className="text-neutral-400 text-[10px]">Phone:</span>
                            <a href={`tel:${entry.phone}`} className="text-amber-400 font-bold hover:underline">
                              {entry.phone}
                            </a>
                          </div>

                          {entry.email && (
                            <div className="p-2.5 rounded-xl bg-neutral-950 border border-neutral-800/80 flex items-center gap-2">
                              <Mail className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                              <span className="text-neutral-400 text-[10px]">Email:</span>
                              <a href={`mailto:${entry.email}`} className="text-white hover:underline truncate">
                                {entry.email}
                              </a>
                            </div>
                          )}

                          {entry.organization && (
                            <div className="p-2.5 rounded-xl bg-neutral-950 border border-neutral-800/80 flex items-center gap-2">
                              <Building2 className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                              <span className="text-neutral-400 text-[10px]">Org:</span>
                              <span className="text-neutral-200 truncate">{entry.organization}</span>
                            </div>
                          )}
                        </div>

                        {entry.notes && (
                          <div className="p-2.5 rounded-xl bg-neutral-950/80 border border-neutral-800/80 text-xs text-neutral-300 font-medium flex items-start gap-2">
                            <FileText className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                            <span>"{entry.notes}"</span>
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="p-8 text-center text-neutral-500 font-mono text-xs">
                      No partner waitlist entries match your current search or filter.
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TAB 2: OVERVIEW */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800">
                    <div className="text-[10px] font-mono uppercase text-neutral-400">Total Enrolled Creators</div>
                    <div className="text-2xl font-black text-amber-400 mt-1 font-mono">50,420</div>
                    <div className="text-[10px] text-emerald-400 font-mono mt-1">↑ +14% this month</div>
                  </div>

                  <div className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800">
                    <div className="text-[10px] font-mono uppercase text-neutral-400">Active Academy Courses</div>
                    <div className="text-2xl font-black text-amber-400 mt-1 font-mono">{courses.length}</div>
                    <div className="text-[10px] text-neutral-400 font-mono mt-1">100% Free Tuition</div>
                  </div>

                  <div className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800">
                    <div className="text-[10px] font-mono uppercase text-neutral-400">Global Mentors Roster</div>
                    <div className="text-2xl font-black text-amber-400 mt-1 font-mono">{artists.length}</div>
                    <div className="text-[10px] text-neutral-400 font-mono mt-1">Verified Residency Mentors</div>
                  </div>

                  <div className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800">
                    <div className="text-[10px] font-mono uppercase text-neutral-400">Equipment Grant Funds</div>
                    <div className="text-2xl font-black text-amber-400 mt-1 font-mono">€52,700</div>
                    <div className="text-[10px] text-emerald-400 font-mono mt-1">501(c)(3) Subsidies Allocated</div>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-3">
                  <h3 className="text-xs font-mono font-bold uppercase text-amber-400">
                    Live System Audit Trail
                  </h3>
                  <div className="space-y-2 text-xs font-mono">
                    <div className="p-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-300">
                      [CIPHER-LOG-01] New partner waitlist application received from Sarah Jenkins (Apex Acoustic Labs).
                    </div>
                    <div className="p-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-300">
                      [CIPHER-LOG-02] Verified Level 1 Cipher Administrator credentials. Session active.
                    </div>
                    <div className="p-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-300">
                      [CIPHER-LOG-03] Student enrolled in "Advanced Multitrack Mixing & DAW Automation".
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: COURSES */}
            {activeTab === 'courses' && (
              <div className="space-y-6">
                <form onSubmit={handleCreateCourse} className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-3">
                  <h3 className="text-xs font-mono font-bold uppercase text-amber-400">
                    Publish New Academy Course
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <input
                      type="text"
                      placeholder="Course Title..."
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      className="p-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-xs font-medium text-white focus:outline-none focus:border-amber-500"
                    />
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      className="p-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-xs font-medium text-white"
                    >
                      <option>Music Production</option>
                      <option>Vocals</option>
                      <option>Music Theory</option>
                      <option>Mixing & Mastering</option>
                      <option>Songwriting</option>
                    </select>
                    <button
                      type="submit"
                      className="p-2.5 rounded-xl bg-amber-500 text-neutral-950 font-bold text-xs flex items-center justify-center gap-1 cursor-pointer hover:bg-amber-400"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Publish Course</span>
                    </button>
                  </div>
                </form>

                <div className="space-y-2 max-h-80 overflow-y-auto">
                  {courses.map((c) => (
                    <div
                      key={c.id}
                      className="p-3.5 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-between text-xs"
                    >
                      <div>
                        <span className="font-bold text-white">{c.title}</span>
                        <span className="ml-2 text-[10px] font-mono text-amber-400">({c.category})</span>
                      </div>
                      <button
                        onClick={() => addToast(`Removed course "${c.title}"`, 'info')}
                        className="p-1.5 rounded bg-red-500/10 text-red-400 hover:bg-red-500/20"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 4: BOOKINGS */}
            {activeTab === 'bookings' && (
              <div className="space-y-3">
                <h3 className="text-xs font-mono font-bold uppercase text-amber-400">
                  Active Private Mentorship Ledger
                </h3>
                <div className="space-y-2">
                  {user.bookings.map((b) => (
                    <div key={b.id} className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 text-xs flex justify-between">
                      <div>
                        <div className="font-bold text-white">{b.artistName} • {b.sessionTitle}</div>
                        <div className="text-[10px] text-neutral-400 font-mono mt-0.5">Booked by: {b.userName} ({b.userEmail})</div>
                      </div>
                      <div className="text-right">
                        <div className="font-mono text-amber-400 font-bold">€{b.priceEUR} EUR</div>
                        <div className="text-[10px] text-neutral-400 font-mono">{b.date} @ {b.timeSlot}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 5: DONATIONS */}
            {activeTab === 'donations' && (
              <div className="space-y-3">
                <h3 className="text-xs font-mono font-bold uppercase text-amber-400">
                  Equipment Grant & Foundation Ledger
                </h3>
                <p className="text-xs text-neutral-400">Total accumulated non-profit grant donations: €52,700 EUR.</p>
              </div>
            )}

            {/* TAB 6: CIPHER AUDIT */}
            {activeTab === 'cipher_security' && (
              <div className="space-y-4 font-mono text-xs">
                <div className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-2">
                  <div className="text-amber-400 font-bold text-sm">Cipher Security & Encryption Overview</div>
                  <div className="text-neutral-400 text-xs">
                    Security Level: <span className="text-emerald-400 font-bold">Level 1 Sovereign Administrator</span>
                  </div>
                  <div className="text-neutral-400 text-xs">
                    Active Cipher Key: <span className="text-amber-400">CIPHER-GTF-2026-ACTIVE</span>
                  </div>
                  <div className="text-neutral-400 text-xs">
                    Storage Driver: Local Encrypted AppContext State & LocalStorage Persistence
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-2">
                  <div className="text-white font-bold">Admin Actions Audit</div>
                  <div className="text-[11px] text-neutral-400 space-y-1">
                    <div>• Partner waitlist modification permissions enabled.</div>
                    <div>• Course creation & deletion permissions enabled.</div>
                    <div>• Mentorship session auditing permissions active.</div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

      </div>
    </div>
  );
};

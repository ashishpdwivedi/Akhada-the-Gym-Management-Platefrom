import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Building2,
  Users,
  Trophy,
  CheckCircle2,
  XCircle,
  Clock,
  Sparkles,
  Save,
  Search,
  DollarSign,
  TrendingUp,
  ShieldCheck,
  Calendar,
} from 'lucide-react';

export const OwnerDashboard: React.FC = () => {
  const {
    gyms,
    personalRecords,
    reviewPR,
    updateGymByOwner,
    formatPrice,
    showNotification,
  } = useApp();

  // Find Ansh Dwivedi's gym (gym-1)
  const ownerGym = gyms.find((g) => g.ownerName === 'Ansh Dwivedi') || gyms[0];

  const [activeSubTab, setActiveSubTab] = useState<'queue' | 'editor' | 'roster' | 'desk'>('queue');

  // Gym editor state initialized to ownerGym
  const [gymName, setGymName] = useState(ownerGym.name);
  const [tagline, setTagline] = useState(ownerGym.tagline);
  const [hours, setHours] = useState(ownerGym.hours);
  const [phone, setPhone] = useState(ownerGym.phone);
  const [monthlyPrice, setMonthlyPrice] = useState(ownerGym.monthlyPrice);
  const [quarterlyPrice, setQuarterlyPrice] = useState(ownerGym.quarterlyPrice);
  const [annualPrice, setAnnualPrice] = useState(ownerGym.annualPrice);
  const [deskSearch, setDeskSearch] = useState('');
  const [checkedInMembers, setCheckedInMembers] = useState<string[]>([]);

  const pendingPRs = personalRecords.filter((pr) => pr.status === 'pending');

  const handleSaveGym = (e: React.FormEvent) => {
    e.preventDefault();
    updateGymByOwner(ownerGym.id, {
      name: gymName,
      tagline,
      hours,
      phone,
      monthlyPrice: Number(monthlyPrice),
      quarterlyPrice: Number(quarterlyPrice),
      annualPrice: Number(annualPrice),
    });
  };

  const handleFrontDeskCheckIn = (memberName: string) => {
    if (checkedInMembers.includes(memberName)) {
      showNotification(`${memberName} is already recorded in today's entry log.`, 'info');
      return;
    }
    setCheckedInMembers([memberName, ...checkedInMembers]);
    showNotification(`Turnstile gate opened: ${memberName} checked in successfully!`, 'success');
  };

  const memberRoster = [
    { id: 'MEM-01', name: 'Aryan Sharma', plan: 'Quarterly Pass', joinDate: '2026-09-01', daysLeft: 44, status: 'Active' },
    { id: 'MEM-02', name: 'Mohit Rawat', plan: 'Annual Elite', joinDate: '2026-01-15', daysLeft: 88, status: 'Active' },
    { id: 'MEM-03', name: 'Rajat Deshmukh', plan: 'Annual Elite', joinDate: '2025-11-10', daysLeft: 22, status: 'Active' },
    { id: 'MEM-04', name: 'Pooja Kashyap', plan: 'Monthly Pass', joinDate: '2026-10-01', daysLeft: 14, status: 'Active' },
    { id: 'MEM-05', name: 'Devendra Rathore', plan: 'Quarterly Pass', joinDate: '2026-08-10', daysLeft: 18, status: 'Active' },
  ];

  return (
    <div className="space-y-8 pb-16">
      {/* Top Banner Dedicated to Ansh Dwivedi */}
      <div className="bg-gradient-to-r from-[#1E190D] via-[#15171C] to-[#0E1319] border border-amber-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0">
              <Building2 className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-black font-display tracking-tight text-white uppercase">
                  Ansh Dwivedi
                </h1>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-black uppercase tracking-wider border border-amber-500/40">
                  Gym Owner &amp; Head Coach
                </span>
              </div>
              <p className="text-xs text-amber-200/90 font-medium mt-1">
                Owner of <strong className="text-white">{ownerGym.name}</strong> • Delhi Flagship Strength Arena
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold px-3.5 py-2 rounded-xl bg-black/50 border border-white/10 text-slate-300">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Verified Facility License #AKH-DEL-001</span>
          </div>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-[#12171E] border border-white/10 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Monthly Recurring (MRR)</span>
            <span className="text-2xl font-black font-mono text-[#CCFF00] mt-1 block">
              {formatPrice(485000)}
            </span>
            <span className="text-[10px] text-emerald-400 flex items-center gap-1 mt-0.5 font-semibold">
              <TrendingUp className="w-3 h-3" /> +14.2% vs last month
            </span>
          </div>
          <div className="p-3 rounded-xl bg-[#CCFF00]/10 text-[#CCFF00]">
            <DollarSign className="w-5 h-5" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#12171E] border border-white/10 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Active Members</span>
            <span className="text-2xl font-black font-mono text-white mt-1 block">184</span>
            <span className="text-[10px] text-slate-400 block mt-0.5 font-medium">96% renewal rate</span>
          </div>
          <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400">
            <Users className="w-5 h-5" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#12171E] border border-white/10 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Today's Check-Ins</span>
            <span className="text-2xl font-black font-mono text-white mt-1 block">
              {42 + checkedInMembers.length}
            </span>
            <span className="text-[10px] text-emerald-400 block mt-0.5 font-medium">Turnstiles running live</span>
          </div>
          <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#12171E] border border-white/10 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Pending PR Reviews</span>
            <span className="text-2xl font-black font-mono text-amber-400 mt-1 block">
              {pendingPRs.length}
            </span>
            <span className="text-[10px] text-amber-300 block mt-0.5 font-medium">
              Requires Ansh's approval
            </span>
          </div>
          <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400">
            <Trophy className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Sub Tabs */}
      <div className="flex items-center gap-2 border-b border-white/10 pb-2">
        <button
          onClick={() => setActiveSubTab('queue')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
            activeSubTab === 'queue'
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Trophy className="w-4 h-4" />
          <span>PR Review Queue ({pendingPRs.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('editor')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
            activeSubTab === 'editor'
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span>Gym Listing &amp; Pricing Editor</span>
        </button>

        <button
          onClick={() => setActiveSubTab('desk')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
            activeSubTab === 'desk'
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>Front Desk Scanner</span>
        </button>

        <button
          onClick={() => setActiveSubTab('roster')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
            activeSubTab === 'roster'
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Member Roster</span>
        </button>
      </div>

      {/* SUB TAB 1: PR REVIEW QUEUE */}
      {activeSubTab === 'queue' && (
        <div className="bg-[#12171E] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
          <div>
            <h2 className="text-lg font-black font-display tracking-tight text-white uppercase flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-400" />
              Athlete Personal Record Verification Queue
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              As Gym Owner, <strong>Ansh Dwivedi</strong> verifies lift depth, lockouts, and calibrated plates before official publication to the national leaderboard.
            </p>
          </div>

          {pendingPRs.length === 0 ? (
            <div className="text-center py-12 bg-[#0A0D10] rounded-2xl border border-white/5 space-y-2">
              <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
              <h3 className="text-sm font-bold text-white">All PR Submissions are Reviewed!</h3>
              <p className="text-xs text-slate-400">Great job, Coach Ansh! No pending lift attempts in queue.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {pendingPRs.map((pr) => (
                <div
                  key={pr.id}
                  className="p-5 rounded-2xl bg-[#0A0D10] border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-white">{pr.athleteName}</span>
                      <span className="px-2 py-0.5 rounded-md bg-amber-400/20 text-amber-300 text-[10px] font-bold uppercase">
                        Pending Ansh's Approval
                      </span>
                    </div>

                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-black font-mono text-[#CCFF00]">
                        {pr.lift}: {pr.weightKg} KG
                      </span>
                      <span className="text-xs text-slate-400">({pr.reps} Rep Max)</span>
                    </div>

                    <p className="text-xs text-slate-300 italic">
                      "{pr.videoNote || 'Attempt performed on Eleiko calibrated barbell'}"
                    </p>

                    <div className="flex items-center gap-2 text-[10px] text-slate-500">
                      <Clock className="w-3 h-3" />
                      <span>Submitted on {pr.date} • Venue: {pr.gymName}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => reviewPR(pr.id, 'rejected')}
                      className="px-3.5 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-300 font-bold text-xs flex items-center gap-1.5 border border-red-500/20 transition-colors"
                    >
                      <XCircle className="w-4 h-4" />
                      <span>Reject</span>
                    </button>

                    <button
                      onClick={() => reviewPR(pr.id, 'verified')}
                      className="px-4 py-2 rounded-xl bg-[#CCFF00] hover:bg-lime-400 text-black font-black text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-md shadow-[#CCFF00]/15 transition-all"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Approve &amp; Publish</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* SUB TAB 2: GYM LISTING & PRICING EDITOR */}
      {activeSubTab === 'editor' && (
        <form onSubmit={handleSaveGym} className="bg-[#12171E] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
          <div>
            <h2 className="text-lg font-black font-display tracking-tight text-white uppercase flex items-center gap-2">
              <Building2 className="w-5 h-5 text-amber-400" />
              Gym Facility &amp; Pricing Tier Editor
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Changes updated here by <strong>Ansh Dwivedi</strong> immediately reflect on the public discovery page.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                Gym Venue Name
              </label>
              <input
                type="text"
                value={gymName}
                onChange={(e) => setGymName(e.target.value)}
                className="w-full bg-[#0A0D10] border border-white/15 focus:border-[#CCFF00] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                Tagline / Motto
              </label>
              <input
                type="text"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                className="w-full bg-[#0A0D10] border border-white/15 focus:border-[#CCFF00] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                Operating Hours
              </label>
              <input
                type="text"
                value={hours}
                onChange={(e) => setHours(e.target.value)}
                className="w-full bg-[#0A0D10] border border-white/15 focus:border-[#CCFF00] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                Front Desk Contact Phone
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-[#0A0D10] border border-white/15 focus:border-[#CCFF00] rounded-xl px-4 py-2.5 text-xs text-white font-mono focus:outline-none"
              />
            </div>
          </div>

          {/* Pricing Tiers in INR */}
          <div className="pt-2 border-t border-white/10 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Membership Pass Pricing (₹ INR)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-[#0A0D10] border border-white/10 space-y-1.5">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Monthly Pass</span>
                <input
                  type="number"
                  value={monthlyPrice}
                  onChange={(e) => setMonthlyPrice(Number(e.target.value))}
                  className="w-full bg-transparent border-b border-[#CCFF00] text-lg font-black font-mono text-[#CCFF00] focus:outline-none py-1"
                />
              </div>

              <div className="p-4 rounded-xl bg-[#0A0D10] border border-white/10 space-y-1.5">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Quarterly Pass</span>
                <input
                  type="number"
                  value={quarterlyPrice}
                  onChange={(e) => setQuarterlyPrice(Number(e.target.value))}
                  className="w-full bg-transparent border-b border-[#CCFF00] text-lg font-black font-mono text-[#CCFF00] focus:outline-none py-1"
                />
              </div>

              <div className="p-4 rounded-xl bg-[#0A0D10] border border-white/10 space-y-1.5">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Annual Elite Pass</span>
                <input
                  type="number"
                  value={annualPrice}
                  onChange={(e) => setAnnualPrice(Number(e.target.value))}
                  className="w-full bg-transparent border-b border-[#CCFF00] text-lg font-black font-mono text-[#CCFF00] focus:outline-none py-1"
                />
              </div>
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-[#CCFF00] hover:bg-lime-400 text-black text-xs font-black uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-[#CCFF00]/20"
            >
              <Save className="w-4 h-4" />
              <span>Save Facility Profile</span>
            </button>
          </div>
        </form>
      )}

      {/* SUB TAB 3: FRONT DESK SCANNER */}
      {activeSubTab === 'desk' && (
        <div className="bg-[#12171E] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
          <div>
            <h2 className="text-lg font-black font-display tracking-tight text-white uppercase flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              Live Front Desk Turnstile Check-In
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Quickly verify arriving members and unlock entrance gates.
            </p>
          </div>

          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search member by name or scan Pass ID..."
              value={deskSearch}
              onChange={(e) => setDeskSearch(e.target.value)}
              className="w-full bg-[#0A0D10] border border-white/15 focus:border-[#CCFF00] rounded-xl pl-10 pr-4 py-3 text-xs text-white focus:outline-none"
            />
          </div>

          <div className="space-y-3">
            {memberRoster
              .filter((m) => m.name.toLowerCase().includes(deskSearch.toLowerCase()) || m.id.toLowerCase().includes(deskSearch.toLowerCase()))
              .map((member) => {
                const isChecked = checkedInMembers.includes(member.name);
                return (
                  <div
                    key={member.id}
                    className="p-4 rounded-2xl bg-[#0A0D10] border border-white/10 flex items-center justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white">{member.name}</span>
                        <span className="text-[10px] font-mono text-slate-400">({member.id})</span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        {member.plan} • {member.daysLeft} days remaining
                      </p>
                    </div>

                    <button
                      onClick={() => handleFrontDeskCheckIn(member.name)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors ${
                        isChecked
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : 'bg-[#CCFF00] hover:bg-lime-400 text-black shadow-sm'
                      }`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{isChecked ? 'Gate Cleared' : 'Scan & Enter'}</span>
                    </button>
                  </div>
                );
              })}
          </div>
        </div>
      )}

      {/* SUB TAB 4: MEMBER ROSTER */}
      {activeSubTab === 'roster' && (
        <div className="bg-[#12171E] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-black font-display tracking-tight text-white uppercase flex items-center gap-2">
                <Users className="w-5 h-5 text-amber-400" />
                Active Member Roster
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Total enrolled athletes under Ansh Dwivedi's supervision: 184
              </p>
            </div>
            <span className="text-xs font-bold text-[#CCFF00] font-mono">100% Up to Date</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-white/10 text-[10px] uppercase font-bold text-slate-400">
                  <th className="pb-3">Member ID</th>
                  <th className="pb-3">Athlete Name</th>
                  <th className="pb-3">Membership Tier</th>
                  <th className="pb-3">Join Date</th>
                  <th className="pb-3">Days Remaining</th>
                  <th className="pb-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {memberRoster.map((item) => (
                  <tr key={item.id} className="hover:bg-white/5 transition-colors">
                    <td className="py-3 font-mono text-slate-400">{item.id}</td>
                    <td className="py-3 font-bold text-white">{item.name}</td>
                    <td className="py-3 text-slate-300">{item.plan}</td>
                    <td className="py-3 text-slate-400">{item.joinDate}</td>
                    <td className="py-3 font-mono text-[#CCFF00] font-bold">{item.daysLeft} days</td>
                    <td className="py-3 text-right">
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

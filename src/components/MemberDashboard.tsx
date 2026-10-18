import React, { useMemo } from 'react';
import { useApp } from '../context/AppContext';
import {
  Calendar,
  Flame,
  Trophy,
  QrCode,
  CheckCircle2,
  Clock,
  Plus,
  ShoppingBag,
  Award,
  ChevronRight,
  TrendingUp,
  MapPin,
  Sparkles,
} from 'lucide-react';

export const MemberDashboard: React.FC = () => {
  const {
    memberPass,
    attendanceHistory,
    personalRecords,
    orders,
    currentPersona,
    markTodayCheckIn,
    setIsPassModalOpen,
    setIsLogPROpen,
    formatPrice,
  } = useApp();

  const todayStr = new Date().toISOString().split('T')[0];
  const isCheckedInToday = attendanceHistory.some((item) => item.date === todayStr);

  // Generate 30 days grid for current calendar view
  const calendarDays = useMemo(() => {
    const days = [];
    const now = new Date();
    for (let i = 29; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      const str = d.toISOString().split('T')[0];
      const isAttended = attendanceHistory.some((att) => att.date === str);
      days.push({
        date: str,
        dayNum: d.getDate(),
        month: d.toLocaleString('default', { month: 'short' }),
        dayName: d.toLocaleString('default', { weekday: 'narrow' }),
        attended: isAttended,
        isToday: str === todayStr,
      });
    }
    return days;
  }, [attendanceHistory, todayStr]);

  // Calculate Big 3 Total
  const squat = personalRecords.find((p) => p.lift === 'Squat' && p.status === 'verified')?.weightKg || 0;
  const bench = personalRecords.find((p) => p.lift === 'Bench Press' && p.status === 'verified')?.weightKg || 0;
  const deadlift = personalRecords.find((p) => p.lift === 'Deadlift' && p.status === 'verified')?.weightKg || 0;
  const totalLift = squat + bench + deadlift;

  return (
    <div className="space-y-8 pb-16">
      {/* Top Welcome Card */}
      <div className="bg-[#12171E] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img
            src={currentPersona.avatar}
            alt={currentPersona.name}
            className="w-16 h-16 rounded-2xl object-cover ring-2 ring-[#CCFF00]"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-black font-display tracking-tight text-white uppercase">
                {currentPersona.name}
              </h1>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-black uppercase tracking-wider border border-emerald-500/40">
                Active Athlete
              </span>
            </div>
            <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-1">
              <MapPin className="w-3.5 h-3.5 text-[#CCFF00]" />
              Home Arena: <strong className="text-white">{memberPass?.gymName || 'Akhada Iron Forge Arena'}</strong>
            </p>
          </div>
        </div>

        {/* Quick Check-In CTA */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <button
            onClick={markTodayCheckIn}
            disabled={isCheckedInToday}
            className={`flex-1 md:flex-none px-5 py-3 rounded-2xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg ${
              isCheckedInToday
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 cursor-default'
                : 'bg-[#CCFF00] hover:bg-lime-400 text-black shadow-[#CCFF00]/20 hover:scale-[1.02]'
            }`}
          >
            {isCheckedInToday ? (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>Checked In Today 🔥</span>
              </>
            ) : (
              <>
                <Flame className="w-4 h-4" />
                <span>Check In for Today's Workout</span>
              </>
            )}
          </button>

          {memberPass && (
            <button
              onClick={() => setIsPassModalOpen(true)}
              className="p-3 rounded-2xl bg-slate-900 border border-white/15 text-slate-200 hover:text-white hover:border-[#CCFF00] transition-colors"
              title="Open Digital QR Pass"
            >
              <QrCode className="w-5 h-5 text-[#CCFF00]" />
            </button>
          )}
        </div>
      </div>

      {/* Grid: Digital Pass Widget & Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pass Card Widget */}
        <div className="bg-gradient-to-br from-[#161F2A] to-[#0E141B] border border-white/15 rounded-3xl p-6 shadow-xl relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#CCFF00]/5 rounded-full blur-2xl pointer-events-none" />

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#CCFF00]">
                Digital Membership
              </span>
              <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 text-[10px] font-bold uppercase">
                Active Pass
              </span>
            </div>

            <div>
              <h3 className="text-xl font-black font-display tracking-tight text-white uppercase">
                {memberPass?.gymName}
              </h3>
              <p className="text-xs text-slate-300 font-semibold">{memberPass?.planType}</p>
            </div>

            <div className="p-3 rounded-xl bg-black/40 border border-white/10 flex items-center justify-between text-xs">
              <div>
                <span className="text-[10px] uppercase text-slate-400 block">Pass Identifier</span>
                <span className="font-mono text-white font-bold">{memberPass?.passId}</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] uppercase text-slate-400 block">Days Left</span>
                <span className="font-mono text-[#CCFF00] font-black text-sm">{memberPass?.daysRemaining}d</span>
              </div>
            </div>
          </div>

          <div className="pt-6 space-y-2">
            <button
              onClick={() => setIsPassModalOpen(true)}
              className="w-full py-2.5 rounded-xl bg-[#CCFF00] hover:bg-lime-400 text-black font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-md shadow-[#CCFF00]/15 uppercase tracking-wide"
            >
              <QrCode className="w-4 h-4" />
              <span>Show QR Turnstile Code</span>
            </button>
            <p className="text-center text-[10px] text-slate-400">
              Valid until: <strong className="text-white">{memberPass?.expiryDate}</strong>
            </p>
          </div>
        </div>

        {/* Attendance Streak Counter */}
        <div className="bg-[#12171E] border border-white/10 rounded-3xl p-6 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400">
                Discipline Streak
              </span>
              <Flame className="w-5 h-5 text-amber-400" />
            </div>

            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-4xl font-black font-mono text-[#CCFF00]">
                {memberPass?.checkInsCount || attendanceHistory.length}
              </span>
              <span className="text-xs font-bold text-slate-400 uppercase">Workouts Logged</span>
            </div>

            <p className="text-xs text-slate-300 mt-2">
              You are among the top 5% most consistent lifters at Akhada Iron Forge Arena this month!
            </p>
          </div>

          <div className="pt-4 border-t border-white/10 grid grid-cols-2 gap-3 text-center">
            <div className="p-2.5 rounded-xl bg-[#0A0D10] border border-white/5">
              <span className="text-[10px] uppercase text-slate-400 block font-semibold">Streak Record</span>
              <span className="text-sm font-bold text-white font-mono">22 Consecutive Days</span>
            </div>
            <div className="p-2.5 rounded-xl bg-[#0A0D10] border border-white/5">
              <span className="text-[10px] uppercase text-slate-400 block font-semibold">Attendance Rate</span>
              <span className="text-sm font-bold text-emerald-400 font-mono">92%</span>
            </div>
          </div>
        </div>

        {/* Strength Index / Total Lift */}
        <div className="bg-[#12171E] border border-white/10 rounded-3xl p-6 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400">
                Big 3 Competition Total
              </span>
              <Trophy className="w-5 h-5 text-[#CCFF00]" />
            </div>

            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-4xl font-black font-mono text-white">{totalLift}</span>
              <span className="text-sm font-bold text-[#CCFF00]">KG</span>
              <span className="text-[10px] text-slate-400">({Math.round(totalLift * 2.20462)} LBS)</span>
            </div>

            <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-white/10 text-center">
              <div>
                <span className="text-[10px] text-slate-400 uppercase block">Squat</span>
                <span className="text-xs font-bold text-white font-mono">{squat}kg</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase block">Bench</span>
                <span className="text-xs font-bold text-white font-mono">{bench}kg</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase block">Deadlift</span>
                <span className="text-xs font-bold text-white font-mono">{deadlift}kg</span>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <button
              onClick={() => setIsLogPROpen(true)}
              className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors border border-white/15"
            >
              <Plus className="w-4 h-4 text-[#CCFF00]" />
              <span>Log New Personal Record</span>
            </button>
          </div>
        </div>
      </div>

      {/* 30-Day Attendance Heatmap Calendar Grid */}
      <div className="bg-[#12171E] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[#CCFF00]" />
              <h2 className="text-lg font-black font-display tracking-tight text-white uppercase">
                30-Day Interactive Attendance Heat Grid
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Every green session counts towards leaderboard streak and seasonal Akhada rewards.
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs text-slate-400">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-md bg-[#CCFF00] shadow-sm" />
              <span>Attended</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-md bg-white/10" />
              <span>Rest Day</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-md border border-[#CCFF00] bg-[#CCFF00]/20" />
              <span>Today</span>
            </div>
          </div>
        </div>

        {/* Heatmap Grid */}
        <div className="grid grid-cols-5 sm:grid-cols-10 md:grid-cols-15 gap-2 pt-2">
          {calendarDays.map((day, idx) => (
            <div
              key={idx}
              title={`${day.date}: ${day.attended ? 'Attended workout' : 'Rest day'}`}
              className={`p-2.5 rounded-xl border text-center transition-all flex flex-col justify-between aspect-square ${
                day.attended
                  ? 'bg-[#CCFF00] text-black border-[#CCFF00] font-black shadow-md shadow-[#CCFF00]/10 scale-100'
                  : day.isToday
                  ? 'bg-[#182330] border-[#CCFF00] text-white'
                  : 'bg-[#0A0D10] border-white/5 text-slate-400 hover:border-white/20'
              }`}
            >
              <span className="text-[9px] uppercase font-bold opacity-75">{day.dayName}</span>
              <span className="text-sm font-extrabold font-mono">{day.dayNum}</span>
              <span className="text-[8px] uppercase">{day.month}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Personal Records History & Owner Verification Status */}
      <div className="bg-[#12171E] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-[#CCFF00]" />
              <h2 className="text-lg font-black font-display tracking-tight text-white uppercase">
                Personal Records (PRs) &amp; Official Verification
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Verified lifts are audited by Gym Owner <strong>Ansh Dwivedi</strong> before publishing to leaderboard.
            </p>
          </div>

          <button
            onClick={() => setIsLogPROpen(true)}
            className="px-3.5 py-2 rounded-xl bg-[#CCFF00] text-black font-bold text-xs flex items-center gap-1.5 hover:bg-lime-400 transition-colors uppercase tracking-wider"
          >
            <Plus className="w-4 h-4" />
            <span>Add Record</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {personalRecords.map((pr) => (
            <div
              key={pr.id}
              className="p-4 rounded-2xl bg-[#0A0D10] border border-white/10 space-y-3 relative overflow-hidden"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">{pr.lift}</span>
                <span
                  className={`text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-md ${
                    pr.status === 'verified'
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : pr.status === 'pending'
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      : 'bg-red-500/20 text-red-300 border border-red-500/30'
                  }`}
                >
                  {pr.status}
                </span>
              </div>

              <div>
                <div className="text-2xl font-black font-mono text-[#CCFF00]">
                  {pr.weightKg} <span className="text-xs text-slate-400 font-sans">KG</span>
                </div>
                <span className="text-[10px] text-slate-400">{pr.reps} Rep Max • Logged {pr.date}</span>
              </div>

              <div className="pt-2 border-t border-white/5 text-[10px] text-slate-400">
                {pr.status === 'verified' ? (
                  <span className="text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Verified by Ansh Dwivedi
                  </span>
                ) : (
                  <span className="text-amber-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> In Review by Ansh Dwivedi
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Badges and Orders Showcase */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Badges */}
        <div className="bg-[#12171E] border border-white/10 rounded-3xl p-6 shadow-xl space-y-4">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-[#CCFF00]" />
            <h3 className="text-base font-bold text-white uppercase font-display tracking-wide">
              Earned Badges &amp; Hall of Fame
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-3.5 rounded-2xl bg-[#0A0D10] border border-white/10 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-400/20 text-amber-400 flex items-center justify-center font-black">
                🔥
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Consistency King</h4>
                <p className="text-[10px] text-slate-400">20+ Check-ins this month</p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#0A0D10] border border-white/10 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#CCFF00]/20 text-[#CCFF00] flex items-center justify-center font-black">
                🦍
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">500KG Total Club</h4>
                <p className="text-[10px] text-slate-400">Verified big 3 lifting total</p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#0A0D10] border border-white/10 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-400/20 text-blue-400 flex items-center justify-center font-black">
                🌅
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Early Bird Dawn</h4>
                <p className="text-[10px] text-slate-400">10 sessions before 7:00 AM</p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#0A0D10] border border-white/10 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-400/20 text-purple-400 flex items-center justify-center font-black">
                🛡️
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Akhada Disciple</h4>
                <p className="text-[10px] text-slate-400">Pass verified at turnstiles</p>
              </div>
            </div>
          </div>
        </div>

        {/* Store Order History */}
        <div className="bg-[#12171E] border border-white/10 rounded-3xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#CCFF00]" />
              <h3 className="text-base font-bold text-white uppercase font-display tracking-wide">
                Supplements &amp; Gear Orders
              </h3>
            </div>
            <span className="text-xs text-slate-400">{orders.length} Orders</span>
          </div>

          <div className="space-y-3">
            {orders.map((order) => (
              <div
                key={order.id}
                className="p-3.5 rounded-2xl bg-[#0A0D10] border border-white/10 space-y-2 text-xs"
              >
                <div className="flex justify-between items-center">
                  <span className="font-mono font-bold text-white">{order.id}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 font-bold uppercase">
                    {order.status}
                  </span>
                </div>

                <div className="text-[11px] text-slate-400">
                  {order.items.map((i) => `${i.product.name} (x${i.quantity})`).join(', ')}
                </div>

                <div className="pt-2 border-t border-white/5 flex justify-between items-center text-[10px] text-slate-500">
                  <span>Tracking: <strong className="text-slate-300">{order.trackingNumber}</strong></span>
                  <span className="font-mono font-bold text-[#CCFF00] text-xs">
                    {formatPrice(order.totalAmount)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

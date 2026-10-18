import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Trophy,
  Flame,
  Award,
  Medal,
  CheckCircle2,
  Users,
  Clock,
  Sparkles,
  MapPin,
  TrendingUp,
} from 'lucide-react';

export const LeaderboardChallenges: React.FC = () => {
  const { leaderboard, challenges, joinChallenge } = useApp();
  const [filterCategory, setFilterCategory] = useState<'total' | 'streak'>('total');
  const [scope, setScope] = useState<'all' | 'iron_forge'>('all');

  const filteredAthletes = [...leaderboard]
    .filter((ath) => (scope === 'iron_forge' ? ath.gymName.includes('Iron Forge') : true))
    .sort((a, b) => {
      if (filterCategory === 'streak') {
        return b.streakDays - a.streakDays;
      }
      return b.totalKg - a.totalKg;
    });

  const top3 = filteredAthletes.slice(0, 3);
  const remaining = filteredAthletes.slice(3);

  return (
    <div className="space-y-10 pb-16">
      {/* Header */}
      <div className="bg-[#12171E] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-bold uppercase tracking-wider mb-2">
            <Trophy className="w-3.5 h-3.5" />
            <span>National Verified Athlete Rankings</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black font-display tracking-tight text-white uppercase">
            Leaderboard &amp; Community Trials
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">
            All submitted PRs are verified with strict video rules by accredited gym owners including <strong>Ansh Dwivedi</strong> before ranking inclusion.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="p-1 rounded-xl bg-[#0A0D10] border border-white/10 flex items-center">
            <button
              onClick={() => setFilterCategory('total')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                filterCategory === 'total'
                  ? 'bg-[#CCFF00] text-black shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Big 3 Total
            </button>
            <button
              onClick={() => setFilterCategory('streak')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                filterCategory === 'streak'
                  ? 'bg-[#CCFF00] text-black shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Attendance Streak
            </button>
          </div>

          <div className="p-1 rounded-xl bg-[#0A0D10] border border-white/10 flex items-center">
            <button
              onClick={() => setScope('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                scope === 'all'
                  ? 'bg-white/15 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              All India
            </button>
            <button
              onClick={() => setScope('iron_forge')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                scope === 'iron_forge'
                  ? 'bg-amber-400/20 text-amber-300 border border-amber-400/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Iron Forge Arena (Ansh)
            </button>
          </div>
        </div>
      </div>

      {/* Top 3 Podium Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
        {/* 2nd Place */}
        {top3[1] && (
          <div className="bg-[#12171E] border border-slate-700/60 rounded-3xl p-6 text-center shadow-xl space-y-4 order-2 md:order-1">
            <div className="relative inline-block">
              <img
                src={top3[1].avatar}
                alt={top3[1].name}
                className="w-20 h-20 rounded-2xl object-cover ring-2 ring-slate-400 mx-auto"
              />
              <span className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-slate-400 text-black text-[10px] font-black uppercase tracking-wider flex items-center gap-1 shadow-md">
                <Medal className="w-3 h-3" /> #2 Silver
              </span>
            </div>

            <div>
              <h3 className="text-base font-bold text-white mt-2 flex items-center justify-center gap-1">
                {top3[1].name}
                <CheckCircle2 className="w-3.5 h-3.5 text-slate-400" />
              </h3>
              <p className="text-[11px] text-slate-400 flex items-center justify-center gap-1 mt-0.5">
                <MapPin className="w-3 h-3 text-[#CCFF00]" /> {top3[1].gymName}
              </p>
            </div>

            <div className="p-3 rounded-2xl bg-[#0A0D10] border border-white/5 space-y-1">
              <span className="text-2xl font-black font-mono text-white">
                {filterCategory === 'total' ? `${top3[1].totalKg} KG` : `${top3[1].streakDays} Days`}
              </span>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">
                {filterCategory === 'total' ? 'Verified Big 3 Total' : 'Active Attendance Streak'}
              </span>
            </div>
          </div>
        )}

        {/* 1st Place - Gold Champion */}
        {top3[0] && (
          <div className="bg-gradient-to-b from-[#1E271E] to-[#12171E] border-2 border-[#CCFF00] rounded-3xl p-6 sm:p-8 text-center shadow-2xl shadow-[#CCFF00]/10 space-y-4 order-1 md:order-2 scale-[1.03]">
            <div className="relative inline-block">
              <img
                src={top3[0].avatar}
                alt={top3[0].name}
                className="w-24 h-24 rounded-2xl object-cover ring-4 ring-[#CCFF00] mx-auto shadow-lg"
              />
              <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[#CCFF00] text-black text-xs font-black uppercase tracking-wider flex items-center gap-1 shadow-lg">
                <Trophy className="w-3.5 h-3.5" /> #1 Champion
              </span>
            </div>

            <div className="pt-2">
              <h3 className="text-lg font-black text-white flex items-center justify-center gap-1">
                {top3[0].name}
                <CheckCircle2 className="w-4 h-4 text-[#CCFF00]" />
              </h3>
              <p className="text-xs text-[#CCFF00] font-semibold flex items-center justify-center gap-1 mt-0.5">
                <MapPin className="w-3.5 h-3.5" /> {top3[0].gymName}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#0A0D10] border border-[#CCFF00]/30 space-y-1">
              <span className="text-3xl font-black font-mono text-[#CCFF00]">
                {filterCategory === 'total' ? `${top3[0].totalKg} KG` : `${top3[0].streakDays} Days`}
              </span>
              <span className="text-[11px] uppercase font-black text-slate-300 block">
                {filterCategory === 'total' ? 'Verified Big 3 S/B/D Total' : 'Active Streak 🔥'}
              </span>
            </div>

            <div className="flex justify-center gap-4 text-xs font-mono text-slate-300 pt-1">
              <span>S: {top3[0].squatKg}kg</span>
              <span>B: {top3[0].benchKg}kg</span>
              <span>D: {top3[0].deadliftKg}kg</span>
            </div>
          </div>
        )}

        {/* 3rd Place - Bronze */}
        {top3[2] && (
          <div className="bg-[#12171E] border border-amber-800/40 rounded-3xl p-6 text-center shadow-xl space-y-4 order-3">
            <div className="relative inline-block">
              <img
                src={top3[2].avatar}
                alt={top3[2].name}
                className="w-20 h-20 rounded-2xl object-cover ring-2 ring-amber-600 mx-auto"
              />
              <span className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-amber-600 text-white text-[10px] font-black uppercase tracking-wider flex items-center gap-1 shadow-md">
                <Medal className="w-3 h-3" /> #3 Bronze
              </span>
            </div>

            <div>
              <h3 className="text-base font-bold text-white mt-2 flex items-center justify-center gap-1">
                {top3[2].name}
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-500" />
              </h3>
              <p className="text-[11px] text-slate-400 flex items-center justify-center gap-1 mt-0.5">
                <MapPin className="w-3 h-3 text-[#CCFF00]" /> {top3[2].gymName}
              </p>
            </div>

            <div className="p-3 rounded-2xl bg-[#0A0D10] border border-white/5 space-y-1">
              <span className="text-2xl font-black font-mono text-white">
                {filterCategory === 'total' ? `${top3[2].totalKg} KG` : `${top3[2].streakDays} Days`}
              </span>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">
                {filterCategory === 'total' ? 'Verified Big 3 Total' : 'Active Attendance Streak'}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Remaining Rankings Table */}
      {remaining.length > 0 && (
        <div className="bg-[#12171E] border border-white/10 rounded-3xl p-6 shadow-xl space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Official Ranked Athletes (Positions 4+)
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-white/10 text-[10px] uppercase font-bold text-slate-400">
                  <th className="pb-3">Rank</th>
                  <th className="pb-3">Athlete</th>
                  <th className="pb-3">Affiliated Arena</th>
                  <th className="pb-3">Streak</th>
                  <th className="pb-3">Squat</th>
                  <th className="pb-3">Bench</th>
                  <th className="pb-3">Deadlift</th>
                  <th className="pb-3 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {remaining.map((ath, idx) => (
                  <tr key={ath.name} className="hover:bg-white/5 transition-colors">
                    <td className="py-3 font-mono font-bold text-[#CCFF00]">#{idx + 4}</td>
                    <td className="py-3 font-bold text-white flex items-center gap-2">
                      <img src={ath.avatar} alt={ath.name} className="w-6 h-6 rounded-md object-cover" />
                      <span>{ath.name}</span>
                    </td>
                    <td className="py-3 text-slate-300">{ath.gymName}</td>
                    <td className="py-3 font-mono text-amber-400">{ath.streakDays}d 🔥</td>
                    <td className="py-3 font-mono text-slate-400">{ath.squatKg}kg</td>
                    <td className="py-3 font-mono text-slate-400">{ath.benchKg}kg</td>
                    <td className="py-3 font-mono text-slate-400">{ath.deadliftKg}kg</td>
                    <td className="py-3 text-right font-black font-mono text-white text-sm">
                      {ath.totalKg} KG
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Community Fitness Trials / Challenges Section */}
      <div className="space-y-6 pt-4">
        <div>
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-[#CCFF00]" />
            <h2 className="text-xl sm:text-2xl font-black font-display tracking-tight text-white uppercase">
              Active Community Challenges &amp; Trials
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Complete milestones to win limited-edition Akhada lever belts, supplements vouchers, and hall of fame medals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {challenges.map((chal) => (
            <div
              key={chal.id}
              className="bg-[#12171E] border border-white/10 rounded-3xl p-6 shadow-xl flex flex-col justify-between space-y-4 hover:border-white/20 transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-white/5 text-slate-300 border border-white/10">
                    {chal.category.toUpperCase()}
                  </span>
                  <span className="text-[11px] text-amber-400 font-bold flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> {chal.daysRemaining} days left
                  </span>
                </div>

                <h3 className="text-base font-bold text-white">{chal.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{chal.subtitle}</p>

                {/* Progress bar */}
                <div className="space-y-1.5 pt-2">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-slate-400">Your Progress</span>
                    <span className="font-mono text-[#CCFF00] font-bold">
                      {chal.userProgress} / {chal.maxProgress}
                    </span>
                  </div>
                  <div className="w-full bg-[#0A0D10] rounded-full h-2 overflow-hidden border border-white/5">
                    <div
                      className="bg-gradient-to-r from-[#CCFF00] to-lime-500 h-full rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(100, (chal.userProgress / chal.maxProgress) * 100)}%` }}
                    />
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#0A0D10] border border-white/5 text-[11px] text-slate-300">
                  <span className="text-[10px] uppercase text-[#CCFF00] font-bold block mb-0.5">Prize Reward</span>
                  <p>{chal.reward}</p>
                </div>
              </div>

              <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                <span className="text-[11px] text-slate-400 flex items-center gap-1 font-medium">
                  <Users className="w-3.5 h-3.5 text-slate-500" /> {chal.participantsCount} athletes
                </span>

                <button
                  onClick={() => joinChallenge(chal.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    chal.joined
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30'
                      : 'bg-[#CCFF00] hover:bg-lime-400 text-black shadow-md'
                  }`}
                >
                  {chal.joined ? 'Joined (Active)' : 'Join Challenge'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

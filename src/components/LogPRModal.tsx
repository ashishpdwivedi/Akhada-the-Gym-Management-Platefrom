import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PersonalRecord } from '../types';
import { X, Trophy, ShieldAlert, Sparkles, Scale } from 'lucide-react';

interface LogPRModalProps {
  onClose: () => void;
}

export const LogPRModal: React.FC<LogPRModalProps> = ({ onClose }) => {
  const { logNewPR, memberPass } = useApp();
  const [lift, setLift] = useState<PersonalRecord['lift']>('Squat');
  const [weightKg, setWeightKg] = useState<string>('190');
  const [reps, setReps] = useState<number>(1);
  const [videoNote, setVideoNote] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const weightNum = parseFloat(weightKg);
    if (isNaN(weightNum) || weightNum <= 0) return;

    logNewPR(lift, weightNum, reps, videoNote);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6">
      <div className="relative w-full max-w-lg bg-[#12171E] border border-white/15 rounded-3xl shadow-2xl overflow-hidden text-slate-100 my-8">
        <div className="flex items-center justify-between p-5 border-b border-white/10 bg-[#0E1319]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#CCFF00]/15 text-[#CCFF00] flex items-center justify-center font-black">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white uppercase font-display tracking-wide">
                Log Personal Record (PR)
              </h3>
              <p className="text-[11px] text-slate-400">Official Akhada Competition Leaderboard</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Notice banner */}
          <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3">
            <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div className="text-xs text-amber-200/90 leading-relaxed">
              <strong>Owner Verification Required:</strong> Your lift submission will be routed to Gym Owner{' '}
              <strong className="text-white underline">Ansh Dwivedi</strong> for formal review and video check before being published to the public leaderboard.
            </div>
          </div>

          {/* Select Lift */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
              Select Lift Category
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {(['Squat', 'Bench Press', 'Deadlift', 'Overhead Press'] as const).map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setLift(item)}
                  className={`p-2.5 rounded-xl text-xs font-bold transition-all text-center border ${
                    lift === item
                      ? 'bg-[#1D2733] border-[#CCFF00] text-white shadow-md'
                      : 'bg-[#0A0D10] border-white/10 text-slate-400 hover:text-white'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Weight and Reps */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1">
                <Scale className="w-3.5 h-3.5 text-[#CCFF00]" /> Weight Lifted (KG)
              </label>
              <input
                type="number"
                step="0.5"
                min="20"
                max="500"
                required
                value={weightKg}
                onChange={(e) => setWeightKg(e.target.value)}
                className="w-full bg-[#0A0D10] border border-white/15 focus:border-[#CCFF00] rounded-xl px-4 py-2.5 text-base font-bold font-mono text-white focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                Repetitions
              </label>
              <input
                type="number"
                min="1"
                max="20"
                required
                value={reps}
                onChange={(e) => setReps(parseInt(e.target.value) || 1)}
                className="w-full bg-[#0A0D10] border border-white/15 focus:border-[#CCFF00] rounded-xl px-4 py-2.5 text-base font-bold font-mono text-white focus:outline-none"
              />
            </div>
          </div>

          {/* Video or Verification notes */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
              Verification Notes / Platform Details
            </label>
            <textarea
              rows={2}
              value={videoNote}
              onChange={(e) => setVideoNote(e.target.value)}
              placeholder="e.g. Lifted at Akhada Iron Forge Arena, rack 2 with calibrated Eleiko plates. Head Coach Ansh Dwivedi was spotter."
              className="w-full bg-[#0A0D10] border border-white/15 focus:border-[#CCFF00] rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none"
            />
          </div>

          <div className="text-[11px] text-slate-400">
            Venue: <strong className="text-white">{memberPass?.gymName || 'Akhada Iron Forge Arena'}</strong>
          </div>

          <div className="pt-2 flex items-center justify-end gap-3 border-t border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-bold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-[#CCFF00] hover:bg-lime-400 text-black text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shadow-lg shadow-[#CCFF00]/20"
            >
              <Sparkles className="w-4 h-4" />
              <span>Submit for Verification</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

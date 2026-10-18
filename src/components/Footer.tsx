import React from 'react';
import { useApp } from '../context/AppContext';
import { Dumbbell, ShieldCheck, RefreshCcw, Building2, UserCheck, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActiveTab, setPersonaRole, resetDemoData } = useApp();

  return (
    <footer className="bg-[#080B0E] border-t border-white/10 text-slate-400 text-xs py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand & Owner Credential */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#CCFF00] text-black font-black flex items-center justify-center">
                <Dumbbell className="w-5 h-5" />
              </div>
              <span className="font-display font-black text-xl text-white tracking-wider">
                AKHADA
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              India's modern strength discovery network, digital turnstile passes, verified PR leaderboards, and sports nutrition.
            </p>
            <div className="pt-1 text-[11px] text-slate-300">
              <span className="text-slate-500 block text-[10px] uppercase font-bold">Ownership &amp; Administration</span>
              <span className="font-bold text-[#CCFF00] text-xs">Ansh Dwivedi</span> (Owner &amp; Super Admin)
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="space-y-2">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-white">
              Platform Modules
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <button
                  onClick={() => setActiveTab('discover')}
                  className="hover:text-[#CCFF00] transition-colors"
                >
                  Discover Gyms &amp; Arenas
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('leaderboard')}
                  className="hover:text-[#CCFF00] transition-colors"
                >
                  Athlete Leaderboard &amp; Trials
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('store')}
                  className="hover:text-[#CCFF00] transition-colors"
                >
                  Supplements &amp; Hardware Store
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className="hover:text-[#CCFF00] transition-colors"
                >
                  Digital Pass &amp; Check-in Hub
                </button>
              </li>
            </ul>
          </div>

          {/* Personas Quick Jump */}
          <div className="space-y-2">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-white">
              Role Switcher (Live Demo)
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <button
                  onClick={() => setPersonaRole('member')}
                  className="flex items-center gap-1.5 hover:text-white transition-colors"
                >
                  <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Member: Aryan Sharma</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setPersonaRole('owner')}
                  className="flex items-center gap-1.5 hover:text-white transition-colors"
                >
                  <Building2 className="w-3.5 h-3.5 text-amber-400" />
                  <span>Owner: <strong className="text-white">Ansh Dwivedi</strong></span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setPersonaRole('admin')}
                  className="flex items-center gap-1.5 hover:text-white transition-colors"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
                  <span>Admin: <strong className="text-white">Ansh Dwivedi</strong></span>
                </button>
              </li>
            </ul>
          </div>

          {/* Reset Demo Data */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-white">
              Academic Project Controls
            </h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Reset cached state back to baseline with Ansh Dwivedi as Gym Owner and Platform Administrator.
            </p>
            <button
              onClick={resetDemoData}
              className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 text-xs font-bold flex items-center gap-2 transition-colors"
            >
              <RefreshCcw className="w-3.5 h-3.5 text-amber-400" />
              <span>Reset Demo State</span>
            </button>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>© 2026 Akhada Fitness Network. Founded and Managed by Ansh Dwivedi.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              Built with precision &amp; discipline <Heart className="w-3 h-3 text-red-500 fill-red-500" />
            </span>
            <span>•</span>
            <span className="text-slate-400">All Rights Reserved</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  Dumbbell,
  Compass,
  Trophy,
  ShoppingBag,
  LayoutDashboard,
  ShieldAlert,
  Building2,
  UserCheck,
  ChevronDown,
  Sparkles,
  Coins,
} from 'lucide-react';
import { PersonaRole } from '../types';

export const Navbar: React.FC = () => {
  const {
    personaRole,
    setPersonaRole,
    currentPersona,
    activeTab,
    setActiveTab,
    cart,
    setIsCartOpen,
    currency,
    toggleCurrency,
  } = useApp();

  const [isPersonaMenuOpen, setIsPersonaMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsPersonaMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navItems = [
    { id: 'discover', label: 'Discover Gyms', icon: Compass },
    { id: 'leaderboard', label: 'Leaderboard & Challenges', icon: Trophy },
    { id: 'store', label: 'Gear & Supplements', icon: ShoppingBag },
    {
      id: 'dashboard',
      label:
        personaRole === 'owner'
          ? 'Owner Hub (Ansh)'
          : personaRole === 'admin'
          ? 'Admin Console (Ansh)'
          : 'My Dashboard',
      icon: personaRole === 'admin' ? ShieldAlert : personaRole === 'owner' ? Building2 : LayoutDashboard,
      badge: personaRole !== 'member' ? 'Ansh Dwivedi' : undefined,
    },
  ];

  const handlePersonaSelect = (role: PersonaRole) => {
    setPersonaRole(role);
    setIsPersonaMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0A0D10]/90 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Logo & Brand */}
          <div
            onClick={() => setActiveTab('discover')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#CCFF00] to-lime-500 flex items-center justify-center text-black font-black shadow-lg shadow-[#CCFF00]/20 group-hover:scale-105 transition-transform">
              <Dumbbell className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-display font-black text-2xl tracking-wider text-white">AKHADA</span>
                <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-[#CCFF00]/15 text-[#CCFF00] border border-[#CCFF00]/30">
                  PRO
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium tracking-tight">
                Gym Discovery &amp; Athlete Cloud
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`relative flex items-center gap-2 px-3.5 py-2 text-sm font-semibold rounded-lg transition-colors ${
                    isActive
                      ? 'bg-white/10 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#CCFF00]' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-amber-400/20 text-amber-300 border border-amber-400/30">
                      {item.badge}
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-[#CCFF00] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Bar */}
          <div className="flex items-center gap-3">
            {/* Currency Toggle */}
            <button
              onClick={toggleCurrency}
              title={`Switch currency (Current: ${currency})`}
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-900 border border-white/10 text-slate-300 hover:text-white hover:border-slate-600 transition-colors"
            >
              <Coins className="w-3.5 h-3.5 text-amber-400" />
              <span>{currency === 'INR' ? '₹ INR' : '$ USD'}</span>
            </button>

            {/* Shopping Cart Drawer Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 rounded-lg bg-slate-900 border border-white/10 text-slate-300 hover:text-white hover:border-white/20 transition-colors"
              aria-label="View Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-[#CCFF00] text-black font-extrabold text-[11px] rounded-full flex items-center justify-center shadow-md animate-pulse">
                  {cartItemCount}
                </span>
              )}
            </button>

            {/* Persona Switcher Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsPersonaMenuOpen(!isPersonaMenuOpen)}
                className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl bg-slate-900/90 border border-white/15 hover:border-white/30 transition-all text-left group"
              >
                <img
                  src={currentPersona.avatar}
                  alt={currentPersona.name}
                  className="w-7 h-7 rounded-lg object-cover ring-1 ring-white/20"
                />
                <div className="hidden sm:block">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-white group-hover:text-[#CCFF00] transition-colors leading-none">
                      {currentPersona.name}
                    </span>
                    <span
                      className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded uppercase tracking-wider ${
                        personaRole === 'admin'
                          ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                          : personaRole === 'owner'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      }`}
                    >
                      {personaRole}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400 block leading-tight truncate max-w-[110px]">
                    {currentPersona.title}
                  </span>
                </div>
                <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${isPersonaMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {isPersonaMenuOpen && (
                <div className="absolute right-0 mt-2 w-72 rounded-xl bg-[#12171E] border border-white/15 shadow-2xl p-2 z-50 text-slate-200">
                  <div className="px-3 py-2 border-b border-white/10 mb-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                        Switch Persona
                      </span>
                      <span className="text-[10px] text-[#CCFF00] flex items-center gap-1">
                        <Sparkles className="w-3 h-3" /> Live Preview
                      </span>
                    </div>
                  </div>

                  {/* Option 1: Member */}
                  <button
                    onClick={() => handlePersonaSelect('member')}
                    className={`w-full flex items-center gap-3 p-2.5 rounded-lg text-left transition-colors ${
                      personaRole === 'member'
                        ? 'bg-white/10 text-white font-semibold'
                        : 'hover:bg-white/5 text-slate-300'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                      <UserCheck className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white">Aryan Sharma</span>
                        <span className="text-[9px] uppercase px-1 rounded bg-emerald-500/20 text-emerald-300">
                          Member
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 truncate">Athlete • QR Pass &amp; PR Tracker</p>
                    </div>
                  </button>

                  {/* Option 2: Gym Owner - Ansh Dwivedi */}
                  <button
                    onClick={() => handlePersonaSelect('owner')}
                    className={`w-full flex items-center gap-3 p-2.5 rounded-lg text-left transition-colors mt-1 ${
                      personaRole === 'owner'
                        ? 'bg-amber-500/15 border border-amber-500/40 text-white font-semibold'
                        : 'hover:bg-white/5 text-slate-300'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0">
                      <Building2 className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white">Ansh Dwivedi</span>
                        <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-amber-500/30 text-amber-200 font-extrabold border border-amber-500/40">
                          Gym Owner
                        </span>
                      </div>
                      <p className="text-[11px] text-amber-200/80 truncate">Iron Forge Akhada • PR Approvals</p>
                    </div>
                  </button>

                  {/* Option 3: Platform Admin - Ansh Dwivedi */}
                  <button
                    onClick={() => handlePersonaSelect('admin')}
                    className={`w-full flex items-center gap-3 p-2.5 rounded-lg text-left transition-colors mt-1 ${
                      personaRole === 'admin'
                        ? 'bg-purple-500/15 border border-purple-500/40 text-white font-semibold'
                        : 'hover:bg-white/5 text-slate-300'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-lg bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400 shrink-0">
                      <ShieldAlert className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white">Ansh Dwivedi</span>
                        <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-purple-500/30 text-purple-200 font-extrabold border border-purple-500/40">
                          Super Admin
                        </span>
                      </div>
                      <p className="text-[11px] text-purple-200/80 truncate">Platform Control &amp; Gym Audits</p>
                    </div>
                  </button>

                  <div className="mt-2 pt-2 border-t border-white/10 px-2 py-1 flex items-center justify-between text-[10px] text-slate-400">
                    <span>Active: <strong className="text-white">{currentPersona.name}</strong></span>
                    <span className="text-emerald-400 font-mono">Synced</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Navigation bar */}
        <div className="flex md:hidden items-center justify-around py-2.5 border-t border-white/10 gap-1 overflow-x-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex flex-col items-center py-1 px-2.5 rounded-lg text-[11px] font-bold ${
                  isActive ? 'text-[#CCFF00]' : 'text-slate-400'
                }`}
              >
                <Icon className="w-4 h-4 mb-0.5" />
                <span className="whitespace-nowrap">{item.label.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};

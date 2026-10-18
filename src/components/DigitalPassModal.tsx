import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Dumbbell,
  CheckCircle2,
  Calendar,
  Clock,
  Sparkles,
  RefreshCw,
  QrCode,
  Shield,
} from 'lucide-react';

interface DigitalPassModalProps {
  onClose: () => void;
}

export const DigitalPassModal: React.FC<DigitalPassModalProps> = ({ onClose }) => {
  const { memberPass, renewPass, formatPrice } = useApp();
  const [isRenewing, setIsRenewing] = useState(false);
  const [selectedRenewal, setSelectedRenewal] = useState<'Monthly Pass' | 'Quarterly Pass' | 'Annual Elite'>('Quarterly Pass');

  if (!memberPass) return null;

  const handleRenew = () => {
    renewPass(selectedRenewal);
    setIsRenewing(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
      <div className="relative w-full max-w-md bg-[#11171E] border border-white/20 rounded-3xl shadow-2xl overflow-hidden text-slate-100 my-8">
        {/* Top Bar */}
        <div className="flex items-center justify-between p-4 border-b border-white/10 bg-[#0A0D10]">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-[#CCFF00]" />
            <span className="text-xs font-bold uppercase tracking-wider text-white">
              Official Digital Gym Pass
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* The Card View */}
        <div className="p-6 space-y-6">
          <div className="relative rounded-2xl bg-gradient-to-br from-[#161F2A] via-[#10161D] to-[#0B0F14] border border-[#CCFF00]/40 p-6 shadow-2xl shadow-[#CCFF00]/10 overflow-hidden">
            {/* Top Pass Badges */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#CCFF00] text-black font-black flex items-center justify-center">
                  <Dumbbell className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-display font-black text-lg text-white tracking-wider block leading-none">
                    AKHADA PASS
                  </span>
                  <span className="text-[9px] uppercase tracking-widest text-[#CCFF00] font-bold">
                    Biometric Verified
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-[10px] font-black uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                <span>{memberPass.status}</span>
              </div>
            </div>

            {/* Pass QR Code with laser line animation */}
            <div className="my-6 flex justify-center">
              <div className="relative p-3 rounded-2xl bg-white shadow-xl shadow-black/40">
                <div className="w-40 h-40 bg-slate-900 rounded-xl p-2 flex items-center justify-center relative overflow-hidden">
                  {/* SVG QR Code Pattern */}
                  <svg className="w-full h-full text-[#CCFF00]" viewBox="0 0 100 100">
                    <rect x="5" y="5" width="28" height="28" fill="currentColor" />
                    <rect x="9" y="9" width="20" height="20" fill="#0B0F14" />
                    <rect x="13" y="13" width="12" height="12" fill="currentColor" />

                    <rect x="67" y="5" width="28" height="28" fill="currentColor" />
                    <rect x="71" y="9" width="20" height="20" fill="#0B0F14" />
                    <rect x="75" y="13" width="12" height="12" fill="currentColor" />

                    <rect x="5" y="67" width="28" height="28" fill="currentColor" />
                    <rect x="9" y="71" width="20" height="20" fill="#0B0F14" />
                    <rect x="13" y="75" width="12" height="12" fill="currentColor" />

                    {/* Matrix dots */}
                    <rect x="40" y="10" width="8" height="8" fill="currentColor" />
                    <rect x="52" y="18" width="8" height="8" fill="currentColor" />
                    <rect x="40" y="28" width="8" height="8" fill="currentColor" />
                    <rect x="25" y="45" width="8" height="8" fill="currentColor" />
                    <rect x="45" y="45" width="10" height="10" fill="currentColor" />
                    <rect x="65" y="45" width="8" height="8" fill="currentColor" />
                    <rect x="45" y="65" width="8" height="8" fill="currentColor" />
                    <rect x="60" y="72" width="12" height="8" fill="currentColor" />
                    <rect x="80" y="60" width="10" height="10" fill="currentColor" />
                    <rect x="75" y="80" width="12" height="12" fill="currentColor" />
                  </svg>

                  {/* Animated Scanner Laser */}
                  <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#CCFF00] to-transparent shadow-[0_0_8px_#CCFF00] animate-scanline" />
                </div>
              </div>
            </div>

            {/* Member Details */}
            <div className="space-y-3 pt-2 border-t border-white/10">
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Member Name</span>
                  <span className="text-sm font-extrabold text-white">{memberPass.memberName}</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Membership Tier</span>
                  <span className="text-xs font-bold text-[#CCFF00]">{memberPass.planType}</span>
                </div>
              </div>

              <div className="flex justify-between items-center text-xs">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Gym Venue</span>
                  <span className="text-white font-medium">{memberPass.gymName}</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Pass ID</span>
                  <span className="font-mono text-slate-300 font-bold">{memberPass.passId}</span>
                </div>
              </div>

              <div className="pt-2 flex justify-between items-center text-xs border-t border-white/5">
                <div className="flex items-center gap-1.5 text-slate-400">
                  <Calendar className="w-3.5 h-3.5 text-[#CCFF00]" />
                  <span>Expires: <strong className="text-white">{memberPass.expiryDate}</strong></span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-400">
                  <Clock className="w-3.5 h-3.5 text-[#CCFF00]" />
                  <span>{memberPass.daysRemaining} days left</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-3 text-center">
            <div className="p-3 rounded-xl bg-[#0A0D10] border border-white/10">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Check-Ins</span>
              <span className="text-lg font-black font-mono text-[#CCFF00]">{memberPass.checkInsCount}</span>
            </div>
            <div className="p-3 rounded-xl bg-[#0A0D10] border border-white/10">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Turnstile Status</span>
              <span className="text-xs font-bold text-emerald-400 flex items-center justify-center gap-1 mt-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Granted
              </span>
            </div>
          </div>

          {/* Renewal Section */}
          {!isRenewing ? (
            <button
              onClick={() => setIsRenewing(true)}
              className="w-full py-3 rounded-xl bg-white/10 hover:bg-[#CCFF00] text-white hover:text-black font-bold text-xs flex items-center justify-center gap-2 transition-colors border border-white/15"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Extend / Renew Pass</span>
            </button>
          ) : (
            <div className="p-4 rounded-2xl bg-[#0A0D10] border border-[#CCFF00]/40 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">Select Renewal Term</span>
                <button
                  onClick={() => setIsRenewing(false)}
                  className="text-[11px] text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {(['Monthly Pass', 'Quarterly Pass', 'Annual Elite'] as const).map((tier) => (
                  <button
                    key={tier}
                    onClick={() => setSelectedRenewal(tier)}
                    className={`p-2 rounded-xl text-center border text-[11px] font-bold transition-all ${
                      selectedRenewal === tier
                        ? 'bg-[#19232F] border-[#CCFF00] text-white'
                        : 'bg-[#12171E] border-white/10 text-slate-400'
                    }`}
                  >
                    <span className="block">{tier.split(' ')[0]}</span>
                    <span className="text-[9px] text-[#CCFF00] block mt-0.5">
                      {formatPrice(tier === 'Monthly Pass' ? 2499 : tier === 'Quarterly Pass' ? 6499 : 21999)}
                    </span>
                  </button>
                ))}
              </div>

              <button
                onClick={handleRenew}
                className="w-full py-2.5 rounded-xl bg-[#CCFF00] hover:bg-lime-400 text-black text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md shadow-[#CCFF00]/20"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Confirm {selectedRenewal} Renewal</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

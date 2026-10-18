import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Gym } from '../types';
import {
  X,
  MapPin,
  Clock,
  Phone,
  ShieldCheck,
  Star,
  Check,
  Dumbbell,
  User,
  CreditCard,
  Building,
  Sparkles,
} from 'lucide-react';

interface GymDetailsModalProps {
  gym: Gym;
  onClose: () => void;
  onSelectPlan: (plan: 'Monthly Pass' | 'Quarterly Pass' | 'Annual Elite') => void;
}

export const GymDetailsModal: React.FC<GymDetailsModalProps> = ({ gym, onClose, onSelectPlan }) => {
  const { formatPrice } = useApp();
  const [activeImage, setActiveImage] = useState<string>(gym.gallery[0] || gym.image);
  const [selectedPlanTier, setSelectedPlanTier] = useState<'Monthly Pass' | 'Quarterly Pass' | 'Annual Elite'>('Quarterly Pass');

  const plans = [
    {
      name: 'Monthly Pass' as const,
      price: gym.monthlyPrice,
      duration: 'Billed monthly',
      savings: 'Flexible commitment',
      features: [
        'Full gym floor access',
        'Standard locker room access',
        'Biometric check-in enabled',
        'Akhada Leaderboard profile',
      ],
      popular: false,
    },
    {
      name: 'Quarterly Pass' as const,
      price: gym.quarterlyPrice,
      duration: '3 Months Unlimited',
      savings: 'Save ~15% vs monthly',
      features: [
        'Everything in Monthly Pass',
        '1 Free Coach Consultation',
        'Finnish Sauna & Ice Bath Access',
        'Priority Platform Booking',
        'Verified PR Submission Queue',
      ],
      popular: true,
    },
    {
      name: 'Annual Elite' as const,
      price: gym.annualPrice,
      duration: '12 Months Unlimited',
      savings: 'Best Value (Save 28%)',
      features: [
        'All-Access VIP Member Pass',
        'Full Recovery Lounge + Sauna',
        'Free Akhada Lifting Belt (10mm)',
        'Unlimited Verified PR Submissions',
        'Guest passes (2 per month)',
        'Official Coach Assessment with Ansh Dwivedi',
      ],
      popular: false,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6">
      <div className="relative w-full max-w-4xl bg-[#12171E] border border-white/15 rounded-3xl shadow-2xl overflow-hidden text-slate-100 my-8 max-h-[90vh] flex flex-col">
        {/* Header with Close */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-white/10 shrink-0 bg-[#0E1319]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#CCFF00]/15 text-[#CCFF00] border border-[#CCFF00]/30 flex items-center justify-center font-black">
              <Dumbbell className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-black font-display tracking-tight text-white uppercase">
                  {gym.name}
                </h2>
                {gym.verified && (
                  <span className="px-2 py-0.5 rounded-full bg-[#CCFF00]/20 text-[#CCFF00] text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 border border-[#CCFF00]/40">
                    <ShieldCheck className="w-3 h-3" /> Verified Arena
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
                <MapPin className="w-3 h-3 text-[#CCFF00]" /> {gym.address}, {gym.city}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-4 sm:p-6 space-y-8 overflow-y-auto flex-1">
          {/* Main Gallery */}
          <div className="space-y-3">
            <div className="aspect-[16/9] w-full rounded-2xl overflow-hidden bg-black/50 border border-white/10 relative">
              <img src={activeImage} alt={gym.name} className="w-full h-full object-cover" />
              <div className="absolute bottom-3 left-3 px-3 py-1.5 rounded-xl bg-black/80 backdrop-blur-md border border-white/20 text-xs font-semibold text-slate-200 flex items-center gap-2">
                <Building className="w-3.5 h-3.5 text-[#CCFF00]" />
                <span>Founder &amp; Owner: <strong className="text-white font-extrabold">{gym.ownerName}</strong></span>
              </div>
            </div>

            {/* Gallery Thumbnails */}
            {gym.gallery.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {gym.gallery.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`w-20 h-14 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                      activeImage === img ? 'border-[#CCFF00] scale-95 shadow-md' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Quick Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-2xl bg-[#0A0D10] border border-white/10 flex items-center gap-3">
              <div className="p-2 rounded-xl bg-amber-400/10 text-amber-400">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Working Hours</span>
                <span className="text-xs font-bold text-white">{gym.hours}</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#0A0D10] border border-white/10 flex items-center gap-3">
              <div className="p-2 rounded-xl bg-emerald-400/10 text-emerald-400">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Direct Desk Phone</span>
                <span className="text-xs font-bold text-white font-mono">{gym.phone}</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#0A0D10] border border-white/10 flex items-center gap-3">
              <div className="p-2 rounded-xl bg-purple-400/10 text-purple-400">
                <Star className="w-5 h-5 fill-purple-400" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Member Rating</span>
                <span className="text-xs font-bold text-white">
                  {gym.rating.toFixed(2)} / 5.0 ({gym.reviewsCount} reviews)
                </span>
              </div>
            </div>
          </div>

          {/* About Gym */}
          <div className="space-y-2">
            <h3 className="text-xs font-extrabold uppercase tracking-widest text-slate-400">
              About This Facility
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed bg-[#0A0D10]/50 p-4 rounded-2xl border border-white/5">
              {gym.description}
            </p>
          </div>

          {/* Facilities & Amenities Checklist */}
          <div className="space-y-3">
            <h3 className="text-xs font-extrabold uppercase tracking-widest text-slate-400">
              Verified Amenities &amp; Equipment
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {gym.amenities.map((amenity, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 p-2.5 rounded-xl bg-[#0A0D10] border border-white/10 text-xs text-slate-200"
                >
                  <Check className="w-4 h-4 text-[#CCFF00] shrink-0" />
                  <span className="font-semibold text-[11px]">{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Certified Trainers Roster */}
          <div className="space-y-3">
            <h3 className="text-xs font-extrabold uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-[#CCFF00]" /> Coaching Staff &amp; Leadership
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {gym.trainers.map((coach, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-[#0A0D10] border border-white/10 flex items-center gap-3"
                >
                  <img
                    src={coach.photo}
                    alt={coach.name}
                    className="w-12 h-12 rounded-xl object-cover ring-1 ring-white/15 shrink-0"
                  />
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-white truncate flex items-center gap-1">
                      {coach.name}
                      {coach.name === 'Ansh Dwivedi' && (
                        <span className="text-[9px] px-1 py-0.2 rounded bg-amber-400/20 text-amber-300 font-bold">
                          Owner
                        </span>
                      )}
                    </h4>
                    <p className="text-[10px] text-[#CCFF00] font-medium">{coach.role}</p>
                    <p className="text-[10px] text-slate-400 truncate">{coach.specialty} ({coach.experience})</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Membership Tier Picker */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-black uppercase tracking-wider text-white">
                  Select Membership Pass
                </h3>
                <p className="text-xs text-slate-400">Instant digital QR pass issued upon simulated checkout</p>
              </div>
              <span className="text-xs font-bold text-[#CCFF00] flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> No Registration Fees
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {plans.map((plan) => {
                const isSelected = selectedPlanTier === plan.name;
                return (
                  <div
                    key={plan.name}
                    onClick={() => setSelectedPlanTier(plan.name)}
                    className={`relative p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'bg-[#18212C] border-[#CCFF00] shadow-xl shadow-[#CCFF00]/10 scale-[1.02]'
                        : 'bg-[#0A0D10] border-white/10 hover:border-white/20'
                    }`}
                  >
                    {plan.popular && (
                      <span className="absolute -top-2.5 right-4 px-2.5 py-0.5 rounded-full bg-[#CCFF00] text-black text-[10px] font-black uppercase tracking-wider shadow-md">
                        Most Popular
                      </span>
                    )}

                    <div className="space-y-3">
                      <div>
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-bold text-white">{plan.name}</h4>
                          <input
                            type="radio"
                            name="planTier"
                            checked={isSelected}
                            onChange={() => setSelectedPlanTier(plan.name)}
                            className="accent-[#CCFF00] w-4 h-4 cursor-pointer"
                          />
                        </div>
                        <span className="text-[10px] text-slate-400">{plan.duration}</span>
                      </div>

                      <div className="py-1">
                        <div className="text-2xl font-black font-mono text-[#CCFF00]">
                          {formatPrice(plan.price)}
                        </div>
                        <span className="text-[10px] text-emerald-400 font-semibold">{plan.savings}</span>
                      </div>

                      <ul className="space-y-2 text-[11px] text-slate-300 border-t border-white/10 pt-3">
                        {plan.features.map((feat, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <Check className="w-3.5 h-3.5 text-[#CCFF00] shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-6 border-t border-white/10 bg-[#0E1319] flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Selected Tier</span>
            <span className="text-sm font-extrabold text-white">
              {selectedPlanTier} •{' '}
              <span className="text-[#CCFF00] font-mono">
                {formatPrice(
                  selectedPlanTier === 'Monthly Pass'
                    ? gym.monthlyPrice
                    : selectedPlanTier === 'Quarterly Pass'
                    ? gym.quarterlyPrice
                    : gym.annualPrice
                )}
              </span>
            </span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-bold transition-colors flex-1 sm:flex-none"
            >
              Cancel
            </button>
            <button
              onClick={() => onSelectPlan(selectedPlanTier)}
              className="px-6 py-2.5 rounded-xl bg-[#CCFF00] hover:bg-lime-400 text-black text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-[#CCFF00]/20 transition-all flex-1 sm:flex-none"
            >
              <CreditCard className="w-4 h-4" />
              <span>Get Digital Pass</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

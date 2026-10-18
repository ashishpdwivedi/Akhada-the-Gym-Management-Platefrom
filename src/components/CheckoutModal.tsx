import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Gym } from '../types';
import {
  X,
  CreditCard,
  QrCode,
  Building,
  ShieldCheck,
  CheckCircle2,
  Lock,
} from 'lucide-react';

interface CheckoutModalProps {
  gym: Gym;
  planType: 'Monthly Pass' | 'Quarterly Pass' | 'Annual Elite';
  onClose: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ gym, planType, onClose }) => {
  const { formatPrice, currentPersona, checkoutMembershipPass } = useApp();
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'front_desk'>('upi');
  const [isProcessing, setIsProcessing] = useState(false);

  const price =
    planType === 'Monthly Pass'
      ? gym.monthlyPrice
      : planType === 'Quarterly Pass'
      ? gym.quarterlyPrice
      : gym.annualPrice;

  const handleCompleteOrder = () => {
    setIsProcessing(true);
    setTimeout(() => {
      checkoutMembershipPass(gym, planType, paymentMethod.toUpperCase());
      setIsProcessing(false);
      onClose();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6">
      <div className="relative w-full max-w-xl bg-[#12171E] border border-white/15 rounded-3xl shadow-2xl overflow-hidden text-slate-100">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/10 bg-[#0E1319]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#CCFF00]/15 text-[#CCFF00] flex items-center justify-center font-black">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white uppercase font-display tracking-wide">
                Simulated Digital Pass Checkout
              </h3>
              <p className="text-[11px] text-slate-400">Academic Demo &amp; Instant Issuance Mode</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 space-y-6">
          {/* Order Summary Card */}
          <div className="p-4 rounded-2xl bg-[#0A0D10] border border-white/10 space-y-3">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="text-sm font-bold text-white">{gym.name}</h4>
                <p className="text-xs text-[#CCFF00] font-semibold mt-0.5">{planType}</p>
                <p className="text-[11px] text-slate-400">Issuing to athlete: <strong>{currentPersona.name}</strong></p>
              </div>
              <div className="text-right">
                <span className="text-lg font-black font-mono text-[#CCFF00]">{formatPrice(price)}</span>
                <span className="text-[10px] text-emerald-400 block font-semibold">Taxes included</span>
              </div>
            </div>

            <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
              <span>Facility Owner</span>
              <span className="text-white font-semibold">{gym.ownerName}</span>
            </div>
          </div>

          {/* Payment Method Selector */}
          <div className="space-y-3">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
              Choose Payment Method
            </label>

            <div className="grid grid-cols-3 gap-2.5">
              <button
                type="button"
                onClick={() => setPaymentMethod('upi')}
                className={`p-3 rounded-xl border text-center transition-all ${
                  paymentMethod === 'upi'
                    ? 'bg-[#19232F] border-[#CCFF00] text-white'
                    : 'bg-[#0A0D10] border-white/10 text-slate-400 hover:border-white/20'
                }`}
              >
                <QrCode className={`w-5 h-5 mx-auto mb-1 ${paymentMethod === 'upi' ? 'text-[#CCFF00]' : ''}`} />
                <span className="text-[11px] font-bold block">UPI / QR</span>
                <span className="text-[9px] text-slate-400 block">PhonePe / GPay</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-3 rounded-xl border text-center transition-all ${
                  paymentMethod === 'card'
                    ? 'bg-[#19232F] border-[#CCFF00] text-white'
                    : 'bg-[#0A0D10] border-white/10 text-slate-400 hover:border-white/20'
                }`}
              >
                <CreditCard className={`w-5 h-5 mx-auto mb-1 ${paymentMethod === 'card' ? 'text-[#CCFF00]' : ''}`} />
                <span className="text-[11px] font-bold block">Card</span>
                <span className="text-[9px] text-slate-400 block">Simulated Debit/Credit</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('front_desk')}
                className={`p-3 rounded-xl border text-center transition-all ${
                  paymentMethod === 'front_desk'
                    ? 'bg-[#19232F] border-[#CCFF00] text-white'
                    : 'bg-[#0A0D10] border-white/10 text-slate-400 hover:border-white/20'
                }`}
              >
                <Building className={`w-5 h-5 mx-auto mb-1 ${paymentMethod === 'front_desk' ? 'text-[#CCFF00]' : ''}`} />
                <span className="text-[11px] font-bold block">Front Desk</span>
                <span className="text-[9px] text-slate-400 block">Pay at Akhada</span>
              </button>
            </div>
          </div>

          {/* Payment Method Details Preview */}
          <div className="p-4 rounded-xl bg-[#0A0D10] border border-white/10 text-xs">
            {paymentMethod === 'upi' && (
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 bg-white p-1 rounded-lg shrink-0 flex items-center justify-center">
                  <svg className="w-full h-full text-black" viewBox="0 0 100 100">
                    <rect x="10" y="10" width="30" height="30" fill="currentColor" />
                    <rect x="15" y="15" width="20" height="20" fill="white" />
                    <rect x="20" y="20" width="10" height="10" fill="currentColor" />
                    <rect x="60" y="10" width="30" height="30" fill="currentColor" />
                    <rect x="65" y="15" width="20" height="20" fill="white" />
                    <rect x="70" y="20" width="10" height="10" fill="currentColor" />
                    <rect x="10" y="60" width="30" height="30" fill="currentColor" />
                    <rect x="15" y="65" width="20" height="20" fill="white" />
                    <rect x="20" y="70" width="10" height="10" fill="currentColor" />
                    <rect x="45" y="45" width="10" height="10" fill="currentColor" />
                    <rect x="65" y="65" width="20" height="20" fill="currentColor" />
                  </svg>
                </div>
                <div className="space-y-1">
                  <p className="font-bold text-white flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#CCFF00]" /> Simulated UPI QR Code
                  </p>
                  <p className="text-[11px] text-slate-400">
                    UPI ID: <span className="font-mono text-slate-200 font-bold">akhada.arena@upi</span>
                  </p>
                  <p className="text-[10px] text-emerald-400">Auto-approves instantaneously on submit.</p>
                </div>
              </div>
            )}

            {paymentMethod === 'card' && (
              <div className="space-y-2">
                <div className="flex justify-between items-center text-[11px] text-slate-400">
                  <span>Simulated Card Number</span>
                  <span className="font-mono text-white">4111 •••• •••• 9924</span>
                </div>
                <div className="flex gap-4 text-[11px] text-slate-400">
                  <span>Expiry: <strong className="text-white">10/28</strong></span>
                  <span>CVV: <strong className="text-white font-mono">•••</strong></span>
                </div>
              </div>
            )}

            {paymentMethod === 'front_desk' && (
              <div className="space-y-1">
                <p className="font-bold text-white">Pay at Akhada Reception</p>
                <p className="text-[11px] text-slate-400">
                  Your pass will be activated immediately with provisional status. Simply present your Pass ID at the front desk.
                </p>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 text-[11px] text-slate-400">
            <Lock className="w-3.5 h-3.5 text-[#CCFF00]" />
            <span>256-bit Secure Simulated Sandbox Session</span>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 border-t border-white/10 bg-[#0E1319] flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-bold"
          >
            Cancel
          </button>

          <button
            onClick={handleCompleteOrder}
            disabled={isProcessing}
            className="px-6 py-2.5 rounded-xl bg-[#CCFF00] hover:bg-lime-400 text-black text-xs font-black uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-[#CCFF00]/20 disabled:opacity-50"
          >
            {isProcessing ? 'Generating QR Pass...' : `Authorize ${formatPrice(price)}`}
          </button>
        </div>
      </div>
    </div>
  );
};

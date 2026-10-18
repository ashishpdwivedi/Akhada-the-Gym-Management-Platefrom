import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  CreditCard,
  QrCode,
  Truck,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    formatPrice,
    checkoutStore,
  } = useApp();

  const [paymentChoice, setPaymentChoice] = useState<'upi' | 'card'>('upi');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [placedOrder, setPlacedOrder] = useState<any | null>(null);

  if (!isCartOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const freeShippingThreshold = 2500;
  const freeShippingMet = subtotal >= freeShippingThreshold;
  const shippingCharge = freeShippingMet || subtotal === 0 ? 0 : 150;
  const grandTotal = subtotal + shippingCharge;

  const handleCheckout = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      const order = checkoutStore(paymentChoice === 'upi' ? 'UPI Instant QR' : 'Credit/Debit Card');
      setIsSubmitting(false);
      setPlacedOrder(order);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-sm">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#12171E] border-l border-white/10 shadow-2xl flex flex-col text-slate-100">
          {/* Header */}
          <div className="p-5 border-b border-white/10 bg-[#0E1319] flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#CCFF00]" />
              <h2 className="text-base font-bold text-white uppercase font-display tracking-wider">
                Your Shopping Cart ({cart.reduce((t, i) => t + i.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={() => {
                setIsCartOpen(false);
                setPlacedOrder(null);
              }}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Success receipt view if order just placed */}
          {placedOrder ? (
            <div className="p-6 space-y-6 flex-1 overflow-y-auto text-center">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-1">
                <h3 className="text-xl font-black font-display text-white uppercase">
                  Order Successfully Placed!
                </h3>
                <p className="text-xs text-slate-400">
                  Simulated sandbox order confirmed. Courier dispatch initiated.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#0A0D10] border border-white/10 text-left space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Order ID:</span>
                  <span className="font-mono font-bold text-white">{placedOrder.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Tracking Code:</span>
                  <span className="font-mono text-[#CCFF00] font-bold">{placedOrder.trackingNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Payment:</span>
                  <span className="text-slate-200">{placedOrder.paymentMethod}</span>
                </div>
                <div className="pt-2 border-t border-white/5 flex justify-between font-bold text-sm">
                  <span className="text-slate-300">Total Paid:</span>
                  <span className="text-[#CCFF00] font-mono">{formatPrice(placedOrder.totalAmount)}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  setIsCartOpen(false);
                  setPlacedOrder(null);
                }}
                className="w-full py-3 rounded-xl bg-[#CCFF00] text-black font-black text-xs uppercase tracking-wider hover:bg-lime-400 transition-colors shadow-lg shadow-[#CCFF00]/20"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <>
              {/* Free shipping bar */}
              <div className="p-4 bg-[#0A0D10] border-b border-white/5 space-y-2 shrink-0">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400 flex items-center gap-1.5 font-medium">
                    <Truck className="w-4 h-4 text-[#CCFF00]" />
                    {freeShippingMet ? (
                      <strong className="text-emerald-400">You unlocked FREE Express Shipping!</strong>
                    ) : (
                      <>
                        Add <strong className="text-white font-mono">{formatPrice(freeShippingThreshold - subtotal)}</strong> more for Free Shipping
                      </>
                    )}
                  </span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-[#CCFF00] h-full rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%` }}
                  />
                </div>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {cart.length === 0 ? (
                  <div className="text-center py-16 space-y-3">
                    <ShoppingBag className="w-12 h-12 text-slate-600 mx-auto" />
                    <p className="text-sm font-bold text-white">Your cart is currently empty</p>
                    <p className="text-xs text-slate-400">
                      Explore our high-protein supplements and competition gym equipment.
                    </p>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div
                      key={`${item.product.id}-${item.selectedOption}`}
                      className="p-3.5 rounded-2xl bg-[#0A0D10] border border-white/10 flex items-center gap-3"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-14 h-14 rounded-xl object-cover ring-1 ring-white/10 shrink-0"
                      />

                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-white truncate">{item.product.name}</h4>
                        {item.selectedOption && (
                          <span className="text-[10px] text-slate-400 block truncate">
                            {item.selectedOption}
                          </span>
                        )}
                        <span className="text-xs font-mono font-bold text-[#CCFF00] block mt-0.5">
                          {formatPrice(item.product.price)}
                        </span>
                      </div>

                      {/* Quantity & Delete */}
                      <div className="flex flex-col items-end gap-2 shrink-0">
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-slate-500 hover:text-red-400 transition-colors p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>

                        <div className="flex items-center gap-1.5 bg-[#12171E] border border-white/10 rounded-lg p-0.5">
                          <button
                            onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                            className="p-1 text-slate-400 hover:text-white"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-mono font-bold px-1.5 text-white">{item.quantity}</span>
                          <button
                            onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                            className="p-1 text-slate-400 hover:text-white"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Checkout Footer */}
              {cart.length > 0 && (
                <div className="p-4 border-t border-white/10 bg-[#0E1319] space-y-4 shrink-0">
                  {/* Payment selector */}
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <button
                      onClick={() => setPaymentChoice('upi')}
                      className={`p-2 rounded-xl border text-center font-bold flex items-center justify-center gap-1.5 ${
                        paymentChoice === 'upi'
                          ? 'bg-[#19232F] border-[#CCFF00] text-white'
                          : 'bg-[#0A0D10] border-white/10 text-slate-400'
                      }`}
                    >
                      <QrCode className="w-3.5 h-3.5 text-[#CCFF00]" />
                      <span>UPI QR Instant</span>
                    </button>
                    <button
                      onClick={() => setPaymentChoice('card')}
                      className={`p-2 rounded-xl border text-center font-bold flex items-center justify-center gap-1.5 ${
                        paymentChoice === 'card'
                          ? 'bg-[#19232F] border-[#CCFF00] text-white'
                          : 'bg-[#0A0D10] border-white/10 text-slate-400'
                      }`}
                    >
                      <CreditCard className="w-3.5 h-3.5 text-[#CCFF00]" />
                      <span>Card Checkout</span>
                    </button>
                  </div>

                  {/* Calculations */}
                  <div className="space-y-1.5 text-xs text-slate-300">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="font-mono text-white font-bold">{formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span className="font-mono text-emerald-400 font-bold">
                        {shippingCharge === 0 ? 'FREE' : formatPrice(shippingCharge)}
                      </span>
                    </div>
                    <div className="pt-2 border-t border-white/10 flex justify-between text-sm font-black text-white">
                      <span>Grand Total</span>
                      <span className="font-mono text-[#CCFF00] text-base">{formatPrice(grandTotal)}</span>
                    </div>
                  </div>

                  <button
                    onClick={handleCheckout}
                    disabled={isSubmitting}
                    className="w-full py-3 rounded-xl bg-[#CCFF00] hover:bg-lime-400 text-black font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-[#CCFF00]/20 disabled:opacity-50"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>{isSubmitting ? 'Processing Payment...' : `Complete Order • ${formatPrice(grandTotal)}`}</span>
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

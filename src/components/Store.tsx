import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Product } from '../types';
import {
  ShoppingBag,
  Star,
  Check,
  ShieldCheck,
  Plus,
  Sparkles,
  ArrowRight,
  Truck,
} from 'lucide-react';

export const Store: React.FC = () => {
  const { products, addToCart, formatPrice, setIsCartOpen, cart } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'supplements' | 'gear'>('all');
  const [selectedFlavors, setSelectedFlavors] = useState<Record<string, string>>({});

  const categories = [
    { id: 'all', label: 'All Products' },
    { id: 'supplements', label: 'Proteins & Pre-Workouts' },
    { id: 'gear', label: 'Iron Hardware & Belts' },
  ];

  const filteredProducts = products.filter((p) => {
    if (selectedCategory === 'all') return true;
    return p.category === selectedCategory;
  });

  const handleSelectOption = (productId: string, opt: string) => {
    setSelectedFlavors({ ...selectedFlavors, [productId]: opt });
  };

  const handleAddToCart = (product: Product) => {
    const chosen = selectedFlavors[product.id] || product.sizeOrFlavor?.[0];
    addToCart(product, chosen);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-[#172013] via-[#10171B] to-[#0A0D10] border border-[#CCFF00]/20 rounded-3xl p-6 sm:p-10 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="space-y-3 max-w-xl z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#CCFF00]/10 border border-[#CCFF00]/30 text-[#CCFF00] text-xs font-bold uppercase tracking-wider">
            <Truck className="w-3.5 h-3.5" />
            <span>Fast Express Delivery Across India</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-white uppercase leading-[0.95]">
            FUEL YOUR LIFTS. <br />
            <span className="text-[#CCFF00]">ELITE GEAR &amp; NUTRITION.</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
            Third-party certified whey isolate, Creapure® creatine, IPF-spec 10mm leather lever belts, and competition cast iron kettlebells.
          </p>
        </div>

        <div className="z-10 flex items-center gap-3">
          <button
            onClick={() => setIsCartOpen(true)}
            className="px-5 py-3 rounded-2xl bg-[#CCFF00] hover:bg-lime-400 text-black font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-[#CCFF00]/20 transition-all"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>View Cart ({cart.reduce((t, i) => t + i.quantity, 0)})</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id as any)}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              selectedCategory === cat.id
                ? 'bg-[#CCFF00] text-black shadow-md'
                : 'bg-[#12171E] text-slate-300 hover:text-white border border-white/10'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => {
          const currentChoice = selectedFlavors[product.id] || product.sizeOrFlavor?.[0];
          return (
            <div
              key={product.id}
              className="bg-[#12171E] border border-white/10 hover:border-[#CCFF00]/40 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Image & Badges */}
                <div className="aspect-[4/3] bg-slate-900 relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#12171E] via-transparent to-black/20" />

                  {product.badge && (
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-[#CCFF00] text-black text-[10px] font-black uppercase tracking-wider shadow-md">
                      {product.badge}
                    </span>
                  )}

                  <div className="absolute top-3 right-3 px-2 py-1 rounded-lg bg-black/70 backdrop-blur-md border border-white/10 text-xs font-bold text-amber-400 flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{product.rating}</span>
                    <span className="text-[10px] text-slate-400">({product.reviewsCount})</span>
                  </div>
                </div>

                {/* Info */}
                <div className="p-5 space-y-3">
                  <h3 className="text-base font-bold text-white group-hover:text-[#CCFF00] transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>

                  {/* Specs List */}
                  <div className="space-y-1 pt-1">
                    {product.specs.slice(0, 3).map((spec, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-[11px] text-slate-300">
                        <Check className="w-3 h-3 text-[#CCFF00] shrink-0" />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>

                  {/* Options Picker if available */}
                  {product.sizeOrFlavor && product.sizeOrFlavor.length > 1 && (
                    <div className="pt-2">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                        Select Option
                      </span>
                      <select
                        value={currentChoice}
                        onChange={(e) => handleSelectOption(product.id, e.target.value)}
                        className="w-full bg-[#0A0D10] border border-white/15 rounded-xl px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-[#CCFF00]"
                      >
                        {product.sizeOrFlavor.map((opt) => (
                          <option key={opt} value={opt} className="bg-[#12171E] text-white">
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
              </div>

              {/* Pricing & Add to Cart Footer */}
              <div className="p-5 pt-0 border-t border-white/10 flex items-center justify-between mt-3">
                <div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-xl font-black font-mono text-[#CCFF00]">
                      {formatPrice(product.price)}
                    </span>
                    <span className="text-xs text-slate-500 line-through font-mono">
                      {formatPrice(product.originalPrice)}
                    </span>
                  </div>
                  <span className="text-[10px] text-emerald-400 font-bold block">In Stock • Verified Lab</span>
                </div>

                <button
                  onClick={() => handleAddToCart(product)}
                  className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-[#CCFF00] text-white hover:text-black font-bold text-xs flex items-center gap-1.5 transition-all shadow-md group-hover:bg-[#CCFF00] group-hover:text-black"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

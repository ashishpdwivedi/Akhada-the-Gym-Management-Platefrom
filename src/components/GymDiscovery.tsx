import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { Gym } from '../types';
import {
  Search,
  MapPin,
  Star,
  CheckCircle2,
  SlidersHorizontal,
  Flame,
  ArrowRight,
  ShieldCheck,
  Building,
  Sparkles,
} from 'lucide-react';

export const GymDiscovery: React.FC = () => {
  const { gyms, setSelectedGym, formatPrice } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState<string>('All');
  const [selectedAmenity, setSelectedAmenity] = useState<string>('All');
  const [minRating, setMinRating] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(35000);

  const cities = ['All', 'New Delhi', 'Mumbai', 'Bengaluru', 'Jaipur', 'Pune'];
  const amenitiesList = [
    'All',
    'Competition Power Racks',
    'Finnish Sauna & Ice Bath',
    'Authentic Akhada Mud Pit',
    'Plate Loaded Leverage Machines',
    '24/7 Keycard Entry',
  ];

  const filteredGyms = useMemo(() => {
    return gyms.filter((gym) => {
      // Status check
      if (gym.status === 'suspended') return false;

      // Search query
      const matchesSearch =
        gym.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        gym.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        gym.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        gym.ownerName.toLowerCase().includes(searchQuery.toLowerCase());

      // City filter
      const matchesCity = selectedCity === 'All' || gym.city.toLowerCase() === selectedCity.toLowerCase();

      // Amenity filter
      const matchesAmenity =
        selectedAmenity === 'All' ||
        gym.amenities.some((a) => a.toLowerCase().includes(selectedAmenity.toLowerCase()));

      // Rating filter
      const matchesRating = gym.rating >= minRating;

      // Price filter (monthly price)
      const matchesPrice = gym.monthlyPrice <= maxPrice;

      return matchesSearch && matchesCity && matchesAmenity && matchesRating && matchesPrice;
    });
  }, [gyms, searchQuery, selectedCity, selectedAmenity, minRating, maxPrice]);

  return (
    <div className="space-y-8 pb-16">
      {/* Hero Section */}
      <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-[#10161D] via-[#0D1217] to-[#0A0D10] p-8 md:p-12 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#CCFF00]/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#CCFF00]/10 border border-[#CCFF00]/30 text-[#CCFF00] text-xs font-bold uppercase tracking-wider">
            <Flame className="w-3.5 h-3.5" />
            <span>Discover Elite Iron Temples &amp; Modern Akhadas</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black font-display tracking-tight text-white uppercase leading-[0.95]">
            TRAIN LIKE A CHAMPION. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#CCFF00] via-lime-400 to-emerald-400">
              DISCOVER VERIFIED GYMS.
            </span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl font-medium">
            Explore world-class powerlifting clubs, authentic wrestling Akhadas, and boutique bodybuilding gyms across India.
            Get instant digital QR membership passes, track verified PRs, and connect with certified coaches.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-6 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#CCFF00]" />
              <span>100% Verified Equipment &amp; Amenities</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#CCFF00]" />
              <span>Instant Digital QR Gate Passes</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#CCFF00]" />
              <span>Flagship Gym Founded by <strong>Ansh Dwivedi</strong></span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#12171E] border border-white/10 rounded-2xl p-4 sm:p-6 shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by gym name, owner (Ansh Dwivedi), city, or locality..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0A0D10] border border-white/15 focus:border-[#CCFF00] rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none transition-colors"
            />
          </div>

          {/* City Quick Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            {cities.map((city) => (
              <button
                key={city}
                onClick={() => setSelectedCity(city)}
                className={`px-3.5 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  selectedCity === city
                    ? 'bg-[#CCFF00] text-black shadow-md shadow-[#CCFF00]/20'
                    : 'bg-[#0A0D10] text-slate-300 hover:text-white border border-white/10 hover:border-white/25'
                }`}
              >
                {city}
              </button>
            ))}
          </div>
        </div>

        {/* Secondary Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2 border-t border-white/5">
          {/* Amenity Filter */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-1">
              <SlidersHorizontal className="w-3 h-3" /> Special Facility
            </label>
            <select
              value={selectedAmenity}
              onChange={(e) => setSelectedAmenity(e.target.value)}
              className="w-full bg-[#0A0D10] border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#CCFF00]"
            >
              {amenitiesList.map((amenity) => (
                <option key={amenity} value={amenity} className="bg-[#12171E] text-white">
                  {amenity}
                </option>
              ))}
            </select>
          </div>

          {/* Minimum Rating */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-1">
              <Star className="w-3 h-3 text-amber-400" /> Minimum Rating: {minRating > 0 ? `${minRating}+ Stars` : 'All Ratings'}
            </label>
            <div className="flex items-center gap-1">
              {[0, 4.5, 4.8, 4.9].map((rating) => (
                <button
                  key={rating}
                  onClick={() => setMinRating(rating)}
                  className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-bold transition-colors ${
                    minRating === rating
                      ? 'bg-amber-400/20 text-amber-300 border border-amber-400/40'
                      : 'bg-[#0A0D10] text-slate-400 border border-white/10 hover:text-white'
                  }`}
                >
                  {rating === 0 ? 'Any' : `${rating}+`}
                </button>
              ))}
            </div>
          </div>

          {/* Monthly Budget Range */}
          <div>
            <div className="flex justify-between text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
              <span>Max Monthly Pass</span>
              <span className="text-[#CCFF00] font-mono">{formatPrice(maxPrice)}</span>
            </div>
            <input
              type="range"
              min="1500"
              max="5000"
              step="250"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-[#CCFF00] bg-slate-800 rounded-lg h-2 cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Gym Count & Summary */}
      <div className="flex items-center justify-between text-xs text-slate-400 font-semibold px-1">
        <span>Showing {filteredGyms.length} verified training facilities</span>
        {selectedCity !== 'All' && <span>Filtered by: <strong className="text-white">{selectedCity}</strong></span>}
      </div>

      {/* Gym Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGyms.map((gym: Gym) => (
          <div
            key={gym.id}
            onClick={() => setSelectedGym(gym)}
            className="group bg-[#12171E] rounded-2xl border border-white/10 hover:border-[#CCFF00]/50 overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-[#CCFF00]/5 transition-all duration-300 flex flex-col cursor-pointer"
          >
            {/* Gym Photo with Overlay */}
            <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
              <img
                src={gym.image}
                alt={gym.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#12171E] via-transparent to-black/40" />

              {/* City & Verified Badges */}
              <div className="absolute top-3 left-3 flex items-center gap-1.5">
                <span className="px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md text-[11px] font-bold text-white border border-white/15 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-[#CCFF00]" /> {gym.city}
                </span>
                {gym.verified && (
                  <span className="px-2.5 py-1 rounded-lg bg-[#CCFF00]/90 text-black text-[11px] font-black uppercase tracking-wider flex items-center gap-1 shadow-sm">
                    <CheckCircle2 className="w-3 h-3" /> Verified
                  </span>
                )}
              </div>

              {/* Rating */}
              <div className="absolute top-3 right-3 px-2 py-1 rounded-lg bg-black/70 backdrop-blur-md border border-white/15 text-xs font-bold text-amber-400 flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{gym.rating.toFixed(2)}</span>
                <span className="text-[10px] text-slate-400">({gym.reviewsCount})</span>
              </div>

              {/* Owner Label Tag */}
              <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md border border-white/20 text-[10px] font-semibold text-slate-200 flex items-center gap-1.5">
                <Building className="w-3 h-3 text-[#CCFF00]" />
                <span>Owner: <strong className="text-white font-bold">{gym.ownerName}</strong></span>
              </div>
            </div>

            {/* Gym Details */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <h3 className="text-lg font-black font-display tracking-tight text-white group-hover:text-[#CCFF00] transition-colors uppercase">
                  {gym.name}
                </h3>
                <p className="text-xs text-slate-400 font-medium line-clamp-1 mt-0.5">
                  {gym.tagline}
                </p>

                {/* Amenities Badges */}
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {gym.amenities.slice(0, 3).map((amenity, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[10px] font-semibold text-slate-300"
                    >
                      {amenity}
                    </span>
                  ))}
                  {gym.amenities.length > 3 && (
                    <span className="px-1.5 py-0.5 rounded-md bg-white/5 text-[10px] text-slate-400">
                      +{gym.amenities.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              {/* Pricing & CTA */}
              <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-500 block">Starting From</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-lg font-extrabold font-mono text-[#CCFF00]">
                      {formatPrice(gym.monthlyPrice)}
                    </span>
                    <span className="text-[11px] text-slate-400 font-medium">/month</span>
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedGym(gym);
                  }}
                  className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-[#CCFF00] text-white hover:text-black font-bold text-xs flex items-center gap-1.5 transition-all group-hover:bg-[#CCFF00] group-hover:text-black"
                >
                  <span>View Passes</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredGyms.length === 0 && (
        <div className="text-center py-16 bg-[#12171E] rounded-2xl border border-white/10 p-8 space-y-3">
          <Building className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="text-lg font-bold text-white">No gyms found matching your criteria</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Try adjusting your search query, increasing your monthly budget slider, or selecting "All Cities".
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCity('All');
              setSelectedAmenity('All');
              setMinRating(0);
              setMaxPrice(35000);
            }}
            className="px-4 py-2 rounded-xl bg-[#CCFF00] text-black text-xs font-bold hover:bg-lime-400 transition-colors"
          >
            Reset All Filters
          </button>
        </div>
      )}
    </div>
  );
};

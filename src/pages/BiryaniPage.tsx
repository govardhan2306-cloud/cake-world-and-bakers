import React, { useMemo, useState } from 'react';
import { FoodCard } from '../components/FoodCard';
import { getItemsByCategory } from '../data/menu';

type BiryaniFilter = 'all' | 'veg' | 'non-veg';

export const BiryaniPage: React.FC = () => {
  const [filter, setFilter] = useState<BiryaniFilter>('all');

  const vegBiryanis = useMemo(() => getItemsByCategory('veg-biryani'), []);
  const nonVegBiryanis = useMemo(() => getItemsByCategory('non-veg-biryani'), []);

  const displayed = useMemo(() => {
    if (filter === 'veg') return vegBiryanis;
    if (filter === 'non-veg') return nonVegBiryanis;
    return [...vegBiryanis, ...nonVegBiryanis];
  }, [filter, vegBiryanis, nonVegBiryanis]);

  const familyPacks = displayed.filter((item) => item.isFamilyPack);
  const regularItems = displayed.filter((item) => !item.isFamilyPack);

  return (
    <div className="max-w-5xl mx-auto px-4 pt-6 pb-28 md:pb-16">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#873D35]">
          Signature Collection
        </span>
        <h1 className="mt-2 text-3xl sm:text-4xl font-bold text-[#302C28]">
          Biryani
        </h1>
        <p className="mt-2 text-sm sm:text-base text-[#89847D]">
          Authentic slow-cooked biryanis from Cake World — Veg, Non-Veg, and Family Packs.
        </p>
      </div>

      {/* Filter */}
      <div className="mt-5 flex items-center justify-center gap-2">
        {(['all', 'veg', 'non-veg'] as const).map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium border transition ${
              filter === f
                ? 'bg-[#873D35] border-[#873D35] text-white'
                : 'bg-white border-[#E9E5DE] text-[#302C28] hover:border-[#873D35]/40'
            }`}
          >
            {f === 'all' ? 'All Biryanis' : f === 'veg' ? 'Veg' : 'Non-Veg'}
          </button>
        ))}
      </div>

      {/* Regular Items */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-3">
        {regularItems.map((item) => (
          <FoodCard key={item.id} item={item} variant="list" />
        ))}
      </div>

      {/* Family Packs */}
      {familyPacks.length > 0 && (
        <section className="mt-10">
          <h2 className="text-xl sm:text-2xl font-bold text-[#302C28] mb-4 border-b border-[#E9E5DE] pb-2">
            Family Packs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {familyPacks.map((item) => (
              <FoodCard key={item.id} item={item} variant="list" />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

import React, { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { CakeCard } from '../components/CakeCard';
import { FoodCard } from '../components/FoodCard';
import { PastryCard } from '../components/PastryCard';
import { CAKES_MENU, PASTRIES_MENU } from '../data/bakery';
import { getCategoryBySlug, getItemsByCategory, MENU_CATEGORIES } from '../data/menu';

type FilterType = 'all' | 'veg' | 'non-veg';

export const CategoryPage: React.FC = () => {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const [dietFilter, setDietFilter] = useState<FilterType>('all');

  const isCakesSlug = categorySlug === 'cakes';
  const isPastriesSlug = categorySlug === 'pastries';

  const category = getCategoryBySlug(categorySlug || '');

  const allCategoryItems = useMemo(
    () => (category ? getItemsByCategory(category.id) : []),
    [category]
  );

  const hasVeg = allCategoryItems.some((i) => i.isVeg);
  const hasNonVeg = allCategoryItems.some((i) => !i.isVeg);
  const showVegFilter = hasVeg && hasNonVeg;

  const displayedItems = useMemo(() => {
    if (!showVegFilter || dietFilter === 'all') return allCategoryItems;
    return allCategoryItems.filter((item) =>
      dietFilter === 'veg' ? item.isVeg : !item.isVeg
    );
  }, [allCategoryItems, dietFilter, showVegFilter]);

  if (isCakesSlug || isPastriesSlug) {
    return (
      <div className="max-w-5xl mx-auto px-4 pt-6 pb-28 md:pb-16">
        <div className="text-center max-w-xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#302C28]">
            {isCakesSlug ? 'Cakes' : 'Pastries'}
          </h1>
          <p className="mt-2 text-sm text-[#89847D]">
            {isCakesSlug
              ? 'Freshly baked celebration cakes available in 500g and 1kg sizes.'
              : 'Individual fresh cream and chocolate pastry slices.'}
          </p>
        </div>

        <div className="mt-6 -mx-4 px-4 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-2 pb-1 w-max mx-auto">
            <Link
              to="/menu/cakes"
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium border whitespace-nowrap transition ${
                isCakesSlug
                  ? 'bg-[#F1EEE8] border-[#873D35] text-[#873D35] font-semibold'
                  : 'bg-white border-[#E9E5DE] text-[#89847D] hover:text-[#302C28]'
              }`}
            >
              Cakes
            </Link>
            <Link
              to="/menu/pastries"
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium border whitespace-nowrap transition ${
                isPastriesSlug
                  ? 'bg-[#F1EEE8] border-[#873D35] text-[#873D35] font-semibold'
                  : 'bg-white border-[#E9E5DE] text-[#89847D] hover:text-[#302C28]'
              }`}
            >
              Pastries
            </Link>
            {MENU_CATEGORIES.map((cat) => (
              <Link
                key={cat.id}
                to={`/menu/${cat.slug}`}
                className="px-3.5 py-1.5 rounded-full text-xs font-medium border whitespace-nowrap transition bg-white border-[#E9E5DE] text-[#89847D] hover:text-[#302C28]"
              >
                {cat.shortName}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {isCakesSlug
            ? CAKES_MENU.map((cake) => <CakeCard key={cake.id} cake={cake} />)
            : PASTRIES_MENU.map((pastry) => <PastryCard key={pastry.id} pastry={pastry} />)}
        </div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-[#302C28]">Category Not Found</h1>
        <p className="text-sm text-[#89847D] mt-2">
          We couldn’t find that menu category. Explore all categories below.
        </p>
        <Link
          to="/menu"
          className="inline-block mt-6 px-6 py-3 rounded-full bg-[#873D35] text-white text-sm font-semibold"
        >
          Back to Full Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 pt-6 pb-28 md:pb-16">
      {/* Category Header */}
      <div className="text-center max-w-xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-[#302C28]">
          {category.name}
        </h1>
        <p className="mt-2 text-sm text-[#89847D]">{category.description}</p>

        {showVegFilter && (
          <div className="mt-4 flex items-center justify-center gap-2">
            {(['all', 'veg', 'non-veg'] as const).map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setDietFilter(filter)}
                className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium border transition ${
                  dietFilter === filter
                    ? 'bg-[#873D35] border-[#873D35] text-white'
                    : 'bg-white border-[#E9E5DE] text-[#302C28] hover:border-[#873D35]/40'
                }`}
              >
                {filter === 'all' ? 'All' : filter === 'veg' ? 'Veg' : 'Non-Veg'}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Quick horizontal category switcher */}
      <div className="mt-6 -mx-4 px-4 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-2 pb-1 w-max mx-auto">
          <Link
            to="/menu/cakes"
            className="px-3.5 py-1.5 rounded-full text-xs font-medium border whitespace-nowrap transition bg-white border-[#E9E5DE] text-[#89847D] hover:text-[#302C28]"
          >
            Cakes
          </Link>
          <Link
            to="/menu/pastries"
            className="px-3.5 py-1.5 rounded-full text-xs font-medium border whitespace-nowrap transition bg-white border-[#E9E5DE] text-[#89847D] hover:text-[#302C28]"
          >
            Pastries
          </Link>
          {MENU_CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              to={`/menu/${cat.slug}`}
              onClick={() => setDietFilter('all')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium border whitespace-nowrap transition ${
                cat.id === category.id
                  ? 'bg-[#F1EEE8] border-[#873D35] text-[#873D35] font-semibold'
                  : 'bg-white border-[#E9E5DE] text-[#89847D] hover:text-[#302C28]'
              }`}
            >
              {cat.shortName}
            </Link>
          ))}
        </div>
      </div>

      {/* Product List */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3">
        {displayedItems.map((item) => (
          <FoodCard key={item.id} item={item} variant="list" />
        ))}
      </div>
    </div>
  );
};

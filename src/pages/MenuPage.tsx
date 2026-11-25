import React, { useMemo, useState } from 'react';
import { Search, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FoodCard } from '../components/FoodCard';
import { MENU_CATEGORIES, MENU_ITEMS } from '../data/menu';

type DietFilter = 'all' | 'veg' | 'non-veg';

export const MenuPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [dietFilter, setDietFilter] = useState<DietFilter>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const normalizedQuery = searchQuery.trim().toLowerCase();

  const filteredItemsByCategory = useMemo(() => {
    const categoriesToShow =
      selectedCategory === 'all'
        ? MENU_CATEGORIES
        : MENU_CATEGORIES.filter((c) => c.id === selectedCategory);

    return categoriesToShow
      .map((cat) => {
        const items = MENU_ITEMS.filter((item) => {
          if (item.categoryId !== cat.id) return false;
          if (dietFilter === 'veg' && !item.isVeg) return false;
          if (dietFilter === 'non-veg' && item.isVeg) return false;
          if (normalizedQuery) {
            const hay = `${item.name} ${item.description ?? ''} ${cat.name}`.toLowerCase();
            return hay.includes(normalizedQuery);
          }
          return true;
        });
        return { category: cat, items };
      })
      .filter((group) => group.items.length > 0);
  }, [dietFilter, normalizedQuery, selectedCategory]);

  const totalMatchingItems = useMemo(
    () => filteredItemsByCategory.reduce((acc, g) => acc + g.items.length, 0),
    [filteredItemsByCategory]
  );

  return (
    <div className="max-w-6xl mx-auto px-4 pt-6 pb-28 md:pb-16">
      {/* Header & Search (Matching Screen 2 of Visual Reference) */}
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-[#302C28]">
          Our Menu
        </h1>
        <p className="mt-2 text-sm sm:text-base text-[#89847D]">
          Explore a wide range of delicious food from our bakery and restaurant.
        </p>

        {/* Search Input */}
        <div className="mt-5 relative">
          <Search className="w-4.5 h-4.5 text-[#89847D] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for dishes..."
            aria-label="Search for dishes"
            className="w-full pl-11 pr-10 py-3 rounded-full bg-white border border-[#E9E5DE] focus:border-[#873D35] focus:outline-none text-sm text-[#302C28] placeholder:text-[#89847D] transition"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full flex items-center justify-center text-[#89847D] hover:bg-[#F1EEE8]"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Diet Filter Pills */}
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
              {filter === 'all' ? 'All Dishes' : filter === 'veg' ? 'Veg Only' : 'Non-Veg'}
            </button>
          ))}
        </div>
      </div>

      {/* Category Photo Grid (Visible when not actively searching, matching Reference Menu Page) */}
      {!normalizedQuery && selectedCategory === 'all' && dietFilter === 'all' && (
        <section className="mt-8" aria-label="Menu Categories">
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 sm:gap-4">
            {MENU_CATEGORIES.map((cat) => (
              <Link
                key={cat.id}
                to={`/menu/${cat.slug}`}
                className="group bg-white border border-[#E9E5DE] hover:border-[#873D35]/40 rounded-2xl p-2 sm:p-2.5 flex flex-col items-center text-center transition"
              >
                <div className="w-full aspect-square rounded-xl overflow-hidden bg-[#F1EEE8] mb-2">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <span className="text-xs sm:text-sm font-semibold text-[#302C28] leading-tight">
                  {cat.shortName}
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Horizontal Category Jump Pills */}
      <div className="mt-8 -mx-4 px-4 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-2 pb-2 w-max">
          <button
            type="button"
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium border whitespace-nowrap transition ${
              selectedCategory === 'all'
                ? 'bg-[#873D35] border-[#873D35] text-white'
                : 'bg-white border-[#E9E5DE] text-[#302C28] hover:bg-[#F1EEE8]'
            }`}
          >
            All Categories ({MENU_CATEGORIES.length})
          </button>
          {MENU_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium border whitespace-nowrap transition ${
                selectedCategory === cat.id
                  ? 'bg-[#873D35] border-[#873D35] text-white'
                  : 'bg-white border-[#E9E5DE] text-[#302C28] hover:bg-[#F1EEE8]'
              }`}
            >
              {cat.shortName}
            </button>
          ))}
        </div>
      </div>

      {/* Filtered / Complete Categorized Dish List */}
      <div className="mt-6 space-y-10">
        {filteredItemsByCategory.length === 0 ? (
          <div className="bg-white border border-[#E9E5DE] rounded-3xl p-10 text-center">
            <p className="text-lg font-semibold text-[#302C28]">
              No dishes found matching “{searchQuery}”
            </p>
            <p className="text-sm text-[#89847D] mt-1">
              Try clearing your search or switching the Veg / Non-Veg filter.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setDietFilter('all');
                setSelectedCategory('all');
              }}
              className="mt-4 px-5 py-2.5 rounded-full bg-[#873D35] text-white text-sm font-semibold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <>
            <p className="text-xs text-[#89847D]">
              Showing {totalMatchingItems} dishes across {filteredItemsByCategory.length}{' '}
              {filteredItemsByCategory.length === 1 ? 'category' : 'categories'}
            </p>
            {filteredItemsByCategory.map(({ category, items }) => (
              <section key={category.id} id={category.slug}>
                <div className="flex items-baseline justify-between gap-4 border-b border-[#E9E5DE] pb-2.5 mb-4">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-[#302C28]">
                      {category.name}
                    </h2>
                    <p className="text-xs sm:text-sm text-[#89847D] mt-0.5">
                      {category.description}
                    </p>
                  </div>
                  <Link
                    to={`/menu/${category.slug}`}
                    className="text-xs font-semibold text-[#873D35] hover:underline shrink-0"
                  >
                    Open Page ({items.length})
                  </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {items.map((item) => (
                    <FoodCard key={item.id} item={item} variant="list" />
                  ))}
                </div>
              </section>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

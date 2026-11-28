import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CakeCard } from '../components/CakeCard';
import { FoodCard } from '../components/FoodCard';
import { StaggerGrid, StaggerItem } from '../components/MotionPrimitives';
import { PastryCard } from '../components/PastryCard';
import { CAKES_MENU, PASTRIES_MENU } from '../data/bakery';
import { MENU_CATEGORIES, MENU_ITEMS } from '../data/menu';

type DietFilter = 'all' | 'veg' | 'non-veg';

function scoreSearchMatch(
  query: string,
  name: string,
  description = '',
  categoryLabel = '',
  bestseller = false
): number {
  const n = name.toLowerCase();
  const d = description.toLowerCase();
  const c = categoryLabel.toLowerCase();
  let score = 0;

  if (n === query) score += 100;
  else if (n.startsWith(query)) score += 80;
  else if (n.split(/\s+/).some((word) => word.startsWith(query))) score += 60;
  else if (n.includes(query)) score += 40;

  if (c.includes(query)) score += 20;
  if (d.includes(query)) score += 10;
  if (bestseller) score += 5;

  return score;
}

const BAKERY_CATEGORY_CARDS = [
  {
    id: 'cakes',
    slug: 'cakes',
    name: 'Cakes',
    shortName: 'Cakes',
    image: '/images/hero-cake.jpg',
    to: '/menu/cakes',
  },
  {
    id: 'pastries',
    slug: 'pastries',
    name: 'Pastries',
    shortName: 'Pastries',
    image: '/images/pastry-red-velvet.jpg',
    to: '/menu/pastries',
  },
];

export const MenuPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [dietFilter, setDietFilter] = useState<DietFilter>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const normalizedQuery = searchQuery.trim().toLowerCase();

  const filteredItemsByCategory = useMemo(() => {
    if (selectedCategory === 'cakes' || selectedCategory === 'pastries') {
      return [];
    }

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

  const filteredCakes = useMemo(() => {
    if (selectedCategory !== 'all' && selectedCategory !== 'cakes') return [];
    if (dietFilter === 'non-veg') return [];
    if (!normalizedQuery) return CAKES_MENU;
    return CAKES_MENU.filter((cake) =>
      `${cake.name} ${cake.description} cake cakes`.toLowerCase().includes(normalizedQuery)
    );
  }, [dietFilter, normalizedQuery, selectedCategory]);

  const filteredPastries = useMemo(() => {
    if (selectedCategory !== 'all' && selectedCategory !== 'pastries') return [];
    if (dietFilter === 'non-veg') return [];
    if (!normalizedQuery) return PASTRIES_MENU;
    return PASTRIES_MENU.filter((pastry) =>
      `${pastry.name} ${pastry.description} pastry pastries`.toLowerCase().includes(normalizedQuery)
    );
  }, [dietFilter, normalizedQuery, selectedCategory]);

  const totalCategoriesCount = MENU_CATEGORIES.length + 2;

  const totalMatchingItems = useMemo(() => {
    const restaurantCount = filteredItemsByCategory.reduce((acc, g) => acc + g.items.length, 0);
    return restaurantCount + filteredCakes.length + filteredPastries.length;
  }, [filteredItemsByCategory, filteredCakes.length, filteredPastries.length]);

  const activeCategoryGroups =
    filteredItemsByCategory.length +
    (filteredCakes.length > 0 ? 1 : 0) +
    (filteredPastries.length > 0 ? 1 : 0);

  const rankedSearchResults = useMemo(() => {
    if (!normalizedQuery) return [];

    type SearchEntry =
      | { kind: 'food'; score: number; item: (typeof MENU_ITEMS)[number]; categoryName: string }
      | { kind: 'cake'; score: number; cake: (typeof CAKES_MENU)[number] }
      | { kind: 'pastry'; score: number; pastry: (typeof PASTRIES_MENU)[number] };

    const entries: SearchEntry[] = [];

    for (const { category, items } of filteredItemsByCategory) {
      for (const item of items) {
        entries.push({
          kind: 'food',
          score: scoreSearchMatch(normalizedQuery, item.name, item.description, category.name, item.bestseller),
          item,
          categoryName: category.shortName,
        });
      }
    }

    for (const cake of filteredCakes) {
      entries.push({
        kind: 'cake',
        score: scoreSearchMatch(normalizedQuery, cake.name, cake.description, 'cakes', cake.bestseller),
        cake,
      });
    }

    for (const pastry of filteredPastries) {
      entries.push({
        kind: 'pastry',
        score: scoreSearchMatch(normalizedQuery, pastry.name, pastry.description, 'pastries', false),
        pastry,
      });
    }

    return entries.sort((a, b) => b.score - a.score);
  }, [filteredItemsByCategory, filteredCakes, filteredPastries, normalizedQuery]);

  return (
    <div className="max-w-6xl mx-auto px-4 pt-6 pb-28 md:pb-16">
      {/* Header & Search */}
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-[#302C28]">
          Our Menu
        </h1>
        <p className="mt-2 text-sm sm:text-base text-[#89847D]">
          Explore our complete restaurant &amp; bakery menu — biryanis, tandoori, starters, pizzas, cakes &amp; pastries.
        </p>

        {/* Search Input */}
        <div className="mt-5 relative">
          <Search className="w-4.5 h-4.5 text-[#89847D] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for dishes, cakes, or pastries..."
            aria-label="Search for dishes"
            className="w-full pl-11 pr-10 py-3 rounded-full bg-white border border-[#E9E5DE] focus:border-[#873D35] focus:outline-none text-base sm:text-sm text-[#302C28] placeholder:text-[#89847D] transition"
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

      {/* Category Photo Grid */}
      {!normalizedQuery && selectedCategory === 'all' && dietFilter === 'all' && (
        <section className="mt-8" aria-label="Menu Categories">
          <StaggerGrid className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 sm:gap-4">
            {MENU_CATEGORIES.map((cat) => (
              <StaggerItem key={cat.id}>
                <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.95 }} className="h-full">
                  <Link
                    to={`/menu/${cat.slug}`}
                    className="group bg-white border border-[#E9E5DE] hover:border-[#873D35]/40 rounded-2xl p-2 sm:p-2.5 flex flex-col items-center text-center transition hover:shadow-sm h-full"
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
                </motion.div>
              </StaggerItem>
            ))}

            {BAKERY_CATEGORY_CARDS.map((bcat) => (
              <StaggerItem key={bcat.id}>
                <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.95 }} className="h-full">
                  <Link
                    to={bcat.to}
                    className="group bg-white border border-[#E9E5DE] hover:border-[#873D35]/40 rounded-2xl p-2 sm:p-2.5 flex flex-col items-center text-center transition hover:shadow-sm h-full"
                  >
                    <div className="w-full aspect-square rounded-xl overflow-hidden bg-[#F1EEE8] mb-2">
                      <img
                        src={bcat.image}
                        alt={bcat.name}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <span className="text-xs sm:text-sm font-semibold text-[#302C28] leading-tight">
                      {bcat.shortName}
                    </span>
                  </Link>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </section>
      )}

      {/* Horizontal Category Jump Pills (hidden while searching so results appear right at the top) */}
      {!normalizedQuery && (
        <div className="mt-8 w-full overflow-x-auto no-scrollbar">
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
              All Categories ({totalCategoriesCount})
            </button>
            <button
              type="button"
              onClick={() => setSelectedCategory('cakes')}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium border whitespace-nowrap transition ${
                selectedCategory === 'cakes'
                  ? 'bg-[#873D35] border-[#873D35] text-white'
                  : 'bg-white border-[#E9E5DE] text-[#302C28] hover:bg-[#F1EEE8]'
              }`}
            >
              Cakes
            </button>
            <button
              type="button"
              onClick={() => setSelectedCategory('pastries')}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium border whitespace-nowrap transition ${
                selectedCategory === 'pastries'
                  ? 'bg-[#873D35] border-[#873D35] text-white'
                  : 'bg-white border-[#E9E5DE] text-[#302C28] hover:bg-[#F1EEE8]'
              }`}
            >
              Pastries
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
      )}

      {/* Filtered / Instant Top Search Results or Categorized Dish List */}
      <div className="mt-6 space-y-10">
        {totalMatchingItems === 0 ? (
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
        ) : normalizedQuery ? (
          <section aria-label="Search Results" className="space-y-4">
            <div className="flex items-center justify-between gap-3 border-b border-[#E9E5DE] pb-2.5">
              <p className="text-xs sm:text-sm font-medium text-[#302C28]">
                Top matches for <span className="text-[#873D35] font-semibold">“{searchQuery.trim()}”</span>{' '}
                <span className="text-[#89847D] font-normal">({rankedSearchResults.length} found)</span>
              </p>
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="text-xs font-semibold text-[#873D35] hover:underline shrink-0"
              >
                Clear search
              </button>
            </div>

            {rankedSearchResults.some((r) => r.kind === 'food') && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {rankedSearchResults
                  .filter((r): r is Extract<typeof r, { kind: 'food' }> => r.kind === 'food')
                  .map(({ item }) => (
                    <FoodCard key={item.id} item={item} variant="list" />
                  ))}
              </div>
            )}

            {rankedSearchResults.some((r) => r.kind === 'cake' || r.kind === 'pastry') && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
                {rankedSearchResults
                  .filter((r) => r.kind === 'cake' || r.kind === 'pastry')
                  .map((entry) =>
                    entry.kind === 'cake' ? (
                      <CakeCard key={entry.cake.id} cake={entry.cake} />
                    ) : (
                      <PastryCard key={entry.pastry.id} pastry={entry.pastry} />
                    )
                  )}
              </div>
            )}
          </section>
        ) : (
          <>
            <p className="text-xs text-[#89847D]">
              Showing {totalMatchingItems} items across {activeCategoryGroups}{' '}
              {activeCategoryGroups === 1 ? 'category' : 'categories'}
            </p>

            {/* Restaurant Categories */}
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

            {/* Cakes Section in Menu */}
            {filteredCakes.length > 0 && (
              <section id="cakes">
                <div className="flex items-baseline justify-between gap-4 border-b border-[#E9E5DE] pb-2.5 mb-4">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-[#302C28]">
                      Cakes
                    </h2>
                    <p className="text-xs sm:text-sm text-[#89847D] mt-0.5">
                      Freshly baked celebration cakes available in 500g and 1kg sizes.
                    </p>
                  </div>
                  <Link
                    to="/cakes"
                    className="text-xs font-semibold text-[#873D35] hover:underline shrink-0"
                  >
                    Open Cakes Page ({filteredCakes.length})
                  </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredCakes.map((cake) => (
                    <CakeCard key={cake.id} cake={cake} />
                  ))}
                </div>
              </section>
            )}

            {/* Pastries Section in Menu */}
            {filteredPastries.length > 0 && (
              <section id="pastries">
                <div className="flex items-baseline justify-between gap-4 border-b border-[#E9E5DE] pb-2.5 mb-4">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-[#302C28]">
                      Pastries
                    </h2>
                    <p className="text-xs sm:text-sm text-[#89847D] mt-0.5">
                      Individual fresh cream and chocolate pastry slices.
                    </p>
                  </div>
                  <Link
                    to="/cakes"
                    className="text-xs font-semibold text-[#873D35] hover:underline shrink-0"
                  >
                    Open Bakery Page ({filteredPastries.length})
                  </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredPastries.map((pastry) => (
                    <PastryCard key={pastry.id} pastry={pastry} />
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </div>
    </div>
  );
};

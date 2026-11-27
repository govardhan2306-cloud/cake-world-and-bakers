import React, { useMemo, useState } from 'react';
import {
  ArrowRight,
  Award,
  CakeSlice,
  Clock,
  Flame,
  MapPin,
  Phone,
  Sparkles,
  Users,
  Utensils,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Card3D } from '../components/Card3D';
import { FoodCard } from '../components/FoodCard';
import { WhatsAppIcon } from '../components/WhatsAppIcon';
import { CAKE_SHOWCASE, MENU_CATEGORIES, MENU_ITEMS } from '../data/menu';
import { RESTAURANT_INFO } from '../data/restaurant';
import { getWhatsAppCakeInquiryUrl, getWhatsAppGeneralUrl } from '../utils/whatsapp';

const QUICK_CUISINE_PILLS = [
  { label: 'Biryani', to: '/biryani', image: '/images/cat-nonveg-biryani.jpg' },
  { label: 'Tandoori', to: '/menu/tandoori', image: '/images/cat-tandoori.jpg' },
  { label: 'Starters', to: '/menu/chicken-starters', image: '/images/cat-chicken-starters.jpg' },
  { label: 'Curries', to: '/menu/non-veg-curries', image: '/images/cat-nonveg-curries.jpg' },
  { label: 'Pizza', to: '/menu/pizza', image: '/images/cat-pizza.jpg' },
  { label: 'Burgers', to: '/menu/burgers', image: '/images/cat-burgers.jpg' },
];

const SIGNATURE_DISH_IDS = [
  'nvbiryani-chicken-dum',
  'vcurry-paneer-butter-masala',
  'tandoori-chicken-half',
  'chk-starter-65',
  'vbiryani-paneer',
  'nvcurry-butter-chicken',
  'pizza-cw-spl-chicken',
  'nvbiryani-mutton',
];

const POPULAR_RESTAURANT_CATEGORY_IDS = [
  'non-veg-biryani',
  'tandoori',
  'chicken-starters',
  'veg-starters',
  'veg-curries',
  'fried-rice',
  'noodles',
  'pizza',
  'burgers',
  'shakes',
];

const HIGHLIGHTS = [
  {
    icon: Utensils,
    title: 'Multi-Cuisine Kitchen',
    description:
      'Authentic Dum Biryanis, charcoal Tandoori, Indo-Chinese starters, curries, pizzas, and burgers.',
  },
  {
    icon: Flame,
    title: 'Authentic Biryanis & Grill',
    description:
      'Slow-cooked basmati biryanis, Andhra spice curries, and smoky tikkas prepared fresh to order.',
  },
  {
    icon: Users,
    title: 'Warm Family Dining',
    description:
      'Comfortable restaurant seating in Anakapalli made for family dinners and friendly gatherings.',
  },
  {
    icon: CakeSlice,
    title: 'In-House Bakery & Cakes',
    description:
      'Freshly baked celebration cakes and pastries available alongside your favourite restaurant meals.',
  },
];

type SignatureFilter = 'all' | 'veg' | 'non-veg';

export const HomePage: React.FC = () => {
  const [signatureFilter, setSignatureFilter] = useState<SignatureFilter>('all');

  const signatureDishes = useMemo(() => {
    const base = MENU_ITEMS.filter((item) => SIGNATURE_DISH_IDS.includes(item.id));
    if (signatureFilter === 'veg') return base.filter((i) => i.isVeg);
    if (signatureFilter === 'non-veg') return base.filter((i) => !i.isVeg);
    return base;
  }, [signatureFilter]);

  const popularCategories = useMemo(
    () =>
      POPULAR_RESTAURANT_CATEGORY_IDS.map((id) =>
        MENU_CATEGORIES.find((c) => c.id === id)
      ).filter((c): c is NonNullable<typeof c> => Boolean(c)),
    []
  );

  return (
    <div className="pb-24 md:pb-12 overflow-x-hidden">
      {/* 1. RESTAURANT-FIRST HERO SECTION */}
      <section className="max-w-6xl mx-auto px-4 pt-4 sm:pt-6 md:pt-8">
        {/* Mobile Editorial Dark Culinary Hero (Matches Mobile Preview Screen 1) */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="lg:hidden relative rounded-3xl overflow-hidden border border-[#E9E5DE] shadow-sm bg-[#1E1A17]"
        >
          <div className="relative aspect-[4/5] sm:aspect-[16/11] w-full">
            <img
              src="/images/cat-nonveg-biryani.jpg"
              alt="Hyderabadi Chicken Dum Biryani at Cake World Bakers & Restaurant"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#191512] via-[#191512]/55 to-[#191512]/20" />

            {/* Top Floating Restaurant Pill */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.14em] text-[#F8F7F4] bg-[#191512]/70 backdrop-blur-md border border-white/15 px-3 py-1.5 rounded-full">
                <Utensils className="w-3 h-3 text-[#d4af37]" />
                <span>Restaurant &amp; Bakery · Anakapalli</span>
              </span>
              <span className="inline-flex items-center gap-1.5 text-[10px] font-medium text-white bg-[#191512]/70 backdrop-blur-md px-2.5 py-1.5 rounded-full border border-white/15">
                <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse" />
                Open
              </span>
            </div>

            {/* Bottom Hero Overlay Content */}
            <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8 text-white">
              <h1 className="text-3xl sm:text-4xl font-bold leading-[1.12] tracking-tight text-white">
                {RESTAURANT_INFO.tagline}
              </h1>
              <p className="mt-2.5 text-xs sm:text-sm text-[#E9E5DE] leading-relaxed max-w-md">
                {RESTAURANT_INFO.heroSubheading}
              </p>

              <div className="mt-5 flex items-center gap-2.5">
                <Link
                  to="/menu"
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#873D35] hover:bg-[#72322B] text-white text-sm font-semibold transition shadow-md active:scale-98"
                >
                  <span>Explore Menu</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href={getWhatsAppGeneralUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Order on WhatsApp"
                  className="w-11 h-11 sm:w-auto sm:px-5 sm:h-11 rounded-full bg-[#25D366] hover:bg-[#1EBE5B] text-white flex items-center justify-center gap-2 text-sm font-semibold transition shadow-md active:scale-98 shrink-0"
                >
                  <WhatsAppIcon className="w-5 h-5" />
                  <span className="hidden sm:inline">WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Desktop Two-Column Editorial Restaurant Hero (Matches Desktop Preview) */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="hidden lg:grid lg:grid-cols-12 items-center bg-white border border-[#E9E5DE] rounded-3xl overflow-hidden shadow-xs"
        >
          {/* Left Copy Column */}
          <div className="lg:col-span-6 p-10 xl:p-12">
            <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#873D35] bg-[#F1EEE8] px-3.5 py-1.5 rounded-full mb-5">
              <Utensils className="w-3.5 h-3.5" />
              <span>Multi-Cuisine Restaurant &amp; Bakery · Anakapalli</span>
            </span>

            <h1 className="text-4xl xl:text-5xl font-bold text-[#302C28] leading-[1.12] tracking-tight">
              {RESTAURANT_INFO.tagline}
            </h1>

            <p className="mt-4 text-base text-[#89847D] max-w-lg leading-relaxed">
              {RESTAURANT_INFO.heroSubheading}
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link
                to="/menu"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#873D35] hover:bg-[#72322B] text-white text-sm font-semibold transition shadow-xs active:scale-98"
              >
                <span>Explore Menu</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={getWhatsAppGeneralUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-[#F8F7F4] border border-[#E9E5DE] hover:border-[#25D366] hover:bg-[#25D366]/5 text-[#302C28] text-sm font-semibold transition active:scale-98"
              >
                <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
                <span>Order on WhatsApp</span>
              </a>
            </div>

            <div className="mt-7 pt-5 border-t border-[#E9E5DE] flex items-center gap-4 text-xs text-[#89847D]">
              <span className="flex items-center gap-1.5 font-medium text-[#302C28]">
                <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
                {RESTAURANT_INFO.openingHours}
              </span>
              <span>•</span>
              <span>Dine-In · Takeaway · Delivery</span>
            </div>
          </div>

          {/* Right Restaurant Spread Column */}
          <div className="lg:col-span-6 p-6 pl-0">
            <div className="relative rounded-2xl overflow-hidden bg-[#F1EEE8] aspect-[4/3] shadow-sm group">
              <img
                src="/images/cat-nonveg-biryani.jpg"
                alt="Hyderabadi Chicken Dum Biryani, Tandoori & Naan Spread"
                className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
              />
              {/* Floating secondary dish preview chips for layered 3D restaurant depth */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3 pointer-events-none">
                <div className="bg-white/95 backdrop-blur-md border border-[#E9E5DE] rounded-2xl p-2 pr-3.5 flex items-center gap-2.5 shadow-md">
                  <img
                    src="/images/cat-tandoori.jpg"
                    alt="Tandoori"
                    className="w-11 h-11 rounded-xl object-cover"
                  />
                  <div>
                    <p className="text-xs font-semibold text-[#302C28]">Tandoori &amp; Grill</p>
                    <p className="text-[11px] text-[#89847D]">Charcoal smoky platters</p>
                  </div>
                </div>
                <div className="bg-white/95 backdrop-blur-md border border-[#E9E5DE] rounded-2xl p-2 pr-3.5 flex items-center gap-2.5 shadow-md">
                  <img
                    src="/images/cat-roti-naan.jpg"
                    alt="Curries & Naan"
                    className="w-11 h-11 rounded-xl object-cover"
                  />
                  <div>
                    <p className="text-xs font-semibold text-[#302C28]">Curries &amp; Naan</p>
                    <p className="text-[11px] text-[#89847D]">Rich Indian classics</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 2. QUICK CUISINE STRIP (Savoury Restaurant Focus First) */}
      <section className="max-w-6xl mx-auto px-4 mt-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-[#89847D] font-sans">
            Quick Cuisine
          </h2>
          <Link to="/menu" className="text-xs font-semibold text-[#873D35] hover:underline">
            All 20 Categories →
          </Link>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5 sm:gap-3.5">
          {QUICK_CUISINE_PILLS.map((pill) => (
            <Card3D key={pill.label} depth={7}>
              <Link
                to={pill.to}
                className="group bg-white border border-[#E9E5DE] hover:border-[#873D35]/40 rounded-2xl p-2 sm:p-2.5 flex flex-col items-center text-center transition h-full shadow-2xs hover:shadow-sm"
              >
                <div className="w-full aspect-square rounded-xl overflow-hidden bg-[#F1EEE8] mb-1.5">
                  <img
                    src={pill.image}
                    alt={pill.label}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <span className="text-xs sm:text-sm font-semibold text-[#302C28] truncate w-full">
                  {pill.label}
                </span>
              </Link>
            </Card3D>
          ))}
        </div>
      </section>

      {/* 3. SIGNATURE BIRYANIS, TANDOORI & RESTAURANT DISHES (With Live Diet Filter) */}
      <section className="max-w-6xl mx-auto px-4 mt-12 md:mt-14">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#302C28]">
              Chef’s Signature Restaurant Dishes
            </h2>
            <p className="text-sm text-[#89847D] mt-1">
              Biryanis, Tandoori &amp; Curries prepared fresh with authentic spices
            </p>
          </div>

          <div className="flex items-center gap-2">
            {(['all', 'veg', 'non-veg'] as const).map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setSignatureFilter(filter)}
                className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium border transition ${
                  signatureFilter === filter
                    ? 'bg-[#873D35] border-[#873D35] text-white'
                    : 'bg-white border-[#E9E5DE] text-[#302C28] hover:border-[#873D35]/40'
                }`}
              >
                {filter === 'all' ? 'All' : filter === 'veg' ? 'Veg' : 'Non-Veg'}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
          {signatureDishes.map((item) => (
            <Card3D key={item.id} depth={6}>
              <FoodCard item={item} variant="grid" />
            </Card3D>
          ))}
        </div>
      </section>

      {/* 4. RESTAURANT DINING EXPERIENCE & AMBIENCE */}
      <section className="max-w-6xl mx-auto px-4 mt-12 md:mt-16">
        <div className="bg-white border border-[#E9E5DE] rounded-3xl overflow-hidden grid grid-cols-1 md:grid-cols-12 items-center shadow-xs">
          <div className="md:col-span-7 relative aspect-[16/10] w-full overflow-hidden bg-[#F1EEE8]">
            <img
              src="/images/about-ambience.jpg"
              alt="Cake World Bakers & Restaurant Dining Hall in Anakapalli"
              loading="lazy"
              className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-500"
            />
            <span className="absolute bottom-4 left-4 bg-[#191512]/80 backdrop-blur-md text-white text-xs font-medium px-3.5 py-1.5 rounded-full border border-white/15">
              Dine-In · Takeaway · Delivery
            </span>
          </div>
          <div className="md:col-span-5 p-6 sm:p-8 lg:p-10 space-y-4">
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#873D35]">
              Restaurant Ambience
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#302C28]">
              A Warm Space for Family Dining
            </h2>
            <p className="text-sm text-[#89847D] leading-relaxed">
              Gather with family and friends at Pappulaveedhi, Gavarapalem for aromatic Hyderabadi Dum Biryanis, sizzling Tandoori platters, Indo-Chinese starters, and rich Indian curries.
            </p>
            <div className="pt-1 flex flex-wrap gap-3">
              <Link
                to="/biryani"
                className="px-5 py-2.5 rounded-full bg-[#873D35] hover:bg-[#72322B] text-white text-sm font-semibold transition"
              >
                Explore Biryani Menu
              </Link>
              <Link
                to="/location"
                className="px-5 py-2.5 rounded-full border border-[#E9E5DE] hover:border-[#873D35]/40 text-[#302C28] text-sm font-semibold transition"
              >
                View Location
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. POPULAR MENU CATEGORIES */}
      <section className="max-w-6xl mx-auto px-4 mt-12 md:mt-16">
        <div className="flex items-end justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#302C28]">
              Explore Our Menu
            </h2>
            <p className="text-sm text-[#89847D] mt-1">
              20 freshly prepared restaurant &amp; beverage categories
            </p>
          </div>
          <Link
            to="/menu"
            className="text-sm font-semibold text-[#873D35] hover:underline inline-flex items-center gap-1 shrink-0"
          >
            <span>Full Menu</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
          {popularCategories.map((cat) => (
            <Card3D key={cat.id} depth={6}>
              <Link
                to={`/menu/${cat.slug}`}
                className="group bg-white border border-[#E9E5DE] hover:border-[#873D35]/40 rounded-2xl p-2.5 transition flex flex-col h-full shadow-2xs hover:shadow-sm"
              >
                <div className="aspect-[4/3] w-full rounded-xl overflow-hidden bg-[#F1EEE8] mb-2.5">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="font-sans text-sm sm:text-[15px] font-semibold text-[#302C28] text-center">
                  {cat.name}
                </h3>
              </Link>
            </Card3D>
          ))}
        </div>
      </section>

      {/* 6. RESTAURANT HIGHLIGHTS */}
      <section className="max-w-6xl mx-auto px-4 mt-12 md:mt-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
          {HIGHLIGHTS.map((item) => {
            const Icon = item.icon;
            return (
              <Card3D key={item.title} depth={5}>
                <div className="bg-white border border-[#E9E5DE] rounded-2xl p-5 flex flex-col items-center text-center h-full shadow-2xs">
                  <div className="w-11 h-11 rounded-2xl bg-[#F1EEE8] text-[#873D35] flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-sans text-sm sm:text-base font-semibold text-[#302C28]">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#89847D] mt-1.5 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </Card3D>
            );
          })}
        </div>
      </section>

      {/* 7. BAKERY & CUSTOM CAKES CORNER (Secondary Specialty Section) */}
      <section className="max-w-6xl mx-auto px-4 mt-12 md:mt-16">
        <div className="bg-[#F1EEE8] border border-[#E9E5DE] rounded-3xl p-6 sm:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#873D35]">
                <Award className="w-3.5 h-3.5" />
                <span>In-House Bakery Corner</span>
              </span>
              <h2 className="mt-1.5 text-2xl sm:text-3xl font-bold text-[#302C28]">
                Bakery &amp; Custom Celebration Cakes
              </h2>
              <p className="text-sm text-[#89847D] mt-1">
                Planning a birthday or anniversary dinner? Pair your meal with a freshly baked cake.
              </p>
            </div>
            <Link
              to="/cakes"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#873D35] hover:bg-[#72322B] text-white text-sm font-semibold transition shrink-0 self-start md:self-auto"
            >
              <span>View Cakes &amp; 3D Preview</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
            {CAKE_SHOWCASE.map((cake) => (
              <div
                key={cake.id}
                className="bg-white border border-[#E9E5DE] rounded-2xl overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-[4/3] w-full overflow-hidden bg-[#F1EEE8]">
                    <img
                      src={cake.image}
                      alt={cake.name}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-3">
                    <span className="text-[10px] font-semibold uppercase tracking-wide text-[#873D35]">
                      {cake.category}
                    </span>
                    <h3 className="font-sans text-sm font-semibold text-[#302C28] mt-0.5 truncate">
                      {cake.name}
                    </h3>
                  </div>
                </div>
                <div className="px-3 pb-3">
                  <a
                    href={getWhatsAppCakeInquiryUrl(cake.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 px-3 rounded-full border border-[#E9E5DE] hover:border-[#25D366] text-[#302C28] text-xs font-semibold flex items-center justify-center gap-1.5 transition"
                  >
                    <WhatsAppIcon className="w-3.5 h-3.5 text-[#25D366]" />
                    <span>Enquire</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. LOCATION & CONTACT SECTION */}
      <section className="max-w-6xl mx-auto px-4 mt-12 md:mt-16">
        <div className="bg-white border border-[#E9E5DE] rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xs">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#873D35]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Visit Us</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#302C28]">
              Cake World Bakers &amp; Restaurant, Anakapalli
            </h2>
            <div className="space-y-2 text-sm text-[#89847D]">
              <p className="flex items-start gap-2.5">
                <MapPin className="w-4.5 h-4.5 text-[#873D35] shrink-0 mt-0.5" />
                <span>{RESTAURANT_INFO.fullAddress}</span>
              </p>
              <p className="flex items-center gap-2.5">
                <Clock className="w-4.5 h-4.5 text-[#873D35] shrink-0" />
                <span>{RESTAURANT_INFO.openingHours}</span>
              </p>
              <p className="flex items-center gap-2.5">
                <Phone className="w-4.5 h-4.5 text-[#873D35] shrink-0" />
                <span>{RESTAURANT_INFO.phoneDisplay}</span>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 w-full md:w-auto">
            <a
              href={RESTAURANT_INFO.googleMapsSearchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 md:flex-initial inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#873D35] hover:bg-[#72322B] text-white text-sm font-semibold transition"
            >
              <MapPin className="w-4 h-4" />
              <span>Get Directions</span>
            </a>
            <a
              href={getWhatsAppGeneralUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 md:flex-initial inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#25D366] hover:bg-[#1EBE5B] text-white text-sm font-semibold transition"
            >
              <WhatsAppIcon className="w-4 h-4" />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

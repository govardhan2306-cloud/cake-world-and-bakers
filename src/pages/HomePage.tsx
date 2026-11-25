import React from 'react';
import {
  ArrowRight,
  Award,
  CakeSlice,
  Clock,
  MapPin,
  Phone,
  Sparkles,
  Users,
  Utensils,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FoodCard } from '../components/FoodCard';
import { WhatsAppIcon } from '../components/WhatsAppIcon';
import { CAKE_SHOWCASE, MENU_CATEGORIES, MENU_ITEMS } from '../data/menu';
import { RESTAURANT_INFO } from '../data/restaurant';
import { getWhatsAppCakeInquiryUrl, getWhatsAppGeneralUrl } from '../utils/whatsapp';

const QUICK_PILLS = [
  { label: 'Cakes', to: '/cakes', image: '/images/cake-black-forest.jpg' },
  { label: 'Pizza', to: '/menu/pizza', image: '/images/cat-pizza.jpg' },
  { label: 'Biryani', to: '/biryani', image: '/images/cat-nonveg-biryani.jpg' },
  { label: 'Burgers', to: '/menu/burgers', image: '/images/cat-burgers.jpg' },
  { label: 'Starters', to: '/menu/chicken-starters', image: '/images/cat-chicken-starters.jpg' },
  { label: 'Shakes', to: '/menu/shakes', image: '/images/cat-shakes.jpg' },
];

const HIGHLIGHTS = [
  {
    icon: CakeSlice,
    title: 'Freshly Baked Cakes',
    description: 'Handcrafted celebration cakes and pastries prepared daily for your special moments.',
  },
  {
    icon: Utensils,
    title: 'Multi-Cuisine Restaurant',
    description: 'From pizzas and burgers to Indo-Chinese, tandoori, curries, and authentic biryanis.',
  },
  {
    icon: Award,
    title: 'Quality Ingredients',
    description: 'Thoughtfully sourced spices, dairy, and fresh produce in every dish we serve.',
  },
  {
    icon: Users,
    title: 'Family Friendly',
    description: 'Warm, comfortable dining space in Anakapalli made for families and friends.',
  },
];

export const HomePage: React.FC = () => {
  const popularCategories = MENU_CATEGORIES.filter((c) => c.popular);
  const bestsellers = MENU_ITEMS.filter((item) => item.bestseller).slice(0, 8);
  const specialRecommendations = MENU_ITEMS.filter((item) =>
    [
      'nvbiryani-chicken-dum',
      'pizza-cw-spl-chicken',
      'tandoori-chicken-half',
      'vcurry-paneer-butter-masala',
    ].includes(item.id)
  );

  return (
    <div className="pb-24 md:pb-12">
      {/* 1. HERO SECTION */}
      <section className="max-w-6xl mx-auto px-4 pt-5 md:pt-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white border border-[#E9E5DE] rounded-3xl overflow-hidden shadow-xs"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            {/* Editorial Copy */}
            <div className="lg:col-span-6 p-6 sm:p-10 lg:p-12 text-center lg:text-left">
              <span className="inline-block text-[11px] font-semibold uppercase tracking-[0.16em] text-[#873D35] bg-[#F1EEE8] px-3 py-1 rounded-full mb-4">
                Bakers &amp; Restaurant · Anakapalli
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#302C28] leading-[1.15] tracking-tight">
                {RESTAURANT_INFO.tagline}
              </h1>
              <p className="mt-4 text-sm sm:text-base text-[#89847D] max-w-lg mx-auto lg:mx-0 leading-relaxed">
                {RESTAURANT_INFO.heroSubheading}
              </p>

              <div className="mt-7 flex flex-wrap items-center justify-center lg:justify-start gap-3">
                <Link
                  to="/menu"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#873D35] hover:bg-[#72322B] text-white text-sm font-semibold transition active:scale-98"
                >
                  <span>Explore Menu</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href={getWhatsAppGeneralUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#F8F7F4] border border-[#E9E5DE] hover:border-[#25D366] text-[#302C28] text-sm font-semibold transition active:scale-98"
                >
                  <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
                  <span>Order on WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Hero Visual */}
            <div className="lg:col-span-6 relative">
              <div className="aspect-[16/11] lg:aspect-[4/3] w-full overflow-hidden bg-[#F1EEE8]">
                <img
                  src="/images/hero-cake.jpg"
                  alt="Artisanal Chocolate Drip Cake with Fresh Strawberries at Cake World Anakapalli"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* QUICK CATEGORY STRIP (Matching Reference Home Screen) */}
      <section className="max-w-6xl mx-auto px-4 mt-6">
        <div className="grid grid-cols-4 sm:grid-cols-6 gap-2.5 sm:gap-3.5">
          {QUICK_PILLS.map((pill, idx) => (
            <Link
              key={pill.label}
              to={pill.to}
              className={`group bg-white border border-[#E9E5DE] hover:border-[#873D35]/40 rounded-2xl p-2 sm:p-2.5 flex flex-col items-center text-center transition ${
                idx >= 4 ? 'hidden sm:flex' : 'flex'
              }`}
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
          ))}
        </div>
      </section>

      {/* 2. BRAND INTRODUCTION */}
      <section className="max-w-6xl mx-auto px-4 mt-12 md:mt-16">
        <div className="bg-[#F1EEE8] border border-[#E9E5DE] rounded-3xl p-6 sm:p-10 text-center max-w-4xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#873D35]">
            Welcome to Cake World
          </p>
          <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-[#302C28]">
            Anakapalli’s Destination for Fresh Bakes &amp; Multi-Cuisine Dining
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#89847D] max-w-2xl mx-auto leading-relaxed">
            Whether you are celebrating a milestone with a custom bakery cake or gathering over hot biryani, tandoori platters, and crisp pizzas, every dish at Cake World is crafted for taste, warmth, and memorable moments.
          </p>
          <div className="mt-5 flex justify-center">
            <Link
              to="/about"
              className="text-sm font-semibold text-[#873D35] hover:underline inline-flex items-center gap-1.5"
            >
              <span>Read Our Story</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 3. POPULAR FOOD CATEGORIES */}
      <section className="max-w-6xl mx-auto px-4 mt-12 md:mt-16">
        <div className="flex items-end justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#302C28]">
              Popular Categories
            </h2>
            <p className="text-sm text-[#89847D] mt-1">
              Explore our complete restaurant &amp; bakery menu
            </p>
          </div>
          <Link
            to="/menu"
            className="text-sm font-semibold text-[#873D35] hover:underline inline-flex items-center gap-1 shrink-0"
          >
            <span>View All 20</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
          {popularCategories.map((cat) => (
            <Link
              key={cat.id}
              to={`/menu/${cat.slug}`}
              className="group bg-white border border-[#E9E5DE] hover:border-[#873D35]/40 rounded-2xl p-2.5 transition flex flex-col"
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
          ))}
        </div>
      </section>

      {/* 4. BESTSELLING DISHES */}
      <section className="max-w-6xl mx-auto px-4 mt-12 md:mt-16">
        <div className="flex items-end justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#302C28]">
              Bestselling Dishes
            </h2>
            <p className="text-sm text-[#89847D] mt-1">
              Guest favourites with authentic menu pricing
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
          {bestsellers.map((item) => (
            <FoodCard key={item.id} item={item} variant="grid" />
          ))}
        </div>
      </section>

      {/* 5. FEATURED CAKES & BAKERY PRODUCTS */}
      <section className="max-w-6xl mx-auto px-4 mt-12 md:mt-16">
        <div className="flex items-end justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#302C28]">
              Cakes &amp; Bakery Showcase
            </h2>
            <p className="text-sm text-[#89847D] mt-1">
              Custom cakes for birthdays, anniversaries &amp; celebrations
            </p>
          </div>
          <Link
            to="/cakes"
            className="text-sm font-semibold text-[#873D35] hover:underline inline-flex items-center gap-1 shrink-0"
          >
            <span>Explore Cakes</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
          {CAKE_SHOWCASE.map((cake) => (
            <div
              key={cake.id}
              className="bg-white border border-[#E9E5DE] rounded-2xl overflow-hidden flex flex-col justify-between"
            >
              <div>
                <div className="aspect-square w-full overflow-hidden bg-[#F1EEE8]">
                  <img
                    src={cake.image}
                    alt={cake.name}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-3.5">
                  <span className="text-[11px] font-medium text-[#873D35] bg-[#F1EEE8] px-2 py-0.5 rounded-full">
                    {cake.category}
                  </span>
                  <h3 className="font-sans text-sm sm:text-base font-semibold text-[#302C28] mt-2">
                    {cake.name}
                  </h3>
                  <p className="text-xs text-[#89847D] mt-1 line-clamp-2">
                    {cake.description}
                  </p>
                </div>
              </div>
              <div className="px-3.5 pb-3.5">
                <a
                  href={getWhatsAppCakeInquiryUrl(cake.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 px-3 rounded-full border border-[#E9E5DE] hover:border-[#25D366] hover:bg-[#25D366]/5 text-[#302C28] text-xs font-semibold flex items-center justify-center gap-1.5 transition"
                >
                  <WhatsAppIcon className="w-3.5 h-3.5 text-[#25D366]" />
                  <span>Enquire Price</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. RESTAURANT HIGHLIGHTS */}
      <section className="max-w-6xl mx-auto px-4 mt-12 md:mt-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
          {HIGHLIGHTS.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="bg-white border border-[#E9E5DE] rounded-2xl p-5 flex flex-col items-center text-center"
              >
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
            );
          })}
        </div>
      </section>

      {/* 7. SPECIAL FOOD RECOMMENDATIONS */}
      <section className="max-w-6xl mx-auto px-4 mt-12 md:mt-16">
        <div className="flex items-center gap-2 mb-6">
          <Sparkles className="w-5 h-5 text-[#873D35]" />
          <h2 className="text-2xl sm:text-3xl font-bold text-[#302C28]">
            Chef’s Recommendations
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {specialRecommendations.map((item) => (
            <FoodCard key={item.id} item={item} variant="list" />
          ))}
        </div>
      </section>

      {/* 8. RESTAURANT ATMOSPHERE / GALLERY */}
      <section className="max-w-6xl mx-auto px-4 mt-12 md:mt-16">
        <div className="bg-white border border-[#E9E5DE] rounded-3xl overflow-hidden grid grid-cols-1 md:grid-cols-12 items-center">
          <div className="md:col-span-7 aspect-[16/10] w-full overflow-hidden bg-[#F1EEE8]">
            <img
              src="/images/about-ambience.jpg"
              alt="Cake World Bakers & Restaurant Dining Ambience"
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="md:col-span-5 p-6 sm:p-8 lg:p-10 space-y-4">
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#873D35]">
              Dine-In &amp; Takeaway
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#302C28]">
              A Warm Space for Every Gathering
            </h2>
            <p className="text-sm text-[#89847D] leading-relaxed">
              Visit us at Pappulaveedhi, Gavarapalem for relaxed family dinners, quick evening bites, or picking up fresh cakes for your celebrations.
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

      {/* 9. LOCATION & CONTACT SECTION */}
      <section className="max-w-6xl mx-auto px-4 mt-12 md:mt-16">
        <div className="bg-white border border-[#E9E5DE] rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#302C28]">
              Visit Cake World in Anakapalli
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

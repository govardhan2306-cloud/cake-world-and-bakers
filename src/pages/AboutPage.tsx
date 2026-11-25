import React from 'react';
import { Award, CakeSlice, Heart, Users, Utensils } from 'lucide-react';
import { Link } from 'react-router-dom';
import { RESTAURANT_INFO } from '../data/restaurant';

const VALUES = [
  {
    icon: CakeSlice,
    title: 'Freshly Baked Cakes',
    description: 'Every celebration cake is baked fresh to order using quality ingredients and traditional bakery methods.',
  },
  {
    icon: Utensils,
    title: 'Multi-Cuisine Restaurant',
    description: 'An extensive menu spanning pizzas, biryanis, Indo-Chinese, tandoori, North Indian curries, and much more.',
  },
  {
    icon: Award,
    title: 'Quality Ingredients',
    description: 'Carefully sourced spices, dairy, and fresh produce go into every dish to ensure authentic flavour.',
  },
  {
    icon: Users,
    title: 'Family Friendly',
    description: 'A welcoming space in Anakapalli designed for families, friends, and community celebrations.',
  },
];

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 pt-6 pb-28 md:pb-16">
      {/* Hero section */}
      <section className="text-center max-w-3xl mx-auto">
        <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#873D35]">
          Our Story
        </span>
        <h1 className="mt-2 text-3xl sm:text-4xl font-bold text-[#302C28]">
          About Cake World
        </h1>
        <p className="mt-3 text-sm sm:text-base text-[#89847D] leading-relaxed max-w-2xl mx-auto">
          Anakapalli's favourite destination for delicious food, fresh bakes, and memorable celebrations.
          From custom cakes to restaurant favourites, we bring taste, quality, and happiness together.
        </p>
      </section>

      {/* Brand Image */}
      <section className="mt-8 bg-white border border-[#E9E5DE] rounded-3xl overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center">
          <div className="aspect-[16/10] md:aspect-auto md:h-full w-full overflow-hidden bg-[#F1EEE8]">
            <img
              src="/images/about-ambience.jpg"
              alt="Cake World Bakers & Restaurant Ambience"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-6 sm:p-8 lg:p-10 space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#302C28]">
              More Than a Bakery, More Than a Restaurant
            </h2>
            <p className="text-sm text-[#89847D] leading-relaxed">
              {RESTAURANT_INFO.name} is a unique concept that brings together the best of two worlds — a premium
              bakery producing freshly baked celebration cakes, pastries, and desserts alongside a full-service
              multi-cuisine restaurant serving authentic biryanis, tandoori platters, Indo-Chinese starters,
              wood-fired-style pizzas, gourmet burgers, and comforting North Indian curries.
            </p>
            <p className="text-sm text-[#89847D] leading-relaxed">
              Located at Pappulaveedhi, Gavarapalem in Anakapalli, Andhra Pradesh, we have become a trusted
              name for families who want great food and beautiful cakes — all in one place.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <Heart className="w-4 h-4 text-[#873D35]" />
              <span className="text-sm font-semibold text-[#302C28]">
                Made with love in Anakapalli
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="mt-10">
        <h2 className="text-2xl font-bold text-[#302C28] text-center mb-6">
          What We Stand For
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
          {VALUES.map((item) => {
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

      {/* CTA */}
      <section className="mt-10 text-center">
        <div className="bg-[#F1EEE8] border border-[#E9E5DE] rounded-3xl p-6 sm:p-10 max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#302C28]">
            Come Experience Cake World
          </h2>
          <p className="mt-2 text-sm text-[#89847D]">
            Dine-in, takeaway, or order directly on WhatsApp for delivery.
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/menu"
              className="px-6 py-3 rounded-full bg-[#873D35] hover:bg-[#72322B] text-white text-sm font-semibold transition"
            >
              Explore Our Menu
            </Link>
            <Link
              to="/contact"
              className="px-6 py-3 rounded-full border border-[#E9E5DE] hover:border-[#873D35]/40 text-[#302C28] text-sm font-semibold transition"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

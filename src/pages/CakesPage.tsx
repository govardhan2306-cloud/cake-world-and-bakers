import React, { useState } from 'react';
import { CakeSlice, Sparkles } from 'lucide-react';
import { CakeCard } from '../components/CakeCard';
import { Card3D } from '../components/Card3D';
import { PastryCard } from '../components/PastryCard';
import { WhatsAppIcon } from '../components/WhatsAppIcon';
import { CAKES_MENU, PASTRIES_MENU } from '../data/bakery';
import { getWhatsAppCakeInquiryUrl } from '../utils/whatsapp';

type BakerySectionFilter = 'all' | 'cakes' | 'pastries';

export const CakesPage: React.FC = () => {
  const [sectionFilter, setSectionFilter] = useState<BakerySectionFilter>('all');

  const showCakes = sectionFilter === 'all' || sectionFilter === 'cakes';
  const showPastries = sectionFilter === 'all' || sectionFilter === 'pastries';

  return (
    <div className="max-w-6xl mx-auto px-4 pt-6 pb-28 md:pb-16">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-[#873D35]">
          <CakeSlice className="w-3.5 h-3.5" />
          <span>In-House Bakery Collection</span>
        </span>
        <h1 className="mt-2 text-3xl sm:text-4xl font-bold text-[#302C28]">
          Cakes &amp; Pastries
        </h1>
        <p className="mt-2 text-sm sm:text-base text-[#89847D]">
          Freshly baked celebration cakes in 500g and 1kg weights, plus individual pastry slices crafted daily in Anakapalli.
        </p>
      </div>

      {/* Editorial Cake Photography Banner (3D View Removed) */}
      <div className="mt-7 bg-white border border-[#E9E5DE] rounded-3xl overflow-hidden grid grid-cols-1 md:grid-cols-12 items-center shadow-xs">
        <div className="md:col-span-6 p-6 sm:p-8 lg:p-10 space-y-3.5">
          <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#873D35] bg-[#F1EEE8] px-3 py-1 rounded-full inline-block">
            Custom Bakery Showcase
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#302C28]">
            Celebration Cakes Made Fresh to Order
          </h2>
          <p className="text-sm text-[#89847D] leading-relaxed">
            Order our signature 500g and 1kg cakes directly below, or message us on WhatsApp for custom celebration designs and multi-tier party orders.
          </p>
          <div className="pt-1">
            <a
              href={getWhatsAppCakeInquiryUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#25D366] hover:bg-[#1EBE5B] text-white text-sm font-semibold transition"
            >
              <WhatsAppIcon className="w-4 h-4" />
              <span>Custom Cake Enquiry</span>
            </a>
          </div>
        </div>

        <div className="md:col-span-6 aspect-[16/10] md:aspect-[4/3] w-full overflow-hidden bg-[#F1EEE8]">
          <img
            src="/images/hero-cake.jpg"
            alt="Artisanal Chocolate Drip Celebration Cake with Strawberries at Cake World"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Section Filter Pills */}
      <div className="mt-8 flex items-center justify-center gap-2 flex-wrap">
        <button
          type="button"
          onClick={() => setSectionFilter('all')}
          className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium border transition ${
            sectionFilter === 'all'
              ? 'bg-[#873D35] border-[#873D35] text-white'
              : 'bg-white border-[#E9E5DE] text-[#302C28] hover:border-[#873D35]/40'
          }`}
        >
          All ({CAKES_MENU.length + PASTRIES_MENU.length})
        </button>
        <button
          type="button"
          onClick={() => setSectionFilter('cakes')}
          className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium border transition ${
            sectionFilter === 'cakes'
              ? 'bg-[#873D35] border-[#873D35] text-white'
              : 'bg-white border-[#E9E5DE] text-[#302C28] hover:border-[#873D35]/40'
          }`}
        >
          Celebration Cakes ({CAKES_MENU.length})
        </button>
        <button
          type="button"
          onClick={() => setSectionFilter('pastries')}
          className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium border transition ${
            sectionFilter === 'pastries'
              ? 'bg-[#873D35] border-[#873D35] text-white'
              : 'bg-white border-[#E9E5DE] text-[#302C28] hover:border-[#873D35]/40'
          }`}
        >
          Fresh Pastries ({PASTRIES_MENU.length})
        </button>
      </div>

      {/* SECTION 1: CAKES MENU */}
      {showCakes && (
        <section className="mt-10" aria-labelledby="cakes-heading">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-[#E9E5DE] pb-3 mb-6">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#873D35]">
                500g &amp; 1kg Options
              </span>
              <h2 id="cakes-heading" className="text-2xl sm:text-3xl font-bold text-[#302C28]">
                Cakes Menu
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#89847D]">
              Select your preferred weight to view live pricing and add to cart
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {CAKES_MENU.map((cake) => (
              <Card3D key={cake.id} depth={5}>
                <CakeCard cake={cake} />
              </Card3D>
            ))}
          </div>
        </section>
      )}

      {/* SECTION 2: PASTRIES MENU */}
      {showPastries && (
        <section className="mt-14" aria-labelledby="pastries-heading">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-[#E9E5DE] pb-3 mb-6">
            <div>
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#873D35]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Individual Slices</span>
              </span>
              <h2 id="pastries-heading" className="text-2xl sm:text-3xl font-bold text-[#302C28]">
                Pastries Menu
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#89847D]">
              Freshly chilled single-serve pastry slices
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {PASTRIES_MENU.map((pastry) => (
              <Card3D key={pastry.id} depth={5}>
                <PastryCard pastry={pastry} />
              </Card3D>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

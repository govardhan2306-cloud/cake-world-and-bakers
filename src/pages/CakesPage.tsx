import React, { useState } from 'react';
import { CAKE_SHOWCASE, CakeShowcaseItem } from '../data/menu';
import { getWhatsAppCakeInquiryUrl } from '../utils/whatsapp';
import { WhatsAppIcon } from '../components/WhatsAppIcon';

type CakeFilter = 'All' | 'Birthday' | 'Anniversary' | 'Custom' | 'Classic';

const CAKE_FILTERS: CakeFilter[] = ['All', 'Birthday', 'Anniversary', 'Custom', 'Classic'];

export const CakesPage: React.FC = () => {
  const [filter, setFilter] = useState<CakeFilter>('All');

  const displayedCakes: CakeShowcaseItem[] =
    filter === 'All'
      ? CAKE_SHOWCASE
      : CAKE_SHOWCASE.filter((c) => c.category === filter);

  return (
    <div className="max-w-5xl mx-auto px-4 pt-6 pb-28 md:pb-16">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#873D35]">
          Bakery Collection
        </span>
        <h1 className="mt-2 text-3xl sm:text-4xl font-bold text-[#302C28]">
          Cakes
        </h1>
        <p className="mt-2 text-sm sm:text-base text-[#89847D]">
          Handcrafted celebration cakes for birthdays, anniversaries, and every special occasion.
          Enquire for sizes, flavours, and pricing via WhatsApp.
        </p>
      </div>

      {/* Occasion Filter Pills */}
      <div className="mt-5 flex items-center justify-center gap-2 flex-wrap">
        {CAKE_FILTERS.map((f) => (
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
            {f}
          </button>
        ))}
      </div>

      {/* Cakes Grid */}
      <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
        {displayedCakes.map((cake) => (
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
                className="w-full py-2.5 px-3 rounded-full border border-[#E9E5DE] hover:border-[#25D366] hover:bg-[#25D366]/5 text-[#302C28] text-xs font-semibold flex items-center justify-center gap-1.5 transition"
              >
                <WhatsAppIcon className="w-3.5 h-3.5 text-[#25D366]" />
                <span>Enquire Price</span>
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* General Enquiry CTA */}
      <div className="mt-10 bg-[#F1EEE8] border border-[#E9E5DE] rounded-3xl p-6 sm:p-8 text-center max-w-2xl mx-auto">
        <h2 className="text-xl sm:text-2xl font-bold text-[#302C28]">
          Need a Custom Cake?
        </h2>
        <p className="mt-2 text-sm text-[#89847D]">
          Contact us on WhatsApp with your design, flavour preferences, and event date.
          We'll help you create the perfect celebration cake.
        </p>
        <a
          href={getWhatsAppCakeInquiryUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 mt-5 px-6 py-3 rounded-full bg-[#25D366] hover:bg-[#1EBE5B] text-white text-sm font-semibold transition"
        >
          <WhatsAppIcon className="w-4 h-4" />
          <span>Enquire on WhatsApp</span>
        </a>
      </div>
    </div>
  );
};

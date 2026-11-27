import React, { useState } from 'react';
import { Box, Image as ImageIcon } from 'lucide-react';
import { Hero3DCanvas } from '../components/Hero3DCanvas';
import { WhatsAppIcon } from '../components/WhatsAppIcon';
import { CAKE_SHOWCASE, CakeShowcaseItem } from '../data/menu';
import { getWhatsAppCakeInquiryUrl } from '../utils/whatsapp';

type CakeFilter = 'All' | 'Birthday' | 'Anniversary' | 'Custom' | 'Classic';

const CAKE_FILTERS: CakeFilter[] = ['All', 'Birthday', 'Anniversary', 'Custom', 'Classic'];

export const CakesPage: React.FC = () => {
  const [filter, setFilter] = useState<CakeFilter>('All');
  const [show3DShowcase, setShow3DShowcase] = useState(true);

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

      {/* Interactive 3D Celebration Cake Preview Banner (Moved from Home to Cakes) */}
      <div className="mt-7 bg-white border border-[#E9E5DE] rounded-3xl overflow-hidden grid grid-cols-1 md:grid-cols-12 items-center shadow-xs">
        <div className="md:col-span-6 p-6 sm:p-8 space-y-3">
          <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#873D35] bg-[#F1EEE8] px-3 py-1 rounded-full inline-block">
            Custom Bakery Showcase
          </span>
          <h2 className="text-2xl font-bold text-[#302C28]">
            Celebration Cakes Made Fresh to Order
          </h2>
          <p className="text-sm text-[#89847D] leading-relaxed">
            Explore our signature layered cakes in interactive 3D or reach out directly on WhatsApp for custom designs, weights, and flavours.
          </p>
          <div className="pt-1">
            <a
              href={getWhatsAppCakeInquiryUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#25D366] hover:bg-[#1EBE5B] text-white text-sm font-semibold transition"
            >
              <WhatsAppIcon className="w-4 h-4" />
              <span>Enquire on WhatsApp</span>
            </a>
          </div>
        </div>

        <div className="md:col-span-6 relative bg-gradient-to-b from-[#FDFCFB] to-[#F1EEE8] h-[300px] sm:h-[340px] flex items-center justify-center">
          <div className="absolute top-3 right-3 z-20 flex items-center bg-white/90 backdrop-blur-md border border-[#E9E5DE] rounded-full p-1 text-xs">
            <button
              type="button"
              onClick={() => setShow3DShowcase(true)}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-full font-medium transition ${
                show3DShowcase ? 'bg-[#873D35] text-white' : 'text-[#89847D]'
              }`}
            >
              <Box className="w-3.5 h-3.5" />
              <span>3D</span>
            </button>
            <button
              type="button"
              onClick={() => setShow3DShowcase(false)}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-full font-medium transition ${
                !show3DShowcase ? 'bg-[#873D35] text-white' : 'text-[#89847D]'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>Photo</span>
            </button>
          </div>

          {show3DShowcase ? (
            <>
              <Hero3DCanvas />
              <span className="absolute bottom-3 left-1/2 -translate-x-1/2 pointer-events-none text-[11px] text-[#89847D] bg-white/85 px-3 py-1 rounded-full border border-[#E9E5DE]">
                Drag or touch to rotate 3D cake
              </span>
            </>
          ) : (
            <img
              src="/images/hero-cake.jpg"
              alt="Cake World Celebration Cake"
              className="w-full h-full object-cover"
            />
          )}
        </div>
      </div>

      {/* Occasion Filter Pills */}
      <div className="mt-8 flex items-center justify-center gap-2 flex-wrap">
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
      <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
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
    </div>
  );
};

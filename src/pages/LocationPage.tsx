import React from 'react';
import { MapPin, Navigation, Phone } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurant';
import { WhatsAppIcon } from '../components/WhatsAppIcon';
import { getWhatsAppGeneralUrl } from '../utils/whatsapp';

export const LocationPage: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 pt-6 pb-28 md:pb-16">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#873D35]">
          Find Us
        </span>
        <h1 className="mt-2 text-3xl sm:text-4xl font-bold text-[#302C28]">
          Our Location
        </h1>
        <p className="mt-2 text-sm sm:text-base text-[#89847D]">
          Visit Cake World Bakers &amp; Restaurant in Anakapalli for dine-in or takeaway.
        </p>
      </div>

      {/* Map Card */}
      <div className="mt-8 bg-white border border-[#E9E5DE] rounded-3xl overflow-hidden">
        {/* Embedded Map */}
        <div className="aspect-[16/9] sm:aspect-[2/1] w-full bg-[#F1EEE8]">
          <iframe
            title="Cake World Bakers & Restaurant Location Map"
            src={RESTAURANT_INFO.googleMapsEmbedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full"
          />
        </div>

        {/* Address & Get Directions */}
        <div className="p-5 sm:p-6 space-y-4">
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-[#873D35] shrink-0 mt-0.5" />
            <div>
              <h2 className="text-base font-semibold text-[#302C28]">
                {RESTAURANT_INFO.name}
              </h2>
              <p className="text-sm text-[#89847D] mt-0.5">
                {RESTAURANT_INFO.addressLine1}, {RESTAURANT_INFO.addressLine2}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href={RESTAURANT_INFO.googleMapsSearchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#873D35] hover:bg-[#72322B] text-white text-sm font-semibold transition active:scale-98"
            >
              <Navigation className="w-4 h-4" />
              <span>Get Directions</span>
            </a>
            <a
              href={`tel:+${RESTAURANT_INFO.phoneRaw}`}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-[#E9E5DE] hover:border-[#873D35]/40 text-[#302C28] text-sm font-semibold transition"
            >
              <Phone className="w-4 h-4 text-[#873D35]" />
              <span>{RESTAURANT_INFO.phoneDisplay}</span>
            </a>
            <a
              href={getWhatsAppGeneralUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#25D366] hover:bg-[#1EBE5B] text-white text-sm font-semibold transition"
            >
              <WhatsAppIcon className="w-4 h-4" />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

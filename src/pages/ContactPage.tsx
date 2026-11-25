import React from 'react';
import { Clock, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { WhatsAppIcon } from '../components/WhatsAppIcon';
import { RESTAURANT_INFO } from '../data/restaurant';
import { getWhatsAppGeneralUrl } from '../utils/whatsapp';

export const ContactPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 pt-6 pb-28 md:pb-16">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#873D35]">
          Get in Touch
        </span>
        <h1 className="mt-2 text-3xl sm:text-4xl font-bold text-[#302C28]">
          Contact Us
        </h1>
        <p className="mt-2 text-sm sm:text-base text-[#89847D]">
          We'd love to hear from you! For orders, enquiries, or custom cake requests, reach us anytime.
        </p>
      </div>

      {/* Contact Cards */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Phone */}
        <a
          href={`tel:+${RESTAURANT_INFO.phoneRaw}`}
          className="bg-white border border-[#E9E5DE] hover:border-[#873D35]/40 rounded-2xl p-6 flex items-start gap-4 transition group"
        >
          <div className="w-11 h-11 rounded-2xl bg-[#F1EEE8] text-[#873D35] flex items-center justify-center shrink-0 group-hover:bg-[#873D35] group-hover:text-white transition">
            <Phone className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-[#302C28]">Call Us</h3>
            <p className="text-base font-bold text-[#302C28] mt-1">
              {RESTAURANT_INFO.phoneDisplay}
            </p>
            <p className="text-xs text-[#89847D] mt-1">Tap to call directly</p>
          </div>
        </a>

        {/* WhatsApp */}
        <a
          href={getWhatsAppGeneralUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white border border-[#E9E5DE] hover:border-[#25D366]/40 rounded-2xl p-6 flex items-start gap-4 transition group"
        >
          <div className="w-11 h-11 rounded-2xl bg-[#25D366]/10 text-[#25D366] flex items-center justify-center shrink-0 group-hover:bg-[#25D366] group-hover:text-white transition">
            <WhatsAppIcon className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-[#302C28]">WhatsApp</h3>
            <p className="text-base font-bold text-[#302C28] mt-1">
              {RESTAURANT_INFO.phoneDisplay}
            </p>
            <p className="text-xs text-[#89847D] mt-1">Order or enquire on WhatsApp</p>
          </div>
        </a>

        {/* Address */}
        <a
          href={RESTAURANT_INFO.googleMapsSearchUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white border border-[#E9E5DE] hover:border-[#873D35]/40 rounded-2xl p-6 flex items-start gap-4 transition group"
        >
          <div className="w-11 h-11 rounded-2xl bg-[#F1EEE8] text-[#873D35] flex items-center justify-center shrink-0 group-hover:bg-[#873D35] group-hover:text-white transition">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-[#302C28]">Visit Us</h3>
            <p className="text-sm font-medium text-[#302C28] mt-1">
              {RESTAURANT_INFO.addressLine1}
            </p>
            <p className="text-sm text-[#89847D]">
              {RESTAURANT_INFO.addressLine2}
            </p>
          </div>
        </a>

        {/* Opening Hours */}
        <div className="bg-white border border-[#E9E5DE] rounded-2xl p-6 flex items-start gap-4">
          <div className="w-11 h-11 rounded-2xl bg-[#F1EEE8] text-[#873D35] flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-[#302C28]">Opening Hours</h3>
            <p className="text-base font-bold text-[#302C28] mt-1">
              {RESTAURANT_INFO.openingHours}
            </p>
            <p className="text-xs text-[#89847D] mt-1">We are open every day for dine-in and delivery</p>
          </div>
        </div>
      </div>

      {/* Quick links */}
      <div className="mt-8 bg-[#F1EEE8] border border-[#E9E5DE] rounded-3xl p-6 sm:p-8 text-center max-w-2xl mx-auto">
        <h2 className="text-xl sm:text-2xl font-bold text-[#302C28]">
          Ready to Order?
        </h2>
        <p className="mt-2 text-sm text-[#89847D]">
          Browse our complete menu or order directly on WhatsApp.
        </p>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/menu"
            className="px-6 py-3 rounded-full bg-[#873D35] hover:bg-[#72322B] text-white text-sm font-semibold transition"
          >
            Explore Menu
          </Link>
          <Link
            to="/location"
            className="px-6 py-3 rounded-full border border-[#E9E5DE] hover:border-[#873D35]/40 text-[#302C28] text-sm font-semibold transition"
          >
            View on Map
          </Link>
        </div>
      </div>
    </div>
  );
};

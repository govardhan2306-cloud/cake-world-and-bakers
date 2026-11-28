import React from 'react';
import { Clock, Download, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { RESTAURANT_INFO } from '../data/restaurant';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { getWhatsAppGeneralUrl } from '../utils/whatsapp';
import { WhatsAppIcon } from './WhatsAppIcon';

export const Footer: React.FC = () => {
  const { canInstall, isInstalled, promptInstall } = usePWAInstall();

  return (
    <footer className="bg-[#F1EEE8] border-t border-[#E9E5DE] text-[#302C28] pt-12 pb-24 md:pb-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-[#E9E5DE]">
          {/* Brand Column */}
          <div className="md:col-span-2 space-y-4">
            <Link to="/" className="inline-block">
              <img
                src="/logo.png"
                alt="Cake World Bakers & Restaurant"
                className="h-20 w-auto rounded-xl object-contain"
              />
            </Link>
            <p className="text-sm text-[#89847D] max-w-md leading-relaxed">
              {RESTAURANT_INFO.name} in {RESTAURANT_INFO.city}. Serving freshly baked celebration cakes, wood-fired style pizzas, aromatic biryanis, tandoori specials, and multi-cuisine favourites.
            </p>
            <div className="flex flex-wrap gap-3 pt-1">
              <a
                href={getWhatsAppGeneralUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#25D366] hover:bg-[#1EBE5B] text-white text-sm font-medium transition"
              >
                <WhatsAppIcon className="w-4 h-4" />
                <span>Order on WhatsApp</span>
              </a>
              <a
                href={`tel:+${RESTAURANT_INFO.phoneRaw}`}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white border border-[#E9E5DE] hover:border-[#873D35]/40 text-[#302C28] text-sm font-medium transition"
              >
                <Phone className="w-4 h-4 text-[#873D35]" />
                <span>{RESTAURANT_INFO.phoneDisplay}</span>
              </a>
              {canInstall && !isInstalled && (
                <button
                  type="button"
                  onClick={promptInstall}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#873D35] hover:bg-[#72322B] text-white text-sm font-medium transition cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Install App</span>
                </button>
              )}
            </div>
          </div>

          {/* Explore Links */}
          <div>
            <h3 className="text-base font-semibold text-[#302C28] mb-3">
              Explore
            </h3>
            <ul className="space-y-2.5 text-sm text-[#89847D]">
              <li>
                <Link to="/menu" className="hover:text-[#873D35] transition-colors">
                  Complete Menu
                </Link>
              </li>
              <li>
                <Link to="/cakes" className="hover:text-[#873D35] transition-colors">
                  Cakes Collection
                </Link>
              </li>
              <li>
                <Link to="/biryani" className="hover:text-[#873D35] transition-colors">
                  Biryani Collection
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#873D35] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#873D35] transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/location" className="hover:text-[#873D35] transition-colors">
                  Location &amp; Directions
                </Link>
              </li>
              <li>
                <Link to="/policies" className="hover:text-[#873D35] transition-colors">
                  Restaurant Policies
                </Link>
              </li>
            </ul>
          </div>

          {/* Visit Us */}
          <div>
            <h3 className="text-base font-semibold text-[#302C28] mb-3">
              Visit Us
            </h3>
            <ul className="space-y-3 text-sm text-[#89847D]">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#873D35] shrink-0 mt-0.5" />
                <span>
                  {RESTAURANT_INFO.addressLine1},
                  <br />
                  {RESTAURANT_INFO.addressLine2}
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#873D35] shrink-0" />
                <span>{RESTAURANT_INFO.openingHours}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#873D35] shrink-0" />
                <a
                  href={`tel:+${RESTAURANT_INFO.phoneRaw}`}
                  className="hover:text-[#873D35] transition-colors"
                >
                  {RESTAURANT_INFO.phoneDisplay}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#89847D]">
          <p>
            © {new Date().getFullYear()} {RESTAURANT_INFO.name}, Anakapalli.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-3.5 gap-y-1.5 text-xs text-[#89847D]">
            <Link to="/policies#privacy" className="hover:text-[#873D35] transition-colors">
              Privacy Policy
            </Link>
            <span className="opacity-40">·</span>
            <Link to="/policies#terms" className="hover:text-[#873D35] transition-colors">
              Terms &amp; Conditions
            </Link>
            <span className="opacity-40">·</span>
            <Link to="/policies#refund" className="hover:text-[#873D35] transition-colors">
              Refund &amp; Cancellation
            </Link>
            <span className="opacity-40">·</span>
            <Link to="/policies#delivery" className="hover:text-[#873D35] transition-colors">
              Delivery Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

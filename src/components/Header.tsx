import React from 'react';
import { ArrowLeft, Menu, ShoppingBag } from 'lucide-react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { getWhatsAppGeneralUrl } from '../utils/whatsapp';
import { WhatsAppIcon } from './WhatsAppIcon';

interface HeaderProps {
  onOpenDrawer: () => void;
}

const DESKTOP_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/menu', label: 'Menu' },
  { to: '/cakes', label: 'Cakes' },
  { to: '/biryani', label: 'Biryani' },
  { to: '/about', label: 'About Us' },
  { to: '/contact', label: 'Contact' },
];

export const Header: React.FC<HeaderProps> = ({ onOpenDrawer }) => {
  const { totalItems } = useCart();
  const location = useLocation();
  const navigate = useNavigate();

  const isTopLevel =
    location.pathname === '/' ||
    location.pathname === '/menu';

  return (
    <header className="sticky top-0 z-40 bg-[#F8F7F4]/95 backdrop-blur-md border-b border-[#E9E5DE]">
      <div className="max-w-6xl mx-auto px-4 h-16 md:h-18 flex items-center justify-between gap-3">
        {/* Left: Mobile menu or Back button, and Desktop logo */}
        <div className="flex items-center gap-2 md:gap-4">
          {!isTopLevel ? (
            <button
              type="button"
              onClick={() => navigate(-1)}
              aria-label="Go back"
              className="md:hidden w-10 h-10 -ml-1 rounded-full flex items-center justify-center text-[#302C28] hover:bg-[#F1EEE8] active:scale-95 transition"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={onOpenDrawer}
              aria-label="Open navigation menu"
              className="md:hidden w-10 h-10 -ml-1 rounded-full flex items-center justify-center text-[#302C28] hover:bg-[#F1EEE8] active:scale-95 transition"
            >
              <Menu className="w-5 h-5" />
            </button>
          )}

          {/* Hamburger also accessible on subpages on mobile if needed, or desktop nav */}
          {!isTopLevel && (
            <button
              type="button"
              onClick={onOpenDrawer}
              aria-label="Open navigation menu"
              className="hidden sm:flex md:hidden w-9 h-9 rounded-full items-center justify-center text-[#302C28] hover:bg-[#F1EEE8] transition"
            >
              <Menu className="w-5 h-5" />
            </button>
          )}

          {/* Desktop Logo */}
          <Link
            to="/"
            className="hidden md:flex items-center gap-2.5 shrink-0"
            aria-label="Cake World Bakers & Restaurant Home"
          >
            <img
              src="/logo.png"
              alt="Cake World Bakers & Restaurant Logo"
              className="h-12 w-auto rounded-lg object-contain"
            />
          </Link>
        </div>

        {/* Mobile Center Logo */}
        <Link
          to="/"
          className="md:hidden flex items-center justify-center"
          aria-label="Cake World Bakers & Restaurant Home"
        >
          <img
            src="/logo.png"
            alt="Cake World Bakers & Restaurant Logo"
            className="h-12 w-auto rounded-lg object-contain"
          />
        </Link>

        {/* Desktop Nav Links */}
        <nav
          className="hidden md:flex items-center gap-1 lg:gap-2"
          aria-label="Primary Navigation"
        >
          {DESKTOP_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `px-3.5 py-2 rounded-full text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-[#F1EEE8] text-[#873D35]'
                    : 'text-[#302C28] hover:bg-[#F1EEE8]/70 hover:text-[#873D35]'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Right: WhatsApp & Cart */}
        <div className="flex items-center gap-2">
          <a
            href={getWhatsAppGeneralUrl()}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat or Order on WhatsApp"
            title="Order on WhatsApp"
            className="w-9 h-9 md:w-auto md:h-10 md:px-3.5 rounded-full bg-[#25D366] hover:bg-[#1EBE5B] text-white flex items-center justify-center gap-1.5 text-sm font-medium shadow-xs transition active:scale-95"
          >
            <WhatsAppIcon className="w-4 h-4 md:w-4 md:h-4" />
            <span className="hidden lg:inline">WhatsApp</span>
          </a>

          <Link
            to="/cart"
            aria-label={`View shopping cart (${totalItems} items)`}
            className="relative w-10 h-10 md:w-auto md:px-3.5 rounded-full bg-white border border-[#E9E5DE] hover:border-[#873D35]/40 text-[#302C28] flex items-center justify-center gap-2 transition active:scale-95"
          >
            <ShoppingBag className="w-4.5 h-4.5" />
            <span className="hidden md:inline text-sm font-medium">Cart</span>
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 md:static md:ml-0.5 min-w-[20px] h-5 px-1.5 rounded-full bg-[#873D35] text-white text-[11px] font-semibold flex items-center justify-center tabular-nums">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
};

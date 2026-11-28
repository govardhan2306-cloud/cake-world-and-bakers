import React, { useEffect } from 'react';
import {
  CakeSlice,
  Download,
  Flame,
  Home,
  Info,
  MapPin,
  Phone,
  ShieldCheck,
  ShoppingBag,
  UtensilsCrossed,
  X,
} from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { getWhatsAppGeneralUrl } from '../utils/whatsapp';
import { WhatsAppIcon } from './WhatsAppIcon';

interface MobileDrawerProps {
  open: boolean;
  onClose: () => void;
}

const DRAWER_LINKS = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/menu', label: 'Menu', icon: UtensilsCrossed },
  { to: '/biryani', label: 'Biryani', icon: Flame },
  { to: '/cakes', label: 'Cakes', icon: CakeSlice },
  { to: '/cart', label: 'Your Cart', icon: ShoppingBag },
  { to: '/about', label: 'About Us', icon: Info },
  { to: '/contact', label: 'Contact Us', icon: Phone },
  { to: '/location', label: 'Location & Map', icon: MapPin },
  { to: '/policies', label: 'Restaurant Policies', icon: ShieldCheck },
];

export const MobileDrawer: React.FC<MobileDrawerProps> = ({ open, onClose }) => {
  const { canInstall, isInstalled, promptInstall } = usePWAInstall();

  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#302C28]/40 backdrop-blur-[2px]"
          />

          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="fixed top-0 left-0 bottom-0 w-[290px] max-w-[85vw] bg-[#F8F7F4] border-r border-[#E9E5DE] flex flex-col justify-between p-5 shadow-xl"
            aria-label="Mobile Navigation Drawer"
          >
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#E9E5DE]">
                <img
                  src="/logo.png"
                  alt="Cake World Bakers & Restaurant"
                  className="h-14 w-auto rounded-lg object-contain"
                />
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close navigation menu"
                  className="w-9 h-9 rounded-full flex items-center justify-center text-[#302C28] hover:bg-[#F1EEE8] transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="mt-4 space-y-1">
                {DRAWER_LINKS.map((item) => {
                  const Icon = item.icon;
                  return (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      end={item.to === '/'}
                      onClick={onClose}
                      className={({ isActive }) =>
                        `flex items-center gap-3.5 px-3.5 py-3 rounded-xl text-[15px] font-medium transition-colors ${
                          isActive
                            ? 'bg-[#F1EEE8] text-[#873D35] font-semibold'
                            : 'text-[#302C28] hover:bg-[#F1EEE8]/60'
                        }`
                      }
                    >
                      <Icon className="w-4.5 h-4.5 shrink-0" />
                      <span>{item.label}</span>
                    </NavLink>
                  );
                })}
              </nav>
            </div>

            <div className="pt-4 border-t border-[#E9E5DE] space-y-2.5">
              {canInstall && !isInstalled && (
                <button
                  type="button"
                  onClick={async () => {
                    await promptInstall();
                    onClose();
                  }}
                  className="w-full py-3 px-4 rounded-full bg-white border border-[#873D35]/40 hover:bg-[#F1EEE8] text-[#873D35] font-semibold text-sm flex items-center justify-center gap-2 transition active:scale-98"
                >
                  <Download className="w-4 h-4" />
                  <span>Install App</span>
                </button>
              )}
              <a
                href={getWhatsAppGeneralUrl()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClose}
                className="w-full py-3.5 px-4 rounded-full bg-[#25D366] hover:bg-[#1EBE5B] text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-sm transition active:scale-98"
              >
                <WhatsAppIcon className="w-4.5 h-4.5" />
                <span>Order on WhatsApp</span>
              </a>
              <p className="text-[11px] text-[#89847D] text-center mt-2.5">
                Pappulaveedhi, Gavarapalem, Anakapalli
              </p>
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
};

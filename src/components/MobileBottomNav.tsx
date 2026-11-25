import React from 'react';
import { Home, Phone, ShoppingBag, UtensilsCrossed } from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export const MobileBottomNav: React.FC = () => {
  const { totalItems } = useCart();
  const location = useLocation();

  // Hide on checkout and item detail so primary CTAs are unobstructed
  if (
    location.pathname === '/checkout' ||
    location.pathname.startsWith('/item/')
  ) {
    return null;
  }

  const navItems = [
    { to: '/', label: 'Home', icon: Home, end: true },
    { to: '/menu', label: 'Menu', icon: UtensilsCrossed, end: false },
    { to: '/cart', label: 'Cart', icon: ShoppingBag, badge: totalItems, end: true },
    { to: '/contact', label: 'Contact', icon: Phone, end: true },
  ];

  return (
    <nav
      aria-label="Mobile Bottom Navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-[#E9E5DE] px-2 pt-1.5 pb-[max(0.5rem,env(safe-area-inset-bottom))]"
    >
      <div className="grid grid-cols-4 max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `relative flex flex-col items-center justify-center py-1.5 rounded-xl text-[11px] font-medium transition-colors ${
                  isActive ? 'text-[#873D35]' : 'text-[#89847D] hover:text-[#302C28]'
                }`
              }
            >
              <div className="relative">
                <Icon className="w-5 h-5" />
                {typeof item.badge === 'number' && item.badge > 0 && (
                  <span className="absolute -top-1.5 -right-2.5 min-w-[17px] h-[17px] px-1 rounded-full bg-[#873D35] text-white text-[10px] font-bold flex items-center justify-center tabular-nums">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="mt-0.5">{item.label}</span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};

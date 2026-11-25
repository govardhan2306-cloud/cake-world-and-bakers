import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useCart } from '../context/CartContext';

export const CartToast: React.FC = () => {
  const { lastAddedItem, totalItems } = useCart();

  return (
    <AnimatePresence>
      {lastAddedItem && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-20 md:bottom-6 left-4 right-4 md:left-auto md:right-6 md:w-auto z-40 pointer-events-none flex justify-center md:justify-end"
        >
          <div className="pointer-events-auto bg-[#302C28] text-white px-4 py-3 rounded-2xl shadow-lg flex items-center justify-between gap-4 max-w-md w-full md:w-auto border border-white/10">
            <div className="flex items-center gap-2.5 min-w-0">
              <CheckCircle2 className="w-4.5 h-4.5 text-[#25D366] shrink-0" />
              <p className="text-xs sm:text-sm font-medium truncate">
                Added <span className="font-semibold">{lastAddedItem}</span>
              </p>
            </div>
            <Link
              to="/cart"
              className="shrink-0 text-xs font-semibold px-3 py-1.5 rounded-full bg-[#873D35] hover:bg-[#9c4940] text-white transition"
            >
              View Cart ({totalItems})
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

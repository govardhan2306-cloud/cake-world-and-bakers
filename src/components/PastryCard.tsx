import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { PastryProduct } from '../data/bakery';
import { MenuItem } from '../data/menu';
import { QuantityControl } from './QuantityControl';
import { VegBadge } from './VegBadge';

interface PastryCardProps {
  pastry: PastryProduct;
}

export const PastryCard: React.FC<PastryCardProps> = ({ pastry }) => {
  const { addItem, getItemQuantity, incrementItem, decrementItem } = useCart();
  const qtyInCart = getItemQuantity(pastry.id);

  const handleAdd = () => {
    const payload: MenuItem = {
      id: pastry.id,
      name: `${pastry.name} Pastry`,
      categoryId: 'pastries',
      price: pastry.price,
      isVeg: true,
      description: pastry.description,
      image: pastry.image,
    };
    addItem(payload, 1);
  };

  return (
    <article className="group bg-white border border-[#E9E5DE] hover:border-[#873D35]/35 rounded-2xl overflow-hidden flex flex-col justify-between h-full shadow-2xs hover:shadow-md transition-all duration-200">
      <div>
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#F1EEE8]">
          <img
            src={pastry.image}
            alt={`${pastry.name} Pastry`}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <span className="absolute top-2.5 left-2.5 bg-white/95 backdrop-blur-xs px-2 py-1 rounded-full border border-[#E9E5DE] flex items-center gap-1 shadow-2xs">
            <VegBadge isVeg={true} />
            <span className="text-[10px] font-semibold text-[#302C28]">Fresh Pastry</span>
          </span>
        </div>

        <div className="p-4 pb-3">
          <h3 className="font-serif-display text-base sm:text-lg font-bold text-[#302C28] leading-snug">
            {pastry.name}
          </h3>
          <p className="text-xs text-[#89847D] mt-1 line-clamp-2 leading-relaxed">
            {pastry.description}
          </p>
        </div>
      </div>

      <div className="px-4 pb-4 pt-2 border-t border-[#E9E5DE]/60 flex items-center justify-between gap-2">
        <div>
          <span className="text-[11px] text-[#89847D] block leading-none mb-0.5">
            Per Slice
          </span>
          <span className="text-lg font-bold text-[#302C28] tabular-nums">
            ₹{pastry.price}
          </span>
        </div>

        {qtyInCart === 0 ? (
          <button
            type="button"
            onClick={handleAdd}
            aria-label={`Add ${pastry.name} Pastry to cart`}
            className="px-4 py-2 rounded-full bg-[#873D35] hover:bg-[#72322B] text-white text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition active:scale-95 shadow-xs"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Add to Cart</span>
          </button>
        ) : (
          <QuantityControl
            quantity={qtyInCart}
            onIncrement={() => incrementItem(pastry.id)}
            onDecrement={() => decrementItem(pastry.id)}
          />
        )}
      </div>
    </article>
  );
};

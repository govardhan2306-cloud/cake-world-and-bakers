import React, { useState } from 'react';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { CakeProduct } from '../data/bakery';
import { MenuItem } from '../data/menu';
import { QuantityControl } from './QuantityControl';
import { VegBadge } from './VegBadge';

interface CakeCardProps {
  cake: CakeProduct;
}

type CakeSize = '500g' | '1kg';

export const CakeCard: React.FC<CakeCardProps> = ({ cake }) => {
  const [selectedSize, setSelectedSize] = useState<CakeSize>('500g');
  const { addItem, getItemQuantity, incrementItem, decrementItem } = useCart();

  const activePrice = selectedSize === '1kg' ? cake.price1kg : cake.price500g;

  const cartItemId = `${cake.id}-${selectedSize}`;
  const qtyInCart = getItemQuantity(cartItemId);

  const handleAddToCart = () => {
    const cartPayload: MenuItem = {
      id: cartItemId,
      name: `${cake.name} Cake (${selectedSize})`,
      categoryId: 'cakes',
      price: activePrice,
      isVeg: true,
      description: cake.description,
      image: cake.image,
    };
    addItem(cartPayload, 1);
  };

  return (
    <article className="group bg-white border border-[#E9E5DE] hover:border-[#873D35]/35 rounded-2xl overflow-hidden flex flex-col justify-between h-full shadow-2xs hover:shadow-md transition-all duration-200">
      <div>
        {/* Cake Image */}
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#F1EEE8]">
          <img
            src={cake.image}
            alt={`${cake.name} Cake`}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = '/images/hero-cake.jpg';
            }}
          />
          <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
            <span className="bg-white/95 backdrop-blur-xs px-2 py-1 rounded-full border border-[#E9E5DE] flex items-center gap-1 shadow-2xs">
              <VegBadge isVeg={true} />
              <span className="text-[10px] font-semibold text-[#302C28]">Eggless / Fresh</span>
            </span>
          </div>
          {cake.bestseller && (
            <span className="absolute top-2.5 right-2.5 text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#873D35] text-white shadow-xs">
              Popular
            </span>
          )}
        </div>

        {/* Details & Size Selector */}
        <div className="p-4 pb-3">
          <h3 className="font-serif-display text-lg font-bold text-[#302C28] leading-snug">
            {cake.name}
          </h3>
          <p className="text-xs text-[#89847D] mt-1 line-clamp-2 leading-relaxed">
            {cake.description}
          </p>

          {/* 500g / 1kg Size Selector */}
          <div className="mt-3.5">
            <span className="block text-[11px] font-medium text-[#89847D] mb-1.5">
              Select Weight
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setSelectedSize('500g')}
                className={`py-1.5 px-2.5 rounded-xl border text-xs font-semibold transition flex items-center justify-center gap-1 ${
                  selectedSize === '500g'
                    ? 'bg-[#F1EEE8] border-[#873D35] text-[#873D35]'
                    : 'bg-white border-[#E9E5DE] text-[#302C28] hover:border-[#873D35]/40'
                }`}
              >
                <span>500g</span>
                <span className="text-[11px] font-normal opacity-80">₹{cake.price500g}</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedSize('1kg')}
                className={`py-1.5 px-2.5 rounded-xl border text-xs font-semibold transition flex items-center justify-center gap-1 ${
                  selectedSize === '1kg'
                    ? 'bg-[#F1EEE8] border-[#873D35] text-[#873D35]'
                    : 'bg-white border-[#E9E5DE] text-[#302C28] hover:border-[#873D35]/40'
                }`}
              >
                <span>1kg</span>
                <span className="text-[11px] font-normal opacity-80">₹{cake.price1kg}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Price & Add to Cart Footer */}
      <div className="px-4 pb-4 pt-2 border-t border-[#E9E5DE]/60 flex items-center justify-between gap-2">
        <div>
          <span className="text-[11px] text-[#89847D] block leading-none mb-0.5">
            {selectedSize} Price
          </span>
          <span className="text-lg font-bold text-[#302C28] tabular-nums">
            ₹{activePrice}
          </span>
        </div>

        {qtyInCart === 0 ? (
          <button
            type="button"
            onClick={handleAddToCart}
            aria-label={`Add ${cake.name} (${selectedSize}) to cart`}
            className="px-4 py-2 rounded-full bg-[#873D35] hover:bg-[#72322B] text-white text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition active:scale-95 shadow-xs"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Add to Cart</span>
          </button>
        ) : (
          <QuantityControl
            quantity={qtyInCart}
            onIncrement={() => incrementItem(cartItemId)}
            onDecrement={() => decrementItem(cartItemId)}
          />
        )}
      </div>
    </article>
  );
};

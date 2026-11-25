import React from 'react';
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { MenuItem } from '../data/menu';
import { QuantityControl } from './QuantityControl';
import { VegBadge } from './VegBadge';

interface FoodCardProps {
  item: MenuItem;
  variant?: 'list' | 'grid';
}

export const FoodCard: React.FC<FoodCardProps> = ({ item, variant = 'list' }) => {
  const { addItem, getItemQuantity, incrementItem, decrementItem } = useCart();
  const qty = getItemQuantity(item.id);

  if (variant === 'grid') {
    return (
      <article className="group bg-white border border-[#E9E5DE] rounded-2xl overflow-hidden flex flex-col justify-between transition hover:border-[#873D35]/30">
        <Link to={`/item/${item.id}`} className="block">
          <div className="aspect-[4/3] w-full overflow-hidden bg-[#F1EEE8]">
            <img
              src={item.image}
              alt={item.name}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
            />
          </div>
          <div className="p-3.5 pb-2">
            <div className="flex items-center gap-1.5 mb-1">
              <VegBadge isVeg={item.isVeg} />
              {item.isFamilyPack && (
                <span className="text-[10px] font-semibold uppercase tracking-wide px-1.5 py-0.5 rounded bg-[#F1EEE8] text-[#873D35]">
                  Family Pack
                </span>
              )}
            </div>
            <h3 className="font-sans text-[15px] font-semibold text-[#302C28] leading-snug line-clamp-1">
              {item.name}
            </h3>
            {item.description && (
              <p className="text-xs text-[#89847D] mt-0.5 line-clamp-1">
                {item.description}
              </p>
            )}
          </div>
        </Link>

        <div className="px-3.5 pb-3.5 pt-1 flex items-center justify-between gap-2">
          <span className="text-base font-bold text-[#302C28] tabular-nums">
            ₹{item.price}
          </span>
          {qty === 0 ? (
            <button
              type="button"
              onClick={() => addItem(item, 1)}
              aria-label={`Add ${item.name} to cart`}
              className="w-8 h-8 rounded-full bg-[#873D35] hover:bg-[#72322B] text-white flex items-center justify-center transition active:scale-95"
            >
              <Plus className="w-4 h-4" />
            </button>
          ) : (
            <QuantityControl
              quantity={qty}
              onIncrement={() => incrementItem(item.id)}
              onDecrement={() => decrementItem(item.id)}
            />
          )}
        </div>
      </article>
    );
  }

  // List variant — matches the Category & Biryani screens in the visual reference
  return (
    <article className="bg-white border border-[#E9E5DE] rounded-2xl p-3 flex items-center justify-between gap-3 transition hover:border-[#873D35]/30">
      <Link
        to={`/item/${item.id}`}
        className="flex items-center gap-3.5 min-w-0 flex-1"
      >
        <div className="w-20 h-20 sm:w-22 sm:h-22 rounded-xl overflow-hidden bg-[#F1EEE8] shrink-0">
          <img
            src={item.image}
            alt={item.name}
            loading="lazy"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5 mb-0.5">
            <VegBadge isVeg={item.isVeg} />
            {item.bestseller && (
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[#873D35]">
                Popular
              </span>
            )}
            {item.isFamilyPack && (
              <span className="text-[10px] font-semibold uppercase tracking-wide px-1.5 py-0.5 rounded bg-[#F1EEE8] text-[#873D35]">
                Family Pack
              </span>
            )}
          </div>
          <h3 className="font-sans text-[15px] sm:text-base font-semibold text-[#302C28] leading-snug truncate">
            {item.name}
          </h3>
          {item.description && (
            <p className="text-xs text-[#89847D] mt-0.5 line-clamp-1">
              {item.description}
            </p>
          )}
          <p className="text-[15px] font-bold text-[#302C28] mt-1 tabular-nums">
            ₹{item.price}
          </p>
        </div>
      </Link>

      <div className="shrink-0">
        {qty === 0 ? (
          <button
            type="button"
            onClick={() => addItem(item, 1)}
            aria-label={`Add ${item.name} to cart`}
            className="w-9 h-9 rounded-full bg-[#873D35] hover:bg-[#72322B] text-white flex items-center justify-center transition active:scale-95 shadow-xs"
          >
            <Plus className="w-4.5 h-4.5" />
          </button>
        ) : (
          <QuantityControl
            quantity={qty}
            onIncrement={() => incrementItem(item.id)}
            onDecrement={() => decrementItem(item.id)}
          />
        )}
      </div>
    </article>
  );
};

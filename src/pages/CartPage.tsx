import React from 'react';
import { ArrowRight, ShoppingBag, Trash2, UtensilsCrossed } from 'lucide-react';
import { Link } from 'react-router-dom';
import { QuantityControl } from '../components/QuantityControl';
import { VegBadge } from '../components/VegBadge';
import { useCart } from '../context/CartContext';
import { getCategoryFallbackImage } from '../data/menu';

export const CartPage: React.FC = () => {
  const { items, totalItems, subtotal, incrementItem, decrementItem, removeItem, clearCart } =
    useCart();

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <div className="w-20 h-20 rounded-full bg-[#F1EEE8] text-[#89847D] flex items-center justify-center mx-auto mb-5">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#302C28]">Your Cart is Empty</h1>
        <p className="text-sm text-[#89847D] mt-2 max-w-md mx-auto">
          Looks like you haven't added any dishes yet. Browse our menu and add your favourites to get started.
        </p>
        <Link
          to="/menu"
          className="inline-flex items-center gap-2 mt-7 px-6 py-3 rounded-full bg-[#873D35] hover:bg-[#72322B] text-white text-sm font-semibold transition"
        >
          <UtensilsCrossed className="w-4 h-4" />
          <span>Browse Menu</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 pt-6 pb-28 md:pb-16">
      {/* Page Header */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#302C28]">
          Your Cart{' '}
          <span className="text-lg font-normal text-[#89847D]">({totalItems})</span>
        </h1>
        <button
          type="button"
          onClick={clearCart}
          className="text-xs font-medium text-[#89847D] hover:text-[#B83227] transition flex items-center gap-1"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Clear All</span>
        </button>
      </div>

      {/* Cart Items */}
      <div className="space-y-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-white border border-[#E9E5DE] rounded-2xl p-3 sm:p-4 flex items-center gap-3 sm:gap-4"
          >
            {/* Thumbnail */}
            <Link
              to={
                item.categoryId === 'cakes'
                  ? '/cakes'
                  : item.categoryId === 'pastries'
                  ? '/menu/pastries'
                  : `/item/${item.id}`
              }
              className="w-18 h-18 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-[#F1EEE8] shrink-0"
            >
              <img
                src={item.image}
                alt={item.name}
                loading="lazy"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = getCategoryFallbackImage(item.categoryId);
                }}
              />
            </Link>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 mb-0.5">
                <VegBadge isVeg={item.isVeg} />
              </div>
              <Link
                to={
                  item.categoryId === 'cakes'
                    ? '/cakes'
                    : item.categoryId === 'pastries'
                    ? '/menu/pastries'
                    : `/item/${item.id}`
                }
                className="hover:text-[#873D35] transition"
              >
                <h3 className="font-sans text-sm sm:text-[15px] font-semibold text-[#302C28] truncate">
                  {item.name}
                </h3>
              </Link>
              <p className="text-sm font-bold text-[#302C28] mt-0.5 tabular-nums">
                ₹{item.price}
              </p>
            </div>

            {/* Controls */}
            <div className="flex flex-col items-end gap-2 shrink-0">
              <button
                type="button"
                onClick={() => removeItem(item.id)}
                aria-label={`Remove ${item.name} from cart`}
                className="w-7 h-7 rounded-full flex items-center justify-center text-[#89847D] hover:text-[#B83227] hover:bg-[#F1EEE8] transition"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
              <QuantityControl
                quantity={item.quantity}
                onIncrement={() => incrementItem(item.id)}
                onDecrement={() => decrementItem(item.id)}
              />
              <span className="text-xs font-semibold text-[#89847D] tabular-nums">
                ₹{item.price * item.quantity}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Order Summary Card */}
      <div className="mt-6 bg-white border border-[#E9E5DE] rounded-2xl p-4 sm:p-5 space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-[#89847D]">Item Total</span>
          <span className="font-semibold text-[#302C28] tabular-nums">₹{subtotal}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-[#89847D]">Delivery</span>
          <span className="text-xs text-[#89847D]">Confirmed on WhatsApp</span>
        </div>
        <div className="border-t border-[#E9E5DE] pt-3 flex items-center justify-between">
          <span className="text-base font-bold text-[#302C28]">Total</span>
          <span className="text-xl font-bold text-[#302C28] tabular-nums">₹{subtotal}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-5 flex flex-col sm:flex-row gap-3">
        <Link
          to="/menu"
          className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-5 rounded-full border border-[#E9E5DE] hover:border-[#873D35]/40 text-[#302C28] text-sm font-semibold transition"
        >
          <UtensilsCrossed className="w-4 h-4" />
          <span>Continue Shopping</span>
        </Link>
        <Link
          to="/checkout"
          className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-5 rounded-full bg-[#873D35] hover:bg-[#72322B] text-white text-sm font-semibold transition active:scale-98"
        >
          <span>Proceed to Checkout</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};

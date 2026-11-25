import React, { useEffect, useMemo, useState } from 'react';
import { Clock, Flame, ShoppingBag } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { FoodCard } from '../components/FoodCard';
import { QuantityControl } from '../components/QuantityControl';
import { VegBadge } from '../components/VegBadge';
import { useCart } from '../context/CartContext';
import { getItemById, getItemsByCategory, MENU_CATEGORIES } from '../data/menu';

export const ItemDetailPage: React.FC = () => {
  const { itemId } = useParams<{ itemId: string }>();
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);

  const item = getItemById(itemId || '');

  useEffect(() => {
    setQuantity(1);
  }, [itemId]);

  const category = useMemo(
    () => MENU_CATEGORIES.find((c) => c.id === item?.categoryId),
    [item?.categoryId]
  );

  const relatedDishes = useMemo(() => {
    if (!item) return [];
    return getItemsByCategory(item.categoryId)
      .filter((other) => other.id !== item.id)
      .slice(0, 4);
  }, [item]);

  if (!item) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-[#302C28]">Dish Not Found</h1>
        <p className="text-sm text-[#89847D] mt-2">
          We couldn’t find that dish. Browse our complete menu to add your favourites.
        </p>
        <Link
          to="/menu"
          className="inline-block mt-6 px-6 py-3 rounded-full bg-[#873D35] text-white text-sm font-semibold"
        >
          Explore Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 pt-5 pb-16">
      {/* Main Food Detail Card (Matching Screen 4 of Visual Reference) */}
      <div className="bg-white border border-[#E9E5DE] rounded-3xl overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Large Food Photograph */}
          <div className="aspect-[4/3] md:aspect-square w-full bg-[#F1EEE8] overflow-hidden">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Info & Action Controls */}
          <div className="p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-3">
                {category && (
                  <Link
                    to={`/menu/${category.slug}`}
                    className="text-xs font-semibold uppercase tracking-wider text-[#873D35] hover:underline"
                  >
                    {category.name}
                  </Link>
                )}
                <VegBadge isVeg={item.isVeg} showLabel size="md" />
              </div>

              <h1 className="mt-3 text-2xl sm:text-3xl font-bold text-[#302C28]">
                {item.name}
              </h1>

              {item.description ? (
                <p className="mt-2.5 text-sm text-[#89847D] leading-relaxed">
                  {item.description}
                </p>
              ) : (
                <p className="mt-2.5 text-sm text-[#89847D] leading-relaxed">
                  Freshly prepared to order at Cake World Bakers &amp; Restaurant, Anakapalli.
                </p>
              )}

              {item.verificationNote && (
                <p className="mt-2 text-xs text-[#89847D] bg-[#F1EEE8] px-3 py-1.5 rounded-lg">
                  Menu note: {item.verificationNote}
                </p>
              )}

              {/* Price + Quantity Stepper */}
              <div className="mt-6 flex items-center justify-between gap-4 py-4 border-y border-[#E9E5DE]">
                <div>
                  <span className="text-xs text-[#89847D] block">Price</span>
                  <span className="text-2xl sm:text-3xl font-bold text-[#302C28] tabular-nums">
                    ₹{item.price}
                  </span>
                </div>
                <QuantityControl
                  size="md"
                  quantity={quantity}
                  onIncrement={() => setQuantity((q) => q + 1)}
                  onDecrement={() => setQuantity((q) => Math.max(1, q - 1))}
                />
              </div>

              {/* Add to Cart Primary CTA */}
              <button
                type="button"
                onClick={() => addItem(item, quantity)}
                className="mt-5 w-full py-3.5 px-6 rounded-full bg-[#873D35] hover:bg-[#72322B] text-white font-semibold text-sm sm:text-base flex items-center justify-center gap-2 transition active:scale-98"
              >
                <ShoppingBag className="w-4.5 h-4.5" />
                <span>Add to Cart · ₹{item.price * quantity}</span>
              </button>
            </div>

            {/* Info Chips (Matching Screen 4 Bottom Chips) */}
            <div className="mt-6 grid grid-cols-3 gap-2.5">
              <div className="bg-[#F8F7F4] border border-[#E9E5DE] rounded-2xl p-3 flex flex-col items-center text-center">
                <VegBadge isVeg={item.isVeg} size="md" />
                <span className="text-xs font-medium text-[#302C28] mt-1.5">
                  {item.isVeg ? 'Veg' : 'Non-Veg'}
                </span>
              </div>
              <div className="bg-[#F8F7F4] border border-[#E9E5DE] rounded-2xl p-3 flex flex-col items-center text-center">
                <Clock className="w-4 h-4 text-[#873D35]" />
                <span className="text-xs font-medium text-[#302C28] mt-1.5">
                  {item.prepTime || '15–20 mins'}
                </span>
              </div>
              <div className="bg-[#F8F7F4] border border-[#E9E5DE] rounded-2xl p-3 flex flex-col items-center text-center">
                <Flame className="w-4 h-4 text-[#873D35]" />
                <span className="text-xs font-medium text-[#302C28] mt-1.5">
                  {item.spiceLevel || 'Fresh'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Dishes */}
      {relatedDishes.length > 0 && (
        <section className="mt-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-[#302C28]">
              More in {category?.name}
            </h2>
            {category && (
              <Link
                to={`/menu/${category.slug}`}
                className="text-xs sm:text-sm font-semibold text-[#873D35] hover:underline"
              >
                View All
              </Link>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {relatedDishes.map((dish) => (
              <FoodCard key={dish.id} item={dish} variant="list" />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

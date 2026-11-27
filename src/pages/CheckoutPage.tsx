import React, { useState } from 'react';
import { AlertCircle, ArrowLeft, ShoppingBag } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { VegBadge } from '../components/VegBadge';
import { WhatsAppIcon } from '../components/WhatsAppIcon';
import { useCart } from '../context/CartContext';
import { getCategoryFallbackImage } from '../data/menu';
import { CustomerCheckoutDetails, getWhatsAppOrderUrl } from '../utils/whatsapp';

export const CheckoutPage: React.FC = () => {
  const { items, subtotal, totalItems } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState<CustomerCheckoutDetails>({
    fullName: '',
    phone: '',
    address: '',
    landmark: '',
    orderNotes: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <div className="w-20 h-20 rounded-full bg-[#F1EEE8] text-[#89847D] flex items-center justify-center mx-auto mb-5">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#302C28]">
          Your Cart is Empty
        </h1>
        <p className="text-sm text-[#89847D] mt-2">
          Add items to your cart before proceeding to checkout.
        </p>
        <Link
          to="/menu"
          className="inline-block mt-7 px-6 py-3 rounded-full bg-[#873D35] text-white text-sm font-semibold"
        >
          Browse Menu
        </Link>
      </div>
    );
  }

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!form.fullName.trim()) {
      newErrors.fullName = 'Please enter your name';
    }

    const phoneDigits = form.phone.replace(/\D/g, '');
    if (!phoneDigits) {
      newErrors.phone = 'Please enter your phone number';
    } else if (phoneDigits.length < 10) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }

    if (!form.address.trim()) {
      newErrors.address = 'Please enter your delivery address';
    } else if (form.address.trim().length < 10) {
      newErrors.address = 'Please enter a complete delivery address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field: keyof CustomerCheckoutDetails, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[field];
        return copy;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    if (!validate()) return;

    const url = getWhatsAppOrderUrl(items, form, subtotal);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const inputClass = (field: string) =>
    `w-full px-4 py-3 rounded-xl bg-white border ${
      errors[field] ? 'border-[#B83227]' : 'border-[#E9E5DE] focus:border-[#873D35]'
    } focus:outline-none text-sm text-[#302C28] placeholder:text-[#89847D] transition`;

  return (
    <div className="max-w-5xl mx-auto px-4 pt-5 pb-28 md:pb-16">
      {/* Back link */}
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="hidden md:inline-flex items-center gap-1.5 text-sm font-medium text-[#89847D] hover:text-[#302C28] mb-4 transition"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Cart</span>
      </button>

      <h1 className="text-2xl sm:text-3xl font-bold text-[#302C28] mb-6">Checkout</h1>

      <form onSubmit={handleSubmit} noValidate>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Delivery Details Form */}
          <div className="lg:col-span-7 space-y-5">
            <div className="bg-white border border-[#E9E5DE] rounded-2xl p-5 sm:p-6 space-y-4">
              <h2 className="text-lg font-semibold text-[#302C28]">Delivery Details</h2>

              {/* Full Name */}
              <div>
                <label htmlFor="fullName" className="block text-xs font-medium text-[#89847D] mb-1.5">
                  Full Name <span className="text-[#B83227]">*</span>
                </label>
                <input
                  id="fullName"
                  type="text"
                  value={form.fullName}
                  onChange={(e) => handleChange('fullName', e.target.value)}
                  placeholder="Your full name"
                  className={inputClass('fullName')}
                  autoComplete="name"
                />
                {errors.fullName && (
                  <p className="text-xs text-[#B83227] mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.fullName}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-xs font-medium text-[#89847D] mb-1.5">
                  Phone Number <span className="text-[#B83227]">*</span>
                </label>
                <input
                  id="phone"
                  type="tel"
                  inputMode="numeric"
                  value={form.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  placeholder="10-digit mobile number"
                  className={inputClass('phone')}
                  autoComplete="tel"
                />
                {errors.phone && (
                  <p className="text-xs text-[#B83227] mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.phone}
                  </p>
                )}
              </div>

              {/* Delivery Address */}
              <div>
                <label htmlFor="address" className="block text-xs font-medium text-[#89847D] mb-1.5">
                  Delivery Address <span className="text-[#B83227]">*</span>
                </label>
                <textarea
                  id="address"
                  rows={3}
                  value={form.address}
                  onChange={(e) => handleChange('address', e.target.value)}
                  placeholder="Complete delivery address"
                  className={`${inputClass('address')} resize-none`}
                  autoComplete="street-address"
                />
                {errors.address && (
                  <p className="text-xs text-[#B83227] mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.address}
                  </p>
                )}
              </div>

              {/* Landmark */}
              <div>
                <label htmlFor="landmark" className="block text-xs font-medium text-[#89847D] mb-1.5">
                  Landmark <span className="text-[#89847D] font-normal">(Optional)</span>
                </label>
                <input
                  id="landmark"
                  type="text"
                  value={form.landmark}
                  onChange={(e) => handleChange('landmark', e.target.value)}
                  placeholder="Nearby landmark"
                  className={inputClass('landmark')}
                />
              </div>

              {/* Order Notes */}
              <div>
                <label htmlFor="orderNotes" className="block text-xs font-medium text-[#89847D] mb-1.5">
                  Order Notes <span className="text-[#89847D] font-normal">(Optional)</span>
                </label>
                <textarea
                  id="orderNotes"
                  rows={2}
                  value={form.orderNotes}
                  onChange={(e) => handleChange('orderNotes', e.target.value)}
                  placeholder="Any special instructions for your order"
                  className={`${inputClass('orderNotes')} resize-none`}
                />
              </div>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-5">
            <div className="bg-white border border-[#E9E5DE] rounded-2xl p-5 sm:p-6 space-y-4 lg:sticky lg:top-24">
              <h2 className="text-lg font-semibold text-[#302C28]">Order Summary</h2>

              <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg overflow-hidden bg-[#F1EEE8] shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src = getCategoryFallbackImage(item.categoryId);
                        }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1">
                        <VegBadge isVeg={item.isVeg} />
                        <p className="text-xs sm:text-sm font-medium text-[#302C28] truncate">
                          {item.name}
                        </p>
                      </div>
                      <p className="text-[11px] text-[#89847D]">
                        x{item.quantity}
                      </p>
                    </div>
                    <span className="text-sm font-semibold text-[#302C28] tabular-nums shrink-0">
                      ₹{item.price * item.quantity}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-[#E9E5DE] pt-3 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#89847D]">Subtotal ({totalItems} items)</span>
                  <span className="font-semibold text-[#302C28] tabular-nums">₹{subtotal}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#89847D]">Delivery</span>
                  <span className="text-xs text-[#89847D]">Confirmed on WhatsApp</span>
                </div>
              </div>

              <div className="border-t border-[#E9E5DE] pt-3 flex items-center justify-between">
                <span className="text-lg font-bold text-[#302C28]">Total</span>
                <span className="text-xl font-bold text-[#302C28] tabular-nums">₹{subtotal}</span>
              </div>

              {/* Place Order CTA */}
              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-full bg-[#25D366] hover:bg-[#1EBE5B] text-white font-semibold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-sm transition active:scale-98"
              >
                <WhatsAppIcon className="w-5 h-5" />
                <span>Place Order on WhatsApp</span>
              </button>

              <p className="text-[11px] text-[#89847D] text-center leading-relaxed">
                You will be redirected to WhatsApp with your order details.
                Please send the pre-filled message to confirm.
              </p>

              {submitted && Object.keys(errors).length > 0 && (
                <div className="bg-[#B83227]/5 border border-[#B83227]/20 rounded-xl p-3 text-xs text-[#B83227] flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>Please fill in all required fields above before placing your order.</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

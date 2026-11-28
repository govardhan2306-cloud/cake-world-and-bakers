import React, { useEffect, useState } from 'react';
import {
  CheckCircle2,
  FileText,
  HelpCircle,
  Lock,
  RotateCcw,
  ShieldCheck,
  Truck,
  Utensils,
} from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { RESTAURANT_INFO } from '../data/restaurant';
import { WhatsAppIcon } from '../components/WhatsAppIcon';
import { getWhatsAppGeneralUrl } from '../utils/whatsapp';

export type PolicyTab = 'privacy' | 'terms' | 'refund' | 'delivery' | 'food-safety';

interface PolicyTabConfig {
  id: PolicyTab;
  label: string;
  shortLabel: string;
  icon: React.ComponentType<{ className?: string }>;
}

const POLICY_TABS: PolicyTabConfig[] = [
  { id: 'privacy', label: 'Privacy Policy', shortLabel: 'Privacy', icon: Lock },
  { id: 'terms', label: 'Terms & Conditions', shortLabel: 'Terms', icon: FileText },
  { id: 'refund', label: 'Refund & Cancellation', shortLabel: 'Refunds', icon: RotateCcw },
  { id: 'delivery', label: 'Delivery Policy', shortLabel: 'Delivery', icon: Truck },
  { id: 'food-safety', label: 'Food Safety & Allergens', shortLabel: 'Food Safety', icon: ShieldCheck },
];

export const PoliciesPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Determine active tab from URL path or hash
  const getInitialTab = (): PolicyTab => {
    const path = location.pathname.toLowerCase();
    if (path.includes('privacy')) return 'privacy';
    if (path.includes('terms')) return 'terms';
    if (path.includes('refund') || path.includes('cancellation')) return 'refund';
    if (path.includes('delivery') || path.includes('shipping')) return 'delivery';
    if (path.includes('safety') || path.includes('allergen')) return 'food-safety';
    const hash = location.hash.replace('#', '').toLowerCase();
    if (hash === 'privacy' || hash === 'terms' || hash === 'refund' || hash === 'delivery' || hash === 'food-safety') {
      return hash as PolicyTab;
    }
    return 'privacy';
  };

  const [activeTab, setActiveTab] = useState<PolicyTab>(getInitialTab);

  useEffect(() => {
    setActiveTab(getInitialTab());
  }, [location.pathname, location.hash]);

  const handleTabChange = (tabId: PolicyTab) => {
    setActiveTab(tabId);
    navigate(`/policies#${tabId}`, { replace: true });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 pt-6 pb-28 md:pb-16">
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#873D35]">
          Customer Trust &amp; Transparency
        </span>
        <h1 className="mt-2 text-3xl sm:text-4xl font-bold text-[#302C28]">
          Restaurant Policies
        </h1>
        <p className="mt-2 text-sm sm:text-base text-[#89847D]">
          Our customer-first guidelines for orders, fresh bakery preparations, deliveries, and data privacy in Anakapalli.
        </p>
      </div>

      {/* Policy Tab Switcher */}
      <div className="mt-8 -mx-4 px-4 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-2 pb-2 w-max mx-auto border-b border-[#E9E5DE]">
          {POLICY_TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleTabChange(tab.id)}
                className={`px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold flex items-center gap-2 transition whitespace-nowrap ${
                  isActive
                    ? 'bg-[#873D35] text-white shadow-xs'
                    : 'bg-white border border-[#E9E5DE] text-[#302C28] hover:border-[#873D35]/40 hover:bg-[#F1EEE8]'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#873D35]'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Policy Content Panels */}
      <div className="mt-8 bg-white border border-[#E9E5DE] rounded-3xl p-6 sm:p-10 shadow-2xs">
        {/* TAB 1: PRIVACY POLICY */}
        {activeTab === 'privacy' && (
          <article className="space-y-6 text-[#302C28]">
            <div className="border-b border-[#E9E5DE] pb-4">
              <span className="text-xs font-semibold text-[#873D35] uppercase tracking-wider">
                Last Updated: November 2026
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#302C28] mt-1">
                Privacy Policy
              </h2>
              <p className="text-sm text-[#89847D] mt-1">
                How Cake World Bakers &amp; Restaurant collects, uses, and protects your information.
              </p>
            </div>

            <section className="space-y-3">
              <h3 className="text-base sm:text-lg font-bold text-[#302C28]">
                1. Information We Collect
              </h3>
              <p className="text-sm text-[#89847D] leading-relaxed">
                When you browse our online menu or submit an order via our WhatsApp checkout form, we collect the following limited details:
              </p>
              <ul className="list-disc list-inside text-sm text-[#89847D] space-y-1.5 pl-2">
                <li><strong className="text-[#302C28]">Contact Details:</strong> Your full name and mobile phone number to coordinate order preparation and dispatch.</li>
                <li><strong className="text-[#302C28]">Delivery Information:</strong> Your complete address and nearby landmark in Anakapalli for accurate doorstep delivery.</li>
                <li><strong className="text-[#302C28]">Order Notes:</strong> Dietary preferences, cake messages (e.g., "Happy Birthday"), and spice level instructions.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h3 className="text-base sm:text-lg font-bold text-[#302C28]">
                2. How We Use Your Information
              </h3>
              <p className="text-sm text-[#89847D] leading-relaxed">
                We strictly use your details to:
              </p>
              <ul className="list-disc list-inside text-sm text-[#89847D] space-y-1.5 pl-2">
                <li>Prepare and fulfill your food or bakery order accurately.</li>
                <li>Communicate order status, delivery arrival, or order clarifications via WhatsApp or phone.</li>
                <li>Provide responsive customer care and follow up on feedback.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h3 className="text-base sm:text-lg font-bold text-[#302C28]">
                3. We Never Sell Your Data
              </h3>
              <p className="text-sm text-[#89847D] leading-relaxed">
                We respect your personal privacy. We do not sell, rent, lease, or share your contact or address details with any third-party marketing companies, advertisers, or spam networks. Information is handled solely by our trusted restaurant management and delivery team.
              </p>
            </section>

            <section className="space-y-3">
              <h3 className="text-base sm:text-lg font-bold text-[#302C28]">
                4. Local Browser Storage
              </h3>
              <p className="text-sm text-[#89847D] leading-relaxed">
                Our website saves your temporary shopping cart items to your own device’s local storage (<code className="bg-[#F1EEE8] px-1.5 py-0.5 rounded text-xs text-[#302C28]">localStorage</code>) so your selected dishes and cakes are not lost if you refresh or switch tabs. We do not use intrusive tracking cookies.
              </p>
            </section>

            <section className="space-y-3">
              <h3 className="text-base sm:text-lg font-bold text-[#302C28]">
                5. Contact for Privacy Inquiries
              </h3>
              <p className="text-sm text-[#89847D] leading-relaxed">
                If you have questions about our privacy practices, wish to update your details, or request deletion of order history, please reach out directly at <strong className="text-[#302C28]">+91 81252 07669</strong>.
              </p>
            </section>
          </article>
        )}

        {/* TAB 2: TERMS & CONDITIONS */}
        {activeTab === 'terms' && (
          <article className="space-y-6 text-[#302C28]">
            <div className="border-b border-[#E9E5DE] pb-4">
              <span className="text-xs font-semibold text-[#873D35] uppercase tracking-wider">
                Last Updated: November 2026
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#302C28] mt-1">
                Terms &amp; Conditions
              </h2>
              <p className="text-sm text-[#89847D] mt-1">
                Terms governing your use of Cake World website, dine-in, takeaway, and delivery orders.
              </p>
            </div>

            <section className="space-y-3">
              <h3 className="text-base sm:text-lg font-bold text-[#302C28]">
                1. Acceptance of Terms
              </h3>
              <p className="text-sm text-[#89847D] leading-relaxed">
                By accessing this website, placing orders via our digital menu, or communicating via WhatsApp to order from Cake World Bakers &amp; Restaurant (Pappulaveedhi, Gavarapalem, Anakapalli), you agree to these Terms &amp; Conditions.
              </p>
            </section>

            <section className="space-y-3">
              <h3 className="text-base sm:text-lg font-bold text-[#302C28]">
                2. Menu Pricing &amp; Fresh Availability
              </h3>
              <ul className="list-disc list-inside text-sm text-[#89847D] space-y-1.5 pl-2">
                <li>All prices listed on the website are in Indian Rupees (₹) and are inclusive of standard preparation.</li>
                <li>Because all dishes and bakes are prepared fresh daily, certain signature items, seafood specials, or cake flavours may sell out during peak evening hours.</li>
                <li>In the rare event an item is out of stock when your WhatsApp order arrives, our team will inform you immediately with fresh recommendations.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h3 className="text-base sm:text-lg font-bold text-[#302C28]">
                3. Order Placement &amp; WhatsApp Confirmation
              </h3>
              <p className="text-sm text-[#89847D] leading-relaxed">
                When you click "Place Order on WhatsApp" on checkout, your cart items are pre-formatted into a WhatsApp message. The order is officially confirmed once our staff verifies kitchen preparation time and delivery availability with you on WhatsApp.
              </p>
            </section>

            <section className="space-y-3">
              <h3 className="text-base sm:text-lg font-bold text-[#302C28]">
                4. Custom &amp; Celebration Cakes
              </h3>
              <p className="text-sm text-[#89847D] leading-relaxed">
                Speciality custom cakes, multi-tier birthday cakes, and customized name pipings require sufficient lead time (typically 3–4 hours minimum) to ensure artisan decoration and optimal cooling.
              </p>
            </section>

            <section className="space-y-3">
              <h3 className="text-base sm:text-lg font-bold text-[#302C28]">
                5. Intellectual Property &amp; Governing Law
              </h3>
              <p className="text-sm text-[#89847D] leading-relaxed">
                The Cake World brand name, logo, menu curation, and dish photography belong to Cake World Bakers &amp; Restaurant. Any dispute arising from services is subject to the exclusive jurisdiction of the competent courts in Anakapalli, Andhra Pradesh, India.
              </p>
            </section>
          </article>
        )}

        {/* TAB 3: REFUND & CANCELLATION */}
        {activeTab === 'refund' && (
          <article className="space-y-6 text-[#302C28]">
            <div className="border-b border-[#E9E5DE] pb-4">
              <span className="text-xs font-semibold text-[#873D35] uppercase tracking-wider">
                Customer Satisfaction Guaranteed
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#302C28] mt-1">
                Refund &amp; Cancellation Policy
              </h2>
              <p className="text-sm text-[#89847D] mt-1">
                Clear and fair guidelines for modifying, cancelling, or requesting refunds for your orders.
              </p>
            </div>

            <section className="space-y-3">
              <h3 className="text-base sm:text-lg font-bold text-[#302C28]">
                1. Order Cancellation Policy
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                <div className="p-4 rounded-2xl bg-[#F8F7F4] border border-[#E9E5DE] space-y-2">
                  <div className="flex items-center gap-2 text-[#873D35] font-semibold text-sm">
                    <Utensils className="w-4 h-4" />
                    <span>Restaurant Dishes &amp; Biryanis</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#89847D] leading-relaxed">
                    You may cancel or modify regular food orders within <strong className="text-[#302C28]">5–10 minutes</strong> of placing your order, before our chefs begin cooking. Once cooking is in progress, cancellations cannot be accepted.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#F8F7F4] border border-[#E9E5DE] space-y-2">
                  <div className="flex items-center gap-2 text-[#873D35] font-semibold text-sm">
                    <RotateCcw className="w-4 h-4" />
                    <span>Custom Celebration Cakes</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#89847D] leading-relaxed">
                    Custom cakes are baked fresh specifically for your celebration. Cancellations must be made at least <strong className="text-[#302C28]">4 hours prior</strong> to the scheduled pickup or delivery time.
                  </p>
                </div>
              </div>
            </section>

            <section className="space-y-3">
              <h3 className="text-base sm:text-lg font-bold text-[#302C28]">
                2. Damaged, Missing, or Incorrect Items
              </h3>
              <p className="text-sm text-[#89847D] leading-relaxed">
                We take immense pride in our food quality and packaging. If an item arrives damaged during transit, is missing, or is incorrect:
              </p>
              <ul className="list-disc list-inside text-sm text-[#89847D] space-y-1.5 pl-2">
                <li>Notify us on WhatsApp at <strong className="text-[#302C28]">+91 81252 07669</strong> within <strong className="text-[#302C28]">30 minutes</strong> of delivery.</li>
                <li>Share a quick photo of the received packaging and dish.</li>
                <li>Our team will immediately arrange a <strong className="text-[#302C28]">fresh replacement dish</strong> or issue a direct refund.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h3 className="text-base sm:text-lg font-bold text-[#302C28]">
                3. Refund Processing
              </h3>
              <p className="text-sm text-[#89847D] leading-relaxed">
                Approved refunds are processed via UPI (Google Pay, PhonePe, Paytm) or original payment mode within <strong className="text-[#302C28]">24 hours</strong>.
              </p>
            </section>
          </article>
        )}

        {/* TAB 4: DELIVERY POLICY */}
        {activeTab === 'delivery' && (
          <article className="space-y-6 text-[#302C28]">
            <div className="border-b border-[#E9E5DE] pb-4">
              <span className="text-xs font-semibold text-[#873D35] uppercase tracking-wider">
                Fast &amp; Fresh Across Anakapalli
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#302C28] mt-1">
                Delivery &amp; Shipping Policy
              </h2>
              <p className="text-sm text-[#89847D] mt-1">
                Details regarding service areas, delivery timelines, packaging, and charges.
              </p>
            </div>

            <section className="space-y-3">
              <h3 className="text-base sm:text-lg font-bold text-[#302C28]">
                1. Delivery Hours &amp; Service Coverage
              </h3>
              <p className="text-sm text-[#89847D] leading-relaxed">
                We deliver fresh restaurant dishes and bakery cakes daily from <strong className="text-[#302C28]">8:00 AM to 10:30 PM</strong> across Anakapalli town, including:
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1">
                {['Gavarapalem', 'Pappulaveedhi', 'Main Road & Nehru Chowk', 'RTC Complex Area', 'Ring Road', 'Woodpeta', 'NTR Hospital Road', 'Sarada Colony', 'Surrounding Localities'].map((area) => (
                  <div key={area} className="flex items-center gap-2 p-2.5 rounded-xl bg-[#F8F7F4] border border-[#E9E5DE] text-xs font-medium text-[#302C28]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#25D366] shrink-0" />
                    <span>{area}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="space-y-3">
              <h3 className="text-base sm:text-lg font-bold text-[#302C28]">
                2. Estimated Delivery Time
              </h3>
              <p className="text-sm text-[#89847D] leading-relaxed">
                Most orders in Anakapalli are delivered within <strong className="text-[#302C28]">30 to 45 minutes</strong> from the time of confirmation. Slow-cooked dishes (such as whole tandoori platters) or custom cake piping may require an extra 10–15 minutes.
              </p>
            </section>

            <section className="space-y-3">
              <h3 className="text-base sm:text-lg font-bold text-[#302C28]">
                3. Delivery Charges
              </h3>
              <p className="text-sm text-[#89847D] leading-relaxed">
                Delivery charges depend on distance from our restaurant at Pappulaveedhi, Gavarapalem. Any applicable delivery fee is confirmed transparently with you on WhatsApp prior to order dispatch.
              </p>
            </section>

            <section className="space-y-3">
              <h3 className="text-base sm:text-lg font-bold text-[#302C28]">
                4. Safe &amp; Hygienic Packaging
              </h3>
              <p className="text-sm text-[#89847D] leading-relaxed">
                All food is packed in food-grade, leak-proof containers to retain heat, freshness, and aroma. Cakes are packed in sturdy presentation boxes with base boards to prevent sliding during transit.
              </p>
            </section>
          </article>
        )}

        {/* TAB 5: FOOD SAFETY & ALLERGENS */}
        {activeTab === 'food-safety' && (
          <article className="space-y-6 text-[#302C28]">
            <div className="border-b border-[#E9E5DE] pb-4">
              <span className="text-xs font-semibold text-[#873D35] uppercase tracking-wider">
                Kitchen Hygiene &amp; Standards
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#302C28] mt-1">
                Food Safety &amp; Allergen Notice
              </h2>
              <p className="text-sm text-[#89847D] mt-1">
                Our commitment to kitchen hygiene, vegetarian segregation, and ingredient transparency.
              </p>
            </div>

            <section className="space-y-3">
              <h3 className="text-base sm:text-lg font-bold text-[#302C28]">
                1. Veg &amp; Non-Veg Strict Segregation
              </h3>
              <p className="text-sm text-[#89847D] leading-relaxed">
                We strictly respect our customers' dietary convictions. Our kitchen enforces strict separation of vegetarian and non-vegetarian preparation areas, utensils, fryers, and storage. Every vegetarian item on our menu is marked with the green vegetarian symbol.
              </p>
            </section>

            <section className="space-y-3">
              <h3 className="text-base sm:text-lg font-bold text-[#302C28]">
                2. Fresh Daily Ingredients
              </h3>
              <ul className="list-disc list-inside text-sm text-[#89847D] space-y-1.5 pl-2">
                <li><strong className="text-[#302C28]">Biryanis &amp; Curries:</strong> Cooked with premium long-grain aged basmati rice, farm-fresh poultry, fresh paneer, and authentic regional spices.</li>
                <li><strong className="text-[#302C28]">Bakery &amp; Cakes:</strong> Made with premium dairy cream, fresh fruit compotes, and quality chocolate. No stale or day-old bakes are served.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h3 className="text-base sm:text-lg font-bold text-[#302C28]">
                3. Allergen Awareness
              </h3>
              <p className="text-sm text-[#89847D] leading-relaxed">
                Please be aware that our kitchen and bakery handle items containing:
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
                {[
                  { name: 'Dairy & Milk', desc: 'Present in Paneer, Shakes, Fresh Cream Cakes, Curries' },
                  { name: 'Nuts (Cashews)', desc: 'Present in Mughlai curries, Kaju Biryani, Praline cakes' },
                  { name: 'Gluten / Wheat', desc: 'Present in Roti, Naan, Pizza crust, Burgers, Cakes' },
                  { name: 'Eggs', desc: 'Present in Egg Biryani and non-veg restaurant starters' },
                ].map((allergen) => (
                  <div key={allergen.name} className="p-3 rounded-2xl bg-[#F8F7F4] border border-[#E9E5DE] space-y-1">
                    <p className="text-xs font-bold text-[#302C28]">{allergen.name}</p>
                    <p className="text-[11px] text-[#89847D] leading-snug">{allergen.desc}</p>
                  </div>
                ))}
              </div>
              <p className="text-xs text-[#89847D] pt-2">
                If you or anyone in your party has severe food allergies, please specify in the <em>Order Notes</em> field at checkout or speak with our team directly via WhatsApp before placing your order.
              </p>
            </section>
          </article>
        )}
      </div>

      {/* Help / WhatsApp Contact Box */}
      <div className="mt-8 bg-[#F1EEE8] border border-[#E9E5DE] rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1.5 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <HelpCircle className="w-5 h-5 text-[#873D35]" />
            <h3 className="text-lg font-bold text-[#302C28]">Have Questions About Your Order?</h3>
          </div>
          <p className="text-xs sm:text-sm text-[#89847D] max-w-lg leading-relaxed">
            Our team is available every day from 8:00 AM to 10:30 PM to assist you with order status, custom cake questions, or special requests.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
          <a
            href={getWhatsAppGeneralUrl('Hello Cake World! I have a question regarding your restaurant policies / my order.')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#25D366] hover:bg-[#1EBE5B] text-white text-xs sm:text-sm font-semibold transition shadow-xs"
          >
            <WhatsAppIcon className="w-4 h-4" />
            <span>Chat on WhatsApp</span>
          </a>
          <a
            href={`tel:+${RESTAURANT_INFO.phoneRaw}`}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-[#E9E5DE] hover:border-[#873D35]/40 text-[#302C28] text-xs sm:text-sm font-semibold transition"
          >
            <span>Call {RESTAURANT_INFO.phoneDisplay}</span>
          </a>
        </div>
      </div>
    </div>
  );
};

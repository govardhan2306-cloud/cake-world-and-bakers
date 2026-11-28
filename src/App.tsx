import React, { Component, lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Preloader } from './components/Preloader';
import { CartProvider } from './context/CartContext';
import { HomePage } from './pages/HomePage';

const MenuPage = lazy(() => import('./pages/MenuPage').then((m) => ({ default: m.MenuPage })));
const CategoryPage = lazy(() => import('./pages/CategoryPage').then((m) => ({ default: m.CategoryPage })));
const ItemDetailPage = lazy(() => import('./pages/ItemDetailPage').then((m) => ({ default: m.ItemDetailPage })));
const CartPage = lazy(() => import('./pages/CartPage').then((m) => ({ default: m.CartPage })));
const CheckoutPage = lazy(() => import('./pages/CheckoutPage').then((m) => ({ default: m.CheckoutPage })));
const AboutPage = lazy(() => import('./pages/AboutPage').then((m) => ({ default: m.AboutPage })));
const CakesPage = lazy(() => import('./pages/CakesPage').then((m) => ({ default: m.CakesPage })));
const BiryaniPage = lazy(() => import('./pages/BiryaniPage').then((m) => ({ default: m.BiryaniPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then((m) => ({ default: m.ContactPage })));
const LocationPage = lazy(() => import('./pages/LocationPage').then((m) => ({ default: m.LocationPage })));
const PoliciesPage = lazy(() => import('./pages/PoliciesPage').then((m) => ({ default: m.PoliciesPage })));

class PreloaderErrorBoundary extends Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): { hasError: boolean } {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) return null;
    return this.props.children;
  }
}

const PageLoading: React.FC = () => (
  <div className="flex items-center justify-center min-h-[40vh]">
    <div className="w-8 h-8 rounded-full border-2 border-[#E9E5DE] border-t-[#873D35] animate-spin" />
  </div>
);

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <PreloaderErrorBoundary>
        <Preloader />
      </PreloaderErrorBoundary>
      <CartProvider>
        <Layout>
          <Suspense fallback={<PageLoading />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/menu" element={<MenuPage />} />
              <Route path="/menu/:categorySlug" element={<CategoryPage />} />
              <Route path="/item/:itemId" element={<ItemDetailPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/cakes" element={<CakesPage />} />
              <Route path="/biryani" element={<BiryaniPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/location" element={<LocationPage />} />
              <Route path="/policies" element={<PoliciesPage />} />
              <Route path="/privacy-policy" element={<PoliciesPage />} />
              <Route path="/terms" element={<PoliciesPage />} />
              <Route path="/refund-policy" element={<PoliciesPage />} />
              <Route path="/delivery-policy" element={<PoliciesPage />} />
              {/* Catch-all → Home */}
              <Route path="*" element={<HomePage />} />
            </Routes>
          </Suspense>
        </Layout>
      </CartProvider>
    </BrowserRouter>
  );
};

export default App;

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { Layout } from './components/layout/Layout';
import { ErrorBoundary } from './components/layout/ErrorBoundary';
import { LoadingFallback } from './components/layout/LoadingFallback';

const Home = lazy(() => import('./pages/Home').then((m) => ({ default: m.Home })));
const Marketplace = lazy(() => import('./pages/Marketplace').then((m) => ({ default: m.Marketplace })));
const Categories = lazy(() => import('./pages/Categories').then((m) => ({ default: m.Categories })));
const ProductDetails = lazy(() => import('./pages/ProductDetails').then((m) => ({ default: m.ProductDetails })));
const Cart = lazy(() => import('./pages/Cart').then((m) => ({ default: m.Cart })));
const Checkout = lazy(() => import('./pages/Checkout').then((m) => ({ default: m.Checkout })));
const Profile = lazy(() => import('./pages/Profile').then((m) => ({ default: m.Profile })));
const Orders = lazy(() => import('./pages/Orders').then((m) => ({ default: m.Orders })));
const About = lazy(() => import('./pages/About').then((m) => ({ default: m.About })));

function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Layout>
          <Routes>
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/home" element={<Suspense fallback={<LoadingFallback type="grid" count={3} />}><Home /></Suspense>} />
            <Route path="/marketplace" element={<Suspense fallback={<LoadingFallback type="grid" count={6} />}><Marketplace /></Suspense>} />
            <Route path="/categories" element={<Suspense fallback={<LoadingFallback type="grid" count={4} />}><Categories /></Suspense>} />
            <Route path="/product-details/:id" element={<Suspense fallback={<LoadingFallback type="product-card" />}><ProductDetails /></Suspense>} />
            <Route path="/cart" element={<Suspense fallback={<LoadingFallback type="grid" count={2} />}><Cart /></Suspense>} />
            <Route path="/checkout" element={<Suspense fallback={<LoadingFallback type="grid" count={2} />}><Checkout /></Suspense>} />
            <Route path="/profile" element={<Suspense fallback={<LoadingFallback type="grid" count={2} />}><Profile /></Suspense>} />
            <Route path="/orders" element={<Suspense fallback={<LoadingFallback type="grid" count={3} />}><Orders /></Suspense>} />
            <Route path="/about" element={<Suspense fallback={<LoadingFallback type="grid" count={3} />}><About /></Suspense>} />
            <Route path="*" element={<Navigate to="/home" replace />} />
          </Routes>
        </Layout>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;

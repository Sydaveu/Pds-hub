import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { Layout } from './components/layout/Layout';
import { ErrorBoundary } from './components/layout/ErrorBoundary';
import { LoadingFallback } from './components/layout/LoadingFallback';
import { AuthProvider, useAuth } from './lib/auth';
import { CartProvider } from './context/CartContext';

const Home = lazy(() => import('./pages/Home').then((m) => ({ default: m.Home })));
const Marketplace = lazy(() => import('./pages/Marketplace').then((m) => ({ default: m.Marketplace })));
const Categories = lazy(() => import('./pages/Categories').then((m) => ({ default: m.Categories })));
const ProductDetails = lazy(() => import('./pages/ProductDetails').then((m) => ({ default: m.ProductDetails })));
const Cart = lazy(() => import('./pages/Cart').then((m) => ({ default: m.Cart })));
const Checkout = lazy(() => import('./pages/Checkout').then((m) => ({ default: m.Checkout })));
const Profile = lazy(() => import('./pages/Profile').then((m) => ({ default: m.Profile })));
const Orders = lazy(() => import('./pages/Orders').then((m) => ({ default: m.Orders })));
const About = lazy(() => import('./pages/About').then((m) => ({ default: m.About })));
const Login = lazy(() => import('./pages/Login').then((m) => ({ default: m.Login })));
const AiAssistantPage = lazy(() => import('./pages/AiAssistantPage').then((m) => ({ default: m.AiAssistantPage })));
const FarmAssets = lazy(() => import('./pages/FarmAssets').then((m) => ({ default: m.FarmAssets })));
const PiCalculator = lazy(() => import('./pages/PiCalculator').then((m) => ({ default: m.PiCalculator })));

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <LoadingFallback type="grid" count={2} />;
  if (!user) return <Navigate to="/login" state={{ from: location }} replace />;
  return <>{children}</>;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/assistant" element={<Suspense fallback={<LoadingFallback type="grid" count={1} />}><AiAssistantPage /></Suspense>} />
      <Route path="*" element={
        <Layout>
          <Routes>
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/home" element={<Suspense fallback={<LoadingFallback type="grid" count={3} />}><Home /></Suspense>} />
            <Route path="/marketplace" element={<Suspense fallback={<LoadingFallback type="grid" count={6} />}><Marketplace /></Suspense>} />
            <Route path="/categories" element={<Suspense fallback={<LoadingFallback type="grid" count={4} />}><Categories /></Suspense>} />
            <Route path="/product-details/:id" element={<Suspense fallback={<LoadingFallback type="product-card" />}><ProductDetails /></Suspense>} />
            <Route path="/farm-assets" element={<Suspense fallback={<LoadingFallback type="grid" count={4} />}><FarmAssets /></Suspense>} />
            <Route path="/pi-calculator" element={<Suspense fallback={<LoadingFallback type="grid" count={4} />}><PiCalculator /></Suspense>} />
            <Route path="/about" element={<Suspense fallback={<LoadingFallback type="grid" count={3} />}><About /></Suspense>} />
            <Route path="/login" element={<Suspense fallback={<LoadingFallback type="grid" count={1} />}><Login /></Suspense>} />
            <Route path="/cart" element={<ProtectedRoute><Suspense fallback={<LoadingFallback type="grid" count={2} />}><Cart /></Suspense></ProtectedRoute>} />
            <Route path="/checkout" element={<ProtectedRoute><Suspense fallback={<LoadingFallback type="grid" count={2} />}><Checkout /></Suspense></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Suspense fallback={<LoadingFallback type="grid" count={2} />}><Profile /></Suspense></ProtectedRoute>} />
            <Route path="/orders" element={<ProtectedRoute><Suspense fallback={<LoadingFallback type="grid" count={3} />}><Orders /></Suspense></ProtectedRoute>} />
            <Route path="*" element={<Navigate to="/home" replace />} />
          </Routes>
        </Layout>
      } />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <AuthProvider>
          <CartProvider>
            <AppRoutes />
          </CartProvider>
        </AuthProvider>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;

import { Search, ShoppingCart, User, LogOut, Package, Menu, X } from 'lucide-react';
import { AiAssistant } from '../ai-assistant/AiAssistant';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../lib/auth';
import { useCart } from '../../context/CartContext';

export function Navbar() {
  const { user, signOut } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    setProfileOpen(false);
    navigate('/home');
  };

  const navLinks = [
    { to: '/marketplace', label: 'Marketplace' },
    { to: '/categories', label: 'Categories' },
    { to: '/farm-assets', label: 'Farm Assets' },
    { to: '/pi-calculator', label: 'Pi Calculator' },
    { to: '/about', label: 'About' },
  ];

  return (
    <nav className="bg-black/40 backdrop-blur-xl border-b border-white/5 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to="/home" className="flex items-center space-x-1 text-xl font-bold">
            <span className="text-purple-400">PDS</span>
            <span className="text-amber-400">Agri-Hub</span>
          </Link>
        </div>

        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className="text-gray-400 hover:text-white transition-colors text-sm font-medium"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center space-x-3">
          <Link to="/marketplace" className="p-2 rounded-lg hover:bg-white/5 transition-colors">
            <Search className="h-5 w-5 text-gray-400 hover:text-white transition-colors" />
          </Link>

          <Link to="/cart" className="relative p-2 rounded-lg hover:bg-white/5 transition-colors">
            <ShoppingCart className="h-5 w-5 text-gray-400 hover:text-white transition-colors" />
            {totalItems > 0 && (
              <motion.span
                key={totalItems}
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 w-5 h-5 bg-purple-600 text-white text-xs font-bold rounded-full flex items-center justify-center"
              >
                {totalItems > 9 ? '9+' : totalItems}
              </motion.span>
            )}
          </Link>

          {user ? (
            <div className="relative">
              <button
                onClick={() => setProfileOpen(v => !v)}
                className="flex items-center gap-2 p-1 rounded-xl hover:bg-white/5 transition-colors"
              >
                {user.avatarUrl ? (
                  <img
                    src={user.avatarUrl}
                    alt={user.username}
                    className="w-8 h-8 rounded-full object-cover border-2 border-purple-500/50"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-indigo-700 flex items-center justify-center text-white text-xs font-bold border-2 border-purple-500/50">
                    {user.username.charAt(0).toUpperCase()}
                  </div>
                )}
                <span className="hidden md:block text-sm text-gray-300 max-w-[80px] truncate">{user.username}</span>
              </button>

              <AnimatePresence>
                {profileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-12 w-52 bg-gray-900/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl overflow-hidden"
                  >
                    <div className="px-4 py-3 border-b border-white/5">
                      <p className="text-white text-sm font-medium truncate">{user.username}</p>
                      <p className="text-gray-500 text-xs truncate">{user.email}</p>
                    </div>
                    <div className="p-1">
                      <Link
                        to="/profile"
                        onClick={() => setProfileOpen(false)}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/5 text-gray-300 hover:text-white text-sm transition-colors"
                      >
                        <User className="h-4 w-4" /> My Profile
                      </Link>
                      <Link
                        to="/orders"
                        onClick={() => setProfileOpen(false)}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/5 text-gray-300 hover:text-white text-sm transition-colors"
                      >
                        <Package className="h-4 w-4" /> My Orders
                      </Link>
                      <button
                        onClick={handleSignOut}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-red-500/10 text-gray-400 hover:text-red-400 text-sm transition-colors"
                      >
                        <LogOut className="h-4 w-4" /> Sign Out
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <Link
              to="/login"
              className="hidden md:flex items-center gap-1.5 bg-purple-600 hover:bg-purple-500 text-white text-sm font-medium px-4 py-2 rounded-lg transition-all hover:-translate-y-0.5"
            >
              <User className="h-4 w-4" /> Login
            </Link>
          )}

          <AiAssistant />

          <button
            onClick={() => setMobileOpen(v => !v)}
            className="md:hidden p-2 rounded-lg hover:bg-white/5 transition-colors"
          >
            {mobileOpen
              ? <X className="h-5 w-5 text-gray-400" />
              : <Menu className="h-5 w-5 text-gray-400" />
            }
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-white/5 bg-black/60 backdrop-blur-xl overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center px-3 py-3 rounded-xl text-gray-300 hover:text-white hover:bg-white/5 text-sm font-medium transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              {!user && (
                <Link
                  to="/login"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 mt-2 bg-purple-600 hover:bg-purple-500 text-white text-sm font-medium px-4 py-3 rounded-xl transition-colors"
                >
                  <User className="h-4 w-4" /> Sign In / Sign Up
                </Link>
              )}
              {user && (
                <div className="pt-2 border-t border-white/5">
                  <Link to="/profile" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 px-3 py-3 rounded-xl text-gray-300 hover:text-white hover:bg-white/5 text-sm transition-colors">
                    <User className="h-4 w-4" /> Profile
                  </Link>
                  <Link to="/orders" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 px-3 py-3 rounded-xl text-gray-300 hover:text-white hover:bg-white/5 text-sm transition-colors">
                    <Package className="h-4 w-4" /> Orders
                  </Link>
                  <button onClick={() => { handleSignOut(); setMobileOpen(false); }} className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-red-400 hover:bg-red-500/10 text-sm transition-colors">
                    <LogOut className="h-4 w-4" /> Sign Out
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {profileOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setProfileOpen(false)} />
      )}
    </nav>
  );
}

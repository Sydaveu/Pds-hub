import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, Eye, EyeOff, Loader2 } from 'lucide-react';
import { useAuth } from '../lib/auth';

export function Login() {
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as any)?.from?.pathname || '/home';

  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    if (mode === 'login') {
      const { error } = await signIn(email, password);
      if (error) {
        setError(error);
      } else {
        navigate(from, { replace: true });
      }
    } else {
      if (username.length < 3) {
        setError('Username must be at least 3 characters');
        setLoading(false);
        return;
      }
      const { error } = await signUp(email, password, username);
      if (error) {
        setError(error);
      } else {
        setSuccess('Account created! You can now explore the marketplace.');
        setTimeout(() => navigate(from, { replace: true }), 1500);
      }
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.15),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(251,191,36,0.08),transparent_60%)]" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        <div className="glass rounded-2xl border border-purple-500/20 shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-br from-purple-600 to-indigo-900 px-8 py-10 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-4">
              <span className="text-3xl">🌾</span>
            </div>
            <h1 className="text-2xl font-bold text-white">PDS Agri-Hub</h1>
            <p className="text-purple-200 text-sm mt-1">From Soil to Soul, Powered by Pi</p>
          </div>

          <div className="p-8">
            <div className="flex rounded-xl overflow-hidden border border-white/10 mb-8">
              {(['login', 'signup'] as const).map(m => (
                <button
                  key={m}
                  onClick={() => { setMode(m); setError(null); setSuccess(null); }}
                  className={`flex-1 py-2.5 text-sm font-medium transition-all duration-300 ${
                    mode === m
                      ? 'bg-purple-600 text-white shadow-lg'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {m === 'login' ? 'Sign In' : 'Sign Up'}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.form
                key={mode}
                initial={{ opacity: 0, x: mode === 'login' ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                onSubmit={handleSubmit}
                className="space-y-5"
              >
                {mode === 'signup' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Username</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                      <input
                        type="text"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        placeholder="Choose a username"
                        className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/30 transition-all"
                        required
                        minLength={3}
                        maxLength={20}
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/30 transition-all"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-12 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/30 transition-all"
                      required
                      minLength={6}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(v => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 text-sm text-red-400"
                    >
                      {error}
                    </motion.div>
                  )}
                  {success && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="bg-green-500/10 border border-green-500/30 rounded-xl px-4 py-3 text-sm text-green-400"
                    >
                      {success}
                    </motion.div>
                  )}
                </AnimatePresence>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-purple-600 hover:bg-purple-500 disabled:opacity-60 text-white font-semibold py-3 rounded-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-purple-500/25 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <><Loader2 className="h-4 w-4 animate-spin" /> {mode === 'login' ? 'Signing in...' : 'Creating account...'}</>
                  ) : (
                    mode === 'login' ? 'Sign In' : 'Create Account'
                  )}
                </button>
              </motion.form>
            </AnimatePresence>

            <p className="mt-6 text-center text-sm text-gray-500">
              {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
              <button
                onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setError(null); }}
                className="text-purple-400 hover:text-purple-300 font-medium transition-colors"
              >
                {mode === 'login' ? 'Sign Up' : 'Sign In'}
              </button>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

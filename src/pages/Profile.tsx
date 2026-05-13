import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Edit2, Upload, LogOut, Package, Settings, Bell, Shield, Camera } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../lib/auth';

type Tab = 'overview' | 'orders' | 'settings';

const AVATAR_OPTIONS = [
  { emoji: '👨‍🌾', label: 'Farmer' },
  { emoji: '🌾', label: 'Wheat' },
  { emoji: '🥬', label: 'Veggie' },
  { emoji: '🐄', label: 'Cow' },
  { emoji: '🐔', label: 'Poultry' },
  { emoji: '🐟', label: 'Fish' },
  { emoji: '🍯', label: 'Honey' },
  { emoji: '🌱', label: 'Seedling' },
];

export function Profile() {
  const { user, signOut, updateProfile } = useAuth();
  const navigate = useNavigate();
  const fileRef = useRef<HTMLInputElement>(null);
  const [tab, setTab] = useState<Tab>('overview');
  const [editMode, setEditMode] = useState(false);
  const [username, setUsername] = useState(user?.username || '');
  const [saving, setSaving] = useState(false);
  const [savedMsg, setSavedMsg] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState('👨‍🌾');

  const handleSignOut = async () => {
    await signOut();
    navigate('/home');
  };

  const handleSave = async () => {
    if (username.length < 3) return;
    setSaving(true);
    const { error } = await updateProfile({ username });
    setSaving(false);
    if (!error) {
      setSavedMsg('Profile saved!');
      setEditMode(false);
      setTimeout(() => setSavedMsg(''), 2500);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith('image/')) return;
    if (file.size > 5 * 1024 * 1024) { alert('Max 5MB'); return; }
    const reader = new FileReader();
    reader.onloadend = async () => {
      await updateProfile({ avatarUrl: reader.result as string });
    };
    reader.readAsDataURL(file);
  };

  if (!user) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center space-y-4">
        <User className="h-12 w-12 text-gray-500" />
        <h2 className="text-2xl font-bold text-white">Not Logged In</h2>
        <Link to="/login" className="bg-purple-600 hover:bg-purple-500 text-white font-semibold py-3 px-8 rounded-xl transition-all">
          Sign In
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8 py-6 max-w-4xl mx-auto">
      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card rounded-2xl border border-purple-500/10 p-8 text-center relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.08),transparent_70%)]" />
        <div className="relative">
          <div className="relative inline-block mb-4">
            {user.avatarUrl ? (
              <img src={user.avatarUrl} alt={user.username}
                className="w-24 h-24 rounded-full object-cover border-4 border-purple-500/30 mx-auto"
                onError={e => { (e.target as HTMLImageElement).src = ''; }} />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-600 to-indigo-800 flex items-center justify-center text-4xl border-4 border-purple-500/30 mx-auto">
                {selectedEmoji}
              </div>
            )}
            <button
              onClick={() => fileRef.current?.click()}
              className="absolute bottom-0 right-0 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center border-2 border-gray-900 hover:bg-purple-500 transition-colors"
            >
              <Camera className="h-3.5 w-3.5 text-white" />
            </button>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
          </div>

          <h1 className="text-2xl font-bold text-white">{user.username}</h1>
          <p className="text-gray-400 text-sm mt-1">{user.email}</p>

          {savedMsg && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-green-400 text-sm mt-2">{savedMsg}</motion.p>
          )}

          <div className="flex items-center justify-center gap-3 mt-5">
            <button
              onClick={() => setEditMode(v => !v)}
              className="flex items-center gap-2 border border-purple-500/40 hover:border-purple-500 text-purple-400 hover:text-white text-sm font-medium py-2 px-4 rounded-xl transition-all"
            >
              <Edit2 className="h-3.5 w-3.5" /> {editMode ? 'Cancel' : 'Edit Profile'}
            </button>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 border border-white/10 hover:border-red-500/40 text-gray-400 hover:text-red-400 text-sm font-medium py-2 px-4 rounded-xl transition-all"
            >
              <LogOut className="h-3.5 w-3.5" /> Sign Out
            </button>
          </div>
        </div>
      </motion.div>

      {/* Edit Form */}
      <AnimatePresence>
        {editMode && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="glass-card rounded-2xl border border-purple-500/10 p-6 space-y-6">
              <h3 className="text-white font-semibold">Edit Profile</h3>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500 transition-all"
                  minLength={3} maxLength={20}
                />
                {username.length < 3 && username.length > 0 && (
                  <p className="text-red-400 text-xs mt-1">Username must be at least 3 characters</p>
                )}
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-3">Choose Avatar Emoji</label>
                <div className="flex flex-wrap gap-2">
                  {AVATAR_OPTIONS.map(opt => (
                    <button
                      key={opt.emoji}
                      onClick={() => setSelectedEmoji(opt.emoji)}
                      className={`w-12 h-12 rounded-xl text-2xl transition-all ${
                        selectedEmoji === opt.emoji ? 'bg-purple-600/30 border-2 border-purple-500' : 'bg-white/5 border-2 border-white/10 hover:border-purple-500/50'
                      }`}
                      title={opt.label}
                    >
                      {opt.emoji}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">Upload Photo</label>
                <button
                  onClick={() => fileRef.current?.click()}
                  className="flex items-center gap-2 border border-dashed border-white/20 hover:border-purple-500/50 text-gray-400 hover:text-white text-sm py-3 px-4 rounded-xl transition-all w-full justify-center"
                >
                  <Upload className="h-4 w-4" /> Click to upload (max 5MB)
                </button>
              </div>

              <div className="flex justify-end gap-3">
                <button onClick={() => setEditMode(false)} className="text-gray-400 hover:text-white text-sm px-4 py-2 rounded-xl transition-colors">Cancel</button>
                <button
                  onClick={handleSave}
                  disabled={saving || username.length < 3}
                  className="bg-purple-600 hover:bg-purple-500 disabled:opacity-60 text-white font-medium py-2 px-6 rounded-xl transition-all"
                >
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tabs */}
      <div className="flex gap-1 bg-white/3 p-1 rounded-xl border border-white/5">
        {([
          { id: 'overview', label: 'Overview', icon: User },
          { id: 'orders', label: 'Orders', icon: Package },
          { id: 'settings', label: 'Settings', icon: Settings },
        ] as const).map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all ${
              tab === id ? 'bg-purple-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'
            }`}
          >
            <Icon className="h-4 w-4" /> <span className="hidden sm:block">{label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        {tab === 'overview' && (
          <motion.div key="overview" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid sm:grid-cols-2 gap-6">
            <div className="glass-card rounded-2xl border border-white/5 p-6">
              <h3 className="text-white font-semibold mb-4">Account Info</h3>
              <div className="space-y-3">
                {[
                  { label: 'Username', value: user.username },
                  { label: 'Email', value: user.email },
                  { label: 'Member Since', value: new Date().toLocaleDateString('en-GB', { month: 'long', year: 'numeric' }) },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between items-center py-2 border-b border-white/5 last:border-0">
                    <span className="text-gray-400 text-sm">{label}</span>
                    <span className="text-white text-sm font-medium truncate max-w-[140px]">{value}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="glass-card rounded-2xl border border-white/5 p-6">
              <h3 className="text-white font-semibold mb-4">Quick Links</h3>
              <div className="space-y-2">
                <Link to="/marketplace" className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 text-gray-300 hover:text-white text-sm transition-colors">
                  🛒 Browse Marketplace
                </Link>
                <Link to="/orders" className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 text-gray-300 hover:text-white text-sm transition-colors">
                  <Package className="h-4 w-4 text-purple-400" /> View My Orders
                </Link>
                <Link to="/cart" className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 text-gray-300 hover:text-white text-sm transition-colors">
                  🛒 View Cart
                </Link>
              </div>
            </div>
          </motion.div>
        )}

        {tab === 'orders' && (
          <motion.div key="orders" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="glass-card rounded-2xl border border-white/5 p-6 text-center space-y-4">
              <Package className="h-12 w-12 text-purple-400 mx-auto" />
              <h3 className="text-white font-semibold">Order History</h3>
              <p className="text-gray-400 text-sm">View your complete order history and track deliveries.</p>
              <Link to="/orders" className="inline-block bg-purple-600 hover:bg-purple-500 text-white font-medium py-2.5 px-6 rounded-xl transition-all">
                View All Orders
              </Link>
            </div>
          </motion.div>
        )}

        {tab === 'settings' && (
          <motion.div key="settings" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <div className="glass-card rounded-2xl border border-white/5 p-6">
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2"><Bell className="h-4 w-4 text-purple-400" /> Notifications</h3>
              <div className="space-y-3">
                {[
                  { label: 'Order Updates', desc: 'Status changes and delivery alerts', enabled: true },
                  { label: 'Promotions', desc: 'Special deals and discounts', enabled: false },
                  { label: 'Newsletter', desc: 'Monthly farming tips', enabled: true },
                ].map(({ label, desc, enabled }) => (
                  <div key={label} className="flex items-center justify-between p-3 rounded-xl bg-white/3">
                    <div>
                      <p className="text-white text-sm font-medium">{label}</p>
                      <p className="text-gray-500 text-xs">{desc}</p>
                    </div>
                    <div className={`w-9 h-5 rounded-full flex items-center px-0.5 transition-colors ${enabled ? 'bg-purple-600' : 'bg-white/10'}`}>
                      <div className={`w-4 h-4 bg-white rounded-full transition-transform ${enabled ? 'translate-x-4' : 'translate-x-0'}`} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="glass-card rounded-2xl border border-white/5 p-6">
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2"><Shield className="h-4 w-4 text-purple-400" /> Security</h3>
              <div className="space-y-3">
                {[
                  { label: 'Two-Factor Authentication', desc: 'Extra security for your account', enabled: false },
                  { label: 'Login Alerts', desc: 'Get notified on new device logins', enabled: true },
                ].map(({ label, desc, enabled }) => (
                  <div key={label} className="flex items-center justify-between p-3 rounded-xl bg-white/3">
                    <div>
                      <p className="text-white text-sm font-medium">{label}</p>
                      <p className="text-gray-500 text-xs">{desc}</p>
                    </div>
                    <div className={`w-9 h-5 rounded-full flex items-center px-0.5 transition-colors ${enabled ? 'bg-purple-600' : 'bg-white/10'}`}>
                      <div className={`w-4 h-4 bg-white rounded-full transition-transform ${enabled ? 'translate-x-4' : 'translate-x-0'}`} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-center pt-2">
              <button
                onClick={handleSignOut}
                className="flex items-center gap-2 border border-red-500/30 hover:border-red-500/60 text-red-400 hover:text-red-300 font-medium py-2.5 px-8 rounded-xl transition-all"
              >
                <LogOut className="h-4 w-4" /> Sign Out of Account
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Edit2, Upload, Image, Settings, MessageCircle, LayoutDashboard } from 'lucide-react';

interface UserProfile {
  id: string;
  username: string;
  email: string;
  avatarUrl: string | null;
  animatedAvatar: string | null;
  memberSince: string;
  totalOrders: number;
  totalSpent: number;
  preferredCategory: string | null;
}

// Mock user data - in real app from Supabase/localStorage
const mockUser: UserProfile = {
  id: 'user_123',
  username: 'FarmExpert2024',
  email: 'user@example.com',
  avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
  animatedAvatar: null,
  memberSince: 'March 2024',
  totalOrders: 15,
  totalSpent: 320,
  preferredCategory: 'Vegetables'
};

export function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserProfile>(mockUser);
  const [editMode, setEditMode] = useState(false);
  const [selectedTab, setSelectedTab] = useState<'overview' | 'orders' | 'settings'>('overview');
  const [isUploading, setIsUploading] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [animatedAvatarOptions, setAnimatedAvatarOptions] = useState<string[]>([]);

  useEffect(() => {
    // Load animated avatar options (in real app from API)
    setAnimatedAvatarOptions([
      'https://raw.githubusercontent.com/lottiefiles/lottiefiles/master/examples/json/18397-farmer.json',
      'https://raw.githubusercontent.com/lottiefiles/lottiefiles/master/examples/json/18398-tractor.json',
      'https://raw.githubusercontent.com/lottiefiles/lottiefiles/master/examples/json/18399-crop.json',
      'https://raw.githubusercontent.com/lottiefiles/lottiefiles/master/examples/json/18400-cow.json',
      'https://raw.githubusercontent.com/lottiefiles/lottiefiles/master/examples/json/18401-chicken.json'
    ]);
  }, []);

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }
    
    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      alert('File size too large. Maximum 5MB allowed.');
      return;
    }
    
    setIsUploading(true);
    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarPreview(reader.result as string);
      setIsUploading(false);
      // In real app: upload to storage and update user.avatarUrl
      setTimeout(() => {
        setUser(prev => ({ ...prev, avatarUrl: reader.result as string }));
        setAvatarPreview(null);
      }, 1000);
    };
    reader.readAsDataURL(file);
  };

  const handleAnimatedAvatarSelect = (url: string) => {
    setUser(prev => ({ ...prev, animatedAvatar: url }));
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser(prev => ({ ...prev, username: e.target.value }));
  };

  const handleSaveProfile = () => {
    setEditMode(false);
    // In real app: save to Supabase
    alert('Profile saved successfully!');
  };

  const handleLogout = () => {
    // In real app: clear session and redirect to login
    navigate('/');
  };

  return (
    <div className="space-y-8">
      {/* Profile Header */}
      <div className="flex flex-col items-center gap-6 text-center py-12">
        <div className="relative w-24 h-24">
          {user.avatarUrl ? (
            <img 
              src={user.avatarUrl} 
              alt={`${user.username}'s avatar`} 
              className="w-full h-full object-cover rounded-full border-4 border-pi-pulse/20"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80';
              }}
            />
          ) : (
            <div className="w-full h-full bg-muted/50 flex items-center justify-center rounded-full">
              <User className="h-8 w-8 text-muted-foreground" />
            </div>
          )}
          {!editMode && (
            <div className="absolute bottom-0 right-0 w-8 h-8 bg-pi-pulse rounded-full flex items-center justify-center text-xs font-bold text-white shadow-lg ring-2 ring-background">
              <Edit2 className="h-4 w-4" />
            </div>
          )}
        </div>
        
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">
          {user.username}
        </h1>
        
        <p className="text-muted-foreground">
          {user.email}
        </p>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setEditMode(!editMode)}
            className={editMode ? 
              'bg-pi-purple hover:bg-pi-purple/90 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300' : 
              'border border-pi-pulse/50 hover:border-pi-pulse/100 text-pi-purple hover:bg-pi-purple/10 py-2 px-4 rounded-lg transition-colors duration-300'
            }
          >
            {editMode ? 'Save' : 'Edit Profile'}
          </button>
          
          <button 
            onClick={handleLogout}
            className="text-muted-foreground hover:text-destructive hover:underline"
          >
            Log Out
          </button>
        </div>
      </div>

      {/* Edit Mode Form */}
      {editMode && (
        <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6">
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-6">
              <div className="space-y-4">
                <label htmlFor="username" className="block text-sm font-medium text-muted-foreground">
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  value={user.username}
                  onChange={handleUsernameChange}
                  className="w-full px-4 py-3 bg-muted/50 border border-muted/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-pi-purple/20"
                  required
                  minLength={3}
                  maxLength={20}
                />
                {user.username.length < 3 && (
                  <p className="text-xs text-destructive mt-1">
                    Username must be at least 3 characters
                  </p>
                )}
              </div>
              
              <div className="space-y-4">
                <label htmlFor="avatarUpload" className="block text-sm font-medium text-muted-foreground">
                  Profile Picture
                </label>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Upload className="h-4 w-4 text-muted-foreground" />
                    <span>Upload new avatar</span>
                  </div>
                  <input
                    id="avatarUpload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleAvatarUpload}
                  />
                  {isUploading && (
                    <div className="flex items-center justify-center">
                      <div className="h-4 w-4 animate-pulse bg-pi-pulse" />
                      <span className="ml-2 text-sm text-pi-pulse">Uploading...</span>
                    </div>
                  )}
                  {avatarPreview && (
                    <div className="mt-3">
                      <p className="text-xs text-muted-foreground mb-1">Preview:</p>
                      <img 
                        src={avatarPreview} 
                        alt="Avatar preview" 
                        className="w-24 h-24 object-cover rounded-lg border-2 border-pi-pulse"
                      />
                    </div>
                  )}
                </div>
              </div>
              
              <div className="space-y-4">
                <label htmlFor="animatedAvatar" className="block text-sm font-medium text-muted-foreground">
                  Animated Avatar (Lottie)
                </label>
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-3">
                    {animatedAvatarOptions.map((url, index) => (
                      <div 
                        key={index} 
                        className={`relative w-20 h-20 cursor-pointer 
                          ${user.animatedAvatar === url ? 'border-2 border-pi-pulse' : ''}
                          hover:border-pi-pulse/50`}
                        onClick={() => handleAnimatedAvatarSelect(url)}
                      >
                        {/* In real app: show Lottie animation preview */}
                        <div className="w-full h-full bg-muted/50 flex items-center justify-center rounded-lg overflow-hidden">
                          <Image className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-center text-xs text-white">
                          Option {index + 1}
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Select an animated avatar for your profile
                  </p>
                </div>
              </div>
              
              <div className="flex justify-end pt-4">
                <button 
                  type="button"
                  onClick={() => setEditMode(false)}
                  className="mr-4 text-muted-foreground hover:text-foreground hover:underline"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  onClick={handleSaveProfile}
                  className="bg-pi-purple hover:bg-pi-purple/90 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300 hover:-translate-y-1"
                >
                  Save Changes
                </button>
              </div>
            </div>
            </form>
          </div>
        )}
        
      {/* Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        <button 
          onClick={() => setSelectedTab('overview')}
          className={selectedTab === 'overview' ? 
            'bg-pi-purple hover:bg-pi-purple/90 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300' : 
            'border border-pi-pulse/50 hover:border-pi-pulse/100 text-pi-purple hover:bg-pi-purple/10 py-2 px-4 rounded-lg transition-colors duration-300'
          }
        >
          Overview
        </button>
        <button 
          onClick={() => setSelectedTab('orders')}
          className={selectedTab === 'orders' ? 
            'bg-pi-purple hover:bg-pi-purple/90 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300' : 
            'border border-pi-pulse/50 hover:border-pi-pulse/100 text-pi-purple hover:bg-pi-purple/10 py-2 px-4 rounded-lg transition-colors duration-300'
          }
        >
          Orders
        </button>
        <button 
          onClick={() => setSelectedTab('settings')}
          className={selectedTab === 'settings' ? 
            'bg-pi-purple hover:bg-pi-purple/90 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300' : 
            'border border-pi-pulse/50 hover:border-pi-pulse/100 text-pi-purple hover:bg-pi-purple/10 py-2 px-4 rounded-lg transition-colors duration-300'
          }
        >
          Settings
        </button>
      </div>

      {/* Tab Content */}
      {selectedTab === 'overview' && (
        <div className="grid gap-6 md:grid-cols-2">
          <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6">
            <h3 className="font-semibold text-lg mb-4">Account Statistics</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-lg">
                <span className="text-muted-foreground">Member Since</span>
                <span className="font-medium text-foreground">{user.memberSince}</span>
              </div>
              <div className="flex justify-between items-center text-lg">
                <span className="text-muted-foreground">Total Orders</span>
                <span className="text-2xl font-bold text-pi-purple">{user.totalOrders}</span>
              </div>
              <div className="flex justify-between items-center text-lg">
                <span className="text-muted-foreground">Total Spent</span>
                <span className="text-2xl font-bold text-pi-purple">{user.totalSpent}π</span>
              </div>
              <div className="flex justify-between items-center text-lg">
                <span className="text-muted-foreground">Preferred Category</span>
                <span className="font-medium text-foreground">
                  {user.preferredCategory || 'Not set'}
                </span>
              </div>
            </div>
          </div>
          
          <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6">
            <h3 className="font-semibold text-lg mb-4">Recent Activity</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                <MessageCircle className="h-4 w-4 text-pi-pulse" />
                <div className="flex-1">
                  <p className="font-medium text-foreground">Order #PDS-7890 delivered</p>
                  <p className="text-xs text-muted-foreground">2 hours ago • 5π</p>
                </div>
                <div className="text-pi-pulse text-xs">
                  Delivered
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                <LayoutDashboard className="h-4 w-4 text-pi-pulse" />
                <div className="flex-1">
                  <p className="font-medium text-foreground">Bought 2x Premium Rice</p>
                  <p className="text-xs text-muted-foreground">4 hours ago • 30π</p>
                </div>
                <div className="text-pi-pulse text-xs">
                  Completed
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                <Settings className="h-4 w-4 text-pi-pulse" />
                <div className="flex-1">
                  <p className="font-medium text-foreground">Updated profile picture</p>
                  <p className="text-xs text-muted-foreground">6 hours ago</p>
                </div>
                <div className="text-pi-pulse text-xs">
                  Updated
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {selectedTab === 'orders' && (
        <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6">
          <h3 className="font-semibold text-lg mb-4">Order History</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-muted/50 rounded-lg">
              <div className="flex-1 space-y-1">
                <p className="font-medium text-foreground">Order #PDS-7890</p>
                <p className="text-xs text-muted-foreground">Delivered • Jun 12, 2024</p>
              </div>
              <div className="text-right space-y-1">
                <p className="font-medium text-pi-purple">30π</p>
                <p className="text-xs text-muted-foreground">2 items</p>
              </div>
            </div>
            <div className="flex justify-between items-center p-4 bg-muted/50 rounded-lg">
              <div className="flex-1 space-y-1">
                <p className="font-medium text-foreground">Order #PDS-7889</p>
                <p className="text-xs text-muted-foreground">Processing • Jun 10, 2024</p>
              </div>
              <div className="text-right space-y-1">
                <p className="font-medium text-pi-purple">45π</p>
                <p className="text-xs text-muted-foreground">3 items</p>
              </div>
            </div>
            <div className="flex justify-between items-center p-4 bg-muted/50 rounded-lg">
              <div className="flex-1 space-y-1">
                <p className="font-medium text-foreground">Order #PDS-7888</p>
                <p className="text-xs text-muted-foreground">Delivered • Jun 8, 2024</p>
              </div>
              <div className="text-right space-y-1">
                <p className="font-medium text-pi-purple">22π</p>
                <p className="text-xs text-muted-foreground">1 item</p>
              </div>
            </div>
          </div>
          <div className="mt-4 text-center">
            <Link 
              to="/orders" 
              className="text-pi-purple hover:text-pi-purple/90 font-medium"
            >
              View All Orders
            </Link>
          </div>
        </div>
      )}
      
      {selectedTab === 'settings' && (
        <div className="space-y-6">
          <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6">
            <h3 className="font-semibold text-lg mb-4">Notifications</h3>
            <div className="space-y-4">
              <label className="flex items-center justify-between p-3 bg-muted/50 rounded-lg cursor-pointer">
                <div className="flex-1">
                  <p className="font-medium text-foreground">Order Updates</p>
                  <p className="text-xs text-muted-foreground">Get notified when your order status changes</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-pi-pulse/20 rounded-full flex items-center justify-center">
                    <span className="text-pi-pulse">●</span>
                  </div>
                  <span className="text-xs text-pi-pulse">Enabled</span>
                </div>
              </label>
              <label className="flex items-center justify-between p-3 bg-muted/50 rounded-lg cursor-pointer">
                <div className="flex-1">
                  <p className="font-medium text-foreground">Promotional Offers</p>
                  <p className="text-xs text-muted-foreground">Receive special deals and discounts</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-muted/50 rounded-full flex items-center justify-center">
                    <span className="text-pi-pulse">○</span>
                  </div>
                  <span className="text-xs text-muted-foreground">Disabled</span>
                </div>
              </label>
              <label className="flex items-center justify-between p-3 bg-muted/50 rounded-lg cursor-pointer">
                <div className="flex-1">
                  <p className="font-medium text-foreground">Newsletter</p>
                  <p className="text-xs text-muted-foreground">Monthly updates and farming tips</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-pi-pulse/20 rounded-full flex items-center justify-center">
                    <span className="text-pi-pulse">●</span>
                  </div>
                  <span className="text-xs text-pi-pulse">Enabled</span>
                </div>
              </label>
            </div>
          </div>
          
          <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6">
            <h3 className="font-semibold text-lg mb-4">Privacy & Security</h3>
            <div className="space-y-4">
              <label className="flex items-center justify-between p-3 bg-muted/50 rounded-lg cursor-pointer">
                <div className="flex-1">
                  <p className="font-medium text-foreground">Two-Factor Authentication</p>
                  <p className="text-xs text-muted-foreground">Extra security for your account</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-muted/50 rounded-full flex items-center justify-center">
                    <span className="text-pi-pulse">○</span>
                  </div>
                  <span className="text-xs text-muted-foreground">Disabled</span>
                </div>
              </label>
              <label className="flex items-center justify-between p-3 bg-muted/50 rounded-lg cursor-pointer">
                <div className="flex-1">
                  <p className="font-medium text-foreground">Login Alerts</p>
                  <p className="text-xs text-muted-foreground">Get alerted on new device logins</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-pi-pulse/20 rounded-full flex items-center justify-center">
                    <span className="text-pi-pulse">●</span>
                  </div>
                  <span className="text-xs text-pi-pulse">Enabled</span>
                </div>
              </label>
              <label className="flex items-center justify-between p-3 bg-muted/50 rounded-lg cursor-pointer">
                <div className="flex-1">
                  <p className="font-medium text-foreground">Data Export</p>
                  <p className="text-xs text-muted-foreground">Download your account data</p>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => alert('Data export initiated!')}
                    className="text-pi-purple hover:text-pi-purple/90 underline"
                  >
                    Export Data
                  </button>
                </div>
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
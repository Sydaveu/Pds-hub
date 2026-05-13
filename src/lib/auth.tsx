import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { supabase, isSupabaseConfigured } from './supabase';
import type { User, Session } from '@supabase/supabase-js';

interface AuthUser {
  id: string;
  email: string;
  username: string;
  avatarUrl: string | null;
}

interface AuthContextType {
  user: AuthUser | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signUp: (email: string, password: string, username: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
  updateProfile: (data: { username?: string; avatarUrl?: string }) => Promise<{ error: string | null }>;
}

const AuthContext = createContext<AuthContextType | null>(null);

function mapUser(supaUser: User, profile?: { username?: string; avatar_url?: string | null }): AuthUser {
  return {
    id: supaUser.id,
    email: supaUser.email ?? '',
    username: profile?.username ?? supaUser.email?.split('@')[0] ?? 'User',
    avatarUrl: profile?.avatar_url ?? null,
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) {
      const stored = localStorage.getItem('pds_mock_user');
      if (stored) {
        try { setUser(JSON.parse(stored)); } catch {}
      }
      setLoading(false);
      return;
    }

    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setSession(session);
      if (session?.user) {
        const profile = await fetchProfile(session.user.id);
        setUser(mapUser(session.user, profile ?? undefined));
      }
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);
      if (session?.user) {
        const profile = await fetchProfile(session.user.id);
        setUser(mapUser(session.user, profile ?? undefined));
      } else {
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchProfile = async (userId: string) => {
    if (!supabase) return null;
    const { data } = await supabase
      .from('profiles')
      .select('username, avatar_url')
      .eq('id', userId)
      .single();
    return data;
  };

  const signIn = async (email: string, password: string): Promise<{ error: string | null }> => {
    if (!isSupabaseConfigured || !supabase) {
      const mockUser: AuthUser = {
        id: 'mock-' + Date.now(),
        email,
        username: email.split('@')[0],
        avatarUrl: null,
      };
      setUser(mockUser);
      localStorage.setItem('pds_mock_user', JSON.stringify(mockUser));
      return { error: null };
    }

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error: error?.message ?? null };
  };

  const signUp = async (email: string, password: string, username: string): Promise<{ error: string | null }> => {
    if (!isSupabaseConfigured || !supabase) {
      const mockUser: AuthUser = { id: 'mock-' + Date.now(), email, username, avatarUrl: null };
      setUser(mockUser);
      localStorage.setItem('pds_mock_user', JSON.stringify(mockUser));
      return { error: null };
    }

    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) return { error: error.message };

    if (data.user) {
      await supabase.from('profiles').upsert({
        id: data.user.id,
        username,
        avatar_url: null,
        total_orders: 0,
        total_spent: 0,
      });
    }
    return { error: null };
  };

  const signOut = async () => {
    if (!isSupabaseConfigured || !supabase) {
      setUser(null);
      localStorage.removeItem('pds_mock_user');
      return;
    }
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
  };

  const updateProfile = async (data: { username?: string; avatarUrl?: string }): Promise<{ error: string | null }> => {
    if (!user) return { error: 'Not authenticated' };

    const updated = { ...user, ...data };
    setUser(updated);

    if (!isSupabaseConfigured || !supabase) {
      localStorage.setItem('pds_mock_user', JSON.stringify(updated));
      return { error: null };
    }

    const { error } = await supabase.from('profiles').update({
      username: data.username,
      avatar_url: data.avatarUrl,
    }).eq('id', user.id);
    return { error: error?.message ?? null };
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, signIn, signUp, signOut, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

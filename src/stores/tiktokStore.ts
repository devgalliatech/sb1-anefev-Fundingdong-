import { create } from 'zustand';

interface TikTokUser {
  id: string;
  username: string;
  displayName: string;
  avatarUrl: string;
}

interface TikTokStore {
  isAuthenticated: boolean;
  user: TikTokUser | null;
  loading: boolean;
  error: string | null;
  setUser: (user: TikTokUser) => void;
  setAuthenticated: (status: boolean) => void;
  setLoading: (status: boolean) => void;
  setError: (error: string | null) => void;
  logout: () => void;
}

export const useTikTokStore = create<TikTokStore>((set) => ({
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
  setUser: (user) => set({ user }),
  setAuthenticated: (status) => set({ isAuthenticated: status }),
  setLoading: (status) => set({ loading: status }),
  setError: (error) => set({ error }),
  logout: () => set({ isAuthenticated: false, user: null, error: null }),
}));
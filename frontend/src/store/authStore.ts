import { create } from 'zustand';

interface AuthState {
  user: { name: string; role: 'user' | 'admin' } | null;
  isAuthenticated: boolean;
  login: (name: string, role: 'user' | 'admin') => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  login: (name, role) => set({ user: { name, role }, isAuthenticated: true }),
  logout: () => set({ user: null, isAuthenticated: false }),
}));

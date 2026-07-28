import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  accessToken: string | null;
  login: (user: User, token: string) => void;
  logout: () => void;
  updateUser: (data: Partial<User>) => void;
  _hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      accessToken: null,
      login: (user, token) => set({ user, isAuthenticated: true, accessToken: token }),
      logout: () => set({ user: null, isAuthenticated: false, accessToken: null }),
      updateUser: (data) => set((state) => ({ user: state.user ? { ...state.user, ...data } : null })),
      _hasHydrated: false,
      setHasHydrated: (state) => set({ _hasHydrated: state }),
    }),
    {
      name: 'trip-auth-storage',
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      }
    }
  )
);

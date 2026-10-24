import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

export interface Order {
  id: string;
  date: string;
  items: number;
  products?: { id: number; name: string; quantity: number; price: string }[];
  pointsEarned?: number;
  total: string;
  status: string;
}

export interface RewardRedemption {
  id: string;
  name: string;
  points: number;
  date: string;
}

export interface RecyclingPickup {
  id: string;
  materials: string[];
  date: string;
  status: string;
  orderId?: string;
}

interface User {
  name: string;
  email: string;
  points: number;
  joinedDate: string;
  orders: Order[];
  redemptions: RewardRedemption[];
  pickups: RecyclingPickup[];
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  favorites: number[];
  login: (email: string, password: string) => void;
  register: (name: string, email: string, password: string) => void;
  addPoints: (points: number) => void;
  redeemPoints: (name: string, points: number) => void;
  addOrder: (order: Order) => void;
  addPickup: (materials: string[]) => void;
  attachPendingPickups: (orderId: string) => void;
  toggleFavorite: (productId: number) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

const makeUser = (name: string, email: string, points: number): User => ({
  name,
  email,
  points,
  joinedDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
  orders: [],
  redemptions: [],
  pickups: [],
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [favorites, setFavorites] = useState<number[]>([]);

  const login = (email: string, _password: string) => {
    // TODO: connect to Django backend
    setUser(makeUser(email.split('@')[0], email, 1250));
  };

  const register = (name: string, email: string, _password: string) => {
    // TODO: connect to Django backend
    setUser(makeUser(name, email, 100));
  };

  const logout = () => setUser(null);
  const addPoints = (points: number) => {
    setUser((currentUser) => currentUser ? { ...currentUser, points: currentUser.points + points } : currentUser);
  };

  const redeemPoints = (name: string, points: number) => {
    setUser((currentUser) => currentUser && currentUser.points >= points
      ? {
          ...currentUser,
          points: currentUser.points - points,
          redemptions: [{ id: `RW-${Date.now()}`, name, points, date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) }, ...currentUser.redemptions],
        }
      : currentUser);
  };

  const addOrder = (order: Order) => {
    setUser((currentUser) => currentUser
      ? { ...currentUser, orders: [order, ...currentUser.orders] }
      : currentUser);
  };

  const addPickup = (materials: string[]) => {
    setUser((currentUser) => currentUser
      ? {
          ...currentUser,
          pickups: [{
            id: `RP-${Date.now().toString(36).toUpperCase()}`,
            materials,
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            status: 'Awaiting next order delivery',
          }, ...currentUser.pickups],
        }
      : currentUser);
  };

  const attachPendingPickups = (orderId: string) => {
    setUser((currentUser) => currentUser
      ? {
          ...currentUser,
          pickups: currentUser.pickups.map((pickup) => pickup.status === 'Awaiting next order delivery'
            ? { ...pickup, status: 'Scheduled with order delivery', orderId }
            : pickup),
        }
      : currentUser);
  };

  const toggleFavorite = (productId: number) => {
    setFavorites((current) => current.includes(productId)
      ? current.filter((id) => id !== productId)
      : [...current, productId]);
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn: !!user, favorites, login, register, addPoints, redeemPoints, addOrder, addPickup, attachPendingPickups, toggleFavorite, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

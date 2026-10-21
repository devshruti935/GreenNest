import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

export interface Order {
  id: string;
  date: string;
  items: number;
  total: string;
  status: string;
}

interface User {
  name: string;
  email: string;
  points: number;
  joinedDate: string;
  orders: Order[];
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => void;
  register: (name: string, email: string, password: string) => void;
  addPoints: (points: number) => void;
  redeemPoints: (points: number) => void;
  addOrder: (order: Order) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, _password: string) => {
    // TODO: connect to Django backend
    setUser({
      name: email.split('@')[0],
      email,
      points: 1250,
      joinedDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      orders: [],
    });
  };

  const register = (name: string, email: string, _password: string) => {
    // TODO: connect to Django backend
    setUser({
      name,
      email,
      points: 100, // Welcome bonus
      joinedDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      orders: [],
    });
  };

  const logout = () => setUser(null);

  const addPoints = (points: number) => {
    setUser((currentUser) => currentUser ? { ...currentUser, points: currentUser.points + points } : currentUser);
  };

  const redeemPoints = (points: number) => {
    setUser((currentUser) => currentUser && currentUser.points >= points
      ? { ...currentUser, points: currentUser.points - points }
      : currentUser);
  };

  const addOrder = (order: Order) => {
    setUser((currentUser) => currentUser
      ? { ...currentUser, orders: [order, ...currentUser.orders] }
      : currentUser);
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn: !!user, login, register, addPoints, redeemPoints, addOrder, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

interface User {
  name: string;
  email: string;
  points: number;
  joinedDate: string;
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => void;
  register: (name: string, email: string, password: string) => void;
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
      joinedDate: 'October 2024',
    });
  };

  const register = (name: string, email: string, _password: string) => {
    // TODO: connect to Django backend
    setUser({
      name,
      email,
      points: 100, // Welcome bonus
      joinedDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
    });
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, isLoggedIn: !!user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import { useAuth } from './AuthContext';

export const MAX_QUANTITY_PER_PRODUCT = 10;

export interface CartItem {
  id: number;
  name: string;
  price: string;
  image: string;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};

const parsePrice = (price: string): number => {
  return Number(price.replace(/[₹,]/g, ''));
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const { isLoggedIn } = useAuth();
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    if (!isLoggedIn) {
      alert('Please log in before adding items to the cart');
      return;
    }
    const existing = items.find(i => i.id === item.id);
    if (existing && existing.quantity >= MAX_QUANTITY_PER_PRODUCT) {
      alert(`You can add up to ${MAX_QUANTITY_PER_PRODUCT} of each product.`);
      return;
    }
    setItems(prev => existing
      ? prev.map(i => i.id === item.id ? { ...i, quantity: Math.min(i.quantity + 1, MAX_QUANTITY_PER_PRODUCT) } : i)
      : [...prev, { ...item, quantity: 1 }]);
  };

  const removeFromCart = (id: number) => {
    setItems(prev => prev.filter(i => i.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    const limitedQuantity = Math.min(Math.floor(quantity), MAX_QUANTITY_PER_PRODUCT);
    if (quantity > MAX_QUANTITY_PER_PRODUCT) alert(`You can add up to ${MAX_QUANTITY_PER_PRODUCT} of each product.`);
    setItems(prev => prev.map(i => (i.id === id ? { ...i, quantity: limitedQuantity } : i)));
  };

  const clearCart = () => setItems([]);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce(
    (sum, i) => sum + parsePrice(i.price) * i.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
};

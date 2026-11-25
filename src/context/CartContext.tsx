import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { MenuItem } from '../data/menu';
import { CartLineItem } from '../utils/whatsapp';

const CART_STORAGE_KEY = 'cake_world_cart_v1';

interface CartContextValue {
  items: CartLineItem[];
  totalItems: number;
  subtotal: number;
  addItem: (item: MenuItem, quantity?: number) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  incrementItem: (itemId: string) => void;
  decrementItem: (itemId: string) => void;
  removeItem: (itemId: string) => void;
  clearCart: () => void;
  getItemQuantity: (itemId: string) => number;
  lastAddedItem: string | null;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

function loadInitialCart(): CartLineItem[] {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (entry): entry is CartLineItem =>
        Boolean(entry) &&
        typeof entry.id === 'string' &&
        typeof entry.name === 'string' &&
        typeof entry.price === 'number' &&
        typeof entry.quantity === 'number' &&
        entry.quantity > 0
    );
  } catch {
    return [];
  }
}

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartLineItem[]>(loadInitialCart);
  const [lastAddedItem, setLastAddedItem] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Ignore storage quota errors gracefully
    }
  }, [items]);

  const addItem = (item: MenuItem, quantity = 1) => {
    const safeQty = Math.max(1, Math.floor(quantity));
    setItems((prev) => {
      const existing = prev.find((entry) => entry.id === item.id);
      if (existing) {
        return prev.map((entry) =>
          entry.id === item.id
            ? { ...entry, quantity: entry.quantity + safeQty }
            : entry
        );
      }
      return [
        ...prev,
        {
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: safeQty,
          image: item.image,
          isVeg: item.isVeg,
          categoryId: item.categoryId,
        },
      ];
    });
    setLastAddedItem(item.name);
  };

  useEffect(() => {
    if (!lastAddedItem) return;
    const timer = window.setTimeout(() => setLastAddedItem(null), 2200);
    return () => window.clearTimeout(timer);
  }, [lastAddedItem]);

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((entry) => entry.id !== itemId));
      return;
    }
    setItems((prev) =>
      prev.map((entry) => (entry.id === itemId ? { ...entry, quantity } : entry))
    );
  };

  const incrementItem = (itemId: string) => {
    setItems((prev) =>
      prev.map((entry) =>
        entry.id === itemId ? { ...entry, quantity: entry.quantity + 1 } : entry
      )
    );
  };

  const decrementItem = (itemId: string) => {
    setItems((prev) =>
      prev
        .map((entry) =>
          entry.id === itemId ? { ...entry, quantity: entry.quantity - 1 } : entry
        )
        .filter((entry) => entry.quantity > 0)
    );
  };

  const removeItem = (itemId: string) => {
    setItems((prev) => prev.filter((entry) => entry.id !== itemId));
  };

  const clearCart = () => {
    setItems([]);
  };

  const getItemQuantity = (itemId: string) => {
    return items.find((entry) => entry.id === itemId)?.quantity ?? 0;
  };

  const totalItems = useMemo(
    () => items.reduce((sum, entry) => sum + entry.quantity, 0),
    [items]
  );

  const subtotal = useMemo(
    () => items.reduce((sum, entry) => sum + entry.price * entry.quantity, 0),
    [items]
  );

  const value: CartContextValue = {
    items,
    totalItems,
    subtotal,
    addItem,
    updateQuantity,
    incrementItem,
    decrementItem,
    removeItem,
    clearCart,
    getItemQuantity,
    lastAddedItem,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return ctx;
}

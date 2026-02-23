import { create } from 'zustand';
import type { Language } from '@/i18n/translations';

export type Gender = 'female' | 'male';
export type ServiceCategory = 'hair' | 'nails' | 'makeup' | 'sugaring' | 'massage' | 'laser';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface KioskState {
  language: Language;
  gender: Gender | null;
  category: ServiceCategory | null;
  cartItems: CartItem[];
  cartTotal: number;
  setLanguage: (lang: Language) => void;
  setGender: (gender: Gender) => void;
  setCategory: (cat: ServiceCategory) => void;
  addToCart: (item: { id: string; name: string; price: number }) => void;
  removeFromCart: (id: string) => void;
  resetSession: () => void;
}

const calcTotal = (items: CartItem[]) => items.reduce((sum, i) => sum + i.price * i.quantity, 0);

export const useKioskStore = create<KioskState>((set) => ({
  language: 'DE',
  gender: null,
  category: null,
  cartItems: [],
  cartTotal: 0,
  setLanguage: (language) => set({ language }),
  setGender: (gender) => set({ gender }),
  setCategory: (category) => set({ category }),
  addToCart: (item) =>
    set((s) => {
      const existing = s.cartItems.find((ci) => ci.id === item.id);
      const newItems = existing
        ? s.cartItems.map((ci) => ci.id === item.id ? { ...ci, quantity: ci.quantity + 1 } : ci)
        : [...s.cartItems, { ...item, quantity: 1 }];
      return { cartItems: newItems, cartTotal: calcTotal(newItems) };
    }),
  removeFromCart: (id) =>
    set((s) => {
      const existing = s.cartItems.find((ci) => ci.id === id);
      if (!existing) return s;
      const newItems = existing.quantity > 1
        ? s.cartItems.map((ci) => ci.id === id ? { ...ci, quantity: ci.quantity - 1 } : ci)
        : s.cartItems.filter((ci) => ci.id !== id);
      return { cartItems: newItems, cartTotal: calcTotal(newItems) };
    }),
  resetSession: () => set({ gender: null, category: null, cartItems: [], cartTotal: 0, language: 'DE' }),
}));

import { create } from 'zustand';
import type { Language } from '@/i18n/translations';
import type { Master } from '@/data/mockMasters';

export type Gender = 'female' | 'male';
export type ServiceCategory = 'hair' | 'nails' | 'makeup' | 'sugaring' | 'massage' | 'laser';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface CustomerInfo {
  firstName: string;
  lastName: string;
  phone: string;
  email?: string;
}

interface KioskState {
  language: Language;
  gender: Gender | null;
  category: ServiceCategory | null;
  cartItems: CartItem[];
  cartTotal: number;
  selectedMaster: Master | null;
  customerInfo: CustomerInfo | null;
  setLanguage: (lang: Language) => void;
  setGender: (gender: Gender) => void;
  setCategory: (cat: ServiceCategory) => void;
  addToCart: (item: { id: string; name: string; price: number }) => void;
  removeFromCart: (id: string) => void;
  setSelectedMaster: (master: Master | null) => void;
  setCustomerInfo: (info: CustomerInfo) => void;
  resetSession: () => void;
}

const calcTotal = (items: CartItem[]) => items.reduce((sum, i) => sum + i.price * i.quantity, 0);

export const useKioskStore = create<KioskState>((set) => ({
  language: 'DE',
  gender: null,
  category: null,
  cartItems: [],
  cartTotal: 0,
  selectedMaster: null,
  customerInfo: null,
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
  setSelectedMaster: (master) => set({ selectedMaster: master }),
  setCustomerInfo: (info) => set({ customerInfo: info }),
  resetSession: () => set({ gender: null, category: null, cartItems: [], cartTotal: 0, language: 'DE', selectedMaster: null, customerInfo: null }),
}));

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
  type: 'service' | 'product' | 'drink';
  confirmed?: boolean;
}

export interface CustomerInfo {
  firstName: string;
  lastName: string;
  phone: string;
  email?: string;
}

export interface OrderHistoryItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  type: 'service' | 'product' | 'drink';
  date: string;
  confirmed: boolean;
  batchId: string;
}

export interface NoteItem {
  id: string;
  text: string;
  author: 'client' | 'master';
  date: string;
}

export interface BookingItem {
  id: string;
  category: ServiceCategory;
  date: string;
  time: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  createdAt: string;
}

interface KioskState {
  language: Language;
  gender: Gender | null;
  category: ServiceCategory | null;
  cartItems: CartItem[];
  cartTotal: number;
  selectedMaster: Master | null;
  customerInfo: CustomerInfo | null;
  isGuest: boolean;
  orderHistory: OrderHistoryItem[];
  notes: NoteItem[];
  bookings: BookingItem[];
  setLanguage: (lang: Language) => void;
  setGender: (gender: Gender) => void;
  setCategory: (cat: ServiceCategory) => void;
  addToCart: (item: { id: string; name: string; price: number; type: 'service' | 'product' | 'drink' }) => void;
  confirmCart: () => void;
  clearCart: () => void;
  removeFromCart: (id: string) => void;
  setSelectedMaster: (master: Master | null) => void;
  setCustomerInfo: (info: CustomerInfo) => void;
  setIsGuest: (val: boolean) => void;
  addToHistory: (item: Omit<OrderHistoryItem, 'date'>) => void;
  addNote: (text: string, author: 'client' | 'master') => void;
  deleteNote: (id: string) => void;
  addBooking: (booking: Omit<BookingItem, 'id' | 'createdAt'>) => void;
  cancelBooking: (id: string) => void;
  updateCustomerInfo: (info: Partial<CustomerInfo>) => void;
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
  isGuest: false,
  orderHistory: [],
  notes: [],
  bookings: [],
  setLanguage: (language) => set({ language }),
  setGender: (gender) => set({ gender }),
  setCategory: (category) => set({ category }),
  addToCart: (item) =>
    set((s) => {
      // Only match unconfirmed items for quantity increment
      const existing = s.cartItems.find((ci) => ci.id === item.id && !ci.confirmed);
      const newItems = existing
        ? s.cartItems.map((ci) => ci.id === item.id && !ci.confirmed ? { ...ci, quantity: ci.quantity + 1 } : ci)
        : [...s.cartItems, { ...item, quantity: 1 }];
      return { cartItems: newItems, cartTotal: calcTotal(newItems) };
    }),
  confirmCart: () =>
    set((s) => ({
      cartItems: s.cartItems.map((ci) => ci.confirmed ? ci : { ...ci, confirmed: true }),
    })),
  clearCart: () => set({ cartItems: [], cartTotal: 0 }),
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
  setIsGuest: (isGuest) => set({ isGuest }),
  addToHistory: (item) =>
    set((s) => ({
      orderHistory: [...s.orderHistory, { ...item, date: new Date().toISOString() }],
    })),
  addNote: (text, author) =>
    set((s) => ({
      notes: [...s.notes, { id: crypto.randomUUID(), text, author, date: new Date().toISOString() }],
    })),
  deleteNote: (id) =>
    set((s) => ({
      notes: s.notes.filter((n) => n.id !== id),
    })),
  addBooking: (booking) =>
    set((s) => ({
      bookings: [...s.bookings, { ...booking, id: crypto.randomUUID(), createdAt: new Date().toISOString() }],
    })),
  cancelBooking: (id) =>
    set((s) => ({
      bookings: s.bookings.filter((b) => b.id !== id),
    })),
  updateCustomerInfo: (info) =>
    set((s) => ({
      customerInfo: s.customerInfo ? { ...s.customerInfo, ...info } : null,
    })),
  resetSession: () => set({ gender: null, category: null, cartItems: [], cartTotal: 0, language: 'DE', selectedMaster: null, customerInfo: null, isGuest: false, orderHistory: [], notes: [], bookings: [] }),
}));

import { create } from 'zustand';
import type { Language } from '@/i18n/translations';

export type Gender = 'female' | 'male';
export type ServiceCategory = 'hair' | 'nails' | 'makeup' | 'sugaring' | 'massage' | 'laser';

interface KioskState {
  language: Language;
  gender: Gender | null;
  category: ServiceCategory | null;
  cartCount: number;
  setLanguage: (lang: Language) => void;
  setGender: (gender: Gender) => void;
  setCategory: (cat: ServiceCategory) => void;
  addToCart: () => void;
  resetSession: () => void;
}

export const useKioskStore = create<KioskState>((set) => ({
  language: 'DE',
  gender: null,
  category: null,
  cartCount: 0,
  setLanguage: (language) => set({ language }),
  setGender: (gender) => set({ gender }),
  setCategory: (category) => set({ category }),
  addToCart: () => set((s) => ({ cartCount: s.cartCount + 1 })),
  resetSession: () => set({ gender: null, category: null, cartCount: 0, language: 'DE' }),
}));

import type { Language } from '@/i18n/translations';

export interface Drink {
  id: string;
  name: Record<Language, string>;
  icon: string;
}

export const mockDrinks: Drink[] = [
  { id: 'coffee', name: { UA: 'Кава', DE: 'Kaffee', EN: 'Coffee' }, icon: '☕' },
  { id: 'green_tea', name: { UA: 'Чай зелений', DE: 'Grüner Tee', EN: 'Green Tea' }, icon: '🍵' },
  { id: 'black_tea', name: { UA: 'Чай чорний', DE: 'Schwarzer Tee', EN: 'Black Tea' }, icon: '🫖' },
  { id: 'fruit_tea', name: { UA: 'Чай фруктовий', DE: 'Früchtetee', EN: 'Fruit Tea' }, icon: '🍹' },
  { id: 'cappuccino', name: { UA: 'Капучіно', DE: 'Cappuccino', EN: 'Cappuccino' }, icon: '☕' },
  { id: 'latte', name: { UA: 'Латте макіато', DE: 'Latte Macchiato', EN: 'Latte Macchiato' }, icon: '🥛' },
];

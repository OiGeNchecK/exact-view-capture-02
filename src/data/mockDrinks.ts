import type { Language } from '@/i18n/translations';

export interface Drink {
  id: string;
  name: Record<Language, string>;
  icon: string;
  image: string;
  hasMilkOption?: boolean;
}

export const mockDrinks: Drink[] = [
  { id: 'coffee', name: { UA: 'Кава', DE: 'Kaffee', EN: 'Coffee' }, icon: '☕', image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=300&h=300&fit=crop', hasMilkOption: true },
  { id: 'green_tea', name: { UA: 'Чай зелений', DE: 'Grüner Tee', EN: 'Green Tea' }, icon: '🍵', image: 'https://images.unsplash.com/photo-1556881286-fc6915169721?w=300&h=300&fit=crop' },
  { id: 'black_tea', name: { UA: 'Чай чорний', DE: 'Schwarzer Tee', EN: 'Black Tea' }, icon: '🫖', image: 'https://images.unsplash.com/photo-1597318181409-cf64d0b5d8a2?w=300&h=300&fit=crop' },
  { id: 'fruit_tea', name: { UA: 'Чай фруктовий', DE: 'Früchtetee', EN: 'Fruit Tea' }, icon: '🍹', image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=300&h=300&fit=crop' },
  { id: 'cappuccino', name: { UA: 'Капучіно', DE: 'Cappuccino', EN: 'Cappuccino' }, icon: '☕', image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=300&h=300&fit=crop', hasMilkOption: true },
  { id: 'latte', name: { UA: 'Латте макіато', DE: 'Latte Macchiato', EN: 'Latte Macchiato' }, icon: '🥛', image: 'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?w=300&h=300&fit=crop', hasMilkOption: true },
];

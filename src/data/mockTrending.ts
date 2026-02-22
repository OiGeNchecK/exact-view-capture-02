import type { Language } from '@/i18n/translations';
import type { ServiceCategory } from '@/store/useKioskStore';

export interface TrendItem {
  id: string;
  title: Record<Language, string>;
  image: string;
  category: ServiceCategory;
}

export const mockTrending: TrendItem[] = [
  // Hair
  { id: 't1', title: { UA: 'Балаяж 2025', DE: 'Balayage 2025', EN: 'Balayage 2025' }, image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=300&fit=crop', category: 'hair' },
  { id: 't2', title: { UA: 'Боб-каре', DE: 'Bob-Schnitt', EN: 'Bob Cut' }, image: 'https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?w=400&h=300&fit=crop', category: 'hair' },
  { id: 't3', title: { UA: 'Мідний відтінок', DE: 'Kupferton', EN: 'Copper Tone' }, image: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=400&h=300&fit=crop', category: 'hair' },
  // Nails
  { id: 't4', title: { UA: 'Мінімалістичний дизайн', DE: 'Minimalistisches Design', EN: 'Minimalist Design' }, image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&h=300&fit=crop', category: 'nails' },
  { id: 't5', title: { UA: 'Френч з акцентом', DE: 'French mit Akzent', EN: 'Accent French' }, image: 'https://images.unsplash.com/photo-1607779097040-26e80aa78e66?w=400&h=300&fit=crop', category: 'nails' },
  // Makeup
  { id: 't6', title: { UA: 'Натуральні брови', DE: 'Natürliche Augenbrauen', EN: 'Natural Brows' }, image: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=400&h=300&fit=crop', category: 'makeup' },
  { id: 't7', title: { UA: 'Омбре губи', DE: 'Ombré Lippen', EN: 'Ombre Lips' }, image: 'https://images.unsplash.com/photo-1588006173527-b3bdd tried?w=400&h=300&fit=crop', category: 'makeup' },
  // Sugaring
  { id: 't8', title: { UA: 'Гладка шкіра - тренд сезону', DE: 'Glatte Haut - Saisontrend', EN: 'Smooth Skin - Season Trend' }, image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&h=300&fit=crop', category: 'sugaring' },
  // Massage
  { id: 't9', title: { UA: 'Стоун-масаж', DE: 'Hot-Stone-Massage', EN: 'Hot Stone Massage' }, image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&h=300&fit=crop', category: 'massage' },
  { id: 't10', title: { UA: 'Лімфодренажний масаж', DE: 'Lymphdrainage', EN: 'Lymphatic Drainage' }, image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=400&h=300&fit=crop', category: 'massage' },
  // Laser
  { id: 't11', title: { UA: 'Лазерне омолодження', DE: 'Laser-Verjüngung', EN: 'Laser Rejuvenation' }, image: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=400&h=300&fit=crop', category: 'laser' },
];

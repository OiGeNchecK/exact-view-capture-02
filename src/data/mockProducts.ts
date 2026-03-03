import type { Language } from '@/i18n/translations';
import type { ServiceCategory } from '@/store/useKioskStore';

export interface Product {
  id: string;
  name: Record<Language, string>;
  price: number;
  category: ServiceCategory;
  image: string;
}

export const mockProducts: Product[] = [
  // Hair
  { id: 'shampoo', name: { UA: 'Шампунь', DE: 'Shampoo', EN: 'Shampoo' }, price: 18, category: 'hair', image: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=300&h=300&fit=crop' },
  { id: 'conditioner', name: { UA: 'Кондиціонер', DE: 'Conditioner', EN: 'Conditioner' }, price: 22, category: 'hair', image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=300&h=300&fit=crop' },
  { id: 'hair_mask', name: { UA: 'Маска для волосся', DE: 'Haarmaske', EN: 'Hair Mask' }, price: 28, category: 'hair', image: 'https://images.unsplash.com/photo-1585232004423-244e0e6904e3?w=300&h=300&fit=crop' },
  { id: 'hair_oil', name: { UA: 'Олія для волосся', DE: 'Haaröl', EN: 'Hair Oil' }, price: 25, category: 'hair', image: 'https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=300&h=300&fit=crop' },
  // Nails
  { id: 'cuticle_oil', name: { UA: 'Олія для кутикули', DE: 'Nagelhautöl', EN: 'Cuticle Oil' }, price: 12, category: 'nails', image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=300&h=300&fit=crop' },
  { id: 'hand_cream', name: { UA: 'Крем для рук', DE: 'Handcreme', EN: 'Hand Cream' }, price: 15, category: 'nails', image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=300&h=300&fit=crop' },
  { id: 'top_coat', name: { UA: 'Лак-закріплювач', DE: 'Überlack', EN: 'Top Coat' }, price: 10, category: 'nails', image: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?w=300&h=300&fit=crop' },
  // Makeup
  { id: 'micellar', name: { UA: 'Міцелярна вода', DE: 'Mizellenwasser', EN: 'Micellar Water' }, price: 16, category: 'makeup', image: 'https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=300&h=300&fit=crop' },
  { id: 'face_cream', name: { UA: 'Крем для обличчя', DE: 'Gesichtscreme', EN: 'Face Cream' }, price: 35, category: 'makeup', image: 'https://images.unsplash.com/photo-1570194065650-d99fb4b38b17?w=300&h=300&fit=crop' },
  { id: 'serum', name: { UA: 'Сироватка', DE: 'Serum', EN: 'Serum' }, price: 42, category: 'makeup', image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=300&h=300&fit=crop' },
  // Sugaring
  { id: 'soothing_lotion', name: { UA: 'Заспокійливий лосьйон', DE: 'Beruhigende Lotion', EN: 'Soothing Lotion' }, price: 20, category: 'sugaring', image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=300&h=300&fit=crop' },
  { id: 'scrub', name: { UA: 'Скраб', DE: 'Peeling', EN: 'Scrub' }, price: 18, category: 'sugaring', image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=300&h=300&fit=crop' },
  { id: 'moisturizer', name: { UA: 'Зволожуючий крем', DE: 'Feuchtigkeitscreme', EN: 'Moisturizer' }, price: 24, category: 'sugaring', image: 'https://images.unsplash.com/photo-1570194065650-d99fb4b38b17?w=300&h=300&fit=crop' },
  // Massage
  { id: 'massage_oil', name: { UA: 'Масажна олія', DE: 'Massageöl', EN: 'Massage Oil' }, price: 22, category: 'massage', image: 'https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=300&h=300&fit=crop' },
  { id: 'warming_cream', name: { UA: 'Розігріваючий крем', DE: 'Wärmecreme', EN: 'Warming Cream' }, price: 26, category: 'massage', image: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=300&h=300&fit=crop' },
  { id: 'roller', name: { UA: 'Ролер', DE: 'Roller', EN: 'Roller' }, price: 30, category: 'massage', image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=300&h=300&fit=crop' },
  // Laser
  { id: 'spf_cream', name: { UA: 'SPF-крем', DE: 'SPF-Creme', EN: 'SPF Cream' }, price: 28, category: 'laser', image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=300&h=300&fit=crop' },
  { id: 'soothing_gel', name: { UA: 'Заспокійливий гель', DE: 'Beruhigendes Gel', EN: 'Soothing Gel' }, price: 20, category: 'laser', image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=300&h=300&fit=crop' },
  { id: 'hydrating_cream', name: { UA: 'Зволожуючий крем', DE: 'Feuchtigkeitscreme', EN: 'Hydrating Cream' }, price: 24, category: 'laser', image: 'https://images.unsplash.com/photo-1570194065650-d99fb4b38b17?w=300&h=300&fit=crop' },
];

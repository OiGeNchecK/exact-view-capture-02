import type { Language } from '@/i18n/translations';
import type { ServiceCategory } from '@/store/useKioskStore';

export interface Product {
  id: string;
  name: Record<Language, string>;
  price: number;
  category: ServiceCategory;
}

export const mockProducts: Product[] = [
  // Hair
  { id: 'shampoo', name: { UA: 'Шампунь', DE: 'Shampoo', EN: 'Shampoo' }, price: 18, category: 'hair' },
  { id: 'conditioner', name: { UA: 'Кондиціонер', DE: 'Conditioner', EN: 'Conditioner' }, price: 22, category: 'hair' },
  { id: 'hair_mask', name: { UA: 'Маска для волосся', DE: 'Haarmaske', EN: 'Hair Mask' }, price: 28, category: 'hair' },
  { id: 'hair_oil', name: { UA: 'Олія для волосся', DE: 'Haaröl', EN: 'Hair Oil' }, price: 25, category: 'hair' },
  // Nails
  { id: 'cuticle_oil', name: { UA: 'Олія для кутикули', DE: 'Nagelhautöl', EN: 'Cuticle Oil' }, price: 12, category: 'nails' },
  { id: 'hand_cream', name: { UA: 'Крем для рук', DE: 'Handcreme', EN: 'Hand Cream' }, price: 15, category: 'nails' },
  { id: 'top_coat', name: { UA: 'Лак-закріплювач', DE: 'Überlack', EN: 'Top Coat' }, price: 10, category: 'nails' },
  // Makeup
  { id: 'micellar', name: { UA: 'Міцелярна вода', DE: 'Mizellenwasser', EN: 'Micellar Water' }, price: 16, category: 'makeup' },
  { id: 'face_cream', name: { UA: 'Крем для обличчя', DE: 'Gesichtscreme', EN: 'Face Cream' }, price: 35, category: 'makeup' },
  { id: 'serum', name: { UA: 'Сироватка', DE: 'Serum', EN: 'Serum' }, price: 42, category: 'makeup' },
  // Sugaring
  { id: 'soothing_lotion', name: { UA: 'Заспокійливий лосьйон', DE: 'Beruhigende Lotion', EN: 'Soothing Lotion' }, price: 20, category: 'sugaring' },
  { id: 'scrub', name: { UA: 'Скраб', DE: 'Peeling', EN: 'Scrub' }, price: 18, category: 'sugaring' },
  { id: 'moisturizer', name: { UA: 'Зволожуючий крем', DE: 'Feuchtigkeitscreme', EN: 'Moisturizer' }, price: 24, category: 'sugaring' },
  // Massage
  { id: 'massage_oil', name: { UA: 'Масажна олія', DE: 'Massageöl', EN: 'Massage Oil' }, price: 22, category: 'massage' },
  { id: 'warming_cream', name: { UA: 'Розігріваючий крем', DE: 'Wärmecreme', EN: 'Warming Cream' }, price: 26, category: 'massage' },
  { id: 'roller', name: { UA: 'Ролер', DE: 'Roller', EN: 'Roller' }, price: 30, category: 'massage' },
  // Laser
  { id: 'spf_cream', name: { UA: 'SPF-крем', DE: 'SPF-Creme', EN: 'SPF Cream' }, price: 28, category: 'laser' },
  { id: 'soothing_gel', name: { UA: 'Заспокійливий гель', DE: 'Beruhigendes Gel', EN: 'Soothing Gel' }, price: 20, category: 'laser' },
  { id: 'hydrating_cream', name: { UA: 'Зволожуючий крем', DE: 'Feuchtigkeitscreme', EN: 'Hydrating Cream' }, price: 24, category: 'laser' },
];

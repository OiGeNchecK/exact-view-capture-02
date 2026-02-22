import type { ServiceCategory } from '@/store/useKioskStore';
import type { Language } from '@/i18n/translations';

export interface ServiceItem {
  id: string;
  categoryCode: ServiceCategory;
  name: Record<Language, string>;
  durationMin: number;
  priceCents: number;
}

export const mockServices: ServiceItem[] = [
  // Hair
  { id: '1', categoryCode: 'hair', name: { UA: 'Жіноча стрижка', DE: 'Damenhaarschnitt', EN: 'Women\'s Haircut' }, durationMin: 45, priceCents: 5500 },
  { id: '2', categoryCode: 'hair', name: { UA: 'Чоловіча стрижка', DE: 'Herrenhaarschnitt', EN: 'Men\'s Haircut' }, durationMin: 30, priceCents: 3500 },
  { id: '3', categoryCode: 'hair', name: { UA: 'Фарбування волосся', DE: 'Haarfärbung', EN: 'Hair Coloring' }, durationMin: 120, priceCents: 12000 },
  { id: '4', categoryCode: 'hair', name: { UA: 'Мелірування', DE: 'Strähnchen', EN: 'Highlights' }, durationMin: 90, priceCents: 9500 },
  { id: '5', categoryCode: 'hair', name: { UA: 'Укладка', DE: 'Styling', EN: 'Blow Dry & Style' }, durationMin: 40, priceCents: 4500 },
  // Nails
  { id: '6', categoryCode: 'nails', name: { UA: 'Маникюр класичний', DE: 'Klassische Maniküre', EN: 'Classic Manicure' }, durationMin: 45, priceCents: 3500 },
  { id: '7', categoryCode: 'nails', name: { UA: 'Гель-лак', DE: 'Gel-Lack', EN: 'Gel Polish' }, durationMin: 60, priceCents: 4500 },
  { id: '8', categoryCode: 'nails', name: { UA: 'Педикюр', DE: 'Pediküre', EN: 'Pedicure' }, durationMin: 60, priceCents: 5000 },
  { id: '9', categoryCode: 'nails', name: { UA: 'Нарощування нігтів', DE: 'Nagelmodellage', EN: 'Nail Extensions' }, durationMin: 90, priceCents: 7500 },
  // Makeup
  { id: '10', categoryCode: 'makeup', name: { UA: 'Перманент брів', DE: 'Permanente Augenbrauen', EN: 'Permanent Eyebrows' }, durationMin: 120, priceCents: 25000 },
  { id: '11', categoryCode: 'makeup', name: { UA: 'Перманент губ', DE: 'Permanente Lippen', EN: 'Permanent Lips' }, durationMin: 120, priceCents: 28000 },
  { id: '12', categoryCode: 'makeup', name: { UA: 'Перманент повік', DE: 'Permanenter Lidstrich', EN: 'Permanent Eyeliner' }, durationMin: 90, priceCents: 22000 },
  // Sugaring
  { id: '13', categoryCode: 'sugaring', name: { UA: 'Шугаринг ноги повністю', DE: 'Sugaring Beine komplett', EN: 'Full Leg Sugaring' }, durationMin: 60, priceCents: 5500 },
  { id: '14', categoryCode: 'sugaring', name: { UA: 'Шугаринг бікіні', DE: 'Sugaring Bikini', EN: 'Bikini Sugaring' }, durationMin: 30, priceCents: 3500 },
  { id: '15', categoryCode: 'sugaring', name: { UA: 'Шугаринг руки', DE: 'Sugaring Arme', EN: 'Arm Sugaring' }, durationMin: 30, priceCents: 2500 },
  // Massage
  { id: '16', categoryCode: 'massage', name: { UA: 'Масаж спини', DE: 'Rückenmassage', EN: 'Back Massage' }, durationMin: 30, priceCents: 4000 },
  { id: '17', categoryCode: 'massage', name: { UA: 'Масаж всього тіла', DE: 'Ganzkörpermassage', EN: 'Full Body Massage' }, durationMin: 60, priceCents: 7000 },
  { id: '18', categoryCode: 'massage', name: { UA: 'Антицелюлітний масаж', DE: 'Anti-Cellulite Massage', EN: 'Anti-Cellulite Massage' }, durationMin: 45, priceCents: 5500 },
  // Laser
  { id: '19', categoryCode: 'laser', name: { UA: 'Лазерна епіляція ноги', DE: 'Laser Haarentfernung Beine', EN: 'Laser Hair Removal Legs' }, durationMin: 45, priceCents: 15000 },
  { id: '20', categoryCode: 'laser', name: { UA: 'Лазерна епіляція обличчя', DE: 'Laser Haarentfernung Gesicht', EN: 'Laser Hair Removal Face' }, durationMin: 20, priceCents: 8000 },
  { id: '21', categoryCode: 'laser', name: { UA: 'Лазерне омолодження', DE: 'Laser Hautverjüngung', EN: 'Laser Skin Rejuvenation' }, durationMin: 60, priceCents: 20000 },
];

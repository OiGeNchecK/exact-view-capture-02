import type { ServiceCategory } from '@/store/useKioskStore';
import type { Language } from '@/i18n/translations';

export interface ServiceItem {
  id: string;
  categoryCode: ServiceCategory;
  name: Record<Language, string>;
  durationMin: number;
  priceCents: number;
  image: string;
}

export const mockServices: ServiceItem[] = [
  // Hair
  { id: '1', categoryCode: 'hair', name: { UA: 'Жіноча стрижка', DE: 'Damenhaarschnitt', EN: 'Women\'s Haircut' }, durationMin: 45, priceCents: 5500, image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=300&h=300&fit=crop' },
  { id: '2', categoryCode: 'hair', name: { UA: 'Чоловіча стрижка', DE: 'Herrenhaarschnitt', EN: 'Men\'s Haircut' }, durationMin: 30, priceCents: 3500, image: 'https://images.unsplash.com/photo-1503951914875-452c39464cef?w=300&h=300&fit=crop' },
  { id: '3', categoryCode: 'hair', name: { UA: 'Фарбування волосся', DE: 'Haarfärbung', EN: 'Hair Coloring' }, durationMin: 120, priceCents: 12000, image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=300&h=300&fit=crop' },
  { id: '4', categoryCode: 'hair', name: { UA: 'Мелірування', DE: 'Strähnchen', EN: 'Highlights' }, durationMin: 90, priceCents: 9500, image: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=300&h=300&fit=crop' },
  { id: '5', categoryCode: 'hair', name: { UA: 'Укладка', DE: 'Styling', EN: 'Blow Dry & Style' }, durationMin: 40, priceCents: 4500, image: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=300&h=300&fit=crop' },
  { id: 'h6', categoryCode: 'hair', name: { UA: 'Кератинове випрямлення', DE: 'Keratin-Glättung', EN: 'Keratin Treatment' }, durationMin: 150, priceCents: 18000, image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=300&h=300&fit=crop' },
  { id: 'h7', categoryCode: 'hair', name: { UA: 'Ботокс для волосся', DE: 'Haar-Botox', EN: 'Hair Botox' }, durationMin: 120, priceCents: 15000, image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=300&h=300&fit=crop' },
  { id: 'h8', categoryCode: 'hair', name: { UA: 'Ламінування волосся', DE: 'Haarlaminierung', EN: 'Hair Lamination' }, durationMin: 90, priceCents: 8000, image: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=300&h=300&fit=crop' },
  // Nails
  { id: '6', categoryCode: 'nails', name: { UA: 'Маникюр класичний', DE: 'Klassische Maniküre', EN: 'Classic Manicure' }, durationMin: 45, priceCents: 3500, image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=300&h=300&fit=crop' },
  { id: '7', categoryCode: 'nails', name: { UA: 'Гель-лак', DE: 'Gel-Lack', EN: 'Gel Polish' }, durationMin: 60, priceCents: 4500, image: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?w=300&h=300&fit=crop' },
  { id: '8', categoryCode: 'nails', name: { UA: 'Педикюр', DE: 'Pediküre', EN: 'Pedicure' }, durationMin: 60, priceCents: 5000, image: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=300&h=300&fit=crop' },
  { id: '9', categoryCode: 'nails', name: { UA: 'Нарощування нігтів', DE: 'Nagelmodellage', EN: 'Nail Extensions' }, durationMin: 90, priceCents: 7500, image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=300&h=300&fit=crop' },
  { id: 'n5', categoryCode: 'nails', name: { UA: 'Зняття гель-лаку', DE: 'Gel-Lack Entfernung', EN: 'Gel Polish Removal' }, durationMin: 30, priceCents: 1500, image: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?w=300&h=300&fit=crop' },
  { id: 'n6', categoryCode: 'nails', name: { UA: 'Дизайн нігтів', DE: 'Nageldesign', EN: 'Nail Art Design' }, durationMin: 30, priceCents: 2000, image: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=300&h=300&fit=crop' },
  { id: 'n7', categoryCode: 'nails', name: { UA: 'Зміцнення нігтів', DE: 'Nagelverstärkung', EN: 'Nail Strengthening' }, durationMin: 45, priceCents: 3000, image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=300&h=300&fit=crop' },
  // Makeup
  { id: '10', categoryCode: 'makeup', name: { UA: 'Перманент брів', DE: 'Permanente Augenbrauen', EN: 'Permanent Eyebrows' }, durationMin: 120, priceCents: 25000, image: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=300&h=300&fit=crop' },
  { id: '11', categoryCode: 'makeup', name: { UA: 'Перманент губ', DE: 'Permanente Lippen', EN: 'Permanent Lips' }, durationMin: 120, priceCents: 28000, image: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=300&h=300&fit=crop' },
  { id: '12', categoryCode: 'makeup', name: { UA: 'Перманент повік', DE: 'Permanenter Lidstrich', EN: 'Permanent Eyeliner' }, durationMin: 90, priceCents: 22000, image: 'https://images.unsplash.com/photo-1457972729786-0411a3b2b626?w=300&h=300&fit=crop' },
  { id: 'm4', categoryCode: 'makeup', name: { UA: 'Корекція перманенту', DE: 'Permanent-Korrektur', EN: 'Permanent Correction' }, durationMin: 60, priceCents: 12000, image: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=300&h=300&fit=crop' },
  { id: 'm5', categoryCode: 'makeup', name: { UA: 'Видалення перманенту', DE: 'Permanent-Entfernung', EN: 'Permanent Removal' }, durationMin: 45, priceCents: 10000, image: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=300&h=300&fit=crop' },
  // Sugaring
  { id: '13', categoryCode: 'sugaring', name: { UA: 'Шугаринг ноги повністю', DE: 'Sugaring Beine komplett', EN: 'Full Leg Sugaring' }, durationMin: 60, priceCents: 5500, image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=300&h=300&fit=crop' },
  { id: '14', categoryCode: 'sugaring', name: { UA: 'Шугаринг бікіні', DE: 'Sugaring Bikini', EN: 'Bikini Sugaring' }, durationMin: 30, priceCents: 3500, image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=300&h=300&fit=crop' },
  { id: '15', categoryCode: 'sugaring', name: { UA: 'Шугаринг руки', DE: 'Sugaring Arme', EN: 'Arm Sugaring' }, durationMin: 30, priceCents: 2500, image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=300&h=300&fit=crop' },
  { id: 's4', categoryCode: 'sugaring', name: { UA: 'Шугаринг пахви', DE: 'Sugaring Achseln', EN: 'Underarm Sugaring' }, durationMin: 15, priceCents: 1500, image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=300&h=300&fit=crop' },
  { id: 's5', categoryCode: 'sugaring', name: { UA: 'Шугаринг обличчя', DE: 'Sugaring Gesicht', EN: 'Face Sugaring' }, durationMin: 20, priceCents: 2000, image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=300&h=300&fit=crop' },
  { id: 's6', categoryCode: 'sugaring', name: { UA: 'Шугаринг глибоке бікіні', DE: 'Sugaring Deep Bikini', EN: 'Deep Bikini Sugaring' }, durationMin: 45, priceCents: 5000, image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=300&h=300&fit=crop' },
  // Massage
  { id: '16', categoryCode: 'massage', name: { UA: 'Масаж спини', DE: 'Rückenmassage', EN: 'Back Massage' }, durationMin: 30, priceCents: 4000, image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=300&h=300&fit=crop' },
  { id: '17', categoryCode: 'massage', name: { UA: 'Масаж всього тіла', DE: 'Ganzkörpermassage', EN: 'Full Body Massage' }, durationMin: 60, priceCents: 7000, image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=300&h=300&fit=crop' },
  { id: '18', categoryCode: 'massage', name: { UA: 'Антицелюлітний масаж', DE: 'Anti-Cellulite Massage', EN: 'Anti-Cellulite Massage' }, durationMin: 45, priceCents: 5500, image: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=300&h=300&fit=crop' },
  { id: 'ms4', categoryCode: 'massage', name: { UA: 'Лімфодренажний масаж', DE: 'Lymphdrainage-Massage', EN: 'Lymphatic Drainage Massage' }, durationMin: 60, priceCents: 6500, image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=300&h=300&fit=crop' },
  { id: 'ms5', categoryCode: 'massage', name: { UA: 'Масаж обличчя', DE: 'Gesichtsmassage', EN: 'Facial Massage' }, durationMin: 30, priceCents: 3500, image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=300&h=300&fit=crop' },
  { id: 'ms6', categoryCode: 'massage', name: { UA: 'Стоун-масаж', DE: 'Hot-Stone-Massage', EN: 'Hot Stone Massage' }, durationMin: 75, priceCents: 8500, image: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=300&h=300&fit=crop' },
  // Laser
  { id: '19', categoryCode: 'laser', name: { UA: 'Лазерна епіляція ніг', DE: 'Laser Haarentfernung Beine', EN: 'Laser Hair Removal Legs' }, durationMin: 45, priceCents: 15000, image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=300&h=300&fit=crop' },
  { id: '20', categoryCode: 'laser', name: { UA: 'Лазерна епіляція обличчя', DE: 'Laser Haarentfernung Gesicht', EN: 'Laser Hair Removal Face' }, durationMin: 20, priceCents: 8000, image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=300&h=300&fit=crop' },
  { id: '21', categoryCode: 'laser', name: { UA: 'Лазерне омолодження', DE: 'Laser Hautverjüngung', EN: 'Laser Skin Rejuvenation' }, durationMin: 60, priceCents: 20000, image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=300&h=300&fit=crop' },
  { id: 'l4', categoryCode: 'laser', name: { UA: 'Лазерна епіляція бікіні', DE: 'Laser Haarentfernung Bikini', EN: 'Laser Hair Removal Bikini' }, durationMin: 30, priceCents: 12000, image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=300&h=300&fit=crop' },
  { id: 'l5', categoryCode: 'laser', name: { UA: 'Лазерна епіляція пахв', DE: 'Laser Haarentfernung Achseln', EN: 'Laser Hair Removal Underarms' }, durationMin: 15, priceCents: 5000, image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=300&h=300&fit=crop' },
  { id: 'l6', categoryCode: 'laser', name: { UA: 'Лазерне видалення пігментації', DE: 'Laser Pigmententfernung', EN: 'Laser Pigmentation Removal' }, durationMin: 45, priceCents: 18000, image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=300&h=300&fit=crop' },
];

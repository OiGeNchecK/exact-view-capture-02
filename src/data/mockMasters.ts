import type { Language } from '@/i18n/translations';
import type { ServiceCategory } from '@/store/useKioskStore';

export interface Master {
  id: string;
  name: string;
  avatar: string;
  specialization: ServiceCategory[];
  available: boolean;
  title: Record<Language, string>;
}

export const mockMasters: Master[] = [
  { id: '1', name: 'Anna K.', avatar: 'AK', specialization: ['hair'], available: true, title: { UA: 'Стиліст-колорист', DE: 'Stylistin-Koloristin', EN: 'Stylist-Colorist' } },
  { id: '2', name: 'Maria S.', avatar: 'MS', specialization: ['nails'], available: true, title: { UA: 'Майстер манікюру', DE: 'Nageldesignerin', EN: 'Nail Technician' } },
  { id: '3', name: 'Elena P.', avatar: 'EP', specialization: ['makeup'], available: false, title: { UA: 'Візажист', DE: 'Visagistin', EN: 'Makeup Artist' } },
  { id: '4', name: 'Olga T.', avatar: 'OT', specialization: ['sugaring', 'laser'], available: true, title: { UA: 'Косметолог', DE: 'Kosmetikerin', EN: 'Cosmetologist' } },
  { id: '5', name: 'Sofia M.', avatar: 'SM', specialization: ['massage'], available: true, title: { UA: 'Масажист', DE: 'Masseurin', EN: 'Massage Therapist' } },
  { id: '6', name: 'Diana R.', avatar: 'DR', specialization: ['hair', 'makeup'], available: false, title: { UA: 'Стиліст', DE: 'Stylistin', EN: 'Stylist' } },
  { id: '7', name: 'Katya V.', avatar: 'KV', specialization: ['nails'], available: true, title: { UA: 'Майстер педикюру', DE: 'Pediküre-Meisterin', EN: 'Pedicure Specialist' } },
  { id: '8', name: 'Lena B.', avatar: 'LB', specialization: ['laser'], available: true, title: { UA: 'Лазерний терапевт', DE: 'Lasertherapeutin', EN: 'Laser Therapist' } },
];

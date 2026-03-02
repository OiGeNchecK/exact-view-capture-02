import type { Language } from '@/i18n/translations';
import type { ServiceCategory } from '@/store/useKioskStore';

export interface Master {
  id: string;
  name: string;
  avatar: string;
  photo: string;
  specialization: ServiceCategory[];
  available: boolean;
  title: Record<Language, string>;
  age: number;
  experienceYears: number;
  education: Record<Language, string>;
  workplace: Record<Language, string>;
  photos: string[];
}

export const mockMasters: Master[] = [
  {
    id: '1', name: 'Anna K.', avatar: 'AK',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face',
    specialization: ['hair'], available: true,
    title: { UA: 'Стиліст-колорист', DE: 'Stylistin-Koloristin', EN: 'Stylist-Colorist' },
    age: 28, experienceYears: 7,
    education: { UA: 'Академія краси, Київ', DE: 'Schönheitsakademie, Kiew', EN: 'Beauty Academy, Kyiv' },
    workplace: { UA: 'TINTEI Beauty Studio', DE: 'TINTEI Beauty Studio', EN: 'TINTEI Beauty Studio' },
    photos: [
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1503951914875-452c39464cef?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?w=600&h=600&fit=crop',
    ],
  },
  {
    id: '2', name: 'Maria S.', avatar: 'MS',
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face',
    specialization: ['nails'], available: true,
    title: { UA: 'Майстер манікюру', DE: 'Nageldesignerin', EN: 'Nail Technician' },
    age: 25, experienceYears: 5,
    education: { UA: 'Школа нігтьового сервісу', DE: 'Nageldesign-Schule', EN: 'Nail Design School' },
    workplace: { UA: 'TINTEI Beauty Studio', DE: 'TINTEI Beauty Studio', EN: 'TINTEI Beauty Studio' },
    photos: [
      'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1632345031435-8727f6897d53?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1607779097040-26e80aa78e66?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1610992015732-2449b0dd2b8f?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&h=600&fit=crop&q=80',
    ],
  },
  {
    id: '3', name: 'Elena P.', avatar: 'EP',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=face',
    specialization: ['makeup'], available: true,
    title: { UA: 'Візажист', DE: 'Visagistin', EN: 'Makeup Artist' },
    age: 32, experienceYears: 10,
    education: { UA: 'Інститут краси, Відень', DE: 'Schönheitsinstitut, Wien', EN: 'Beauty Institute, Vienna' },
    workplace: { UA: 'TINTEI Beauty Studio', DE: 'TINTEI Beauty Studio', EN: 'TINTEI Beauty Studio' },
    photos: [
      'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1457972729786-0411a3b2b626?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1503236823255-94609f598e71?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=600&h=600&fit=crop',
    ],
  },
  {
    id: '4', name: 'Olga T.', avatar: 'OT',
    photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=face',
    specialization: ['sugaring', 'laser'], available: true,
    title: { UA: 'Косметолог', DE: 'Kosmetikerin', EN: 'Cosmetologist' },
    age: 30, experienceYears: 8,
    education: { UA: 'Медичний коледж, Львів', DE: 'Medizinische Hochschule, Lwiw', EN: 'Medical College, Lviv' },
    workplace: { UA: 'TINTEI Beauty Studio', DE: 'TINTEI Beauty Studio', EN: 'TINTEI Beauty Studio' },
    photos: [
      'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1540555700478-4be289fbec6d?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&h=600&fit=crop&q=80',
    ],
  },
  {
    id: '5', name: 'Sofia M.', avatar: 'SM',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
    specialization: ['massage'], available: true,
    title: { UA: 'Масажист', DE: 'Masseurin', EN: 'Massage Therapist' },
    age: 27, experienceYears: 6,
    education: { UA: 'Академія масажу, Берлін', DE: 'Massage-Akademie, Berlin', EN: 'Massage Academy, Berlin' },
    workplace: { UA: 'TINTEI Beauty Studio', DE: 'TINTEI Beauty Studio', EN: 'TINTEI Beauty Studio' },
    photos: [
      'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=600&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=600&h=600&fit=crop&q=80',
    ],
  },
  {
    id: '6', name: 'Diana R.', avatar: 'DR',
    photo: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&h=200&fit=crop&crop=face',
    specialization: ['hair', 'makeup'], available: true,
    title: { UA: 'Стиліст', DE: 'Stylistin', EN: 'Stylist' },
    age: 35, experienceYears: 12,
    education: { UA: 'Академія стилю, Мілан', DE: 'Stil-Akademie, Mailand', EN: 'Style Academy, Milan' },
    workplace: { UA: 'TINTEI Beauty Studio', DE: 'TINTEI Beauty Studio', EN: 'TINTEI Beauty Studio' },
    photos: [
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1503236823255-94609f598e71?w=600&h=600&fit=crop',
    ],
  },
  {
    id: '7', name: 'Katya V.', avatar: 'KV',
    photo: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=200&h=200&fit=crop&crop=face',
    specialization: ['nails'], available: true,
    title: { UA: 'Майстер педикюру', DE: 'Pediküre-Meisterin', EN: 'Pedicure Specialist' },
    age: 24, experienceYears: 4,
    education: { UA: 'Курси nail-арту, Варшава', DE: 'Nail-Art Kurse, Warschau', EN: 'Nail Art Courses, Warsaw' },
    workplace: { UA: 'TINTEI Beauty Studio', DE: 'TINTEI Beauty Studio', EN: 'TINTEI Beauty Studio' },
    photos: [
      'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1632345031435-8727f6897d53?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1607779097040-26e80aa78e66?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1610992015732-2449b0dd2b8f?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=600&h=600&fit=crop&q=80',
    ],
  },
  {
    id: '8', name: 'Lena B.', avatar: 'LB',
    photo: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=200&h=200&fit=crop&crop=face',
    specialization: ['laser'], available: true,
    title: { UA: 'Лазерний терапевт', DE: 'Lasertherapeutin', EN: 'Laser Therapist' },
    age: 29, experienceYears: 6,
    education: { UA: 'Медичний університет, Відень', DE: 'Medizinische Universität, Wien', EN: 'Medical University, Vienna' },
    workplace: { UA: 'TINTEI Beauty Studio', DE: 'TINTEI Beauty Studio', EN: 'TINTEI Beauty Studio' },
    photos: [
      'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1540555700478-4be289fbec6d?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=600&h=600&fit=crop&q=80',
    ],
  },
];

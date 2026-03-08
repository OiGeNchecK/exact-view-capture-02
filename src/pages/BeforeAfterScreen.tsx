import { useState, type SyntheticEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '@/hooks/useTranslation';
import { useKioskStore, type ServiceCategory } from '@/store/useKioskStore';
import KioskHeader from '@/components/KioskHeader';
import { Images, X, ChevronLeft, ChevronRight } from 'lucide-react';
import type { Language } from '@/i18n/translations';

interface BeforeAfterItem {
  id: string;
  title: Record<Language, string>;
  category: ServiceCategory;
  before: string;
  after: string;
}

const galleryItems: BeforeAfterItem[] = [
  // Hair
  { id: 'ba1', title: { UA: 'Фарбування волосся', DE: 'Haarfärbung', EN: 'Hair Coloring' }, category: 'hair', before: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=400&h=400&fit=crop', after: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=400&fit=crop' },
  { id: 'ba5', title: { UA: 'Стрижка', DE: 'Haarschnitt', EN: 'Haircut' }, category: 'hair', before: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=400&h=400&fit=crop', after: 'https://images.unsplash.com/photo-1562322140-8baeacacf957?w=400&h=400&fit=crop' },
  // Nails
  { id: 'ba2', title: { UA: 'Манікюр', DE: 'Maniküre', EN: 'Manicure' }, category: 'nails', before: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&h=400&fit=crop', after: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?w=400&h=400&fit=crop' },
  { id: 'ba7', title: { UA: 'Нарощування нігтів', DE: 'Nagelmodellage', EN: 'Nail Extensions' }, category: 'nails', before: 'https://images.unsplash.com/photo-1571290274554-6a2eaa74d75b?w=400&h=400&fit=crop', after: 'https://images.unsplash.com/photo-1607779097040-26e80aa78e66?w=400&h=400&fit=crop' },
  // Makeup
  { id: 'ba3', title: { UA: 'Перманентний макіяж', DE: 'Permanent Make-up', EN: 'Permanent Makeup' }, category: 'makeup', before: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=400&h=400&fit=crop', after: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=400&fit=crop' },
  // Sugaring
  { id: 'ba4', title: { UA: 'Шугаринг', DE: 'Sugaring', EN: 'Sugaring' }, category: 'sugaring', before: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&h=400&fit=crop', after: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=400&h=400&fit=crop' },
  // Massage
  { id: 'ba8', title: { UA: 'Масаж спини', DE: 'Rückenmassage', EN: 'Back Massage' }, category: 'massage', before: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&h=400&fit=crop', after: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=400&h=400&fit=crop' },
  // Laser
  { id: 'ba6', title: { UA: 'Лазерна процедура', DE: 'Laserbehandlung', EN: 'Laser Treatment' }, category: 'laser', before: 'https://images.unsplash.com/photo-1612532275214-e4ca76d0e4d1?w=400&h=400&fit=crop', after: 'https://images.unsplash.com/photo-1540555700478-4be289fbec6d?w=400&h=400&fit=crop' },
];

const categories: ServiceCategory[] = ['hair', 'nails', 'makeup', 'sugaring', 'massage', 'laser'];

const BeforeAfterScreen = () => {
  const { t, language } = useTranslation();
  const navigate = useNavigate();
  const storeCategory = useKioskStore((s) => s.category);
  const [activeCategory, setActiveCategory] = useState<ServiceCategory>(storeCategory || 'hair');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered = galleryItems.filter((item) => item.category === activeCategory);

  const handleImageError = (e: SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    if (img.dataset.fallback === 'true') return;
    img.dataset.fallback = 'true';
    img.src = '/placeholder.svg';
  };

  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <KioskHeader />
      <main className="flex flex-1 flex-col items-center overflow-y-auto px-4 pt-24 pb-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-2 flex items-center gap-3"
        >
          <Images className="h-8 w-8 text-gold" />
          <h1 className="font-display text-3xl font-bold text-gold">{t('before_after')}</h1>
        </motion.div>
        <div className="mx-auto mb-6 h-px w-24 bg-gold-gradient" />

        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => { setActiveCategory(cat); setLightboxIndex(null); }}
              className={`rounded-xl px-4 py-2 text-xs font-semibold transition-all sm:text-sm ${
                activeCategory === cat
                  ? 'bg-gold-gradient text-primary-foreground shadow-gold-lg'
                  : 'border border-border bg-card text-muted-foreground hover:text-foreground'
              }`}
            >
              {t(cat)}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <p className="text-muted-foreground">{t('no_gallery')}</p>
        ) : (
          <div className="mx-auto grid w-full max-w-3xl grid-cols-1 place-items-center gap-6 sm:grid-cols-2">
            {filtered.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.07 }}
                whileHover={{ y: -4 }}
                onClick={() => setLightboxIndex(i)}
                className="tile-luxury w-full max-w-[360px] cursor-pointer overflow-hidden rounded-2xl"
              >
                <div className="grid grid-cols-2 gap-2 p-2">
                  <div className="relative overflow-hidden rounded-xl">
                    <img src={item.before} alt="Before" className="h-40 w-full object-cover" onError={handleImageError} />
                    <span className="absolute bottom-2 left-2 rounded-full bg-background/80 px-2 py-0.5 text-xs font-semibold text-muted-foreground">
                      {t('before_label')}
                    </span>
                  </div>
                  <div className="relative overflow-hidden rounded-xl">
                    <img src={item.after} alt="After" className="h-40 w-full object-cover" onError={handleImageError} />
                    <span className="absolute bottom-2 right-2 rounded-full bg-gold/80 px-2 py-0.5 text-xs font-semibold text-primary-foreground">
                      {t('after_label')}
                    </span>
                  </div>
                </div>
                <div className="p-3 text-center">
                  <p className="text-sm font-medium text-foreground">{item.title[language]}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <AnimatePresence>
          {lightboxIndex !== null && filtered[lightboxIndex] && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
              onClick={() => setLightboxIndex(null)}
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                className="relative flex max-h-[80vh] w-full max-w-4xl flex-col items-center gap-4"
                onClick={(e) => e.stopPropagation()}
              >
                <button onClick={() => setLightboxIndex(null)} className="absolute -top-10 right-0 text-white">
                  <X className="h-8 w-8" />
                </button>
                <p className="text-lg font-semibold text-gold">
                  {filtered[lightboxIndex].title[language]}
                </p>
                <div className="grid w-full max-w-4xl grid-cols-2 justify-center gap-4">
                  <div className="relative">
                    <img src={filtered[lightboxIndex].before} alt="Before" className="h-[55vh] w-full rounded-xl object-cover" onError={handleImageError} />
                    <span className="absolute bottom-3 left-3 rounded-full bg-background/80 px-3 py-1 text-sm font-semibold">
                      {t('before_label')}
                    </span>
                  </div>
                  <div className="relative">
                    <img src={filtered[lightboxIndex].after} alt="After" className="h-[55vh] w-full rounded-xl object-cover" onError={handleImageError} />
                    <span className="absolute bottom-3 right-3 rounded-full bg-gold/80 px-3 py-1 text-sm font-semibold text-primary-foreground">
                      {t('after_label')}
                    </span>
                  </div>
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={() => setLightboxIndex((p) => (p! > 0 ? p! - 1 : filtered.length - 1))}
                    className="rounded-full bg-card p-2 text-foreground"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <button
                    onClick={() => setLightboxIndex((p) => (p! < filtered.length - 1 ? p! + 1 : 0))}
                    className="rounded-full bg-card p-2 text-foreground"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          onClick={() => navigate('/dashboard')}
          className="mt-8 rounded-xl card-luxury px-6 py-3 text-muted-foreground transition-colors hover:text-gold"
        >
          ← {t('back')}
        </motion.button>
      </main>
    </div>
  );
};

export default BeforeAfterScreen;

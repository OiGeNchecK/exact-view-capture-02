import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '@/hooks/useTranslation';
import { useKioskStore } from '@/store/useKioskStore';
import KioskHeader from '@/components/KioskHeader';
import { mockMasters } from '@/data/mockMasters';
import type { Master } from '@/data/mockMasters';
import { Calendar, GraduationCap, MapPin, ChevronLeft, ChevronRight, X, Shuffle } from 'lucide-react';
import { toast } from 'sonner';

const ChooseMasterScreen = () => {
  const { t, language } = useTranslation();
  const navigate = useNavigate();
  const category = useKioskStore((s) => s.category);
  const setSelectedMaster = useKioskStore((s) => s.setSelectedMaster);
  const [viewMaster, setViewMaster] = useState<Master | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const masters = mockMasters.filter(
    (m) => m.available && m.specialization.includes(category!)
  );

  const handleConfirm = (master: Master) => {
    setSelectedMaster(master);
    toast.success(`${t('master_selected')}: ${master.name}`);
    setViewMaster(null);
    navigate('/dashboard');
  };

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const goLightbox = useCallback((dir: number) => {
    if (!viewMaster) return;
    const len = viewMaster.photos.length;
    setLightboxIndex((prev) => (prev !== null ? (prev + dir + len) % len : null));
  }, [viewMaster]);

  const closeDetail = useCallback(() => {
    if (lightboxIndex !== null) return; // don't close detail while lightbox is open
    setViewMaster(null);
  }, [lightboxIndex]);

  return (
    <div className="min-h-screen bg-background">
      <KioskHeader />
      <main className="flex min-h-screen flex-col items-center px-4 pt-20 pb-12 sm:px-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 font-display text-3xl font-bold text-gold sm:text-4xl"
        >
          {t('choose_master')}
        </motion.h1>
        <div className="mx-auto mb-8 h-px w-24 bg-gold-gradient" />

        <div className="grid w-full max-w-2xl grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 sm:gap-5">
          {/* "Any available master" tile */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              const random = masters[Math.floor(Math.random() * masters.length)];
              if (random) handleConfirm(random);
            }}
            className="card-luxury group flex flex-col items-center gap-3 rounded-2xl p-4 transition-all"
          >
            <div className="flex h-24 w-24 items-center justify-center rounded-xl border-2 border-gold/30 bg-gold/5 transition-all group-hover:border-gold-bright sm:h-28 sm:w-28">
              <Shuffle className="h-10 w-10 text-gold" />
            </div>
            <div className="text-center">
              <p className="text-sm font-semibold text-foreground">{t('any_master')}</p>
              <p className="text-xs text-muted-foreground">{t('available_now')}</p>
            </div>
          </motion.button>

          {masters.map((master, i) => (
            <motion.button
              key={master.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 * (i + 1) }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => { setViewMaster(master); setLightboxIndex(null); }}
              className="card-luxury group flex flex-col items-center gap-3 rounded-2xl p-4 transition-all"
            >
              <div className="h-24 w-24 overflow-hidden rounded-xl border-2 border-gold/30 transition-all group-hover:border-gold-bright sm:h-28 sm:w-28">
                <img src={master.photo} alt={master.name} className="h-full w-full object-cover" loading="lazy" />
              </div>
              <div className="text-center">
                <p className="text-sm font-semibold text-foreground">{master.name}</p>
                <p className="text-xs text-muted-foreground">{master.title[language]}</p>
              </div>
            </motion.button>
          ))}

          {masters.length === 0 && (
            <div className="col-span-full py-12 text-center text-muted-foreground">
              {t('no_masters')}
            </div>
          )}
        </div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          onClick={() => navigate('/dashboard')}
          className="mt-10 rounded-xl card-luxury px-6 py-3 text-muted-foreground transition-colors hover:text-gold"
        >
          ← {t('back')}
        </motion.button>
      </main>

      {/* Master detail overlay */}
      <AnimatePresence>
        {viewMaster && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
            onClick={closeDetail}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative max-h-[85vh] w-full max-w-md overflow-y-auto rounded-2xl border border-border bg-background p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => { setViewMaster(null); setLightboxIndex(null); }}
                className="absolute right-3 top-3 rounded-full p-1.5 text-muted-foreground hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="mb-4 flex items-center gap-4">
                <div className="h-20 w-20 shrink-0 overflow-hidden rounded-2xl border-2 border-gold">
                  <img src={viewMaster.photo} alt={viewMaster.name} className="h-full w-full object-cover" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-foreground">{viewMaster.name}</h2>
                  <p className="text-sm text-gold">{viewMaster.title[language]}</p>
                </div>
              </div>

              <div className="mb-5 space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4 text-gold" />
                  <span>{t('age')}: {viewMaster.age} | {t('experience')}: {viewMaster.experienceYears} {t('years')}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <GraduationCap className="h-4 w-4 text-gold" />
                  <span>{viewMaster.education[language]}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 text-gold" />
                  <span>{viewMaster.workplace[language]}</span>
                </div>
              </div>

              <p className="mb-3 text-sm font-medium text-gold">{t('work_photos')}</p>
              <div className="grid grid-cols-3 gap-2">
                {viewMaster.photos.map((photo, i) => (
                  <button
                    key={i}
                    onClick={() => setLightboxIndex(i)}
                    className="aspect-square overflow-hidden rounded-xl border border-border transition-all hover:border-gold"
                  >
                    <img src={photo} alt={`${viewMaster.name} work ${i + 1}`} className="h-full w-full object-cover" loading="lazy" />
                  </button>
                ))}
              </div>

              <button
                onClick={() => handleConfirm(viewMaster)}
                className="mt-5 w-full rounded-xl bg-gold py-3 text-lg font-semibold text-background transition-colors hover:bg-gold-bright"
              >
                {t('select_master')}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lightbox overlay for photos */}
      <AnimatePresence>
        {lightboxIndex !== null && viewMaster && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95"
            onClick={closeLightbox}
          >
            <button
              onClick={(e) => { e.stopPropagation(); closeLightbox(); }}
              className="absolute right-4 top-4 z-10 rounded-full bg-white/10 p-2 text-white backdrop-blur-sm hover:bg-white/20"
            >
              <X className="h-6 w-6" />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); goLightbox(-1); }}
              className="absolute left-4 z-10 rounded-full bg-white/10 p-3 text-white backdrop-blur-sm hover:bg-white/20"
            >
              <ChevronLeft className="h-8 w-8" />
            </button>

            <motion.img
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              src={viewMaster.photos[lightboxIndex]}
              alt={`${viewMaster.name} work ${lightboxIndex + 1}`}
              className="max-h-[80vh] max-w-[85vw] rounded-2xl object-contain"
              onClick={(e) => e.stopPropagation()}
            />

            <button
              onClick={(e) => { e.stopPropagation(); goLightbox(1); }}
              className="absolute right-4 z-10 rounded-full bg-white/10 p-3 text-white backdrop-blur-sm hover:bg-white/20"
            >
              <ChevronRight className="h-8 w-8" />
            </button>

            <div className="absolute bottom-6 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm">
              {lightboxIndex + 1} / {viewMaster.photos.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChooseMasterScreen;

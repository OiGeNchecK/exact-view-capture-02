import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useKioskStore, type ServiceCategory } from '@/store/useKioskStore';
import { useTranslation } from '@/hooks/useTranslation';
import { Scissors, Sparkles, Heart, Droplets, Hand, Zap } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import KioskHeader from '@/components/KioskHeader';

const categories: { code: ServiceCategory; icon: LucideIcon }[] = [
  { code: 'hair', icon: Scissors },
  { code: 'nails', icon: Sparkles },
  { code: 'makeup', icon: Heart },
  { code: 'sugaring', icon: Droplets },
  { code: 'massage', icon: Hand },
  { code: 'laser', icon: Zap },
];

const ServiceScreen = () => {
  const { t } = useTranslation();
  const { setCategory } = useKioskStore();
  const navigate = useNavigate();

  const handleSelect = (code: ServiceCategory) => {
    setCategory(code);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen">
      <KioskHeader />
      <main className="flex flex-col items-center px-4 pt-24 pb-12 sm:px-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-3 font-display text-3xl font-bold text-gold sm:text-4xl md:text-5xl"
        >
          {t('select_service')}
        </motion.h1>
        <div className="mx-auto mb-10 h-px w-24 bg-gold-gradient" />

        <div className="flex w-full max-w-[1200px] flex-wrap items-center justify-center gap-4 sm:gap-5 md:gap-6">
          {categories.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <motion.button
                key={cat.code}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.07, type: 'spring', stiffness: 120 }}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleSelect(cat.code)}
                className="tile-luxury group flex w-[calc(33%-0.75rem)] flex-col items-center justify-center gap-4 rounded-2xl px-3 py-12 sm:w-[170px] sm:gap-5 sm:rounded-[20px] sm:px-4 sm:py-16 md:py-20"
                style={{ minWidth: 0, maxWidth: 200 }}
              >
                <Icon className="h-9 w-9 text-gold drop-shadow-[0_0_8px_hsl(40_55%_50%/0.5)] transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_16px_hsl(40_55%_50%/0.7)] sm:h-10 sm:w-10" />
                <span className="min-h-[2.5rem] text-center text-sm font-medium leading-tight text-foreground sm:text-base">
                  {t(cat.code)}
                </span>
              </motion.button>
            );
          })}
        </div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          onClick={() => navigate('/')}
          className="mt-12 rounded-xl card-luxury px-6 py-3 text-muted-foreground transition-colors hover:text-gold"
        >
          ← {t('back')}
        </motion.button>
      </main>
    </div>
  );
};

export default ServiceScreen;

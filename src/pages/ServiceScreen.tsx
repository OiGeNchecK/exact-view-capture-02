import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useKioskStore, type ServiceCategory } from '@/store/useKioskStore';
import { useTranslation } from '@/hooks/useTranslation';
import { Scissors, Sparkles, Heart, Droplets, Hand, Zap } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

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
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-8">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-4 font-display text-5xl font-bold text-gold"
      >
        {t('select_service')}
      </motion.h1>
      <div className="mx-auto mb-16 h-px w-24 bg-gold-gradient" />

      <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
        {categories.map((cat, i) => {
          const Icon = cat.icon;
          return (
            <motion.button
              key={cat.code}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.08 }}
              whileHover={{ scale: 1.04, y: -4 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleSelect(cat.code)}
              className="group flex h-44 w-44 flex-col items-center justify-center gap-4 rounded-3xl border border-border bg-glass transition-all duration-300 hover:border-gold-bright hover:shadow-gold-lg md:h-48 md:w-48"
            >
              <Icon className="h-10 w-10 text-gold transition-transform duration-300 group-hover:scale-110" />
              <span className="px-3 text-center text-base font-medium leading-tight text-foreground">
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
        onClick={() => navigate('/gender')}
        className="mt-16 text-muted-foreground transition-colors hover:text-gold"
      >
        ← {t('back')}
      </motion.button>
    </div>
  );
};

export default ServiceScreen;

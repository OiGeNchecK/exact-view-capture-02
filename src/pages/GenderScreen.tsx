import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useKioskStore, type Gender } from '@/store/useKioskStore';
import { useTranslation } from '@/hooks/useTranslation';

const genders: { key: Gender; icon: string }[] = [
  { key: 'female', icon: '♀' },
  { key: 'male', icon: '♂' },
];

const GenderScreen = () => {
  const { t } = useTranslation();
  const { setGender } = useKioskStore();
  const navigate = useNavigate();

  const handleSelect = (g: Gender) => {
    setGender(g);
    navigate('/services');
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-8">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-4 font-display text-5xl font-bold text-gold"
      >
        {t('select_gender')}
      </motion.h1>
      <div className="mx-auto mb-16 h-px w-24 bg-gold-gradient" />

      <div className="flex gap-8">
        {genders.map((g, i) => (
          <motion.button
            key={g.key}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.15 }}
            whileHover={{ scale: 1.05, y: -4 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleSelect(g.key)}
            className="group flex h-56 w-56 flex-col items-center justify-center rounded-3xl border border-border bg-glass transition-all duration-300 hover:border-gold-bright hover:shadow-gold-lg"
          >
            <span className="mb-4 text-6xl text-gold transition-transform duration-300 group-hover:scale-110">
              {g.icon}
            </span>
            <span className="text-xl font-medium text-foreground">{t(g.key)}</span>
          </motion.button>
        ))}
      </div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        onClick={() => navigate('/')}
        className="mt-16 text-muted-foreground transition-colors hover:text-gold"
      >
        ← {t('back')}
      </motion.button>
    </div>
  );
};

export default GenderScreen;

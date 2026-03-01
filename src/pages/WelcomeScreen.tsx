import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useKioskStore } from '@/store/useKioskStore';
import { useTranslation } from '@/hooks/useTranslation';
import type { Language } from '@/i18n/translations';

const languages: { code: Language; label: string; flag: string }[] = [
  { code: 'DE', label: 'Deutsch', flag: '🇩🇪' },
  { code: 'UA', label: 'Українська', flag: '🇺🇦' },
  { code: 'EN', label: 'English', flag: '🇬🇧' },
];

const WelcomeScreen = () => {
  const { t } = useTranslation();
  const { language, setLanguage } = useKioskStore();
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 sm:px-8">
      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="mb-12 text-center sm:mb-16"
      >
        <h1 className="font-display text-5xl font-bold tracking-wider text-gold sm:text-6xl">
          TINTEI
        </h1>
        <p className="mt-2 font-display text-xl tracking-[0.3em] text-gold-glow sm:text-2xl">
          BEAUTY
        </p>
        <div className="mx-auto mt-6 h-px w-32 bg-gold-gradient" />
      </motion.div>

      {/* Language selection — tile cards */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="mb-12 flex w-full items-stretch justify-center gap-4 overflow-x-auto overflow-y-hidden px-2 sm:gap-5"
        style={{ scrollbarWidth: 'none' }}
      >
        {languages.map((lang, i) => (
          <motion.button
            key={lang.code}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 + i * 0.08, type: 'spring', stiffness: 120 }}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setLanguage(lang.code)}
            className={`tile-luxury group flex shrink-0 flex-col items-center justify-center gap-3 rounded-2xl px-4 py-10 sm:gap-4 sm:py-14 ${
              language === lang.code
                ? '!border-gold shadow-gold-lg'
                : ''
            }`}
            style={{ width: 180, maxWidth: 220 }}
          >
            <span className="text-4xl drop-shadow-[0_0_8px_hsl(40_55%_50%/0.4)] transition-transform duration-300 group-hover:scale-110 sm:text-5xl">
              {lang.flag}
            </span>
            <span className="text-sm font-medium text-foreground sm:text-base">
              {lang.label}
            </span>
          </motion.button>
        ))}
      </motion.div>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="mb-10 text-center text-base text-muted-foreground sm:text-lg"
      >
        {t('welcome_subtitle')}
      </motion.p>

      {/* Start button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => navigate('/services')}
        className="bg-gold-gradient rounded-2xl px-12 py-4 text-lg font-semibold text-primary-foreground shadow-gold-lg transition-shadow hover:shadow-gold-lg sm:px-16 sm:py-5 sm:text-xl"
      >
        {t('start')}
      </motion.button>
    </div>
  );
};

export default WelcomeScreen;

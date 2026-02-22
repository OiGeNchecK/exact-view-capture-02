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
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-8">
      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="mb-16 text-center"
      >
        <h1 className="font-display text-6xl font-bold tracking-wider text-gold">
          TINTEI
        </h1>
        <p className="mt-2 font-display text-2xl tracking-[0.3em] text-gold-glow">
          BEAUTY
        </p>
        <div className="mx-auto mt-6 h-px w-32 bg-gold-gradient" />
      </motion.div>

      {/* Language selection */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="mb-12 flex gap-4"
      >
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={`flex items-center gap-3 rounded-xl border px-6 py-4 text-lg transition-all duration-300 ${
              language === lang.code
                ? 'border-gold-bright bg-glass shadow-gold text-gold'
                : 'border-border bg-glass text-muted-foreground hover:border-gold-dim hover:text-foreground'
            }`}
          >
            <span className="text-2xl">{lang.flag}</span>
            <span className="font-body font-medium">{lang.label}</span>
          </button>
        ))}
      </motion.div>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="mb-10 text-center text-lg text-muted-foreground"
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
        onClick={() => navigate('/gender')}
        className="bg-gold-gradient rounded-2xl px-16 py-5 text-xl font-semibold text-primary-foreground shadow-gold-lg transition-shadow hover:shadow-gold-lg"
      >
        {t('start')}
      </motion.button>
    </div>
  );
};

export default WelcomeScreen;

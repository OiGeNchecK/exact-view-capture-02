import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '@/hooks/useTranslation';
import { useKioskStore } from '@/store/useKioskStore';
import KioskHeader from '@/components/KioskHeader';
import { mockMasters } from '@/data/mockMasters';
import { CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

const ChooseMasterScreen = () => {
  const { t, language } = useTranslation();
  const navigate = useNavigate();
  const category = useKioskStore((s) => s.category);

  const masters = mockMasters.filter(
    (m) => m.available && m.specialization.includes(category!)
  );

  const handleSelect = (name: string) => {
    toast.success(`${t('master_selected')}: ${name}`);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-background">
      <KioskHeader />
      <main className="flex min-h-screen flex-col items-center px-8 pt-24 pb-12">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 font-display text-4xl font-bold text-gold"
        >
          {t('choose_master')}
        </motion.h1>
        <div className="mx-auto mb-8 h-px w-24 bg-gold-gradient" />

        <div className="grid w-full max-w-2xl grid-cols-1 gap-5 sm:grid-cols-2">
          {masters.map((master, i) => (
            <motion.button
              key={master.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleSelect(master.name)}
              className="group flex items-center gap-4 rounded-2xl border border-border bg-glass p-5 transition-all hover:border-gold-bright hover:shadow-gold-lg"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-gold bg-gold/10 font-display text-lg font-bold text-gold">
                {master.avatar}
              </div>
              <div className="flex-1 text-left">
                <p className="font-semibold text-foreground">{master.name}</p>
                <p className="text-sm text-muted-foreground">{master.title[language]}</p>
              </div>
              <div className="flex items-center gap-1 text-emerald-400">
                <CheckCircle className="h-4 w-4" />
                <span className="text-xs">{t('available_now')}</span>
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
          className="mt-12 text-muted-foreground transition-colors hover:text-gold"
        >
          ← {t('back')}
        </motion.button>
      </main>
    </div>
  );
};

export default ChooseMasterScreen;

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '@/hooks/useTranslation';
import { useKioskStore } from '@/store/useKioskStore';
import KioskHeader from '@/components/KioskHeader';
import { mockMasters } from '@/data/mockMasters';
import type { Master } from '@/data/mockMasters';
import { CheckCircle, Calendar, GraduationCap, MapPin } from 'lucide-react';
import { toast } from 'sonner';
import { Dialog, DialogContent } from '@/components/ui/dialog';

const ChooseMasterScreen = () => {
  const { t, language } = useTranslation();
  const navigate = useNavigate();
  const category = useKioskStore((s) => s.category);
  const [selectedMaster, setSelectedMaster] = useState<Master | null>(null);

  const masters = mockMasters.filter(
    (m) => m.available && m.specialization.includes(category!)
  );

  const handleSelect = (master: Master) => {
    setSelectedMaster(master);
  };

  const handleConfirm = (name: string) => {
    toast.success(`${t('master_selected')}: ${name}`);
    setSelectedMaster(null);
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
              onClick={() => handleSelect(master)}
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

      <Dialog open={!!selectedMaster} onOpenChange={() => setSelectedMaster(null)}>
        <DialogContent className="max-w-md border-border bg-background p-0">
          {selectedMaster && (
            <div className="p-6">
              <div className="mb-4 flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-gold bg-gold/10 font-display text-xl font-bold text-gold">
                  {selectedMaster.avatar}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-foreground">{selectedMaster.name}</h2>
                  <p className="text-sm text-gold">{selectedMaster.title[language]}</p>
                </div>
              </div>

              <div className="mb-5 space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4 text-gold" />
                  <span>{t('age')}: {selectedMaster.age} | {t('experience')}: {selectedMaster.experienceYears} {t('years')}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <GraduationCap className="h-4 w-4 text-gold" />
                  <span>{selectedMaster.education[language]}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 text-gold" />
                  <span>{selectedMaster.workplace[language]}</span>
                </div>
              </div>

              <p className="mb-3 text-sm font-medium text-gold">{t('work_photos')}</p>
              <div className="grid grid-cols-3 gap-2">
                {selectedMaster.photos.map((photo, i) => (
                  <div key={i} className="aspect-square overflow-hidden rounded-xl border border-border">
                    <img src={photo} alt={`${selectedMaster.name} work ${i + 1}`} className="h-full w-full object-cover" loading="lazy" />
                  </div>
                ))}
              </div>

              <button
                onClick={() => handleConfirm(selectedMaster.name)}
                className="mt-5 w-full rounded-xl bg-gold py-3 text-lg font-semibold text-background transition-colors hover:bg-gold-bright"
              >
                {t('master_selected')}
              </button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ChooseMasterScreen;

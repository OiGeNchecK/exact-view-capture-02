import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '@/hooks/useTranslation';
import { useKioskStore } from '@/store/useKioskStore';
import KioskHeader from '@/components/KioskHeader';
import { mockMasters } from '@/data/mockMasters';
import type { Master } from '@/data/mockMasters';
import {
  ClipboardList,
  CalendarPlus,
  Coffee,
  ShoppingBag,
  TrendingUp,
  UserCheck,
  X,
  Briefcase,
  GraduationCap,
  MapPin,
  Calendar,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';

interface MenuItem {
  key: string;
  icon: LucideIcon;
  route: string;
}

const menuItems: MenuItem[] = [
  { key: 'price_list', icon: ClipboardList, route: '/price-list' },
  { key: 'booking', icon: CalendarPlus, route: '/booking' },
  { key: 'order_drink', icon: Coffee, route: '/order-drink' },
  { key: 'order_product', icon: ShoppingBag, route: '/order-product' },
  { key: 'trending', icon: TrendingUp, route: '/trending' },
  { key: 'choose_master', icon: UserCheck, route: '/choose-master' },
];

const DashboardScreen = () => {
  const { t, language } = useTranslation();
  const navigate = useNavigate();
  const category = useKioskStore((s) => s.category);
  const [selectedMaster, setSelectedMaster] = useState<Master | null>(null);

  // Get all unique masters for the current category
  const categoryMasters = mockMasters.filter(
    (m) => m.available && m.specialization.includes(category!)
  );

  return (
    <div className="min-h-screen bg-background">
      <KioskHeader />
      <main className="flex min-h-screen flex-col items-center justify-center px-8 pt-24">
        {/* Master selection bar */}
        {categoryMasters.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 w-full max-w-3xl"
          >
            <div className="flex w-full items-center gap-4 rounded-2xl border border-border bg-glass p-4">
              <UserCheck className="h-6 w-6 shrink-0 text-gold" />
              <span className="shrink-0 font-medium text-foreground">{t('choose_master')}</span>
              <div className="flex flex-1 items-center gap-3 overflow-x-auto px-2">
                {categoryMasters.map((master) => (
                  <motion.button
                    key={master.id}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedMaster(master)}
                    className="group flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border-2 border-gold/30 bg-gold/10 font-display text-sm font-bold text-gold transition-all hover:border-gold-bright hover:bg-gold/20 hover:shadow-gold"
                    title={master.name}
                  >
                    {master.avatar}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 font-display text-4xl font-bold text-gold"
        >
          {t('dashboard')}
        </motion.h1>
        <div className="mx-auto mb-12 h-px w-24 bg-gold-gradient" />

        <div className="grid w-full max-w-3xl grid-cols-2 gap-5 md:grid-cols-3">
          {menuItems.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.button
                key={item.key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.06 }}
                whileHover={{ scale: 1.04, y: -4 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate(item.route)}
                className="group flex flex-col items-center justify-center gap-4 rounded-3xl border border-border bg-glass p-8 transition-all duration-300 hover:border-gold-bright hover:shadow-gold-lg"
              >
                <Icon className="h-9 w-9 text-gold transition-transform duration-300 group-hover:scale-110" />
                <span className="text-center text-base font-medium leading-tight text-foreground">
                  {t(item.key)}
                </span>
              </motion.button>
            );
          })}
        </div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          onClick={() => navigate('/services')}
          className="mt-12 text-muted-foreground transition-colors hover:text-gold"
        >
          ← {t('back')}
        </motion.button>
      </main>

      {/* Master detail dialog */}
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
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DashboardScreen;

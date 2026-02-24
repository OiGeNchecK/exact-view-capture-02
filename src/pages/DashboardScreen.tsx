import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '@/hooks/useTranslation';
import { useKioskStore } from '@/store/useKioskStore';
import KioskHeader from '@/components/KioskHeader';
import {
  ClipboardList,
  CalendarPlus,
  Coffee,
  ShoppingBag,
  TrendingUp,
  UserCheck,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

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
];

const DashboardScreen = () => {
  const { t, language } = useTranslation();
  const navigate = useNavigate();
  const selectedMaster = useKioskStore((s) => s.selectedMaster);
  const setSelectedMaster = useKioskStore((s) => s.setSelectedMaster);

  return (
    <div className="min-h-screen bg-background">
      <KioskHeader />
      <main className="flex min-h-screen flex-col items-center px-4 pt-20 pb-12 sm:px-8">
        {/* Selected master badge — click to re-choose */}
        {selectedMaster ? (
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              setSelectedMaster(null);
              navigate('/choose-master');
            }}
            className="mb-4 flex items-center gap-3 rounded-2xl border-2 border-gold bg-gold/10 px-5 py-2"
          >
            <img
              src={selectedMaster.photo}
              alt={selectedMaster.name}
              className="h-12 w-12 rounded-xl object-cover"
            />
            <div className="text-left">
              <p className="text-sm font-semibold text-gold">{selectedMaster.name}</p>
              <p className="text-xs text-muted-foreground">{selectedMaster.title[language]}</p>
            </div>
          </motion.button>
        ) : (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/choose-master')}
            className="mb-4 flex w-full max-w-3xl items-center justify-center gap-3 rounded-2xl border border-gold/50 bg-gold/10 px-6 py-4 transition-all hover:border-gold-bright hover:bg-gold/20 hover:shadow-gold-lg"
          >
            <UserCheck className="h-6 w-6 text-gold" />
            <span className="text-base font-semibold text-gold sm:text-lg">{t('choose_master')}</span>
          </motion.button>
        )}

        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 font-display text-3xl font-bold text-gold sm:text-4xl"
        >
          {t('dashboard')}
        </motion.h1>
        <div className="mx-auto mb-6 h-px w-24 bg-gold-gradient" />

        <div className="grid w-full max-w-3xl grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3">
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
                className="card-luxury group flex flex-col items-center justify-center gap-3 rounded-2xl p-6 transition-all duration-300 sm:gap-4 sm:p-8"
              >
                <Icon className="h-8 w-8 text-gold transition-transform duration-300 group-hover:scale-110 sm:h-9 sm:w-9" />
                <span className="text-center text-sm font-medium leading-tight text-foreground sm:text-base">
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
          className="mt-10 rounded-xl card-luxury px-6 py-3 text-muted-foreground transition-colors hover:text-gold"
        >
          ← {t('back')}
        </motion.button>
      </main>
    </div>
  );
};

export default DashboardScreen;

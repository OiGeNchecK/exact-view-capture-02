import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '@/hooks/useTranslation';
import { useKioskStore } from '@/store/useKioskStore';
import KioskHeader from '@/components/KioskHeader';
import {
  CalendarPlus,
  Coffee,
  Diamond,
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
  { key: 'booking', icon: CalendarPlus, route: '/booking' },
  { key: 'price_list', icon: Diamond, route: '/price-list' },
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
    <div className="h-screen overflow-hidden">
      <KioskHeader />
      <main className="flex h-[calc(100vh-64px)] flex-col items-center justify-center gap-4 px-4 pt-16">
        {/* Selected master badge */}
        {selectedMaster ? (
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => {
              setSelectedMaster(null);
              navigate('/choose-master');
            }}
            className="tile-luxury flex items-center gap-3 rounded-2xl px-5 py-3"
          >
            <img
              src={selectedMaster.photo}
              alt={selectedMaster.name}
              className="h-10 w-10 rounded-xl object-cover"
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
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/choose-master')}
            className="tile-luxury flex items-center justify-center gap-3 rounded-2xl px-6 py-3"
          >
            <UserCheck className="h-5 w-5 text-gold drop-shadow-[0_0_8px_hsl(40_55%_50%/0.5)]" />
            <span className="text-base font-semibold text-gold">{t('choose_master')}</span>
          </motion.button>
        )}

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-2xl font-bold text-gold sm:text-3xl"
        >
          {t('dashboard')}
        </motion.h1>
        <div className="mx-auto h-px w-24 bg-gold-gradient" />

        {/* Fullscreen Tiles Row */}
        <div className="flex w-full max-w-[1200px] items-center justify-center gap-3 px-2 sm:gap-4 md:gap-5">
          {menuItems.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.button
                key={item.key}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.07, type: 'spring', stiffness: 120 }}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate(item.route)}
                className="tile-luxury group flex flex-1 flex-col items-center justify-center gap-3 rounded-2xl px-2 py-8 sm:gap-4 sm:rounded-[20px] sm:px-3 sm:py-12 md:py-16"
                style={{ minWidth: 0, maxWidth: 220 }}
              >
                <Icon className="h-8 w-8 text-gold drop-shadow-[0_0_8px_hsl(40_55%_50%/0.5)] transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_16px_hsl(40_55%_50%/0.7)] sm:h-9 sm:w-9" />
                <span className="min-h-[2rem] text-center text-xs font-medium leading-tight text-foreground sm:text-sm">
                  {t(item.key)}
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* Back */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          onClick={() => navigate('/services')}
          className="rounded-xl card-luxury px-6 py-2.5 text-muted-foreground transition-colors hover:text-gold"
        >
          ← {t('back')}
        </motion.button>
      </main>
    </div>
  );
};

export default DashboardScreen;

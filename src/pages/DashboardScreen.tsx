import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '@/hooks/useTranslation';
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
  { key: 'choose_master', icon: UserCheck, route: '/choose-master' },
];

const DashboardScreen = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <KioskHeader />
      <main className="flex min-h-screen flex-col items-center justify-center px-8 pt-24">
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
    </div>
  );
};

export default DashboardScreen;

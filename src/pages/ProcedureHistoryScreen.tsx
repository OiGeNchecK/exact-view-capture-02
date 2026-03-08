import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '@/hooks/useTranslation';
import { useKioskStore } from '@/store/useKioskStore';
import KioskHeader from '@/components/KioskHeader';
import { History, ShoppingBag, Coffee, Scissors } from 'lucide-react';
import { format } from 'date-fns';

const typeIcons = {
  service: Scissors,
  product: ShoppingBag,
  drink: Coffee,
};

const ProcedureHistoryScreen = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const orderHistory = useKioskStore((s) => s.orderHistory);
  const isGuest = useKioskStore((s) => s.isGuest);

  // Redirect guests away
  if (isGuest) {
    navigate('/dashboard');
    return null;
  }

  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <KioskHeader />
      <main className="flex flex-1 flex-col items-center overflow-y-auto px-4 pt-24 pb-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-2 flex items-center gap-3"
        >
          <History className="h-8 w-8 text-gold" />
          <h1 className="font-display text-3xl font-bold text-gold">{t('procedure_history')}</h1>
        </motion.div>
        <div className="mx-auto mb-8 h-px w-24 bg-gold-gradient" />

        {orderHistory.length === 0 ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-muted-foreground"
          >
            {t('no_history')}
          </motion.p>
        ) : (
          <div className="flex w-full max-w-2xl flex-col gap-3">
            {[...orderHistory].reverse().map((item, i) => {
              const Icon = typeIcons[item.type] || ShoppingBag;
              return (
                <motion.div
                  key={`${item.id}-${item.date}-${i}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="tile-luxury flex items-center gap-4 rounded-2xl px-5 py-4"
                >
                  <Icon className="h-6 w-6 shrink-0 text-gold" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{item.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {format(new Date(item.date), 'dd.MM.yyyy HH:mm')} · x{item.quantity}
                    </p>
                  </div>
                  <span className="text-sm font-bold text-gold">€{item.price * item.quantity}</span>
                </motion.div>
              );
            })}
          </div>
        )}

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          onClick={() => navigate('/dashboard')}
          className="mt-8 rounded-xl card-luxury px-6 py-3 text-muted-foreground transition-colors hover:text-gold"
        >
          ← {t('back')}
        </motion.button>
      </main>
    </div>
  );
};

export default ProcedureHistoryScreen;

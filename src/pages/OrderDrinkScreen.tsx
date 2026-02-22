import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '@/hooks/useTranslation';
import KioskHeader from '@/components/KioskHeader';
import { mockDrinks } from '@/data/mockDrinks';
import { Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const OrderDrinkScreen = () => {
  const { t, language } = useTranslation();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Record<string, { selected: boolean; sugar: number }>>({});

  const toggleDrink = (id: string) => {
    setOrders((prev) => ({
      ...prev,
      [id]: prev[id]?.selected ? { selected: false, sugar: 0 } : { selected: true, sugar: 0 },
    }));
  };

  const setSugar = (id: string, delta: number) => {
    setOrders((prev) => ({
      ...prev,
      [id]: { ...prev[id], sugar: Math.max(0, Math.min(5, (prev[id]?.sugar ?? 0) + delta)) },
    }));
  };

  const handleOrder = () => {
    const selected = Object.entries(orders).filter(([, v]) => v.selected);
    if (selected.length === 0) {
      toast.error(t('select_drink'));
      return;
    }
    toast.success(t('drink_ordered'));
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
          {t('order_drink')}
        </motion.h1>
        <div className="mx-auto mb-8 h-px w-24 bg-gold-gradient" />

        <div className="w-full max-w-md space-y-4">
          {mockDrinks.map((drink, i) => {
            const order = orders[drink.id];
            const isSelected = order?.selected;
            return (
              <motion.div
                key={drink.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * i }}
                className={`rounded-2xl border p-4 transition-all ${
                  isSelected ? 'border-gold-bright bg-gold/10' : 'border-border bg-glass'
                }`}
              >
                <button
                  onClick={() => toggleDrink(drink.id)}
                  className="flex w-full items-center gap-4 text-left"
                >
                  <span className="text-3xl">{drink.icon}</span>
                  <span className="text-lg font-medium text-foreground">{drink.name[language]}</span>
                </button>

                {isSelected && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-3 flex items-center justify-between border-t border-border/50 pt-3"
                  >
                    <span className="text-sm text-muted-foreground">{t('sugar_spoons')}</span>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setSugar(drink.id, -1)}
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-foreground hover:border-gold-bright"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-6 text-center text-lg font-semibold text-gold">{order.sugar}</span>
                      <button
                        onClick={() => setSugar(drink.id, 1)}
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-foreground hover:border-gold-bright"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            );
          })}

          <Button
            onClick={handleOrder}
            className="mt-6 w-full rounded-xl bg-gold py-6 text-lg font-semibold text-background hover:bg-gold-bright"
          >
            {t('order')}
          </Button>

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => navigate('/dashboard')}
            className="mt-4 w-full text-center text-muted-foreground transition-colors hover:text-gold"
          >
            ← {t('back')}
          </motion.button>
        </div>
      </main>
    </div>
  );
};

export default OrderDrinkScreen;

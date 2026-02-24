import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '@/hooks/useTranslation';
import { useKioskStore } from '@/store/useKioskStore';
import KioskHeader from '@/components/KioskHeader';
import { mockDrinks } from '@/data/mockDrinks';
import { Minus, Plus, Milk } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const OrderDrinkScreen = () => {
  const { t, language } = useTranslation();
  const navigate = useNavigate();
  const { addToCart } = useKioskStore();
  const [orders, setOrders] = useState<Record<string, { selected: boolean; sugar: number; milk: boolean }>>({});

  const toggleDrink = (id: string) => {
    setOrders((prev) => ({
      ...prev,
      [id]: prev[id]?.selected ? { selected: false, sugar: 0, milk: false } : { selected: true, sugar: 0, milk: false },
    }));
  };

  const setSugar = (id: string, delta: number) => {
    setOrders((prev) => ({
      ...prev,
      [id]: { ...prev[id], sugar: Math.max(0, Math.min(5, (prev[id]?.sugar ?? 0) + delta)) },
    }));
  };

  const toggleMilk = (id: string) => {
    setOrders((prev) => ({
      ...prev,
      [id]: { ...prev[id], milk: !prev[id]?.milk },
    }));
  };

  const handleOrder = () => {
    const selected = Object.entries(orders).filter(([, v]) => v.selected);
    if (selected.length === 0) {
      toast.error(t('select_drink'));
      return;
    }
    selected.forEach(([id, config]) => {
      const drink = mockDrinks.find((d) => d.id === id);
      if (!drink) return;
      let name = drink.name[language];
      const extras: string[] = [];
      if (config.sugar > 0) extras.push(`${config.sugar}x ${t('sugar_spoons')}`);
      if (config.milk) extras.push(t('milk'));
      if (extras.length > 0) name += ` (${extras.join(', ')})`;
      addToCart({ id: `drink_${id}_${Date.now()}`, name, price: 0 });
    });
    toast.success(t('drink_ordered'));
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-background">
      <KioskHeader />
      <main className="flex min-h-screen flex-col items-center px-8 pt-20 pb-12">
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
                className={`overflow-hidden rounded-2xl border transition-all ${
                  isSelected ? 'border-gold-bright bg-gold/10' : 'border-border bg-glass'
                }`}
              >
                <button
                  onClick={() => toggleDrink(drink.id)}
                  className="flex w-full items-center gap-4 p-4 text-left"
                >
                  <div className="h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-border">
                    <img src={drink.image} alt={drink.name[language]} className="h-full w-full object-cover" loading="lazy" />
                  </div>
                  <span className="text-lg font-medium text-foreground">{drink.name[language]}</span>
                </button>

                {isSelected && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="space-y-3 border-t border-border/50 px-4 pb-4 pt-3"
                  >
                    {/* Sugar */}
                    <div className="flex items-center justify-between">
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
                    </div>

                    {/* Milk option */}
                    {drink.hasMilkOption && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">{t('milk')}</span>
                        <button
                          onClick={() => toggleMilk(drink.id)}
                          className={`flex items-center gap-2 rounded-xl border px-4 py-2 text-sm transition-all ${
                            order.milk
                              ? 'border-gold-bright bg-gold/20 text-gold'
                              : 'border-border bg-glass text-muted-foreground hover:border-gold-bright'
                          }`}
                        >
                          <Milk className="h-4 w-4" />
                          {order.milk ? '✓' : '+'}
                        </button>
                      </div>
                    )}
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
            className="mt-4 w-full rounded-xl border border-border bg-glass py-3 text-center text-muted-foreground transition-colors hover:border-gold-dim hover:text-gold"
          >
            ← {t('back')}
          </motion.button>
        </div>
      </main>
    </div>
  );
};

export default OrderDrinkScreen;

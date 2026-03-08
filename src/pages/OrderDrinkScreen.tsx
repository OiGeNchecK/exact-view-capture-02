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
      addToCart({ id: `drink_${id}_${Date.now()}`, name, price: 0, type: 'drink' });
    });
    toast.success(t('drink_ordered'));
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-background">
      <KioskHeader />
      <main className="flex min-h-screen flex-col items-center px-8 pt-32 pb-12 sm:pt-36">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 font-display text-4xl font-bold text-gold"
        >
          {t('order_drink')}
        </motion.h1>
        <div className="mx-auto mb-8 h-px w-24 bg-gold-gradient" />

        <div className="flex w-full items-stretch justify-center gap-4 overflow-x-auto overflow-y-hidden px-2 sm:gap-5" style={{ scrollbarWidth: 'none' }}>
          {mockDrinks.map((drink, i) => {
            const order = orders[drink.id];
            const isSelected = order?.selected;
            return (
              <motion.div
                key={drink.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.05 * i }}
                onClick={() => toggleDrink(drink.id)}
                className={`tile-luxury flex shrink-0 cursor-pointer flex-col items-center rounded-2xl px-3 py-14 text-center sm:py-16 md:py-20 ${
                  isSelected ? '!border-gold' : ''
                }`}
                style={{ width: 200, maxWidth: 220 }}
              >
                <div className="flex w-full flex-col items-center gap-3">
                  <div className="h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-border">
                    <img src={drink.image} alt={drink.name[language]} className="h-full w-full object-cover" loading="lazy" />
                  </div>
                  <span className="min-h-[2.5rem] text-sm font-medium leading-tight text-foreground">{drink.name[language]}</span>
                </div>

                {isSelected && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    onClick={(e) => e.stopPropagation()}
                    className="mt-3 w-full space-y-3 border-t border-border/50 pt-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">{t('sugar_spoons')}</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setSugar(drink.id, -1)}
                          className="flex h-7 w-7 items-center justify-center rounded-full border border-border text-foreground hover:border-gold-bright"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-5 text-center text-sm font-semibold text-gold">{order.sugar}</span>
                        <button
                          onClick={() => setSugar(drink.id, 1)}
                          className="flex h-7 w-7 items-center justify-center rounded-full border border-border text-foreground hover:border-gold-bright"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                    </div>

                    {drink.hasMilkOption && (
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">{t('milk')}</span>
                        <button
                          onClick={() => toggleMilk(drink.id)}
                          className={`flex items-center gap-1 rounded-lg border px-3 py-1.5 text-xs transition-all ${
                            order.milk
                              ? 'border-gold-bright bg-gold/20 text-gold'
                              : 'border-border bg-glass text-muted-foreground hover:border-gold-bright'
                          }`}
                        >
                          <Milk className="h-3 w-3" />
                          {order.milk ? '✓' : '+'}
                        </button>
                      </div>
                    )}
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>

          <Button
            onClick={handleOrder}
            className="mt-6 w-full max-w-2xl rounded-xl bg-gold py-6 text-lg font-semibold text-background hover:bg-gold-bright"
          >
            {t('order')}
          </Button>

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => navigate('/dashboard')}
            className="mt-4 w-full max-w-2xl rounded-xl card-luxury py-3 text-center text-muted-foreground transition-colors hover:text-gold"
          >
            ← {t('back')}
          </motion.button>
      </main>
    </div>
  );
};

export default OrderDrinkScreen;

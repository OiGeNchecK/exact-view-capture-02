import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '@/hooks/useTranslation';
import { useKioskStore } from '@/store/useKioskStore';
import KioskHeader from '@/components/KioskHeader';
import { mockDrinks } from '@/data/mockDrinks';
import { Minus, Plus, Milk, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useState } from 'react';

const OrderDrinkScreen = () => {
  const { t, language } = useTranslation();
  const navigate = useNavigate();
  const { addToCart } = useKioskStore();
  const [orders, setOrders] = useState<Record<string, { selected: boolean; sugar: number; milk: boolean }>>({});
  const scrollRef = useRef<HTMLDivElement>(null);

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

  const scroll = (dir: number) => {
    scrollRef.current?.scrollBy({ left: dir * 220, behavior: 'smooth' });
  };

  return (
    <div className="h-screen overflow-hidden">
      <KioskHeader />
      <main className="flex h-[calc(100vh-64px)] flex-col items-center justify-center gap-3 px-4 pt-16">
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="font-display text-2xl font-bold text-gold sm:text-3xl"
        >
          {t('order_drink')}
        </motion.h1>
        <div className="mx-auto h-px w-24 bg-gold-gradient" />

        {/* Horizontal scroll area */}
        <div className="relative w-full max-w-[900px] flex-1 min-h-0">
          <button onClick={() => scroll(-1)} className="absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-full card-luxury p-2 text-gold hover:bg-gold/10">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button onClick={() => scroll(1)} className="absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-full card-luxury p-2 text-gold hover:bg-gold/10">
            <ChevronRight className="h-5 w-5" />
          </button>

          <div
            ref={scrollRef}
            className="flex h-full items-center gap-4 overflow-x-auto px-10 scrollbar-hide"
            style={{ scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch' }}
          >
            {mockDrinks.map((drink, i) => {
              const order = orders[drink.id];
              const isSelected = order?.selected;
              return (
                <div
                  key={drink.id}
                  className={`shrink-0 w-[180px] flex flex-col items-center rounded-2xl overflow-hidden transition-all tile-luxury ${
                    isSelected ? '!border-gold' : ''
                  }`}
                  style={{ scrollSnapAlign: 'center' }}
                >
                  {/* Photo */}
                  <button onClick={() => toggleDrink(drink.id)} className="w-full">
                    <div className="aspect-square overflow-hidden">
                      <img src={drink.image} alt={drink.name[language]} className="h-full w-full object-cover" loading="lazy" />
                    </div>
                    <div className="px-2 py-2">
                      <p className="text-center text-sm font-medium text-foreground">{drink.name[language]}</p>
                    </div>
                  </button>

                  {/* Options */}
                  {isSelected && (
                    <div className="w-full space-y-2 border-t border-border/50 px-3 pb-3 pt-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">{t('sugar_spoons')}</span>
                        <div className="flex items-center gap-2">
                          <button onClick={() => setSugar(drink.id, -1)} className="flex h-6 w-6 items-center justify-center rounded-full border border-border text-foreground hover:border-gold-bright">
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-4 text-center text-xs font-semibold text-gold">{order.sugar}</span>
                          <button onClick={() => setSugar(drink.id, 1)} className="flex h-6 w-6 items-center justify-center rounded-full border border-border text-foreground hover:border-gold-bright">
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                      {drink.hasMilkOption && (
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">{t('milk')}</span>
                          <button
                            onClick={() => toggleMilk(drink.id)}
                            className={`flex items-center gap-1 rounded-lg border px-2 py-1 text-xs transition-all ${
                              order.milk ? 'border-gold-bright bg-gold/20 text-gold' : 'border-border bg-glass text-muted-foreground hover:border-gold-bright'
                            }`}
                          >
                            <Milk className="h-3 w-3" />
                            {order.milk ? '✓' : '+'}
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom actions */}
        <div className="flex w-full max-w-[400px] gap-3 pb-2">
          <button
            onClick={() => navigate('/dashboard')}
            className="rounded-xl card-luxury px-5 py-2.5 text-sm text-muted-foreground transition-colors hover:text-gold"
          >
            ← {t('back')}
          </button>
          <Button
            onClick={handleOrder}
            className="flex-1 rounded-xl bg-gold py-2.5 text-sm font-semibold text-background hover:bg-gold-bright"
          >
            {t('order')}
          </Button>
        </div>
      </main>
    </div>
  );
};

export default OrderDrinkScreen;

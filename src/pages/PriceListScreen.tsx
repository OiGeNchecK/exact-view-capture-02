import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useKioskStore } from '@/store/useKioskStore';
import { useTranslation } from '@/hooks/useTranslation';
import { mockServices } from '@/data/mockServices';
import KioskHeader from '@/components/KioskHeader';
import { Plus, Minus, Clock, ChevronLeft, ChevronRight } from 'lucide-react';

const PriceListScreen = () => {
  const { t, language } = useTranslation();
  const { category, addToCart, removeFromCart, cartItems } = useKioskStore();
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement>(null);

  const services = mockServices.filter((s) => s.categoryCode === category);
  const getQty = (id: string) => cartItems.find((ci) => ci.id === id)?.quantity ?? 0;
  const formatPrice = (cents: number) => `${(cents / 100).toFixed(2)} €`;

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
          {t('price_list')}
        </motion.h1>
        <div className="mx-auto h-px w-24 bg-gold-gradient" />

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
            {services.map((s, i) => {
              const qty = getQty(s.id);
              return (
                <div
                  key={s.id}
                  className="shrink-0 w-[180px] tile-luxury flex flex-col items-center justify-center gap-3 rounded-2xl px-3 py-8 sm:py-12 md:py-16 text-center"
                  style={{ scrollSnapAlign: 'center' }}
                >
                  <h3 className="min-h-[2rem] text-sm font-medium text-foreground">{s.name[language]}</h3>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" />
                    {s.durationMin} {t('minutes')}
                  </div>
                  <p className="text-lg font-semibold text-gold">{formatPrice(s.priceCents)}</p>
                  <div className="flex items-center gap-2">
                    {qty > 0 && (
                      <>
                        <button
                          onClick={() => removeFromCart(s.id)}
                          className="flex h-8 w-8 items-center justify-center rounded-xl border border-border text-foreground hover:border-destructive hover:text-destructive"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-5 text-center text-sm font-semibold text-gold">{qty}</span>
                      </>
                    )}
                    <button
                      onClick={() => addToCart({ id: s.id, name: s.name[language], price: s.priceCents })}
                      className="flex h-8 w-8 items-center justify-center rounded-xl border border-border text-gold hover:border-gold-bright hover:bg-gold-gradient hover:text-primary-foreground"
                    >
                      <Plus className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {services.length === 0 && (
          <p className="text-center text-muted-foreground">No services found.</p>
        )}

        <button
          onClick={() => navigate('/dashboard')}
          className="pb-2 rounded-xl card-luxury px-6 py-2.5 text-sm text-muted-foreground transition-colors hover:text-gold"
        >
          ← {t('back')}
        </button>
      </main>
    </div>
  );
};

export default PriceListScreen;

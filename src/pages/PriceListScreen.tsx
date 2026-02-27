import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useKioskStore } from '@/store/useKioskStore';
import { useTranslation } from '@/hooks/useTranslation';
import { mockServices } from '@/data/mockServices';
import KioskHeader from '@/components/KioskHeader';
import { Plus, Minus, Clock } from 'lucide-react';

const PriceListScreen = () => {
  const { t, language } = useTranslation();
  const { category, addToCart, removeFromCart, cartItems } = useKioskStore();
  const navigate = useNavigate();

  const services = mockServices.filter((s) => s.categoryCode === category);

  const getQty = (id: string) => cartItems.find((ci) => ci.id === id)?.quantity ?? 0;

  const formatPrice = (cents: number) => `${(cents / 100).toFixed(2)} €`;

  return (
    <div className="min-h-screen bg-background">
      <KioskHeader />
      <main className="mx-auto max-w-3xl px-8 pb-16 pt-28">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 text-center font-display text-4xl font-bold text-gold"
        >
          {t('price_list')}
        </motion.h1>
        <div className="mx-auto mb-10 h-px w-24 bg-gold-gradient" />

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {services.map((s, i) => {
            const qty = getQty(s.id);
            return (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="tile-luxury flex flex-col items-center justify-between rounded-2xl px-4 py-6 text-center"
              >
                <div className="mb-3">
                  <Clock className="mx-auto mb-2 h-6 w-6 text-gold" />
                  <span className="text-base font-medium text-foreground">{s.name[language]}</span>
                </div>
                <span className="mb-1 text-xs text-muted-foreground">{s.durationMin} {t('minutes')}</span>
                <span className="mb-3 text-lg font-semibold text-gold">{formatPrice(s.priceCents)}</span>
                <div className="flex items-center gap-2">
                  {qty > 0 && (
                    <button
                      onClick={() => removeFromCart(s.id)}
                      className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-glass text-foreground transition-all hover:border-destructive hover:text-destructive"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                  )}
                  {qty > 0 && (
                    <span className="w-5 text-center text-sm font-semibold text-gold">{qty}</span>
                  )}
                  <button
                    onClick={() => addToCart({ id: s.id, name: s.name[language], price: s.priceCents })}
                    className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-glass text-gold transition-all duration-200 hover:border-gold-bright hover:bg-gold-gradient hover:text-primary-foreground hover:shadow-gold"
                  >
                    <Plus className="h-5 w-5" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {services.length === 0 && (
          <p className="py-20 text-center text-lg text-muted-foreground">
            No services found for this category.
          </p>
        )}

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          onClick={() => navigate('/dashboard')}
          className="mx-auto mt-10 block rounded-xl card-luxury px-6 py-3 text-muted-foreground transition-colors hover:text-gold"
        >
          ← {t('back')}
        </motion.button>
      </main>
    </div>
  );
};

export default PriceListScreen;

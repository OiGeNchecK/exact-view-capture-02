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

        <div className="mb-3 grid grid-cols-[1fr_auto_auto_auto] items-center gap-4 px-5 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          <span>{t('service')}</span>
          <span className="w-20 text-center">{t('duration')}</span>
          <span className="w-24 text-right">{t('price')}</span>
          <span className="w-24" />
        </div>

        <div className="flex flex-col gap-3">
          {services.map((s, i) => {
            const qty = getQty(s.id);
            return (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="group grid grid-cols-[1fr_auto_auto_auto] items-center gap-4 rounded-2xl border border-border bg-glass px-5 py-5 transition-all duration-300 hover:border-gold-dim hover:shadow-gold"
              >
                <span className="text-lg font-medium text-foreground">{s.name[language]}</span>
                <span className="flex w-20 items-center justify-center gap-1.5 text-sm text-muted-foreground">
                  <Clock className="h-3.5 w-3.5" />
                  {s.durationMin} {t('minutes')}
                </span>
                <span className="w-24 text-right text-lg font-semibold text-gold">{formatPrice(s.priceCents)}</span>
                <div className="flex w-24 items-center justify-end gap-2">
                  {qty > 0 && (
                    <button
                      onClick={() => removeFromCart(s.id)}
                      className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-glass text-foreground transition-all hover:border-destructive hover:text-destructive"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                  )}
                  {qty > 0 && (
                    <span className="w-5 text-center text-sm font-semibold text-gold">{qty}</span>
                  )}
                  <button
                    onClick={() => addToCart({ id: s.id, name: s.name[language], price: s.priceCents })}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-glass text-gold transition-all duration-200 hover:border-gold-bright hover:bg-gold-gradient hover:text-primary-foreground hover:shadow-gold"
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
          className="mx-auto mt-10 block rounded-xl border border-border bg-glass px-6 py-3 text-muted-foreground transition-colors hover:border-gold-dim hover:text-gold"
        >
          ← {t('back')}
        </motion.button>
      </main>
    </div>
  );
};

export default PriceListScreen;

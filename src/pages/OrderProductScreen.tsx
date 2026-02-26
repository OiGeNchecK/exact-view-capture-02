import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '@/hooks/useTranslation';
import { useKioskStore } from '@/store/useKioskStore';
import KioskHeader from '@/components/KioskHeader';
import { mockProducts } from '@/data/mockProducts';
import { Minus, Plus, ChevronLeft, ChevronRight } from 'lucide-react';

const OrderProductScreen = () => {
  const { t, language } = useTranslation();
  const navigate = useNavigate();
  const category = useKioskStore((s) => s.category);
  const addToCart = useKioskStore((s) => s.addToCart);
  const removeFromCart = useKioskStore((s) => s.removeFromCart);
  const cartItems = useKioskStore((s) => s.cartItems);
  const scrollRef = useRef<HTMLDivElement>(null);

  const products = mockProducts.filter((p) => p.category === category);
  const getQty = (id: string) => cartItems.find((ci) => ci.id === id)?.quantity ?? 0;

  const scroll = (dir: number) => {
    scrollRef.current?.scrollBy({ left: dir * 280, behavior: 'smooth' });
  };

  return (
    <div className="h-screen overflow-hidden">
      <KioskHeader />
      <main className="flex h-[calc(100vh-64px)] flex-col items-center justify-center px-4 pt-16">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-2 font-display text-2xl font-bold text-gold sm:text-3xl"
        >
          {t('order_product')}
        </motion.h1>
        <div className="mx-auto mb-4 h-px w-24 bg-gold-gradient" />

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
            {products.map((product, i) => {
              const qty = getQty(product.id);
              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i }}
                  className="shrink-0 w-[220px] flex flex-col items-center rounded-2xl card-luxury p-5"
                  style={{ scrollSnapAlign: 'center' }}
                >
                  <p className="mb-2 text-center text-base font-medium text-foreground">{product.name[language]}</p>
                  <p className="mb-4 text-sm font-semibold text-gold">{product.price} {t('currency')}</p>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => removeFromCart(product.id)}
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground hover:border-destructive hover:text-destructive disabled:opacity-30"
                      disabled={qty === 0}
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-6 text-center text-lg font-semibold text-gold">{qty}</span>
                    <button
                      onClick={() => addToCart({ id: product.id, name: product.name[language], price: product.price * 100 })}
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground hover:border-gold-bright"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <button
          onClick={() => navigate('/dashboard')}
          className="py-3 rounded-xl card-luxury px-6 text-sm text-muted-foreground transition-colors hover:text-gold"
        >
          ← {t('back')}
        </button>
      </main>
    </div>
  );
};

export default OrderProductScreen;

import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '@/hooks/useTranslation';
import { useKioskStore } from '@/store/useKioskStore';
import KioskHeader from '@/components/KioskHeader';
import { mockProducts } from '@/data/mockProducts';
import { Minus, Plus } from 'lucide-react';

const OrderProductScreen = () => {
  const { t, language } = useTranslation();
  const navigate = useNavigate();
  const category = useKioskStore((s) => s.category);
  const addToCart = useKioskStore((s) => s.addToCart);
  const removeFromCart = useKioskStore((s) => s.removeFromCart);
  const cartItems = useKioskStore((s) => s.cartItems);

  const products = mockProducts.filter((p) => p.category === category);

  const getQty = (id: string) => cartItems.find((ci) => ci.id === id)?.quantity ?? 0;

  return (
    <div className="min-h-screen bg-background">
      <KioskHeader />
      <main className="flex min-h-screen flex-col items-center px-8 pt-24 pb-12">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 font-display text-4xl font-bold text-gold"
        >
          {t('order_product')}
        </motion.h1>
        <div className="mx-auto mb-8 h-px w-24 bg-gold-gradient" />

        <div className="flex w-full items-stretch justify-center gap-4 overflow-x-auto overflow-y-hidden px-2 sm:gap-5" style={{ scrollbarWidth: 'none' }}>
          {products.map((product, i) => {
            const qty = getQty(product.id);
            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.05 * i }}
                className="tile-luxury flex shrink-0 flex-col items-center justify-center gap-3 rounded-2xl px-3 py-14 text-center sm:py-16 md:py-20"
                style={{ width: 200, maxWidth: 220 }}
              >
                <p className="min-h-[2.5rem] text-sm font-medium leading-tight text-foreground">{product.name[language]}</p>
                <p className="text-lg font-semibold text-gold">{product.price} {t('currency')}</p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => removeFromCart(product.id)}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-foreground hover:border-destructive hover:text-destructive disabled:opacity-30"
                    disabled={qty === 0}
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-5 text-center text-sm font-semibold text-gold">{qty}</span>
                  <button
                    onClick={() => addToCart({ id: product.id, name: product.name[language], price: product.price * 100 })}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-foreground hover:border-gold-bright"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => navigate('/dashboard')}
            className="mt-6 w-full max-w-2xl rounded-xl card-luxury py-3 text-center text-muted-foreground transition-colors hover:text-gold"
          >
            ← {t('back')}
          </motion.button>
      </main>
    </div>
  );
};

export default OrderProductScreen;

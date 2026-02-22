import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '@/hooks/useTranslation';
import { useKioskStore } from '@/store/useKioskStore';
import KioskHeader from '@/components/KioskHeader';
import { mockProducts } from '@/data/mockProducts';
import { Minus, Plus, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const OrderProductScreen = () => {
  const { t, language } = useTranslation();
  const navigate = useNavigate();
  const category = useKioskStore((s) => s.category);
  const addToCart = useKioskStore((s) => s.addToCart);
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  const products = mockProducts.filter((p) => p.category === category);

  const setQty = (id: string, delta: number) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(0, (prev[id] ?? 0) + delta),
    }));
  };

  const handleOrder = () => {
    const totalItems = Object.values(quantities).reduce((sum, q) => sum + q, 0);
    if (totalItems === 0) {
      toast.error(t('select_product'));
      return;
    }
    for (let i = 0; i < totalItems; i++) addToCart();
    toast.success(t('product_ordered'));
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
          {t('order_product')}
        </motion.h1>
        <div className="mx-auto mb-8 h-px w-24 bg-gold-gradient" />

        <div className="w-full max-w-md space-y-4">
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * i }}
              className="flex items-center justify-between rounded-2xl border border-border bg-glass p-4"
            >
              <div>
                <p className="font-medium text-foreground">{product.name[language]}</p>
                <p className="text-sm text-gold">{product.price} {t('currency')}</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQty(product.id, -1)}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-foreground hover:border-gold-bright"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-6 text-center text-lg font-semibold text-gold">
                  {quantities[product.id] ?? 0}
                </span>
                <button
                  onClick={() => setQty(product.id, 1)}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-foreground hover:border-gold-bright"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          ))}

          <Button
            onClick={handleOrder}
            className="mt-6 w-full rounded-xl bg-gold py-6 text-lg font-semibold text-background hover:bg-gold-bright"
          >
            <ShoppingBag className="mr-2 h-5 w-5" />
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

export default OrderProductScreen;

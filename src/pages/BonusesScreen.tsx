import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '@/hooks/useTranslation';
import { useKioskStore } from '@/store/useKioskStore';
import KioskHeader from '@/components/KioskHeader';
import { mockProducts } from '@/data/mockProducts';
import { mockServices } from '@/data/mockServices';
import { Gift, Tag, Sparkles } from 'lucide-react';
import type { Language } from '@/i18n/translations';

interface BonusOffer {
  id: string;
  name: Record<Language, string>;
  originalPrice: number;
  discountPercent: number;
  type: 'product' | 'service';
  image?: string;
}

const generateBonuses = (): BonusOffer[] => {
  const productBonuses: BonusOffer[] = mockProducts.slice(0, 4).map((p) => ({
    id: `bonus-${p.id}`,
    name: p.name,
    originalPrice: p.price,
    discountPercent: [10, 15, 20, 25][Math.floor(Math.random() * 4)],
    type: 'product',
    image: p.image,
  }));

  const serviceBonuses: BonusOffer[] = mockServices.slice(0, 4).map((s) => ({
    id: `bonus-${s.id}`,
    name: s.name,
    originalPrice: Math.round(s.priceCents / 100),
    discountPercent: [10, 15, 20][Math.floor(Math.random() * 3)],
    type: 'service',
  }));

  return [...productBonuses, ...serviceBonuses];
};

const bonusOffers = generateBonuses();

const BonusesScreen = () => {
  const { t, language } = useTranslation();
  const navigate = useNavigate();
  const addToCart = useKioskStore((s) => s.addToCart);
  const addToHistory = useKioskStore((s) => s.addToHistory);

  const handleOrder = (offer: BonusOffer) => {
    const discountedPrice = Math.round(offer.originalPrice * (1 - offer.discountPercent / 100)) * 100;
    const item = { id: offer.id, name: offer.name[language], price: discountedPrice };
    addToCart(item);
    addToHistory({ ...item, quantity: 1, type: offer.type });
  };

  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <KioskHeader />
      <main className="flex flex-1 flex-col items-center overflow-y-auto px-4 pt-24 pb-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-2 flex items-center gap-3"
        >
          <Gift className="h-8 w-8 text-gold" />
          <h1 className="font-display text-3xl font-bold text-gold">{t('bonuses')}</h1>
        </motion.div>
        <div className="mx-auto mb-8 h-px w-24 bg-gold-gradient" />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-8 text-center text-muted-foreground"
        >
          {t('bonuses_subtitle')}
        </motion.p>

        {/* Product discounts */}
        <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-foreground">
          <Tag className="h-5 w-5 text-gold" /> {t('product_discounts')}
        </h2>
        <div className="mb-8 grid w-full max-w-4xl grid-cols-2 gap-4 sm:grid-cols-4">
          {bonusOffers.filter((o) => o.type === 'product').map((offer, i) => (
            <motion.div
              key={offer.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.05 }}
              className="tile-luxury flex flex-col items-center gap-3 rounded-2xl p-4"
            >
              {offer.image && (
                <img src={offer.image} alt={offer.name[language]} className="h-20 w-20 rounded-xl object-cover" />
              )}
              <p className="text-center text-sm font-medium text-foreground">{offer.name[language]}</p>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground line-through">€{offer.originalPrice}</span>
                <span className="text-base font-bold text-gold">
                  €{Math.round(offer.originalPrice * (1 - offer.discountPercent / 100))}
                </span>
              </div>
              <span className="rounded-full bg-gold/20 px-3 py-1 text-xs font-semibold text-gold">
                -{offer.discountPercent}%
              </span>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleOrder(offer)}
                className="mt-auto rounded-xl bg-gold-gradient px-4 py-2 text-xs font-semibold text-primary-foreground"
              >
                {t('order')}
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* Service discounts */}
        <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-foreground">
          <Sparkles className="h-5 w-5 text-gold" /> {t('service_discounts')}
        </h2>
        <div className="mb-8 grid w-full max-w-4xl grid-cols-2 gap-4 sm:grid-cols-4">
          {bonusOffers.filter((o) => o.type === 'service').map((offer, i) => (
            <motion.div
              key={offer.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.05 }}
              className="tile-luxury flex flex-col items-center gap-3 rounded-2xl p-4"
            >
              <p className="text-center text-sm font-medium text-foreground">{offer.name[language]}</p>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground line-through">€{offer.originalPrice}</span>
                <span className="text-base font-bold text-gold">
                  €{Math.round(offer.originalPrice * (1 - offer.discountPercent / 100))}
                </span>
              </div>
              <span className="rounded-full bg-gold/20 px-3 py-1 text-xs font-semibold text-gold">
                -{offer.discountPercent}%
              </span>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleOrder(offer)}
                className="mt-auto rounded-xl bg-gold-gradient px-4 py-2 text-xs font-semibold text-primary-foreground"
              >
                {t('order')}
              </motion.button>
            </motion.div>
          ))}
        </div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          onClick={() => navigate('/dashboard')}
          className="mt-4 rounded-xl card-luxury px-6 py-3 text-muted-foreground transition-colors hover:text-gold"
        >
          ← {t('back')}
        </motion.button>
      </main>
    </div>
  );
};

export default BonusesScreen;

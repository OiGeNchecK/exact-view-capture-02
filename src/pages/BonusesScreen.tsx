import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '@/hooks/useTranslation';
import { useKioskStore, type ServiceCategory } from '@/store/useKioskStore';
import KioskHeader from '@/components/KioskHeader';
import { mockProducts } from '@/data/mockProducts';
import { mockServices } from '@/data/mockServices';
import { Gift, Tag, Sparkles } from 'lucide-react';
import type { Language } from '@/i18n/translations';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

interface BonusOffer {
  id: string;
  name: Record<Language, string>;
  originalPrice: number;
  discountPercent: number;
  type: 'product' | 'service';
  category: ServiceCategory;
  image?: string;
}

const discountPercents = [10, 15, 20, 25];

const generateBonuses = (): BonusOffer[] => {
  const productBonuses: BonusOffer[] = mockProducts.map((p, i) => ({
    id: `bonus-p-${p.id}`,
    name: p.name,
    originalPrice: p.price * 100,
    discountPercent: discountPercents[i % discountPercents.length],
    type: 'product',
    category: p.category,
    image: p.image,
  }));

  const serviceBonuses: BonusOffer[] = mockServices.map((s, i) => ({
    id: `bonus-s-${s.id}`,
    name: s.name,
    originalPrice: s.priceCents,
    discountPercent: discountPercents[i % discountPercents.length],
    type: 'service',
    category: s.categoryCode,
    image: s.image,
  }));

  return [...productBonuses, ...serviceBonuses];
};

const allBonuses = generateBonuses();
const categories: ServiceCategory[] = ['hair', 'nails', 'makeup', 'sugaring', 'massage', 'laser'];

const BonusesScreen = () => {
  const { t, language } = useTranslation();
  const navigate = useNavigate();
  const storeCategory = useKioskStore((s) => s.category);
  const addToCart = useKioskStore((s) => s.addToCart);
  const addToHistory = useKioskStore((s) => s.addToHistory);
  const [activeTab, setActiveTab] = useState<string>(storeCategory ?? 'hair');

  const handleOrder = (offer: BonusOffer) => {
    const discountedPrice = Math.round(offer.originalPrice * (1 - offer.discountPercent / 100));
    const item = { id: offer.id, name: offer.name[language], price: discountedPrice, type: offer.type as 'service' | 'product' | 'drink' };
    addToCart(item);
    addToHistory({ ...item, quantity: 1, type: offer.type, confirmed: true, batchId: crypto.randomUUID() });
  };

  const BonusCard = ({ offer, i }: { offer: BonusOffer; i: number }) => (
    <motion.div
      key={offer.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 * i }}
      className="tile-luxury flex flex-col items-center gap-3 rounded-2xl p-4"
    >
      {offer.image && (
        <img src={offer.image} alt={offer.name[language]} className="h-16 w-16 rounded-xl object-cover" />
      )}
      <p className="min-h-[2rem] text-center text-sm font-medium leading-tight text-foreground">{offer.name[language]}</p>
      <div className="flex items-center gap-2">
        <span className="text-xs text-muted-foreground line-through">€{(offer.originalPrice / 100).toFixed(0)}</span>
        <span className="text-base font-bold text-gold">
          €{(Math.round(offer.originalPrice * (1 - offer.discountPercent / 100)) / 100).toFixed(0)}
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
  );

  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <KioskHeader />
      <main className="flex flex-1 flex-col items-center overflow-y-auto px-4 pt-32 pb-8 sm:pt-36">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-2 flex items-center gap-3"
        >
          <Gift className="h-8 w-8 text-gold" />
          <h1 className="font-display text-3xl font-bold text-gold">{t('bonuses')}</h1>
        </motion.div>
        <div className="mx-auto mb-4 h-px w-24 bg-gold-gradient" />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-6 text-center text-muted-foreground"
        >
          {t('bonuses_subtitle')}
        </motion.p>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full max-w-4xl">
          <TabsList className="mx-auto mb-6 flex h-auto w-full flex-nowrap justify-start gap-1 overflow-x-auto bg-transparent px-2" style={{ scrollbarWidth: 'none' }}>
            {categories.map((cat) => (
              <TabsTrigger
                key={cat}
                value={cat}
                className="shrink-0 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors data-[state=active]:border-gold data-[state=active]:bg-gold/10 data-[state=active]:text-gold sm:px-4 sm:text-sm"
              >
                {t(cat)}
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map((cat) => {
            const productOffers = allBonuses.filter((o) => o.category === cat && o.type === 'product');
            const serviceOffers = allBonuses.filter((o) => o.category === cat && o.type === 'service');
            return (
              <TabsContent key={cat} value={cat} className="space-y-6">
                {/* Product discounts */}
                {productOffers.length > 0 && (
                  <>
                    <h2 className="flex items-center gap-2 text-lg font-semibold text-foreground">
                      <Tag className="h-5 w-5 text-gold" /> {t('product_discounts')}
                    </h2>
                    <div className="grid w-full grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                      {productOffers.map((offer, i) => (
                        <BonusCard key={offer.id} offer={offer} i={i} />
                      ))}
                    </div>
                  </>
                )}

                {/* Service discounts */}
                {serviceOffers.length > 0 && (
                  <>
                    <h2 className="flex items-center gap-2 text-lg font-semibold text-foreground">
                      <Sparkles className="h-5 w-5 text-gold" /> {t('service_discounts')}
                    </h2>
                    <div className="grid w-full grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                      {serviceOffers.map((offer, i) => (
                        <BonusCard key={offer.id} offer={offer} i={i} />
                      ))}
                    </div>
                  </>
                )}
              </TabsContent>
            );
          })}
        </Tabs>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          onClick={() => navigate('/dashboard')}
          className="mt-8 rounded-xl card-luxury px-6 py-3 text-muted-foreground transition-colors hover:text-gold"
        >
          ← {t('back')}
        </motion.button>
      </main>
    </div>
  );
};

export default BonusesScreen;

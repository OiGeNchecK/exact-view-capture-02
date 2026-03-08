import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '@/hooks/useTranslation';
import { useKioskStore } from '@/store/useKioskStore';
import KioskHeader from '@/components/KioskHeader';
import { History, ShoppingBag, Coffee, Scissors, CheckCircle } from 'lucide-react';
import { format } from 'date-fns';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import type { OrderHistoryItem } from '@/store/useKioskStore';

const typeIcons = {
  service: Scissors,
  product: ShoppingBag,
  drink: Coffee,
};

interface Batch {
  batchId: string;
  items: OrderHistoryItem[];
  date: string;
  confirmed: boolean;
}

const groupIntoBatches = (items: OrderHistoryItem[]): Batch[] => {
  const batches: Batch[] = [];
  const seen = new Set<string>();
  // Process in original order
  for (const item of items) {
    if (!seen.has(item.batchId)) {
      seen.add(item.batchId);
      const batchItems = items.filter((i) => i.batchId === item.batchId);
      batches.push({
        batchId: item.batchId,
        items: batchItems,
        date: batchItems[0].date,
        confirmed: batchItems[0].confirmed,
      });
    }
  }
  return batches.reverse();
};

const HistoryList = ({ items, emptyMessage }: { items: OrderHistoryItem[]; emptyMessage: string }) => {
  if (items.length === 0) {
    return (
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center text-muted-foreground">
        {emptyMessage}
      </motion.p>
    );
  }

  const batches = groupIntoBatches(items);

  return (
    <div className="flex w-full max-w-2xl flex-col gap-4">
      {batches.map((batch, batchIndex) => (
        <motion.div
          key={batch.batchId}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: batchIndex * 0.08 }}
        >
          {batchIndex > 0 && (
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px flex-1 bg-border" />
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
                {format(new Date(batch.date), 'dd.MM.yyyy HH:mm')}
              </span>
              <div className="h-px flex-1 bg-border" />
            </div>
          )}
          <div className="flex flex-col gap-2">
            {batch.items.map((item, i) => {
              const Icon = typeIcons[item.type] || ShoppingBag;
              const isConfirmed = item.confirmed;
              return (
                <div
                  key={`${item.id}-${item.date}-${i}`}
                  className={`tile-luxury flex items-center gap-4 rounded-2xl px-5 py-4 transition-colors duration-500 ${
                    isConfirmed
                      ? 'border border-emerald-500/30 bg-emerald-500/5'
                      : ''
                  }`}
                >
                  <Icon className={`h-6 w-6 shrink-0 ${isConfirmed ? 'text-emerald-400' : 'text-gold'}`} />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{item.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {format(new Date(item.date), 'dd.MM.yyyy HH:mm')} · x{item.quantity}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {item.price > 0 && (
                      <span className={`text-sm font-bold ${isConfirmed ? 'text-emerald-400' : 'text-gold'}`}>
                        €{((item.price * item.quantity) / 100).toFixed(2)}
                      </span>
                    )}
                    {isConfirmed && <CheckCircle className="h-4 w-4 text-emerald-400" />}
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

const ProcedureHistoryScreen = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const orderHistory = useKioskStore((s) => s.orderHistory);
  const isGuest = useKioskStore((s) => s.isGuest);

  if (isGuest) {
    navigate('/dashboard');
    return null;
  }

  const procedures = orderHistory.filter((i) => i.type === 'service');
  const purchases = orderHistory.filter((i) => i.type === 'product' || i.type === 'drink');

  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <KioskHeader />
      <main className="flex flex-1 flex-col items-center overflow-y-auto px-4 pt-32 pb-8 sm:pt-36">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-2 flex items-center gap-3"
        >
          <History className="h-8 w-8 text-gold" />
          <h1 className="font-display text-2xl font-bold text-gold sm:text-3xl">{t('procedure_history')}</h1>
        </motion.div>
        <div className="mx-auto mb-6 h-px w-24 bg-gold-gradient" />

        <Tabs defaultValue="procedures" className="w-full max-w-2xl">
          <TabsList className="mb-6 grid w-full grid-cols-2 bg-muted/50">
            <TabsTrigger value="procedures" className="data-[state=active]:bg-gold/10 data-[state=active]:text-gold">
              {t('tab_procedures')}
            </TabsTrigger>
            <TabsTrigger value="purchases" className="data-[state=active]:bg-gold/10 data-[state=active]:text-gold">
              {t('tab_purchases')}
            </TabsTrigger>
          </TabsList>
          <TabsContent value="procedures">
            <HistoryList items={procedures} emptyMessage={t('no_history')} />
          </TabsContent>
          <TabsContent value="purchases">
            <HistoryList items={purchases} emptyMessage={t('no_purchases')} />
          </TabsContent>
        </Tabs>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          onClick={() => navigate('/dashboard')}
          className="mt-8 rounded-xl card-luxury px-6 py-3 text-muted-foreground transition-colors hover:text-gold"
        >
          ← {t('back')}
        </motion.button>
      </main>
    </div>
  );
};

export default ProcedureHistoryScreen;
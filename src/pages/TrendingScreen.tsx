import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '@/hooks/useTranslation';
import { useKioskStore } from '@/store/useKioskStore';
import KioskHeader from '@/components/KioskHeader';
import { mockTrending } from '@/data/mockTrending';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const TrendingScreen = () => {
  const { t, language } = useTranslation();
  const navigate = useNavigate();
  const category = useKioskStore((s) => s.category);
  const scrollRef = useRef<HTMLDivElement>(null);

  const trends = mockTrending.filter((tr) => tr.category === category);

  const scroll = (dir: number) => {
    scrollRef.current?.scrollBy({ left: dir * 280, behavior: 'smooth' });
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
          {t('trending')}
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
            {trends.map((trend, i) => (
              <div
                key={trend.id}
                className="shrink-0 w-[180px] tile-luxury flex flex-col items-center justify-center gap-3 overflow-hidden rounded-2xl"
                style={{ scrollSnapAlign: 'center' }}
              >
                <div className="w-full aspect-[4/3] overflow-hidden">
                  <img
                    src={trend.image}
                    alt={trend.title[language]}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="px-2 pb-3">
                  <h3 className="text-center text-sm font-medium text-foreground">{trend.title[language]}</h3>
                </div>
              </div>
            ))}

            {trends.length === 0 && (
              <div className="flex w-full items-center justify-center text-muted-foreground">
                {t('no_trends')}
              </div>
            )}
          </div>
        </div>

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

export default TrendingScreen;

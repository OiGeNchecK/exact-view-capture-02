import { useNavigate } from 'react-router-dom';
import { useKioskStore } from '@/store/useKioskStore';
import { useTranslation } from '@/hooks/useTranslation';
import { ShoppingBag, LogOut } from 'lucide-react';

const KioskHeader = () => {
  const { t } = useTranslation();
  const { category, cartItems, cartTotal, resetSession } = useKioskStore();
  const navigate = useNavigate();
  const cartCount = cartItems.length;

  const handleEnd = () => {
    resetSession();
    navigate('/');
  };

  return (
    <header className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between border-b border-border bg-background/80 px-8 py-4 backdrop-blur-xl">
      <button onClick={() => navigate('/dashboard')} className="flex items-center gap-3">
        <span className="font-display text-2xl font-bold tracking-wider text-gold">TINTEI</span>
        <span className="font-display text-sm tracking-[0.2em] text-gold-dim">BEAUTY</span>
      </button>

      {category && (
        <span className="rounded-full border border-border bg-glass px-4 py-1.5 text-sm font-medium text-foreground">
          {t(category)}
        </span>
      )}

      <div className="flex items-center gap-4">
        {cartTotal > 0 && (
          <span className="text-sm font-semibold text-gold">
            {(cartTotal / 100).toFixed(2)} €
          </span>
        )}
        <button
          onClick={() => {}}
          className="relative rounded-xl border border-border bg-glass p-3 text-foreground transition-colors hover:border-gold-dim hover:text-gold"
        >
          <ShoppingBag className="h-5 w-5" />
          {cartCount > 0 && (
            <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-gold-gradient text-xs font-bold text-primary-foreground">
              {cartCount}
            </span>
          )}
        </button>

        <button
          onClick={handleEnd}
          className="flex items-center gap-2 rounded-xl border border-destructive/30 bg-glass px-4 py-3 text-sm font-medium text-destructive transition-colors hover:bg-destructive/10"
        >
          <LogOut className="h-4 w-4" />
          {t('end_session')}
        </button>
      </div>
    </header>
  );
};

export default KioskHeader;

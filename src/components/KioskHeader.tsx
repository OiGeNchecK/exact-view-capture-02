import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useKioskStore } from '@/store/useKioskStore';
import { useTranslation } from '@/hooks/useTranslation';
import { ShoppingBag, LogOut, X, Minus, Plus } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';

const KioskHeader = () => {
  const { t } = useTranslation();
  const { category, cartItems, cartTotal, resetSession, removeFromCart, addToCart } = useKioskStore();
  const navigate = useNavigate();
  const cartCount = cartItems.reduce((sum, ci) => sum + ci.quantity, 0);
  const [cartOpen, setCartOpen] = useState(false);

  const handleEnd = () => {
    resetSession();
    navigate('/');
  };

  return (
    <>
      <header className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between border-b border-border bg-background/80 px-8 py-4 backdrop-blur-xl">
        <button onClick={() => navigate('/dashboard')} className="flex items-center gap-3">
          <span className="font-display text-2xl font-bold tracking-wider text-gold">TINTEI</span>
          <span className="font-display text-sm tracking-[0.2em] text-gold-dim">BEAUTY</span>
        </button>

        {/* Center: category - absolutely positioned so cart changes don't shift it */}
        {category && (
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-border bg-glass px-4 py-1.5 text-sm font-medium text-foreground">
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
            onClick={() => setCartOpen(true)}
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

      {/* Cart Sheet */}
      <Sheet open={cartOpen} onOpenChange={setCartOpen}>
        <SheetContent className="border-border bg-background">
          <SheetHeader>
            <SheetTitle className="text-gold">{t('cart')}</SheetTitle>
          </SheetHeader>
          <div className="mt-4 flex flex-col gap-3">
            {cartItems.length === 0 && (
              <p className="py-8 text-center text-muted-foreground">{t('cart_empty')}</p>
            )}
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between rounded-xl border border-border bg-glass p-3">
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{item.name}</p>
                  <p className="text-xs text-gold">{(item.price / 100).toFixed(2)} €</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="flex h-7 w-7 items-center justify-center rounded-lg border border-border text-foreground hover:border-destructive hover:text-destructive"
                  >
                    <Minus className="h-3 w-3" />
                  </button>
                  <span className="w-5 text-center text-sm font-semibold text-gold">{item.quantity}</span>
                  <button
                    onClick={() => addToCart({ id: item.id, name: item.name, price: item.price })}
                    className="flex h-7 w-7 items-center justify-center rounded-lg border border-border text-foreground hover:border-gold-bright hover:text-gold"
                  >
                    <Plus className="h-3 w-3" />
                  </button>
                </div>
              </div>
            ))}
            {cartItems.length > 0 && (
              <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
                <span className="font-semibold text-foreground">{t('total')}</span>
                <span className="text-lg font-bold text-gold">{(cartTotal / 100).toFixed(2)} €</span>
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default KioskHeader;

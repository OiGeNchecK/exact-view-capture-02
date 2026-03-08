import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useKioskStore } from '@/store/useKioskStore';
import { useTranslation } from '@/hooks/useTranslation';
import { ShoppingBag, LogOut, Minus, Plus, UserCircle, Bell, StickyNote } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { toast } from 'sonner';

const KioskHeader = () => {
  const { t } = useTranslation();
  const { category, cartItems, cartTotal, resetSession, removeFromCart, addToCart, customerInfo } = useKioskStore();
  const navigate = useNavigate();
  const cartCount = cartItems.reduce((sum, ci) => sum + ci.quantity, 0);
  const [cartOpen, setCartOpen] = useState(false);

  const handleEnd = () => {
    resetSession();
    navigate('/');
  };

  const handleConfirmOrder = () => {
    toast.success(t('order_confirmed'));
    setCartOpen(false);
  };

  return (
    <>
      <header className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between border-b border-gold/20 bg-background/90 px-4 py-3 backdrop-blur-xl sm:px-8 sm:py-4">
        <div className="flex items-center gap-2 sm:gap-4">
          <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2 sm:gap-3">
            <span className="font-display text-xl font-bold tracking-wider text-gold sm:text-2xl">TINTEI</span>
            <span className="hidden font-display text-sm tracking-[0.2em] text-gold-dim sm:inline">BEAUTY</span>
          </button>
          <button
            onClick={() => {
              const name = customerInfo
                ? `${customerInfo.firstName}${customerInfo.lastName ? ' ' + customerInfo.lastName : ''}`
                : t('guest_name_title');
              toast.success(`${t('admin_called')} — ${name}`);
            }}
            className="flex items-center gap-1.5 rounded-xl border border-gold/30 bg-gold/5 px-3 py-2 text-xs font-medium text-gold transition-colors hover:bg-gold/15 sm:px-4 sm:py-2.5 sm:text-sm"
          >
            <Bell className="h-4 w-4" />
            <span className="hidden sm:inline">{t('call_admin')}</span>
          </button>
        </div>

        {/* Center: category in gold border */}
        {category && (
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-gold bg-gold/10 px-4 py-1.5 text-xs font-medium text-gold sm:text-sm">
            {t(category)}
          </span>
        )}

        <div className="flex items-center gap-2 sm:gap-4">
          {customerInfo && (
            <div className="flex items-center gap-1.5 rounded-xl border border-gold/20 bg-gold/5 px-3 py-1.5 sm:gap-2 sm:px-4 sm:py-2">
              <UserCircle className="h-4 w-4 text-gold sm:h-5 sm:w-5" />
              <span className="text-xs font-medium text-foreground sm:text-sm">
                {customerInfo.firstName}{customerInfo.lastName ? ` ${customerInfo.lastName}` : ''}
              </span>
            </div>
          )}
          {cartTotal > 0 && (
            <span className="text-xs font-semibold text-gold sm:text-sm">
              {(cartTotal / 100).toFixed(2)} €
            </span>
          )}
          <button
            onClick={() => setCartOpen(true)}
            className="relative rounded-xl card-luxury p-2.5 text-foreground transition-colors hover:text-gold sm:p-3"
          >
            <ShoppingBag className="h-4 w-4 sm:h-5 sm:w-5" />
            {cartCount > 0 && (
              <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-gold-gradient text-xs font-bold text-primary-foreground">
                {cartCount}
              </span>
            )}
          </button>

          <button
            onClick={handleEnd}
            className="flex items-center gap-1.5 rounded-xl border border-destructive/30 card-luxury px-3 py-2.5 text-xs font-medium text-destructive transition-colors hover:bg-destructive/10 sm:gap-2 sm:px-4 sm:py-3 sm:text-sm"
          >
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline">{t('end_session')}</span>
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
              <div key={item.id} className="flex items-center justify-between rounded-xl card-luxury p-3">
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
              <>
                <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
                  <span className="font-semibold text-foreground">{t('total')}</span>
                  <span className="text-lg font-bold text-gold">{(cartTotal / 100).toFixed(2)} €</span>
                </div>
                <button
                  onClick={handleConfirmOrder}
                  className="mt-2 w-full rounded-xl bg-gold py-3 text-lg font-semibold text-background transition-colors hover:bg-gold-bright"
                >
                  {t('confirm_order')}
                </button>
              </>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default KioskHeader;

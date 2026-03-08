import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useKioskStore } from '@/store/useKioskStore';
import { useTranslation } from '@/hooks/useTranslation';
import { ShoppingBag, LogOut, Minus, Plus, UserCircle, Bell, StickyNote, Send, Trash2, User, CalendarCheck, X, Phone, Mail } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { toast } from 'sonner';
import { format } from 'date-fns';

const KioskHeader = () => {
  const { t, language } = useTranslation();
  const { category, cartItems, cartTotal, resetSession, removeFromCart, addToCart, customerInfo, isGuest, notes, addNote, deleteNote, bookings, cancelBooking, updateCustomerInfo } = useKioskStore();
  const navigate = useNavigate();
  const cartCount = cartItems.reduce((sum, ci) => sum + ci.quantity, 0);
  const [cartOpen, setCartOpen] = useState(false);
  const [notesOpen, setNotesOpen] = useState(false);
  const [noteText, setNoteText] = useState('');
  const [confirmCancelId, setConfirmCancelId] = useState<string | null>(null);

  // Profile edit state
  const [editFirstName, setEditFirstName] = useState('');
  const [editLastName, setEditLastName] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [profileOpen, setProfileOpen] = useState(false);

  const handleEnd = () => {
    resetSession();
    navigate('/');
  };

  const handleConfirmOrder = () => {
    toast.success(t('order_confirmed'));
    setCartOpen(false);
  };

  const handleAddNote = () => {
    if (!noteText.trim()) return;
    addNote(noteText.trim(), noteAuthor);
    setNoteText('');
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
          {/* My Bookings popover */}
          {!isGuest && (
            <Popover>
              <PopoverTrigger asChild>
                <button className="relative flex items-center gap-1.5 rounded-xl border border-gold/30 bg-gold/5 px-3 py-2 text-xs font-medium text-gold transition-colors hover:bg-gold/15 sm:px-4 sm:py-2.5 sm:text-sm">
                  <CalendarCheck className="h-4 w-4" />
                  <span className="hidden sm:inline">{t('my_bookings')}</span>
                  {bookings.length > 0 && (
                    <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-gold-gradient text-[10px] font-bold text-primary-foreground">
                      {bookings.length}
                    </span>
                  )}
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-80 border-border bg-background p-0" align="end" sideOffset={8}>
                <div className="border-b border-border px-4 py-3">
                  <p className="text-sm font-semibold text-gold">{t('my_bookings')}</p>
                </div>
                <div className="max-h-64 overflow-y-auto p-2">
                  {bookings.length === 0 ? (
                    <p className="py-6 text-center text-sm text-muted-foreground">{t('no_bookings')}</p>
                  ) : (
                    <div className="flex flex-col gap-2">
                      {bookings.map((b) => (
                        <div key={b.id} className="flex items-start justify-between rounded-xl card-luxury p-3">
                          <div className="min-w-0 flex-1">
                            <p className="text-xs font-semibold text-gold">{t(b.category)}</p>
                            <p className="text-sm text-foreground">{b.date} · {b.time}</p>
                            <p className="text-xs text-muted-foreground">{b.firstName} {b.lastName}</p>
                          </div>
                          {confirmCancelId === b.id ? (
                            <div className="ml-2 flex shrink-0 items-center gap-1">
                              <button
                                onClick={() => {
                                  cancelBooking(b.id);
                                  setConfirmCancelId(null);
                                  toast.success(t('booking_cancelled'));
                                }}
                                className="rounded-lg bg-destructive/10 px-2 py-1 text-xs font-semibold text-destructive hover:bg-destructive/20"
                              >
                                {t('yes')}
                              </button>
                              <button
                                onClick={() => setConfirmCancelId(null)}
                                className="rounded-lg bg-muted px-2 py-1 text-xs font-semibold text-muted-foreground hover:text-foreground"
                              >
                                {t('no')}
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => setConfirmCancelId(b.id)}
                              className="ml-2 shrink-0 self-center rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </PopoverContent>
            </Popover>
          )}
          {!isGuest && (
            <Popover>
              <PopoverTrigger asChild>
                <button className="relative flex items-center gap-1.5 rounded-xl border border-gold/30 bg-gold/5 px-3 py-2 text-xs font-medium text-gold transition-colors hover:bg-gold/15 sm:px-4 sm:py-2.5 sm:text-sm">
                  <StickyNote className="h-4 w-4" />
                  <span className="hidden sm:inline">{t('notes')}</span>
                  {notes.length > 0 && (
                    <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-gold-gradient text-[10px] font-bold text-primary-foreground">
                      {notes.length}
                    </span>
                  )}
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-80 border-border bg-background p-0" align="end" sideOffset={8}>
                <div className="border-b border-border px-4 py-3">
                  <p className="text-sm font-semibold text-gold">{t('notes')}</p>
                </div>
                <div className="p-3">
                  <div className="flex gap-2">
                    <textarea
                      value={noteText}
                      onChange={(e) => setNoteText(e.target.value)}
                      placeholder={t('note_placeholder')}
                      className="flex-1 resize-none rounded-xl border border-border bg-card px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-ring"
                      rows={2}
                    />
                    <button
                      onClick={() => {
                        if (!noteText.trim()) return;
                        addNote(noteText.trim(), 'client');
                        setNoteText('');
                      }}
                      disabled={!noteText.trim()}
                      className="self-end rounded-xl bg-gold-gradient p-2.5 text-primary-foreground shadow-gold-lg transition-opacity disabled:opacity-40"
                    >
                      <Send className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <div className="max-h-64 overflow-y-auto border-t border-border p-2">
                  {notes.length === 0 ? (
                    <p className="py-6 text-center text-sm text-muted-foreground">{t('no_notes')}</p>
                  ) : (
                    <div className="flex flex-col gap-2">
                      {[...notes].reverse().map((note) => (
                        <div key={note.id} className="flex gap-2 rounded-xl card-luxury p-3">
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-foreground whitespace-pre-wrap break-words">{note.text}</p>
                            <p className="mt-1 text-[10px] text-muted-foreground">
                              {format(new Date(note.date), 'dd.MM.yyyy HH:mm')}
                            </p>
                          </div>
                          <button
                            onClick={() => deleteNote(note.id)}
                            className="self-start text-muted-foreground transition-colors hover:text-destructive"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </PopoverContent>
            </Popover>
          )}
          {customerInfo && (
            <Popover open={profileOpen} onOpenChange={(open) => {
              setProfileOpen(open);
              if (open && customerInfo) {
                setEditFirstName(customerInfo.firstName);
                setEditLastName(customerInfo.lastName);
                setEditPhone(customerInfo.phone);
                setEditEmail(customerInfo.email || '');
              }
            }}>
              <PopoverTrigger asChild>
                <button className="flex items-center gap-1.5 rounded-xl border border-gold/20 bg-gold/5 px-3 py-1.5 transition-colors hover:border-gold/40 hover:bg-gold/10 sm:gap-2 sm:px-4 sm:py-2">
                  <UserCircle className="h-4 w-4 text-gold sm:h-5 sm:w-5" />
                  <span className="text-xs font-medium text-foreground sm:text-sm">
                    {customerInfo.firstName}{customerInfo.lastName ? ` ${customerInfo.lastName}` : ''}
                  </span>
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-80 border-border bg-background p-0" align="end" sideOffset={8}>
                <div className="border-b border-border px-4 py-3">
                  <p className="text-sm font-semibold text-gold">{t('edit_profile')}</p>
                </div>
                <div className="flex flex-col gap-3 p-4">
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder={t('first_name')}
                      value={editFirstName}
                      onChange={(e) => setEditFirstName(e.target.value)}
                      className="w-full rounded-xl border border-border bg-card px-4 py-2.5 pl-10 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder={t('last_name')}
                      value={editLastName}
                      onChange={(e) => setEditLastName(e.target.value)}
                      className="w-full rounded-xl border border-border bg-card px-4 py-2.5 pl-10 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="tel"
                      placeholder={t('phone')}
                      value={editPhone}
                      onChange={(e) => setEditPhone(e.target.value)}
                      className="w-full rounded-xl border border-border bg-card px-4 py-2.5 pl-10 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="email"
                      placeholder={t('email')}
                      value={editEmail}
                      onChange={(e) => setEditEmail(e.target.value)}
                      className="w-full rounded-xl border border-border bg-card px-4 py-2.5 pl-10 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                  <button
                    onClick={() => {
                      if (!editFirstName.trim()) return;
                      updateCustomerInfo({
                        firstName: editFirstName.trim(),
                        lastName: editLastName.trim(),
                        phone: editPhone.trim(),
                        email: editEmail.trim() || undefined,
                      });
                      setProfileOpen(false);
                      toast.success(t('profile_updated'));
                    }}
                    className="mt-1 w-full rounded-xl bg-gold-gradient py-2.5 text-sm font-semibold text-primary-foreground shadow-gold-lg transition-opacity hover:opacity-90"
                  >
                    {t('save')}
                  </button>
                </div>
              </PopoverContent>
            </Popover>
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

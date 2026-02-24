import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '@/hooks/useTranslation';
import KioskHeader from '@/components/KioskHeader';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { UserCheck, Clock, CalendarDays } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const timeSlots = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
  '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
];

const BookingScreen = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState<string>();
  const [showCalendar, setShowCalendar] = useState(true);
  const [form, setForm] = useState({ firstName: '', lastName: '', phone: '', email: '' });

  const handleDateSelect = (d: Date | undefined) => {
    setDate(d);
    if (d) setShowCalendar(false);
  };

  const handleSubmit = () => {
    if (!date || !time || !form.firstName || !form.lastName || !form.phone || !form.email) {
      toast.error(t('fill_all_fields'));
      return;
    }
    toast.success(t('booking_confirmed'));
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-background">
      <KioskHeader />
      <main className="flex min-h-screen flex-col items-center px-8 pt-20 pb-12">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 font-display text-4xl font-bold text-gold"
        >
          {t('booking')}
        </motion.h1>
        <div className="mx-auto mb-8 h-px w-24 bg-gold-gradient" />

        <div className="w-full max-w-md space-y-6">
          {/* Date selection */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            {!date || showCalendar ? (
              <div className="flex flex-col items-center gap-4">
                <div className="flex items-center gap-2 text-gold">
                  <CalendarDays className="h-5 w-5" />
                  <span className="font-medium">{t('select_date')}</span>
                </div>
                <div className="rounded-2xl card-luxury p-2">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={handleDateSelect}
                    disabled={(d) => d < new Date(new Date().setHours(0, 0, 0, 0))}
                    className={cn("p-3 pointer-events-auto")}
                  />
                </div>
              </div>
            ) : (
              <button
                onClick={() => setShowCalendar(true)}
                className="flex w-full items-center justify-center gap-3 rounded-2xl border border-gold/50 bg-gold/10 px-6 py-4 transition-all hover:border-gold-bright hover:bg-gold/20"
              >
                <CalendarDays className="h-5 w-5 text-gold" />
                <span className="font-medium text-gold">{format(date, 'dd.MM.yyyy')}</span>
              </button>
            )}
          </motion.div>

          {/* Time slots - only when date selected and calendar hidden */}
          {date && !showCalendar && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
              <div className="flex items-center gap-2 text-gold">
                <Clock className="h-5 w-5" />
                <span className="font-medium">{t('select_time')}</span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {timeSlots.map((slot) => (
                  <button
                    key={slot}
                    onClick={() => setTime(slot)}
                    className={cn(
                      'rounded-xl border px-3 py-2 text-sm transition-all',
                      time === slot
                        ? 'border-gold-bright bg-gold/20 text-gold'
                        : 'border-border bg-glass text-foreground hover:border-gold-bright'
                    )}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Form */}
          {date && time && !showCalendar && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
              <Input
                placeholder={t('first_name')}
                value={form.firstName}
                onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                className="rounded-xl border-border bg-glass"
                maxLength={100}
              />
              <Input
                placeholder={t('last_name')}
                value={form.lastName}
                onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                className="rounded-xl border-border bg-glass"
                maxLength={100}
              />
              <Input
                placeholder={t('phone')}
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="rounded-xl border-border bg-glass"
                maxLength={20}
              />
              <Input
                placeholder={t('email')}
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="rounded-xl border-border bg-glass"
                maxLength={255}
              />
              <Button
                onClick={handleSubmit}
                className="w-full rounded-xl bg-gold py-6 text-lg font-semibold text-background hover:bg-gold-bright"
              >
                {t('confirm_booking')}
              </Button>
            </motion.div>
          )}

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            onClick={() => navigate('/dashboard')}
            className="mt-8 w-full rounded-xl card-luxury py-3 text-center text-muted-foreground transition-colors hover:text-gold"
          >
            ← {t('back')}
          </motion.button>
        </div>
      </main>
    </div>
  );
};

export default BookingScreen;

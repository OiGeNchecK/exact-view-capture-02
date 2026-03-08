import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '@/hooks/useTranslation';
import { useKioskStore } from '@/store/useKioskStore';
import { User, Phone, Mail, ArrowRight, Eye } from 'lucide-react';

const CustomerInfoScreen = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { setCustomerInfo } = useKioskStore();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const handleSubmit = () => {
    const newErrors: Record<string, boolean> = {};
    if (!firstName.trim()) newErrors.firstName = true;
    if (!lastName.trim()) newErrors.lastName = true;
    if (!phone.trim() || phone.trim().length < 6) newErrors.phone = true;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setCustomerInfo({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      phone: phone.trim(),
      email: email.trim() || undefined,
    });
    navigate('/services');
  };

  const inputClass = (field: string) =>
    `w-full rounded-xl border bg-card px-4 py-4 pl-12 text-base text-foreground placeholder:text-muted-foreground outline-none transition-all focus:ring-2 focus:ring-ring ${
      errors[field] ? 'border-destructive' : 'border-border'
    }`;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 sm:px-8">
      {/* Guest link */}
      <motion.button
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => navigate('/services')}
        className="mb-10 flex items-center gap-3 rounded-2xl border border-border bg-card px-10 py-4 text-base font-medium text-foreground shadow-md transition-all hover:border-gold hover:shadow-gold-lg sm:px-14 sm:py-5 sm:text-lg"
      >
        <Eye className="h-5 w-5 text-gold" />
        {t('continue_as_guest')}
      </motion.button>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-10 text-center"
      >
        <h1 className="font-display text-3xl font-bold tracking-wider text-gold sm:text-4xl">
          {t('customer_info_title')}
        </h1>
        <div className="mx-auto mt-4 h-px w-24 bg-gold-gradient" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="flex w-full max-w-md flex-col gap-4"
      >
        {/* First Name */}
        <div className="relative">
          <User className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder={t('first_name')}
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
              setErrors((prev) => ({ ...prev, firstName: false }));
            }}
            className={inputClass('firstName')}
          />
        </div>

        {/* Last Name */}
        <div className="relative">
          <User className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder={t('last_name')}
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value);
              setErrors((prev) => ({ ...prev, lastName: false }));
            }}
            className={inputClass('lastName')}
          />
        </div>

        {/* Phone */}
        <div className="relative">
          <Phone className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <input
            type="tel"
            placeholder={t('phone')}
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
              setErrors((prev) => ({ ...prev, phone: false }));
            }}
            className={inputClass('phone')}
          />
        </div>

        {/* Email (optional) */}
        <div className="relative">
          <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <input
            type="email"
            placeholder={`${t('email')} (${t('optional')})`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass('')}
          />
        </div>

        {Object.values(errors).some(Boolean) && (
          <p className="text-center text-sm text-destructive">{t('fill_required_fields')}</p>
        )}

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleSubmit}
          className="mt-4 flex items-center justify-center gap-3 rounded-2xl bg-gold-gradient px-10 py-4 text-lg font-semibold text-primary-foreground shadow-gold-lg transition-shadow"
        >
          {t('continue')}
          <ArrowRight className="h-5 w-5" />
        </motion.button>
      </motion.div>
    </div>
  );
};

export default CustomerInfoScreen;

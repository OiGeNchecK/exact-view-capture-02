import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '@/hooks/useTranslation';
import { useKioskStore } from '@/store/useKioskStore';
import { User, Phone, Mail, ArrowRight, Eye, UserPlus, LogIn, Lock } from 'lucide-react';

type Mode = 'register' | 'login' | 'guest';

const CustomerInfoScreen = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { setCustomerInfo, setIsGuest } = useKioskStore();

  const [mode, setMode] = useState<Mode>('register');
  const [guestName, setGuestName] = useState('');
  const [guestError, setGuestError] = useState(false);

  // Register fields
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  // Login fields
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginErrors, setLoginErrors] = useState<Record<string, boolean>>({});

  const handleRegister = () => {
    const newErrors: Record<string, boolean> = {};
    if (!firstName.trim()) newErrors.firstName = true;
    if (!lastName.trim()) newErrors.lastName = true;
    if (!phone.trim() || phone.trim().length < 6) newErrors.phone = true;
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) newErrors.email = true;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setCustomerInfo({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      phone: phone.trim(),
      email: email.trim(),
    });
    navigate('/services');
  };

  const handleLogin = () => {
    const newErrors: Record<string, boolean> = {};
    if (!loginIdentifier.trim()) newErrors.loginIdentifier = true;
    if (!loginPassword.trim()) newErrors.loginPassword = true;

    if (Object.keys(newErrors).length > 0) {
      setLoginErrors(newErrors);
      return;
    }

    // TODO: actual login logic — name will come from backend
    // For now, simulate with identifier as name
    setCustomerInfo({ firstName: loginIdentifier.trim(), lastName: '', phone: '' });
    navigate('/services');
  };

  const inputClass = (field: string, errorMap: Record<string, boolean>) =>
    `w-full rounded-xl border bg-card px-4 py-4 pl-12 text-base text-foreground placeholder:text-muted-foreground outline-none transition-all focus:ring-2 focus:ring-ring ${
      errorMap[field] ? 'border-destructive' : 'border-border'
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
        onClick={() => setMode('guest')}
        className={`mb-10 flex items-center gap-3 rounded-2xl border bg-card px-10 py-4 text-base font-medium text-foreground shadow-md transition-all hover:border-gold hover:shadow-gold-lg sm:px-14 sm:py-5 sm:text-lg ${
          mode === 'guest' ? 'border-gold shadow-gold-lg' : 'border-border'
        }`}
      >
        <Eye className="h-5 w-5 text-gold" />
        {t('continue_as_guest')}
      </motion.button>

      {/* Mode tabs — only show when not in guest mode */}
      {mode !== 'guest' && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="mb-8 flex w-full max-w-md overflow-hidden rounded-2xl border border-border bg-card shadow-md"
        >
          <button
            onClick={() => setMode('register')}
            className={`flex flex-1 items-center justify-center gap-2 py-4 text-base font-semibold transition-all sm:text-lg ${
              mode === 'register'
                ? 'bg-gold-gradient text-primary-foreground shadow-gold-lg'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <UserPlus className="h-5 w-5" />
            {t('registration')}
          </button>
          <button
            onClick={() => setMode('login')}
            className={`flex flex-1 items-center justify-center gap-2 py-4 text-base font-semibold transition-all sm:text-lg ${
              mode === 'login'
                ? 'bg-gold-gradient text-primary-foreground shadow-gold-lg'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <LogIn className="h-5 w-5" />
            {t('login')}
          </button>
        </motion.div>
      )}

      <AnimatePresence mode="wait">
        {mode === 'register' ? (
          <motion.div
            key="register"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            className="flex w-full max-w-md flex-col gap-4"
          >
            <h2 className="mb-2 text-center font-display text-2xl font-bold tracking-wider text-gold sm:text-3xl">
              {t('registration')}
            </h2>
            <div className="mx-auto mb-4 h-px w-20 bg-gold-gradient" />

            {/* First Name */}
            <div className="relative">
              <User className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder={t('first_name')}
                value={firstName}
                onChange={(e) => { setFirstName(e.target.value); setErrors((p) => ({ ...p, firstName: false })); }}
                className={inputClass('firstName', errors)}
              />
            </div>

            {/* Last Name */}
            <div className="relative">
              <User className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder={t('last_name')}
                value={lastName}
                onChange={(e) => { setLastName(e.target.value); setErrors((p) => ({ ...p, lastName: false })); }}
                className={inputClass('lastName', errors)}
              />
            </div>

            {/* Phone */}
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <input
                type="tel"
                placeholder={t('phone')}
                value={phone}
                onChange={(e) => { setPhone(e.target.value); setErrors((p) => ({ ...p, phone: false })); }}
                className={inputClass('phone', errors)}
              />
            </div>

            {/* Email (required now) */}
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <input
                type="email"
                placeholder={t('email')}
                value={email}
                onChange={(e) => { setEmail(e.target.value); setErrors((p) => ({ ...p, email: false })); }}
                className={inputClass('email', errors)}
              />
            </div>

            {Object.values(errors).some(Boolean) && (
              <p className="text-center text-sm text-destructive">{t('fill_required_fields')}</p>
            )}

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleRegister}
              className="mt-4 flex items-center justify-center gap-3 rounded-2xl bg-gold-gradient px-10 py-4 text-lg font-semibold text-primary-foreground shadow-gold-lg transition-shadow"
            >
              {t('register_btn')}
              <ArrowRight className="h-5 w-5" />
            </motion.button>
          </motion.div>
        ) : mode === 'login' ? (
          <motion.div
            key="login"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="flex w-full max-w-md flex-col gap-4"
          >
            <h2 className="mb-2 text-center font-display text-2xl font-bold tracking-wider text-gold sm:text-3xl">
              {t('login')}
            </h2>
            <div className="mx-auto mb-4 h-px w-20 bg-gold-gradient" />

            {/* Email or Phone */}
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder={t('email_or_phone')}
                value={loginIdentifier}
                onChange={(e) => { setLoginIdentifier(e.target.value); setLoginErrors((p) => ({ ...p, loginIdentifier: false })); }}
                className={inputClass('loginIdentifier', loginErrors)}
              />
            </div>

            {/* Password */}
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <input
                type="password"
                placeholder={t('password')}
                value={loginPassword}
                onChange={(e) => { setLoginPassword(e.target.value); setLoginErrors((p) => ({ ...p, loginPassword: false })); }}
                className={inputClass('loginPassword', loginErrors)}
              />
            </div>

            {Object.values(loginErrors).some(Boolean) && (
              <p className="text-center text-sm text-destructive">{t('fill_required_fields')}</p>
            )}

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleLogin}
              className="mt-4 flex items-center justify-center gap-3 rounded-2xl bg-gold-gradient px-10 py-4 text-lg font-semibold text-primary-foreground shadow-gold-lg transition-shadow"
            >
              {t('login_btn')}
              <ArrowRight className="h-5 w-5" />
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            key="guest"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="flex w-full max-w-md flex-col gap-4"
          >
            <h2 className="mb-2 text-center font-display text-2xl font-bold tracking-wider text-gold sm:text-3xl">
              {t('guest_name_title')}
            </h2>
            <div className="mx-auto mb-4 h-px w-20 bg-gold-gradient" />

            <div className="relative">
              <User className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder={t('your_name')}
                value={guestName}
                onChange={(e) => { setGuestName(e.target.value); setGuestError(false); }}
                className={inputClass(guestError ? '_err' : '', { _err: guestError })}
              />
            </div>

            {guestError && (
              <p className="text-center text-sm text-destructive">{t('fill_required_fields')}</p>
            )}

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                if (!guestName.trim()) { setGuestError(true); return; }
                setCustomerInfo({ firstName: guestName.trim(), lastName: '', phone: '' });
                navigate('/services');
              }}
              className="mt-4 flex items-center justify-center gap-3 rounded-2xl bg-gold-gradient px-10 py-4 text-lg font-semibold text-primary-foreground shadow-gold-lg transition-shadow"
            >
              {t('continue')}
              <ArrowRight className="h-5 w-5" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CustomerInfoScreen;

import { useKioskStore } from '@/store/useKioskStore';
import { translations } from '@/i18n/translations';

export const useTranslation = () => {
  const language = useKioskStore((s) => s.language);
  const t = (key: string) => translations[language]?.[key] ?? key;
  return { t, language };
};

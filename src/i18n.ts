import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files
import enTranslation from '../public/locales/en/translation.json';
import mrTranslation from '../public/locales/mr/translation.json';

i18n
  .use(LanguageDetector) // Detect user language
  .use(initReactI18next) // Pass i18n instance to react-i18next
  .init({
    resources: {
      en: {
        translation: enTranslation
      },
      mr: {
        translation: mrTranslation
      }
    },
    fallbackLng: "en", // Fallback language if detection fails or translation is missing
    debug: false, // Set to true for debugging
    interpolation: {
      escapeValue: false // React already escapes by default
    },
    detection: {
      order: ['localStorage', 'navigator'], // Order of language detection
      caches: ['localStorage'], // Cache user language in localStorage
    }
  });

export default i18n;
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from '../locales/en.json';
import pt from '../locales/pt.json';

i18n
  // Detecta o idioma do navegador do usuário
  .use(LanguageDetector)
  // Passa a instância para o react-i18next
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      pt: { translation: pt }
    },
    fallbackLng: 'pt', // Idioma de segurança caso a chave não exista
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
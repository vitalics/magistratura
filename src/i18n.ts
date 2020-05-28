import i18n, { Resource } from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

import translationEN from './locales/en/translation.json';
import translationRU from './locales/ru/translation.json';

// the translations
const resources: Resource = {
    en: {
        translation: translationEN,
    },
    ru: {
        translation: translationRU,
    }
};

i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources,
        detection: {
            lookupLocalStorage: 'i18nextLng',
        },
        lng: "en",
        fallbackLng: ["en", "ru"],

        interpolation: {
            escapeValue: false // react already safes from xss
        },
        load: 'all',
        debug: process.env.NODE_ENV === 'production' ? false : true,
        react: {
            wait: true,
            bindI18n: 'languageChanged loaded',
        },
        keySeparator: false,
        // appendNamespaceToMissingKey: true,
        // defaultNS: '',
    });
export default i18n;

export type Languages = 'en' | 'ru';

export type LanguageMap = typeof translationEN & typeof translationRU;
export type LanguageKeys = keyof LanguageMap;

import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locales/en/translation.json";
import ko from "./locales/ko/translation.json";

const resources = {
    en: { translation: { ...en } },
    ko: { translation: { ...ko } },
};

i18n.use(initReactI18next).init({
    resources,
    lng: "en",
    fallbackLng: "ko",
    debug: true,
    interpolation: {
        escapeValue: false,
    },
});

export default i18n;

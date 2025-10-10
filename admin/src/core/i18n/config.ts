import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { en } from "./locales/en";
import { ru } from "./locales/ru";

export const defaultNS = "common";
export const resources = {
	en: {
		common: en,
	},
	ru: {
		common: ru,
	},
} as const;

i18n.use(initReactI18next).init({
	lng: "ru",
	fallbackLng: "ru",
	defaultNS,
	ns: ["common"],
	resources,

	interpolation: {
		escapeValue: false,
	},

	// Development options
	debug: process.env.NODE_ENV === "development",

	// Options for react-i18next
	react: {
		useSuspense: false,
	},
});

export default i18n;
export type Resources = typeof resources;

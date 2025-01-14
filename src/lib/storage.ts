import { type Writable, writable } from 'svelte/store';
import type { UserData } from './types';
import { browser } from '$app/environment';
import { getLanguage } from './language';

export const userData: Writable<UserData | undefined> = writable(undefined);

const defaultLang = 'US';

const getLanguageFromStorage = () => {
	const validLanguageCodes = navigator.languages
		.filter((langCode) => langCode.includes('-'))
		.map((lang) => lang.split('-')[1]);

	console.log('Valid Language Codes:', validLanguageCodes); // Debugging

	const preferedLang = validLanguageCodes[0];

	console.log('Preferred Language:', preferedLang); // Debugging

	const lang = window.localStorage.getItem('lang') ?? preferedLang;

	console.log('Language from Storage:', lang); // Debugging

	const language = getLanguage(lang);

	console.log('Language Object:', language); // Debugging

	return language?.code ?? defaultLang;
};

const initialLang = browser
	? getLanguageFromStorage() ?? navigator.language.toUpperCase()
	: defaultLang;

console.log('Initial Language:', initialLang); // Debugging

export const userLanguage = writable(initialLang);
export let currentSelectedLanguage = initialLang;

userLanguage.subscribe((val) => {
	if (browser) {
		currentSelectedLanguage = val;
		window.localStorage.setItem('lang', val);
	}
});
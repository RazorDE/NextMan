import { IDictionary } from "./interfaces";

let currentLanguage: string | undefined;
let dictionary: IDictionary;

export function getEntry(id: string): string {
	if (typeof dictionary !== 'object') {
		return '<No dictionary available>';
	}

	let entry = dictionary[id];

	if (entry === undefined || entry.length < 1) {
		entry = `<Unknown entry for "${currentLanguage}": ${id}>`;
	}

	return entry;
}

export function getLanguage(): string {
	return currentLanguage !== undefined ? currentLanguage : 'en';
}

export function setLanguage(language?: string): void {
	language = (language != undefined) ? language.toLowerCase().trim() : 'en';

	if (language === currentLanguage) {
		return;
	}

	switch (language) {
		case 'de': 
			currentLanguage = 'de';
			dictionary = require('../static/json/dictionary-de.json');
			break;
		default:
			currentLanguage = 'en';
			dictionary = require('../static/json/dictionary-en.json');
			break;
	}
}

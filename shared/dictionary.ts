import fetch from 'isomorphic-unfetch';
import { IDictionary } from "./interfaces";
import settings from "./settings";
import { isIncluded } from "./util";

let currentDictionary: IDictionary | undefined;

export function getEntry(id: string): string {
	if (currentDictionary === undefined) {
		return '<No dictionary available>';
	}

	let entry = currentDictionary.data[id];

	if (entry === undefined || entry.length < 1) {
		entry = `<Unknown entry for "${currentDictionary.language}": ${id}>`;
	}

	return entry;
}

export function getLanguage(): string {
	return currentDictionary !== undefined ? currentDictionary.language : settings.defaultLanguage;
}

export async function loadDictionary(host: string, language?: string): Promise<IDictionary | undefined> {
	language = language !== undefined ? language.toLowerCase().trim() : settings.defaultLanguage;
	language = isIncluded(language, settings.languageList) ? language : settings.defaultLanguage;

	if (currentDictionary !== undefined && language === currentDictionary.language) {
		return currentDictionary;
	}

	const response = await fetch(`http://${host}/static/json/dictionary-${language}.json`);

	if (!response.ok) {
		return undefined;
	}

	return await response.json();
}

export function setDictionary(dictionary: IDictionary | undefined): void {
	currentDictionary = dictionary;
}
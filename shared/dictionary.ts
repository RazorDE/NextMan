import fetch from 'isomorphic-unfetch';
import { IDictionary } from './interfaces';
import settings from './settings';
import { isIncluded } from './util';

let currentDictionary: IDictionary | undefined;

export function getEntry(id: string) {
	if (currentDictionary === undefined) {
		return '<No dictionary available>';
	}

	let entry = currentDictionary.data[id];

	if (entry === undefined || entry.length < 1) {
		entry = `<Unknown entry for "${currentDictionary.language}": ${id}>`;
	}

	return entry;
}

export function getLanguage() {
	return currentDictionary !== undefined ? currentDictionary.language : settings.defaultLanguage;
}

export async function loadDictionary(host: string, language?: string) {
	language = language !== undefined ? language.toLowerCase().trim() : settings.defaultLanguage;
	language = isIncluded(language, settings.languageList) ? language : settings.defaultLanguage;

	if (currentDictionary !== undefined && language === currentDictionary.language) {
		return currentDictionary;
	}

	const response = await fetch(`http://${host}/json/dictionary-${language}.json`);

	if (!response.ok) {
		return;
	}

	const dictionary: IDictionary = await response.json();
	return dictionary;
}

export function setDictionary(dictionary?: IDictionary) {
	currentDictionary = dictionary;
}
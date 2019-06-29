import React from 'react';
import Link from 'next/link';
import { getEntry, getLanguage } from '../../shared/dictionary';
import settings from '../../shared/settings';
import styles from './LanguageSelectorStyle';

export default function LanguageSelector(): JSX.Element {
	return (
		<>
			<div>
				<span className="label">{getEntry('LanguageSelector.label')}:&nbsp;</span>
				<LanguageList />
			</div>
			<style jsx>{styles}</style>
		</>
	);
}

function LanguageList(): JSX.Element {
	const selectedLanguage = getLanguage();
	const languageList = settings.languageList.map(language => {
		return language !== selectedLanguage
			? <>
				<Link href={`?lang=${language}`} key={language}>
					<a>{getEntry(`LanguageSelector.${language}`)}</a>
				</Link>
				<style jsx>{styles}</style>
			</> : <>
				<span className="selected-language" key={language}>
					{getEntry(`LanguageSelector.${language}`)}
				</span>
				<style jsx>{styles}</style>
			</>
	});

	return <>{languageList}</>;
}

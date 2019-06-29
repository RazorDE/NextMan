import React from 'react';
import { css } from 'emotion';
import Link from 'next/link';
import { getEntry, getLanguage } from '../../shared/dictionary';
import settings from '../../shared/settings';
import styles from './LanguageSelectorStyle';

export default function LanguageSelector(): JSX.Element {
	return (
		<div className={css(styles.container)}>
			<span className={css(styles.label)}>{getEntry('LanguageSelector.label')}:&nbsp;</span>
			<LanguageList />
		</div>
	);
}

function LanguageList(): JSX.Element {
	const selectedLanguage = getLanguage();
	const languageList = settings.languageList.map(language => {
		return language !== selectedLanguage
			? <Link href={`?lang=${language}`} key={language}>
				<a className={css(styles.languageOption)}>{getEntry(`LanguageSelector.${language}`)}</a>
			</Link>
			: <span className={css(styles.languageSelected)} key={language}>
				{getEntry(`LanguageSelector.${language}`)}
			</span>
	});

	return <>{languageList}</>;
}

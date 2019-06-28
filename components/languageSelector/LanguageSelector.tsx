import { css } from 'emotion';
import React from 'react';
import { getEntry, getLanguage } from '../../shared/dictionary';
import styles from './LanguageSelectorStyle';

export default function LanguageSelector(): JSX.Element {
	return (
		<div className={css(styles.container)}>
			<span className={css(styles.label)}>{getEntry('LanguageSelector.label')}:&nbsp;</span>
			<LanguageOption language="en" />&nbsp;
			<LanguageOption language="de" />
		</div>
	);
}

interface ILanguageOptionProps {
	language: string;
}

function LanguageOption({ language }: ILanguageOptionProps): JSX.Element {
	return getLanguage() === language
		? <span className={css(styles.languageSelected)}>{getEntry(`LanguageSelector.${language}`)}</span>
		: <a className={css(styles.languageOption)} href={`?lang=${language}`}>{getEntry(`LanguageSelector.${language}`)}</a>;
}

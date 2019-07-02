import React from 'react';
import Link from 'next/link';
import { getEntry, getLanguage } from '../../shared/dictionary';
import settings from '../../shared/settings';
import { styles, stylesLanguageList } from './LanguageSelectorStyle';

const LanguageSelector: React.FC = () => {
	return (
		<>
			<div>
				<span>{getEntry('LanguageSelector.label')}:&nbsp;</span>
				<LanguageList />
			</div>
			<style jsx>{styles}</style>
		</>
	);
};

export default LanguageSelector;

const LanguageList: React.FC = () => {
	const selectedLanguage = getLanguage();

	const languageList = settings.languageList.map(language => {
		return (
			<React.Fragment key={language}>
				{language !== selectedLanguage
					? (
						<Link href={`?lang=${language}`}>
							<a>{getEntry(`LanguageSelector.${language}`)}</a>
						</Link>
					) : (
						<span>{getEntry(`LanguageSelector.${language}`)}</span>
					)
				}
				<style jsx>{stylesLanguageList}</style>
			</React.Fragment>
		);
	});

	return <>{languageList}</>;
};

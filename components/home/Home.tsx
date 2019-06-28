import { getEntry, setLanguage } from '../../shared/dictionary';
import React from 'react';
import { css } from 'emotion';
import styles from './HomeStyles';
import StartButton from '../startButton/StartButton';
import LanguageSelector from '../languageSelector/LanguageSelector';

type Props = Readonly<{
	language?: string;
}>;

export default function Home({ language }: Props): JSX.Element {
	setLanguage(language);

	return (
		<div className={css(styles.viewport)}>
			<LanguageSelector/>
			<div className={css(styles.title)}>{getEntry('Home.title')}</div>
			<div className={css(styles.subtitle)}>{getEntry('Home.subtitle')}</div>
			<div className={css(styles.startButtonContainer)}>
				<StartButton isRestart={false} language={language} />
			</div>
		</div>
	);
}

import React from 'react';
import { css } from 'emotion';
import { getEntry } from '../../shared/dictionary';
import LanguageSelector from '../languageSelector/LanguageSelector';
import StartButton from '../startButton/StartButton';
import styles from './HomeStyles';

export default function Home(): JSX.Element {
	return (
		<div className={css(styles.viewport)}>
			<LanguageSelector/>
			<div className={css(styles.title)}>{getEntry('Home.title')}</div>
			<div className={css(styles.subtitle)}>{getEntry('Home.subtitle')}</div>
			<div className={css(styles.startButtonContainer)}>
				<StartButton isRestart={false} />
			</div>
		</div>
	);
}

import dictionary from '../../shared/dictionary';
import React from 'react';
import { css } from 'emotion';
import styles from './HomeStyles';
import StartButton from '../startButton/StartButton';

export default function Home(): JSX.Element {
	return (
		<div className={css(styles.viewport)}>
			<div className={css(styles.title)}>{dictionary['Home.title']}</div>
			<div className={css(styles.subtitle)}>{dictionary['Home.subtitle']}</div>
			<div className={css(styles.startButtonContainer)}>
				<StartButton isRestart={false}/>
			</div>
		</div>
	);
}

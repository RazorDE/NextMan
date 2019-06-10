import React from 'react';
import { css } from 'emotion';
import styles from './MessageStyles';
import dictionary from '../../shared/dictionary';

interface IProps {
	areCollectablesLeft: boolean;
	hasJavaScript: boolean;
	isInitialStep: boolean;
	isPlayerAlive: boolean;
}

export default function Message(
	{ areCollectablesLeft, hasJavaScript, isInitialStep, isPlayerAlive }: IProps
): JSX.Element | null {

	if (areCollectablesLeft && !isInitialStep && isPlayerAlive) {
		return null;
	}

	let text: string = '';

	if (!isPlayerAlive) {
		text = dictionary['Gamescreen.gameOver'];
	} else if (!areCollectablesLeft) {
		text = dictionary['Gamescreen.gameWon'];
	} else if (isInitialStep) {
		text = hasJavaScript
			? dictionary['Gamescreen.starttextJavaScript']
			: dictionary['Gamescreen.starttextNoJavaScript'];
	}

	if (text.length < 1) {
		return null;
	}

	return (
		<div className={css(styles.container)}>
			<div className={css(styles.text)}>{text}</div>
		</div>
	);
}
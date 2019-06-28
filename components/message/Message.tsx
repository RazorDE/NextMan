import { getEntry } from '../../shared/dictionary';
import React from 'react';
import { css } from 'emotion';
import styles from './MessageStyles';

type Props = Readonly<{
	areCollectablesLeft: boolean;
	hasJavaScript: boolean;
	isInitialStep: boolean;
	isPlayerAlive: boolean;
}>;

export default function Message(
	{ areCollectablesLeft, hasJavaScript, isInitialStep, isPlayerAlive }: Props
): JSX.Element | null {

	if (areCollectablesLeft && !isInitialStep && isPlayerAlive) {
		return null;
	}

	let text = '';

	if (!isPlayerAlive) {
		text = getEntry('Gamescreen.gameOver');
	} else if (!areCollectablesLeft) {
		text = getEntry('Gamescreen.gameWon');
	} else if (isInitialStep) {
		text = hasJavaScript
			? getEntry('Gamescreen.starttextJavaScript')
			: getEntry('Gamescreen.starttextNoJavaScript');
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
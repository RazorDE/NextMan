import React from 'react';
import { css } from 'emotion';
import Link from 'next/link';
import { getEntry, getLanguage } from '../../shared/dictionary';
import styles from './StartButtonStyles';

type Props = Readonly<{
	isRestart: boolean;
}>;

export default function StartButton({ isRestart }: Props): JSX.Element {
	const language = getLanguage();
	const text = isRestart
		? getEntry('StartButton.restart')
		: getEntry('StartButton.start');

	return (
		<Link href={`/gamescreen?lang=${language}`}>
			<a className={css(styles.startButton)}>{text}</a>
		</Link>
	);
}

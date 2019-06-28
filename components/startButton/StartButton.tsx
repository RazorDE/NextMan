import { getEntry } from '../../shared/dictionary';
import React from 'react';
import { css } from 'emotion';
import Link from 'next/link';
import styles from './StartButtonStyles';

type Props = Readonly<{
	isRestart: boolean;
	language?: string;
}>;

export default function StartButton({ isRestart, language }: Props): JSX.Element {
	const queryString = language !== undefined ? `?lang=${language}` : '';
	const text = isRestart
		? getEntry('StartButton.restart')
		: getEntry('StartButton.start');

	return (
		<Link href={`/gamescreen${queryString}`}>
			<a className={css(styles.startButton)}>{text}</a>
		</Link>
	);
}

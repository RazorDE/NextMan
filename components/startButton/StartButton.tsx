import dictionary from '../../shared/dictionary';
import React from 'react';
import { css } from 'emotion';
import Link from 'next/link';
import styles from './StartButtonStyles';

interface IProps {
	isRestart: boolean;
}

export default function StartButton({ isRestart }: IProps): JSX.Element {
	const text: string = isRestart
		? dictionary['StartButton.restart']
		: dictionary['StartButton.start'];

	return (
		<Link href='/gamescreen'>
			<a className={css(styles.startButton)}>{text}</a>
		</Link>
	);
}

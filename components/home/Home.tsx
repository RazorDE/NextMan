import React from 'react';
import { css } from 'emotion';
import styles from './HomeStyles';

interface IProps {
	host?: string;
	isServer: boolean;
	userAgent: string;
}

export default function Home({ userAgent }: IProps): JSX.Element {
	return (
		<div className={css(styles.container)}>
			{userAgent}
		</div>
	);
}

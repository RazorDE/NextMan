import { tileSize } from '../../constants';
import React from 'react';
import { css } from 'emotion';
import styles from './CollectableStyles';

interface IProps {
	x: number;
	y: number;
}

export default function Wall(props: IProps): JSX.Element | null {
	const left: string = (props.x * tileSize.x).toString() + 'px';
	const top: string = (props.y * tileSize.y).toString() + 'px';

	return (
		<div className={css(styles.fruit)} style={{left, top}}/>
	);
}
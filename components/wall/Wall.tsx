import { tileSize } from '../../constants';
import { wallList } from './WallConstants';
import React from 'react';
import { css } from 'emotion';
import styles from './WallStyles';

interface IProps {
	id: number;
	x: number;
	y: number;
}

export default function Wall(props: IProps): JSX.Element | null {
	const id: string = `${props.id}-${props.x}-${props.y}`;
	const name: string = wallList[props.id];

	if (name === undefined) {
		return null;
	}

	const left: string = (props.x * tileSize.x).toString() + 'px';
	const top: string = (props.y * tileSize.y).toString() + 'px';

	return (
		<div id={id} className={css(styles[name])} style={{left, top}}/>
	);
}
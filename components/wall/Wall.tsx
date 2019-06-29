import React from 'react';
import { css } from 'emotion';
import { wallList } from '../../shared/constants';
import { convertXYToCSSPosition } from '../../shared/conversions';
import styles from './WallStyles';

type Props = Readonly<{
	id: number;
	x: number;
	y: number;
}>;

export default function Wall(props: Props): JSX.Element | null {
	const id = `${props.id}-${props.x}-${props.y}`;
	const name = wallList[props.id];

	if (name === undefined) {
		return null;
	}

	const inlineStyle = convertXYToCSSPosition(props.x, props.y);

	return (
		<div id={id} className={css(styles[name])} style={inlineStyle}/>
	);
}

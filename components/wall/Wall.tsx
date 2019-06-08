import { wallList } from '../../shared/constants';
import { convertXYToCSSPosition } from '../../shared/conversions';
import { ICSSPosition } from '../../shared/interfaces';
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

	const inlineStyle: ICSSPosition = convertXYToCSSPosition(props.x, props.y);

	return (
		<div id={id} className={css(styles[name])} style={inlineStyle}/>
	);
}
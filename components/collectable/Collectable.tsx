import { convertXYToCSSPosition } from '../../shared/conversions';
import { ICSSPosition } from '../../shared/interfaces';
import React from 'react';
import { css } from 'emotion';
import styles from './CollectableStyles';

interface IProps {
	x: number;
	y: number;
}

export default function Collectable(props: IProps): JSX.Element | null {
	const inlineStyle: ICSSPosition = convertXYToCSSPosition(props.x, props.y);

	return (
		<div className={css(styles.collectable)} style={inlineStyle}/>
	);
}

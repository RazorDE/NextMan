import { convertXYToCSSPosition } from '../../shared/conversions';
import React from 'react';
import { css } from 'emotion';
import styles from './CollectableStyles';

type Props = Readonly<{
	x: number;
	y: number;
}>;

export default function Collectable(props: Props): JSX.Element {
	const inlineStyle = convertXYToCSSPosition(props.x, props.y);

	return (
		<div className={css(styles.collectable)} style={inlineStyle}/>
	);
}

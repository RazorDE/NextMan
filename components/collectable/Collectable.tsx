import { ICSSPosition } from '../../interfaces';
import React from 'react';
import { css } from 'emotion';
import Util from '../../Util';
import styles from './CollectableStyles';

interface IProps {
	x: number;
	y: number;
}

export default function Collectable(props: IProps): JSX.Element | null {
	const inlineStyle: ICSSPosition = Util.convertXYToCSSPosition(props.x, props.y);

	return (
		<div className={css(styles.fruit)} style={inlineStyle}/>
	);
}

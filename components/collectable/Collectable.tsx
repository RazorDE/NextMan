import React from 'react';
import { convertXYToCSSPosition } from '../../shared/conversions';
import styles from './CollectableStyles';

type Props = Readonly<{
	x: number;
	y: number;
}>;

export default function Collectable(props: Props): JSX.Element {
	const inlineStyle = convertXYToCSSPosition(props.x, props.y);

	return (
		<>
			<div style={inlineStyle} />
			<style jsx>{styles}</style>
		</>
	);
}

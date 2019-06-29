import React from 'react';
import { convertXYToCSSPosition } from '../../shared/conversions';
import styles from './WallStyles';

const wallNameList = [
	'corner-bottom-left',
	'corner-bottom-right',
	'corner-top-left',
	'corner-top-right',
	'horizontal-center',
	'horizontal-left',
	'horizontal-right',
	'plus',
	'single',
	't-bottom',
	't-left',
	't-right',
	't-top',
	'vertical-bottom',
	'vertical-center',
	'vertical-top',
];

type Props = Readonly<{
	id: number;
	x: number;
	y: number;
}>;

export default function Wall(props: Props): JSX.Element | null {
	const id = `${props.id}-${props.x}-${props.y}`;
	const className = wallNameList[props.id];

	if (className === undefined) {
		return null;
	}

	const inlineStyle = convertXYToCSSPosition(props.x, props.y);

	return (
		<>
			<div id={id} className={className} style={inlineStyle} />
			<style jsx>{styles}</style>
		</>
	);
}

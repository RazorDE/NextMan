import { actorList, directionList } from '../../shared/constants';
import { convertXYToCSSPosition } from '../../shared/conversions';
import { ICSSPosition } from '../../shared/interfaces';
import React from 'react';
import { css } from 'emotion';
import styles from './ActorStyles';

interface IProps {
	id: number;
	directionId: number;
	x: number;
	y: number;
}

export default function Actor(props: IProps): JSX.Element | null {
	const actorName: string = actorList[props.id];
	const directionName: string = directionList[props.directionId];

	if (
		actorName === undefined ||
		actorName.length < 1 ||
		directionName === undefined ||
		directionName.length < 1
	) {
		return null;
	}

	const inlineStyle: ICSSPosition = convertXYToCSSPosition(props.x, props.y);
	const styleId: string = actorName + directionName;

	return (
		<div className={css(styles[styleId])} style={inlineStyle}/>
	);
}

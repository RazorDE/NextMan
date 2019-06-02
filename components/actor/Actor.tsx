import { directionList } from '../../constants';
import { ICSSPosition } from '../../interfaces';
import { actorList } from './ActorConstants';
import React from 'react';
import { css } from 'emotion';
import Util from '../../Util';
import styles from './ActorStyles';

interface IProps {
	id: number;
	lookDirection: number;
	moveDirection?: number;
	x: number;
	y: number;
}

export default function Actor(props: IProps): JSX.Element | null {
	const actorId: string = actorList[props.id];
	const directionId: string = directionList[props.lookDirection];

	if (
		actorId === undefined ||
		actorId.length < 1 ||
		directionId === undefined ||
		directionId.length < 1
	) {
		return null;
	}

	const inlineStyle: ICSSPosition = Util.convertXYToCSSPosition(props.x, props.y);
	const styleId: string = actorId + directionId;

	return (
		<div className={css(styles[styleId])} style={inlineStyle}/>
	);
}

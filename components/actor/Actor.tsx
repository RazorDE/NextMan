import { tileSize } from '../../constants';
import { actorList, directionList } from './ActorConstants';
import React from 'react';
import { css } from 'emotion';
import styles from './ActorStyles';

interface IProps {
	direction: number;
	id: number;
	x: number;
	y: number;
}

export default function Actor(props: IProps): JSX.Element | null {
	const actorName: string = actorList[props.id];
	const directionName: string = directionList[props.direction];

	if (
		actorName === undefined ||
		actorName.length < 1 ||
		directionName === undefined ||
		directionName.length < 1
	) {
		return null;
	}

	const left: string = (props.x * tileSize.x).toString() + 'px';
	const name: string = actorName + directionName;
	const top: string = (props.y * tileSize.y).toString() + 'px';

	return (
		<div className={css(styles[name])} style={{left, top}}/>
	);
}
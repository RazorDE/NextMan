import { EDirections } from '../../shared/enums';
import React from 'react';
import Arrow from '../arrow/Arrow';

interface IProps {
	actorTileIdList: number[];
	collectedIdList: number[];
	npcDirectionIdList: number[];
	playerDirectionIdList: number[];
	x: number;
	y: number;
}

export default function NavigationControls(props: IProps): JSX.Element {

	const navigationArrowList: JSX.Element[] = props.playerDirectionIdList.map((directionId: number, index: number) => { 
		const actorDirectionIdList: number[] = [directionId].concat(props.npcDirectionIdList);
		const x: number = props.x + (directionId === EDirections.LEFT ? -1 : directionId === EDirections.RIGHT ? 1 : 0);
		const y: number = props.y + (directionId === EDirections.UP ? -1 : directionId === EDirections.DOWN ? 1 : 0);

		return <Arrow
			actorDirectionIdList={actorDirectionIdList}
			actorTileIdList={props.actorTileIdList}
			collectedIdList={props.collectedIdList}
			key={index}
			x={x}
			y={y}
		/>;
	});

	return <div>
		{navigationArrowList}
	</div>
}


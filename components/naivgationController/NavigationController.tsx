import React from 'react';
import Arrow from '../arrow/Arrow';
import { EDirections } from '../../enums';

interface IProps {
	actorTileIdList: number[];
	collectedIdList: number[];
	directionNPCQuery: number[];
	playerDirectionList: number[];
	playerTileIdList: number[];
	x: number;
	y: number;
}

export default function NavigationControls(props: IProps): JSX.Element {

	const navigationArrowList: JSX.Element[] = props.playerDirectionList.map((directionId: number, index: number) => { 
		const actorDirectionIdList: number[] = [directionId].concat(props.directionNPCQuery);
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


import React from 'react';
import { ILevelData, IGameState, ILevelDataActor, IPoint } from '../../interfaces';
import { directionList } from '../actor/ActorConstants';
import Actor from '../actor/Actor';
import Collectable from '../collectable/Collectable';
import Wall from '../wall/Wall';
const initialLevelData: ILevelData = require('../../static/json/level.json');
const maxCollectableId: number = initialLevelData.collectableList.length - 1;
const maxDirectionId: number = directionList.length - 1;
const maxTileId: number = (initialLevelData.size.x * initialLevelData.size.y) - 1;

interface IProps {
	gameState: IGameState;
}

export default function PlayingField(props: IProps): JSX.Element {
	const { actorList, collectableList, wallList } = getLevelDataFromGameState(props.gameState);

	const actorElementList: JSX.Element[] = actorList.map(
		(actor, index) => <Actor direction={actor.d} id={actor.id} key={index} x={actor.x} y={actor.y} />
	);

	const collectableElementList: JSX.Element[] = collectableList.map(
		(collectable, index) => <Collectable key={index} x={collectable.x} y={collectable.y} />
	);

	const wallsElementList: JSX.Element[] = wallList.map(
		(actor, index) => <Wall id={actor.id} key={index} x={actor.x} y={actor.y} />
	);

	return (
		<div>
			{wallsElementList}
			{collectableElementList}
			{actorElementList}
		</div>
	);
}

function getLevelDataFromGameState(gameState: IGameState): ILevelData {
	const levelData: ILevelData = JSON.parse(JSON.stringify(initialLevelData));

	if (isGameStateValid(gameState)) {
		const { actorList, collectableList, size } = levelData;
		const { actorDirectionIdList, actorTileIdList } = gameState;
		const collectedIdList: number[] = JSON.parse(JSON.stringify(gameState.collectedIdList));

		// Update actor positions
		for (let i = 0, lengthI = actorTileIdList.length; i < lengthI; i++) {
			const actorData: ILevelDataActor = actorList[i];

			if (actorData !== undefined) {
				const newPosition: IPoint = getPositionFromTileId(actorTileIdList[i], size);
				actorData.x = newPosition.x;
				actorData.y = newPosition.y;
			}
		}

		// Update actor directions
		for (let i = 0, lengthI = actorDirectionIdList.length; i < lengthI; i++) {
			const actorData: ILevelDataActor = actorList[i];

			if (actorData !== undefined) {
				actorData.d = actorDirectionIdList[i];
			}
		}

		// Remove collected fruits
		collectedIdList.sort((a, b) => b - a);

		for (let i = 0, lengthI = collectedIdList.length; i < lengthI; i++) {
			const id: number = collectedIdList[i];

			if (collectableList[id] !== undefined) {
				collectableList.splice(id, 1);
			}
		}
	}

	return levelData;
}

function getPositionFromTileId(tileId: number, tileSize: IPoint): IPoint {
	const y: number = Math.floor(tileId / tileSize.x);
	const x: number = tileId - y * tileSize.x;

	return { x, y };
}

function isGameStateValid(gameState: IGameState): boolean {
	const { actorDirectionIdList, actorTileIdList, collectedIdList } = gameState;
	let isValid: boolean = true;

	for (let i = 0, lengthI = actorDirectionIdList.length; i < lengthI; i++) {
		const directionId: number = actorDirectionIdList[i];

		if (
			typeof directionId !== 'number' || directionId < 0 || directionId > maxDirectionId) {
			isValid = false;
			break;
		}
	}

	for (let i = 0, lengthI = actorTileIdList.length; i < lengthI; i++) {
		const actorTileId: number = actorTileIdList[i];

		if (typeof actorTileId !== 'number' || actorTileId < 0 || actorTileId > maxTileId) {
			isValid = false;
			break;
		}
	}

	for (let i = 0, lengthI = collectedIdList.length; i < lengthI; i++) {
		const collectedId: number = collectedIdList[i];

		if (typeof collectedId !== 'number' || collectedId < 0 || collectedId > maxCollectableId) {
			isValid = false;
			break;
		}
	}

	return isValid;
}
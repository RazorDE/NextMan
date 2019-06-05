import React from 'react';
import { directionList } from '../../constants';
import { EDirections } from '../../enums';
import { ICoordinates, IGameState, ILevelData, ILevelDataActor, ITileXY } from '../../interfaces';
import Actor from '../actor/Actor';
import Collectable from '../collectable/Collectable';
import Wall from '../wall/Wall';
import Util from '../../Util';
import NavigationControls from '../naivgationController/NavigationController';

const initialLevelData: ILevelData = require('../../static/json/level.json');
const levelHeight: number = initialLevelData.size.y;
const levelWidth: number = initialLevelData.size.x;
const maxCollectableId: number = initialLevelData.collectableList.length - 1;
const maxDirectionId: number = directionList.length - 1;
const maxTileId: number = (initialLevelData.size.x * initialLevelData.size.y) - 1;
const wallCoordinates: ICoordinates = getCoordinates(initialLevelData.wallList);

interface IProps {
	gameState: IGameState;
}

export default function PlayingField({ gameState }: IProps): JSX.Element {
	let collectedIdList: number[] = [];
	let levelData: ILevelData = initialLevelData;

	if (isGameStateValid(gameState)) {
		levelData = getCurrentLevelDataFromGameState(gameState);
		collectedIdList = addCollectedToList(gameState.collectedIdList, levelData.actorList[0]);
	}

	const { actorList, collectableList, wallList } = levelData;
	const actorCoordinates: ICoordinates = getCoordinates(actorList);
	const actorTileIdList: number[] = getQueryParametersFromList(actorList);
	const directionNPCQuery: number[] = assembleNPCDirectionQuery(actorList, wallCoordinates);
	const obstacleCoordinates: ICoordinates = Object.assign({}, actorCoordinates, wallCoordinates);
	const player: ILevelDataActor = actorList[0];
	const playerDirectionList: number[] = getPossibleDirectionList(player, obstacleCoordinates);
	const playerTileIdList: number[] = getPossibleTileIdList(actorTileIdList[0], playerDirectionList);

	const actorElementList: JSX.Element[] = actorList.map((actor, index) =>
		<Actor
			id={actor.id}
			key={index}
			lookDirection={actor.ld}
			moveDirection={actor.md}
			x={actor.x}
			y={actor.y}
		/>
	);

	const collectableElementList: JSX.Element[] = collectableList.map(
		(collectable, index) => <Collectable key={index} x={collectable.x} y={collectable.y} />
	);

	const wallsElementList: JSX.Element[] = wallList.map(
		(actor, index) => <Wall id={actor.id} key={index} x={actor.x} y={actor.y} />
	);

	const navigationControls: JSX.Element | null = isPlayerAlive(actorList, playerDirectionList) ? (
		<NavigationControls
			actorTileIdList={actorTileIdList}
			collectedIdList={collectedIdList}
			directionNPCQuery={directionNPCQuery}
			playerDirectionList={playerDirectionList}
			playerTileIdList={playerTileIdList}
			x={player.x}
			y={player.y}
		/>
	) : null;

	return (
		<div>
			{wallsElementList}
			{collectableElementList}
			{actorElementList}
			{navigationControls}
		</div>
	);
}

function addCollectedToList(collectedIdList: number[], player: ILevelDataActor): number[] {
	const modifiedCollectedIdList = JSON.parse(JSON.stringify(collectedIdList));
	const { collectableList } = initialLevelData;

	// If the player is over a fruit get its ID and add it to the collection
	for (let i = 0, lengthI = collectableList.length; i < lengthI; i++) {
		if (player.x === collectableList[i].x && player.y === collectableList[i].y) {
			let isAlreadyIncluded = false;

			for (let j = 0, lengthJ = modifiedCollectedIdList.length; j < lengthJ; j++) {
				if (modifiedCollectedIdList[j] === i) {
					isAlreadyIncluded = true;
					break;
				}
			}

			if (!isAlreadyIncluded) {
				modifiedCollectedIdList.push(i);
			}

			break;
		}
	}

	return modifiedCollectedIdList;
}

function assembleNPCDirectionQuery(actorList: ILevelDataActor[], wallCoordinates: ICoordinates): number[] {
	const directionQuery: number[] = [];

	for (let i = 1, lengthI = actorList.length; i < lengthI; i++) {
		const possibleDirectionList: number[] = getPossibleDirectionList(actorList[i], wallCoordinates);
		directionQuery.push(possibleDirectionList[Math.floor(Math.random() * possibleDirectionList.length)]);
	}

	return directionQuery;
}

function getCurrentLevelDataFromGameState(gameState: IGameState): ILevelData {
	const levelData: ILevelData = JSON.parse(JSON.stringify(initialLevelData));
	const { actorList, collectableList } = levelData;
	const { actorDirectionIdList, actorTileIdList } = gameState;
	const collectedIdList: number[] = JSON.parse(JSON.stringify(gameState.collectedIdList));
	const player: ILevelDataActor = actorList[0];

	// Overwrite the cloned initial with the current actor directions and positions
	for (let i = 0, lengthI = actorDirectionIdList.length; i < lengthI; i++) {
		const actorData: ILevelDataActor = actorList[i];

		if (actorData !== undefined) {
			const previousPosition: ITileXY = Util.convertTileIdToTileXY(actorTileIdList[i], levelWidth);
			const direction: number = actorDirectionIdList[i];
			actorData.md = direction;
			actorData.ld = direction;
			actorData.x = previousPosition.x + (
				direction === EDirections.LEFT ? -1 : (direction === EDirections.RIGHT ? 1 : 0)
			);
			actorData.y = previousPosition.y + (
				direction === EDirections.UP ? -1 : (direction === EDirections.DOWN ? 1 : 0)
			);
		}
	}

	// If the player is over a fruit get its ID and add it to the collection
	for (let i = 0, lengthI = collectableList.length; i < lengthI; i++) {
		if (player.x === collectableList[i].x && player.y === collectableList[i].y) {
			collectedIdList.push(i);
		}
	}

	if (collectedIdList.length > 1) {
		collectedIdList.sort((a, b) => b - a);

		// Remove duplicates
		let i = 1;
		let lengthI = collectedIdList.length;

		while (i < lengthI) {
			if (collectedIdList[i - 1] !== collectedIdList[i]) {
				i++;
			} else {
				collectedIdList.splice(i, 1);
				lengthI--;
			}
		}
	}

	// Remove the collected fruits from the cloned list
	for (let i = 0, lengthI = collectedIdList.length; i < lengthI; i++) {
		const id: number = collectedIdList[i];

		if (collectableList[id] !== undefined) {
			collectableList.splice(id, 1);
		}
	}

	return levelData;
}

function getCoordinates(list: ITileXY[]): ICoordinates {
	const coordinates: ICoordinates = {};

	for (let i = 0, lengthI = list.length; i < lengthI; i++) {
		const { x, y }: ITileXY = list[i];
		coordinates[`${x}-${y}`] = true;
	}

	return coordinates;
}

function getPossibleTileIdList(playerTileId: number, playerDirectionList: number[]): number[] {
	const possibleTileIdList: number[] = [];

	for (let i = 0, lengthI = playerDirectionList.length; i < lengthI; i++) {
		switch (playerDirectionList[i]) {
			case EDirections.DOWN:
				possibleTileIdList.push(playerTileId + levelWidth);
				break;
			case EDirections.LEFT:
				possibleTileIdList.push(playerTileId - 1);
				break;
			case EDirections.RIGHT:
				possibleTileIdList.push(playerTileId + 1);
				break;
			case EDirections.UP:
				possibleTileIdList.push(playerTileId - levelWidth);
				break;
			default:
				break;
		}
	}

	return possibleTileIdList;
}

function getPossibleDirectionList(tile: ITileXY, coordinates: ICoordinates): number[] {
	const { x, y } = tile;

	const directionList: number[] = [];

	if (y < levelHeight - 1 && coordinates[`${x}-${y + 1}`] !== true) {
		directionList.push(EDirections.DOWN);
	}

	if (x > 0 && coordinates[`${x - 1}-${y}`] !== true) {
		directionList.push(EDirections.LEFT);
	}

	if (x < levelWidth - 1 && coordinates[`${x + 1}-${y}`] !== true) {
		directionList.push(EDirections.RIGHT);
	}

	if (y > 0 && coordinates[`${x}-${y - 1}`] !== true) {
		directionList.push(EDirections.UP);
	}

	return directionList;
}

function getQueryParametersFromList(list: ITileXY[]): number[] {
	const parameterList: number[] = [];

	for (let i = 0, lengthI = list.length; i < lengthI; i++) {
		parameterList.push(Util.convertTileXYToTileId(list[i], levelWidth));
	}

	return parameterList;
}

function isGameStateValid(gameState: IGameState): boolean {
	const { actorDirectionIdList, actorTileIdList, collectedIdList } = gameState;
	let isValid: boolean = actorDirectionIdList.length === actorTileIdList.length;

	if (isValid) {
		for (let i = 0, lengthI = actorDirectionIdList.length; i < lengthI; i++) {
			const directionId: number = actorDirectionIdList[i];

			if (
				typeof directionId !== 'number' || directionId < 0 || directionId > maxDirectionId) {
				isValid = false;
				break;
			}
		}
	}

	if (isValid) {
		for (let i = 0, lengthI = actorTileIdList.length; i < lengthI; i++) {
			const actorTileId: number = actorTileIdList[i];

			if (typeof actorTileId !== 'number' || actorTileId < 0 || actorTileId > maxTileId) {
				isValid = false;
				break;
			}
		}
	}

	if (isValid) {
		for (let i = 0, lengthI = collectedIdList.length; i < lengthI; i++) {
			const collectedId: number = collectedIdList[i];

			if (typeof collectedId !== 'number' || collectedId < 0 || collectedId > maxCollectableId) {
				isValid = false;
				break;
			}
		}
	}

	return isValid;
}

function isPlayerAlive(actorList: ILevelDataActor[], directionList: number[]): boolean {
	let isAlive = directionList.length > 0;

	if (isAlive) {
		const player: ILevelDataActor = actorList[0];

		for (let i = 1, lengthI = actorList.length; i < lengthI; i++) {
			if (player.x === actorList[i].x && player.y === actorList[i].y) {
				isAlive = false;
				break;
			}
		}
	}

	if (!isAlive) {
		console.log('game over');
	}

	return isAlive;
}

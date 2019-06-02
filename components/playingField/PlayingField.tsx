import React from 'react';
import { directionList } from '../../constants';
import { EDirections } from '../../enums';
import { ICoordinates, IGameState, ILevelData, ILevelDataActor, IPoint } from '../../interfaces';
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
	const { actorList, collectableList, wallList } = getLevelDataFromGameState(gameState);
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
			collectedIdList={gameState.collectedIdList}
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

function assembleNPCDirectionQuery(actorList: ILevelDataActor[], wallCoordinates: ICoordinates): number[] {
	const directionQuery: number[] = [];

	for (let i = 1, lengthI = actorList.length; i < lengthI; i++) {
		const possibleDirectionList: number[] = getPossibleDirectionList(actorList[i], wallCoordinates);
		directionQuery.push(possibleDirectionList[Math.floor(Math.random() * possibleDirectionList.length)]);
	}

	return directionQuery;
}

function getLevelDataFromGameState(gameState: IGameState): ILevelData {
	const levelData: ILevelData = JSON.parse(JSON.stringify(initialLevelData));

	if (isGameStateValid(gameState)) {
		const { actorList, collectableList } = levelData;
		const { actorDirectionIdList, actorTileIdList } = gameState;
		const collectedIdList: number[] = JSON.parse(JSON.stringify(gameState.collectedIdList));
		const player: ILevelDataActor = actorList[0];

		// Update actor positions
		for (let i = 0, lengthI = actorTileIdList.length; i < lengthI; i++) {
			const actorData: ILevelDataActor = actorList[i];

			if (actorData !== undefined) {
				const newPoint: IPoint = Util.getPointFromTileId(actorTileIdList[i], levelWidth);
				actorData.x = newPoint.x;
				actorData.y = newPoint.y;
			}
		}

		// Update actor look and move directions
		for (let i = 0, lengthI = actorDirectionIdList.length; i < lengthI; i++) {
			const actorData: ILevelDataActor = actorList[i];

			if (actorData !== undefined) {
				actorData.ld = actorDirectionIdList[i];
				actorData.md = actorData.ld;
			}
		}

		collectedIdList.sort((a, b) => b - a);

		// Remove collected fruits
		for (let i = 0, lengthI = collectedIdList.length; i < lengthI; i++) {
			const id: number = collectedIdList[i];

			if (collectableList[id] !== undefined) {
				collectableList.splice(id, 1);
			}
		}

		// Remove fruit on player's position and add it to the collected list
		for (let i = 0, lengthI = collectableList.length; i < lengthI; i++) {
			if (player.x === collectableList[i].x && player.y === collectableList[i].y) {
				gameState.collectedIdList.push(i);
				collectableList.splice(i, 1);
				break;
			}
		}
	}

	return levelData;
}

function getCoordinates(list: IPoint[]): ICoordinates {
	const coordinates: ICoordinates = {};

	for (let i = 0, lengthI = list.length; i < lengthI; i++) {
		const { x, y }: IPoint = list[i];
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

function getPossibleDirectionList(tile: IPoint, coordinates: ICoordinates): number[] {
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

function getQueryParametersFromList(list: IPoint[]): number[] {
	const parameterList: number[] = [];

	for (let i = 0, lengthI = list.length; i < lengthI; i++) {
		parameterList.push(Util.getTileIdFromPoint(list[i], levelWidth));
	}

	return parameterList;
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

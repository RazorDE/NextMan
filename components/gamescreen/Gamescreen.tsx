import { directionList } from '../../shared/constants';
import { convertTileIdToTileXY, convertTileXYToTileId } from '../../shared/conversions';
import { EDirections } from '../../shared/enums';
import {
	ICoordinates,
	ILevelData,
	ILevelDataActor,
	ITileXY,
} from '../../shared/interfaces';
import initialLevelData from '../../shared/levelData';
import React from 'react';
import { css } from 'emotion';
import Actor from '../actor/Actor';
import Collectable from '../collectable/Collectable';
import NavigationControls from '../naivgationControls/NavigationControls';
import Wall from '../wall/Wall';
import styles from './GamescreenStyles';

const levelHeight: number = initialLevelData.size.y;
const levelWidth: number = initialLevelData.size.x;
const maxCollectableId: number = initialLevelData.collectableList.length - 1;
const maxDirectionId: number = directionList.length - 1;
const maxTileId: number = (initialLevelData.size.x * initialLevelData.size.y) - 1;
const wallCoordinates: ICoordinates = getCoordinates(initialLevelData.wallList);

interface IProps {
	actorDirectionIdListInput: number[];
	actorTileIdListInput: number[];
	collectedIdListInput: number[];
}

export default function Gamescreen(
	{ actorDirectionIdListInput, actorTileIdListInput, collectedIdListInput }: IProps
): JSX.Element {
	let collectedIdList: number[] = [];
	let levelData: ILevelData = initialLevelData;

	if (isGameStateValid(actorDirectionIdListInput, actorTileIdListInput, collectedIdListInput)) {
		levelData = getCurrentLevelDataFromGameState(
			actorDirectionIdListInput,
			actorTileIdListInput,
			collectedIdListInput
		);
		collectedIdList = getCurrentCollectedIdList(collectedIdListInput, levelData.actorList[0]);
	}

	const { actorList, collectableList, wallList } = levelData;
	const actorCoordinates: ICoordinates = getCoordinates(actorList);
	const actorTileIdList: number[] = getQueryParametersFromList(actorList);
	const npcDirectionIdList: number[] = assembleNpcDirectionIdList(actorList, wallCoordinates);
	const obstacleCoordinates: ICoordinates = Object.assign({}, actorCoordinates, wallCoordinates);
	const player: ILevelDataActor = actorList[0];
	const playerDirectionIdList: number[] = getPossibleDirectionIdList(player, obstacleCoordinates);

	const actorElementList: JSX.Element[] = actorList.map((actor, index) =>
		<Actor
			id={actor.id}
			directionId={actor.d}
			isMoving={actor.isMoving === true}
			key={index}
			x={actor.x}
			y={actor.y}
		/>
	);

	const collectableElementList: JSX.Element[] = collectableList.map(
		(collectable, index) => <Collectable key={index} x={collectable.x} y={collectable.y} />
	);

	const navigationControls: JSX.Element | null = isPlayerAlive(actorList, playerDirectionIdList) ? (
		<NavigationControls
			actorTileIdList={actorTileIdList}
			collectedIdList={collectedIdList}
			isDelayed={player.isMoving === true}
			npcDirectionIdList={npcDirectionIdList}
			playerDirectionIdList={playerDirectionIdList}
			x={player.x}
			y={player.y}
		/>
	) : null;

	const wallsElementList: JSX.Element[] = wallList.map(
		(actor, index) => <Wall id={actor.id} key={index} x={actor.x} y={actor.y} />
	);

	return (
		<div className={css(styles.viewport)}>
			{wallsElementList}
			{collectableElementList}
			{actorElementList}
			{navigationControls}
		</div>
	);
}

function assembleNpcDirectionIdList(actorList: ILevelDataActor[], wallCoordinates: ICoordinates): number[] {
	const directionQuery: number[] = [];

	for (let i = 1, lengthI = actorList.length; i < lengthI; i++) {
		const possibleDirectionIdList: number[] = getPossibleDirectionIdList(actorList[i], wallCoordinates);
		directionQuery.push(possibleDirectionIdList[Math.floor(Math.random() * possibleDirectionIdList.length)]);
	}

	return directionQuery;
}

function getCurrentCollectedIdList(collectedIdList: number[], player: ILevelDataActor): number[] {
	const currentCollectedIdList = JSON.parse(JSON.stringify(collectedIdList));
	const { collectableList } = initialLevelData;

	// If the player is over a fruit get its ID and add it to the collection
	for (let i = 0, lengthI = collectableList.length; i < lengthI; i++) {
		if (player.x === collectableList[i].x && player.y === collectableList[i].y) {
			let isAlreadyCollected = false;

			for (let j = 0, lengthJ = currentCollectedIdList.length; j < lengthJ; j++) {
				if (currentCollectedIdList[j] === i) {
					isAlreadyCollected = true;
					break;
				}
			}

			if (!isAlreadyCollected) {
				currentCollectedIdList.push(i);
			}

			break;
		}
	}

	return currentCollectedIdList;
}

function getCurrentLevelDataFromGameState(
	actorDirectionIdList: number[],
	actorTileIdList: number[],
	collectedIdList: number[]
): ILevelData {
	const levelData: ILevelData = JSON.parse(JSON.stringify(initialLevelData));
	const { actorList, collectableList } = levelData;

	// Overwrite the cloned initial actor directions and positions with the current ones
	for (let i = 0, lengthI = actorDirectionIdList.length; i < lengthI; i++) {
		const actorData: ILevelDataActor = actorList[i];

		if (actorData !== undefined) {
			const previousPosition: ITileXY = convertTileIdToTileXY(actorTileIdList[i], levelWidth);
			const directionId: number = actorDirectionIdList[i];
			actorData.d = directionId;
			actorData.isMoving = true;
			actorData.x = previousPosition.x + (
				directionId === EDirections.LEFT ? -1 : (directionId === EDirections.RIGHT ? 1 : 0)
			);
			actorData.y = previousPosition.y + (
				directionId === EDirections.UP ? -1 : (directionId === EDirections.DOWN ? 1 : 0)
			);
		}
	}

	const currentCollectedIdList: number[] = JSON.parse(JSON.stringify(collectedIdList));

	if (currentCollectedIdList.length > 1) {
		currentCollectedIdList.sort((a, b) => b - a);
	}

	// Remove the collectable from the cloned list
	for (let i = 0, lengthI = currentCollectedIdList.length; i < lengthI; i++) {
		const id: number = currentCollectedIdList[i];

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

function getPossibleDirectionIdList(tile: ITileXY, coordinates: ICoordinates): number[] {
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
		parameterList.push(convertTileXYToTileId(list[i], levelWidth));
	}

	return parameterList;
}

function isGameStateValid(
	actorDirectionIdList: number[],
	actorTileIdList: number[],
	collectedIdList: number[],
): boolean {
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

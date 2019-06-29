import React from 'react';
import { directionList } from '../../shared/constants';
import { convertTileIdToTileXY, convertTileXYToTileId } from '../../shared/conversions';
import { EDirections } from '../../shared/enums';
import {
	ICoordinates,
	ILevelData,
	ILevelDataActor,
	ILevelDataWall,
	ISize,
	ITileXY,
} from '../../shared/interfaces';
import initialLevelData from '../../shared/levelData';
import { mutableClone } from '../../shared/util';
import Actor from '../actor/Actor';
import Collectable from '../collectable/Collectable';
import Message from '../message/Message';
import NavigationControls from '../naivgationControls/NavigationControls';
import StartButton from '../startButton/StartButton';
import Wall from '../wall/Wall';
import styles from './GamescreenStyles';

const levelSize = getLevelSize(initialLevelData);
const maxCollectableId = initialLevelData.collectableList.length - 1;
const maxDirectionId = directionList.length - 1;
const maxTileId = (levelSize.x * levelSize.y) - 1;
const wallCoordinates = getCoordinates(initialLevelData.wallList);

type Props = Readonly<{
	actorDirectionIdListInput: readonly number[];
	actorTileIdListInput: readonly number[];
	collectedIdListInput: readonly number[];
	hasJavaScript: boolean;
}>;

export default function Gamescreen(
	{ actorDirectionIdListInput, actorTileIdListInput, collectedIdListInput, hasJavaScript }: Props
): JSX.Element {
	let collectedIdList: number[] = [];
	let levelData = initialLevelData;

	if (isGameStateValid(actorDirectionIdListInput, actorTileIdListInput, collectedIdListInput)) {
		levelData = getCurrentLevelDataFromGameState(
			actorDirectionIdListInput,
			actorTileIdListInput,
			collectedIdListInput
		);
		collectedIdList = getCurrentCollectedIdList(collectedIdListInput, levelData.actorList[0]);
	}

	const { actorList, collectableList, wallList } = levelData;
	const areCollectablesLeft = collectableList.length > 0;
	const actorCoordinates = getCoordinates(actorList);
	const actorTileIdList = getQueryParametersFromList(actorList);
	const npcDirectionIdList = createNpcDirectionIdList(actorList, wallCoordinates);
	const obstacleCoordinates = Object.assign({}, actorCoordinates, wallCoordinates);
	const player = actorList[0];
	const playerDirectionIdList = getActorDirectionIdList(player, obstacleCoordinates);
	const isAlive = isPlayerAlive(actorList, playerDirectionIdList);
	const styleSheet = styles(levelSize.x, levelSize.y);

	return (
		<>
			<div className="viewport">
				<Walls wallList={wallList} />
				<Collectables collectableList={collectableList} />
				<Actors actorList={actorList} />
				{isAlive && areCollectablesLeft ? (
					<NavigationControls
						actorTileIdList={actorTileIdList}
						collectedIdList={collectedIdList}
						isDelayed={player.isMoving === true}
						npcDirectionIdList={npcDirectionIdList}
						playerDirectionIdList={playerDirectionIdList}
						x={player.x}
						y={player.y}
					/>
				) : null}
				<Message
					areCollectablesLeft={areCollectablesLeft}
					hasJavaScript={hasJavaScript}
					isInitialStep={player.isMoving !== true}
					isPlayerAlive={isAlive}
				/>
				{isAlive && collectableList.length > 0
					? null : (
						<div className="restart-button">
							<StartButton isRestart={true} />
						</div>
					)}
			</div>
			<style jsx>{styleSheet}</style>
		</>
	);
}

type ActorsProps = Readonly<{
	actorList: ILevelDataActor[];
}>;

function Actors({ actorList }: ActorsProps): JSX.Element {
	const actorElementList = actorList.map((actor, index) =>
		<Actor
			directionId={actor.d}
			id={actor.id}
			isMoving={actor.isMoving === true}
			key={index}
			x={actor.x}
			y={actor.y}
		/>
	);

	return <>{actorElementList}</>
}

type CollectablesProps = Readonly<{
	collectableList: ITileXY[];
}>;

function Collectables({ collectableList }: CollectablesProps): JSX.Element {
	const collectableElementList = collectableList.map(
		(collectable, index) => <Collectable key={index} x={collectable.x} y={collectable.y} />
	);

	return <>{collectableElementList}</>
}

type WallsProps = Readonly<{
	wallList: ILevelDataWall[];
}>;

function Walls({ wallList }: WallsProps): JSX.Element {
	const wallsElementList = wallList.map(
		(wall, index) => <Wall id={wall.id} key={index} x={wall.x} y={wall.y} />
	);

	return <>{wallsElementList}</>
}

function createNpcDirectionIdList(actorList: ILevelDataActor[], wallCoordinates: ICoordinates): number[] {
	const directionQuery: number[] = [];

	for (let i = 1, lengthI = actorList.length; i < lengthI; i++) {
		const npcDirectionIdList = getActorDirectionIdList(actorList[i], wallCoordinates);
		directionQuery.push(npcDirectionIdList[Math.floor(Math.random() * npcDirectionIdList.length)]);
	}

	return directionQuery;
}

function getActorDirectionIdList(tile: ITileXY, coordinates: ICoordinates): number[] {
	const { x, y } = tile;

	const directionList: number[] = [];

	if (y < levelSize.y - 1 && coordinates[`${x}-${y + 1}`] !== true) {
		directionList.push(EDirections.DOWN);
	}

	if (x > 0 && coordinates[`${x - 1}-${y}`] !== true) {
		directionList.push(EDirections.LEFT);
	}

	if (x < levelSize.x - 1 && coordinates[`${x + 1}-${y}`] !== true) {
		directionList.push(EDirections.RIGHT);
	}

	if (y > 0 && coordinates[`${x}-${y - 1}`] !== true) {
		directionList.push(EDirections.UP);
	}

	return directionList;
}

function getCurrentCollectedIdList(collectedIdList: readonly number[], player: ILevelDataActor): number[] {
	const currentCollectedIdList = mutableClone(collectedIdList);
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
	actorDirectionIdList: readonly number[],
	actorTileIdList: readonly number[],
	collectedIdList: readonly number[]
): ILevelData {
	const levelData = mutableClone(initialLevelData);
	const { actorList, collectableList } = levelData;

	// Overwrite the cloned initial actor directions and positions with the current ones
	for (let i = 0, lengthI = actorDirectionIdList.length; i < lengthI; i++) {
		const actorData = actorList[i];

		if (actorData !== undefined) {
			const previousPosition = convertTileIdToTileXY(actorTileIdList[i], levelSize.x);
			const directionId = actorDirectionIdList[i];
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

	const currentCollectedIdList = mutableClone(collectedIdList);

	if (currentCollectedIdList.length > 1) {
		currentCollectedIdList.sort((a, b) => b - a);
	}

	// Remove the collectable from the cloned list
	for (let i = 0, lengthI = currentCollectedIdList.length; i < lengthI; i++) {
		const id = currentCollectedIdList[i];

		if (collectableList[id] !== undefined) {
			collectableList.splice(id, 1);
		}
	}

	return levelData;
}

function getCoordinates(list: ITileXY[]): ICoordinates {
	const coordinates: ICoordinates = {};

	for (let i = 0, lengthI = list.length; i < lengthI; i++) {
		const { x, y } = list[i];
		coordinates[`${x}-${y}`] = true;
	}

	return coordinates;
}

function getLevelSize(levelData: ILevelData): ISize {
	const combinedList = levelData.collectableList
		.concat(levelData.wallList)
		.concat(levelData.actorList);
	let x = -1;
	let y = -1;

	for (let i = 0, lengthI = combinedList.length; i < lengthI; i++) {
		const levelObject = combinedList[i];
		x = levelObject.x > x ? levelObject.x : x;
		y = levelObject.y > y ? levelObject.y : y;
	}

	return { x: x + 1, y: y + 1 };
}

function getQueryParametersFromList(list: ITileXY[]): number[] {
	const parameterList: number[] = [];

	for (let i = 0, lengthI = list.length; i < lengthI; i++) {
		parameterList.push(convertTileXYToTileId(list[i], levelSize.x));
	}

	return parameterList;
}

function isGameStateValid(
	actorDirectionIdList: readonly number[],
	actorTileIdList: readonly number[],
	collectedIdList: readonly number[],
): boolean {
	let isValid = actorDirectionIdList.length === actorTileIdList.length;

	if (isValid) {
		for (let i = 0, lengthI = actorDirectionIdList.length; i < lengthI; i++) {
			const directionId = actorDirectionIdList[i];

			if (directionId < 0 || directionId > maxDirectionId) {
				isValid = false;
				break;
			}
		}
	}

	if (isValid) {
		for (let i = 0, lengthI = actorTileIdList.length; i < lengthI; i++) {
			const actorTileId = actorTileIdList[i];

			if (actorTileId < 0 || actorTileId > maxTileId) {
				isValid = false;
				break;
			}
		}
	}

	if (isValid) {
		for (let i = 0, lengthI = collectedIdList.length; i < lengthI; i++) {
			const collectedId = collectedIdList[i];

			if (collectedId < 0 || collectedId > maxCollectableId) {
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
		const player = actorList[0];

		for (let i = 1, lengthI = actorList.length; i < lengthI; i++) {
			if (player.x === actorList[i].x && player.y === actorList[i].y) {
				isAlive = false;
				break;
			}
		}
	}

	return isAlive;
}

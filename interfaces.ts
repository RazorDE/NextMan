import { CSSObject } from "@emotion/css";

export interface ICoordinates {
	[key: string]: boolean;
}

export interface ICSSPosition {
	left: string;
	top: string;
}

export interface IGameState {
	actorDirectionIdList: number[];
	actorTileIdList: number[];
	collectedIdList: number[];
}

export interface ILevelData {
	actorList: ILevelDataActor[];
	collectableList: IPoint[];
	size: IPoint;
	wallList: ILevelDataWall[];
	width: number;
}

export interface ILevelDataActor extends ILevelDataWall {
	ld: number;
	md?: number;
}

export interface ILevelDataWall extends IPoint {
	id: number;
}

export interface IPoint {
	x: number;
	y: number;
}

export interface IStyles {
	[key: string]: CSSObject;
}

export interface ITileSize {
	x: number;
	y: number;
}

import { CSSObject } from "@emotion/css";

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
	d: number;
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
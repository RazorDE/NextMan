import { CSSObject } from "@emotion/css";

export interface ICoordinates {
	[key: string]: boolean;
}

export interface ICSSPosition {
	left: string;
	top: string;
}

export interface ILevelData {
	actorList: ILevelDataActor[];
	collectableList: ITileXY[];
	size: ITileXY;
	wallList: ILevelDataWall[];
	width: number;
}

export interface ILevelDataActor extends ILevelDataWall {
	d: number;
}

export interface ILevelDataWall extends ITileXY {
	id: number;
}

export interface ITileXY {
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

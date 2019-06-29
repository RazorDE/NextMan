export interface ICoordinates {
	[key: string]: boolean;
}

export interface IDictionary {
	data: IDictionaryData;
	language: string;
}

export interface IDictionaryData {
	[key: string]: string;
}

export interface ICSSPosition {
	left: string;
	top: string;
}

export interface ILevelData {
	actorList: ILevelDataActor[];
	collectableList: ITileXY[];
	wallList: ILevelDataWall[];
	width: number;
}

export interface ILevelDataActor extends ILevelDataWall {
	d: number;
	isMoving?: boolean;
}

export interface ILevelDataWall extends ITileXY {
	id: number;
}

export interface ISettings {
	animationDuration: number;
	defaultLanguage: string;
	languageList: string[];
}

export interface ISize {
	x: number;
	y: number;
}

export interface ITileXY {
	x: number;
	y: number;
}

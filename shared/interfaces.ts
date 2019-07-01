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
	websiteTitle: string;
}

export interface ITileXY {
	x: number;
	y: number;
}

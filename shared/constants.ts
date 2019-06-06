import { ITileSize } from './interfaces';

export const actorList: string[] = [
	'ghostCyan',
	'ghostOrange',
	'ghostPink',
	'ghostPurple',
	'ghostRed',
	'player',
];

export const actorPositionXList: string[] = [
	'-192px',
	'-64px',
	'-128px',
	'-256px',
	'0',
	'-320px',
];

export const actorPositionYList: string[] = [
	'-32px',
	'-64px',
	'0',
	'-96px'
];

export const directionList: string[] = ['Down', 'Left',	'Right', 'Up'];
export const keyCodes: number[] = [40, 37, 39, 38];
export const tileSize: ITileSize = {x: 32, y: 32};

export const wallList: string[] = [
	'cornerBottomLeft',
	'cornerBottomRight',
	'cornerTopLeft',
	'cornerTopRight',
	'horizontalCenter',
	'horizontalLeft',
	'horizontalRight',
	'plus',
	'single',
	'tBottom',
	'tLeft',
	'tRight',
	'tTop',
	'verticalBottom',
	'verticalCenter',
	'verticalTop',
];

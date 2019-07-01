import { tileSize } from './constants';
import { ITileXY } from './interfaces';
import { ParsedUrlQueryInput } from 'querystring';

export function convertObjectToQueryString(obj: ParsedUrlQueryInput) {
	if (typeof obj !== 'object' || Object.keys(obj).length < 1) {
		return '';
	}

	let queryString = '?';

	for (let key in obj) {
		if (obj.hasOwnProperty(key)) {
			queryString += `${key}=${obj[key]}&`;
		}
	}

	return queryString.substr(0, queryString.length - 1);
}

export function convertStringifiedNumbersToArray(stringifiedNumbers: string) {
	if (stringifiedNumbers.length < 1) {
		return [];
	}

	try {
		const parsed = JSON.parse(`[${stringifiedNumbers.replace(/-/g, ',')}]`);
		const result: number[] = [];

		for (let i = 0, lengthI = parsed.length; i < lengthI; i++) {
			if (typeof parsed[i] === 'number') {
				result.push(parsed[i]);
			}
		}

		return result;
	} catch (error) {
		return [];
	}
}

export function convertTileIdToTileXY(tileId: number, levelWidth: number) {
	const y = Math.floor(tileId / levelWidth);
	const x = tileId - y * levelWidth;

	return { x, y };
}

export function convertTileXYToTileId(coordinate: ITileXY, levelWidth: number) {
	return coordinate.y * levelWidth + coordinate.x;
}

export function convertXYToCSSPosition(x: number, y: number) {
	return {
		left: (x * tileSize.x).toString() + 'px',
		top: (y * tileSize.y).toString() + 'px'
	};
}

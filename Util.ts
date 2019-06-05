import { tileSize } from './constants';
import { ITileXY, ICSSPosition } from './interfaces';
import { ParsedUrlQueryInput } from 'querystring';

export default class Util {
	public static convertObjectToQueryString(obj: ParsedUrlQueryInput): string {
		if (typeof obj !== 'object' || Object.keys(obj).length < 1) {
			return '';
		}

		let queryString: string = '/?';

		for (let key in obj) {
			if (obj.hasOwnProperty(key)) {
				queryString += `${key}=${obj[key]}&`;
			}
		}

		return queryString.substr(0, queryString.length - 1);
	}

	public static convertTileIdToTileXY(tileId: number, levelWidth: number): ITileXY {
		const y: number = Math.floor(tileId / levelWidth);
		const x: number = tileId - y * levelWidth;

		return { x, y };
	}

	public static convertTileXYToTileId(coordinate: ITileXY, levelWidth: number): number {
		return coordinate.y * levelWidth + coordinate.x;
	}

	public static convertXYToCSSPosition(x: number, y: number): ICSSPosition {
		return {
			left: (x * tileSize.x).toString() + 'px',
			top: (y * tileSize.y).toString() + 'px'
		};
	}
}
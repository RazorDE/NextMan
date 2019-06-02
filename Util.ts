import { tileSize } from './constants';
import { IPoint, ICSSPosition } from './interfaces';

export default class Util {
	public static convertXYToCSSPosition(x: number, y: number): ICSSPosition {
		return {
			left: (x * tileSize.x).toString() + 'px',
			top: (y * tileSize.y).toString() + 'px'
		};
	}

	public static getPointFromTileId(tileId: number, levelWidth: number): IPoint {
		const y: number = Math.floor(tileId / levelWidth);
		const x: number = tileId - y * levelWidth;

		return {x, y};
	}

	public static getTileIdFromPoint(point: IPoint, levelWidth: number) {
		return point.y * levelWidth + point.x;
	}
}
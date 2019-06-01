import { IPoint } from './interfaces';

export default class Util {
	public static getPositionFromTileId(tileId: number, tileSize: IPoint): IPoint {
		const y: number = Math.floor(tileId / tileSize.x);
		const x: number = tileId - y;

		return {x, y};
	}
}
import css from 'styled-jsx/css';
import { tileSize } from '../../shared/constants';

export function styleFunc(levelSizeX: number, levelSizeY: number) {
	return css`
		.restart-button {
			position: absolute;
			text-align: center;
			top: 250px;
			width: 100%;
		}

		.viewport {
			border: 1px solid blue;
			height: ${levelSizeY * tileSize.y}px;
			margin: 20px auto 0;
			position: relative;
			width: ${levelSizeX * tileSize.x}px;
		}
	`
}

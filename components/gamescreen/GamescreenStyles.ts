import css from 'styled-jsx/css';
import { tileSize } from '../../shared/constants';

export default function styles(levelSizeX: number, levelSizeY: number): string {
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

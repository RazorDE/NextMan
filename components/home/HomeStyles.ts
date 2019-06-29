import css from 'styled-jsx/css';
import { tileSize } from '../../shared/constants';

export default css`
	.start-button {
		margin-top: 120px;
		text-align: center;
	}

	.subtitle {
		color: #fff;
		font-family: "Courier New", Courier, monospace;
		font-size: 28px;
		font-weight: bold;
		text-align: center;
	}

	.title {
		color: #fff;
		font-family: "Courier New", Courier, monospace;
		font-size: 80px;
		font-weight: bold;
		margin-top: 60px;
		text-align: center;
	}

	.viewport {
		border: 1px solid blue;
		height: ${15 * tileSize.y}px;
		margin: 20px auto 0;
		position: relative;
		width: ${20 * tileSize.x}px;
	}
`;

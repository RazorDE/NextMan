import css from 'styled-jsx/css';
import { tileSize } from '../../shared/constants';
import settings from '../../shared/settings';

const animationDuration: string = `${settings.animationDuration}ms`;

export const styles = css`
	@keyframes animation0 {
		from, 0%, to, 99% {
			height: 0;
			width: 0;
		}
		100% {
			height: ${tileSize.y}px;
			width: ${tileSize.x}px;
		}
	}

	@keyframes animation1 {
		from, 0%, to, 99% {
			height: 0;
			width: 0;
		}
		100% {
			height: ${tileSize.y}px;
			width: ${tileSize.x}px;
		}
	}

	.arrow {
		background-image: url(/static/images/arrowsprite.png);
		height: ${tileSize.y}px;
		opacity: 0.5;
		position: absolute;
		width: ${tileSize.x}px;
	}

	.delayed0 {
		animation: animation0 ${animationDuration} linear forwards;
		position: absolute;
	}

	.delayed1 {
		animation: animation1 ${animationDuration} linear forwards;
		position: absolute;
	}

	.left {
		background-position-x: -32px;
	}

	.right {
		background-position-x: -64px;
	}

	.up {
		background-position-x: -96px;
	}
`;

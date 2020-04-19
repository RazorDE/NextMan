import css from 'styled-jsx/css';
import { tileSize } from '../../shared/constants';
import settings from '../../shared/settings';

const animationDuration: string = `${settings.animationDuration}ms`;

export const styles = css`
	@keyframes down-0 {
		from { transform: translateY(0) }
		to { transform: translateY(${tileSize.y}px) }
	}

	@keyframes down-1 {
		from { transform: translateY(0) }
		to { transform: translateY(${tileSize.y}px) }
	}

	@keyframes ghost-cyan {
		from { background-position-x: -192px }
		to { background-position-x: -256px }
	}

	@keyframes ghost-orange {
		from { background-position-x: -64px }
		to { background-position-x: -128px }
	}

	@keyframes ghost-pink {
		from { background-position-x: -128px }
		to { background-position-x: -192px }
	}

	@keyframes ghost-purple {
		from { background-position-x: -256px }
		to { background-position-x: -320px }
	}

	@keyframes left-0 {
		from { transform: translateX(0) }
		to { transform: translateX(${-tileSize.x}px) }
	};

	@keyframes left-1 {
		from { transform: translateX(0) }
		to { transform: translateX(${-tileSize.x}px) }
	};

	@keyframes player {
		from { background-position-x: -320px }
		to { background-position-x: -384px }
	}

	@keyframes right-0 {
		from { transform: translateX(0) }
		to { transform: translateX(${tileSize.x}px) }
	};

	@keyframes right-1 {
		from { transform: translateX(0) }
		to { transform: translateX(${tileSize.x}px) }
	};

	@keyframes up-0 {
		from { transform: translateY(0) }
		to { transform: translateY(${-tileSize.y}px) }
	}

	@keyframes up-1 {
		from { transform: translateY(0) }
		to { transform: translateY(${-tileSize.y}px) }
	}

	.actor {
		background-image: url(https://construct-static.com/images/v780/uploads/articleuploadobject/0/images/13275/chompersprites.png);
		height: ${tileSize.y}px;
		width: ${tileSize.y}px;
	}

	.actor.down {
		background-position-y: -32px;
	}

	.actor.ghost-cyan {
		animation: ghost-cyan ${animationDuration} steps(2) infinite;
		background-position-x: -192px;
	}

	.actor.ghost-orange {
		animation: ghost-orange ${animationDuration} steps(2) infinite;
		background-position-x: -64px;
	}

	.actor.ghost-pink {
		animation: ghost-pink ${animationDuration} steps(2) infinite;
		background-position-x: -128px;
	}

	.actor.ghost-purple {
		animation: ghost-purple ${animationDuration} steps(2) infinite;
		background-position-x: -256px;
	}

	.actor.left {
		background-position-y: -64px;
	}

	.actor.player {
		animation: player ${animationDuration} steps(2) infinite;
		background-position-x: -320px;
	}

	.actor.up {
		background-position-y: -96px;
	}

	.direction {
		height: ${tileSize.y}px;
		position: absolute;
		width: ${tileSize.y}px;
	};

	.direction.down-0 {
		animation: down-0 ${animationDuration} ease forwards;
		position: absolute;
	}

	.direction.down-1 {
		animation: down-1 ${animationDuration} ease forwards;
		position: absolute;
	}

	.direction.left-0 {
		animation: left-0 ${animationDuration} ease forwards;
		position: absolute;
	}

	.direction.left-1 {
		animation: left-1 ${animationDuration} ease forwards;
		position: absolute;
	}

	.direction.right-0 {
		animation: right-0 ${animationDuration} ease forwards;
		position: absolute;
	}

	.direction.right-1 {
		animation: right-1 ${animationDuration} ease forwards;
		position: absolute;
	}

	.direction.up-0 {
		animation: up-0 ${animationDuration} ease forwards;
		position: absolute;
	}

	.direction.up-1 {
		animation: up-1 ${animationDuration} ease forwards;
		position: absolute;
	}
`;

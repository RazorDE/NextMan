import css from 'styled-jsx/css';
import { tileSize } from '../../shared/constants';

export default css`
	div {
		background-image: url(/static/images/chompermazetiles.png);
		height: ${tileSize.y}px;
		position: absolute;
		width: ${tileSize.y}px;
	}

	.corner-bottom-left {
		background-position-x: -96px;
		background-position-y: -64px;
	}

	.corner-bottom-right {
		background-position-x: -160px;
		background-position-y: -64px;
	}

	.corner-top-left {
		background-position-x: -96px;
	}

	.corner-top-right {
		background-position-x: -160px;
	}

	.horizontal-center {
		background-position-x: -256px;
	}

	.horizontal-left {
		background-position-x: -224px;
	}

	.horizontal-right {
		background-position-x: -288px;
	}

	.plus {
		background-position-x: -128px;
		background-position-y: -32px;
	}

	.single {
		background-position-x: -224px;
		background-position-y: -32px;
	}

	.t-bottom {
		background-position-x: -128px;
		background-position-y: -64px;
	}

	.t-left {
		background-position-x: -96px;
		background-position-y: -32px;
	}

	.t-right {
		background-position-x: -160px;
		background-position-y: -32px;
	}

	.t-top {
		background-position-x: -128px;
	}

	.vertical-bottom {
		background-position-x: -192px;
		background-position-y: -64px;
	}

	.vertical-center {
		background-position-x: -192px;
		background-position-y: -32px;
	}

	.vertical-top {
		background-position-x: -192px;
	}
`;
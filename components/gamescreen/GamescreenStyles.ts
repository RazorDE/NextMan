import levelData from '../../shared/levelData';
import { tileSize } from '../../shared/constants';
import { CSSObject } from '@emotion/core';

const { size } = levelData;

const labelPrefix: string = 'gamescreen-';

const restartButtonContainer: CSSObject = {
	label: labelPrefix + 'restartButtonContainer',
	position: 'absolute',
	textAlign: 'center',
	top: '250px',
	width: '100%',
}

const viewport: CSSObject = {
	label: labelPrefix + 'viewport',
	border: '1px solid blue',
	height: `${size.y * tileSize.y}px`,
	margin: '20px auto 0',
	position: 'relative',
	width: `${size.x * tileSize.x}px`,
}

export default {
	restartButtonContainer,
	viewport,
}
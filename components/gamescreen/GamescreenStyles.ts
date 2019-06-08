import { tileSize } from '../../shared/constants';
import { CSSObject } from '@emotion/core';

const labelPrefix: string = 'gamescreen-';

const viewport: CSSObject = {
	label: labelPrefix + 'viewport',
	margin: '20px auto 0',
	position: 'relative',
	width: `${20 * tileSize.x}px`,
}

export default {
	viewport,
}
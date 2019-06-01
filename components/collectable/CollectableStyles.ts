import { tileSize } from '../../constants';
import { CSSObject } from '@emotion/core';

const labelPrefix: string = 'collectable-';

const fruit: CSSObject = {
	label: labelPrefix + 'fruit',
	backgroundImage: 'url(/static/images/chompermazetiles.png)',
	backgroundPositionX: '-288px',
	backgroundPositionY: '-64px',
	height: tileSize.y + 'px',
	position: 'absolute',
	width: tileSize.y + 'px',
}

export default {
	fruit,
};
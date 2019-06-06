import { tileSize } from '../../shared/constants';
import { CSSObject } from '@emotion/core';

const labelPrefix: string = 'collectable-';

const collectable: CSSObject = {
	label: labelPrefix + 'collectable',
	backgroundImage: 'url(/static/images/chompermazetiles.png)',
	backgroundPositionX: '-288px',
	backgroundPositionY: '-64px',
	height: tileSize.y + 'px',
	position: 'absolute',
	width: tileSize.y + 'px',
}

export default {
	collectable,
};
import { tileSize } from '../../shared/constants';
import { IStyles } from '../../shared/interfaces';
import { CSSObject } from '@emotion/core';

const labelPrefix: string = 'wall-';

const wall: CSSObject = {
	label: labelPrefix + 'wall',
	backgroundImage: 'url(/static/images/chompermazetiles.png)',
	height: tileSize.y + 'px',
	position: 'absolute',
	width: tileSize.y + 'px',
};

const cornerBottomLeft: CSSObject = {
	...wall,
	label: labelPrefix + 'cornerBottomLeft',
	backgroundPositionX: '-96px',
	backgroundPositionY: '-64px',
};

const cornerBottomRight: CSSObject = {
	...wall,
	label: labelPrefix + 'cornerBottomRight',
	backgroundPositionX: '-160px',
	backgroundPositionY: '-64px',
};

const cornerTopLeft: CSSObject = {
	...wall,
	label: labelPrefix + 'cornerTopLeft',
	backgroundPositionX: '-96px',
};

const cornerTopRight: CSSObject = {
	...wall,
	label: labelPrefix + 'cornerTopRight',
	backgroundPositionX: '-160px',
};

const horizontalCenter: CSSObject = {
	...wall,
	label: labelPrefix + 'horizontalCenter',
	backgroundPositionX: '-256px',
};

const horizontalLeft: CSSObject = {
	...wall,
	label: labelPrefix + 'horizontalLeft',
	backgroundPositionX: '-224px',
};

const horizontalRight: CSSObject = {
	...wall,
	label: labelPrefix + 'horizontalRight',
	backgroundPositionX: '-288px',
};

const plus: CSSObject = {
	...wall,
	label: labelPrefix + 'plus',
	backgroundPositionX: '-128px',
	backgroundPositionY: '-32px',
};

const single: CSSObject = {
	...wall,
	label: labelPrefix + 'single',
	backgroundPositionX: '-224px',
	backgroundPositionY: '-32px',
};

const tBottom: CSSObject = {
	...wall,
	label: labelPrefix + 'tBottom',
	backgroundPositionX: '-128px',
	backgroundPositionY: '-64px',
};

const tLeft: CSSObject = {
	...wall,
	label: labelPrefix + 'tLeft',
	backgroundPositionX: '-96px',
	backgroundPositionY: '-32px',
};

const tRight: CSSObject = {
	...wall,
	label: labelPrefix + 'tRight',
	backgroundPositionX: '-160px',
	backgroundPositionY: '-32px',
};

const tTop: CSSObject = {
	...wall,
	label: labelPrefix + 'tTop',
	backgroundPositionX: '-128px',
};

const verticalBottom: CSSObject = {
	...wall,
	label: labelPrefix + 'verticalBottom',
	backgroundPositionX: '-192px',
	backgroundPositionY: '-64px',
};

const verticalCenter: CSSObject = {
	...wall,
	label: labelPrefix + 'verticalCenter',
	backgroundPositionX: '-192px',
	backgroundPositionY: '-32px',
};

const verticalTop: CSSObject = {
	...wall,
	label: labelPrefix + 'verticalTop',
	backgroundPositionX: '-192px',
};

const styles: IStyles = {
	cornerBottomLeft,
	cornerBottomRight,
	cornerTopLeft,
	cornerTopRight,
	horizontalCenter,
	horizontalLeft,
	horizontalRight,
	plus,
	single,
	tBottom,
	tLeft,
	tRight,
	tTop,
	verticalBottom,
	verticalCenter,
	verticalTop,
};

export default styles;
import { tileSize } from '../../shared/constants';
import { IStyles } from '../../shared/interfaces';
import settings from '../../shared/settings';
import { CSSObject, keyframes } from '@emotion/core';

const animationDuration: string = `${settings.animationDuration}ms`;
const labelPrefix: string = 'arrow-';

// Base arrow class
const arrow: CSSObject = {
	label: labelPrefix + 'arrow',
	backgroundImage: 'url(/static/images/arrowsprite.png)',
	height: `${tileSize.y}px`,
	opacity: 0.5,
	position: 'absolute',
	width: `${tileSize.x}px`,
};

// "Size"-animation for the arrow-class
const animationShowArrow0: CSSObject = {
	label: '0',
	'from, 0%, to, 99%': {
		height: 0,
		width: 0,
	},
	'100%': {
		height: `${tileSize.y}px`,
		width: `${tileSize.x}px`,
	},
};

const animationShowArrow1: CSSObject = {
	...animationShowArrow0,
	label: '1',
};

const arrowDelayed0: CSSObject = {
	label: labelPrefix + 'arrowDelayed0',
	animation: `${keyframes(animationShowArrow0)} ${animationDuration} linear forwards`,
};

const arrowDelayed1: CSSObject = {
	label: labelPrefix + 'arrowDelayed1',
	animation: `${keyframes(animationShowArrow1)} ${animationDuration} linear forwards`,
};

// Arrow classes with "size"-animations
const arrowDown: CSSObject = {
	...arrow,
	label: labelPrefix + 'arrowDown',
};

const arrowDownDelayed0: CSSObject = {
	...arrowDown,
	...arrowDelayed0,
	label: labelPrefix + 'arrowDownDelayed0',
};

const arrowDownDelayed1: CSSObject = {
	...arrowDown,
	...arrowDelayed1,
	label: labelPrefix + 'arrowDownDelayed1',
};

const arrowLeft: CSSObject = {
	...arrow,
	label: labelPrefix + 'arrowLeft',
	backgroundPositionX: '-32px',
};

const arrowLeftDelayed0: CSSObject = {
	...arrowLeft,
	...arrowDelayed0,
	label: labelPrefix + 'arrowLeftDelayed0',
};

const arrowLeftDelayed1: CSSObject = {
	...arrowLeft,
	...arrowDelayed1,
	label: labelPrefix + 'arrowLeftDelayed1',
};

const arrowRight: CSSObject = {
	...arrow,
	label: labelPrefix + 'arrowRight',
	backgroundPositionX: '-64px',
};

const arrowRightDelayed0: CSSObject = {
	...arrowRight,
	...arrowDelayed0,
	label: labelPrefix + 'arrowRightDelayed0',
};

const arrowRightDelayed1: CSSObject = {
	...arrowRight,
	...arrowDelayed1,
	label: labelPrefix + 'arrowRightDelayed1',
};

const arrowUp: CSSObject = {
	...arrow,
	label: labelPrefix + 'arrowUp',
	backgroundPositionX: '-96px',
};

const arrowUpDelayed0: CSSObject = {
	...arrowUp,
	...arrowDelayed0,
	label: labelPrefix + 'arrowUpDelayed0',
};

const arrowUpDelayed1: CSSObject = {
	...arrowUp,
	...arrowDelayed1,
	label: labelPrefix + 'arrowUpDelayed1',
};

const styles: IStyles = {
	arrowDown,
	arrowDownDelayed0,
	arrowDownDelayed1,
	arrowLeft,
	arrowLeftDelayed0,
	arrowLeftDelayed1,
	arrowRight,
	arrowRightDelayed0,
	arrowRightDelayed1,
	arrowUp,
	arrowUpDelayed0,
	arrowUpDelayed1,
};

export default styles;

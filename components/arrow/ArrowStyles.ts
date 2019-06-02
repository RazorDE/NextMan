import { tileSize } from '../../constants';
import { CSSObject } from '@emotion/core';
import { IStyles } from '../../interfaces';

const labelPrefix: string = 'arrow-';

const arrow: CSSObject = {
	label: labelPrefix + 'arrow',
	backgroundImage: 'url(/static/images/arrowsprite.png)',
	height: tileSize.y + 'px',
	opacity: 0.5,
	position: 'absolute',
	width: tileSize.y + 'px',
}

const arrowDown: CSSObject = {
	...arrow,
	label: labelPrefix + 'arrowDown',
}

const arrowLeft: CSSObject = {
	...arrow,
	label: labelPrefix + 'arrowLeft',
	backgroundPositionX: '-32px',
}

const arrowRight: CSSObject = {
	...arrow,
	label: labelPrefix + 'arrowRight',
	backgroundPositionX: '-64px',
}

const arrowUp: CSSObject = {
	...arrow,
	label: labelPrefix + 'arrowUp',
	backgroundPositionX: '-96px',
}

const styles: IStyles = {
	arrowDown,
	arrowLeft,
	arrowRight,
	arrowUp,
};

export default styles;

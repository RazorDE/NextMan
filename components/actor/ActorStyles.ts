import {
	actorList,
	actorPositionXList,
	actorPositionYList,
	directionList,
	tileSize,
} from '../../shared/constants';
import { IStyles } from '../../shared/interfaces';
import settings from '../../shared/settings';
import { CSSObject, keyframes } from '@emotion/core';

const animationDuration: string = `${settings.animationDuration}ms`;
const labelPrefix: string = 'actor-';
const styles: IStyles = {};

// Base classes for directions and sprites
const direction: CSSObject = {
	label: labelPrefix + 'direction',
	height: tileSize.y + 'px',
	position: 'absolute',
	width: tileSize.y + 'px',
};

const sprite: CSSObject = {
	label: labelPrefix + 'sprite',
	backgroundImage: 'url(/static/images/chompersprites.png)',
	height: tileSize.y + 'px',
	width: tileSize.y + 'px',
};

// Translate-animations for the direction class
// Note: In order to "restart" a translate-animation it is replaced by
// an exact copy having a different label and thus a different name
const animationDirectionDown0: CSSObject = {
	label: '0',
	from: { transform: 'translateY(0)' },
	to: { transform: `translateY(${tileSize.y}px)` },
};

const animationDirectionDown1: CSSObject = {
	...animationDirectionDown0,
	label: '1',
};

const animationDirectionLeft0: CSSObject = {
	label: '0',
	from: { transform: 'translateX(0)' },
	to: { transform: `translateX(-${tileSize.x}px)` },
};

const animationDirectionLeft1: CSSObject = {
	...animationDirectionLeft0,
	label: '1',
};

const animationDirectionRight0: CSSObject = {
	label: '0',
	from: { transform: 'translateX(0)' },
	to: { transform: `translateX(${tileSize.x}px)` },
};

const animationDirectionRight1: CSSObject = {
	...animationDirectionRight0,
	label: '1',
}

const animationDirectionUp0: CSSObject = {
	label: '0',
	from: { transform: 'translateY(0)' },
	to: { transform: `translateY(-${tileSize.y}px)` },
};

const animationDirectionUp1: CSSObject = {
	...animationDirectionUp0,
	label: '1',
};

for (let j = 0, lengthJ = directionList.length; j < lengthJ; j++) {
	// Sprite classes with backgroundPosition animations
	for (let i = 0, lengthI = actorList.length; i < lengthI; i++) {
		const targetPositionX: number = 
			parseInt(actorPositionXList[i].substr(0, actorPositionXList[i].length - 2), 10) - 64;

		const animationSprite: CSSObject = {
			from: { backgroundPositionX: actorPositionXList[i] },
			to: { backgroundPositionX: `${targetPositionX}px` },
		};

		const classNameMove: string = `${actorList[i]}${directionList[j]}`;

		styles[classNameMove] = {
			...sprite,
			label: labelPrefix + classNameMove,
			backgroundPositionX: actorPositionXList[i],
			backgroundPositionY: actorPositionYList[j],
			animation: `${keyframes(animationSprite)} ${animationDuration} steps(2) infinite`
		}

	}

	// Direction classes with translate-animations
	let animationList: CSSObject[] = [];

	switch (directionList[j]) {
		case 'Down':
			animationList = [animationDirectionDown0, animationDirectionDown1];
			break;
		case 'Left':
			animationList = [animationDirectionLeft0, animationDirectionLeft1];
			break;
		case 'Right':
			animationList = [animationDirectionRight0, animationDirectionRight1];
			break;
		case 'Up':
			animationList = [animationDirectionUp0, animationDirectionUp1];
			break;
		default:
			break;
	}

	const classNameIdle: string = 'directionNone';
	const classNameMove0: string = `direction${directionList[j]}0`;
	const classNameMove1: string = `direction${directionList[j]}1`;

	styles[classNameIdle] = {
		...direction,
		label: labelPrefix + classNameIdle,
	}

	styles[classNameMove0] = {
		...direction,
		label: labelPrefix + classNameMove0,
		animation: `${keyframes(animationList[0])} ${animationDuration} ease forwards`
	}

	styles[classNameMove1] = {
		...styles[classNameIdle],
		label: labelPrefix + classNameMove1,
		animation: `${keyframes(animationList[1])} ${animationDuration} ease forwards`
	}
}

export default styles;

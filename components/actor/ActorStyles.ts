import { directionList, tileSize } from '../../constants';
import { IStyles } from '../../interfaces';
import { actorList, actorPositionXList, actorPositionYList } from './ActorConstants';
import { CSSObject } from '@emotion/core';

const labelPrefix: string = 'actor-';

const actor: CSSObject = {
	label: labelPrefix + 'actor',
	backgroundImage: 'url(/static/images/chompersprites.png)',
	height: tileSize.y + 'px',
	position: 'absolute',
	width: tileSize.y + 'px',
}

const styles: IStyles = {};

for (let i = 0, lengthI = actorList.length; i < lengthI; i++) {
	for (let j = 0, lengthJ = directionList.length; j < lengthJ; j++) {
		const className: string = actorList[i] + directionList[j];
		styles[className] = {
			...actor,
			label: labelPrefix + className,
			backgroundPositionX: actorPositionXList[i],
			backgroundPositionY: actorPositionYList[j],
		}
	}
}

export default styles;
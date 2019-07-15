import React, { useEffect, useRef, useState } from 'react';
import { directionList } from '../../shared/constants';
import { convertXYToCSSPosition } from '../../shared/conversions';
import { EDirections } from '../../shared/enums';
import { styles } from './ActorStyles';

const actorNameList = [
	'ghost-cyan',
	'ghost-orange',
	'ghost-pink',
	'ghost-purple',
	'ghost-red',
	'player',
];

type Props = Readonly<{
	directionId: number;
	id: number;
	isMoving: boolean;
	x: number;
	y: number;
}>;

const Actor: React.FC<Props> = (props) => {
	const { directionId, id, isMoving, x, y } = props;
	const [animationTriggerId, setAnimationTriggerId] = useState(0);
	const areInitialProps = useRef(true);
	const actorName = actorNameList[id];
	const directionName = directionList[directionId];

	useEffect(() => {
		if (areInitialProps.current) {
			// Don't do anything in the initial call except updating the reference
			areInitialProps.current = false;
		} else {
			// Switch between 0 and 1 in case the same animation has to be played again
			setAnimationTriggerId((animationTriggerId + 1) % 2);
		}
	}, [props]);

	if (
		actorName === undefined ||
		actorName.length < 1 ||
		directionName === undefined ||
		directionName.length < 1
	) {
		return null;
	}

	const inlineStyle = isMoving
		? convertXYToCSSPosition(
			x + (directionId === EDirections.LEFT ? 1 : directionId === EDirections.RIGHT ? -1 : 0),
			y + (directionId === EDirections.DOWN ? -1 : directionId === EDirections.UP ? 1 : 0),
		)
		: convertXYToCSSPosition(x, y);

	const classNameDirection =
		`direction ${isMoving ? `${directionName}-${animationTriggerId}` : 'none'}`;
	const classNameSprite = `actor ${actorName} ${directionName}`;

	return (
		<>
			<div className={classNameDirection} style={inlineStyle}>
				<div className={classNameSprite} />
			</div>
			<style jsx>{styles}</style>
		</>
	);
};

export default Actor;

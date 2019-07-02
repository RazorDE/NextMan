import { EDirections } from '../../shared/enums';
import Arrow from '../arrow/Arrow';

type Props = Readonly<{
	actorTileIdList: readonly number[];
	collectedIdList: readonly number[];
	isDelayed: boolean;
	npcDirectionIdList: readonly number[];
	playerDirectionIdList: readonly number[];
	x: number;
	y: number;
}>;

const NavigationControls: React.FC<Props> = (
	{ actorTileIdList, collectedIdList, isDelayed, npcDirectionIdList, playerDirectionIdList, x, y }
) => {

	const navigationArrowList = playerDirectionIdList.map(directionId => {
		const actorDirectionIdList = [directionId].concat(npcDirectionIdList);
		const arrowX = x + (directionId === EDirections.LEFT ? -1 : directionId === EDirections.RIGHT ? 1 : 0);
		const arrowY = y + (directionId === EDirections.UP ? -1 : directionId === EDirections.DOWN ? 1 : 0);

		return <Arrow
			actorDirectionIdList={actorDirectionIdList}
			actorTileIdList={actorTileIdList}
			collectedIdList={collectedIdList}
			isDelayed={isDelayed}
			key={directionId}
			x={arrowX}
			y={arrowY}
		/>;
	});

	return <>{navigationArrowList}</>;
};

export default NavigationControls;

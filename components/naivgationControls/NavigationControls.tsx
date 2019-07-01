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

export default function NavigationControls(props: Props) {

	const navigationArrowList = props.playerDirectionIdList.map(directionId => {
		const actorDirectionIdList = [directionId].concat(props.npcDirectionIdList);
		const x = props.x + (directionId === EDirections.LEFT ? -1 : directionId === EDirections.RIGHT ? 1 : 0);
		const y = props.y + (directionId === EDirections.UP ? -1 : directionId === EDirections.DOWN ? 1 : 0);

		return <Arrow
			actorDirectionIdList={actorDirectionIdList}
			actorTileIdList={props.actorTileIdList}
			collectedIdList={props.collectedIdList}
			isDelayed={props.isDelayed}
			key={directionId}
			x={x}
			y={y}
		/>;
	});

	return <>{navigationArrowList}</>;
}

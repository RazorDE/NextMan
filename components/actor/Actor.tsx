import React from 'react';
import { css } from 'emotion';
import { actorList, directionList } from '../../shared/constants';
import { convertXYToCSSPosition } from '../../shared/conversions';
import { EDirections } from '../../shared/enums';
import styles from './ActorStyles';

type Props = Readonly<{
	directionId: number;
	id: number;
	isMoving: boolean;
	x: number;
	y: number;
}>;

type State = Readonly<{
	animationTriggerId: number;
}>;

export default class Actor extends React.PureComponent<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = { animationTriggerId: 0 };
	}

	public componentDidUpdate(prevProps: Props): void {
		const { props, state } = this;

		if (props !== prevProps) {
			const animationTriggerId = (state.animationTriggerId + 1) % 2;
			this.setState({ animationTriggerId });
		}
	}

	public render(): JSX.Element | null {
		const { props, state } = this;
		const actorName = actorList[props.id];
		const directionName = directionList[props.directionId];

		if (
			actorName === undefined ||
			actorName.length < 1 ||
			directionName === undefined ||
			directionName.length < 1
		) {
			return null;
		}

		const inlineStyle = props.isMoving
			? convertXYToCSSPosition(
				props.x + (props.directionId === EDirections.LEFT ? 1 : props.directionId === EDirections.RIGHT ? -1 : 0),
				props.y + (props.directionId === EDirections.DOWN ? -1 : props.directionId === EDirections.UP ? 1 : 0),
			)
			: convertXYToCSSPosition(props.x, props.y);

		const directionStyleId =
			`direction${props.isMoving ? `${directionName}${state.animationTriggerId}` : 'None'}`;
		const spriteStyleId = `${actorName}${directionName}`;

		return (
			<div className={css(styles[directionStyleId])} style={inlineStyle}>
				<div className={css(styles[spriteStyleId])} />
			</div>
		);
	}
}
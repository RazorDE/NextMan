import { actorList, directionList } from '../../shared/constants';
import { convertXYToCSSPosition } from '../../shared/conversions';
import { ICSSPosition } from '../../shared/interfaces';
import React from 'react';
import { css } from 'emotion';
import styles from './ActorStyles';
import { EDirections } from '../../shared/enums';

interface IProps {
	id: number;
	directionId: number;
	isMoving: boolean;
	x: number;
	y: number;
}

interface IState {
	animationTriggerId: number;
}

export default class Actor extends React.Component<IProps, IState> {
	public componentDidMount(): void {
		this.setState({ animationTriggerId: 0 });
	}

	public componentDidUpdate(prevProps: IProps): void {
		const { props, state } = this;

		if (props !== prevProps) {
			const animationTriggerId: number = (state.animationTriggerId + 1) % 2;
			this.setState({ animationTriggerId });
		}
	}

	public render(): JSX.Element | null {
		const { props, state } = this;
		const actorName: string = actorList[props.id];
		const directionName: string = directionList[props.directionId];

		if (
			actorName === undefined ||
			actorName.length < 1 ||
			directionName === undefined ||
			directionName.length < 1
		) {
			return null;
		}

		const animationTriggerId: number = state !== null ? state.animationTriggerId : 0;
		const inlineStyle: ICSSPosition = props.isMoving
			? convertXYToCSSPosition(
				props.x + (props.directionId === EDirections.LEFT ? 1 : props.directionId === EDirections.RIGHT ? -1 : 0),
				props.y + (props.directionId === EDirections.DOWN ? -1 : props.directionId === EDirections.UP ? 1 : 0),
			)
			: convertXYToCSSPosition(props.x, props.y);

		const directionStyleId: string = 'direction' + (props.isMoving ? (directionName + animationTriggerId) : 'None');
		const spriteStyleId: string = `${actorName}${directionName}`;

		return (
			<div className={css(styles[directionStyleId])} style={inlineStyle}>
				<div className={css(styles[spriteStyleId])} />
			</div>
		);
	}
}
import { directionList, keyCodes } from '../../shared/constants';
import { convertObjectToQueryString, convertXYToCSSPosition } from '../../shared/conversions';
import { ICSSPosition } from '../../shared/interfaces';
import settings from '../../shared/settings';
import { ParsedUrlQueryInput } from 'querystring';
import React from 'react';
import { css } from 'emotion';
import Link from 'next/link';
import Router from 'next/router';
import styles from './ArrowStyles';

interface IProps {
	actorDirectionIdList: number[];
	actorTileIdList: number[];
	collectedIdList: number[];
	isDelayed: boolean;
	x: number;
	y: number;
}

interface IState {
	animationTriggerId: number;
	isClickable: boolean;
}

export default class Arrow extends React.PureComponent<IProps, IState> {

	constructor(props: IProps) {
		super(props);

		this.state = {
			animationTriggerId: 0,
			isClickable: !props.isDelayed,
		}
	}

	public componentDidMount(): void {
		const { props } = this;
		const { animationDuration } = settings;

		if (props.isDelayed) {
			window.setTimeout(() => this.setState({isClickable: true}), animationDuration);
		}

		this.handleKeydown = this.handleKeydown.bind(this);
		window.addEventListener('keydown', this.handleKeydown);
	}

	public componentDidUpdate(prevProps: IProps): void {
		const { props, state } = this;
		const { animationDuration } = settings;

		if (props !== prevProps) {
			this.setState({
				animationTriggerId: (state.animationTriggerId + 1) % 2,
				isClickable: false,
			});

			window.setTimeout(() => this.setState({isClickable: true}), animationDuration);
		}
	}

	public componentWillUnmount(): void {
		window.removeEventListener('keydown', this.handleKeydown);
	}

	public render(): JSX.Element {
		const { props, state } = this;
		const directionId: number = props.actorDirectionIdList[0];
		const inlineStyle: ICSSPosition = convertXYToCSSPosition(props.x, props.y);
		const query: ParsedUrlQueryInput = this.getQuery(props);
		const styleId: string =
			`arrow${directionList[directionId]}${props.isDelayed ? `Delayed${state.animationTriggerId}` : ''}`;

		return (
			<Link href={{
				pathname: '/gamescreen',
				query,
			}}>
				<a className={css(styles[styleId])} style={inlineStyle} />
			</Link>
		);
	}

	private getQuery(props: IProps): ParsedUrlQueryInput {
		const actorDirectionString: string = props.actorDirectionIdList.join('-');
		const actorTileIdString: string = props.actorTileIdList.join('-');
		const collectableString: string = props.collectedIdList.join('-');
		let query: ParsedUrlQueryInput = {};

		if (actorDirectionString.length > 0) {
			query.ad = actorDirectionString;
		}

		if (actorTileIdString.length > 0) {
			query.at = actorTileIdString;
		}

		if (collectableString.length > 0) {
			query.c = collectableString;
		}

		return query;
	}

	private handleKeydown(event: KeyboardEvent): void {
		const { props, state } = this;

		if (!state.isClickable) {
			return;
		}

		const directionId: number = props.actorDirectionIdList[0];

		if (event.keyCode === keyCodes[directionId]) {
			const url: string = `/gamescreen${convertObjectToQueryString(this.getQuery(props))}`;
			Router.push(url);
		}
	}
}

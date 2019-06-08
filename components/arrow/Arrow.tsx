import { directionList, keyCodes } from '../../shared/constants';
import { convertObjectToQueryString, convertXYToCSSPosition } from '../../shared/conversions';
import { ICSSPosition } from '../../shared/interfaces';
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
	isInteractive: boolean;
}

export default class Arrow extends React.PureComponent<IProps, IState> {

	public componentDidMount(): void {
		const { props } = this;
		this.setState({
			animationTriggerId: 0,
			isInteractive: !props.isDelayed
		});

		if (props.isDelayed) {
			window.setTimeout(() => this.setState({isInteractive: true}), 500);
		}

		this.handleKeydown = this.handleKeydown.bind(this);
		window.addEventListener('keydown', this.handleKeydown);
	}

	public componentDidUpdate(prevProps: IProps): void {
		const { props, state } = this;

		if (props !== prevProps) {
			this.setState({
				animationTriggerId: (state.animationTriggerId + 1) % 2,
				isInteractive: false,
			});

			window.setTimeout(() => this.setState({isInteractive: true}), 500);
		}
	}

	public componentWillUnmount(): void {
		window.removeEventListener('keydown', this.handleKeydown);
	}

	public render(): JSX.Element {
		const { props, state } = this;
		const animationTriggerId = state !== null ? state.animationTriggerId : 0;
		const directionId: number = props.actorDirectionIdList[0];
		const inlineStyle: ICSSPosition = convertXYToCSSPosition(props.x, props.y);
		const query: ParsedUrlQueryInput = this.getQuery(props);
		const styleId: string = `arrow${directionList[directionId]}${props.isDelayed ? `Delayed${animationTriggerId}` : ''}`;

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

		if (!state.isInteractive) {
			return;
		}

		const directionId: number = props.actorDirectionIdList[0];

		if (event.keyCode === keyCodes[directionId]) {
			const url: string = `/gamescreen${convertObjectToQueryString(this.getQuery(props))}`;
			Router.push(url);
		}
	}
}

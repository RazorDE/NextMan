import React from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { ParsedUrlQueryInput } from 'querystring';
import { directionList, keyCodes } from '../../shared/constants';
import { convertObjectToQueryString, convertXYToCSSPosition } from '../../shared/conversions';
import { getLanguage } from '../../shared/dictionary';
import settings from '../../shared/settings';
import { styles } from './ArrowStyles';

type Props = Readonly<{
	actorDirectionIdList: readonly number[];
	actorTileIdList: readonly number[];
	collectedIdList: readonly number[];
	isDelayed: boolean;
	x: number;
	y: number;
}>;

type State = Readonly<{
	animationTriggerId: number;
	isClickable: boolean;
}>;

export default class Arrow extends React.PureComponent<Props, State> {

	constructor(props: Props) {
		super(props);

		this.state = {
			animationTriggerId: 0,
			isClickable: !props.isDelayed,
		}
	}

	public componentDidMount() {
		const { props } = this;
		const { animationDuration } = settings;

		if (props.isDelayed) {
			window.setTimeout(() => this.setState({ isClickable: true }), animationDuration);
		}

		window.addEventListener('keydown', this.handleKeydown);
	}

	public componentDidUpdate(prevProps: Props) {
		const { props, state } = this;
		const { animationDuration } = settings;

		if (props !== prevProps) {
			this.setState({
				animationTriggerId: (state.animationTriggerId + 1) % 2,
				isClickable: false,
			});

			window.setTimeout(() => this.setState({ isClickable: true }), animationDuration);
		}
	}

	public componentWillUnmount() {
		window.removeEventListener('keydown', this.handleKeydown);
	}

	public render() {
		const { props, state } = this;
		const directionId = props.actorDirectionIdList[0];
		const inlineStyle = convertXYToCSSPosition(props.x, props.y);
		const query = this.getQuery(props);
		const className =
			`arrow ${directionList[directionId]}${props.isDelayed ? ` delayed${state.animationTriggerId}` : ''}`;

		return (
			<>
				<Link href={{
					pathname: '/gamescreen',
					query,
				}}>
					<a className={className} style={inlineStyle} />
				</Link>
				<style jsx>{styles}</style>
			</>
		);
	}

	private getQuery(props: Props) {
		const language = getLanguage();
		const actorDirectionString = props.actorDirectionIdList.join('-');
		const actorTileIdString = props.actorTileIdList.join('-');
		const collectableString = props.collectedIdList.join('-');
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

		if (language.length > 0) {
			query.lang = language;
		}

		return query;
	}

	private handleKeydown = (event: KeyboardEvent) => {
		const { props, state } = this;

		if (!state.isClickable) {
			return;
		}

		const directionId = props.actorDirectionIdList[0];

		if (event.keyCode === keyCodes[directionId]) {
			const url = `/gamescreen${convertObjectToQueryString(this.getQuery(props))}`;
			Router.push(url);
		}
	}
}

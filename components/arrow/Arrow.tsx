import { directionList, keyCodes } from '../../constants';
import { ICSSPosition } from '../../interfaces';
import { ParsedUrlQueryInput } from 'querystring';
import React from 'react';
import { css } from 'emotion';
import Link from 'next/link';
import Router from 'next/router';
import Util from '../../Util';
import styles from './ArrowStyles';

interface IProps {
	actorDirectionIdList: number[];
	actorTileIdList: number[];
	collectedIdList: number[];
	x: number;
	y: number;
}

export default class Arrow extends React.Component<IProps> {

	public componentDidMount(): void {
		this.handleKeypress = this.handleKeypress.bind(this);
		window.addEventListener('keydown', this.handleKeypress);
	}

	public componentWillUnmount(): void {
		window.removeEventListener('keydown', this.handleKeypress);
	}

	public render(): JSX.Element {
		const { props } = this;
		const directionId: number = props.actorDirectionIdList[0];
		const query: ParsedUrlQueryInput = this.getQuery(props);
		const styleId: string = `arrow${directionList[directionId]}`;
		const inlineStyle: ICSSPosition = Util.convertXYToCSSPosition(props.x, props.y);

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

	private handleKeypress(event: KeyboardEvent) {
		const { props } = this;
		const directionId: number = props.actorDirectionIdList[0];

		if (event.keyCode === keyCodes[directionId]) {
			const url: string = `/gamescreen${Util.convertObjectToQueryString(this.getQuery(props))}`;
			Router.push(url);
		}
	}
}

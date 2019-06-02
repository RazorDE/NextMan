import { directionList } from '../../constants';
import { ICSSPosition } from '../../interfaces';
import React from 'react';
import { css } from 'emotion';
import Link from 'next/link';
import Util from '../../Util';
import styles from './ArrowStyles';

interface IProps {
	actorDirectionIdList: number[];
	actorTileIdList: number[];
	collectedIdList: number[];
	directionId: number;
	x: number;
	y: number;
}

export default function Arrow(props: IProps): JSX.Element | null {
	const styleId: string = `arrow${directionList[props.directionId]}`;
	const inlineStyle: ICSSPosition = Util.convertXYToCSSPosition(props.x, props.y);

	const ad: string = props.actorDirectionIdList.join('-');
	const ap: string = props.actorTileIdList.join('-');
	const c: string = props.collectedIdList.join('-');

	return (
		<Link href={{
			pathname: '/gamescreen',
			query: {ad, ap,	c},
		}}>
			<a className={css(styles[styleId])} style={inlineStyle} />
		</Link>
	);
}

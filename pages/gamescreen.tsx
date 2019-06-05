import { IGameState } from '../interfaces';
import { NextPageContext } from 'next';
import { ParsedUrlQueryInput } from 'querystring';
import PlayingField from '../components/playingField/PlayingField';

interface IProps {
	gameState: IGameState;
}

export default function Gamescreen(props: IProps): JSX.Element {
	return (
		<div>
			<PlayingField gameState={props.gameState} />
		</div>
	);
}

Gamescreen.getInitialProps = async ({ req, query }: NextPageContext): Promise<IProps> => {
	const { ad, at, c }: ParsedUrlQueryInput = query;
	let actorDirectionIdList: number[] = [];
	let actorTileIdList: number[] = [];
	let collectedIdList: number[] = [];

	if (ad !== undefined && typeof ad === 'string' && ad.length > 0) {
		try {
			actorDirectionIdList = JSON.parse(`[${ad.replace(/-/g, ',')}]`);
		} catch (error) {
			if (req === undefined && window.console !== undefined) {
				window.console.log(`Invalid actorDirectionIdList: ${query.ad}`);
			}
		}
	}

	if (at !== undefined && typeof at === 'string' && at.length > 0) {
		try {
			actorTileIdList = JSON.parse(`[${at.replace(/-/g, ',')}]`);
		} catch (error) {
			if (req === undefined && window.console !== undefined) {
				window.console.log(`Invalid actorTileIdList: ${query.ap}`);
			}
		}
	}

	if (c !== undefined && typeof c === 'string' && c.length > 0) {
		try {
			collectedIdList = JSON.parse(`[${c.replace(/-/g, ',')}]`);
		} catch (error) {
			if (req === undefined && window.console !== undefined) {
				window.console.log(`Invalid collectedIdList: ${query.c}`);
			}
		}
	}

	const gameState: IGameState = {
		actorDirectionIdList,
		actorTileIdList,
		collectedIdList,
	};

	return { gameState };
}
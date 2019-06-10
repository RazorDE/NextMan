import { NextPageContext } from 'next';
import { ParsedUrlQueryInput } from 'querystring';
import GamescreenComponent from '../components/gamescreen/Gamescreen';

interface IProps {
	actorDirectionIdListInput: number[];
	actorTileIdListInput: number[];
	collectedIdListInput: number[];
}

export default function Gamescreen(
	{ actorDirectionIdListInput, actorTileIdListInput, collectedIdListInput }: IProps
): JSX.Element {
	return (
		<GamescreenComponent
			actorDirectionIdListInput={actorDirectionIdListInput}
			actorTileIdListInput={actorTileIdListInput}
			collectedIdListInput={collectedIdListInput}
			hasJavaScript={typeof window !== 'undefined'}
		/>);
}

Gamescreen.getInitialProps = async ({ req, query }: NextPageContext): Promise<IProps> => {
	const { ad, at, c }: ParsedUrlQueryInput = query;
	let actorDirectionIdListInput: number[] = [];
	let actorTileIdListInput: number[] = [];
	let collectedIdListInput: number[] = [];

	if (ad !== undefined && typeof ad === 'string' && ad.length > 0) {
		try {
			actorDirectionIdListInput = JSON.parse(`[${ad.replace(/-/g, ',')}]`);
		} catch (error) {
			if (req === undefined && window.console !== undefined) {
				window.console.log(`Invalid actorDirectionIdListInput: ${query.ad}`);
			}
		}
	}

	if (at !== undefined && typeof at === 'string' && at.length > 0) {
		try {
			actorTileIdListInput = JSON.parse(`[${at.replace(/-/g, ',')}]`);
		} catch (error) {
			if (req === undefined && window.console !== undefined) {
				window.console.log(`Invalid actorTileIdListInput: ${query.ap}`);
			}
		}
	}

	if (c !== undefined && typeof c === 'string' && c.length > 0) {
		try {
			collectedIdListInput = JSON.parse(`[${c.replace(/-/g, ',')}]`);
		} catch (error) {
			if (req === undefined && window.console !== undefined) {
				window.console.log(`Invalid collectedIdListInput: ${query.c}`);
			}
		}
	}

	return {
		actorDirectionIdListInput,
		actorTileIdListInput,
		collectedIdListInput,
	};
}
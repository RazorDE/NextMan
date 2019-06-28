import { NextPageContext } from 'next';
import Gamescreen from '../components/gamescreen/Gamescreen';

type Props = Readonly<{
	actorDirectionIdListInput: readonly number[];
	actorTileIdListInput: readonly number[];
	collectedIdListInput: readonly number[];
	language?: string;
}>;

export default function GamescreenPage(props: Props): JSX.Element {
	return (
		<Gamescreen
			actorDirectionIdListInput={props.actorDirectionIdListInput}
			actorTileIdListInput={props.actorTileIdListInput}
			collectedIdListInput={props.collectedIdListInput}
			hasJavaScript={typeof window !== 'undefined'}
			language={props.language}
		/>);
}

GamescreenPage.getInitialProps = async function ({ req, query }: NextPageContext): Promise<Props> {
	const { ad, at, c, lang } = query;
	let actorDirectionIdListInput: number[] = [];
	let actorTileIdListInput: number[] = [];
	let collectedIdListInput: number[] = [];
	let language: string | undefined;

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

	if (lang !== undefined && typeof lang === 'string' && lang.length > 0) {
		language = lang;
	}

	return {
		actorDirectionIdListInput,
		actorTileIdListInput,
		collectedIdListInput,
		language,
	};
}
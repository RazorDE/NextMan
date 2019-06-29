import { NextPageContext } from 'next';
import Gamescreen from '../components/gamescreen/Gamescreen';
import { convertStringifiedNumbersToArray } from '../shared/conversions';

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

GamescreenPage.getInitialProps = async function ({ query }: NextPageContext): Promise<Props> {
	const { ad, at, c, lang } = query;
	const actorDirectionIdListInput = ad !== undefined && typeof ad === 'string'
		? convertStringifiedNumbersToArray(ad)
		: [];
	const actorTileIdListInput = at !== undefined && typeof at === 'string'
		? convertStringifiedNumbersToArray(at)
		: [];
	const collectedIdListInput = c !== undefined && typeof c === 'string'
		? convertStringifiedNumbersToArray(c)
		: [];
	const language = lang !== undefined && typeof lang === 'string' && lang.length > 0
		? lang
		: undefined;

	return {
		actorDirectionIdListInput,
		actorTileIdListInput,
		collectedIdListInput,
		language,
	};
}
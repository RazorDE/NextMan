import { NextComponentType, NextPageContext } from 'next';
import { convertStringifiedNumbersToArray } from '../shared/conversions';
import { getEntry, setDictionary, loadDictionary } from '../shared/dictionary';
import { IDictionary } from '../shared/interfaces';
import { getHost } from '../shared/util';
import Gamescreen from '../components/gamescreen/Gamescreen';
import Head from '../components/head/Head';

type Props = Readonly<{
	actorDirectionIdListInput: readonly number[];
	actorTileIdListInput: readonly number[];
	collectedIdListInput: readonly number[];
	dictionary?: Readonly<IDictionary>;
}>;

const GamescreenPage: NextComponentType<NextPageContext, Props, Props> = (
	{actorDirectionIdListInput, actorTileIdListInput, collectedIdListInput, dictionary}
) => {
	setDictionary(dictionary);
	return (
		<>
			<Head robots="noindex, nofollow" subtitle={getEntry('Gamescreen.websiteSubtitle')} />
			<Gamescreen
				actorDirectionIdListInput={actorDirectionIdListInput}
				actorTileIdListInput={actorTileIdListInput}
				collectedIdListInput={collectedIdListInput}
				hasJavaScript={typeof window !== 'undefined'}
			/>
		</>
	);
};

GamescreenPage.getInitialProps = async ({ req, query }) => {
	const { ad, at, c, lang } = query;
	const host = getHost(req);
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
	const dictionary = await loadDictionary(host, language);

	return {
		actorDirectionIdListInput,
		actorTileIdListInput,
		collectedIdListInput,
		dictionary,
	};
};

export default GamescreenPage;

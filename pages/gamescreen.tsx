import React from 'react';
import { NextPageContext } from 'next';
import { convertStringifiedNumbersToArray } from '../shared/conversions';
import { setDictionary, loadDictionary } from '../shared/dictionary';
import { IDictionary } from '../shared/interfaces';
import { getHost } from '../shared/util';
import Gamescreen from '../components/gamescreen/Gamescreen';

type Props = Readonly<{
	actorDirectionIdListInput: readonly number[];
	actorTileIdListInput: readonly number[];
	collectedIdListInput: readonly number[];
	dictionary?: IDictionary;
}>;

export default function GamescreenPage(props: Props): JSX.Element {
	setDictionary(props.dictionary);
	return (
		<Gamescreen
			actorDirectionIdListInput={props.actorDirectionIdListInput}
			actorTileIdListInput={props.actorTileIdListInput}
			collectedIdListInput={props.collectedIdListInput}
			hasJavaScript={typeof window !== 'undefined'}
		/>);
}

GamescreenPage.getInitialProps = async function ({ req, query }: NextPageContext): Promise<Props> {
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
}
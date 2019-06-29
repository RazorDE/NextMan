import React from 'react';
import { loadDictionary, setDictionary } from '../shared/dictionary';
import { IDictionary } from '../shared/interfaces';
import { getHost } from '../shared/util';
import { NextPageContext } from 'next';
import Home from '../components/home/Home';

type Props = Readonly<{
	dictionary?: IDictionary;
}>;

export default function IndexPage(props: Props): JSX.Element {
	setDictionary(props.dictionary);
	return <Home />;
}

IndexPage.getInitialProps = async function ({ req, query }: NextPageContext): Promise<Props> {
	const host = getHost(req);
	const { lang } = query;
	const language = lang !== undefined && typeof lang === 'string' && lang.length > 0
		? lang
		: undefined;
	const dictionary = await loadDictionary(host, language);

	return {
		dictionary,
	};
}
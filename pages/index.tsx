import { getEntry, loadDictionary, setDictionary } from '../shared/dictionary';
import { IDictionary } from '../shared/interfaces';
import { getHost } from '../shared/util';
import { NextComponentType, NextPageContext } from 'next';
import Head from '../components/head/Head';
import Home from '../components/home/Home';

type Props = Readonly<{
	dictionary?: Readonly<IDictionary>;
}>;

const IndexPage: NextComponentType<NextPageContext, Props, Props> = ({dictionary}) => {
	setDictionary(dictionary);
	return (<>
		<Head robots="index, nofollow" subtitle={getEntry("Home.websiteSubtitle")} />
		<Home />
	</>);
};

IndexPage.getInitialProps = async function ({ req, query }: NextPageContext) {
	const host = getHost(req);
	const { lang } = query;
	const language = lang !== undefined && typeof lang === 'string' && lang.length > 0
		? lang
		: undefined;
	const dictionary = await loadDictionary(host, language);

	return {
		dictionary,
	};
};

export default IndexPage;

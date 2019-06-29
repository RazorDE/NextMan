import { NextPageContext } from 'next';
import Home from '../components/home/Home';

type Props = Readonly<{
	language?: string;
}>;

export default function IndexPage(props: Props): JSX.Element {
	return <Home language={props.language} />;
}

IndexPage.getInitialProps = async function ({ query }: NextPageContext): Promise<Props> {
	const { lang } = query;
	const language = lang !== undefined && typeof lang === 'string' && lang.length > 0
		? lang
		: undefined;

	return {
		language,
	};
}
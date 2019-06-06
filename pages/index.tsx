import { NextPageContext } from 'next';
import Home from '../components/home/Home';

interface IProps {
	host?: string;
	isServer: boolean;
	userAgent: string;
}

export default function Index({ host, isServer, userAgent }: IProps): JSX.Element {
	return <Home host={host} isServer={isServer} userAgent={userAgent} />;
}

Index.getInitialProps = async ({ req }: NextPageContext): Promise<IProps> => {
	const host = req ? req.headers.host : document.location.host;
	const isServer = req !== undefined;
	const userAgent = req
		? req.headers["user-agent"] !== undefined ? req.headers["user-agent"] : 'Unknown'
		: navigator.userAgent;

	return { host, isServer, userAgent };
}
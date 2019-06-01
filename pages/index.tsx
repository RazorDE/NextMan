import { NextPageContext } from 'next';

interface IProps {
	host?: string;
	isServer: boolean;
	userAgent: string;
}

export default function Home(props: IProps): JSX.Element {
	return (
		<div>
			{props.isServer}
		</div>
	);
}

Home.getInitialProps = async ({ req }: NextPageContext): Promise<IProps> => {
	const host = req ? req.headers.host	: document.location.host;
	const isServer = req !== undefined;
	const userAgent = req
		? req.headers["user-agent"] !== undefined ? req.headers["user-agent"] : 'Unknown'
		: navigator.userAgent;

	return { host, isServer, userAgent };
}
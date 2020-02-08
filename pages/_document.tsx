import Document, { Head, Main, NextScript } from 'next/document';
import settings from '../shared/settings';

export default class MyDocument extends Document {
	public render() {
		return (
			<html>
				<Head>
					<meta charSet="utf-8" />
					<meta name="viewport" content="initial-scale=1.0, width=device-width" />
					<title>{settings.websiteTitle}</title>
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
				<style jsx global>{`
					body {
						background-color: black;
					}					
				`}</style>
			</html>
		);
	}
}

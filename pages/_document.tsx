import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
	public render(): JSX.Element {
		return (
			<html>
				<Head>
					<link rel="stylesheet" href="/static/css/global.css" />
					<meta charSet="utf-8" />
					<meta name="viewport" content="initial-scale=1.0, width=device-width" />
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</html>
		);
	}
}

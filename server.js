// import express from 'express';
// import next from 'next';
const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare()
	.then(() => {
		const server = express();

		server.get('/post/:userInput', (request, response) => {
			app.render(request, response, '/post', {userInput: request.params.userInput})
		});

		server.get('*', (request, response) => {
			return handle(request, response);
		});

		server.listen(3000, (error) => {
			if (error) {
				throw error;
			}
		});
	})
	.catch((exception) => {
		if (window !== undefined && window.console !== undefined) {
			window.console(exception.stack);
		}

		process.exit(1);
	});
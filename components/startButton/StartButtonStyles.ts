import { CSSObject } from '@emotion/core';

const labelPrefix: string = 'startButton-';

const startButton: CSSObject = {
	label: labelPrefix + 'startButton',
	backgroundColor: 'green',
	borderRadius: '30px',
	color: '#fff',
	fontFamily: '"Courier New", Courier, monospace',
	fontSize: '40px',
	fontWeight: 'bold',
	padding: '5px 20px',
	textAlign: 'center',
	textDecoration: 'none',
	':hover': {
		color: 'yellow',
	},
};

export default {
	startButton,
};

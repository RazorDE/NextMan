import { CSSObject } from '@emotion/css';

const labelPrefix: string = 'message-';

const container: CSSObject = {
	label: labelPrefix + 'container',
	color: '#fff',
	fontFamily: '"Courier New", Courier, monospace',
	fontSize: '20px',
	fontWeight: 'bold',
	position: 'absolute',
	top: '200px',
	width: '100%',
};

const text: CSSObject = {
	label: labelPrefix + 'text',
	margin: '0 auto',
	textAlign: 'center',
	width: '500px',
};

export default {
	container,
	text,
};

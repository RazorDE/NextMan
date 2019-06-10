import levelData from '../../shared/levelData';
import { tileSize } from '../../shared/constants';
import { CSSObject } from '@emotion/core';

const { size } = levelData;

const labelPrefix: string = 'home-';

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

const startButtonContainer: CSSObject = {
	label: labelPrefix + 'startButtonContainer',
	marginTop: '120px',
	textAlign: 'center',
}

const subtitle: CSSObject = {
	label: labelPrefix + 'subtitle',
	color: '#fff',
	fontFamily: '"Courier New", Courier, monospace',
	fontSize: '28px',
	fontWeight: 'bold',
	textAlign: 'center',
};

const title: CSSObject = {
	label: labelPrefix + 'title',
	color: '#fff',
	fontFamily: '"Courier New", Courier, monospace',
	fontSize: '80px',
	fontWeight: 'bold',
	marginTop: '60px',
	textAlign: 'center',
};

const viewport: CSSObject = {
	label: labelPrefix + 'viewport',
	border: '1px solid blue',
	height: `${size.y * tileSize.y}px`,
	margin: '20px auto 0',
	position: 'relative',
	width: `${size.x * tileSize.x}px`,
};

export default {
	startButton,
	startButtonContainer,
	subtitle,
	title,
	viewport,
};

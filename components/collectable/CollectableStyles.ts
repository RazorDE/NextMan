import css from 'styled-jsx/css';
import { tileSize } from '../../shared/constants';

export const styles = css`
	div {
		background-image: url(https://construct-static.com/images/v780/uploads/articleuploadobject/0/images/13274/chompermazetiles.png);
		background-position-x: -288px;
		background-position-y: -64px;
		height: ${tileSize.y}px;
		position: absolute;
		width: ${tileSize.x}px;
	}
`;

import { convertXYToCSSPosition } from '../../shared/conversions';
import { styles } from './WallStyles';

type Props = Readonly<{
	id: number;
	x: number;
	y: number;
}>;

const Wall: React.FC<Props> = ({id, x, y}) => {
	const className = wallNameList[id];

	if (className === undefined) {
		return null;
	}

	const inlineStyle = convertXYToCSSPosition(x, y);

	return (
		<>
			<div className={className} style={inlineStyle} />
			<style jsx>{styles}</style>
		</>
	);
};

export default Wall;

const wallNameList = [
	'corner-bottom-left',
	'corner-bottom-right',
	'corner-top-left',
	'corner-top-right',
	'horizontal-center',
	'horizontal-left',
	'horizontal-right',
	'plus',
	'single',
	't-bottom',
	't-left',
	't-right',
	't-top',
	'vertical-bottom',
	'vertical-center',
	'vertical-top',
];

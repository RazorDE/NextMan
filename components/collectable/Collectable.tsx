import { convertXYToCSSPosition } from '../../shared/conversions';
import { styles } from './CollectableStyles';

type Props = Readonly<{
	x: number;
	y: number;
}>;

const Collectable: React.FC<Props> = ({x, y}) => {
	const inlineStyle = convertXYToCSSPosition(x, y);

	return (
		<>
			<div style={inlineStyle} />
			<style jsx>{styles}</style>
		</>
	);
};

export default Collectable;

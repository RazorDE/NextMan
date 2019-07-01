import { convertXYToCSSPosition } from '../../shared/conversions';
import { styles } from './CollectableStyles';

type Props = Readonly<{
	x: number;
	y: number;
}>;

export default function Collectable(props: Props) {
	const inlineStyle = convertXYToCSSPosition(props.x, props.y);

	return (
		<>
			<div style={inlineStyle} />
			<style jsx>{styles}</style>
		</>
	);
}

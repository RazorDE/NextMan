import Link from 'next/link';
import { getEntry, getLanguage } from '../../shared/dictionary';
import { styles } from './StartButtonStyles';

type Props = Readonly<{
	isRestart: boolean;
}>;

const StartButton: React.FC<Props> = ({ isRestart }) => {
	const language = getLanguage();
	const text = isRestart
		? getEntry('StartButton.restart')
		: getEntry('StartButton.start');

	return (
		<>
			<Link href={`/gamescreen?lang=${language}`}>
				<a>{text}</a>
			</Link>
			<style jsx>{styles}</style>
		</>
	);
};

export default StartButton;
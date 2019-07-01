import Link from 'next/link';
import { getEntry, getLanguage } from '../../shared/dictionary';
import { styles } from './StartButtonStyles';

type Props = Readonly<{
	isRestart: boolean;
}>;

export default function StartButton({ isRestart }: Props) {
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
}

import { getEntry } from '../../shared/dictionary';
import { styles } from './MessageStyles';

type Props = Readonly<{
	areCollectablesLeft: boolean;
	hasJavaScript: boolean;
	isInitialStep: boolean;
	isPlayerAlive: boolean;
}>;

const Message: React.FC<Props> = (
	{ areCollectablesLeft, hasJavaScript, isInitialStep, isPlayerAlive }
) => {

	if (areCollectablesLeft && !isInitialStep && isPlayerAlive) {
		return null;
	}

	let text = '';

	if (!isPlayerAlive) {
		text = getEntry('Gamescreen.gameOver');
	} else if (!areCollectablesLeft) {
		text = getEntry('Gamescreen.gameWon');
	} else if (isInitialStep) {
		text = hasJavaScript
			? getEntry('Gamescreen.starttextJavaScript')
			: getEntry('Gamescreen.starttextNoJavaScript');
	}

	if (text.length < 1) {
		return null;
	}

	return (
		<>
			<div className="container">
				<div className="text">{text}</div>
			</div>
			<style jsx>{styles}</style>
		</>
	);
};

export default Message;

import { getEntry } from '../../shared/dictionary';
import LanguageSelector from '../languageSelector/LanguageSelector';
import StartButton from '../startButton/StartButton';
import { styles } from './HomeStyles';

const Home: React.FC = () => {
	return (
		<>
			<div className="viewport">
				<LanguageSelector />
				<div className="title">{getEntry('Home.title')}</div>
				<div className="subtitle">{getEntry('Home.subtitle')}</div>
				<div className="start-button">
					<StartButton isRestart={false} />
				</div>
			</div>
			<style jsx>{styles}</style>
		</>
	);
}

export default Home;

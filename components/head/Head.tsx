import NextHead from 'next/head';
import settings from '../../shared/settings';

type Props = Readonly<{
	description?: string;
	keywords?: string;
	robots?: string;
	subtitle?: string;
	viewport?: string;
}>;

const Head: React.FC<Props> = ({description, keywords, robots, subtitle, viewport}) => {
	const title: string = settings.websiteTitle +
		(subtitle !== undefined && subtitle.length > 0 ? ` - ${subtitle}` : '');

	return (
		<NextHead>
			<MetaTag content={description} name="description" />
			<MetaTag content={keywords} name="keywords" />
			<MetaTag content={robots} name="robots" />
			<MetaTag content={viewport} name="viewport" />
			<title>{title}</title>
		</NextHead>
	);
};

export default Head;

type MetaTagProps = Readonly<{
	content?: string;
	name: string;
}>;

const MetaTag: React.FC<MetaTagProps> = ({ content, name }) => {
	if (content === undefined || content.length < 1) {
		return null;
	}

	return <meta content={content} key={name} name={name} />;
};

import NextHead from 'next/head';
import settings from '../../shared/settings';

type Props = Readonly<{
	description?: string;
	keywords?: string;
	robots?: string;
	subtitle?: string;
	viewport?: string;
}>;

export default function Head(props: Props) {
	const title: string = settings.websiteTitle +
		(props.subtitle !== undefined && props.subtitle.length > 0 ? ` - ${props.subtitle}` : '');

	return (
		<NextHead>
			<MetaTag content={props.description} name="description" />
			<MetaTag content={props.keywords} name="keywords" />
			<MetaTag content={props.robots} name="robots" />
			<MetaTag content={props.viewport} name="viewport" />
			<title>{title}</title>
		</NextHead>
	);
}

type MetaTagProps = Readonly<{
	content?: string;
	name: string;
}>;

function MetaTag({ content, name }: MetaTagProps) {
	if (content === undefined || content.length < 1) {
		return null;
	}

	return <meta content={content} key={name} name={name} />;
}
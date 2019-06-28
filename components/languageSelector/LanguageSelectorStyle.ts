import { CSSObject } from "@emotion/css";

const labelPrefix: string = 'languageSelector-';

const container: CSSObject = {
	label: labelPrefix + 'container',
	margin: '5px',
	textAlign: 'right',
	userSelect: 'none',
};

const label: CSSObject = {
	label: labelPrefix + 'label',
	color: '#fff',
};

const languageOption: CSSObject = {
	label: labelPrefix + 'languageOption',
	color: 'blue',
	textDecoration: 'none',
};

const languageSelected: CSSObject = {
	label: labelPrefix + 'languageSelected',
	color: 'green',
};

export default {
	container,
	label,
	languageOption,
	languageSelected,
};

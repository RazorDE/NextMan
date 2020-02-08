import { IncomingMessage } from 'http';

type Mutable<Type> = { -readonly [Prop in keyof Type]: Type[Prop] };

export function getHost(request: IncomingMessage | undefined) {
	return request === undefined
		? document.location.host
		: request.headers.host !== undefined
			? request.headers.host
			: 'localhost:3000';
}

export function isIncluded<Type>(needle: Type, haystack: Type[]) {
	for (let i = 0, lengthI = haystack.length; i < lengthI; i++) {
		if (haystack[i] === needle) {
			return true;
		}
	}

	return false;
}

export function mutableClone<Type>(original: Type) {
	const clone: Mutable<Type> = JSON.parse(JSON.stringify(original));
	return clone;
}
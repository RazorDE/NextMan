import { IncomingMessage } from "http";

export function getHost(request: IncomingMessage | undefined): string {
	return request === undefined
		? document.location.host
		: request.headers.host !== undefined
			? request.headers.host
			: 'localhost:3000';
}

export function isIncluded<Type>(needle: Type, haystack: Type[]): boolean {
	for (let i = 0, lengthI = haystack.length; i < lengthI; i++) {
		if (haystack[i] === needle) {
			return true;
		}
	}

	return false;
}

type Mutable<Type> = { -readonly [Prop in keyof Type]: Type[Prop] };

export function mutableClone<Type>(original: Type): Mutable<Type> {
	return JSON.parse(JSON.stringify(original));
}
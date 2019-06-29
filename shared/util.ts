type Mutable<Type> = { -readonly [Prop in keyof Type]: Type[Prop] }; 

export function mutableClone<Type>(original: Type): Mutable<Type> {
	return JSON.parse(JSON.stringify(original));
}
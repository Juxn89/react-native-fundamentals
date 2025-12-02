export const sum = (a: number, b: number): number => a + b;

export const double = (a: number): number => a * 2;

export const destructuring = (): string => {
	const user = { name: 'Sophie', age: 6 }
	const { name, age } = user

	return `${ name } is ${ age } years old.`
}
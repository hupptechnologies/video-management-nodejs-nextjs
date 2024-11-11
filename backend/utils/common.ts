export const isEmpty = (property: any) => {
	if (typeof property === 'string') {
		return (
			property === null ||
        property.replace(/ /gu, '') === '' ||
        typeof property === 'undefined'
		);
	}
	return property === null || typeof property === 'undefined';
};


export const generateRandomString = (length: number): string => {
	let result = '';
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	const charactersLength = characters.length;
	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
};

export const generateRandomNumberString = (length: number): string => {
	let result = '';
	const characters = '0123456789';
	for (let i = length; i > 0; --i) {
		result += characters[Math.floor(Math.random() * characters.length)];
	}
	return result;
};

export const validateChannelName = (value: string) => {
	if (value.length < 3) {
		return 'Channel name must be at least 3 characters long.';
	}

	if (!/^[a-zA-Z]/.test(value)) {
		return 'Channel name must start with an alphabet.';
	}

	if (/[^a-zA-Z0-9 ]/.test(value)) {
		return 'Channel name must not contain special characters.';
	}

	return '';
};

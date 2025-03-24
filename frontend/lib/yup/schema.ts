import * as Yup from 'yup';

const emailValidation = Yup.string()
	.required('Email is required')
	.matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email address');

const passwordValidation = Yup.string()
	.required('Password is required')
	.matches(/^[A-Za-z]/, 'Password must start with a letter')
	.matches(
		/[!@#$%^&*(),.?":{}|<>]/,
		'Password must include at least one special character',
	)
	.matches(/\d/, 'Password must include at least one number')
	.min(8, 'Password must be at least 8 characters long');

export const signUpSchema = Yup.object({
	firstName: Yup.string()
		.required('First name is required')
		.min(3, 'Name must be at least 3 characters'),
	email: emailValidation,
	password: passwordValidation,
});

export const loginSchema = Yup.object({
	email: emailValidation,
});

export const uploadVideoSchema = Yup.object().shape({
	name: Yup.string()
		.required('Video name is required')
		.min(3, 'Video name must be at least 3 characters'),
	file: Yup.mixed()
		.required('A video file is required')
		.test('fileType', 'Unsupported file format', (value: any) => {
			if (!value) {
				return false;
			}
			const allowedTypes = ['video/mp4', 'video/mov', 'video/avi', 'video/mkv'];
			return allowedTypes.includes(value.type);
		}),
});

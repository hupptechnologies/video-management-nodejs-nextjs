import { ThemeOptions, createTheme } from '@mui/material';

declare module '@mui/material/styles' {
	interface BreakpointOverrides {
		'2xl': true;
	}
}

const baseTheme: ThemeOptions = {
	breakpoints: {
		values: {
			xs: 0,
			sm: 600,
			md: 900,
			lg: 1200,
			xl: 1536,
			'2xl': 2256,
		},
	},
	palette: {
		primary: {
			main: '#1E88E5',
			light: '#6AB7FF',
			dark: '#1565C0',
			contrastText: '#FFFFFF',
		},
		secondary: {
			main: '#FF4081',
			light: '#FF79B0',
			dark: '#C60055',
			contrastText: '#FFFFFF',
		},
		background: {
			default: '#F9FAFB',
			paper: '#FFFFFF',
		},
		text: {
			primary: '#212121',
			secondary: '#757575',
			disabled: '#BDBDBD',
		},
		error: {
			main: '#E53935',
			contrastText: '#FFFFFF',
		},
		success: {
			main: '#43A047',
			contrastText: '#FFFFFF',
		},
		warning: {
			main: '#FB8C00',
			contrastText: '#FFFFFF',
		},
		info: {
			main: '#039BE5',
			contrastText: '#FFFFFF',
		},
		divider: '#E0E0E0',
	},
	typography: {
		fontFamily: `'Inter', 'Helvetica', 'Arial', sans-serif`,
		fontSize: 16,
		h1: {
			fontSize: '2.75rem',
			fontWeight: 700,
			color: '#212121'
		},
		h2: {
			fontSize: '2.25rem',
			fontWeight: 700,
			color: '#212121'
		},
		h3: {
			fontSize: '2rem',
			fontWeight: 600,
			color: '#212121'
		},
		h4: {
			fontSize: '1.75rem',
			fontWeight: 600,
			color: '#424242'
		},
		h5: {
			fontSize: '1.5rem',
			fontWeight: 500,
			color: '#424242'
		},
		h6: {
			fontSize: '1.25rem',
			fontWeight: 500,
			color: '#757575'
		},
		subtitle1: {
			fontSize: '1rem',
			color: '#757575'
		},
		subtitle2: {
			fontSize: '0.875rem',
			color: '#757575'
		},
		body1: {
			fontSize: '1rem',
			color: '#212121'
		},
		body2: {
			fontSize: '0.875rem',
			color: '#424242'
		},
		button: {
			fontSize: '0.875rem',
			fontWeight: 700,
			textTransform: 'uppercase'
		},
		caption: {
			fontSize: '0.75rem',
			color: '#9E9E9E'
		},
		overline: {
			fontSize: '0.75rem',
			fontWeight: 700,
			textTransform: 'uppercase',
			color: '#9E9E9E'
		},
	},
	shape: {
		borderRadius: 10,
	},
	spacing: 8,
};

export const theme = createTheme(baseTheme);

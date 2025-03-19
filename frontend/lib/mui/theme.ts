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
			main: '#00A76F',
			light: '#5BE49B',
			dark: '#007867',
			contrastText: '#FFFFFF',
			50: '#00A76F14',
			100: '#00A76F20',
			200: '#00A76F29',
		},
		secondary: {
			main: '#8E33FF',
			light: '#C684FF',
			dark: '#5119B7',
			contrastText: '#FFFFFF',
		},
		background: {
			default: '#FFFFFF',
			paper: '#FFFFFF',
		},
		text: {
			primary: '#1C252E',
			secondary: '#637381',
			disabled: '#919EAB',
		},
		error: {
			main: '#FF5630',
			contrastText: '#FFFFFF',
		},
		success: {
			main: '#22C55E',
			contrastText: '#FFFFFF',
		},
		warning: {
			main: '#FFAB00',
			contrastText: '#FFFFFF',
		},
		info: {
			main: '#00B8D9',
			contrastText: '#FFFFFF',
		},
		divider: '#E0E0E0',
	},
	typography: {
		fontFamily: "'Inter', 'Helvetica', 'Arial', sans-serif",
		fontSize: 16,
		h1: {
			fontSize: '2.75rem',
			fontWeight: 700,
			color: '#212121',
		},
		h2: {
			fontSize: '2.25rem',
			fontWeight: 700,
			color: '#212121',
		},
		h3: {
			fontSize: '2rem',
			fontWeight: 600,
			color: '#212121',
		},
		h4: {
			fontSize: '1.75rem',
			fontWeight: 600,
			color: '#0f0f0f',
		},
		h5: {
			fontSize: '1.5rem',
			fontWeight: 500,
			color: '#0f0f0f',
		},
		h6: {
			fontSize: '1.25rem',
			fontWeight: 500,
			color: '#212121',
		},
		subtitle1: {
			fontSize: '1rem',
			color: '#252424',
		},
		subtitle2: {
			fontSize: '0.875rem',
			color: '#252424',
		},
		body1: {
			fontSize: '1rem',
			color: '#212121',
		},
		body2: {
			fontSize: '0.875rem',
			color: '#424242',
		},
		button: {
			fontSize: '0.875rem',
			fontWeight: 700,
			textTransform: 'uppercase',
			color: '#00A76F',
		},
		caption: {
			fontSize: '0.75rem',
			color: '#9E9E9E',
		},
		overline: {
			fontSize: '0.75rem',
			fontWeight: 700,
			textTransform: 'uppercase',
			color: '#9E9E9E',
		},
	},
	shape: {
		borderRadius: 10,
	},
	spacing: 8,
};

export const theme = createTheme(baseTheme);

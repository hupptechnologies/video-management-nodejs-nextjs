'use client';

import { ThemeProvider as MUIThemeProvider } from '@mui/material/styles';
import { PropsWithChildren } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from '@/lib/mui/theme';

const ThemeProvider = ({ children }: PropsWithChildren) => {

	return (
		<MUIThemeProvider theme={theme}>
			<CssBaseline enableColorScheme />
			{children}
		</MUIThemeProvider>
	);
};

export default ThemeProvider;

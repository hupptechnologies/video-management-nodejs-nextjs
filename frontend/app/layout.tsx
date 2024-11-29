"use client";

import { Box } from '@mui/material';
import StoreProvider from './StoreProvider';
import ThemeProvider from './ThemeProvider';
import ToastWrapper from './ToastWrapper';
import Navbar from '@/components/Navbar';
import NavigationManager from '@/components/Navigation/NavigationManager';
import './globals.css';

export default function RootLayout ({ children }: { children: React.ReactNode }) {

	return (
		<StoreProvider>
			<html lang="en">
				<body>
					<ThemeProvider>
						<ToastWrapper />
						<Box sx={{
							display: 'flex',
							flex: '1 1 auto',
							minHeight: '100%',
							flexDirection: 'column'
						}}>
							<NavigationManager />
							<Box>
								<Navbar />
								{children}
							</Box>
						</Box>
					</ThemeProvider>
				</body>
			</html>
		</StoreProvider>
	);
}

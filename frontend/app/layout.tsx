'use client';

import { Box } from '@mui/material';
import StoreProvider from './StoreProvider';
import ThemeProvider from './ThemeProvider';
import ToastWrapper from './ToastWrapper';
import Navbar from '@/components/Navbar';
import NavigationManager from '@/components/Navigation/NavigationManager';
import './globals.css';
import '../styles/components/Navigation.css';
import '../styles/common/index.css';

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<StoreProvider>
			<html lang="en">
				<body>
					<ThemeProvider>
						<ToastWrapper />
						<Box className="main-layout-container">
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

import Navbar from '@/components/Navbar';
import StoreProvider from './StoreProvider';
import ToastWrapper from './ToastWrapper';
import './globals.css';
import ThemeProvider from './ThemeProvider';

export default function RootLayout ({ children }: { children: React.ReactNode }) {

	return (
		<StoreProvider>
			<html lang="en">
				<body>
					<ThemeProvider>
						<ToastWrapper />
						<Navbar />
						{children}
					</ThemeProvider>
				</body>
			</html>
		</StoreProvider>
	);
}

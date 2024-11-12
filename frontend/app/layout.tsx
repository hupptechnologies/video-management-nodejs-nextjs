import StoreProvider from './StoreProvider';
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {

	return (
		<StoreProvider>
			<html lang="en">
				<body>
					{children}
				</body>
			</html>
		</StoreProvider>
	);
}

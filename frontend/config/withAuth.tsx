import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { appLocalStorage } from '@/utils/helper';

const withAuth = <P extends object>(Component: React.ComponentType<P>) => {
	return function ProtectedRoute (props: P) {
		const router = useRouter();
		const isAuthenticated = appLocalStorage.getItem('token');

		useEffect(() => {
			if (!isAuthenticated) {
				router.push('/login');
			}
		}, [isAuthenticated, router]);

		return isAuthenticated ? <Component {...props} /> : null;
	};
};

export default withAuth;

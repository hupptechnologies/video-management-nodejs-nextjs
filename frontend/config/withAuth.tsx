import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { appLocalStorage } from '@/utils/helper';

const withAuth = (Component: React.ComponentType) => {
	return function ProtectedRoute (props: any) {
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

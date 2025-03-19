import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { appLocalStorage } from '@/utils/helper';

const withAdminAuth = <P extends object>(Component: React.ComponentType<P>) => {
	return function ProtectedRoute(props: P) {
		const router = useRouter();
		const isAdmin = appLocalStorage.getItem('isAdmin');

		useEffect(() => {
			if (!isAdmin) {
				router.push('/login');
			}
		}, [isAdmin, router]);

		return isAdmin ? <Component {...props} /> : null;
	};
};

export default withAdminAuth;

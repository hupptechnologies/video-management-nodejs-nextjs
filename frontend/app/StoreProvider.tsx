'use client';
import { AppStore, store } from '@/store';
import { useRef, type ReactNode } from 'react';
import { Provider } from 'react-redux';

interface Props {
	readonly children: ReactNode;
}

const StoreProvider = ({ children }: Props) => {
	const storeRef = useRef<AppStore | null>(null);

	if (!storeRef.current) {
		storeRef.current = store;
	}

	return <Provider store={storeRef.current}>{children}</Provider>;
};

export default StoreProvider;

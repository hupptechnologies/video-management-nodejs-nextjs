'use client';
import Toast from '@/components/Toast';
import { hideToast } from '@/store/feature/toast/slice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

const ToastWrapper = () => {
	const dispatch = useAppDispatch();
	const { open, message, severity } = useAppSelector((state) => state.toast);

	const handleClose = () => {
		dispatch(hideToast());
	};

	return (
		<Toast
			open={open}
			message={message}
			severity={severity}
			onClose={handleClose}
		/>
	);
};

export default ToastWrapper;

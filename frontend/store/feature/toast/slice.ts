import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ToastState } from '@/types/toast';

const initialState: ToastState = {
	open: false,
	message: '',
	severity: 'info',
};

export const toastSlice = createSlice({
	name: 'toast',
	initialState,
	reducers: {
		showToast: (state, action: PayloadAction<Omit<ToastState, 'open'>>) => {
			state.open = true;
			state.message = action.payload.message;
			state.severity = action.payload.severity;
		},
		hideToast: (state) => {
			state.open = false;
			state.message = '';
		},
	},
});

export const { showToast, hideToast } = toastSlice.actions;

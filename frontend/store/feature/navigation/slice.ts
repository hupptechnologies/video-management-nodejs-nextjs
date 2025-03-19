import { createSlice } from '@reduxjs/toolkit';
import { NavigationState } from '@/types/navigation';

const initialState: NavigationState = {
	floating: false,
	floatingOnly: false,
	collapsed: false,
};

export const navigationSlice = createSlice({
	name: 'navigation',
	initialState,
	reducers: {
		setFloating: (state, action) => {
			state.floating = action.payload;
		},
		setFloatingOnly: (state, action) => {
			state.floatingOnly = action.payload;
		},
		setCollapsed: (state, action) => {
			state.collapsed = action.payload;
		},
	},
});

export const { setFloating, setFloatingOnly, setCollapsed } =
	navigationSlice.actions;

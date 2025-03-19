import { AuthState } from '@/types/auth';
import { createAppSlice } from '@/store/createAppSlice';
import { adminLogin, getUserDetails, login, register } from './action';
import { appLocalStorage } from '@/utils/helper';

const initialState: AuthState = {
	isLoggedIn: appLocalStorage.getItem('token') ? true : false,
	token: appLocalStorage.getItem('token') || '',
	refreshToken: appLocalStorage.getItem('refreshToken') || '',
	authLoading: false,
	user: {},
	isAdmin: false,
};

export const authSlice = createAppSlice({
	name: 'auth',
	initialState,
	reducers: {
		logout(state) {
			state.isLoggedIn = false;
			localStorage.removeItem('token');
			localStorage.removeItem('refreshToken');
			localStorage.removeItem('isAdmin');
			state.token = '';
			state.refreshToken = '';
			state.user = {};
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(login.pending, (state) => {
				state.authLoading = true;
			})
			.addCase(login.fulfilled, (state, action) => {
				state.isLoggedIn = true;
				localStorage.setItem('token', action.payload.headers.token);
				state.token = action.payload.headers.token;
				localStorage.setItem(
					'refreshToken',
					action.payload.headers?.['refresh-token'],
				);
				state.user = action.payload.data.data;
				state.authLoading = false;
			})
			.addCase(login.rejected, (state) => {
				state.authLoading = false;
			})
			.addCase(adminLogin.pending, (state) => {
				state.authLoading = true;
			})
			.addCase(adminLogin.fulfilled, (state, action) => {
				state.isLoggedIn = true;
				localStorage.setItem('token', action.payload.headers.token);
				state.token = action.payload.headers.token;
				localStorage.setItem(
					'refreshToken',
					action.payload.headers?.['refresh-token'],
				);
				localStorage.setItem('isAdmin', 'true');
				state.user = action.payload.data.data;
				state.isAdmin = true;
				state.authLoading = false;
			})
			.addCase(adminLogin.rejected, (state) => {
				state.authLoading = false;
			})
			.addCase(register.pending, (state) => {
				state.authLoading = true;
			})
			.addCase(register.fulfilled, (state) => {
				state.authLoading = false;
			})
			.addCase(register.rejected, (state) => {
				state.authLoading = false;
			})
			.addCase(getUserDetails.pending, (state) => {
				state.authLoading = true;
			})
			.addCase(getUserDetails.fulfilled, (state, action) => {
				state.user = action.payload.data;
				if (action.payload.data.role === 'admin') {
					state.isAdmin = true;
				}
				state.authLoading = false;
			})
			.addCase(getUserDetails.rejected, (state) => {
				state.authLoading = false;
			});
	},
});

export const { logout } = authSlice.actions;

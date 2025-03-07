import { createAsyncThunk } from '@reduxjs/toolkit';
import { authService } from "@/services/auth";
import { AuthRequest } from "@/types/auth";
import { showToast } from "../toast/slice";

export const login = createAsyncThunk(
	'auth/login',
	async (data: AuthRequest, {
		rejectWithValue, dispatch
	}) => {
		try {
			const response = await authService.login(data);
			dispatch(showToast({
				message: "Logged in successfully",
				severity: 'success',
			}));
			return response;
		} catch (error: any) {
			const err = error?.response?.data;
			dispatch(showToast({
				message: err?.message || "Login failed, Please try again",
				severity: 'error'
			}));
			return rejectWithValue(err);
		}
	}
);

export const adminLogin = createAsyncThunk(
	'auth/adminLogin',
	async (data: AuthRequest, {
		rejectWithValue, dispatch
	}) => {
		try {
			const response = await authService.adminLogin(data);
			dispatch(showToast({
				message: "Logged in successfully",
				severity: 'success',
			}));
			return response;
		} catch (error: any) {
			const err = error?.response?.data;
			dispatch(showToast({
				message: err?.message || "Login failed, Please try again",
				severity: 'error'
			}));
			return rejectWithValue(err);
		}
	}
);

export const register = createAsyncThunk(
	'auth/register',
	async (data: AuthRequest, {
		rejectWithValue, dispatch
	}) => {
		try {
			const response = await authService.register(data);
			dispatch(showToast({
				message: "User Registered successfully",
				severity: 'success',
			}));
			return response.data;
		} catch (error: any) {
			const err = error?.response?.data;
			dispatch(showToast({
				message: err?.message || "Failed to register User",
				severity: 'error'
			}));
			return rejectWithValue(err);
		}
	}
);

export const getUserDetails = createAsyncThunk(
	'auth/getUserDetails',
	async (_, { rejectWithValue }) => {
		try {
			const response = await authService.user();
			return response.data;
		} catch (error: any) {
			const err = error?.response?.data;
			return rejectWithValue(err);
		}
	}
);

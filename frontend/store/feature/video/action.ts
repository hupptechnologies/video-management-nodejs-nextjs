import { createAsyncThunk } from '@reduxjs/toolkit';
import { showToast } from '../toast/slice';
import { videoService } from '@/services/video';
import { channelService } from '@/services/channel';
import { DefaultParams, FindByIdRequest } from '@/types/common';
import { AdminVideosRequest } from '@/types/video';

export const getGlobalVideos = createAsyncThunk(
	'video/getGlobalVideos',
	async (_, { rejectWithValue, dispatch }) => {
		try {
			const response = await videoService.fetchGlobalList();
			return response.data;
		} catch (error: any) {
			const err = error?.response?.data;
			dispatch(
				showToast({
					message: err?.message || 'Failed to get Videos',
					severity: 'error',
				}),
			);
			return rejectWithValue(err);
		}
	},
);

export const getUserVideos = createAsyncThunk(
	'video/getUserVideos',
	async (_, { rejectWithValue, dispatch }) => {
		try {
			const response = await videoService.fetchUserList();
			return response.data;
		} catch (error: any) {
			const err = error?.response?.data;
			dispatch(
				showToast({
					message: err?.message || 'Failed to get Videos',
					severity: 'error',
				}),
			);
			return rejectWithValue(err);
		}
	},
);

export const getVideoById = createAsyncThunk(
	'video/getVideoById',
	async (data: FindByIdRequest, { rejectWithValue }) => {
		try {
			const response = await videoService.findById(data);
			return response.data;
		} catch (error: any) {
			const err = error?.response?.data;
			return rejectWithValue(err);
		}
	},
);

export const getChannelVideos = createAsyncThunk(
	'channel/getChannelVideos',
	async (data: FindByIdRequest, { rejectWithValue }) => {
		try {
			const response = await channelService.channelVideos(data);
			return response.data;
		} catch (error: any) {
			const err = error?.response?.data;
			return rejectWithValue(err);
		}
	},
);

export const getAdminVideos = createAsyncThunk(
	'video/getAdminVideos',
	async (data: AdminVideosRequest & DefaultParams, { rejectWithValue }) => {
		try {
			const response = await videoService.adminVideos(data);
			return response.data;
		} catch (error: any) {
			const err = error?.response?.data;
			return rejectWithValue(err);
		}
	},
);

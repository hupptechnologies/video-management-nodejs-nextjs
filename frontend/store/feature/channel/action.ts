import { createAsyncThunk } from '@reduxjs/toolkit';
import { showToast } from "../toast/slice";
import { channelService } from '@/services/channel';
import { FindByIdRequest } from '@/types/common';

export const getChannels = createAsyncThunk(
	'channel/getChannels',
	async (data, {
		rejectWithValue, dispatch
	}) => {
		try {
			const response = await channelService.list();
			return response.data;
		} catch (error: any) {
			const err = error?.response?.data;
			dispatch(showToast({
				message: "Failed to get Channels",
				severity: 'error'
			}));
			return rejectWithValue(err);
		}
	}
);

export const getChannelById = createAsyncThunk(
	'channel/getChannelById',
	async (data: FindByIdRequest, { rejectWithValue }) => {
		try {
			const response = await channelService.findById(data);
			return response.data;
		} catch (error: any) {
			const err = error?.response?.data;
			return rejectWithValue(err);
		}
	}
);

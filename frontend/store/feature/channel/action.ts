import { createAsyncThunk } from '@reduxjs/toolkit';
import { showToast } from "../toast/slice";
import { channelService } from '@/services/channel';
import { FindByIdRequest } from '@/types/common';
import { CreateChannel, UpdateChannel } from '@/types/channel';

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

export const createChannel = createAsyncThunk(
	'channel/createChannel',
	async (data: CreateChannel, {
		rejectWithValue, dispatch
	}) => {
		try {
			const response = await channelService.create(data);
			dispatch(showToast({
				message: "Channel created successfully",
				severity: 'success'
			}));
			return response.data;
		} catch (error: any) {
			const err = error?.response?.data;
			dispatch(showToast({
				message: "Failed to create Channel",
				severity: 'error'
			}));
			return rejectWithValue(err);
		}
	}
);

export const updateChannel = createAsyncThunk(
	'channel/updateChannel',
	async (data: UpdateChannel, { rejectWithValue }) => {
		try {
			await channelService.update(data);
			return data;
		} catch (error: any) {
			const err = error?.response?.data;
			return rejectWithValue(err);
		}
	}
);

export const deleteChannel = createAsyncThunk(
	'channel/deleteChannel',
	async (data: FindByIdRequest, { rejectWithValue }) => {
		try {
			await channelService.delete(data);
			return data;
		} catch (error: any) {
			const err = error?.response?.data;
			return rejectWithValue(err);
		}
	}
);

export const getChannelsByUserId = createAsyncThunk(
	'channel/getChannelsByUserId',
	async (data: FindByIdRequest, { rejectWithValue }) => {
		try {
			const response = await channelService.channelsByUserId(data);
			return response.data;
		} catch (error: any) {
			const err = error?.response?.data;
			return rejectWithValue(err);
		}
	}
);

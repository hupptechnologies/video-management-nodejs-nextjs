import { createAppSlice } from '@/store/createAppSlice';
import { ChannelState } from '@/types/channel';
import {
	createChannel,
	deleteChannel,
	getChannelById,
	getChannels,
	getChannelsByUserId,
	updateChannel,
} from './action';

const initialState: ChannelState = {
	channel: {
		id: 0,
		name: '',
		createdAt: '',
		userId: 0,
	},
	channels: [],
	isFetchingChannel: false,
	isCreatingChannel: false,
	isUpdatingChannel: false,
	isDeletingChannel: false,
};

export const channelSlice = createAppSlice({
	name: 'channel',
	initialState,
	reducers: {
		setChannel: (state, action) => {
			state.channel = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getChannels.pending, (state) => {
				state.isFetchingChannel = true;
			})
			.addCase(getChannels.fulfilled, (state, action) => {
				state.channels = action.payload.data.results;
				state.isFetchingChannel = false;
			})
			.addCase(getChannels.rejected, (state) => {
				state.isFetchingChannel = false;
			})
			.addCase(getChannelById.pending, (state) => {
				state.isFetchingChannel = true;
			})
			.addCase(getChannelById.fulfilled, (state, action) => {
				state.channel = action.payload.data;
				state.isFetchingChannel = false;
			})
			.addCase(getChannelById.rejected, (state) => {
				state.isFetchingChannel = false;
			})
			.addCase(createChannel.pending, (state) => {
				state.isCreatingChannel = true;
			})
			.addCase(createChannel.fulfilled, (state, action) => {
				state.channels.push(action.payload.data);
				state.isCreatingChannel = false;
			})
			.addCase(createChannel.rejected, (state) => {
				state.isCreatingChannel = false;
			})
			.addCase(updateChannel.pending, (state) => {
				state.isUpdatingChannel = true;
			})
			.addCase(updateChannel.fulfilled, (state, action) => {
				const channelId = action.payload.id;
				const index = state.channels.findIndex(
					(channel) => channel.id === channelId,
				);
				if (index !== -1 && channelId) {
					state.channels[index].name = action.payload.name;
				}
				state.channel.name = action.payload.name;
				state.isUpdatingChannel = false;
			})
			.addCase(updateChannel.rejected, (state) => {
				state.isUpdatingChannel = false;
			})
			.addCase(deleteChannel.pending, (state) => {
				state.isDeletingChannel = true;
			})
			.addCase(deleteChannel.fulfilled, (state, action) => {
				const channelId = action.payload.id;
				const index = state.channels.findIndex(
					(channel) => channel.id === channelId,
				);
				if (index && channelId) {
					state.channels.splice(index, 1);
					state.channel.id = channelId;
				}
				state.isDeletingChannel = false;
			})
			.addCase(deleteChannel.rejected, (state) => {
				state.isDeletingChannel = false;
			})
			.addCase(getChannelsByUserId.pending, (state) => {
				state.isFetchingChannel = true;
			})
			.addCase(getChannelsByUserId.fulfilled, (state, action) => {
				state.channels = action.payload.data.results;
				state.isFetchingChannel = false;
			})
			.addCase(getChannelsByUserId.rejected, (state) => {
				state.isFetchingChannel = false;
			});
	},
});

export const { setChannel } = channelSlice.actions;

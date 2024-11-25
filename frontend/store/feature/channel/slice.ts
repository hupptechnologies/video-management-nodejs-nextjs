import { createAppSlice } from '@/store/createAppSlice';
import { ChannelState } from '@/types/channel';
import { getChannelById, getChannels } from './action';

const initialState: ChannelState = {
	channel : {
		id: 0,
		name: '',
		createdAt: '',
		userId: 0,
	},
	channels: [],
	isFetchingChannel : false
};

export const channelSlice = createAppSlice({
	name: 'channel',
	initialState,
	reducers: {
		setChannel: (state, action) => {
			state.channel = action.payload;
		}
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
			});
	}
});

export const { setChannel } = channelSlice.actions;

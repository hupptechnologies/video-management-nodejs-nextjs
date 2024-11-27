import { VideoState } from '@/types/video';
import { createAppSlice } from '@/store/createAppSlice';
import { getChannelVideos, getGlobalVideos, getUserVideos, getVideoById } from './action';

const initialState: VideoState = {
	video : {
		id: 0,
		name: '',
		url: '',
		likeCount: '',
		dislikeCount: '',
		isLike: null,
		channels: {
			id: 0,
			name: '',
			createdAt: ''
		},
		createdAt: ''
	},
	videos: [],
	userVideos:[],
	isFetchingVideo : false
};

export const videoSlice = createAppSlice({
	name: 'video',
	initialState,
	reducers: {
		resetVideoState: (state) => {
			state.videos = [];
			state.isFetchingVideo = false;
		},
		setVideo: (state, action) => {
			state.video = action.payload;
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(getGlobalVideos.pending, (state) => {
				state.isFetchingVideo = true;
			})
			.addCase(getGlobalVideos.fulfilled, (state, action) => {
				state.videos = action.payload.data.results;
				state.isFetchingVideo = false;
			})
			.addCase(getGlobalVideos.rejected, (state) => {
				state.isFetchingVideo = false;
			})
			.addCase(getUserVideos.pending, (state) => {
				state.isFetchingVideo = true;
			})
			.addCase(getUserVideos.fulfilled, (state, action) => {
				state.userVideos = action.payload.data.results;
				state.isFetchingVideo = false;
			})
			.addCase(getUserVideos.rejected, (state) => {
				state.isFetchingVideo = false;
			})
			.addCase(getVideoById.pending, (state) => {
				state.isFetchingVideo = true;
			})
			.addCase(getVideoById.fulfilled, (state, action) => {
				state.video = action.payload.data;
				state.isFetchingVideo = false;
			})
			.addCase(getVideoById.rejected, (state) => {
				state.isFetchingVideo = false;
			})
			.addCase(getChannelVideos.pending, (state) => {
				state.isFetchingVideo = true;
			})
			.addCase(getChannelVideos.fulfilled, (state, action) => {
				state.videos = action.payload.data.results;
				state.isFetchingVideo = false;
			})
			.addCase(getChannelVideos.rejected, (state) => {
				state.isFetchingVideo = false;
			});
	}
});

export const {
	resetVideoState, setVideo
} = videoSlice.actions;

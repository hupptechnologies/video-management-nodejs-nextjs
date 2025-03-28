import { VideoState } from '@/types/video';
import { createAppSlice } from '@/store/createAppSlice';
import {
	deleteVideo,
	getChannelVideos,
	getGlobalVideos,
	getUserVideos,
	getVideoById,
	updateVideo,
} from './action';

const initialState: VideoState = {
	video: {
		id: 0,
		name: '',
		url: '',
		likeCount: '',
		dislikeCount: '',
		isLike: null,
		channels: {
			id: 0,
			name: '',
			createdAt: '',
		},
		createdAt: '',
	},
	videos: [],
	userVideos: [],
	isFetchingVideo: false,
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
		},
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
			})
			.addCase(updateVideo.fulfilled, (state, action) => {
				const videoId = action.payload.id;
				const index = state.videos.findIndex((video) => video.id === videoId);
				if (index !== -1 && videoId) {
					state.videos[index].name = action.payload.name;
				}
				state.video.name = action.payload.name;
			})
			.addCase(deleteVideo.fulfilled, (state, action) => {
				const videoId = action.payload.id;
				state.videos = state.videos.filter((video) => video.id !== videoId);
			});
	},
});

export const { resetVideoState, setVideo } = videoSlice.actions;

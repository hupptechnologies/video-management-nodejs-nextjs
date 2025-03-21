import { HTTP } from './http';
import {
	AdminVideosRequest,
	LikeVideoRequest,
	LikeVideoResponse,
	VideoByIdResponse,
	VideoResponse,
} from '@/types/video';
import { DefaultParams, FindByIdRequest } from '@/types/common';

type AxiosResponse = {
	data: VideoResponse;
};

class VideoService {
	fetchGlobalList() {
		return HTTP.Get<AxiosResponse>({
			route: 'videos',
		});
	}

	fetchUserList() {
		return HTTP.Get<AxiosResponse>({
			route: 'users/videos',
			isAuthenticated: true,
		});
	}

	findById(data: FindByIdRequest) {
		return HTTP.Get<VideoByIdResponse>({
			route: `users/videos/${data.id}`,
		});
	}
	adminVideos(data: AdminVideosRequest & DefaultParams) {
		return HTTP.Get<AxiosResponse>({
			route: 'admin/videos',
			params: {
				...(data.approval && {
					approval: data.approval || '',
				}),
				...(data?.limit && {
					limit: data.limit || 10,
				}),
				...(data?.offset && {
					offset: data.offset || 0,
				}),
				...(data?.search && {
					search: data.search || '',
				}),
			},
		});
	}
	updateVideoApproval(data: AdminVideosRequest & FindByIdRequest) {
		return HTTP.Put<VideoByIdResponse>({
			route: `admin/videos/${data.id}?approval=${data.approval}`,
		});
	}
	likeVideo(data: LikeVideoRequest) {
		return HTTP.Put<LikeVideoResponse>({
			route: `videos/like/${data.videoId}`,
			body: data,
		});
	}
}

export const videoService = new VideoService();

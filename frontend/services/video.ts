import { HTTP } from './http';
import {
	UpdateVideo,
	UpdateVideoResponse,
	AdminVideosRequest,
	LikeVideoRequest,
	LikeVideoResponse,
	VideoByIdResponse,
	VideoResponse,
	VideoIdRequest,
	AddVideoCommentRequest,
	VideoCommentResponse,
	AddVideoCommentResponse,
	UpdateVideoCommentRequest,
	CommentIdRequest,
} from '@/types/video';
import { DefaultParams, FindByIdRequest } from '@/types/common';

type AxiosResponse = {
	data: VideoResponse;
};

class VideoService {
	fetchGlobalList(data: DefaultParams) {
		return HTTP.Get<AxiosResponse>({
			route: 'videos',
			params: {
				...(data?.search && {
					search: data.search || '',
				}),
			},
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
	uploadVideo(channelId: number, data: FormData) {
		return HTTP.Post<LikeVideoResponse>({
			route: `users/videos/${channelId}/create`,
			body: data,
		});
	}
	update(data: UpdateVideo) {
		return HTTP.Put<UpdateVideoResponse>({
			route: `users/videos/${data.id}`,
			body: data,
		});
	}
	delete(data: FindByIdRequest) {
		return HTTP.Delete<UpdateVideoResponse>({
			route: `users/videos/${data.id}`,
		});
	}
	getVideoComment(data: VideoIdRequest) {
		return HTTP.Get<VideoCommentResponse>({
			route: `videos/comment/${data.videoId}`,
		});
	}
	addVideoComment(data: AddVideoCommentRequest) {
		return HTTP.Post<AddVideoCommentResponse>({
			route: `videos/comment/${data.videoId}`,
			body: data,
		});
	}
	updateVideoComment(data: UpdateVideoCommentRequest) {
		return HTTP.Put<AddVideoCommentResponse>({
			route: `videos/comment/${data.commentId}`,
			body: data,
		});
	}
	deleteVideoComment(data: CommentIdRequest) {
		return HTTP.Delete<AddVideoCommentResponse>({
			route: `videos/comment/${data.commentId}`,
		});
	}
}

export const videoService = new VideoService();

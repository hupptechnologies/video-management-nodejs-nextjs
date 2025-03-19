import { HTTP } from './http';
import { VideoByIdResponse, VideoResponse } from '@/types/video';
import { FindByIdRequest } from '@/types/common';

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
}

export const videoService = new VideoService();

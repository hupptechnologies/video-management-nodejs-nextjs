import { VideoByIdRequest, VideoByIdResponse, VideoResponse } from "@/types/video";
import { HTTP } from "./http";

type AxiosResponse = {
        data: VideoResponse
};

class VideoService {

	fetchGlobalList () {
		return HTTP.Get<AxiosResponse>({
			route: 'videos',
		});
	}

	fetchUserList () {
		return HTTP.Get<AxiosResponse>({
			route: 'users/videos',
			isAuthenticated: true,
		});
	}

	findById (data: VideoByIdRequest) {
		return HTTP.Get<VideoByIdResponse>({
			route: `users/videos/${data.id}`,
		});
	}

}

export const videoService = new VideoService();

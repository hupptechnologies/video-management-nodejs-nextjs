import { FindByIdRequest } from "@/types/common";
import { HTTP } from "./http";
import { ChannelByIdResponse, ChannelListResponse, ChannelVideosResponse, CreateChannel, UpdateChannelResponse } from "@/types/channel";

class ChannelService {

	list () {
		return HTTP.Get<ChannelListResponse>({
			route: 'channels/list',
		});
	}

	findById (data: FindByIdRequest) {
		return HTTP.Get<ChannelByIdResponse>({
			route: `channels/${data.id}`,
		});
	}

	create (data: CreateChannel) {
		return HTTP.Post<ChannelByIdResponse>({
			route: `channels/create`,
			body: data
		});
	}

	update (data: CreateChannel) {
		return HTTP.Put<UpdateChannelResponse>({
			route: `channels/${data.id}`,
			body: data
		});
	}

	delete (data: CreateChannel) {
		return HTTP.Delete<UpdateChannelResponse>({
			route: `channels/${data.id}`
		});
	}

	channelVideos (data: CreateChannel) {
		return HTTP.Get<ChannelVideosResponse>({
			route: `channels/${data.id}/videos`
		});
	}

	channelsByUserId (data: CreateChannel) {
		return HTTP.Get<ChannelListResponse>({
			route: `channels/user/${data.id}`
		});
	}

}

export const channelService = new ChannelService();

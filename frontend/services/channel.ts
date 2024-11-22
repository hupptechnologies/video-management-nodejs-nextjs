import { FindByIdRequest } from "@/types/common";
import { HTTP } from "./http";
import { ChannelByIdResponse, ChannelResponse } from "@/types/channel";

type AxiosResponse = {
        data: ChannelResponse
};

class ChannelService {

	list () {
		return HTTP.Get<AxiosResponse>({
			route: 'channels/list',
		});
	}

	findById (data: FindByIdRequest) {
		return HTTP.Get<ChannelByIdResponse>({
			route: `channels/${data.id}`,
		});
	}

}

export const channelService = new ChannelService();

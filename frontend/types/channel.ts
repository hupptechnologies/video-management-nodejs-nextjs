import { VideoResponse } from "./video";

export interface ChannelState {
    channel: Channel;
    channels: Channel[];
    isFetchingChannel: boolean;
    isCreatingChannel: boolean;
	isUpdatingChannel: boolean;
	isDeletingChannel: boolean;
}

export type Channel = {
    id: number;
    name: string;
    userId?: number;
    createdAt: string
};

export type ChannelResponse = {
    results: Channel[];
};

export type ChannelByIdResponse = {
    data: Channel;
};

export type CreateChannel = {
    name: string;
    id?: number
};

export type UpdateChannelResponse = {
    success: number;
};

export type ChannelListResponse = {
    data: ChannelResponse
};

export type ChannelVideosResponse = {
data: VideoResponse
};

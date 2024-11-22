export interface ChannelState {
    channel: Channel;
    channels: Channel[];
    isFetchingChannel: boolean;
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

import { Channel } from "./channel";

export type Video = {
    id: number;
    name: string;
    url: string;
    likeCount: string;
    dislikeCount: string;
    isLike: boolean | null;
    channels: Channel;
    createdAt: string;
};

export type VideoResponse = {
    results: Video[];
};

export type VideoByIdResponse = {
    data: Video;
};

export interface VideoState {
    video: Video;
    videos: Video[];
    userVideos: Video[];
    isFetchingVideo: boolean;
}

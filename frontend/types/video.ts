import { Channel } from './channel';

export type Video = {
	id: number;
	name: string;
	url: string;
	likeCount: string;
	dislikeCount: string;
	isLike: boolean | null;
	channels: Channel;
	createdAt: string;
	approval?: 'pending' | 'approved' | 'rejected';
};

export type VideoResponse = {
	results: Video[];
	totalCount?: number;
};

export type VideoByIdResponse = {
	data: Video;
};

export type LikeVideoRequest = {
	videoId: number;
	isLike: boolean | null;
};

export type LikeVideoResponse = {
	data: LikeVideoRequest;
};

export interface VideoState {
	video: Video;
	videos: Video[];
	userVideos: Video[];
	isFetchingVideo: boolean;
}

type VideoBase = {
	name: string;
	id?: number;
};

export type UpdateVideo = Omit<VideoBase, 'id'> & { id: number };

export type UpdateVideoResponse = {
	success: number;
};

export interface AdminVideosRequest {
	approval: string;
}

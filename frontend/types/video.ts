import { AuthResponse } from './auth';
import { Channel } from './channel';
import { IdType } from './common';

type BaseVideo = IdType & {
	name: string;
	url: string;
	likeCount: string;
	dislikeCount: string;
	isLike: boolean | null;
	channels: Channel;
	createdAt: string;
};

export type VideoApprovalStatus = 'pending' | 'approved' | 'rejected';

export type Video = BaseVideo & {
	approval?: VideoApprovalStatus;
	userId?: number;
};

export type VideoResponse = {
	results: Video[];
	totalCount?: number;
};

export type VideoByIdResponse = {
	data: Video;
};

export type LikeVideoResponse = {
	data: LikeVideoRequest;
};

export type AddVideoCommentResponse = {
	data: IdType & {
		createdAt: string;
	};
};

export type VideoIdRequest = {
	videoId: number;
};

export type CommentIdRequest = {
	commentId: number;
};

export type LikeVideoRequest = {
	isLike: boolean | null;
} & VideoIdRequest;

export type AddVideoCommentRequest = {
	comment: string;
} & VideoIdRequest;

export type UpdateVideoCommentRequest = {
	comment: string;
} & CommentIdRequest;

export type VideoComment = IdType & {
	comment: string;
	createdAt: string;
	users: AuthResponse;
};

export type VideoCommentResponse = {
	data: {
		results: VideoComment[];
		totalCount: number;
	};
};

export interface VideoState {
	video: Video;
	videos: Video[];
	userVideos: Video[];
	isFetchingVideo: boolean;
}

export type UpdateVideo = Readonly<Pick<Video, 'id' | 'name'>>;

export type UpdateVideoResponse = {
	success: number;
};

export interface AdminVideosRequest {
	approval: VideoApprovalStatus;
}

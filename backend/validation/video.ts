import { FastifySchema } from 'fastify/types/schema';

export const addVideoSchema: FastifySchema = {
	tags: ['Video'],
	description: 'Add New Video API',
	consumes: ['multipart/form-data'],
	security: [
		{
			token: [],
		},
	],
	params: {
		type: 'object',
		properties: {
			channelId: {
				type: 'number',
			},
		},
		required: ['channelId'],
	},
};

export const videoListForAdminSchema: FastifySchema = {
	tags: ['Admin', 'Videos'],
	description: 'Videos List For Admin API',
	security: [
		{
			token: [],
		},
	],
	querystring: {
		approval: {
			type: 'string',
		},
	},
};

export const videoApprovalSchema: FastifySchema = {
	tags: ['Admin', 'Videos'],
	description: 'Video Approval API',
	security: [
		{
			token: [],
		},
	],
	querystring: {
		type: 'object',
		properties: {
			approval: {
				type: 'string',
				enum: ['approved', 'rejected'],
			},
		},
		required: ['approval'],
	},
	params: {
		videoId: {
			type: 'number',
		},
	},
};

export const videoListSchema: FastifySchema = {
	tags: ['Admin', 'Videos', 'User'],
	description: 'User/Admin Videos List API',
	security: [
		{
			token: [],
		},
	],
	params: {
		userId: {
			type: 'string',
		},
	},
};

export const videoByIdSchema: FastifySchema = {
	tags: ['Videos'],
	description: 'Video By Id API',
	security: [
		{
			token: [],
		},
	],
	params: {
		videoId: {
			type: 'string',
		},
	},
};

export const updateVideoSchema: FastifySchema = {
	tags: ['Videos'],
	description: 'Update Video API',
	security: [
		{
			token: [],
		},
	],
	body: {
		name: {
			type: 'string',
		},
	},
	params: {
		videoId: {
			type: 'string',
		},
	},
};

export const addVideoCommentSchema: FastifySchema = {
	tags: ['Videos', 'Comments'],
	description: 'Add Video Comment API',
	security: [
		{
			token: [],
		},
	],
	body: {
		type: 'object',
		properties: {
			comment: {
				type: 'string',
				minLength: 3,
			},
		},
		required: ['comment'],
	},
	params: {
		videoId: {
			type: 'string',
		},
	},
};

export const getVideoCommentSchema: FastifySchema = {
	tags: ['Videos', 'Comments'],
	description: 'Get Video Comment API',
	security: [
		{
			token: [],
		},
	],
	params: {
		videoId: {
			type: 'string',
		},
	},
};

export const updateVideoCommentSchema: FastifySchema = {
	tags: ['Videos', 'Comments'],
	description: 'Update Video Comment API',
	security: [
		{
			token: [],
		},
	],
	body: {
		type: 'object',
		properties: {
			comment: {
				type: 'string',
				minLength: 3,
			},
		},
		required: ['comment'],
	},
	params: {
		commentId: {
			type: 'string',
		},
	},
};

export const deleteVideoCommentSchema: FastifySchema = {
	tags: ['Videos', 'Comments'],
	description: 'Delete Video Comment API',
	security: [
		{
			token: [],
		},
	],
	params: {
		commentId: {
			type: 'string',
		},
	},
};

export const likeVideoSchema: FastifySchema = {
	tags: ['Videos'],
	description: 'Like Video API',
	security: [
		{
			token: [],
		},
	],
	body: {
		isLike: {
			type: 'boolean',
		},
	},
	params: {
		videoId: {
			type: 'string',
		},
	},
};

export const glovalVideoListSchema: FastifySchema = {
	tags: ['Admin', 'Videos', 'User'],
	description: 'Videos List API',
	security: [
		{
			token: [],
		},
	],
};

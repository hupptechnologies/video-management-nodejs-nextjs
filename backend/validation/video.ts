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
		type: 'object',
		properties: {
			approval: { type: 'string' },
		},
		required: ['approval'],
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
		type: 'object',
		properties: {
			videoId: { type: 'number' },
		},
		required: ['videoId'],
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
		type: 'object',
		properties: {
			userId: { type: 'string' },
		},
		required: ['userId'],
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
		type: 'object',
		properties: {
			videoId: { type: 'string' },
		},
		required: ['videoId'],
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
		type: 'object',
		properties: {
			name: { type: 'string' },
		},
		required: ['name'],
	},
	params: {
		type: 'object',
		properties: {
			videoId: { type: 'string' },
		},
		required: ['videoId'],
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
		type: 'object',
		properties: {
			videoId: { type: 'string' },
		},
		required: ['videoId'],
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
		type: 'object',
		properties: {
			videoId: { type: 'string' },
		},
		required: ['videoId'],
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
		type: 'object',
		properties: {
			commentId: { type: 'string' },
		},
		required: ['commentId'],
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
		type: 'object',
		properties: {
			commentId: { type: 'string' },
		},
		required: ['commentId'],
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
		type: 'object',
		properties: {
			isLike: {
				type: 'boolean',
			},
		},
		required: ['isLike'],
	},
	params: {
		type: 'object',
		properties: {
			videoId: { type: 'string' },
		},
		required: ['videoId'],
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

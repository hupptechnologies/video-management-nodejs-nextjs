import { FastifySchema } from 'fastify/types/schema';

export const addChannelSchema: FastifySchema = {
	tags: ['Channel'],
	description: 'Add New Channel API',
	security: [
		{
			token: [],
		},
	],
	body: {
		type: 'object',
		required: ['name'],
		properties: {
			name: {
				type: 'string',
			},
		},
	},
};

export const channelListSchema: FastifySchema = {
	tags: ['Channel'],
	description: 'Channel List API',
	security: [
		{
			token: [],
		},
	],
};

export const updateChannelSchema: FastifySchema = {
	tags: ['Channel'],
	description: 'Update Channel API',
	security: [
		{
			token: [],
		},
	],
	params: {
		id: {
			type: 'string',
		},
	},
	body: {
		type: 'object',
		properties: {
			name: {
				type: 'string',
			},
		},
	},
};

export const channelByIdSchema: FastifySchema = {
	tags: ['Channel'],
	description: 'Find Channel By Id API',
	security: [
		{
			token: [],
		},
	],
	params: {
		id: {
			type: 'string',
		},
	},
};

export const deleteChannelSchema: FastifySchema = {
	tags: ['Channel'],
	description: 'Delete Channel API',
	security: [
		{
			token: [],
		},
	],
	params: {
		id: {
			type: 'string',
		},
	},
};

export const channelVideoListSchema: FastifySchema = {
	tags: ['User', 'Channel', 'Videos'],
	description: 'Channel Videos List API',
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

import { FastifySchema } from 'fastify/types/schema';

export const addSongSchema: FastifySchema = {
	tags: ['Song'],
	description: 'Add New Song API',
	consumes: ['multipart/form-data'],
	security: [
		{
			token: [],
		},
	],
	body: {
		type: 'object',
		required: ['song', 'tags'],
		properties: {
			song: {
				type: 'string',
				format: 'binary',
			},
			tags: {
				type: 'string',
			},
		},
	},
};

export const songsListSchema: FastifySchema = {
	tags: ['Song'],
	description: 'Songs List API',
	security: [
		{
			token: [],
		},
	],
	querystring: {
		search: {
			type: 'string',
		},
	},
};

export const updateSongSchema: FastifySchema = {
	tags: ['Song'],
	description: 'Update Song By ID API',
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
		required: ['title'],
		properties: {
			artist: {
				type: 'string',
			},
			title: {
				type: 'string',
			},
			rating: {
				type: 'number',
			},
			duration: {
				type: 'string',
			},
			tags: {
				type: 'array',
				items: {
					type: 'string',
				},
			},
		},
	},
};

export const songByIdSchema: FastifySchema = {
	tags: ['Song'],
	description: 'Song By ID API',
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

export const deleteSongSchema: FastifySchema = {
	tags: ['Song'],
	description: 'Delete Song By ID API',
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

import { FastifySchema } from 'fastify/types/schema';

export const addFolderSchema: FastifySchema = {
	tags: ["Folder"],
	description: 'Add New Folder API',
	security: [
		{
			token: []
		}
	],
	body:{
		type: 'object',
		required: ['name'],
		properties: {
			name: {
				type: 'string'
			},
			parentFolderId: {
				type: 'number'
			},
		}
	}
};

export const folderListSchema: FastifySchema = {
	tags: ["Folder"],
	description: 'Folder List API',
	security: [
		{
			token: []
		}
	],
};

export const updateFolderSchema: FastifySchema = {
	tags: ["Folder"],
	description: 'Update Folder Name By Id API',
	security: [
		{
			token: []
		}
	],
	params: {
		id: {
			type: 'string'
		}
	},
	body: {
		type: 'object',
		properties: {
			name: {
				type: 'string'
			},
		}
	}
};

export const folderByIdSchema: FastifySchema = {
	tags: ["Folder"],
	description: 'Folder By Id API',
	security: [
		{
			token: []
		}
	],
	params: {
		id: {
			type: 'string'
		}
	}
};

export const deleteFolderSchema: FastifySchema = {
	tags: ["Folder"],
	description: 'Delete Folder By Id API',
	security: [
		{
			token: []
		}
	],
	params: {
		id: {
			type: 'string'
		}
	}
};

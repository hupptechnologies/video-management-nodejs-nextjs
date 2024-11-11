import { FastifySchema } from 'fastify/types/schema';

export const addPlaylistSchema: FastifySchema = {
	tags: ['Playlist'],
	description: 'Add New Playlist API',
	security:[
		{
			token: []
		}
	],
	body:{
		type: 'object',
		required: ['name', 'parentFolderId'],
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

export const playListSchema: FastifySchema = {
	tags: ['Playlist'],
	description: 'PlayList List API',
	security:[
		{
			token: []
		}
	]
};

export const updatePlaylistSchema: FastifySchema = {
	tags: ['Playlist'],
	description: 'Update Playlist By ID API',
	security:[
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

export const playlistByIdSchema: FastifySchema = {
	tags: ['Playlist'],
	description: 'Playlist By ID API',
	security:[
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

export const deletePlaylistSchema: FastifySchema = {
	tags: ['Playlist'],
	description: 'Delete Plaulist By ID API',
	security:[
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

export const addSongInPlaylistSchema: FastifySchema = {
	tags: ['Playlist-Song'],
	description: 'Add New Song Into Playlist API',
	security:[
		{
			token: []
		}
	],
	params: {
		id: {
			type: 'string'
		}
	},
	body:{
		type: 'object',
		required: ['songIds'],
		properties: {
			songIds: {
				type: 'array',
				items: {
					type: 'string'
				}
			}
		}
	}
};

export const playlistSongSchema: FastifySchema = {
	tags: ['Playlist-Song'],
	description: 'Playlist Song List API',
	security:[
		{
			token: []
		}
	],
	params: {
		id: {
			type: 'string'
		}
	},
};

export const getSongsForPlaylistSchema: FastifySchema = {
	tags: ['Playlist-Song'],
	description: 'Song List API With Folder ID',
	security:[
		{
			token: []
		}
	],
	params: {
		id: {
			type: 'string'
		}
	},
	querystring: {
		search: {
			type: 'string'
		}
	}
};

export const deleteSongInPlaylistSchema: FastifySchema = {
	tags: ['Playlist-Song'],
	description: 'Delete Song From Playlist API',
	security:[
		{
			token: []
		}
	],
	params: {
		id: {
			type: 'string'
		},
		songId: {
			type: 'string'
		}
	},
};

export const updateOrderSongSchema: FastifySchema = {
	tags: ['Playlist-Song'],
	description: 'Update Order Of Song API',
	security:[
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
			songsOrderIndex: {
				type: 'array',
				items: {
					type: 'object',
					properties: {
						id: {
							type: 'string'
						},
						songId: {
							type: 'string'
						},
						orderIndex: {
							type: 'string'
						}
					}
				}
			}
		}
	}
};

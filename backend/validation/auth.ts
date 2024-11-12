
import { FastifySchema } from 'fastify';

export const loginSchema: FastifySchema = {
	tags: ['Auth'],
	description: 'Login User API',
	body: {
		type: 'object',
		required: ['email', 'password'],
		properties: {
			email: {
				type: 'string',
				format: 'email'
			},
			password: {
				type: 'string'
			}
		}
	},
};

export const registerSchema: FastifySchema = {
	tags: ['Auth'],
	description: 'User Register API',
	body: {
		type: 'object',
		required: ['name', 'email', 'password'],
		properties: {
			name: {
				type: 'string'
			},
			email: {
				type: 'string',
				format: 'email'
			},
			password: {
				type: 'string'
			}
		}
	},
};

export const adminRegisterSchema: FastifySchema = {
	tags: ['Auth'],
	description: 'Admin User Register API',
	body: {
		type: 'object',
		required: ['name', 'email', 'password'],
		properties: {
			name: {
				type: 'string'
			},
			email: {
				type: 'string',
				format: 'email'
			},
			password: {
				type: 'string'
			}
		}
	},
};

export const userListSchema: FastifySchema = {
	tags: ['Admin'],
	description: 'Users List API',
	security: [
		{
			token: []
		}
	],
};

export const userByIdSchema: FastifySchema = {
	tags: ['User'],
	description: 'Users By Id API',
	security: [
		{
			token: []
		}
	],
	params: {
		type: 'object',
		properties: {
			userId: {
				type: 'string'
			},
		},
		required: ['userId']
	}
};

export const updateUserSchema: FastifySchema = {
	tags: ['User'],
	description: 'Update User By Id API',
	params: {
		type: 'object',
		properties: {
			userId: {
				type: 'string'
			},
		},
		required: ['userId']
	},
	body: {
		type: 'object',
		properties: {
			name: {
				type: 'string'
			},
			password: {
				type: 'string'
			},
		},
		required: ['name', 'password']
	},
	security: [
		{
			token: []
		}
	]
};

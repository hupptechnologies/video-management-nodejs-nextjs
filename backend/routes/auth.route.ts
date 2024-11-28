import { FastifyInstance } from "fastify";
import { IncomingMessage, Server, ServerResponse } from "http";
import UserController from "../controller/users.controller";
import {
	registerSchema,
	loginSchema,
	adminRegisterSchema,
	userListSchema,
	userByIdSchema,
	updateUserSchema
} from '../validation/auth';
import { verifyAdminToken, verifyToken } from '../utils';
// import upload from "../middleware/upload";

const users = async (fastify: FastifyInstance<Server, IncomingMessage, ServerResponse>) => {

	fastify.route({
		method: 'POST',
		url: '/register',
		schema: registerSchema,
		handler: UserController.register
	});

	fastify.route({
		method: 'POST',
		url: '/admin/register',
		schema: adminRegisterSchema,
		// preHandler: upload.single('logo'),
		handler: UserController.register
	});

	fastify.route({
		method: 'POST',
		url: '/login',
		schema: loginSchema,
		handler: UserController.login
	});

	fastify.route({
		method: 'POST',
		url: '/admin/login',
		schema: loginSchema,
		handler: UserController.login
	});

	fastify.route({
		method: 'GET',
		url: '/user/list',
		schema: userListSchema,
		preHandler: fastify.auth([verifyAdminToken]),
		handler: UserController.list
	});

	fastify.route({
		method: 'GET',
		url: '/user/:userId',
		schema: userByIdSchema,
		preHandler: fastify.auth([verifyToken]),
		handler: UserController.findById
	});

	fastify.route({
		method: 'GET',
		url: '/user',
		preHandler: fastify.auth([verifyToken]),
		handler: UserController.find
	});

	fastify.route({
		method: 'PUT',
		url: '/user/:userId',
		schema: updateUserSchema,
		preHandler: fastify.auth([verifyToken]),
		handler: UserController.update
	});

	fastify.route({
		method: 'POST',
		url: '/refresh-token',
		handler: UserController.refreshToken
	});
};


export default users;

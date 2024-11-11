import { FastifyInstance } from "fastify";
import { IncomingMessage, Server, ServerResponse } from "http";
import ChannelController from "../controller/channels.controller";
import {
	addChannelSchema,
	channelByIdSchema,
	channelListSchema,
	channelVideoListSchema,
	deleteChannelSchema,
	updateChannelSchema
} from '../validation/channel';
import { verifyToken } from '../utils';
// import upload from "../middleware/upload";

const channels = async (fastify: FastifyInstance<Server, IncomingMessage, ServerResponse>) => {

	fastify.route({
		method: 'POST',
		url: '/create',
		schema: addChannelSchema,
		preHandler: fastify.auth([verifyToken]),
		handler: ChannelController.create
	});

	fastify.route({
		method: 'GET',
		url: '/list',
		schema: channelListSchema,
		preHandler: fastify.auth([verifyToken]),
		handler: ChannelController.list
	});

	fastify.route({
		method: 'GET',
		url: '/:channelId',
		schema: channelByIdSchema,
		preHandler: fastify.auth([verifyToken]),
		handler: ChannelController.findById
	});

	fastify.route({
		method: 'GET',
		url: '/user/:userId',
		schema: channelByIdSchema,
		preHandler: fastify.auth([verifyToken]),
		handler: ChannelController.findByUserId
	});

	fastify.route({
		method: 'PUT',
		url: '/:channelId',
		schema: updateChannelSchema,
		preHandler: fastify.auth([verifyToken]),
		handler: ChannelController.update
	});

	fastify.route({
		method: 'DELETE',
		url: '/:channelId',
		schema: deleteChannelSchema,
		preHandler: fastify.auth([verifyToken]),
		handler: ChannelController.delete
	});

	fastify.route({
		method: 'GET',
		url: '/:channelId/videos',
		schema: channelVideoListSchema,
		preHandler: fastify.auth([verifyToken]),
		handler: ChannelController.videoList
	});

};


export default channels;

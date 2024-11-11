import { FastifyInstance } from 'fastify';
import { IncomingMessage, Server, ServerResponse } from 'http';
import auth from './auth.route';
import channels from './channel.route';
import { userVideos, adminVideos, videos } from './video.route';

const routes = async (fastify: FastifyInstance<Server, IncomingMessage, ServerResponse>) => {
	fastify.register(auth, {
		prefix: '/api/auth'
	});
	fastify.register(channels, {
		prefix: '/api/channels'
	});
	fastify.register(videos, {
		prefix: '/api/videos'
	});
	fastify.register(userVideos, {
		prefix: '/api/users/videos'
	});
	fastify.register(adminVideos, {
		prefix: '/api/admin/videos'
	});
};

export default routes;

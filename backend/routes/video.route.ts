import { FastifyInstance } from 'fastify';
import { IncomingMessage, Server, ServerResponse } from 'http';
import VideosController from '../controller/videos.controller';
import VideoLikesController from '../controller/videoLikes.controller';
import videoCommentsController from '../controller/videoComments.controller';
import uploadfile from '../middleware/upload';
import {
	addVideoCommentSchema,
	addVideoSchema,
	deleteVideoCommentSchema,
	getVideoCommentSchema,
	updateVideoCommentSchema,
	updateVideoSchema,
	videoApprovalSchema,
	videoByIdSchema,
	videoListForAdminSchema,
	videoListSchema,
} from '../validation/video';
import { requestUser, verifyAdminToken, verifyToken } from '../utils';

export const videos = async (
	fastify: FastifyInstance<Server, IncomingMessage, ServerResponse>,
) => {
	fastify.route({
		method: 'GET',
		url: '',
		schema: videoListSchema,
		preHandler: fastify.auth([requestUser]),
		handler: VideosController.list,
	});

	fastify.route({
		method: 'PUT',
		url: '/like/:videoId',
		schema: updateVideoSchema,
		preHandler: fastify.auth([verifyToken]),
		handler: VideoLikesController.likeVideo,
	});

	fastify.route({
		method: 'POST',
		url: '/comment/:videoId',
		schema: addVideoCommentSchema,
		preHandler: fastify.auth([verifyToken]),
		handler: videoCommentsController.create,
	});

	fastify.route({
		method: 'GET',
		url: '/comment/:videoId',
		schema: getVideoCommentSchema,
		preHandler: fastify.auth([verifyToken]),
		handler: videoCommentsController.read,
	});

	fastify.route({
		method: 'PUT',
		url: '/comment/:commentId',
		schema: updateVideoCommentSchema,
		preHandler: fastify.auth([verifyToken]),
		handler: videoCommentsController.update,
	});

	fastify.route({
		method: 'DELETE',
		url: '/comment/:commentId',
		schema: deleteVideoCommentSchema,
		preHandler: fastify.auth([verifyToken]),
		handler: videoCommentsController.delete,
	});
};

export const userVideos = async (
	fastify: FastifyInstance<Server, IncomingMessage, ServerResponse>,
) => {
	fastify.route({
		method: 'POST',
		url: '/:channelId/create',
		schema: addVideoSchema,
		preHandler: [fastify.auth([verifyToken]), uploadfile.single('video')],
		handler: VideosController.create,
	});

	fastify.route({
		method: 'GET',
		url: '',
		schema: videoListSchema,
		preHandler: fastify.auth([verifyToken]),
		handler: VideosController.listForUser,
	});

	fastify.route({
		method: 'GET',
		url: '/:videoId',
		schema: videoByIdSchema,
		preHandler: fastify.auth([requestUser]),
		handler: VideosController.findById,
	});

	fastify.route({
		method: 'PUT',
		url: '/:videoId',
		schema: updateVideoSchema,
		preHandler: fastify.auth([verifyToken]),
		handler: VideosController.update,
	});

	fastify.route({
		method: 'DELETE',
		url: '/:videoId',
		schema: videoByIdSchema,
		preHandler: fastify.auth([verifyToken]),
		handler: VideosController.delete,
	});
};

export const adminVideos = async (
	fastify: FastifyInstance<Server, IncomingMessage, ServerResponse>,
) => {
	fastify.route({
		method: 'GET',
		url: '/:userId',
		schema: videoListSchema,
		preHandler: fastify.auth([verifyAdminToken]),
		handler: VideosController.videoListAssociatedWithUser,
	});

	fastify.route({
		method: 'GET',
		url: '',
		schema: videoListForAdminSchema,
		preHandler: fastify.auth([verifyAdminToken]),
		handler: VideosController.listForAdmin,
	});

	fastify.route({
		method: 'PUT',
		url: '/:videoId',
		schema: videoApprovalSchema,
		preHandler: fastify.auth([verifyAdminToken]),
		handler: VideosController.videoApproval,
	});
};

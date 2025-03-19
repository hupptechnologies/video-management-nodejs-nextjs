import { FastifyRequest, FastifyReply } from 'fastify';
import { models } from '../models';
import { message, statusCodes, Response } from '../utils';
import { TQuery } from '../interface';

const { Videos, VideoComments, Users } = models;

const findUserComment = async (commentId: number, userId: number) => {
	return await VideoComments.findOne({
		where: {
			id: commentId,
			userId,
		},
	});
};

class VideoCommentsController {
	async create(req: FastifyRequest, res: FastifyReply) {
		try {
			const { videoId } = req.params as { videoId: number };
			const { comment } = req.body as { comment: string };
			const userId = req.user?.id;

			const video = await Videos.findOne({
				where: {
					id: videoId,
					isDeleted: false,
				},
			});

			if (!video) {
				return Response.send(res, {
					status: statusCodes.NOT_FOUND,
					success: false,
					message: message.VIDEO_NOT_FOUND,
				});
			}

			const newComment = await VideoComments.create({
				videoId,
				userId,
				comment,
			});

			return Response.send(res, {
				status: statusCodes.SUCCESS,
				success: true,
				message: message.FEEDBACK_SUCCESS,
				data: newComment,
			});
		} catch (error: any) {
			return Response.send(res, {
				status: statusCodes.BAD_REQUEST,
				success: false,
				message: error.message,
			});
		}
	}

	async read(req: FastifyRequest, res: FastifyReply) {
		try {
			const { limit = 10, offset = 0 } = req.query as TQuery;
			const { videoId } = req.params as { videoId: number };

			const { count, rows } = await VideoComments.findAndCountAll({
				where: {
					videoId,
				},
				attributes: ['id', 'comment', 'createdAt'],
				include: [
					{
						model: Users,
						as: 'users',
						attributes: ['id', 'name', 'email'],
					},
				],
				order: [['createdAt', 'DESC']],
				limit,
				offset,
			});

			return Response.send(res, {
				data: {
					results: rows,
					totalCount: count,
				},
				status: statusCodes.SUCCESS,
				success: true,
				message: message.VIDEO_COMMENTS_SUCCESS,
			});
		} catch (error: any) {
			return Response.send(res, {
				status: statusCodes.BAD_REQUEST,
				success: false,
				message: error.message,
			});
		}
	}

	async update(req: FastifyRequest, res: FastifyReply) {
		try {
			const { commentId } = req.params as { commentId: number };
			const { comment } = req.body as { comment: string };
			const userId = req.user?.id;

			const videoComments = await findUserComment(commentId, userId);

			if (!videoComments) {
				return Response.send(res, {
					status: statusCodes.NOT_FOUND,
					success: false,
					message: message.VIDEO_COMMENT_NOT_FOUND,
				});
			}

			await videoComments.update({
				comment,
			});

			return Response.send(res, {
				status: statusCodes.SUCCESS,
				success: true,
				message: message.FEEDBACK_UPDATE,
			});
		} catch (error: any) {
			return Response.send(res, {
				status: statusCodes.BAD_REQUEST,
				success: false,
				message: error.message,
			});
		}
	}

	async delete(req: FastifyRequest, res: FastifyReply) {
		try {
			const { commentId } = req.params as { commentId: number };
			const userId = req.user?.id;

			const videoComments = await findUserComment(commentId, userId);

			if (!videoComments) {
				return Response.send(res, {
					status: statusCodes.NOT_FOUND,
					success: false,
					message: message.VIDEO_COMMENT_NOT_FOUND,
				});
			}

			await videoComments.destroy();

			return Response.send(res, {
				status: statusCodes.SUCCESS,
				success: true,
				message: message.FEEDBACK_REMOVE,
			});
		} catch (error: any) {
			return Response.send(res, {
				status: statusCodes.BAD_REQUEST,
				success: false,
				message: error.message,
			});
		}
	}
}

export default new VideoCommentsController();

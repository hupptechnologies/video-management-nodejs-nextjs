import { FastifyRequest, FastifyReply } from 'fastify';
import { models } from '../models';
import { message, statusCodes, Response } from '../utils';

const { Videos, VideoLikes } = models;

class VideoLikesController {
	async likeVideo(req: FastifyRequest, res: FastifyReply) {
		try {
			const { videoId } = req.params as { videoId: number };
			const { isLike } = req.body as { isLike: boolean };
			if (isLike === undefined) {
				return Response.send(res, {
					status: statusCodes.BAD_REQUEST,
					success: false,
					message: message.REQUIRED_FEILD,
				});
			}

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

			const existingLike = await VideoLikes.findOne({
				where: {
					videoId,
					userId,
				},
			});

			if (existingLike?.isLike === isLike) {
				await existingLike.destroy();
				return Response.send(res, {
					status: statusCodes.SUCCESS,
					success: true,
					message: message.FEEDBACK_REMOVE,
					data: {
						...existingLike.dataValues,
						isLike: null,
					},
				});
			}

			if (existingLike) {
				await existingLike.update({
					isLike,
				});

				return Response.send(res, {
					status: statusCodes.SUCCESS,
					success: true,
					message: message.FEEDBACK_SUCCESS,
					data: existingLike,
				});
			}

			const newLike = await VideoLikes.create({
				videoId,
				userId,
				isLike,
			});

			return Response.send(res, {
				status: statusCodes.SUCCESS,
				success: true,
				message: message.FEEDBACK_SUCCESS,
				data: newLike,
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

export default new VideoLikesController();

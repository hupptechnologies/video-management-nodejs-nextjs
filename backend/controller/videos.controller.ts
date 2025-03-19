import { FastifyRequest, FastifyReply } from 'fastify';
import { literal } from 'sequelize';
import { models } from '../models';
import cloudinary from '../middleware/cloudinary';
import { message, statusCodes, Response } from '../utils';
import { TQuery, TVideo } from '../interface';

const { Videos, Channels, Users } = models;

class VideoController {
	async create(req: FastifyRequest, res: FastifyReply) {
		try {
			const { name } = req.body as TVideo;
			const { channelId } = req.params as { channelId: number };
			const channelResult = await Channels.findOne({
				where: {
					id: channelId,
					userId: req.user?.id,
				},
			});
			const videoUrl = await cloudinary.uploadVideo(req, res);
			if (!videoUrl) {
				return Response.send(res, {
					status: statusCodes.BAD_REQUEST,
					success: false,
					message: message.VIDEO_UPLOAD_FAILED,
				});
			}
			if (!channelResult) {
				return Response.send(res, {
					status: statusCodes.BAD_REQUEST,
					success: false,
					message: message.CHANNEL_NOT_FOUND,
				});
			}
			if (!name) {
				return Response.send(res, {
					status: statusCodes.BAD_REQUEST,
					success: false,
					message: message.VIDEO_NAME_REQUIRED,
				});
			}

			const createVideo = await Videos.create({
				name,
				url: videoUrl,
				userId: req.user?.id,
				channelId,
				isDeleted: false,
			});

			Response.send(res, {
				status: statusCodes.SUCCESS,
				success: true,
				message: message.VIDEO_CREATE_SUCCESS,
				data: createVideo,
			});
		} catch (error: any) {
			return Response.send(res, {
				status: statusCodes.BAD_REQUEST,
				success: false,
				message: error.message,
			});
		}
	}

	async listVideos(
		req: FastifyRequest,
		res: FastifyReply,
		isAdmin = false,
		userId?: number,
	) {
		try {
			const { limit = 10, offset = 0 } = req.query as TQuery;
			const { approval = '' } = req.query as { approval: string };

			const where: any = {
				isDeleted: false,
			};
			if (isAdmin && approval) {
				where.approval = approval;
			}
			if (userId) {
				where.userId = userId;
			}
			if (!isAdmin) {
				where.approval = 'pending';
			}

			const { count, rows } = await Videos.findAndCountAll({
				where,
				attributes: {
					exclude: ['isDeleted'],
					include: [
						[
							literal(`(
							SELECT COUNT(*)
							FROM "admin"."video_likes" AS "videoLikes"
							WHERE "videoLikes"."videoId" = "Videos"."id"
							AND "videoLikes"."isLike" = true
						  )`),
							'likeCount',
						],
						[
							literal(`(
							SELECT COUNT(*)
							FROM "admin"."video_likes" AS "videoLikes"
							WHERE "videoLikes"."videoId" = "Videos"."id"
							AND "videoLikes"."isLike" = false
						  )`),
							'dislikeCount',
						],
						[
							literal(
								userId
									? `(
							SELECT "isLike"
							FROM "admin"."video_likes" AS "videoLikes"
							WHERE "videoLikes"."videoId" = "Videos"."id"
							AND "videoLikes"."userId" = ${userId}
							LIMIT 1
						  )`
									: 'null',
							),
							'isLike',
						],
					],
				},
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
				message: message.VIDEO_LIST_SUCCESS,
			});
		} catch (error: any) {
			return Response.send(res, {
				status: statusCodes.BAD_REQUEST,
				success: false,
				message: error.message,
			});
		}
	}

	videoListAssociatedWithUser = async (
		req: FastifyRequest,
		res: FastifyReply,
	) => {
		const { userId } = req.params as { userId: number };
		const user = await Users.findOne({
			where: {
				id: userId,
				role: 'user',
				isDeleted: false,
			},
		});
		if (!user) {
			return Response.send(res, {
				status: statusCodes.BAD_REQUEST,
				success: false,
				message: message.DETAIL_NOT_FOUND,
			});
		}

		return this.listVideos(req, res, false, userId);
	};

	listForAdmin = async (req: FastifyRequest, res: FastifyReply) =>
		this.listVideos(req, res, true);

	async videoApproval(req: FastifyRequest, res: FastifyReply) {
		try {
			const { approval } = req.query as { approval: string };
			const { videoId } = req.params as { videoId: number };

			const result = await Videos.findOne({
				where: {
					id: videoId,
					isDeleted: false,
				},
			});
			if (!result) {
				return Response.send(res, {
					status: statusCodes.BAD_REQUEST,
					success: false,
					message: message.DETAIL_NOT_FOUND,
				});
			}

			await Videos.update(
				{
					approval,
				},
				{
					where: {
						id: videoId,
					},
				},
			);

			return Response.send(res, {
				status: statusCodes.SUCCESS,
				success: true,
				message:
					approval === 'approved'
						? message.APPROVAL_SUCCESS
						: message.REJECTED_SUCCESS,
			});
		} catch (error: any) {
			return Response.send(res, {
				status: statusCodes.BAD_REQUEST,
				success: false,
				message: error.message,
			});
		}
	}

	async listForUser(req: FastifyRequest, res: FastifyReply) {
		try {
			const { limit = 10, offset = 0 } = req.query as TQuery;
			const userId = req.user.id as number;

			const { count, rows } = await Videos.findAndCountAll({
				where: {
					userId,
					isDeleted: false,
				},
				attributes: {
					exclude: ['isDeleted'],
					include: [
						[
							literal(`(
							SELECT COUNT(*)
							FROM "admin"."video_likes" AS "videoLikes"
							WHERE "videoLikes"."videoId" = "Videos"."id"
							AND "videoLikes"."isLike" = true
						  )`),
							'likeCount',
						],
						[
							literal(`(
							SELECT COUNT(*)
							FROM "admin"."video_likes" AS "videoLikes"
							WHERE "videoLikes"."videoId" = "Videos"."id"
							AND "videoLikes"."isLike" = false
						  )`),
							'dislikeCount',
						],
						[
							literal(`(
							SELECT "isLike"
							FROM "admin"."video_likes" AS "videoLikes"
							WHERE "videoLikes"."videoId" = "Videos"."id"
							AND "videoLikes"."userId" = ${userId}
							LIMIT 1
						  )`),
							'isLike',
						],
					],
				},
				include: [
					{
						model: Channels,
						as: 'channels',
						attributes: ['id', 'name', 'createdAt'],
					},
				],
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
				message: message.VIDEO_LIST_SUCCESS,
			});
		} catch (error: any) {
			return Response.send(res, {
				status: statusCodes.BAD_REQUEST,
				success: false,
				message: error.message,
			});
		}
	}

	async findById(req: FastifyRequest, res: FastifyReply) {
		try {
			const userId = req?.user?.id as number;
			const { videoId } = req.params as { videoId: number };

			const where: any = {
				id: videoId,
				isDeleted: false,
			};

			if (!userId) {
				where.approval = 'approved';
			}

			const result = await Videos.findOne({
				where,
				attributes: {
					exclude: ['isDeleted'],
					include: [
						[
							literal(`(
							SELECT COUNT(*)
							FROM "admin"."video_likes" AS "videoLikes"
							WHERE "videoLikes"."videoId" = "Videos"."id"
							AND "videoLikes"."isLike" = true
						  )`),
							'likeCount',
						],
						[
							literal(`(
							SELECT COUNT(*)
							FROM "admin"."video_likes" AS "videoLikes"
							WHERE "videoLikes"."videoId" = "Videos"."id"
							AND "videoLikes"."isLike" = false
						  )`),
							'dislikeCount',
						],
						[
							literal(
								userId
									? `(
							SELECT "isLike"
							FROM "admin"."video_likes" AS "videoLikes"
							WHERE "videoLikes"."videoId" = "Videos"."id"
							AND "videoLikes"."userId" = ${userId}
							LIMIT 1
						  )`
									: 'null',
							),
							'isLike',
						],
					],
				},
				include: [
					{
						model: Channels,
						as: 'channels',
						attributes: ['id', 'name', 'createdAt'],
					},
				],
			});

			if (!result) {
				return Response.send(res, {
					status: statusCodes.BAD_REQUEST,
					success: false,
					message: message.DETAIL_NOT_FOUND,
				});
			}

			if (
				result?.dataValues.userId === userId ||
				result?.dataValues.approval === 'approved'
			) {
				return Response.send(res, {
					data: result,
					status: statusCodes.SUCCESS,
					success: true,
					message: message.VIDEO_DETAIL_FETCHED,
				});
			} else {
				return Response.send(res, {
					status: statusCodes.BAD_REQUEST,
					success: false,
					message: message.DETAIL_NOT_FOUND,
				});
			}
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
			const { videoId } = req.params as { videoId: number };

			const existingVideo = await Videos.findOne({
				where: {
					id: videoId,
					userId: req.user?.id,
					isDeleted: false,
				},
			});

			if (!existingVideo) {
				Response.send(res, {
					status: statusCodes.BAD_REQUEST,
					success: false,
					message: message.DETAIL_NOT_FOUND,
				});
				return;
			}
			const { name } = req.body as { name: string };

			await Videos.update(
				{
					name,
				},
				{
					where: {
						id: videoId,
					},
				},
			);
			Response.send(res, {
				status: statusCodes.SUCCESS,
				success: true,
				message: message.UPDATE_VIDEO,
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
			const { videoId } = req.params as { videoId: number };

			const existingVideo = await Videos.findOne({
				where: {
					id: videoId,
					userId: req.user?.id,
					isDeleted: false,
				},
			});
			if (!existingVideo) {
				Response.send(res, {
					status: statusCodes.BAD_REQUEST,
					success: false,
					message: message.DETAIL_NOT_FOUND,
				});
				return;
			}

			await Videos.update(
				{
					isDeleted: true,
				},
				{
					where: {
						id: videoId,
					},
				},
			);
			Response.send(res, {
				status: statusCodes.SUCCESS,
				success: true,
				message: message.DELETE_VIDEO,
			});
		} catch (error: any) {
			return Response.send(res, {
				status: statusCodes.BAD_REQUEST,
				success: false,
				message: error.message,
			});
		}
	}

	async list(req: FastifyRequest, res: FastifyReply) {
		try {
			const { limit = 10, offset = 0 } = req.query as TQuery;
			const userId = req?.user?.id || '';

			const { count, rows } = await Videos.findAndCountAll({
				where: {
					approval: 'approved',
					isDeleted: false,
				},
				attributes: {
					exclude: ['isDeleted', 'approval', 'channelId'],
					include: [
						[
							literal(`(
						  SELECT COUNT(*)
						  FROM "admin"."video_likes" AS "videoLikes"
						  WHERE "videoLikes"."videoId" = "Videos"."id"
						  AND "videoLikes"."isLike" = true
						)`),
							'likeCount',
						],
						[
							literal(`(
						  SELECT COUNT(*)
						  FROM "admin"."video_likes" AS "videoLikes"
						  WHERE "videoLikes"."videoId" = "Videos"."id"
						  AND "videoLikes"."isLike" = false
						)`),
							'dislikeCount',
						],
						[
							literal(
								userId
									? `(
							SELECT "isLike"
							FROM "admin"."video_likes" AS "videoLikes"
							WHERE "videoLikes"."videoId" = "Videos"."id"
							AND "videoLikes"."userId" = ${userId}
							LIMIT 1
						  )`
									: 'null',
							),
							'isLike',
						],
					],
				},
				include: [
					{
						model: Channels,
						as: 'channels',
						attributes: ['id', 'name', 'createdAt'],
					},
				],
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
				message: message.VIDEO_LIST_SUCCESS,
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

export default new VideoController();

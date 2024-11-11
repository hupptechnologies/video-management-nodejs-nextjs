import { FastifyRequest, FastifyReply } from 'fastify';
import { message, statusCodes, Response } from '../utils';
import { models } from '../models';
import { literal, Op } from 'sequelize';
import { TChannel, TQuery } from '../interface';

const {
	Channels, Videos
} = models;

class ChannelController {

	async create (req: FastifyRequest, res: FastifyReply) {
		try {
			const channelInfo = req.body as TChannel;

			if (!channelInfo.name) {
				Response.send(res, {
					status: statusCodes.BAD_REQUEST,
					success: false,
					message: message.CHANNEL_NAME_REQUIRED
				});
			}

			const createChannel = await Channels.create({
				...channelInfo,
				userId: req.user?.id
			});

			Response.send(res, {
				status: statusCodes.SUCCESS,
				success: true,
				message: message.CHANNEL_CREATE_SUCCESS,
				data: createChannel
			});
		} catch (error: any) {
			return Response.send(res, {
				status: statusCodes.BAD_REQUEST,
				success: false,
				message: error.message
			});
		}
	}

	async list (req: FastifyRequest, res: FastifyReply) {
		try {
			const {
				search, limit = 10, offset = 0
			} = req.query as TQuery;

			const where: any = {
			};
			if (search) {
				where[Op.or] = [
					{
						name: {
							[Op.iLike]: `%${search}%`
						}
					}
				];
			}

			const {
				count,
				rows
			} = await Channels.findAndCountAll({
				where,
				limit,
				offset
			});

			return Response.send(res, {
				data: {
					results: rows,
					totalCount: count
				},
				status: statusCodes.SUCCESS,
				success: true,
				message: message.CHANNEL_FIND_ALL_SUCCESS
			});
		} catch (error: any) {
			return Response.send(res, {
				status: statusCodes.BAD_REQUEST,
				success: false,
				message: error.message
			});
		}
	}

	async findById (req: FastifyRequest, res: FastifyReply) {
		try {
			const { channelId } = req.params as { channelId: number };
			const result = await Channels.findByPk(channelId);
			if (!result) {
				Response.send(res, {
					status: statusCodes.NOT_FOUND,
					success: false,
					message: message.DETAIL_NOT_FOUND
				});
				return;
			}
			Response.send(res, {
				status: statusCodes.SUCCESS,
				success: true,
				message: message.CHANNEL_DETAIL_FETCHED,
				data: result
			});
		} catch (error: any) {
			return Response.send(res, {
				status: statusCodes.BAD_REQUEST,
				success: false,
				message: error.message
			});
		}
	}

	async findByUserId (req: FastifyRequest, res: FastifyReply) {
		try {
			const { userId } = req.params as { userId: number };
			const {
				limit = 10, offset = 0
			} = req.query as TQuery;
			const {
				count,
				rows
			} = await Channels.findAndCountAll({
				where: {
					userId
				},
				attributes: {
					exclude: ['userId']
				},
				limit,
				offset
			});
			if (count === 0) {
				Response.send(res, {
					status: statusCodes.SUCCESS,
					success: true,
					message: message.NO_CHANNELS_FOR_USER,
					data: {
						results: rows,
						totalCount: count
					}
				});
				return;
			}
			Response.send(res, {
				status: statusCodes.SUCCESS,
				success: true,
				message: message.CHANNEL_DETAIL_FETCHED,
				data: {
					results: rows,
					totalCount: count
				}
			});
		} catch (error: any) {
			return Response.send(res, {
				status: statusCodes.BAD_REQUEST,
				success: false,
				message: error.message
			});
		}
	}

	async update (req: FastifyRequest, res: FastifyReply) {
		try {
			const channelInfo = req.body as TChannel;
			const { channelId } = req.params as { channelId: number };
			if (!channelInfo.name) {
				Response.send(res, {
					status: statusCodes.BAD_REQUEST,
					success: false,
					message: message.CHANNEL_NAME_REQUIRED
				});
			}
			const channel = await Channels.findByPk(channelId);
			if (!channel) {
				Response.send(res, {
					status: statusCodes.NOT_FOUND,
					success: false,
					message: message.DETAIL_NOT_FOUND
				});
				return;
			}

			await Channels.update({
				...channelInfo,
				userId: channel?.dataValues?.userId
			}, {
				where: {
					id: channelId
				}
			});

			Response.send(res, {
				status: statusCodes.SUCCESS,
				success: true,
				message: message.CHANNEL_UPDATE_SUCCESS,
			});
		} catch (error: any) {
			return Response.send(res, {
				status: statusCodes.BAD_REQUEST,
				success: false,
				message: error.message
			});
		}
	}

	async delete (req: FastifyRequest, res: FastifyReply) {
		try {
			const { channelId } = req.params as { channelId: number };

			const channel = await Channels.findByPk(channelId);
			if (!channel) {
				Response.send(res, {
					status: statusCodes.NOT_FOUND,
					success: false,
					message: message.DETAIL_NOT_FOUND
				});
				return;
			}

			await channel.destroy();

			Response.send(res, {
				status: statusCodes.SUCCESS,
				success: true,
				message: message.CHANNEL_DELETE_SUCCESS
			});
		} catch (error: any) {
			return Response.send(res, {
				status: statusCodes.BAD_REQUEST,
				success: false,
				message: error.message
			});
		}
	}

	async videoList (req: FastifyRequest, res: FastifyReply) {
		try {
			const {
				limit = 10, offset = 0
			} = req.query as TQuery;
			const userId = req.user.id as number;
			const { channelId } = req.params as { channelId: number };

			const {
				count,
				rows
			} = await Videos.findAndCountAll({
				where: {
					channelId,
					approval: 'approved'
				},
				attributes: {
					exclude: [
						'isDeleted', 'approval'
					],
					include: [
						[
							literal(`(
							SELECT COUNT(*)
							FROM "admin"."video_likes" AS "videoLikes"
							WHERE "videoLikes"."videoId" = "Videos"."id"
							AND "videoLikes"."isLike" = true
						  )`),
							'likeCount'
						],
						[
							literal(`(
							SELECT COUNT(*)
							FROM "admin"."video_likes" AS "videoLikes"
							WHERE "videoLikes"."videoId" = "Videos"."id"
							AND "videoLikes"."isLike" = false
						  )`),
							'dislikeCount'
						],
						[
							literal(`(
							SELECT "isLike"
							FROM "admin"."video_likes" AS "videoLikes"
							WHERE "videoLikes"."videoId" = "Videos"."id"
							AND "videoLikes"."userId" = ${userId}
							LIMIT 1
						  )`),
							'isLike'
						]
					]
				},
				limit,
				offset
			});

			return Response.send(res, {
				data: {
					results: rows,
					totalCount: count
				},
				status: statusCodes.SUCCESS,
				success: true,
				message: message.VIDEO_LIST_SUCCESS
			});
		} catch (error: any) {
			return Response.send(res, {
				status: statusCodes.BAD_REQUEST,
				success: false,
				message: error.message
			});
		}
	}
}

export default new ChannelController();

import { FastifyRequest, FastifyReply } from 'fastify';
import {
	message,
	statusCodes,
	Response,
	generateRefreshToken,
	verifyRefreshToken,
	generateEncryptedPassword,
	generateJWTToken,
	comparePassWord,
} from '../utils';
import { models } from '../models';
import { Op } from 'sequelize';
import { TUsers, TQuery } from '../interface';

const { Users } = models;

class UserController {
	async fetchUserDetails(
		identifier: { id: number; role?: string; isDeleted: boolean },
		res: FastifyReply,
	) {
		try {
			const result = await Users.findOne({
				where: identifier,
				attributes: {
					exclude: ['isDeleted', 'password'],
				},
			});

			if (!result) {
				Response.send(res, {
					status: statusCodes.BAD_REQUEST,
					success: false,
					message: message.DETAIL_NOT_FOUND,
				});
				return null;
			}

			return result;
		} catch (error: any) {
			Response.send(res, {
				status: statusCodes.BAD_REQUEST,
				success: false,
				message: error.message,
			});
			return null;
		}
	}

	async register(req: FastifyRequest, res: FastifyReply) {
		try {
			const userInfo = req.body as TUsers;
			const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}/;

			if (userInfo.password && !pattern.test(userInfo.password)) {
				Response.send(res, {
					status: statusCodes.BAD_REQUEST,
					success: false,
					message: message.PASSWORD_VALIDATION,
				});
				return;
			}

			const existingUser = await Users.findOne({
				where: {
					email: userInfo.email,
					isDeleted: false,
				},
			});
			if (existingUser) {
				Response.send(res, {
					status: statusCodes.BAD_REQUEST,
					success: false,
					message: message.EMAIL_USED,
				});
				return;
			}

			userInfo.role = req.url.includes('admin') ? 'admin' : 'user';
			userInfo.password = await generateEncryptedPassword(userInfo.password);

			const createUser = await Users.create({
				...userInfo,
				isDeleted: false,
			});

			const tokenData = {
				id: createUser.dataValues.id,
				email: createUser.dataValues.email,
				role: createUser.dataValues.role,
			};

			const token = await generateJWTToken(tokenData);
			const refreshToken = await generateRefreshToken(tokenData);

			res.header('token', token);
			res.header('refresh-token', refreshToken);

			delete (createUser.dataValues as Record<string, any>).password;

			Response.send(res, {
				status: statusCodes.SUCCESS,
				success: true,
				message: message.REGISTER_SUCCESS,
				data: createUser,
			});
		} catch (error: any) {
			return Response.send(res, {
				status: statusCodes.BAD_REQUEST,
				success: false,
				message: error.message,
			});
		}
	}

	async login(req: FastifyRequest, res: FastifyReply) {
		try {
			const userInfo = req.body as TUsers;
			const role = req.url.includes('admin') ? 'admin' : 'user';
			const existingUser = await Users.findOne({
				where: {
					email: userInfo.email,
					role,
					isDeleted: false,
				},
			});
			if (!existingUser) {
				Response.send(res, {
					status: statusCodes.BAD_REQUEST,
					success: false,
					message: message.LOGIN_INVALID,
				});
				return;
			}

			const isMatched = await comparePassWord(
				userInfo.password,
				existingUser?.dataValues.password,
			);

			if (!isMatched) {
				Response.send(res, {
					status: statusCodes.BAD_REQUEST,
					success: false,
					message: message.LOGIN_INVALID,
				});
				return;
			}

			const tokenData = {
				id: existingUser.dataValues.id,
				email: existingUser.dataValues.email,
				role: existingUser.dataValues.role,
			};

			const token = await generateJWTToken(tokenData);
			const refreshToken = await generateRefreshToken(tokenData);

			res.header('token', token);
			res.header('refresh-token', refreshToken);

			delete (existingUser.dataValues as Record<string, any>).password;
			delete existingUser.dataValues.isDeleted;

			Response.send(res, {
				status: statusCodes.SUCCESS,
				success: true,
				message: message.LOGIN_SUCCESS,
				data: existingUser,
			});
		} catch (error: any) {
			return Response.send(res, {
				status: statusCodes.BAD_REQUEST,
				success: false,
				message: error.message,
			});
		}
	}

	async refreshToken(req: FastifyRequest, res: FastifyReply) {
		try {
			await verifyRefreshToken(req, res);
		} catch {
			return Response.send(res, {
				status: statusCodes.INTERNAL_SERVER_ERR,
				message: message.UNAUTHORIZED,
			});
		}
	}

	async list(req: FastifyRequest, res: FastifyReply) {
		try {
			const { search, limit = 10, offset = 0 } = req.query as TQuery;

			const where: any = {
				role: 'user',
				isDeleted: false,
			};
			if (search) {
				where[Op.or] = [
					{
						name: {
							[Op.iLike]: `%${search}%`,
						},
					},
					{
						email: {
							[Op.iLike]: `%${search}%`,
						},
					},
				];
			}

			const { count, rows } = await Users.findAndCountAll({
				where,
				attributes: {
					exclude: ['isDeleted', 'password'],
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
				message: message.LIST_SUCCESS,
			});
		} catch (error: any) {
			return Response.send(res, {
				status: statusCodes.BAD_REQUEST,
				success: false,
				message: error.message,
			});
		}
	}

	find = async (req: FastifyRequest, res: FastifyReply) => {
		const userId = req.user.id;

		const result = await this.fetchUserDetails(
			{
				id: userId,
				isDeleted: false,
			},
			res,
		);

		if (result) {
			Response.send(res, {
				status: statusCodes.SUCCESS,
				success: true,
				message: message.USER_DETAIL_FETCHED,
				data: result,
			});
		}
	};

	findById = async (req: FastifyRequest, res: FastifyReply) => {
		const { userId } = req.params as { userId: number };

		const result = await this.fetchUserDetails(
			{
				id: userId,
				role: 'user',
				isDeleted: false,
			},
			res,
		);

		if (result) {
			Response.send(res, {
				status: statusCodes.SUCCESS,
				success: true,
				message: message.USER_DETAIL_FETCHED,
				data: result,
			});
		}
	};

	async update(req: FastifyRequest, res: FastifyReply) {
		try {
			const { userId } = req.params as { userId: number };

			const existingUser = await Users.findOne({
				where: {
					id: userId,
					role: 'user',
					isDeleted: false,
				},
			});
			if (!existingUser) {
				Response.send(res, {
					status: statusCodes.BAD_REQUEST,
					success: false,
					message: message.DETAIL_NOT_FOUND,
				});
				return;
			}
			const body = req.body as TUsers;
			const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}/;
			if (body.password && !pattern.test(body.password)) {
				Response.send(res, {
					status: statusCodes.BAD_REQUEST,
					success: false,
					message: message.PASSWORD_VALIDATION,
				});
				return;
			}

			if (body.password) {
				body.password = await generateEncryptedPassword(body.password);
			}
			const { name, password } = body;

			await Users.update(
				{
					name,
					password,
				},
				{
					where: {
						id: userId,
					},
				},
			);
			Response.send(res, {
				status: statusCodes.SUCCESS,
				success: true,
				message: message.UPDATE_USER,
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

export default new UserController();

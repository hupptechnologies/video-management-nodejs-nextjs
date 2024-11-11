import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { FastifyRequest, FastifyReply, HookHandlerDoneFunction } from 'fastify';
import { Optional } from 'sequelize';
import { Response, statusCodes, message } from './index';

const secretKey: any = process.env.JWT_SECRECT_KEY || 'test';
const refreshSecretKey: any = process.env.JWT_REFRESH_SECRECT_KEY || 'test';


declare module 'fastify' {
	interface FastifyRequest {
		user: any,
		file?: File,
		files?: File[]
	}
}
export interface ITokenDetail {
	id: number,
	role: string
	email: string,
}
export type TTokenDetail = Optional<ITokenDetail, 'id' | 'role' | 'email'>;


export const generateJWTToken = (detail: TTokenDetail) => new Promise((resolve, reject) => {
	try {
		const token = jwt.sign(detail, secretKey, {
			expiresIn: '1d'
		});
		resolve(token);
	} catch (error: any) {
		reject(error);
	}
});

export const generateRefreshToken = (detail: TTokenDetail) => new Promise((resolve, reject) => {
	try {
		const refreshToken = jwt.sign(detail, refreshSecretKey, {
			expiresIn: '7d'
		});
		resolve(refreshToken);
	} catch (error: any) {
		reject(error);
	}
});

export const generateEncryptedPassword = async (password: any) => await bcrypt.hash(password, 10);

export const comparePassWord = async (
	password: any,
	enryptPass: string
) => bcrypt.compare(password, enryptPass);

export const verifyAdminToken = (
	req: FastifyRequest,
	res: FastifyReply,
	done: HookHandlerDoneFunction
) => {
	const token: any = req.headers['token'];
	jwt.verify(token, secretKey, (err: any, decoded: any) => {
		if (err) {
			return Response.send(res, {
				status: statusCodes.UNAUTHORIZED,
				message: message.UNAUTHORIZED
			});
		}
		if (decoded.role && decoded.role !== 'admin') {
			return Response.send(res, {
				status: statusCodes.UNAUTHORIZED,
				message: message.UNAUTHORIZED
			});
		}
		req.user = decoded;
	});

	done();
};

export const verifyToken = (
	req: FastifyRequest,
	res: FastifyReply,
	done: HookHandlerDoneFunction
) => {
	const token: any = req.headers['token'];
	jwt.verify(token, secretKey, (err: any, decoded: any) => {
		if (err && err.name === 'TokenExpiredError') {
			return Response.send(res, {
				status: statusCodes.UNAUTHORIZED,
				message: message.TOKEN_EXPIRED,
			});
		}
		if (err) {
			return Response.send(res, {
				status: statusCodes.UNAUTHORIZED,
				message: message.UNAUTHORIZED
			});
		}
		req.user = decoded;
	});

	done();
};

export const verifyRefreshToken = (
	req: FastifyRequest,
	res: FastifyReply
) => {
	const refreshToken: any = req.headers['refresh-token'];
	jwt.verify(refreshToken, refreshSecretKey, async (err: any, decoded: any) => {
		if (err) {
			return Response.send(res, {
				status: statusCodes.UNAUTHORIZED,
				message: message.UNAUTHORIZED
			});
		}
		const newAccessToken = await generateJWTToken({
			id: decoded.id,
			email: decoded.email,
			role: decoded.role
		});
		res.header('token', newAccessToken);
		return Response.send(res, {
			status: statusCodes.SUCCESS
		});
	});
};

export const requestUser = (
	req: FastifyRequest,
	res: FastifyReply,
	done: HookHandlerDoneFunction
) => {
	const token: any = req.headers['token'];
	jwt.verify(token, secretKey, (err: any, decoded: any) => {
		if (!err) {
			req.user = decoded;
		}
	});
	done();
};

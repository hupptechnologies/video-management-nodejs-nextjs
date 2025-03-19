import { FastifyReply } from 'fastify';

interface ResponseModel {
	success?: boolean;
	status: number;
	error?: string;
	data?: any;
	message?: string;
}

export class Response {
	static send(res: FastifyReply, response: ResponseModel) {
		res.code(response.status).send(response);
	}
}

export const statusCodes = {
	SUCCESS: 200,
	INTERNAL_SERVER_ERR: 500,
	BAD_REQUEST: 400,
	FORBIDDEN: 403,
	UNAUTHORIZED: 401,
	NOT_FOUND: 404,
};

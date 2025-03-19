// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config({
	path: '.env',
});

import Fastify, { FastifyInstance } from 'fastify';
import { IncomingMessage, Server, ServerResponse } from 'http';
import Routes from './routes';
import cors from '@fastify/cors';
import FastifyAuth from '@fastify/auth';
import {
	statusCodes,
	Response,
	swaggerOptions,
	swaggerUIOptions,
} from './utils';
import fastifySwaggerUi from '@fastify/swagger-ui';
import fastifySwagger from '@fastify/swagger';
import multer from 'fastify-multer';
import fastifyStatic from '@fastify/static';
import path from 'path';
import fastifyCookie from 'fastify-cookie';

const fastify: FastifyInstance<Server, IncomingMessage, ServerResponse> =
	Fastify();

const rootDir = path.resolve();

fastify.register(fastifyStatic, {
	root: path.join(rootDir, 'public'),
	prefix: '/public',
});

fastify.register(FastifyAuth);
fastify.register(multer.contentParser);
fastify.register(cors, {
	origin: '*',
	allowedHeaders: [
		'Access-Control-Allow-Headers',
		'Content-Type',
		'token',
		'refresh-token',
	],
	methods: ['POST', 'GET', 'PUT', 'DELETE'],
	exposedHeaders: ['token', 'refresh-token'],
});
fastify.register(fastifyCookie);

fastify.register(fastifySwagger, swaggerOptions);
fastify.register(fastifySwaggerUi, swaggerUIOptions);

fastify.register(Routes);

fastify.get('/ping', async (req, res) => {
	res.send('Hello... I am working fine');
});

fastify.setErrorHandler((error, req, res) => {
	Response.send(res, {
		status: statusCodes.BAD_REQUEST,
		success: false,
		error: error.message,
	});
});

fastify.listen(
	{
		port: Number(process.env.PORT),
		host: '0.0.0.0',
	},
	(err, address) => {
		if (err) {
			fastify.log.error(err);
		}
		fastify.swagger();
		fastify.log.info(`Server listening at ${address}`);
	},
);

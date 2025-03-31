import 'dotenv/config';
import Fastify from 'fastify';
import cors from '@fastify/cors';
import FastifyAuth from '@fastify/auth';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import multer from 'fastify-multer';
import fastifyStatic from '@fastify/static';
import fastifyCookie from '@fastify/cookie';
import path from 'path';
import Routes from './routes';
import {
	statusCodes,
	Response,
	swaggerOptions,
	swaggerUIOptions,
} from './utils';

const fastify = Fastify({
	logger: {
		level: 'info',
		transport: {
			target: 'pino-pretty',
			options: { colorize: true },
		},
	},
});

const rootDir = path.resolve();

fastify.register(fastifyStatic, {
	root: path.join(rootDir, 'backend/public'),
	prefix: '/backend/public',
});

fastify.register(FastifyAuth);
fastify.register(multer.contentParser);

fastify.register(cors, {
	origin: '*',
	allowedHeaders: ['Content-Type', 'token', 'refresh-token'],
	methods: ['POST', 'GET', 'PUT', 'DELETE'],
	exposedHeaders: ['token', 'refresh-token'],
});

fastify.register(fastifyCookie);

fastify.register(fastifySwagger, swaggerOptions);
fastify.register(fastifySwaggerUi, swaggerUIOptions);

fastify.register(Routes);

fastify.get('/ping', async (req, res) => {
	res.send({ message: 'Hello... I am working fine' });
});

fastify.setErrorHandler((error, req, res) => {
	Response.send(res, {
		status: statusCodes.BAD_REQUEST,
		success: false,
		error: error.message,
	});
});

const startServer = async () => {
	try {
		await fastify.listen({
			port: Number(process.env.PORT) || 3000,
			host: '0.0.0.0',
		});
		console.log(
			`🚀 Server running at http://localhost:${process.env.PORT || 3000}`,
		);
	} catch (err) {
		fastify.log.error(err);
		process.exit(1);
	}
};

const shutdown = () => {
	console.log('🔴 Shutting down server...');
	fastify.close().then(() => {
		console.log('🟢 Server closed.');
		process.exit(0);
	});
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

startServer();

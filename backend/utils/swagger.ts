import { SwaggerOptions } from '@fastify/swagger';
import { FastifySwaggerUiOptions } from '@fastify/swagger-ui';

export const swaggerOptions: SwaggerOptions = {
	mode: 'dynamic',
	swagger: {
		info: {
			title: 'API collection',
			description: 'API collection',
			version: '1.0.0',
		},
		host: '0.0.0.0:3000',
		schemes: ['http', 'https'],
		consumes: ['application/json', 'multipart/form-data'],
		produces: ['application/json'],
		securityDefinitions: {
			token: {
				type: 'apiKey',
				name: 'token',
				in: 'header',
			},
		},
	},
};

export const swaggerUIOptions: FastifySwaggerUiOptions = {
	routePrefix: '/api/swagger',
	initOAuth: {},
	uiConfig: {
		docExpansion: 'full',
		deepLinking: false,
	},
	uiHooks: {
		onRequest(request, reply, next) {
			next();
		},
		preHandler(request, reply, next) {
			next();
		},
	},
	staticCSP: false,
	transformStaticCSP: (header) => header,
	transformSpecification: (swaggerObject: any, req) => {
		swaggerObject.host = req.hostname;
		return swaggerObject;
	},
	transformSpecificationClone: true,
};

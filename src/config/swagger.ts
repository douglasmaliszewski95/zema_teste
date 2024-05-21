import swaggerJsdoc from 'swagger-jsdoc';
import { appConfig, getBaseUrl } from './app-config';
import { version, description } from '../../package.json';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: appConfig.APPLICATION_NAME,
      version,
      description,
    },
    servers: [
      {
        url: `${getBaseUrl()}/api/v1`,
      },
    ],
    consumes: ['application/json'],
    produces: ['application/json'],
    schemes: ['http'],
  },
  apis: ['src/**/*.ts'],
};

export const swaggerSpec = swaggerJsdoc(options);

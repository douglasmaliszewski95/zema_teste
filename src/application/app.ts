import { AppException, IResponseError } from '@domain/exceptions';
import express, { NextFunction, Request, RequestHandler, Response } from 'express';
import 'express-async-errors';
import * as http from 'http';
import cors from 'cors';
import { INTERNAL_SERVER_ERROR, NOT_FOUND } from 'http-status';
import { swaggerSpec } from '@config/swagger';
import swaggerUi from 'swagger-ui-express';
import { getBaseUrl } from '@config/app-config';

interface AppOptions {
  port: number;
  host: string;
  name: string;
  middlewares?: RequestHandler[];
  routes: express.Router;
  environment: string;
}

export default class App {
  app: express.Express;
  port: number;
  host: string;
  name: string;
  middlewares?: RequestHandler[];
  routes: express.Router;
  environment: string;

  constructor(options: AppOptions) {
    this.app = express();
    this.port = options.port;
    this.host = options.host;
    this.name = options.name;
    this.middlewares = options.middlewares || [];
    this.routes = options.routes;
    this.environment = options.environment || '';

    this.app.use(cors());
    this.handleSwaggerDocs();
    this.handleMiddlewares();
    this.handleRoutes();
    this.handleErrorMiddlewares();
    this.handleNotFound();
  }

  private handleSwaggerDocs(): void {
    this.app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    console.log(`Swagger docs available at ${this.host}:${this.port}/docs`);
  }

  private handleMiddlewares(): void {
    this.middlewares?.forEach((middleware) => this.app.use(middleware));
  }

  /**
   * @openapi
   * components:
   *  schemas:
   *   UnauthorizedResponse:
   *    type: object
   *    properties:
   *      errorCode:
   *        type: string
   *        default: AUTxxx
   *      message:
   *        type: string
   *   UnprocessableEntityResponse:
   *    type: object
   *    properties:
   *      errorCode:
   *        type: string
   *        default: REQ001
   *      message:
   *        type: string
   *   InternalServerErrorResponse:
   *    type: object
   *    properties:
   *      errorCode:
   *        type: string
   *        default: ERR001
   *      message:
   *        type: string
   *        default: Internal Server Error
   */
  private handleErrorMiddlewares(): void {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    this.app.use((error: Error, _request: Request, response: Response, _next: NextFunction) => {
      if (error instanceof AppException) {
        return response.status(error.statusCode).json(
          error.data
            ? ({
                errorCode: error.errorCode,
                message: error.message,
                data: error.data,
              } as IResponseError)
            : ({
                errorCode: error.errorCode,
                message: error.message,
              } as IResponseError),
        );
      }
      console.log({ error });
      return response.status(INTERNAL_SERVER_ERROR).json({
        errorCode: 'ERR001',
        message: 'Internal Server Error',
      } as IResponseError);
    });
  }

  private handleRoutes(): void {
    this.app.use(this.routes);
  }

  /**
   * @openapi
   * components:
   *  schemas:
   *   NotFoundResponse:
   *    type: object
   *    properties:
   *      errorCode:
   *        type: string
   *        default: ERR002
   *      message:
   *        type: string
   *        default: Not Found
   */
  private handleNotFound(): void {
    this.app.use((_request, response) => {
      response.status(NOT_FOUND).json({ errorCode: 'ERR002', message: 'Not Found' } as IResponseError);
    });
  }

  async listen(): Promise<http.Server> {
    return this.app.listen(this.port, () => {
      console.log(`Application ${this.name} is running. Listen on ${getBaseUrl()}`);
      console.log('Press CTRL+C to exit');
    });
  }
}

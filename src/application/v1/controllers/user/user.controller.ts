import { RequestHandler } from 'express';
import { OK } from 'http-status';
import { AbstractUserService } from '@application/services/user/abstract-user.service';

export default class UserController {
  constructor(private userService: AbstractUserService) {}

  /**
   * @openapi
   * /users/auth:
   *   post:
   *     tags:
   *       - Users
   *     summary: Authenticate a user
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/CreateSessionRequestDTO'
   *     responses:
   *       200:
   *         description: OK
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/CreateSessionResponseDTO'
   *       401:
   *         description: Unauthorized
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 errorCode:
   *                   type: string
   *                   default: USR002
   *                 message:
   *                   type: string
   *                   default: Incorrect cpf/senha combination
   *       404:
   *         description: Not Found
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/NotFoundResponse'
   *       422:
   *         description: Unprocessable Entity
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/UnprocessableEntityResponse'
   *       500:
   *         description: Internal Server Error
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/InternalServerErrorResponse'
   */
  public login: RequestHandler = async (request, response) => {
    const { cpf, senha } = request.body;
    const users = await this.userService.login({ cpf, senha });
    return response.status(OK).json(users);
  };
}

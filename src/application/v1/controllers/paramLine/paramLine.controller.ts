import { RequestHandler } from 'express';
import { OK } from 'http-status';
import { AbstractParamLineService } from '@application/services/paramLine/abstract-paramLine.service';

export default class ParamLineController {
  constructor(private paramLineService: AbstractParamLineService) {}

  /**
   * @openapi
   * /paramLines/list:
   *   get:
   *     tags:
   *       - ParamLines
   *     summary: Get a list of ParamLines
   *     responses:
   *       200:
   *         description: OK
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ParamLine'
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
  public listLines: RequestHandler = async (request, response) => {
    const lines = await this.paramLineService.listLines();
    return response.status(OK).json(lines);
  };

  /**
   * @openapi
   * /paramLines/listExcluded:
   *   get:
   *     tags:
   *       - ParamLines
   *     summary: Get a list of ParamLines excluded
   *     responses:
   *       200:
   *         description: OK
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ParamLine'
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
  public listExcludedLines: RequestHandler = async (request, response) => {
    const users = await this.paramLineService.listExcludedLines();
    return response.status(OK).json(users);
  };

  /**
   * @openapi
   * /paramLines/:
   *   post:
   *     tags:
   *       - ParamLines
   *     summary: Save the changes of the lines
   *     requestBody:
   *       required: true
   *       content: 
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/ParamLinesDTO'
   *     responses:
   *       200:
   *         description: OK
   *         content:
   *           text/plain:
   *             schema:
   *               type: string
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
  public save: RequestHandler = async (request, response) => {
    const { linesLeft, linesRight } = request.body;
    const message = await this.paramLineService.saveLines({ linesLeft, linesRight });
    return response.status(OK).send(message);
  };
}

import { RequestHandler } from 'express';
import { OK } from 'http-status';
import { AbstractParamSituationService } from '@application/services/paramSituation/abstract-paramSituation.service';

export default class ParamSituationController {
  constructor(private paramSituationService: AbstractParamSituationService) {}

  /**
   * @openapi
   * /paramSituations/list:
   *   get:
   *     tags:
   *       - ParamSituations
   *     summary: Get a list of ParamSituations
   *     responses:
   *       200:
   *         description: OK
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ParamSituation'
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
  public listSituations: RequestHandler = async (request, response) => {
    const situations = await this.paramSituationService.listSituations();
    return response.status(OK).json(situations);
  };

  /**
   * @openapi
   * /paramSituations/listExcluded:
   *   get:
   *     tags:
   *       - ParamSituations
   *     summary: Get a list of ParamSituations excluded
   *     responses:
   *       200:
   *         description: OK
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ParamSituation'
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
  public listExcludedSituations: RequestHandler = async (request, response) => {
    const situations = await this.paramSituationService.listExcludedSituations();
    return response.status(OK).json(situations);
  };

  /**
   * @openapi
   * /paramSituations:
   *   post:
   *     tags:
   *       - ParamSituations
   *     summary: Save the changes of the situations
   *     requestBody:
   *       required: true
   *       content: 
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/ParamSituationsDTO'
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
    const { situationsLeft, situationsRight } = request.body;
    const message = await this.paramSituationService.saveSituations({ situationsLeft, situationsRight });
    return response.status(OK).send(message);
  };
}

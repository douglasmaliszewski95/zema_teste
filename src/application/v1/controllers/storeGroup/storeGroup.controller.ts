import { RequestHandler } from 'express';
import { OK } from 'http-status';
import { AbstractStoreGroupService } from '@application/services/storeGroup/abstract-storeGroup.service';

export default class StoreGroupController {
  constructor(private storeGroupService: AbstractStoreGroupService) {}

  /**
   * @openapi
   * /storeGroups/list:
   *   post:
   *     tags:
   *       - StoreGroups
   *     summary: Get a list of StoreGroups
   *     requestBody:
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               description:
   *                 type: string
   *               code:
   *                 type: number
   *     responses:
   *       200:
   *         description: OK
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/StoreGroup'
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
  public list: RequestHandler = async (request, response) => {
    const { description, code } = request.body;
    const storeGroups = await this.storeGroupService.listStoreGroups(description, code);
    return response.status(OK).json(storeGroups);
  };

  /**
   * @openapi
   * /storeGroups/branches:
   *   post:
   *     tags:
   *       - StoreGroups
   *     summary: Get a list of branches
   *     requestBody:
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               branchId:
   *                 type: string
   *               storeGroupId:
   *                 type: string
   *     responses:
   *       200:
   *         description: OK
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Branch'
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
  public branches: RequestHandler = async (request, response) => {
    const { branchId, storeGroupId } = request.body;
    const branches = await this.storeGroupService.listBranches(branchId, storeGroupId);
    return response.status(OK).json(branches);
  };

  /**
   * @openapi
   * /storeGroups/branchesWithoutGroup:
   *   get:
   *     tags:
   *       - StoreGroups
   *     summary: Get a list of branches that doesn't have group
   *     responses:
   *       200:
   *         description: OK
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Branch'
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
  public branchesWithoutGroup: RequestHandler = async (request, response) => {
    const branches = await this.storeGroupService.listBranchesWithoutGroup();
    return response.status(OK).json(branches);
  };

  /**
   * @openapi
   * /storeGroups/branchesFromGroup:
   *   get:
   *     tags:
   *       - StoreGroups
   *     summary: Get a list of branches that have a group
   *     responses:
   *       200:
   *         description: OK
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/???'
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
  // public branchesFromGroup: RequestHandler = async (request, response) => {
  //   const branches = await this.storeGroupService.listBranchesFromGroup();
  //   return response.status(OK).json(branches);
  // };

  // /**
  //  * @openapi
  //  * /storeGroups:
  //  *   post:
  //  *     tags:
  //  *       - StoreGroups
  //  *     summary: Save the changes of the StoreGroups
  //  *     requestBody:
  //  *       required: true
  //  *       content: 
  //  *         application/json:
  //  *           schema:
  //  *             $ref: '#/components/schemas/????'
  //  *     responses:
  //  *       200:
  //  *         description: OK
  //  *         content:
  //  *           text/plain:
  //  *             schema:
  //  *               type: string
  //  *       404:
  //  *         description: Not Found
  //  *         content:
  //  *           application/json:
  //  *             schema:
  //  *               $ref: '#/components/schemas/NotFoundResponse'
  //  *       422:
  //  *         description: Unprocessable Entity
  //  *         content:
  //  *           application/json:
  //  *             schema:
  //  *               $ref: '#/components/schemas/UnprocessableEntityResponse'
  //  *       500:
  //  *         description: Internal Server Error
  //  *         content:
  //  *           application/json:
  //  *             schema:
  //  *               $ref: '#/components/schemas/InternalServerErrorResponse'
  //  */
  // public save: RequestHandler = async (request, response) => {
  //   const { situationsLeft, situationsRight } = request.body;
  //   const message = await this.storeGroupService.saveStoreGroups({ situationsLeft, situationsRight });
  //   return response.status(OK).send(message);
  // };

  // /**
  //  * @openapi
  //  * /storeGroups:
  //  *   delete:
  //  *     tags:
  //  *       - StoreGroups
  //  *     summary: Delete StoreGroups
  //  *     requestBody:
  //  *       required: true
  //  *       content: 
  //  *         application/json:
  //  *           schema:
  //  *             $ref: '#/components/schemas/????'
  //  *     responses:
  //  *       200:
  //  *         description: OK
  //  *         content:
  //  *           text/plain:
  //  *             schema:
  //  *               type: string
  //  *       404:
  //  *         description: Not Found
  //  *         content:
  //  *           application/json:
  //  *             schema:
  //  *               $ref: '#/components/schemas/NotFoundResponse'
  //  *       422:
  //  *         description: Unprocessable Entity
  //  *         content:
  //  *           application/json:
  //  *             schema:
  //  *               $ref: '#/components/schemas/UnprocessableEntityResponse'
  //  *       500:
  //  *         description: Internal Server Error
  //  *         content:
  //  *           application/json:
  //  *             schema:
  //  *               $ref: '#/components/schemas/InternalServerErrorResponse'
  //  */
  // public deleteStoreGroup: RequestHandler = async (request, response) => {
  //   const { situationsLeft, situationsRight } = request.body;
  //   const message = await this.storeGroupService.saveStoreGroups({ situationsLeft, situationsRight });
  //   return response.status(OK).send(message);
  // };
}

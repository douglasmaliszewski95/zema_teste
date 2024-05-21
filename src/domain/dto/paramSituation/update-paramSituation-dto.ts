import { ParamSituation } from "@domain/entities/ParamSituation";

/**
 * @openapi
 * components:
 *   schemas:
 *     ParamSituationsDTO:
 *       type: object
 *       properties:
 *         situationsLeft:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/ParamSituation'
 *         situationsRight:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/ParamSituation'
 */
export interface ParamSituationsDTO {
  situationsLeft: ParamSituation[];
  situationsRight: ParamSituation[];
}
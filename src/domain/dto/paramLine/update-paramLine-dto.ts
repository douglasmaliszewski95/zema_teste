import { ParamLine } from "@domain/entities/ParamLine";

/**
 * @openapi
 * components:
 *   schemas:
 *     ParamLinesDTO:
 *       type: object
 *       properties:
 *         linesLeft:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/ParamLine'
 *         linesRight:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/ParamLine'
 */
export interface ParamLinesDTO {
  linesLeft: ParamLine[];
  linesRight: ParamLine[];
}
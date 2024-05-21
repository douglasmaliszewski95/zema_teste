export type ParamSituationProps = {
  ID: number;
  DESCRICAO: string;
};

/**
 * @openapi
 * components:
 *   schemas:
 *     ParamSituation:
 *       type: object
 *       properties:
 *         ID:
 *           type: number
 *         DESCRICAO:
 *           type: string
 */
export class ParamSituation {
  ID!: number;
  DESCRICAO!: string;

  constructor(props: ParamSituationProps) {
    Object.assign(this, props);
  }
}

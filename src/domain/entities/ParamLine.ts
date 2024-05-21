export type ParamLineProps = {
  ID: number;
  DESCRICAO: string;
};

/**
 * @openapi
 * components:
 *   schemas:
 *     ParamLine:
 *       type: object
 *       properties:
 *         ID:
 *           type: number
 *         DESCRICAO:
 *           type: string
 */
export class ParamLine {
  ID!: number;
  DESCRICAO!: string;

  constructor(props: ParamLineProps) {
    Object.assign(this, props);
  }
}

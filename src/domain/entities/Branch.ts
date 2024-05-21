export type BranchProps = {
  CODFIL: number;
  DESCRICAO: string;
};

/**
 * @openapi
 * components:
 *   schemas:
 *     Branch:
 *       type: object
 *       properties:
 *         CODFIL:
 *           type: number
 *         DESCRICAO:
 *           type: string
 */
export class Branch {
  CODFIL!: number;
  DESCRICAO!: string;

  constructor(props: BranchProps) {
    Object.assign(this, props);
  }
}

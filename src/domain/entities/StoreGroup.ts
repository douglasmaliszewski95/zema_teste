export type StoreGroupProps = {
  ID: number;
  DESCRICAO: string;
  EMAIL_RESPONSAVEL: string;
  STATUS: string;
};

/**
 * @openapi
 * components:
 *   schemas:
 *     StoreGroup:
 *       type: object
 *       properties:
 *         ID:
 *           type: number
 *         DESCRICAO:
 *           type: string
 *         EMAIL_RESPONSAVEL:
 *           type: string
 *         STATUS:
 *           type: number
 */
export class StoreGroup {
  ID!: number;
  DESCRICAO!: string;
  EMAIL_RESPONSAVEL!: string;
  STATUS!: string;

  constructor(props: StoreGroupProps) {
    Object.assign(this, props);
  }
}

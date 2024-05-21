/**
 * @openapi
 * components:
 *   schemas:
 *     CreateSessionRequestDTO:
 *       type: object
 *       properties:
 *         cpf:
 *           type: string
 *         senha:
 *           type: string
 *       required:
 *         - cpf
 *         - senha
 */
export interface CreateSessionRequestDTO {
  cpf: string;
  senha: string;
}

/**
 * @openapi
 * components:
 *   schemas:
 *     CreateSessionResponseDTO:
 *       type: object
 *       properties:
 *         SEG_USUARIO_ID:
 *           type: number
 *         SEG_USUARIO_NOME:
 *           type: string
 *         SEG_USUARIO_CPF:
 *           type: string
 *         SEG_USUARIO_DT_DEMISSAO:
 *           type: string
 *         FUNC_FUNCAO:
 *           type: string
 *         FILIAL_CODGEMCO:
 *           type: number
 *         FILIAL_CIDADE:
 *           type: string
 *         FILIAL:
 *           type: string
 *         SEG_USUARIO_STATUS:
 *           type: string
 *         CODVENDR:
 *           type: number
 *         PDESC:
 *           type: number
 *         REGIONAL_ID:
 *           type: number
 *         CODVENDRECOM:
 *           type: number
 *         ID_VENDEDOR:
 *           type: number
 *         DTVOLTA:
 *           type: string
 *         DTSAIDA:
 *           type: string
 *         EMP_CODIGO:
 *           type: number
 *         PERMISSIONS:
 *           type: array
 *           items:
 *             type: number
 */
export interface CreateSessionResponseDTO {
  SEG_USUARIO_ID: number,
  SEG_USUARIO_NOME: string,
  SEG_USUARIO_CPF: string,
  SEG_USUARIO_DT_DEMISSAO: string,
  FUNC_FUNCAO: string,
  FILIAL_CODGEMCO: number,
  FILIAL_CIDADE: string
  FILIAL: string,
  SEG_USUARIO_STATUS: string,
  CODVENDR: number,
  PDESC: number,
  REGIONAL_ID: number,
  CODVENDRECOM: number,
  ID_VENDEDOR: number,
  DTVOLTA: string,
  DTSAIDA: string,
  EMP_CODIGO: number,
  PERMISSIONS: number[]
}

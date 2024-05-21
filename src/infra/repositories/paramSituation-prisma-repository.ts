import { ParamSituationRepository } from '../../domain/repositories/paramSituation-repository';
import { ParamSituation } from '@domain/entities/ParamSituation';
import { ConnectionPool } from 'mssql';

export class ParamSituationPrismaRepository implements ParamSituationRepository {
  constructor(private readonly connectionPool: ConnectionPool) { }

  async findSituations(): Promise<ParamSituation[]> {
    try {
      const request = await this.connectionPool.connect();
      const result = await request.query(
        `SELECT 
           S.CODSITPROD AS ID, 
           S.DESCRICAO
         FROM 
           CAD_SITPRO S
         WHERE
           COALESCE (S.STATUS, 0) <> 9
           AND NOT S.CODSITPROD IN (
             SELECT 
               ERNSIT.CODSITPROD
             FROM 
               ERN_T_EMD_CAD_SITUACAO ERNSIT
             WHERE 
               COALESCE (ERNSIT.STATUS, 0) <> 9
           )
         ORDER BY 
           S.DESCRICAO`
      );

      return result.recordset;
    } finally {
      await this.connectionPool.close();
    }
  }

  async findExcludedSituations(): Promise<ParamSituation[]> {
    try {
      const request = await this.connectionPool.connect();
      const result = await request.query(
        `SELECT 
           SIT.CODSITPROD AS ID, 
           SIT.DESCRICAO
         FROM 
           CAD_SITPRO SIT
         INNER JOIN 
           ERN_T_EMD_CAD_SITUACAO ERNSIT ON (SIT.CODSITPROD = ERNSIT.CODSITPROD)
         WHERE 
           COALESCE (SIT.STATUS, 0) <> 9 
           AND ERNSIT.STATUS = 1
         ORDER BY 
           SIT.DESCRICAO`
      );

      return result.recordset;
    } finally {
      await this.connectionPool.close();
    }
  }

  async selectToInsert(): Promise<ParamSituation[]> {
    try {
      const request = await this.connectionPool.connect();
      const result = await request.query(
        `SELECT 
           DESCRICAO
         FROM 
           ERN_T_EMD_CAD_SITUACAO
         INNER JOIN 
           CAD_SITPRO ON CAD_SITPRO.CODSITPROD = ERN_T_EMD_CAD_SITUACAO.CODSITPROD
         WHERE 
           1 = 1 
           AND ERN_T_EMD_CAD_SITUACAO.STATUS = 1`
      );

      return result.recordset;
    } finally {
      await this.connectionPool.close();
    }
  }

  async selectToUpdate(): Promise<ParamSituation[]> {
    try {
      const request = await this.connectionPool.connect();
      const result = await request.query(
        `SELECT 
           DESCRICAO
         FROM 
           ERN_T_EMD_CAD_SITUACAO
         INNER JOIN 
           CAD_SITPRO ON CAD_SITPRO.CODSITPROD = ERN_T_EMD_CAD_SITUACAO.CODSITPROD
         WHERE 
           1 = 1`
      );

      return result.recordset;
    } finally {
      await this.connectionPool.close()
    }

  }

  async executeQuery(query: string): Promise<string> {
    try {
      const request = await this.connectionPool.connect();
      const result = await request.query(query);

      return result.rowsAffected[0] > 0 ? 'OK' : 'Erro';
    } finally {
      await this.connectionPool.close()
    }
  }
}

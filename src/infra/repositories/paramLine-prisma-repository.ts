import { ParamLineRepository } from '../../domain/repositories/paramLine-repository';
import { ParamLine } from '@domain/entities/ParamLine';
import { ConnectionPool } from 'mssql';

export class ParamLinePrismaRepository implements ParamLineRepository {
  constructor(private readonly connectionPool: ConnectionPool) { }

  async findLines(): Promise<ParamLine[]> {
    try {
      const request = await this.connectionPool.connect();
      const result = await request.query(
        `SELECT 
           L.CODLINHA AS ID, 
           L.DESCRICAO
         FROM 
           CAD_LINHA L
         WHERE 1 = 1
           AND COALESCE (L.STATUS, 0) <> 9
           AND NOT L.CODLINHA IN (
             SELECT 
               ERNL.CODLINHA
             FROM 
               ERN_T_EMD_CAD_LINHA ERNL
             WHERE 
               1 = 1 
               AND COALESCE (ERNL.STATUS, 0) <> 9
           )
         ORDER BY 
           L.DESCRICAO`
      );

      return result.recordset;
    } finally {
      await this.connectionPool.close();
    }
  }

  async findExcludedLines(): Promise<ParamLine[]> {
    try {
      const request = await this.connectionPool.connect();
      const result = await request.query(
        `SELECT 
           L.CODLINHA AS ID, 
           L.DESCRICAO
         FROM 
           CAD_LINHA L
         INNER JOIN 
           ERN_T_EMD_CAD_LINHA ERNL ON (ERNL.CODLINHA = L.CODLINHA)
         WHERE 1 = 1 
           AND COALESCE (L.STATUS, 0) <> 9 
           AND ERNL.STATUS = 1
         ORDER BY 
           L.DESCRICAO`
      );

      return result.recordset;
    } finally {
      await this.connectionPool.close();
    }
  }

  async updateERNLines(): Promise<string> {
    try {
      const request = await this.connectionPool.connect();
      const result = await request.query(
        `UPDATE 
           ERN_T_EMD_CAD_LINHA 
         SET 
           STATUS = 9 
         WHERE 
           1=1`
      );
      const message = result.rowsAffected[0] > 0 ? "Gravado com sucesso" : "Ocorreu um erro durante a requisição";

      return message;
    } finally {
      await this.connectionPool.close();
    }
  }

  async selectToInsert(): Promise<ParamLine[]> {
    try {
      const request = await this.connectionPool.connect();
      const result = await request.query(
        `SELECT 
           CODLINHA 
         FROM 
           ERN_T_EMD_CAD_LINHA 
         WHERE 
           1=1 
         AND 
           STATUS = 1`
      );

      return result.recordset;
    } finally {
      await this.connectionPool.close();
    }
  }

  async selectToUpdate(): Promise<ParamLine[]> {
    try {
      const request = await this.connectionPool.connect();
      const result = await request.query(
        `SELECT 
           CAD_LINHA.CODLINHA
         FROM 
           ERN_T_EMD_CAD_LINHA
         INNER JOIN 
           CAD_LINHA
         ON
           CAD_LINHA.CODLINHA = ERN_T_EMD_CAD_LINHA.CODLINHA
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

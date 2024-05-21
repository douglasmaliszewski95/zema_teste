import { Branch } from '@domain/entities/Branch';
import { StoreGroupRepository } from '../../domain/repositories/storeGroup-repository';
import { StoreGroup } from '@domain/entities/StoreGroup';
import { ConnectionPool } from 'mssql';

export class StoreGroupPrismaRepository implements StoreGroupRepository {
  constructor(private readonly connectionPool: ConnectionPool) { }

  async findStoreGroups(description: string, code: number): Promise<StoreGroup[]> {
    try {
      const request = await this.connectionPool.connect();
      let query = `
        SELECT 
          ID, 
          DESCRICAO, 
          EMAIL_RESPONSAVEL
          STATUS 
        FROM 
          ERN_T_EMD_GRUPO
        WITH(NOLOCK) 
        WHERE 
          1=1 AND STATUS != 9`;

      if (description)
        query += ` AND DESCRICAO LIKE ${description}`;

      if (code)
        query += ` AND ID = ${code}`;

      const result = await request.query(query);

      return result.recordset;
    } finally {
      await this.connectionPool.close();
    }
  }

  async findBranches(branchId: string, storeGroupId: string): Promise<Branch[]> {
    try {
      const request = await this.connectionPool.connect();
      let query = `
        SELECT 
          CODFIL, 
          FANTASIA AS DESCRICAO
        FROM 
          CAD_FILIAL (NOLOCK)
        WHERE
           1 = 1
           AND COALESCE (STATUS, 0) <> 9
           AND NOT COALESCE(FLENDERALEATORIO,'N') = 'S' {0}
           AND CODFIL <> CODFILDIST
        ORDER BY 
          CODFIL`;

      if (branchId)
        query += ` AND CODFIL = ${branchId}`;

      if (storeGroupId) {
        query += ` AND CODFIL NOT IN (
          SELECT 
            CODFIL 
          FROM 
            ERN_T_EMD_GRUPO_FILIAIS (NOLOCK) 
          WHERE 
            1=1 AND STATUS = 1 AND CODIGO_GRUPO = ${storeGroupId})`;
      }

      const result = await request.query(query);

      return result.recordset;
    } finally {
      await this.connectionPool.close();
    }
  }

  async findBranchesWithoutGroup(): Promise<Branch[]> {
    try {
      const request = await this.connectionPool.connect();
      let query = `
        SELECT 
          CODFIL, 
          FANTASIA AS DESCRICAO
        FROM 
          CAD_FILIAL (NOLOCK)
        WHERE
          1 = 1
          AND COALESCE (STATUS, 0) <> 9
          AND CODFIL NOT IN (SELECT CODFIL FROM ERN_T_EMD_GRUPO_FILIAIS (NOLOCK) WHERE 1=1 AND STATUS = 1)
          AND NOT COALESCE(FLENDERALEATORIO, 'N') = 'S'
          AND CODFIL <> CODFILDIST
        ORDER BY 
          CODFIL`;

      const result = await request.query(query);

      return result.recordset;
    } finally {
      await this.connectionPool.close();
    }
  }
}

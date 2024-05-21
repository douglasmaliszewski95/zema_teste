import { ConnectionPool, config as mssqlConfig } from 'mssql';

export default class MSSQLFactory {
  private static connectionPool: ConnectionPool | null = null;

  static make(config: mssqlConfig): ConnectionPool {
    if (this.connectionPool) {
      return this.connectionPool;
    }

    this.connectionPool = new ConnectionPool(config);
    return this.connectionPool;
  }
}

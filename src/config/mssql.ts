export const sqlConfig = {
  domain: 'ZEMA',
  user: process.env.USER as string,
  password: process.env.PASSWORD as string,
  database: process.env.DATABASE as string,
  server: process.env.SERVER as string,
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  },
  options: {
    encrypt: true, // for azure
    trustServerCertificate: true, // change to true for local dev / self-signed certs
  }
}
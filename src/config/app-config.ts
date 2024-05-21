import dotenv from 'dotenv';
import fs from 'fs';

interface Envs {
  APPLICATION_NAME: string;
  APP_ENVIRONMENT: string;
  APP_PORT: number;
  APP_HOST: string;
  DATABASE_URL: string;
}

if (fs.existsSync('.env') && process.env.APP_ENVIROMENT !== 'test') {
  console.debug('Using .env file to supply config environment variables');
  dotenv.config({ path: '.env' });
}

export function requiredEnvVar(varName: string): string | never {
  console.error(`Required environment variable "${varName}" is missing.`);

  process.exit(1);
}

export function getBaseUrl() {
  if (appConfig.APP_HOST.startsWith('http://localhost')) {
    return `${appConfig.APP_HOST}:${appConfig.APP_PORT}`;
  } else {
    return appConfig.APP_HOST;
  }
}

export const appConfig: Envs = {
  APPLICATION_NAME: process.env.APPLICATION_NAME || requiredEnvVar('APPLICATION_NAME'),
  APP_ENVIRONMENT: process.env.APP_ENVIRONMENT || 'development',
  APP_PORT: Number(process.env.APP_PORT) || 3000,
  APP_HOST: process.env.APP_HOST || 'http://localhost',
  DATABASE_URL: process.env.DATABASE_URL || requiredEnvVar('DATABASE_URL'),
};

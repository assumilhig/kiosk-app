import { getEnv } from "./utils";
import sql from "mssql";

const config: sql.config = {
  user: getEnv("DB_USER"),
  password: getEnv("DB_PASSWORD"),
  server: getEnv("DB_SERVER"),
  database: getEnv("DB_NAME"),
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

let pool: sql.ConnectionPool | null = null;

export async function getConnection(): Promise<sql.ConnectionPool> {
  if (!pool) {
    pool = await sql.connect(config);
  }
  return pool;
}

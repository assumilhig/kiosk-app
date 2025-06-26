import sql from "mssql";

const config = {
  user: "sa",
  password: "psc",
  server: "127.0.0.1", // or IP address / remote hostname
  database: "RWSERVER_IPPUDO",
  options: {
    encrypt: false, // Set true for Azure
    trustServerCertificate: true,
  },
};

let pool;

export async function getConnection() {
  if (!pool) {
    pool = await sql.connect(config);
  }
  return pool;
}

import sql from "mssql";

const config = {
  user: "sa",
  password: "0198",
  server: "127.0.0.1", // or IP address / remote hostname
  database: "RWSERVER",
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

import mysql from "mysql2/promise";
import config from "./config.js";

export const pool = mysql.createPool({
  ...config.db,
  waitForConnections: true,
  connectionLimit: 8,
  dateStrings: true, // DATE columns come back as "YYYY-MM-DD", like Supabase did
  charset: "utf8mb4", // Arabic and Urdu text
  multipleStatements: false,
});

export const query = async (sql, params = []) => {
  const [rows] = await pool.query(sql, params);
  return rows;
};

/* Quote a column/table name that came from our own registry (never from users) */
export const ident = (name) => {
  if (!/^[a-z_][a-z0-9_]*$/i.test(name)) throw new Error(`Bad identifier: ${name}`);
  return `\`${name}\``;
};

const mariadb = require("mariadb");
const pool = mariadb.createPool({
  host: process.env.SQL_DATABASE_URL,
  user: process.env.SQL_DATABASE_USER,
  password: process.env.SQL_DATABASE_PASS,
  database: process.env.SQL_DATABASE_NAME,
  port: process.env.SQL_DATABASE_PORT,
  connectionLimit: 5,
});

const Product = {
  getProduct: async (id) => {
    let conn;
    let res;
    try {
      conn = await pool.getConnection();
      const sql_query = "SELECT * FROM users WHERE email = ?";
      res = await conn.query(sql_query, [email]);
    } catch (err) {
      res = err.message;
    } finally {
      if (conn) conn.end();
    }
    return res;
  },
  getAllProducts: async () => {
    let conn;
    try {
      conn = await pool.getConnection();
      const sql_query = "SELECT * FROM users";
      const res = await conn.query(sql_query);
    } catch (err) {
      throw err;
    } finally {
      if (conn) return conn.end();
    }
  },
};

module.exports = Product;

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
      const sql_query =
        "SELECT p.id_product,p.product,p.image,p.rating,p.price,m.manufacturer,m.cif,m.address FROM products as p INNER JOIN manufactures as m ON p.manufacturer_id = m.id_manufacturer WHERE p.id_product = ?";
      res = await conn.query(sql_query, [id]);
    } catch (err) {
      res = err.message;
    } finally {
      if (conn) conn.end();
    }
    return res;
  },
  getAllProducts: async () => {
    let conn;
    let res;
    try {
      conn = await pool.getConnection();
      const sql_query = "SELECT * FROM products";
      res = await conn.query(sql_query);
    } catch (err) {
      throw err;
    } finally {
      if (conn) conn.end();
    }
    return res;
  },
};

module.exports = Product;

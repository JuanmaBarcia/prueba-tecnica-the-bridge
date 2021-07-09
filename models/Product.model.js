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
  createProduct: async (producct_data) => {
    let conn;
    let res;
    try {
      conn = await pool.getConnection();
      const sql_query = "INSERT INTO users (email,password) value (?,?)";
      res = await conn.query(sql_query, user_data);
    } catch (err) {
      res = { error: "El usuario ya existe" };
    } finally {
      if (conn) conn.end();
    }
    return res;
  },
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
  removeProduct: async (id) => {
    try {
      conn = await pool.getConnection();
      const sql_query =
        "DELETE FROM `favorite_films` WHERE id_film = (SELECT f.id_film FROM favorite_films as f INNER JOIN users as u ON f.id_user = u.id_user WHERE u.email=? AND f.api_id_film = ?)";
      const res = await conn.query(sql_query, [email, api_id_film]);
      console.log(res);
      console.log(`borrada pelicula con id ${api_id_film} del user ${email}`);
    } catch (err) {
      throw err;
    } finally {
      if (conn) return conn.end();
    }
  },
};

module.exports = Product;

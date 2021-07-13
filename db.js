const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.SQL_DATABASE_NAME,
  process.env.SQL_DATABASE_USER,
  process.env.SQL_DATABASE_PASS,
  {
    host: process.env.SQL_DATABASE_URL,
    dialect: "mariadb",
  }
);

module.exports = sequelize;

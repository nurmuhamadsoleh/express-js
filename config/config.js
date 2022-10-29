const { DB_HOST, DB_PORT, DB_USER, DB_PASS, DB_NAME, DB_DIALECT } = process.env;
module.exports = {
  development: {
    username: DB_USER,
    password: DB_PASS,
    database: DB_NAME, //database development
    host: DB_HOST,
    // dialect: DB_DIALECT,
  },
  production: {
    username: DB_USER,
    password: DB_PASS,
    database: DB_NAME, //database production
    host: DB_HOST,
    // dialect: DB_DIALECT,
  },
};

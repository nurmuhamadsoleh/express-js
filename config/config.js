const { DB_HOST, DB_PORT, DB_USER, DB_PASS, DB_NAME, DB_DIALECT } = process.env;
module.exports = {
  development: {
    username: "bab6b88769f502",
    password: "fb315f89",
    database: "heroku_50877c8a747ff2f", //database development
    host: "us-cdbr-east-06.cleardb.net",
    dialect: "mysql",

    // dialect: DB_DIALECT,
  },
  production: {
    username: "bab6b88769f502",
    password: "fb315f89",
    database: "heroku_50877c8a747ff2f", //database production
    host: "us-cdbr-east-06.cleardb.net",
    dialect: "mysql",
  },
};

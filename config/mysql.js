const mysql = require("mysql");
const connection = mysql.createConnection({
  // host: "localhost", //akses untuk database
  // user: "root",
  // password: "Sukses889123",
  // database: "karyawan_crud",
  database: "heroku_50877c8a747ff2f",
  host: "us-cdbr-east-06.cleardb.net",
  username: "bab6b88769f502",
  password: "fb315f89",
});

module.exports = connection;
// connection.connect();

//setelah melakukan koneksi kita end supaya tidak ngelag

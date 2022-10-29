const mysql = require("mysql");
const connection = mysql.createConnection({
  // host: "localhost", //akses untuk database
  // user: "root",
  // password: "Sukses889123",
  // database: "karyawan_crud",
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
});

module.exports = connection;
// connection.connect();

//setelah melakukan koneksi kita end supaya tidak ngelag

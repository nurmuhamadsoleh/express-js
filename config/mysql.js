const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost", //akses untuk database
  user: "root",
  password: "Sukses889123",
  database: "karyawan_crud",
});

module.exports = connection;
// connection.connect();

//setelah melakukan koneksi kita end supaya tidak ngelag

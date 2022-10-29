// Menggunakan Promise dengan menggunakan Sequelize lebih ke fitur synchronize
const { Sequelize } = require("sequelize");
const sequelize = new Sequelize({
  database: "heroku_50877c8a747ff2f",
  host: "us-cdbr-east-06.cleardb.net",
  username: "bab6b88769f502",
  password: "fb315f89",
  // host: "localhost", //akses untuk database
  // username: "root",
  // password: "Sukses889123",
  // database: "karyawan_crud_v2",
  dialect: process.env.DB_DIALECT,
});

//untuk mengecek connection ke database
//akan di jalankan ketika pertama kali di load dengan menggunakan metode IIFE (immediately Invoked Function Expression)
//untuk menjalankan manual node config\sequelize.js
//Sama seperti Function biasanya tapi tanpa menggunakan nama function yang berfungsi untuk mengenerate table jika table user tidak terdapat di database, akan di jalankan ketika kita melakukan import file sequelize
(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully");
  } catch (error) {
    console.log("Unable to connect to the database:", error);
  }
})();
//Model Instance untuk memanggil modelnya
module.exports = sequelize;

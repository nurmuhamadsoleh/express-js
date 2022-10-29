const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../../config/sequelize"); //melakukan import koneksi database.

//membuat skema Products
const Product = sequelize.define(
  "product",
  {
    // Model attributes are defined here
    //   id: {
    //     type: DataTypes.INTEGER,
    //     primaryKey: true,
    //     autoIncrement: true,
    //     allowNull: false,
    //   },
    users_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    nama: {
      type: DataTypes.STRING,
      allowNull: false, //tidak boleh kosong
    },
    price: {
      type: DataTypes.STRING,
      allowNull: false,
      // allowNull defaults to true -> defaultnya true jika tidak di deklarasi allowNull
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: false, //niai default false
      allowNull: false,
    },
    image_url: {
      type: DataTypes.TEXT,
      //boleh null / di izinkan kosong
    },
  }
  // untuk membuat sebuah options
  //   {
  //     freezeTableName: true,
  //   }
);
const User = db.define("users", {
  name: DataTypes.STRING,
  email: DataTypes.STRING,
  gender: DataTypes.STRING,
});
//melakukan Intiansiasi/ melakukan sinkronisasi setiap saat
module.exports = {
  Product,
  User,
};
// function untuk membuat table user jika di database belum terdapat Table User
(async () => {
  await db.async();
})();

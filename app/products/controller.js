// membaut koneksi ke BE
const connection = require("../../config/mysql");
const path = require("path");
const fs = require("fs");

// Membuat Query Strings
// const Query = (req, res) => {
//   const { search } = req.query;
//   connection.query(
//     {
//       //melakukan search berdasarkan Fild nama
//       sql: "SELECT * FROM products WHERE nama LIKE ?",
//       values: [`%${search}%`],
//     },
//     _response(res)
//   );
//   // connection.end();
// };

// Membut Controller
const index = (req, res) => {
  const { search } = req.query;
  let exec = {};
  if (search) {
    exec = {
      sql: "SELECT * FROM products WHERE nama LIKE ?",
      values: [`%${search}%`],
    };
    //jika tidak mengirimkan query string maka akan menampilkan semua data products
  } else {
    exec = {
      sql: "SELECt * FROM products",
    };
  }
  //melakukan open connection
  // connection.connect();
  // connetion query mempunyai parameter sql
  connection.query(
    //   sql: "SELECT * FROM products",
    // values: //digunakan untuk query params
    exec,
    _response(res)
  );
  // connection.end();
};
const view = (req, res) => {
  connection.query(
    {
      sql: "SELECT * FROM products WHERE id = ?",
      // value nya berupa array sesuai dengan tanda ? untuk menentuan urutan dari value misalnya WHERE id ? AND status = ? yang berarti array index 0 dan 1
      values: [req.params.id], //yang berarti parameter di simpan pada param -> cara mengakses http://localhost:3000/api/v1/proucts/3
    },
    _response(res)
  );
};
const destroy = (req, res) => {
  connection.query(
    {
      sql: "DELETE FROM products WHERE id = ?",
      // value nya berupa array sesuai dengan tanda ? untuk menentuan urutan dari value misalnya WHERE id ? AND status = ? yang berarti array index 0 dan 1
      values: [req.params.id], //yang berarti parameter di simpan pada param -> cara mengakses http://localhost:3000/api/v1/proucts/3
    },
    _response(res)
  );
};
//store digunakan untuk mengirimkan data
const store = (req, res) => {
  // parameter di ambil dari database
  const { users_id, nama, price, stock, status } = req.body;
  const image = req.file; //jika seperti ini file kita di hast
  if (image) {
    const target = path.join(__dirname, "../../uploads", image.originalname);
    fs.renameSync(image.path, target);
    // res.sendFile(target); tidak perlu digunakan karena sudah ada res
    connection.query(
      {
        sql: "INSERT INTO products (users_id, nama, price, stock, status, image_url) VALUES (?,?,?,?,?,?)",
        //value nya diambil dari object destruct yang di atas
        //kita parse agar lebih memastikan kalau user_id interger
        //karena defaulnya setiap di input berupa strings
        values: [
          parseInt(users_id),
          nama,
          price,
          stock,
          status,
          `http://localhost:3000/public/${image.originalname}`,
        ], //yang berarti parameter di simpan pada param -> cara mengakses http://localhost:3000/api/v1/proucts/3
      },
      _response(res)
    );
  }
};
const update = (req, res) => {
  // parameter di ambil dari database
  const { users_id, nama, price, stock, status } = req.body;
  const image = req.file; //jika seperti ini file kita di hast
  let sql = "";
  let values = [];
  if (image) {
    const target = path.join(__dirname, "../../uploads", image.originalname);
    fs.renameSync(image.path, target);
    sql =
      "UPDATE products SET users_id = ?, nama= ?, price = ?, stock = ?, status = ?, image_url = ? WHERE id = ?";
    values = [
      parseInt(users_id),
      nama,
      price,
      stock,
      status,
      `http://localhost:3000/public/${image.originalname}`,
      req.params.id,
    ];
    // membuat validasi ketika image kosong / image tidak di ubah
  } else {
    sql =
      "UPDATE products SET users_id = ?, nama= ?, price = ?, stock = ?, status = ? WHERE id = ?";
    values = [parseInt(users_id), nama, price, stock, status, req.params.id];
  }
  //karena key dan value nya sama jika berbeda bisa menggunakan sql : data
  connection.query({ sql, values }, _response(res));
};
const param = (req, res) => {
  connection.query(
    // untuk memasuan value dari user mengunaan tanda ?
    {
      sql: "SELECT * FROM products WHERE id = ? AND status = ?",
      // value nya berupa array sesuai dengan tanda ? untuk menentuan urutan dari value misalnya WHERE id ? AND status = ? yang berarti array index 0 dan 1
      values: [req.params.id, req.params.status], //yang berarti parameter di simpan pada param -> cara mengakses http://localhost:3000/api/v1/proucts/3
    },
    _response(res)
  );
};
// membuat method private untuk handle status
const _response = (res) => {
  //res untuk menampung response yang di atasnya
  return (error, result) => {
    //untuk menampilkan status error
    //seharusnya masih ada errors status code
    if (error) {
      res.send({
        status: "failed",
        response: error, //lebih detail melihat pesan error
      });
    } else {
      res.send({
        status: 200,
        // tmpilkan datanya
        response: result,
      });
    }
  };
};
module.exports = {
  index,
  view,
  param,
  store,
  update,
  destroy,
};

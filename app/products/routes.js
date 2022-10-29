//Instans Routenya Cara Pertama ga perlu insialisasi ulang langsung bisa mengunkan router
const router = require("express").Router();
// const connection = require("../../config/mysql");
const multer = require("multer");
const path = require("path"); //digunakan untuk fetching
const upload = multer({ dest: "uploads" });
const fs = require("fs");
const productController = require("./controller");

// Instans Routenya Cara Kedua, nanti perlu inisialisasi
// const {Router} = require('express');

// lebih sepesifik, jika menggunakan app.use tidak spesifik tapi secara default method GET
router.get("/mahasiswa", (req, res) => {
  // Bisa lebih dinamis lagi menggunaakn query string
  console.log(req.query); //maka akan tampil di console
  const { page, totalPage } = req.query; //-> url http://localhost:3000/mahasiswa?page=1&totalPage=20,
  // jika menggunakan send response bisa html dan juga bisa json
  res.send({
    status: "Success",
    message: "Welcometo Express JS Tutorial Eduwork",
    page: page,
    totalPage: totalPage,
  });
});
router.get("/proucts", productController.index);
router.get("/proucts/:id", productController.view);
// menacari proucts berdasarkan id & status --> http://localhost:3000/api/v1/proucts/2/1
router.get("/proucts/:id/:status", productController.param);
router.get("/proucts/:id/:status", productController.param);

// Dyanamic Route jika igin format json
router.get("/product/:id", (req, res) => {
  console.log(req.params); //-> url akses http://localhost:3000/product/1?nama=soleh&age=25
  // jika ingin lebih spesifik data json, bisa menggunakan json
  // untuk menangkap parameter kita bisa menggunakan object req.params
  res.json({
    // valueya di ambil dari req.params.id
    id: req.params.id,
  });
});
// Destructring Assigmt
router.get("/:category/:id", (req, res) => {
  // Destructring Assigment -> akses Url -> http://localhost:3000/foods/12akan di lakukan destruct dari req.params
  const { category, id } = req.params;
  //   atau bisa di gabungkan jika key dan valuenya sama
  res.json({ category, id });
  //   res.json({
  //     category: category,
  //     id: id,
  //   });
});

router.post("/proucts/", upload.single("image"), productController.store);
router.put("/proucts/:id", upload.single("image"), productController.update);
router.delete(
  "/proucts/:id",
  upload.single("image"),
  productController.destroy
);
// Menangani Request Body dengan Middleware
router.post("/product", upload.single("image"), (req, res) => {
  // req di tangkap oleh body
  // untuk menangani req.body kita perlu menggunakan middleware library body parser di express, tapi versi 4.16 body parser sudah include dengan express
  // data yang di kirimkan pakai urlencode di tangkap oleh req.body
  // res.json(req.body);
  // bisa juga menggunakan Destructring Assigment jika ingin mengirimkan param satu persatu
  // const { nama, posisi } = req.body;
  const { name, price, stock, status } = req.body;
  // image ga bisa di desctructuring
  const image = req.file; //jika seperti ini file kita di hast

  // supaya bisa lihat image nya kita perlu remane sesuai dengan format file aslinya
  // kita menggunakan library bawaan express js yaitu fs(file system)
  if (image) {
    //jika image true
    //kita gabungkan dengan global variabel yang di gunakan untuk mencari tau lokasi saat ini di komputer local, lalu kita joinkan dengan uploads lalu kta ambil original name pada response image
    const target = path.join(__dirname, "uploads", image.originalname); //__dirname merupakan global variabel dari javascript yang di gunakan untuk mencari tau lokasi kita saat ini
    fs.renameSync(image.path, target); //lalu kita rename secara syncronus, jadi tunggu dulu, tidak lagsung mengembalikan responsenya, yag aan di rename dari image
    res.json({
      name,
      price,
      stock,
      status,
      image,
    });
    // kita tampilkan gambarnya hasil request, kita menggunakan target yang kita rename
    res.sendFile(target);
  }
  // const { image } = req.file;
  // nternal error 500, karena multer uload belum di tambahkn
  // console.log(req.file);
  // res.json({ nama, posisi });
  // res.send({
  //   status: "success",
  //   message: "Welcome to Express JS Eduwork",
  // });
});

// jika file yang di upload 1 kita menggunakan single, jika lebih dari 1 menggunakan array
// router.post('/profile', upload.single('avatar'), function(req, res, next){

// })
// untuk dapat menggunakan nya perlu export
module.exports = router;

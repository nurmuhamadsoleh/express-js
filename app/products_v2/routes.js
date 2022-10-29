// membuat Routing dengan async karena sequelize bersifat promise
const router = require("express").Router();
//import connection Database seharunya di import di controller
// const Product = require("./model");
const multer = require("multer");
const upload = multer({ dest: "uploads" });
// const fs = require("fs");
// const path = require("path");
const ProductControllerV2 = require("./controller");
router.post("/product", ProductControllerV2.saveProduct);
router.post("/products", upload.single("image"), ProductControllerV2.input);
router.get("/products", ProductControllerV2.getUsers);
router.get("/products/:id", ProductControllerV2.getUsersById);
router.put("/products/:id", ProductControllerV2.UpdateUser);
router.delete("/product/:id", ProductControllerV2.deleteUser);
// menggunakan Validasi
router.delete("/products/:id", ProductControllerV2.deleteData);
router.get("/products/:id/:status", ProductControllerV2.getUsersByStatus); //--> cara akses http://localhost:3000/api/v2/products/3/1

// router.post("/product", upload.single("image"), async (req, res) => {
//   const { users_id, nama, price, stock, status } = req.body;
//   const image = req.file;
//   if (image) {
//     const target = path.join(__dirname, "../../uploads", image.originalname);
//     fs.renameSync(image.path, target);
//     try {
//       //mexlakukan synchronize
//       await Product.sync();
//       //Product.sync() --> jika tidak ada parameter maka akan membuat table jika belum ada table product dan tidak melakukan akasi apapun jika table sudah ada
//       //await Product.sync({force: true}) --> Akan membuat Table yang baru jika sudah ada maka akan menghapus table yang lama
//       //await Product.sync({alter: true}) --> akan mengecek isi table nya apa ajja, jika ada yang kurang akan di tambhakan table yang di buatnya. bianya alter: true yang sering di gunakan
//       const result = await Product.create({
//         users_id,
//         nama,
//         price,
//         stock,
//         status,
//         image_url: `http://localhost:3000/public/${image.originalname}`,
//       });
//       res.send(result);
//     } catch (eror) {
//       res.send(eror);
//     }
//     //Jika error maka akan mengembalikan error
//   }
// });
module.exports = router;

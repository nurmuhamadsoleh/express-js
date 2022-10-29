var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send({
    status: "success",
    message: "Welcome to Express JS Eduwork",
  });
});
//body pare -> untuk membaca data yang dikirim oleh client
router.post("/mahasiswa", (req, res) => {
  console.log(req.body, "ini datanya"); //ini yang di tampilkan di console.log express
  res.send("ini adalah routing post"); //ini yang akan di tampilkan di postman
});
// Routing untuk Methood POST

module.exports = router;

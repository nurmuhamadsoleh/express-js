require("dotenv").config();
var createError = require("http-errors");
// untuk dapat menggunakan routing route js perlu import
const productsrouter = require("./app/products/routes");
const productsrouterV2 = require("./app/products_v2/routes");
const fileUpload = require("express-fileupload");
const cors = require("cors");
// melakukan import untuk middelware
// const log = require("./middlewares/logger"); // bisa menggunakan dengan morgan
const logger = require("morgan");
// Inisalisasi express
var express = require("express");

var path = require("path");
var cookieParser = require("cookie-parser");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
// Inisalisasi express
var app = express();
// menggunakan body parse harus install dan inisialisasi espress

// menggunakan body parse dengan middleware sebelum routing di jalankan
// jika req bentuk form data seperti multipart form atau Form Url Encode seperti form html
app.use(express.urlencoded({ extended: true })); //karena post sama get sama dalam arti req datang dari url tapi req di hidden

// running express
app.listen(3000, () => console.log(`Server: http://localhost:3000`));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

// menggunakan middleware sebelm route, jika sesudah router atau sudah menjalankan res maka tidak akan berfungsi
// app.use(log); //maka akan menampilkan log date saat ini
app.use(logger("dev")); //jika menggunakan morgan makan data logger nya kita panggil dengan parameter dev sebagai mode developer
// utuk menangani req json & juga form yang di sebut body parser yang menerima request dari client
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// untuk menangani file statics
app.use("/public", express.static(path.join(__dirname, "uploads"))); //akses url --> /public/nama_file

app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
//Membuat Routing untuk dapat di tampilkan karena express bekerja dengan cara routing
//app.use bisa digunakan juga untuk middelware tidak mendefinisikasi method secara default GET
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use(cors());
app.use(fileUpload());

// lalu dapat lansgung menggunakan router yang ada di routes.js
//biasanya api di awali dengan /api/dan versi api
app.use("/api/v1", productsrouter);
app.use("/api/v2", productsrouterV2);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});
// digunakan untuk menangani error dengan membuat routing paling akhir, ketika routing nya ga ada routing nya akan di panggil
app.use((req, res, next) => {
  // parameter err untuk handle error yang lain
  res.status(404); //untuk menampilkan status error di browser
  res.send({
    status: "failed",
    message: `Resource ${req.originalUrl} Not Found`,
  });
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;

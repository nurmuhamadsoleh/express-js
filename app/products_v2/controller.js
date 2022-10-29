const connection = require("../../config/sequelize");
const Product = require("./model");
const path = require("path");
const fs = require("fs");
const Validator = require("fastest-validator");
const md5 = require("md5");
// Melakukan Validasi Form
const v = new Validator();
const getUsers = async (req, res) => {
  try {
    const response = await Product.findAll();
    // res.send(response);
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
  //   jika berhasil/ tidak ada eror maka akan menampilkan pesan ok
};
const getUsersById = async (req, res) => {
  //   const { users_id, nama, price, stock, status } = req.body;
  try {
    const response = await Product.findOne({
      where: {
        id: req.params.id,
      },
    });
    // ketika datanya kosong akan menampilkan Object
    // res.send(response);
    res.status(200).json(response || {});
  } catch (error) {
    console.log(error.message);
  }
};
const getUsersByStatus = async (req, res) => {
  //   const { users_id, nama, price, stock, status } = req.body;
  try {
    const response = await Product.findOne({
      where: {
        //id merupakan fild yang ada di database
        id: req.params.id,
        status: req.params.status,
      },
    });
    // res.send(response);
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};
const deleteData = async (req, res) => {
  //   const { users_id, nama, price, stock, status } = req.body;
  const id = req.params.id;
  const product = await Product.findByPk(id);
  if (!product) {
    return res.json({ message: "Product Not Found" });
  }
  await product.destroy();
  res.json({ message: "Product Delete" });
};
const deleteUser = async (req, res) => {
  //   const { users_id, nama, price, stock, status } = req.body;
  try {
    const response = await Product.destroy({
      where: {
        id: req.params.id,
      },
    });
    // res.send(response);
    res.status(200).json({ response, msg: "User Delete" });
  } catch (error) {
    console.log(error.message);
  }
};
const UpdateUser = async (req, res) => {
  const id = req.params.id;
  //   res.send(id); //untuk menampilkan id
  //   mengecek di database id yang dikirimkan terdapat di database atau tidak
  let product = await Product.findByPk(id);
  if (!product) {
    return res.json({ message: "Product not found" });
  }
  const schema = {
    // option digunakan untuk fild name boleh di kosongkan
    nama: "string|min:3|optional",
    users_id: "string|optional",
    stock: "string|optional",
  };
  const validate = v.validate(req.body, schema);
  if (validate.length) {
    return res.status(400).json(validate);
  }
  product = await product.update(req.body);
  res.json(product);

  //   const { users_id, nama, price, stock, status } = req.body;
  //   const image = req.file;
  //   if (image) {
  //     const target = path.join(__dirname, "../../uploads", image.originalname);
  //     fs.renameSync(image.path, target);
  // }
  //   try {
  //     const response = await Product.update(req.body, {
  //       where: {
  //         id: req.params.id,
  //       },
  //     });
  //     res.send(response);
  //     // res.status(200).json({ response, msg: "User Update" });
  //   } catch (error) {
  //     console.log(error.message);
  //   }
};
const input = async (req, res) => {
  const { users_id, nama, price, stock, status } = req.body;
  const image = req.file;
  //Shorthand Definitions
  const schema = {
    // option digunakan untuk fild name boleh di kosongkan
    nama: "string|min:3",
    users_id: "string",
    // price: "string|",
    stock: "string",
    // status: ["boolean", "number|min:0|max:1"],
  };
  const validate = v.validate(req.body, schema);
  //   const { users_id, nama, price, stock, status } = req.body;
  //hasil balikan dari validate merupakan sebuah array yng mana di dlaam naya terdapat pesan error, jika pesan error ksong, maka tidak ada error yang terjadi
  if (validate.length) {
    return res.status(400).json(validate);
  }
  if (image) {
    const target = path.join(__dirname, "../../uploads", image.originalname);
    fs.renameSync(image.path, target);
    try {
      await Product.sync();
      const result = await Product.create({
        users_id,
        nama,
        price,
        stock,
        status,
        image_url: `http://localhost:3000/public/${image.originalname}`,
      });
      //   res.send(result);
      res.status(201).json({ Product, msg: "User Sukses Create" });
    } catch (err) {
      res.send(err);
    }
    //jika file yang di upload tidak ada maka akan menampilkan messege
    // req.image === null
  } else {
    return res.status(400).json({ msg: "No file Uploaded" });
  }
};
const saveProduct = (req, res) => {
  //jika tidak terdapat file yang dikirim
  if (req.files === null) {
    return res.status(400).json({ msg: "No File Uploads Image" });
  }
  // jika terdapat file ambil name image dari client yang di simpan dalam variabel
  // const name = req.body.nama;
  //ambil file
  const file = req.files.image;
  //ambil file Size yang di mana file diambil dari variabel yang di atasnya
  const fileSize = file.data.length;
  //ambil exension dari file yag dikirim
  const ext = path.extname(file.name);
  //name dari file yang di upload di convert menjadi md5
  const fileName = file.md5 + ext;
  //membuat url untuk disimpan ke database & protocol akan berisi http/https & host berisi localhost jiak sudah di publish ganti dengan domain
  const url = `${req.protocol}://${req.get("host")}/uploads/${fileName}`;
  //type data yang di izjinkan
  const allowedType = [".png", ".jpg", ".jpeg"];
  //jika tidak sesuai type data yang di ijinkan
  if (!allowedType.includes(ext.toLocaleLowerCase())) {
    return res.status(422).json({ msg: "Invalid image" });
  }
  //jika file sze lebih dari 5MB di convert dalam byte
  if (fileSize > 5000000) {
    return res.status(422).json({ msg: "Image must be less than 5MB" });
  }
  file.mv(`../../uploads${fileName}`, async (err) => {
    if (err) return res.status(500).json({ msg: err.message });
    try {
      await Product.create({ nama: nama, image_url: url });
      res.status(201).json({ msg: "Product Sukses Fully" });
    } catch (error) {
      console.log(error.message);
    }
  });
};

// Controller untuk Users.

module.exports = {
  input,
  getUsers,
  getUsersById,
  getUsersByStatus,
  deleteUser,
  UpdateUser,
  deleteData,
  saveProduct,
};

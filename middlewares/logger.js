// parameter next untuk menangani middleware/fungsi , di tengah2 req bisa menggunakan middleware sebelum response di lakukan
const log = (req, res, next) => {
  // req url yang d jalankan apa ajja, jika res nya udah di panggil , maka proses middleware sdah berhenti

  console.log(
    new Date().toLocaleDateString(),
    "=>",
    // di panggil mengguakan method ?
    req.method,
    // akan menampilkan ke console request url nya aoa ajja
    req.originalUrl
  );
  // akan menjalankan callback berikutnya
  next();
};
module.exports = log;

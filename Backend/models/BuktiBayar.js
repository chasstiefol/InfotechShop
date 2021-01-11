const mongoose = require("mongoose");
const buktiSchema = new mongoose.Schema({
  bukti: {
    type: [],
  },
  pengguna: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Akun",
  },
  nama: {
    type: String,
  },
  email: {
    type: String,
  },
  tanggalBayar: {
    type: String,
    default: Date,
  },
  tanggalDibuat: {
    type: String,
    default: Date,
  },
});

module.exports = mongoose.model("Bukti", buktiSchema, "Bukti");

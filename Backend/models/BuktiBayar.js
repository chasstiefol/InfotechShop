const mongoose = require("mongoose");
const buktiSchema = new mongoose.Schema({
  bukti: {
    type: [],
  },
  pengguna: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Akun",
  },
  pesanan: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Pesanan",
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

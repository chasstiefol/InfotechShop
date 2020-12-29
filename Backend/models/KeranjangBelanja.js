const mongoose = require("mongoose");
const cartSchema = mongoose.Schema({
  pengguna: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Akun",
  },
  namaPengguna: {
    type: String, 
  },
  produk: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Produk",
  },
  namaProduk: {
    type: String,
    required: true,
  },
  gambar: {
    type: String,
  },
  harga: {
    type: Number,
    required: true,
    default: 0,
  },
  jumlahPembelian: {
    type: Number, 
    required: true,
    default: 1
  },
  tanggalDibuat: {
    type: String,
    default: Date,
  }
});

module.exports = mongoose.model("Cart", cartSchema, "Cart");
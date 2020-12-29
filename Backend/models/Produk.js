const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
  pengguna: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Akun",
  },
  nama: {
    type: String,
  },
  avatar: {
    type: String,
  },
  namaProduk:{
    type: String,
    required: true,
  },
  rating: {
    type: String, 
    required: true,
  },
  review: {
    type: String,
    required: true,
  },
  tanggalReview: {
    type: String,
    default: Date,
  },
});

const produkSchema = mongoose.Schema({
  pengguna: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Akun",
  },
  idProduk: {
    type: Number,
    required: true,
    unique: true,
  },
  namaProduk: {
    type: String,
    required: true,
  },
  deskripsi: {
    type: String,
    required: true,
  },
  gambar: {
    type: String,
  },
  reviews: [reviewSchema],
  kategori: {
    type: String,
    required: true,
  },
  merk:{
    type: String, 
    required: true
  },
  jumlahReview: {
    type: Number,
    required: true,
    default: 0
  },
  harga: {
    type: Number,
    required: true,
    default: 0,
  },
  jumlahStok: {
    type: Number, 
    required: true,
    default: 0
  }

});

module.exports = mongoose.model("Produk", produkSchema, "Produk");

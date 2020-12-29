const mongoose = require("mongoose");

const pesananSchema = mongoose.Schema({
  pembeli: {
    pengguna: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Akun",
    },
    nama: {
      type: String,
      required: true,
      max: 255,
      min: 6,
    },
      email: {
      type: String,
      required: true,
      max: 255,
      min: 6,
    },
    avatar: {
      type: String, 
      },
  },
  
  alamatPengiriman: {
    namaPenerima: {
      type: String,
    },
    alamat: {
      type: String,
    },
    kabupaten:{
      type: String,
      required: true,
    },
    kecamatan: {
      type: String, 
      required: true,
    },
    kelurahan: {
      type: String,
      required: true,
    },
    kodepos: {
      type: Number,
      default: 0,
    },
    noHP: {
      type: Number,
      default: 0,
    },
  },
  cartID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Cart",
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
  jumlahPesanan: {
    type: Number, 
    required: true,
    default: 1
  },
  metodePembayaran: {
    type: String,
  },
  sudahBayar: {
    type: Boolean,
    default: false,
  },
  sudahDikirim: {
    type: Boolean,
    default: false,
  },
  statusPesanan: {
    type: String,
  },
  kodePembayaran: {
    type: Number,
    required: true,
    unique: true,
  }

});

module.exports = mongoose.model("Pesanan", pesananSchema, "Pesanan");

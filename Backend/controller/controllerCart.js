const Produk = require('../models/Produk');
const Cart = require('../models/KeranjangBelanja');
const asyncHandler = require("express-async-handler");
const Akun = require('../models/Akun');

const tambahCart = asyncHandler(async (req, res) => {
  const produk = await Produk.findById(req.params.id)
  const akun = await Akun.findById(req.user._id);
  if (produk) {
    const cart = {
      pengguna: akun,
      namaPengguna: akun.nama,
      produk: produk._id,
      namaProduk: produk.namaProduk,
      gambar: produk.gambar,
      harga: produk.harga,
      jumlahPembelian: req.body.qty,
    }

    user.bookmarks.push(penanda)
    await user
      .save()
      .then((saved) => {
        return res.status(201).json(saved)
      })
      .catch((error) => {
        return res.json(error)
      })
  } else {
    res.status(404)
    throw new Error('Konten tidak ditemukan')
  }
})
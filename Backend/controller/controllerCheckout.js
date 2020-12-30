const Produk = require('../models/Produk');
const Cart = require('../models/KeranjangBelanja');
const asyncHandler = require("express-async-handler");
const Akun = require('../models/Akun');
const Pesanan = require('../models/Pesanan');

const tambahAlamat = asyncHandler(async(req, res)=>{
    const {namaPenerima, alamat, kabupaten, kecamatan, kelurahan, kodepos, noHP} = req.body;
    const cart = await Cart.findById(req.params.id);
    const akun = await Akun.findById(req.user._id);
    if (cart){
        const alamatPengiriman = new Pesanan({
            pengguna: akun,
            nama: akun.nama,
            email: akun.email,
            avatar: akun.avatar,
            namaPenerima,
            alamat,
            kabupaten,
            kecamatan,
            kelurahan,
            kodepos,
            noHP,
            cartID: cart._id,
            namaProduk: cart.namaProduk,
            gambar: cart.gambar,
            harga: cart.harga,
            jumlahPesanan: cart.jumlahPembelian,
        });
        if (alamatPengiriman){
        await alamatPengiriman
          .save()
          .then((saved) => {
            return res.json(saved);
          })
          .catch((error) => {
            return res.json(error);
          });
          res.status(200);
        }
    } else {
        res.status(400);
        throw new Error ("Cart tidak ditemukan")
    }
})
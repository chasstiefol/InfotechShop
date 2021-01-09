const Produk = require('../models/Produk')
const Akun = require('../models/Akun')
const fs = require('fs')
const upload = require('../helper/helper').upload
const vs = require('v-response')
const asyncHandler = require('express-async-handler')

const tambahProduk = asyncHandler(async (req, res, next) => {
  // const files = req.files

  try {
    let urls = [];
    // let berkas = async (path) => await upload(path)
    // for (const file of files) {
    //   const { path } = file
    //   console.log('path', file)

    //   const newPath = await berkas(path)
    //   urls.push(newPath)
    //   fs.unlinkSync(path)

    if (urls) {
      // let body = req.body;
      let pengguna = await Akun.findById(req.user._id).select("-password");
      // let bodyw = _.extend(body, { pengguna: pengguna }, { gambar: urls });

      let produk = new Produk({
        pengguna: pengguna,
        namaProduk: req.body.namaProduk,
        deskripsi: req.body.deskripsi,
        kategori: req.body.kategori,
        gambar: urls,
        merk: req.body.merk,
        jumlahStok: req.body.jumlahStok,
        harga: req.body.harga,
      });
      await produk
        .save()
        .then((saved) => {
          return res.json(saved);
        })
        .catch((error) => {
          return res.json(error);
        });
    }
  } catch (error) {
    res.status(400);
    console.log("error: ", error);
    return next(error);
  }
});

const tampilkanSeluruhProduk = asyncHandler(async (req, res) => {
  const produk = await Produk.find({}).lean()

  if (produk) {
    res.json(produk)
  } else {
    res.status(404)
    res.json({ message: 'Konten tidak ditemukan' })
  }
})

const tampilkanSatuProduk = asyncHandler(async (req, res) => {
  const produk = await Produk.findById(req.params.id).lean()

  if (produk) {
    res.json(produk)
  } else {
    res.status(404)
    throw new Error('Produk tidak ditemukan')
  }
})

const tampilkanKategoriMouse = asyncHandler(async (req, res) => {
  try {
    const produk = await Produk.find({
      kategori: 'Mouse',
    })
      .sort({
        tanggalDibuat: 'desc',
      })
      .lean()
    if (produk) {
      res.json(produk)
    } else {
      res.status(404)
      throw new Error('Konten tidak ditemukan')
    }
  } catch (error) {
    console.error(err)
    res.status(404)
  }
})

const tampilkanKategoriLaptop = asyncHandler(async (req, res) => {
  try {
    const produk = await Produk.find({
      kategori: 'Laptop',
    })
      .sort({
        tanggalDibuat: 'desc',
      })
      .lean()
    if (produk) {
      res.json(produk)
    } else {
      res.status(404)
      throw new Error('Konten tidak ditemukan')
    }
  } catch (error) {
    console.error(err)
    res.status(404)
  }
})

const tampilkanKategoriMonitor = asyncHandler(async (req, res) => {
  try {
    const produk = await Produk.find({
      kategori: 'Monitor',
    })
      .sort({
        tanggalDibuat: 'desc',
      })
      .lean()
    if (produk) {
      res.json(produk)
    } else {
      res.status(404)
      throw new Error('Konten tidak ditemukan')
    }
  } catch (error) {
    console.error(err)
    res.status(404)
  }
})

const tampilkanKategoriKeyboard = asyncHandler(async (req, res) => {
  try {
    const produk = await Produk.find({
      kategori: 'Keyboard',
    })
      .sort({
        tanggalDibuat: 'desc',
      })
      .lean()
    if (produk) {
      res.json(produk)
    } else {
      res.status(404)
      throw new Error('Konten tidak ditemukan')
    }
  } catch (error) {
    console.error(err)
    res.status(404)
  }
})

const hapusProduk = asyncHandler(async (req, res) => {
  const produk = await Produk.findById(req.params.id)

  if (produk) {
    await produk.remove()
    res.json({ message: 'Produk dihapus' })
  } else {
    res.status(404)
    throw new Error('Produk tidak ditemukan')
  }
})

const tambahReview = asyncHandler(async (req, res) => {
  const produk = await Produk.findById(req.params.id)
  const pengguna = await Akun.findById(req.user._id)
  if (produk) {
    const review = {
      namaProduk: produk.namaProduk,
      pengguna: pengguna,
      nama: pengguna.nama,
      avatar: pengguna.avatar,
      review: req.body.review,
      rating: req.body.rating,
    }

    produk.reviews.push(review)
    await produk
      .save()
      .then((saved) => {
        return res.status(201).json(saved)
      })
      .catch((error) => {
        return res.json(error)
      })
  } else {
    res.status(404)
    throw new Error('Produk tidak ditemukan')
  }
})

const hapusReview = asyncHandler(async (req, res) => {
  try {
    const produk = await Produk.findById(req.params.id)

    const review = produk.reviews.find(
      (review) => review.id === req.params.review_id
    )

    if (!review) {
      return res
        .status(404)
        .json({ message: 'komentar tidak ditemukan/tidak ada.' })
    }

    const index = produk.reviews
      .map((review) => review.pengguna.toString())
      .indexOf(review.pengguna._id)

    produk.reviews.splice(index, 1)
    await produk
      .save()
      .then((saved) => {
        return res.status(201).json(saved)
      })
      .catch((error) => {
        return res.json(error)
      })
  } catch (error) {
    console.log('error: ', error)
    res.status(500).send('server error')
  }
})

module.exports = {
  tambahProduk,
  tampilkanSeluruhProduk,
  tampilkanSatuProduk,
  tampilkanKategoriKeyboard,
  tampilkanKategoriLaptop,
  tampilkanKategoriMonitor,
  tampilkanKategoriMouse,
  hapusProduk,
  tambahReview,
  hapusReview,
}

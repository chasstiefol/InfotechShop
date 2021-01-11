const asyncHandler = require('express-async-handler')
const Akun = require('../models/Akun')
const Pesanan = require('../models/Pesanan')
const Bukti = require('../models/BuktiBayar')
const uuid = require('uuid')

const tambahPesanan = asyncHandler(async (req, res) => {
  const {
    barangPesanan,
    alamatPengiriman,
    metodePembayaran,
    hargaBarang,
    ongkir,
    totalPembayaran,
  } = req.body

  const kode = uuid.v4()
  const kodetanpastrip = kode.replace(/-/g, '')
  const kodePembayaran = `${kodetanpastrip}${barangPesanan.idProduk}`
  const pembeli = await Akun.findById(req.user._id).select('-password')

  if (barangPesanan && barangPesanan.length === 0) {
    res.status(400)
    throw new Error('Barang tidak ditemukan')
    return
  } else {
    const order = await Pesanan.create({
      barangPesanan,
      pembeli: pembeli,
      namaPembeli: pembeli.nama,
      emailPembeli: pembeli.email,
      avatar: pembeli.avatar,
      alamatPengiriman,
      hargaBarang,
      ongkir,
      metodePembayaran,
      totalPembayaran,
      kodePembayaran: kodePembayaran,
    })

    res.status(201).json(order)
  }
})

const detailPesanan = asyncHandler(async (req, res) => {
  const order = await Pesanan.findById(req.params.id)

  if (order) {
    res.status(200).json(order)
  } else {
    res.status(404)
    throw new Error('Pesanan tidak ditemukan')
  }
})

const updatePesananDibayar = asyncHandler(async (req, res) => {
  const order = await Pesanan.findById(req.params.id)

  if (order) {
    order.sudahBayar = true
    order.tanggalBayar = Date.now()

    const statusPembayaran = await order.save()
    res.status(201).json(statusPembayaran)
  } else {
    res.status(404)
    throw new Error('Pesanan tidak ditemukan')
  }
})

const updatePesananDikirim = asyncHandler(async (req, res) => {
  const order = await Pesanan.findById(req.params.id)

  if (order) {
    order.sudahDikirim = true
    order.tanggalDikirim = Date.now()

    const statusPembayaran = await order.save()
    res.status(201).json(statusPembayaran)
  } else {
    res.status(404)
    throw new Error('Pesanan tidak ditemukan')
  }
})

const pesananSaya = asyncHandler(async (req, res) => {
  const pesanan = await Pesanan.find({ pembeli: req.params.id })
  res.json(pesanan)
})

const seluruhPesanan = asyncHandler(async (req, res) => {
  const pesanan = await Pesanan.find({})
  res.json(pesanan)
})

const buktiBayar = asyncHandler(async (req, res) => {
  // const files = req.files
  //gambar
  try {
    let urls = []
    // let berkas = async (path) => await upload(path)
    // for (const file of files) {
    //   const { path } = file
    //   console.log('path', file)

    //   const newPath = await berkas(path)
    //   urls.push(newPath)
    //   fs.unlinkSync(path)

    if (urls) {
      // let body = req.body;
      let pengguna = await Akun.findById(req.user._id).select('-password')
      // let bodyw = _.extend(body, { pengguna: pengguna }, { gambar: urls });

      let bukti = new Bukti({
        pengguna: pengguna,
        nama: pengguna.nama,
        email: pengguna.email,
        bukti: req.body.bukti,
        tanggalBayar: Date.now,
      })
      await bukti
        .save()
        .then((saved) => {
          return res.json(saved)
        })
        .catch((error) => {
          return res.json(error)
        })
    }
  } catch (error) {
    res.status(400)
    console.log('error: ', error)
    return next(error)
  }
})

module.exports = {
  tambahPesanan,
  detailPesanan,
  updatePesananDibayar,
  updatePesananDikirim,
  pesananSaya,
  seluruhPesanan,
  buktiBayar,
}

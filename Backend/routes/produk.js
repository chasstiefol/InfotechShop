const express = require('express')
const router = express.Router()
const multer = require('multer')
const {
  tambahProduk,
  tampilkanSeluruhProduk,
  tampilkanSatuProduk,
  hapusProduk,
  tambahReview,
  hapusReview,
} = require('../controller/controllerProduk')
const { pelindung } = require('../middleware/validasi')
const cloudinary = require('cloudinary').v2
const { uploads } = require('../helper/helper')

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log('file', file)
    cb(null, './uploads/')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
})

let maxSize = 2 * 1024 * 1024
let upload = multer({
  storage,
  limits: {
    files: 5,
    fieldSize: maxSize,
  },
})

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

router.post('/upload', upload.single('gambar'), async (req, res) => {
  try {
    const { path } = req.file

    const newPath = await cloudinary.uploader.upload(path)
    res.json(newPath)
  } catch (error) {
    res.status(400)
    throw new Error(error)
  }
})
router.post('/tambah-produk', pelindung, tambahProduk)
router.route('/').get(tampilkanSeluruhProduk)
router.route('/:id').get(tampilkanSatuProduk).delete(hapusProduk)
router.route('/:id/reviews').post(pelindung, tambahReview)
router.route('/:id/reviews/:review_id').delete(pelindung, hapusReview)

module.exports = router

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

router.post(
  '/tambah-produk',
  pelindung,
  upload.array('gambar', 5),
  tambahProduk
)
router.route('/').get(tampilkanSeluruhProduk)
router.route('/:id').get(tampilkanSatuProduk).delete(hapusProduk)
router.route('/:id/reviews').post(pelindung, tambahReview)
router.route('/:id/reviews/:review_id').delete(pelindung, hapusReview)

module.exports = router

const express = require('express')
const router = express.Router()
const {
  tambahPesanan,
  detailPesanan,
  seluruhPesanan,
  updatePesananDibayar,
  updatePesananDikirim,
  pesananSaya,
  buktiBayar,
  cariBukti,
  seluruhBukti,
} = require('../controller/controllerCheckout')
const { pelindung, admin } = require('../middleware/validasi')
const cloudinary = require('cloudinary').v2
const multer = require('multer')

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

router.post('/bukti', upload.single('bukti'), async (req, res) => {
  try {
    const { path } = req.file
    const newPath = await cloudinary.uploader.upload(path)
    res.json(newPath)
  } catch (error) {
    res.status(400)
    throw new Error(error)
  }
})

router.route('/').post(pelindung, tambahPesanan).get(pelindung, admin, seluruhPesanan)
router.route('/:id').get(pelindung, admin, detailPesanan)
router.route('/:id/bayar').put(pelindung, admin, updatePesananDibayar)
router.route('/:id/dikirim').put(pelindung, admin, updatePesananDikirim)
router.route('/pesanan-saya/:id').get(pelindung, pesananSaya)
router.route('/bukti').get(pelindung, admin, seluruhBukti)
router.route('/kirim-bukti/:id').post(pelindung, buktiBayar)
router.route('/bukti/:id').get(pelindung, admin, cariBukti)

module.exports = router

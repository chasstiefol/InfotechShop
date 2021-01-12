const express = require('express')
const router = express.Router()
const {
  authManual,
  registerManual,
  profil,
  seluruhProfil,
  hapusProfil,
  updateProfil,
  cariProfil,
} = require('../controller/controllerPengguna')
const { pelindung, admin } = require('../middleware/validasi')

router.route('/login/manual').post(authManual)
router.route('/register/manual').post(registerManual).get(pelindung)
router.route('/pengguna').get(pelindung, admin, seluruhProfil)
router.route('/profil').get(pelindung, profil)
router.route('/hapus/:id').delete(pelindung, admin, hapusProfil)
router.route('/update').post(pelindung, updateProfil)
router.route('/cari').get(pelindung, admin, cariProfil)

module.exports = router

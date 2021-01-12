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
const { pelindung } = require('../middleware/validasi')

router.route('/login/manual').post(authManual)
router.route('/register/manual').post(registerManual).get(pelindung)
router.route('/pengguna').get(seluruhProfil)
router.route('/profil').get(profil)
router.route('/hapus/:id').delete(hapusProfil)
router.route('/update').post(updateProfil)
router.route('/cari').get(cariProfil)

module.exports = router

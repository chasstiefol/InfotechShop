const express = require("express");
const router = express.Router();
const {
  authManual,
  registerManual,
  profil,
  seluruhProfil,
  hapusProfil,
  updateProfil,
  cariProfil,
} = require("../controller/controllerPengguna");
const { pelindung, admin } = require("../middleware/validasi");

router.route("/login/manual").post(authManual);
router.route("/register/manual").post(registerManual).get(pelindung);
router.route("/pengguna").get(admin, seluruhProfil);
router.route("/profil").get(pelindung, profil);
router.route("/hapus").delete(admin, hapusProfil);
router.route("/update").post(pelindung, updateProfil);
router.route("/cari").get(admin, cariProfil);

module.exports = router;

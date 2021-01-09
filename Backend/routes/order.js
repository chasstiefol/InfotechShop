const express = require("express");
const router = express.Router();
const {
  tambahPesanan,
  detailPesanan,
  seluruhPesanan,
  updatePesananDibayar,
  updatePesananDikirim,
  pesananSaya,
} = require("../controller/controllerCheckout");
const { pelindung } = require("../middleware/validasi");

router.route("/").post(pelindung, tambahPesanan).get(pelindung, seluruhPesanan);
router.route("/:id").get(pelindung, detailPesanan);
router.route("/:id/bayar").put(pelindung, updatePesananDibayar);
router.route("/:id/dikirim"), put(pelindung, updatePesananDikirim);
router.route("/pesanan-saya").get(pelindung, pesananSaya);

module.exports = router;

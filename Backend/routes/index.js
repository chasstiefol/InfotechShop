const express = require('express');
const router = express.Router();
const {authManual, registerManual} = require("../controller/controllerPengguna");
const {pelindung} = require('../middleware/validasi')


router.route('/login/manual').post(authManual);
router.route('/register/manual').post(registerManual).get(pelindung);

module.exports = router;
const mongoose = require("mongoose");
const AkunGoogle = new mongoose.Schema({
  googleID: {
    type: String,
    required: true,
  },
  namaTampilan: {
    type: String,
    required: true,
  },
  namaDepan: {
    type: String,
    required: true,
  },
  namaBelakang: {
    type: String,
    required: true,
  },
  foto: {
    type: String,
    required: true,
  },
  tanggalDibuat: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("AkunGoogle", AkunGoogle);

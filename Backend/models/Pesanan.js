const mongoose = require('mongoose')

const pesananSchema = mongoose.Schema(
  {
    pembeli: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Akun',
    },
    namaPembeli: {
      type: String,
      required: true,
      max: 255,
      min: 6,
    },
    emailPembeli: {
      type: String,
      required: true,
      max: 255,
      min: 6,
    },
    avatar: {
      type: String,
    },
    barangPesanan: [
      {
        namaProduk: {
          type: String,
          required: true,
        },
        qty: {
          type: Number,
          required: true,
        },
        gambar: {
          type: [],
        },
        harga: {
          type: Number,
          required: true,
        },
        produk: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'Produk',
        },
      },
    ],
    alamatPengiriman: {
      namaPenerima: {
        type: String,
      },
      alamat: {
        type: String,
      },
      kabupaten: {
        type: String,
        required: true,
      },
      kecamatan: {
        type: String,
        required: true,
      },
      kelurahan: {
        type: String,
        required: true,
      },
      kodepos: {
        type: Number,
        default: 0,
      },
      noHP: {
        type: Number,
        default: 0,
      },
    },
    metodePembayaran: {
      type: String,
    },
    ongkir: {
      type: Number,
    },
    totalPembayaran: {
      type: Number,
    },
    sudahBayar: {
      type: Boolean,
      default: false,
    },
    tanggalBayar: {
      type: String,
      default: Date,
    },
    sudahDikirim: {
      type: Boolean,
      default: false,
    },
    tanggalBayar: {
      type: String,
      default: Date,
    },
    kodePembayaran: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Pesanan', pesananSchema, 'Pesanan')

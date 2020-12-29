const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const Akun = new mongoose.Schema({
  nama: {
    type: String,
    required: true,
    max: 255,
    min: 6,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    max: 255,
    min: 6,
  },
  avatar: {
    type: String,
  },
  password: {
    type: String,
    required: true,
    max: 1024,
    min: 6,
  },
  admin: {
    type: Boolean,
    default: false,
  },
  carts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Cart' }],
  tanggalDibuat: {
    type: String,
    default: Date,
  },
})

Akun.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

Akun.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

module.exports = mongoose.model('Akun', Akun, 'Akun')

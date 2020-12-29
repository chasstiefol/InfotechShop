const asyncHandler = require('express-async-handler')
const generateToken = require('../utils/generateToken')
const Akun = require('../models/Akun')
const gravatar = require('gravatar')
// @desc    Auth user & get token
// @route   POST /api/users/login/manual
// @access  Public
const authManual = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const akun = await Akun.findOne({ email })

  if (akun && (await akun.matchPassword(password))) {
    res.json({
      _id: akun._id,
      nama: akun.nama,
      email: akun.email,
      avatar: akun.avatar,
      admin: akun.admin,
      token: generateToken(akun._id),
    })
  } else {
    res.status(401)
    throw new Error('Email atau password salah')
  }
})

// @desc    Register a new user
// @route   POST /api/users/register/manual
// @access  Public
const registerManual = asyncHandler(async (req, res) => {
  const { nama, email, password } = req.body

  const userExists = await Akun.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error('Email telah digunakan')
  }
  const avatar = gravatar.url(email, {
    s: '300',
    r: 'pg',
    d: 'identicon',
  })

  const akun = await Akun.create({
    avatar,
    nama,
    email,
    password,
  })

  if (akun) {
    res.status(201).json({
      _id: akun._id,
      avatar: akun.avatar,
      nama: akun.nama,
      email: akun.email,
      admin: akun.admin,
      token: generateToken(akun._id),
    })
  } else {
    res.status(400)
    throw new Error('Data tidak valid')
  }
})

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const profil = asyncHandler(async (req, res) => {
  const akun = await Akun.findById(req.user._id)

  if (user) {
    res.json({
      _id: akun._id,
      avatar: akun.avatar,
      nama: akun.nama,
      email: akun.email,
      admin: akun.admin,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

const updateProfil = asyncHandler(async (req, res) => {
  const akun = await Akun.findById(req.user._id).select('-password')
  if (akun) {
    ;(akun.nama = req.body.nama || akun.nama),
      (akun.email = req.body.email || akun.email)

    const update = await akun
      .save()
      .then((saved) => {
        const result = saved._doc
        result.token = generateToken(result._id)
        return res.json(result)
      })
      .catch((error) => {
        return res.json(error)
      })
  } else {
    res.status(404)
    res.json({ message: 'Akun tidak ditemukan' })
  }
})

module.exports = {
  authManual,
  registerManual,
  profil,
  updateProfil,
}

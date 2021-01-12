const Akun = require("../models/Akun");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const pelindung = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const retas = jwt.verify(token, process.env.TOKEN_SECRET);

      req.user = await Akun.findById(retas.id).select("-password");
      next();
    } catch (error) {
      console.error(error);
      res.status(401).send("Token failed ");
    }
  }

  if (!token) {
    res.status(401).send("Not Authorized, Token unverified");
  }
});

const admin = (req, res, next) => {
  if (req.user && req.user.Admin) {
    next()
  } else {
    res.status(401)
    throw new Error('Anda bukan Admin')
  }
}

module.exports = { pelindung, admin };

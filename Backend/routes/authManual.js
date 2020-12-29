const router = require("express").Router();
const Akun = require("../models/User");
const Joi = require("@hapi/joi");
const jwt = require("jsonwebtoken");

const bcrypt = require("bcryptjs");
const {
  registerValidation,
  loginValidation,
} = require("../middleware/validation");

//Dashboard Page
//route GET /dashboard
router.get("/register/akun", (req, res) => {
  res.render("register", {
    layout: "login",
  });
});

//Register akun manual
router.post("/", async (req, res) => {
  //validate the data before creating user
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //check if the email already exist
  const emailExist = await Akun.findOne({
    email: req.body.email,
  });
  if (emailExist) return res.status(400).send("Email already exist");

  //hash password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  //create new user
  const user = new Akun({
    name: req.body.name,
    email: req.body.email,
    password: hashPassword,
  });
  try {
    const savedUser = await user.save();
    res.redirect("/api/user/login");
  } catch (err) {
    res.status(400).send(err);
  }
});

//redirect ke login page
router.get("/login", (req, res) => {
  res.render("login", {
    layout: "login",
  });
});

//login manual dengan email
router.post("/login/akun", async (req, res) => {
  //validate the data before creating user
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //check if the email exist
  const user = await Akun.findOne({
    email: req.body.email,
  });
  if (!user) return res.status(400).send("Email or password is wrong");

  //check password is true or not
  const checkPass = await bcrypt.compare(req.body.password, user.password);
  if (!checkPass) return res.status(400).send("Invalid password");

  //create token and assigned token
  const token = jwt.sign(
    {
      _id: user._id,
    },
    process.env.TOKEN_SECRET,
    { expiresIn: 3600 }
  );
  res.header("auth-token", token).send(token);
});

module.exports = router;

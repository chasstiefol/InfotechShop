const express = require("express");
const passport = require("passport");
const router = express.Router();

//Login dengan Google
//Route: GET /auth/google
router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

//Google Callback
//Route: GET /auth/google/callback
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" })
);

//Logout Google
//Route: /auth/logout
router.get("/logout", (req, res) => {
  req.logout();
});
module.exports = router;

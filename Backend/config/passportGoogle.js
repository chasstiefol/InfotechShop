const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const AkunGoogle = require("../models/AkunGoogle");

module.exports = function (passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        const newUser = {
          googleID: profile.id,
          namaTampilan: profile.displayName,
          namaDepan: profile.name.givenName,
          namaBelakang: profile.name.familyName,
          foto: profile.photos[0].value,
        };

        try {
          let user = await AkunGoogle.findOne({ googleID: profile.id });
          if (user) {
            done(null, user);
          } else {
            user = await AkunGoogle.create(newUser);
            done(null, user);
          }
        } catch (err) {
          console.error(err);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    AkunGoogle.findById(id, (err, user) => {
      done(err, user);
    });
  });
};
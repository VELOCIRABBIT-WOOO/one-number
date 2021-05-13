var express = require("express");
var router = express.Router();
const { User } = require("../dbmodel");
const passport = require("passport");
const keys = require("../../api_keys.js");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const cookieParser = require('cookie-parser');

router.use(cookieParser());


passport.serializeUser((id, done) => {
  // find from the database and send user data here
  done(null, id); // this user is coming from the done function passed from returning from the db
});

passport.deserializeUser((id, done) => {
  // find from the database and send user data here
  done(null, id); // this user is coming from the done function passed from returning from the db
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.google.clientID,
      clientSecret: keys.google.clientSecret,
      callbackURL: "/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ google_id: profile.id }).then((currentUser) => {
        if (currentUser) {
          done(null, currentUser);
        } else {
          new User({
            google_id: profile.id,
            display_name: profile.displayName,
          })
            .save()
            .then((newUser) => {
              done(null, newUser);
            });
        }
      });
      done(null, profile); // TODO add the user to the database here with upsert, or insert on conflict do nothing sql
    }
  )
);

router.get("/google",
  (req, res, next) => {
    if(req.cookies['google_id'])res.redirect("/dashboard");
    else next();
  },
  passport.authenticate("google", 
  { scope: ["profile"] })
);

router.get("/google/callback", 
  passport.authenticate("google"), 
  (req, res) => {

    res.cookie('google_id',req.user.id);
    res.redirect("/dashboard");
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/landing");
});

module.exports = router;

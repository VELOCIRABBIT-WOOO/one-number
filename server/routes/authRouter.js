var express = require("express");
var router = express.Router();
const passport = require("passport");

router.get("/google/callback", passport.authenticate("google"), (req, res) => {
  console.log("this is the req.user");
  console.log(req.user);
  res.redirect("/dashboard");
});

router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/landing");
});

module.exports = router;

const express = require("express");
const passport = require("passport");
const cookieSession = require("cookie-session");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("../api_keys.js");
require("dotenv").config();
const { User, Item, Account, Security, Holding } = require("./dbmodel");
const plaid = require("plaid");
const plaidRouter = require("./routes/plaidRouter");
const authRouter = require("./routes/authRouter");
const authController = require("./controllers/authController");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "../build/")));
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey],
  })
);

app.use("/plaid", plaidRouter);

const client = new plaid.Client({
  clientID: process.env.PLAID_CLIENT_ID,
  secret: process.env.PLAID_SECRET,
  env: plaid.environments.development,
});

// ---------------------oauth
app.use(passport.initialize());
app.use(passport.session());
app.use("/auth", authRouter);
// Secret route
app.get("/secret", authController.isUserAuthenticated, (req, res) => {
  // recieved in res.locals.user from isUserAuthenticated which is just a long google ID
  if (res.locals.user) res.send(res.locals.user);
  else {
    res.send("no user found");
  }
});
app.get("/", (req, res) => {
  res.redirect("/landing");
});
app.get("/dashboard", (req, res) => {
  if (req.user) {
    res.cookie('google_id',req.user);
    res.sendFile(path.join(__dirname, "./../build/index.html"));
  } else {
    res.redirect("/landing");
  }
});
app.get("/landing", (req, res) => {
  res.sendFile(path.join(__dirname, "./../build/index.html"));
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
          //if we already have a record with the given profile ID
          const {access_token} = currentUser;
          client.getTransactions(
            access_token,
            "2021-05-11",
            "2021-05-11",
            (err, result) => {
              if(err !== null) console.log(err);
              else{
                console.log('Balance: ',result.accounts[0].balances.current)
                console.log('Transactions: ',result.item)
              }
            }
          );
          done(null, currentUser);
        } else {
          //if not, create a new user
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
passport.serializeUser((user, done) => {
  done(null, user.id); // this user is coming from the done function passed from returning from the db
});
passport.deserializeUser((id, done) => {
  // find from the database and send user data here
  done(null, id); // this user is coming from the done function passed from returning from the db
});
// -------------------------------oauth
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});

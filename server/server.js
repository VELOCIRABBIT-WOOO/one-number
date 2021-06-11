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
const {decrypt} = require('./encryptDecrypt')
const plaidRouter = require("./routes/plaidRouter");
const authRouter = require("./routes/authRouter");
const authController = require("./controllers/authController");
const cookieParser = require('cookie-parser');
const { Error } = require("mongoose");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "../build/")));

app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey],
  })
);


const memory = process.memoryUsage()
console.log()

app.use("/plaid", plaidRouter);
app.use(cookieParser());

const client = new plaid.Client({
  clientID: process.env.PLAID_CLIENT_ID,
  secret: process.env.PLAID_SECRET,
  env: plaid.environments.development
});

app.post('/plaid/webhook', (req, res) => {
  console.log('Plaid Webhook',req.body) // Call your action on the request here
  res.status(200).end() // Responding is important
})

// ---------------------oauth
app.use(passport.initialize());
app.use(passport.session());
app.use("/auth", authRouter);
// ---------------------oauth

app.get("/", (req, res) => {
  res.redirect("/landing");
});

app.get("/dashboard", (req, res) => {
  if (req.cookies['google_id']) res.sendFile(path.join(__dirname, "./../build/index.html"));
  else res.redirect("/landing");
});

app.get("/landing", (req, res) => {
  res.sendFile(path.join(__dirname, "./../build/index.html"));
});

// Secret route
app.get('/secret', (req, res) => {
  userID = req.cookies['google_id'];
  res.send(userID);
});

app.get("/checkauth", (req, res, next) => {
  const { google_id } = req.cookies;
  User.findOne({google_id : google_id}, (err, result) => {
    if(err !== null || result === null){
      return next()
    } else {
      res.locals.access_token = result.access_token;
      return next();
    }
  })},
  (req, res) => {
    const upperLimitDate = (new Date()).toISOString().split('T')[0];
    const lowerLimitDate = String(parseInt(upperLimitDate.split('-')[0]) - 1) + '-' + upperLimitDate.split('-')[1] + '-' + upperLimitDate.split('-')[2];
    client.getTransactions(
    decrypt(res.locals.access_token),
    lowerLimitDate,
    upperLimitDate,
    (err, results) => {
      if(err !== null) console.log(err);
      else{
        const result = results;
        const access_token = res.locals.access_token;
        res.status(200).send({result})
      }
    }
)});


app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});


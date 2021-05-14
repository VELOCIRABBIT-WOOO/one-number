var express = require("express");
var router = express.Router();
const cookieParser = require('cookie-parser');
const { User, Item, Account, Security, Holding } = require("../dbmodel");
const {encrypt, decrypt} = require('../encryptDecrypt')
const plaid = require("plaid");

const client = new plaid.Client({
  clientID: process.env.PLAID_CLIENT_ID,
  secret: process.env.PLAID_SECRET,
  env: plaid.environments.development
});


router.use(cookieParser());

router.get("/get_link_token", async (req, res) => {
  // console.log('req.user', req.user);
  const response = await client
    .createLinkToken({
      user: {
        client_user_id: "this is the user id lol",
      },
      client_name: "OneNumber",
      products: ["transactions"],
      country_codes: ["US"],
      language: "en",
    })
    .catch((err) => {
      console.log(err);
    });
  const linkToken = response.link_token;
  res.json({ linkToken });
});
router.post("/plaid_token_exchange", async (req, res) => {
  const { public_token } = req.body;
  const { access_token } = await client
    .exchangePublicToken(public_token)
    .catch((e) => console.log(e));
  //add access token to user document in the database.
  await User.findOneAndUpdate({google_id:req.cookies['google_id']},{access_token: encrypt(access_token)},(err,data) =>{
    if (err !== null) console.log(err);
  });
});


module.exports = router;

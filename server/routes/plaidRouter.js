var express = require("express");
var router = express.Router();
const cookieParser = require('cookie-parser');
const { User, Item, Account, Security, Holding } = require("../dbmodel");
const plaid = require("plaid");
const client = new plaid.Client({
  clientID: process.env.PLAID_CLIENT_ID,
  secret: process.env.PLAID_SECRET,
  env: plaid.environments.development,
});

router.use(cookieParser());
// middleware that is specific to this router
// router.use(function timeLog (req, res, next) {
//     console.log('Time: ', Date.now())
//     next()
//   })
// define the home page route
router.get("/", function (req, res) {
  res.send("Birds home page");
});
// define the about route
router.get("/about", function (req, res) {
  res.send("About birds");
});
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
  client.getTransactions(
    access_token,
    "2019-09-01",
    "2019-10-03",
    (err, result) => {
      console.log(result);
      return res.status(200).json({ access_token });
    }
  );
  //add access token to user document in the database.
  User.findOneAndUpdate({google_id:req.cookies['google_id']},{access_token:access_token},(err,data) =>{
    if (err !== null) console.log(err);
    else console.log('data', data);
  })

});
module.exports = router;
